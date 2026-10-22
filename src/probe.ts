/**
 * Live MCP inspection helpers used by the "Test" action and the detail page.
 *
 * Every call opens an independent MCP client connection (never touching the
 * running mcp-client instance for that server), performs `initialize`, then
 * the requested list calls under a hard timeout, and closes the transport
 * cleanly. For stdio servers the child process is spawned and killed here;
 * for streamable-http it is a short-lived HTTP session.
 *
 * @module dsh-mcp-manager/probe
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'
import type {
  McpInspectResult,
  McpProbeResult,
  McpPromptInfo,
  McpResourceInfo,
  McpServerConfig,
  McpToolInfo,
} from './shared.ts'

/** Default probe budget in ms. */
const PROBE_TIMEOUT_MS = 8_000

type Transport = StdioClientTransport | StreamableHTTPClientTransport

/** Build the transport described by a server config. */
function createTransport(config: McpServerConfig): Transport {
  if (config.transport === 'stdio') {
    return new StdioClientTransport({
      command: config.command ?? '',
      args: config.args,
      env: { ...(config.env ?? {}) },
      cwd: config.cwd,
    })
  }
  return new StreamableHTTPClientTransport(
    new URL(config.url ?? ''),
    { requestInit: { headers: config.headers ?? {} } },
  )
}

/** Reject when `promise` does not settle within `timeoutMs`. */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`probe timed out after ${timeoutMs}ms`))
    }, timeoutMs)
    promise.then(
      (value) => { clearTimeout(timer); resolve(value) },
      (error) => { clearTimeout(timer); reject(error) },
    )
  })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Project one wire tool into the shared shape. */
function toToolInfo(tool: unknown): McpToolInfo | undefined {
  if (!isRecord(tool)) return undefined
  const name = tool['name']
  if (typeof name !== 'string' || name === '') return undefined
  const description = tool['description']
  const inputSchema = tool['inputSchema']
  return {
    name,
    ...(typeof description === 'string' ? { description } : {}),
    ...(isRecord(inputSchema) ? { parameters: inputSchema } : {}),
  }
}

/** `serverInfo.version` reported during initialize, when the SDK retained it. */
function versionOf(client: Client): string | undefined {
  try {
    const version = client.getServerVersion()?.version
    return typeof version === 'string' && version !== '' ? version : undefined
  } catch {
    return undefined
  }
}

/** Map one wire prompt into the shared shape. */
function toPromptInfo(prompt: unknown): McpPromptInfo | undefined {
  if (!isRecord(prompt)) return undefined
  const name = prompt['name']
  if (typeof name !== 'string' || name === '') return undefined
  const description = prompt['description']
  return { name, ...(typeof description === 'string' ? { description } : {}) }
}

/** Map one wire resource into the shared shape. */
function toResourceInfo(resource: unknown): McpResourceInfo | undefined {
  if (!isRecord(resource)) return undefined
  const uri = resource['uri']
  if (typeof uri !== 'string' || uri === '') return undefined
  const name = typeof resource['name'] === 'string' && resource['name'] !== '' ? resource['name'] : uri
  const description = resource['description']
  const mimeType = resource['mimeType']
  return {
    name,
    uri,
    ...(typeof description === 'string' ? { description } : {}),
    ...(typeof mimeType === 'string' ? { mimeType } : {}),
  }
}

/**
 * Run a connectivity probe against the given server config.
 * @param config - resolved server config (transport/url/command/...).
 * @param timeoutMs - hard timeout for connect + list.
 * @returns the probe outcome; never throws.
 */
export async function probeServer(
  config: McpServerConfig,
  timeoutMs: number = PROBE_TIMEOUT_MS,
): Promise<McpProbeResult> {
  const started = Date.now()
  const client = new Client(
    { name: 'dsh-mcp-manager-probe', version: '0.1.0' },
    { capabilities: {} },
  )
  try {
    await withTimeout(client.connect(createTransport(config)), timeoutMs)
    const listed = await withTimeout(client.listTools(), timeoutMs)
    const tools = Array.isArray(listed?.tools) ? listed.tools : []
    const toolNames = tools
      .map((tool) => toToolInfo(tool)?.name)
      .filter((name): name is string => name !== undefined)
      .sort((a, b) => a.localeCompare(b))
    return {
      ok: true,
      latencyMs: Date.now() - started,
      toolCount: tools.length,
      toolNames,
      serverVersion: versionOf(client),
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { ok: false, latencyMs: Date.now() - started, error: message }
  } finally {
    try {
      await client.close()
    } catch {
      /* probe already reported; ignore close noise */
    }
  }
}

/**
 * Inspect everything a server advertises: tools with input schemas, prompts and
 * resources. Prompts and resources are optional MCP capabilities, so a server
 * that does not implement them yields empty arrays instead of a failure.
 * @param config - resolved server config.
 * @param timeoutMs - per-call hard timeout.
 * @returns the inspection outcome; never throws.
 */
export async function inspectServer(
  config: McpServerConfig,
  timeoutMs: number = PROBE_TIMEOUT_MS,
): Promise<McpInspectResult> {
  const started = Date.now()
  const client = new Client(
    { name: 'dsh-mcp-manager-inspect', version: '0.1.0' },
    { capabilities: {} },
  )
  const empty = (): McpInspectResult => ({
    ok: false,
    latencyMs: Date.now() - started,
    tools: [],
    prompts: [],
    resources: [],
  })
  try {
    await withTimeout(client.connect(createTransport(config)), timeoutMs)
    const listed = await withTimeout(client.listTools(), timeoutMs)
    const tools = (Array.isArray(listed?.tools) ? listed.tools : [])
      .map(toToolInfo)
      .filter((tool): tool is McpToolInfo => tool !== undefined)

    let prompts: McpPromptInfo[] = []
    try {
      const response = await withTimeout(client.listPrompts(), timeoutMs)
      const raw = (response as { prompts?: unknown }).prompts
      prompts = (Array.isArray(raw) ? raw : [])
        .map(toPromptInfo)
        .filter((prompt): prompt is McpPromptInfo => prompt !== undefined)
    } catch {
      /* prompts are optional: a server may not implement them */
    }

    let resources: McpResourceInfo[] = []
    try {
      const response = await withTimeout(client.listResources(), timeoutMs)
      const raw = (response as { resources?: unknown }).resources
      resources = (Array.isArray(raw) ? raw : [])
        .map(toResourceInfo)
        .filter((resource): resource is McpResourceInfo => resource !== undefined)
    } catch {
      /* resources are optional: a server may not implement them */
    }

    return {
      ok: true,
      latencyMs: Date.now() - started,
      tools,
      prompts,
      resources,
      serverVersion: versionOf(client),
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { ...empty(), error: message }
  } finally {
    try {
      await client.close()
    } catch {
      /* inspection already reported; ignore close noise */
    }
  }
}
