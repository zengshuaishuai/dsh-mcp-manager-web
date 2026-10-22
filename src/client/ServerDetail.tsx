/**
 * Per-server detail view: overview, live tool catalog with input schemas,
 * prompts/resources read through a fresh probe connection, and a short session
 * log.
 *
 * The tools tab renders the live registry projection the host already holds,
 * so it costs no extra connection. Prompts and resources are not registered by
 * `dsh-mcp-client`, so those tabs ask the host to inspect the server on demand.
 *
 * @module dsh-mcp-manager/client/ServerDetail
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { TranslateNS } from '@deepseek-ai/dsh-client-ui-slots'
import type { McpInspectResult, McpProbeResult, McpServerInfo } from '../shared.ts'
import { callRpc, McpManagerRpcError } from './rpc.ts'
import { NS } from './locales.ts'
import {
  EditIcon,
  PlugIcon,
  PowerIcon,
  RefreshIcon,
  TrashIcon,
} from './icons.tsx'

type TabKey = 'overview' | 'tools' | 'prompts' | 'resources' | 'logs'

type StatusKey =
  | 'statusConnected'
  | 'statusActiveNoTools'
  | 'statusFailed'
  | 'statusDisabled'
  | 'statusLoading'
  | 'statusPending'
  | 'statusUnloading'
  | 'statusNotLoaded'

interface DetailProps {
  ctx: ClientContext
  t: TranslateNS<typeof NS>
  server: McpServerInfo
  probe?: McpProbeResult
  patchPath?: string
  busy: boolean
  onBack: () => void
  onToggle: () => void
  onTest: () => void
  onEdit: () => void
  onRemove: () => void
  onVersion?: (id: string, version: string) => void
}

interface LogEntry {
  at: string
  text: string
}

function clock(at: Date): string {
  return `${String(at.getHours()).padStart(2, '0')}:${String(at.getMinutes()).padStart(2, '0')}:${String(at.getSeconds()).padStart(2, '0')}`
}

function errorMessage(error: unknown, t: TranslateNS<typeof NS>): string {
  if (error instanceof McpManagerRpcError) {
    switch (error.code) {
      case 'not-found': return t('errNotFound')
      case 'invalid-config': return t('errInvalidConfig')
      default: return error.message.replace(/^[a-z-]+: /, '')
    }
  }
  return error instanceof Error ? error.message : String(error)
}

function statusOf(server: McpServerInfo): { tone: string; key: StatusKey; count?: string } {
  if (!server.enabled) return { tone: 'off', key: 'statusDisabled' }
  switch (server.fiberPhase) {
    case 'active':
      return server.toolCount > 0
        ? { tone: 'ok', key: 'statusConnected', count: String(server.toolCount) }
        : { tone: 'warn', key: 'statusActiveNoTools' }
    case 'failed': return { tone: 'bad', key: 'statusFailed' }
    case 'loading': return { tone: 'warn', key: 'statusLoading' }
    case 'pending': return { tone: 'warn', key: 'statusPending' }
    case 'unloading': return { tone: 'warn', key: 'statusUnloading' }
    default: return { tone: 'off', key: 'statusNotLoaded' }
  }
}

/** Keep long server version strings readable in the header. */
function shortVersion(version: string): string {
  return version.length > 20 ? `${version.slice(0, 20)}…` : version
}

function targetOf(server: McpServerInfo): string {
  if (server.transport === 'stdio') {
    return [server.command, ...(server.args ?? [])].filter(Boolean).join(' ')
  }
  return server.url ?? ''
}

/** Render a JSON-schema `type` (or enum/union) as a short label. */
function typeLabel(spec: Record<string, unknown>): string {
  const type = spec['type']
  if (typeof type === 'string') return type
  if (Array.isArray(type)) return type.map(String).join(' | ')
  if (Array.isArray(spec['enum'])) return `enum(${spec['enum'].map(String).join(' | ')})`
  if (Array.isArray(spec['oneOf']) || Array.isArray(spec['anyOf'])) return 'union'
  return 'any'
}

/** One property row of a tool input schema. */
function ParamsTable({ schema, t }: { schema?: Record<string, unknown>; t: TranslateNS<typeof NS> }): JSX.Element {
  const properties = (schema?.['properties'] ?? {}) as Record<string, Record<string, unknown>>
  const required = useMemo(() => {
    const raw = schema?.['required']
    return new Set(Array.isArray(raw) ? raw.map(String) : [])
  }, [schema])
  const entries = Object.entries(properties)
  if (entries.length === 0) return <p className="dshmcp-muted">{t('noParams')}</p>
  return (
    <div className="dshmcp-schema">
      <div className="dshmcp-schema-head">
        <span>{t('schemaName')}</span>
        <span>{t('schemaType')}</span>
        <span>{t('schemaDesc')}</span>
      </div>
      {entries.map(([name, spec]) => (
        <div className="dshmcp-schema-row" key={name}>
          <code className="dshmcp-schema-name">
            {name}
            {required.has(name) ? <em className="dshmcp-required"> *</em> : null}
          </code>
          <span className="dshmcp-schema-type">{typeLabel(spec)}</span>
          <span className="dshmcp-schema-desc">
            {typeof spec['description'] === 'string' ? spec['description'] : ''}
            {spec['default'] !== undefined ? (
              <span className="dshmcp-schema-default">
                {t('schemaDefault', { value: JSON.stringify(spec['default']) })}
              </span>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  )
}

/**
 * Detail page for a single MCP server.
 * @param props - server snapshot, probe result, and action callbacks.
 */
export function ServerDetail({
  ctx, t, server, probe, patchPath, busy, onBack, onToggle, onTest, onEdit, onRemove, onVersion,
}: DetailProps): JSX.Element {
  const [tab, setTab] = useState<TabKey>('overview')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [inspect, setInspect] = useState<McpInspectResult | null>(null)
  const [inspecting, setInspecting] = useState(false)
  const [inspectError, setInspectError] = useState<string | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])

  const status = statusOf(server)
  const tools = server.tools ?? []
  const version = inspect?.serverVersion

  const log = useCallback((text: string) => {
    setLogs((prev) => [...prev, { at: clock(new Date()), text }].slice(-200))
  }, [])

  const runInspect = useCallback(async () => {
    setInspecting(true)
    setInspectError(null)
    try {
      const result = await callRpc<McpInspectResult>(ctx, 'inspect', { id: server.id })
      setInspect(result)
      if (result.ok) {
        if (result.serverVersion !== undefined) onVersion?.(server.id, result.serverVersion)
        log(t('logInspectOk', {
          ms: String(result.latencyMs),
          prompts: String(result.prompts.length),
          resources: String(result.resources.length),
        }))
      } else {
        setInspectError(result.error ?? 'failed')
        log(t('logInspectFail', { error: result.error ?? 'failed' }))
      }
    } catch (error) {
      const message = errorMessage(error, t)
      setInspectError(message)
      log(t('logInspectFail', { error: message }))
    } finally {
      setInspecting(false)
    }
  }, [ctx, log, onVersion, server.id, t])

  const inspectedFor = useRef<string | null>(null)
  useEffect(() => {
    if (inspectedFor.current === server.id) return
    inspectedFor.current = server.id
    void runInspect()
  }, [runInspect, server.id])

  useEffect(() => {
    log(t('logOpened', { name: server.serverName }))
  }, [log, server.serverName, t])

  useEffect(() => {
    if (probe === undefined) return
    if (probe.ok) {
      log(t('logProbeOk', { ms: String(probe.latencyMs), count: String(probe.toolCount ?? 0) }))
    } else {
      log(t('logProbeFail', { error: probe.error ?? 'failed' }))
    }
  }, [probe, log, t])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (needle === '') return tools
    return tools.filter((tool) => tool.name.toLowerCase().includes(needle)
      || (tool.description ?? '').toLowerCase().includes(needle))
  }, [tools, query])

  const tabLabel = (key: TabKey): string => {
    switch (key) {
      case 'overview': return t('tabOverview')
      case 'tools': return `${t('tabTools')} (${tools.length})`
      case 'prompts': return t('tabPrompts')
      case 'resources': return t('tabResources')
      default: return t('tabLogs')
    }
  }

  return (
    <div className="dshmcp-detail">
      <div className="dshmcp-detail-head">
        <button type="button" className="dshmcp-iconbtn" title={t('back')} onClick={onBack}>
          <span className="dshmcp-back">←</span>
        </button>
        <span className="dshmcp-detail-name">{server.serverName || t('unnamed')}</span>
        {version !== undefined ? <span className="dshmcp-row-version" title={version}>{shortVersion(version)}</span> : null}
        <span className={`dshmcp-status dshmcp-status-${status.tone}`}>
          <span className="dshmcp-status-dot" />
          {t(status.key, status.count !== undefined ? { count: status.count } : undefined)}
        </span>
        <span className="dshmcp-spacer" />
        <button
          type="button"
          role="switch"
          aria-checked={server.enabled}
          className={`dshmcp-switch${server.enabled ? ' dshmcp-switch-on' : ''}${busy ? ' dshmcp-switch-busy' : ''}`}
          disabled={busy}
          title={server.enabled ? t('disable') : t('enable')}
          onClick={onToggle}
        >
          <span className="dshmcp-switch-knob" />
        </button>
      </div>

      <div className="dshmcp-tabs" role="tablist">
        {(['overview', 'tools', 'prompts', 'resources', 'logs'] as TabKey[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={`dshmcp-tab${tab === key ? ' dshmcp-tab-active' : ''}`}
            onClick={() => setTab(key)}
          >
            {tabLabel(key)}
          </button>
        ))}
      </div>

      {tab === 'overview' ? (
        <div className="dshmcp-overview">
          <div className="dshmcp-kv"><span>{t('fieldStatus')}</span><b>{t(status.key, status.count !== undefined ? { count: status.count } : undefined)}</b></div>
          {server.fiberPhase === 'loading' ? (
            <p className="dshmcp-muted dshmcp-hint-inline">{t('loadingHint')}</p>
          ) : null}
          <div className="dshmcp-kv"><span>{t('fieldId')}</span><code>{server.id}</code></div>
          <div className="dshmcp-kv"><span>{t('fieldTransport')}</span><code>{server.transport}</code></div>
          <div className="dshmcp-kv"><span>{t('fieldTarget')}</span><code className="dshmcp-wrap">{targetOf(server)}</code></div>
          <div className="dshmcp-kv"><span>{t('fieldServerName')}</span><code>{server.serverName}</code></div>
          <div className="dshmcp-kv"><span>{t('tabTools')}</span><span>{t('toolCount', { count: String(server.toolCount) })}</span></div>
          {version !== undefined ? <div className="dshmcp-kv"><span>{t('fieldVersion')}</span><code>{version}</code></div> : null}
          {server.toolCallTimeoutMs !== undefined ? (
            <div className="dshmcp-kv"><span>{t('fieldTimeout')}</span><span>{String(server.toolCallTimeoutMs)} ms</span></div>
          ) : null}
          {patchPath !== undefined ? (
            <div className="dshmcp-kv"><span>{t('fieldPatch')}</span><code className="dshmcp-wrap">{patchPath}</code></div>
          ) : null}
          <div className="dshmcp-actions">
            <button type="button" className="dshmcp-btn dshmcp-btn-sm" onClick={onTest} disabled={busy}>
              <PlugIcon size={12} /> {t('test')}
            </button>
            <button type="button" className="dshmcp-btn dshmcp-btn-sm" onClick={onEdit} disabled={busy}>
              <EditIcon size={12} /> {t('edit')}
            </button>
            <button type="button" className="dshmcp-btn dshmcp-btn-sm" onClick={onToggle} disabled={busy}>
              <PowerIcon size={12} /> {server.enabled ? t('disable') : t('enable')}
            </button>
            <span className="dshmcp-spacer" />
            <button
              type="button"
              className="dshmcp-btn dshmcp-btn-sm dshmcp-btn-danger"
              onClick={onRemove}
              disabled={busy}
              title={server.userManaged ? t('remove') : t('bundleDefined')}
            >
              <TrashIcon size={12} /> {t('remove')}
            </button>
          </div>
        </div>
      ) : null}

      {tab === 'tools' ? (
        <div className="dshmcp-tabbody">
          <div className="dshmcp-toolbar">
            <input
              className="dshmcp-input dshmcp-search"
              placeholder={t('searchTools')}
              value={query}
              spellCheck={false}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="dshmcp-spacer" />
            <span className="dshmcp-muted">{t('toolCount', { count: String(tools.length) })}</span>
          </div>
          {filtered.length === 0 ? (
            <div className="dshmcp-empty">{tools.length === 0 ? t('noTools') : t('noMatch')}</div>
          ) : (
            <div className="dshmcp-toolrows">
              {filtered.map((tool) => {
                const expanded = open[tool.name] === true
                return (
                  <div className={`dshmcp-toolrow${expanded ? ' dshmcp-toolrow-open' : ''}`} key={tool.name}>
                    <button
                      type="button"
                      className="dshmcp-toolrow-head"
                      aria-expanded={expanded}
                      onClick={() => setOpen((prev) => ({ ...prev, [tool.name]: !prev[tool.name] }))}
                    >
                      <span className="dshmcp-caret">▸</span>
                      <code className="dshmcp-tool-name">{tool.name}</code>
                      <span className="dshmcp-tool-preview">{tool.description ?? ''}</span>
                    </button>
                    {expanded ? (
                      <div className="dshmcp-toolrow-body">
                        <div className="dshmcp-section-label">{t('description')}</div>
                        <p className="dshmcp-tool-desc">{tool.description ?? '—'}</p>
                        <div className="dshmcp-section-label">{t('inputSchema')}</div>
                        <ParamsTable schema={tool.parameters} t={t} />
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ) : null}

      {tab === 'prompts' || tab === 'resources' ? (
        <div className="dshmcp-tabbody">
          <div className="dshmcp-toolbar">
            <span className="dshmcp-muted">
              {inspecting ? t('inspectLoading') : inspectError !== null ? t('inspectFailed', { error: inspectError }) : ''}
            </span>
            <span className="dshmcp-spacer" />
            <button
              type="button"
              className="dshmcp-btn dshmcp-btn-sm"
              disabled={inspecting}
              onClick={() => { void runInspect() }}
            >
              {inspecting ? <span className="dshmcp-spin" /> : <RefreshIcon size={12} />} {t('refresh')}
            </button>
          </div>
          {inspecting && inspect === null ? (
            <div className="dshmcp-empty"><span className="dshmcp-spin" /> {t('inspectLoading')}</div>
          ) : null}
          {tab === 'prompts' ? (
            inspect !== null && inspect.prompts.length > 0 ? (
              <div className="dshmcp-items">
                {inspect.prompts.map((prompt) => (
                  <div className="dshmcp-item" key={prompt.name}>
                    <code className="dshmcp-item-name">{prompt.name}</code>
                    <span className="dshmcp-item-desc">{prompt.description ?? ''}</span>
                  </div>
                ))}
              </div>
            ) : inspect !== null ? (
              <div className="dshmcp-empty">{t('noPrompts')}</div>
            ) : null
          ) : inspect !== null && inspect.resources.length > 0 ? (
            <div className="dshmcp-items">
              {inspect.resources.map((resource) => (
                <div className="dshmcp-item" key={resource.uri}>
                  <code className="dshmcp-item-name">{resource.name || resource.uri}</code>
                  <span className="dshmcp-item-desc">{resource.description ?? ''}</span>
                  <code className="dshmcp-item-uri" title={resource.uri}>{resource.uri}</code>
                  {resource.mimeType !== undefined ? (
                    <span className="dshmcp-item-mime">{resource.mimeType}</span>
                  ) : null}
                </div>
              ))}
            </div>
          ) : inspect !== null ? (
            <div className="dshmcp-empty">{t('noResources')}</div>
          ) : null}
        </div>
      ) : null}

      {tab === 'logs' ? (
        <div className="dshmcp-tabbody">
          {logs.length === 0 ? (
            <div className="dshmcp-empty">{t('logsEmpty')}</div>
          ) : (
            <div className="dshmcp-logs">
              {logs.map((entry, index) => (
                <div className="dshmcp-logline" key={`${entry.at}-${index}`}>
                  <span className="dshmcp-logtime">{entry.at}</span>
                  <span className="dshmcp-logtext">{entry.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
