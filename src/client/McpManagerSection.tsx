/**
 * MCP Manager settings section: server list with live status, add/remove,
 * enable/disable, edit and on-demand connectivity tests. Rendered inside the
 * Settings panel as the "MCP" page (a `settings.section` entry).
 *
 * Copy is fully localized (zh/en) through the shell's locale service and
 * follows the active GUI language automatically. The add form sits at the top
 * of the page; the edit form opens **in place of** the card being edited, and
 * the two modes are mutually exclusive.
 *
 * All data flows through the typed RPC client to the host half.
 *
 * @module dsh-mcp-manager-web/client/McpManagerSection
 */
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
// Type-only: pulls `Context { locale }` into the program.
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type { TranslateNS } from '@deepseek-ai/dsh-client-ui-slots'
import type { McpFieldErrors, McpProbeResult, McpServerConfig, McpServerInfo } from '../shared.ts'
import { callRpc, McpManagerRpcError } from './rpc.ts'
import { ServerDetail } from './ServerDetail.tsx'
import { NS } from './locales.ts'
import {
  ChevronDownIcon,
  FilterIcon,
  PlusIcon,
  RefreshIcon,
  McpIcon,
  SearchIcon,
} from './icons.tsx'

interface PatchInfo {
  path: string
  exists: boolean
}

/** Composed props: the settings shell's `close` owner share + injected ctx. */
interface SectionProps {
  close: () => void
  ctx: ClientContext
}

/** Status keys used by the card badge (a subset of the locale dictionary). */
type StatusKey =
  | 'statusConnected'
  | 'statusActiveNoTools'
  | 'statusFailed'
  | 'statusDisabled'
  | 'statusLoading'
  | 'statusPending'
  | 'statusUnloading'
  | 'statusNotLoaded'

function errorMessage(error: unknown, t: TranslateNS<typeof NS>): string {
  if (error instanceof McpManagerRpcError) {
    switch (error.code) {
      case 'duplicate-id': return t('errDuplicateId')
      case 'duplicate-server-name': return t('errDuplicateName')
      case 'invalid-config': return t('errInvalidConfig')
      case 'not-found': return t('errNotFound')
      default: return error.message.replace(/^[a-z-]+: /, '')
    }
  }
  return error instanceof Error ? error.message : String(error)
}

/** Derive the visual status of one server. */
function statusOf(server: McpServerInfo): { tone: string; key: StatusKey; count?: string } {
  if (!server.enabled) return { tone: 'off', key: 'statusDisabled' }
  switch (server.fiberPhase) {
    case 'active':
      // The fiber being active only means the mcp-client entry is running;
      // the MCP handshake succeeded only when tools are actually registered.
      // With zero tools the server is effectively not connected, so it must
      // never render green (that would mislead users into thinking the
      // connection is healthy when it failed, e.g. HTTP 401 / crash loop).
      return server.toolCount > 0
        ? { tone: 'ok', key: 'statusConnected', count: String(server.toolCount) }
        : { tone: 'warn', key: 'statusActiveNoTools' }
    case 'failed':
      return { tone: 'bad', key: 'statusFailed' }
    case 'loading':
      return { tone: 'warn', key: 'statusLoading' }
    case 'pending':
      return { tone: 'warn', key: 'statusPending' }
    case 'unloading':
      return { tone: 'warn', key: 'statusUnloading' }
    default:
      return { tone: 'off', key: 'statusNotLoaded' }
  }
}

/** Keep long server version strings readable inside a list row. */
function shortVersion(version: string): string {
  return version.length > 22 ? `${version.slice(0, 22)}…` : version
}

function targetOf(server: McpServerInfo): string {
  if (server.transport === 'stdio') {
    return [server.command, ...(server.args ?? [])].filter(Boolean).join(' ')
  }
  return server.url ?? ''
}

/**
 * The MCP Manager settings page body.
 * @param props - settings owner `close` + injected client context.
 */
export function McpManagerSection({ ctx }: SectionProps): JSX.Element {
  const t = ctx.locale.bind(NS)
  const [, bump] = useReducer((x: number) => x + 1, 0)
  useEffect(() => ctx.locale.subscribe(bump), [ctx])

  const [servers, setServers] = useState<McpServerInfo[]>([])
  const [patchInfo, setPatchInfo] = useState<PatchInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [detailId, setDetailId] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [probes, setProbes] = useState<Record<string, McpProbeResult>>({})
  const [versions, setVersions] = useState<Record<string, string>>({})
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [connectedOnly, setConnectedOnly] = useState(false)

  /** Optimistic enable/disable intents, kept until the loader catches up. */
  const pendingToggles = useRef<Record<string, boolean>>({})

  const formOpen = adding || editingId !== null
  const actionsDisabled = busy !== null || formOpen

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { servers: list } = await callRpc<{ servers: McpServerInfo[] }>(ctx, 'list')
      setServers(list.map((server) => {
        const intent = pendingToggles.current[server.id]
        if (intent === undefined) return server
        if (server.enabled === intent) {
          delete pendingToggles.current[server.id]
          return server
        }
        return { ...server, enabled: intent, fiberPhase: intent ? server.fiberPhase : null }
      }))
      const { patch } = await callRpc<{ patch: PatchInfo }>(ctx, 'patchInfo')
      setPatchInfo(patch)
    } catch (err) {
      setError(errorMessage(err, t))
    } finally {
      setLoading(false)
    }
  }, [ctx, t])

  useEffect(() => { void refresh() }, [refresh])

  /** Refresh, then re-poll a few times while the HMR reload settles. */
  const refreshSettled = useCallback(() => {
    void refresh()
    window.setTimeout(() => { void refresh() }, 800)
    window.setTimeout(() => { void refresh() }, 2400)
  }, [refresh])

  const run = useCallback(async (action: () => Promise<unknown>, label: string) => {
    setBusy(label)
    setError(null)
    try {
      await action()
      refreshSettled()
    } catch (err) {
      setError(errorMessage(err, t))
    } finally {
      setBusy(null)
    }
  }, [refreshSettled, t])

  const toggleEnabled = useCallback((server: McpServerInfo) => {
    const next = !server.enabled
    const key = `toggle:${server.id}`
    pendingToggles.current[server.id] = next
    window.setTimeout(() => {
      if (pendingToggles.current[server.id] === next) delete pendingToggles.current[server.id]
    }, 6000)
    setServers((prev) => prev.map((item) => (item.id === server.id
      ? { ...item, enabled: next, fiberPhase: next ? item.fiberPhase : null }
      : item)))
    setBusy(key)
    setError(null)
    void (async () => {
      try {
        await callRpc(ctx, 'setEnabled', { id: server.id, enabled: next })
        window.setTimeout(() => { void refresh() }, 700)
        window.setTimeout(() => { void refresh() }, 2200)
      } catch (err) {
        delete pendingToggles.current[server.id]
        setServers((prev) => prev.map((item) => (item.id === server.id ? { ...item, enabled: !next } : item)))
        setError(errorMessage(err, t))
      } finally {
        setBusy(null)
      }
    })()
  }, [ctx, refresh, t])

  const removeServer = useCallback((server: McpServerInfo) => {
    if (!window.confirm(t('removeConfirm', { name: server.serverName, id: server.id }))) return
    void run(() => callRpc(ctx, 'remove', { id: server.id }), `remove:${server.id}`)
  }, [ctx, run, t])

  const testConnection = useCallback((server: McpServerInfo) => {
    void run(async () => {
      const result = await callRpc<McpProbeResult>(ctx, 'probe', { id: server.id })
      setProbes((prev) => ({ ...prev, [server.id]: result }))
      if (result.ok && typeof result.serverVersion === 'string' && result.serverVersion !== '') {
        setVersions((prev) => ({ ...prev, [server.id]: result.serverVersion as string }))
      }
    }, `probe:${server.id}`)
  }, [ctx, run])

  const handleVersion = useCallback((id: string, version: string) => {
    setVersions((prev) => ({ ...prev, [id]: version }))
  }, [])

  const beginAdd = useCallback(() => {
    setEditingId(null)
    setDetailId(null)
    setAdding(true)
  }, [])

  const closeForms = useCallback(() => {
    setAdding(false)
    setEditingId(null)
  }, [])

  const beginEdit = useCallback((server: McpServerInfo) => {
    setAdding(false)
    setEditingId(server.id)
  }, [])

  const summary = useMemo(() => {
    const enabled = servers.filter((s) => s.enabled).length
    const connected = servers.filter((s) => s.enabled && s.fiberPhase === 'active' && s.toolCount > 0).length
    const failed = servers.filter((s) => s.enabled && s.fiberPhase === 'failed').length
    return { total: servers.length, enabled, connected, failed }
  }, [servers])

  const footer = patchInfo !== null ? (
    <div className="dshmcp-footer" title={patchInfo.path}>
      {patchInfo.exists ? patchInfo.path : t('patchMissing', { path: patchInfo.path })}
    </div>
  ) : null

  const detailServer = detailId !== null ? servers.find((server) => server.id === detailId) : undefined
  if (detailServer !== undefined) {
    return (
      <div className="dshmcp-section">
        <ServerDetail
          ctx={ctx}
          t={t}
          server={detailServer}
          probe={probes[detailServer.id]}
          patchPath={patchInfo?.path}
          busy={actionsDisabled}
          onBack={() => setDetailId(null)}
          onToggle={() => toggleEnabled(detailServer)}
          onTest={() => testConnection(detailServer)}
          onEdit={() => { setDetailId(null); beginEdit(detailServer) }}
          onRemove={() => removeServer(detailServer)}
          onVersion={handleVersion}
        />
        {footer}
      </div>
    )
  }

  const needle = query.trim().toLowerCase()
  const visible = servers.filter((server) => {
    if (connectedOnly && !(server.enabled && server.fiberPhase === 'active' && server.toolCount > 0)) return false
    if (needle === '') return true
    return server.serverName.toLowerCase().includes(needle) || server.id.toLowerCase().includes(needle)
  })

  return (
    <div className="dshmcp-section">
      <div className="dshmcp-head">
        <span className="dshmcp-head-title">
          <McpIcon size={17} />
          {t('title')}
        </span>
        <span className="dshmcp-head-sub">{t('total', { count: String(summary.total) })}</span>
        <span className="dshmcp-spacer" />
        <button
          type="button"
          className="dshmcp-iconbtn"
          title={t('refresh')}
          onClick={() => void refresh()}
          disabled={loading}
        >
          {loading ? <span className="dshmcp-spin" /> : <RefreshIcon size={14} />}
        </button>
        <button
          type="button"
          className={`dshmcp-iconbtn${connectedOnly ? ' dshmcp-iconbtn-on' : ''}`}
          title={t('filterConnected')}
          onClick={() => setConnectedOnly((value) => !value)}
        >
          <FilterIcon size={15} />
        </button>
        <button
          type="button"
          className={`dshmcp-iconbtn${searchOpen ? ' dshmcp-iconbtn-on' : ''}`}
          title={t('searchServers')}
          onClick={() => setSearchOpen((value) => !value)}
        >
          <SearchIcon size={15} />
        </button>
        <button
          type="button"
          className="dshmcp-btn dshmcp-btn-primary dshmcp-btn-sm"
          onClick={beginAdd}
          disabled={actionsDisabled}
        >
          <PlusIcon size={12} /> {t('addServer')} <ChevronDownIcon size={12} />
        </button>
      </div>

      {searchOpen ? (
        <input
          className="dshmcp-input dshmcp-search"
          autoFocus
          placeholder={t('searchServers')}
          value={query}
          spellCheck={false}
          onChange={(e) => setQuery(e.target.value)}
        />
      ) : null}

      {error !== null ? <div className="dshmcp-error">{error}</div> : null}

      {adding ? (
        <ServerForm
          ctx={ctx}
          t={t}
          initial={undefined}
          existingIds={new Set(servers.map((s) => s.id))}
          existingNames={new Set(servers.map((s) => s.serverName))}
          busy={busy !== null}
          onCancel={closeForms}
          onSaved={() => {
            closeForms()
            void run(() => Promise.resolve(), 'form:add')
          }}
        />
      ) : null}

      {editingId !== null ? (
        <ServerForm
          ctx={ctx}
          t={t}
          initial={servers.find((server) => server.id === editingId)}
          existingIds={new Set(servers.map((s) => s.id))}
          existingNames={new Set(servers.map((s) => s.serverName))}
          busy={busy !== null}
          onCancel={closeForms}
          onSaved={() => {
            closeForms()
            void run(() => Promise.resolve(), 'form:update')
          }}
        />
      ) : null}

      {loading && servers.length === 0 ? (
        <div className="dshmcp-empty"><span className="dshmcp-spin" /> {t('loading')}</div>
      ) : null}

      {!loading && servers.length === 0 ? (
        <div className="dshmcp-empty">
          {t('empty')}
          <br />
          {t('emptyHint')}
        </div>
      ) : null}

      {servers.length > 0 ? (
        <div className="dshmcp-rows">
          {visible.length === 0 ? <div className="dshmcp-empty">{t('noMatch')}</div> : null}
          {visible.map((server) => {
            const status = statusOf(server)
            const version = versions[server.id]
            return (
              <div className={`dshmcp-row${server.enabled ? '' : ' dshmcp-row-off'}`} key={server.id}>
                <button
                  type="button"
                  className="dshmcp-row-main"
                  onClick={() => {
                    setAdding(false)
                    setEditingId(null)
                    setDetailId(server.id)
                  }}
                >
                  <span className={`dshmcp-dot dshmcp-dot-${status.tone}`} />
                  <span className="dshmcp-row-name">{server.serverName || t('unnamed')}</span>
                  {version !== undefined ? <span className="dshmcp-row-version" title={version}>{shortVersion(version)}</span> : null}
                  <span className="dshmcp-badge">{server.transport === 'stdio' ? 'stdio' : t('badgeStreaming')}</span>
                  <span className="dshmcp-row-tools">{t('toolCount', { count: String(server.toolCount) })}</span>
                </button>
                <button
                  type="button"
                  role="switch"
                  aria-checked={server.enabled}
                  className={`dshmcp-switch${server.enabled ? ' dshmcp-switch-on' : ''}${busy === `toggle:${server.id}` ? ' dshmcp-switch-busy' : ''}`}
                  disabled={formOpen || (busy !== null && busy !== `toggle:${server.id}`)}
                  title={server.enabled ? t('disable') : t('enable')}
                  onClick={() => toggleEnabled(server)}
                >
                  <span className="dshmcp-switch-knob" />
                </button>
              </div>
            )
          })}
        </div>
      ) : null}

      {footer}
    </div>
  )
}

interface ServerFormProps {
  ctx: ClientContext
  t: TranslateNS<typeof NS>
  initial?: McpServerInfo
  existingIds: Set<string>
  existingNames: Set<string>
  busy: boolean
  onCancel: () => void
  onSaved: () => void
}

interface FormState {
  id: string
  serverName: string
  transport: 'stdio' | 'streamable-http'
  url: string
  command: string
  argsText: string
  envText: string
  cwd: string
  headersText: string
  toolCallTimeoutMs: string
  failOnStartupError: boolean
}

const EMPTY_FORM: FormState = {
  id: '',
  serverName: '',
  transport: 'streamable-http',
  url: '',
  command: '',
  argsText: '',
  envText: '',
  cwd: '',
  headersText: '',
  toolCallTimeoutMs: '',
  failOnStartupError: false,
}

function toForm(server: McpServerInfo | undefined): FormState {
  if (server === undefined) return EMPTY_FORM
  return {
    id: server.id,
    serverName: server.serverName,
    transport: server.transport,
    url: server.url ?? '',
    command: server.command ?? '',
    argsText: (server.args ?? []).join('\n'),
    envText: (server.env !== undefined ? Object.entries(server.env).map(([k, v]) => `${k}=${v}`) : []).join('\n'),
    cwd: server.cwd ?? '',
    headersText: (server.headers !== undefined ? Object.entries(server.headers).map(([k, v]) => `${k}: ${v}`) : []).join('\n'),
    toolCallTimeoutMs: server.toolCallTimeoutMs !== undefined ? String(server.toolCallTimeoutMs) : '',
    failOnStartupError: server.failOnStartupError === true,
  }
}

function splitLines(text: string): string[] {
  return text.split(/\r?\n/).map((line) => line.trim()).filter((line) => line !== '')
}

/** Trim surrounding quotes from a pasted JSON-style key/value pair. */
function stripQuotes(value: string): string {
  const trimmed = value.trim()
  if (trimmed.length >= 2) {
    const first = trimmed[0]
    const last = trimmed[trimmed.length - 1]
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return trimmed.slice(1, -1).trim()
    }
  }
  return trimmed
}

function parsePairs(text: string): Record<string, string> | undefined {
  const lines = splitLines(text)
  if (lines.length === 0) return undefined
  const out: Record<string, string> = {}
  for (const line of lines) {
    const eq = line.indexOf('=')
    const colon = line.indexOf(':')
    const sep = eq === -1 ? colon : colon === -1 ? eq : Math.min(eq, colon)
    if (sep <= 0) continue
    out[stripQuotes(line.slice(0, sep))] = stripQuotes(line.slice(sep + 1))
  }
  return out
}

function toConfig(form: FormState): McpServerConfig {
  const config: McpServerConfig = {
    serverName: form.serverName.trim(),
    transport: form.transport,
  }
  if (form.transport === 'streamable-http') {
    if (form.url.trim() !== '') config.url = form.url.trim()
  } else {
    if (form.command.trim() !== '') config.command = form.command.trim()
    const args = splitLines(form.argsText)
    if (args.length > 0) config.args = args
    const env = parsePairs(form.envText)
    if (env !== undefined) config.env = env
    if (form.cwd.trim() !== '') config.cwd = form.cwd.trim()
  }
  const headers = parsePairs(form.headersText)
  if (headers !== undefined) config.headers = headers
  if (form.toolCallTimeoutMs.trim() !== '' && Number.isFinite(Number(form.toolCallTimeoutMs))) {
    config.toolCallTimeoutMs = Number(form.toolCallTimeoutMs)
  }
  if (form.failOnStartupError) config.failOnStartupError = true
  return config
}

/**
 * Add/edit server form with per-field validation feedback. Localized labels
 * and validation messages; when editing, the id field is locked.
 * @param props - form context and callbacks.
 */
function ServerForm({ ctx, t, initial, existingIds, existingNames, busy, onCancel, onSaved }: ServerFormProps): JSX.Element {
  const editing = initial !== undefined
  const [form, setForm] = useState<FormState>(() => toForm(initial))
  const [fieldErrors, setFieldErrors] = useState<McpFieldErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]): void => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const validateLocal = (): McpFieldErrors => {
    const errors: McpFieldErrors = {}
    if (form.id.trim() === '') errors['id'] = t('errIdRequired')
    else if (!/^[A-Za-z0-9_-]{1,64}$/.test(form.id.trim())) errors['id'] = t('errIdPattern')
    else if (!editing && existingIds.has(form.id.trim())) errors['id'] = t('errIdTaken')
    if (form.serverName.trim() === '') errors['serverName'] = t('errNameRequired')
    else if (!/^[A-Za-z0-9_-]{1,32}$/.test(form.serverName.trim())) errors['serverName'] = t('errNamePattern')
    else if (!editing && existingNames.has(form.serverName.trim())) errors['serverName'] = t('errNameTaken')
    if (form.transport === 'streamable-http' && form.url.trim() === '') errors['url'] = t('errUrlRequired')
    if (form.transport === 'stdio' && form.command.trim() === '') errors['command'] = t('errCommandRequired')
    return errors
  }

  const submit = async (): Promise<void> => {
    const local = validateLocal()
    setFieldErrors(local)
    if (Object.keys(local).length > 0) return
    setSaving(true)
    setSubmitError(null)
    try {
      const payload = { id: form.id.trim(), config: toConfig(form) }
      if (editing) {
        await callRpc(ctx, 'update', payload)
      } else {
        await callRpc(ctx, 'add', payload)
      }
      onSaved()
    } catch (err) {
      if (err instanceof McpManagerRpcError && err.fields !== undefined) setFieldErrors(err.fields)
      setSubmitError(errorMessage(err, t))
    } finally {
      setSaving(false)
    }
  }

  const err = (key: keyof McpFieldErrors): string | undefined => fieldErrors[key]
  const inputClass = (key: keyof McpFieldErrors): string =>
    `dshmcp-input${err(key) !== undefined ? ' dshmcp-input-invalid' : ''}`

  return (
    <div className="dshmcp-form">
      <div className="dshmcp-form-title">
        {editing ? t('formEditTitle', { name: initial!.serverName }) : t('formAddTitle')}
      </div>

      <div className="dshmcp-field-row">
        <div className="dshmcp-field">
          <label className="dshmcp-label" htmlFor="dshmcp-id">{t('fieldId')}</label>
          <input
            id="dshmcp-id"
            className={inputClass('id')}
            value={form.id}
            placeholder="mcp-github"
            spellCheck={false}
            disabled={editing || saving || busy}
            onChange={(e) => set('id', e.target.value)}
          />
          {err('id') !== undefined ? <p className="dshmcp-hint">{err('id')}</p> : null}
        </div>
        <div className="dshmcp-field">
          <label className="dshmcp-label" htmlFor="dshmcp-server">{t('fieldServerName')}</label>
          <input
            id="dshmcp-server"
            className={inputClass('serverName')}
            value={form.serverName}
            placeholder="github"
            spellCheck={false}
            disabled={saving || busy}
            onChange={(e) => set('serverName', e.target.value)}
          />
          {err('serverName') !== undefined ? <p className="dshmcp-hint">{err('serverName')}</p> : null}
        </div>
      </div>

      <div className="dshmcp-field">
        <label className="dshmcp-label" htmlFor="dshmcp-transport">{t('fieldTransport')}</label>
        <select
          id="dshmcp-transport"
          className="dshmcp-select"
          value={form.transport}
          disabled={saving || busy}
          onChange={(e) => set('transport', e.target.value as 'stdio' | 'streamable-http')}
        >
          <option value="streamable-http">streamable-http</option>
          <option value="stdio">stdio</option>
        </select>
      </div>

      {form.transport === 'streamable-http' ? (
        <div className="dshmcp-field">
          <label className="dshmcp-label" htmlFor="dshmcp-url">{t('fieldUrl')}</label>
          <input
            id="dshmcp-url"
            className={inputClass('url')}
            value={form.url}
            placeholder="http://127.0.0.1:3000/mcp"
            spellCheck={false}
            disabled={saving || busy}
            onChange={(e) => set('url', e.target.value)}
          />
          {err('url') !== undefined ? <p className="dshmcp-hint">{err('url')}</p> : null}
        </div>
      ) : (
        <>
          <div className="dshmcp-field">
            <label className="dshmcp-label" htmlFor="dshmcp-command">{t('fieldCommand')}</label>
            <input
              id="dshmcp-command"
              className={inputClass('command')}
              value={form.command}
              placeholder="npx"
              spellCheck={false}
              disabled={saving || busy}
              onChange={(e) => set('command', e.target.value)}
            />
            {err('command') !== undefined ? <p className="dshmcp-hint">{err('command')}</p> : null}
          </div>
          <div className="dshmcp-field">
            <label className="dshmcp-label" htmlFor="dshmcp-args">{t('fieldArgs')}</label>
            <textarea
              id="dshmcp-args"
              className="dshmcp-input"
              rows={3}
              value={form.argsText}
              placeholder={'-y\n@modelcontextprotocol/server-github'}
              spellCheck={false}
              disabled={saving || busy}
              onChange={(e) => set('argsText', e.target.value)}
            />
          </div>
          <div className="dshmcp-field">
            <label className="dshmcp-label" htmlFor="dshmcp-env">{t('fieldEnv')}</label>
            <textarea
              id="dshmcp-env"
              className="dshmcp-input"
              rows={3}
              value={form.envText}
              placeholder={'GITHUB_TOKEN=ghp_xxx'}
              spellCheck={false}
              disabled={saving || busy}
              onChange={(e) => set('envText', e.target.value)}
            />
          </div>
          <div className="dshmcp-field">
            <label className="dshmcp-label" htmlFor="dshmcp-cwd">{t('fieldCwd')}</label>
            <input
              id="dshmcp-cwd"
              className="dshmcp-input"
              value={form.cwd}
              spellCheck={false}
              disabled={saving || busy}
              onChange={(e) => set('cwd', e.target.value)}
            />
          </div>
        </>
      )}

      <div className="dshmcp-field">
        <label className="dshmcp-label" htmlFor="dshmcp-headers">{t('fieldHeaders')}</label>
        <textarea
          id="dshmcp-headers"
          className="dshmcp-input"
          rows={2}
          value={form.headersText}
          placeholder={'Authorization: Bearer xxx'}
          spellCheck={false}
          disabled={saving || busy}
          onChange={(e) => set('headersText', e.target.value)}
        />
      </div>

      <div className="dshmcp-field-row">
        <div className="dshmcp-field">
          <label className="dshmcp-label" htmlFor="dshmcp-timeout">{t('fieldTimeout')}</label>
          <input
            id="dshmcp-timeout"
            className="dshmcp-input"
            value={form.toolCallTimeoutMs}
            inputMode="numeric"
            placeholder="60000"
            disabled={saving || busy}
            onChange={(e) => set('toolCallTimeoutMs', e.target.value.replace(/[^0-9]/g, ''))}
          />
        </div>
        <div className="dshmcp-field" style={{ justifyContent: 'flex-end' }}>
          <label className="dshmcp-check">
            <input
              type="checkbox"
              checked={form.failOnStartupError}
              disabled={saving || busy}
              onChange={(e) => set('failOnStartupError', e.target.checked)}
            />
            {t('fieldFailStartup')}
          </label>
        </div>
      </div>

      {submitError !== null ? <div className="dshmcp-error">{submitError}</div> : null}

      <div className="dshmcp-form-actions">
        <button type="button" className="dshmcp-btn dshmcp-btn-sm" onClick={onCancel} disabled={saving}>
          {t('cancel')}
        </button>
        <button type="button" className="dshmcp-btn dshmcp-btn-sm dshmcp-btn-primary" onClick={() => void submit()} disabled={saving || busy}>
          {saving ? <span className="dshmcp-spin" /> : null} {editing ? t('save') : t('addServer')}
        </button>
      </div>
    </div>
  )
}
