/**
 * Locale dictionaries for the MCP Manager section. The web GUI's active
 * locale (zh/en) selects the dictionary automatically; technical identifiers
 * (serverName, transport names, config keys) stay untranslated in both.
 *
 * @module dsh-mcp-manager-web/client/locales
 */

/** Locale namespace for this plugin's copy. */
export const NS = 'mcpManager'

/** Key union merged into the slots LocaleNamespaceMap. */
export type McpManagerKeys =
  | 'nav'
  | 'title'
  | 'unnamed'
  | 'total'
  | 'addServer'
  | 'connected'
  | 'failed'
  | 'enabledOf'
  | 'refresh'
  | 'loading'
  | 'empty'
  | 'emptyHint'
  | 'patchMissing'
  | 'removeConfirm'
  | 'statusConnected'
  | 'statusActiveNoTools'
  | 'statusFailed'
  | 'statusDisabled'
  | 'statusLoading'
  | 'statusPending'
  | 'statusUnloading'
  | 'statusNotLoaded'
  | 'toolCount'
  | 'toolsShow'
  | 'toolsHide'
  | 'bundleDefined'
  | 'reconnectOff'
  | 'probeOk'
  | 'probeFail'
  | 'enable'
  | 'disable'
  | 'test'
  | 'edit'
  | 'remove'
  | 'formAddTitle'
  | 'formEditTitle'
  | 'fieldId'
  | 'fieldServerName'
  | 'fieldTransport'
  | 'fieldUrl'
  | 'fieldCommand'
  | 'fieldArgs'
  | 'fieldEnv'
  | 'fieldCwd'
  | 'fieldHeaders'
  | 'fieldTimeout'
  | 'fieldFailStartup'
  | 'cancel'
  | 'save'
  | 'errIdRequired'
  | 'errIdPattern'
  | 'errIdTaken'
  | 'errNameRequired'
  | 'errNamePattern'
  | 'errNameTaken'
  | 'errUrlRequired'
  | 'errCommandRequired'
  | 'errDuplicateId'
  | 'errDuplicateName'
  | 'errInvalidConfig'
  | 'errNotFound'
  | 'errUnknown'
  | 'back'
  | 'tabOverview'
  | 'tabTools'
  | 'tabPrompts'
  | 'tabResources'
  | 'tabLogs'
  | 'searchServers'
  | 'searchTools'
  | 'filterConnected'
  | 'badgeStreaming'
  | 'noTools'
  | 'noPrompts'
  | 'noResources'
  | 'noMatch'
  | 'noParams'
  | 'description'
  | 'inputSchema'
  | 'schemaName'
  | 'schemaType'
  | 'schemaDesc'
  | 'schemaDefault'
  | 'inspectLoading'
  | 'inspectFailed'
  | 'logsEmpty'
  | 'logOpened'
  | 'logProbeOk'
  | 'logProbeFail'
  | 'logInspectOk'
  | 'logInspectFail'
  | 'fieldStatus'
  | 'fieldTarget'
  | 'fieldPatch'
  | 'fieldVersion'
  | 'loadingHint'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    mcpManager: McpManagerKeys
  }
}

/** Simplified lookup type (the LocaleDictOf resolution needs the merge above). */
export type McpManagerDict = Record<McpManagerKeys, string>

/** Simplified lookup type (the LocaleDictOf resolution needs the merge above). */
export const zh: McpManagerDict = {
  nav: 'MCP',
  title: 'MCP 服务器',
  unnamed: '（未命名）',
  total: '共 {count} 个',
  addServer: '添加服务器',
  connected: '{count} 个已连接',
  failed: '{count} 个失败',
  enabledOf: '{count}/{total} 已启用',
  refresh: '刷新',
  loading: '正在加载服务器…',
  empty: '尚未配置 MCP 服务器。',
  emptyHint: '点击“添加服务器”开始接入。',
  patchMissing: '补丁文件缺失：{path}',
  removeConfirm: '删除 MCP 服务器 “{name}”（{id}）？\n此操作会修改 cordis.patch.yml 并断开其工具。',
  statusConnected: '已连接 · {count} 个工具',
  statusActiveNoTools: '未连接 · 无工具',
  statusFailed: '失败',
  statusDisabled: '已停用',
  statusLoading: '加载中',
  statusPending: '等待中',
  statusUnloading: '卸载中',
  statusNotLoaded: '未加载',
  toolCount: '{count} 个工具',
  toolsShow: '查看 {count} 个工具',
  toolsHide: '收起工具',
  bundleDefined: 'bundle 定义',
  reconnectOff: '已关闭重连',
  probeOk: '✓ 已连接，耗时 {ms}ms · {count} 个工具',
  probeFail: '✗ {error}（{ms}ms）',
  enable: '启用',
  disable: '停用',
  test: '测试',
  edit: '编辑',
  remove: '删除',
  formAddTitle: '添加 MCP 服务器',
  formEditTitle: '编辑 {name}',
  fieldId: '条目 ID',
  fieldServerName: 'serverName',
  fieldTransport: '传输方式',
  fieldUrl: 'URL',
  fieldCommand: '命令',
  fieldArgs: '参数（每行一个）',
  fieldEnv: '环境变量（KEY=VALUE，每行一个）',
  fieldCwd: '工作目录（可选）',
  fieldHeaders: '请求头（Key: Value，每行一个）',
  fieldTimeout: '超时（毫秒，可选）',
  fieldFailStartup: '启动失败即报错',
  cancel: '取消',
  save: '保存更改',
  errIdRequired: '条目 ID 必填',
  errIdPattern: '需匹配 [A-Za-z0-9_-]{1,64}',
  errIdTaken: '条目 ID 已被占用',
  errNameRequired: 'serverName 必填',
  errNamePattern: '需匹配 [A-Za-z0-9_-]{1,32}',
  errNameTaken: 'serverName 已被占用',
  errUrlRequired: 'URL 必填',
  errCommandRequired: '命令必填',
  errDuplicateId: '条目 ID 已被使用',
  errDuplicateName: 'serverName 已被其他服务器使用',
  errInvalidConfig: 'MCP 服务器配置无效',
  errNotFound: '未找到该 MCP 服务器条目',
  back: '返回',
  tabOverview: '通用',
  tabTools: '工具',
  tabPrompts: '提示',
  tabResources: '资源',
  tabLogs: '日志',
  searchServers: '搜索服务器…',
  searchTools: '搜索工具…',
  filterConnected: '只看已连接',
  badgeStreaming: '流式',
  noTools: '当前连接没有可用工具',
  noPrompts: '当前连接未提供提示',
  noResources: '当前连接未提供资源',
  noMatch: '没有匹配项',
  noParams: '无参数',
  description: '描述',
  inputSchema: '输入模式',
  schemaName: '参数',
  schemaType: '类型',
  schemaDesc: '说明',
  schemaDefault: '（默认 {value}）',
  inspectLoading: '正在连接读取…',
  inspectFailed: '读取失败：{error}',
  logsEmpty: '暂无日志',
  logOpened: '打开 {name} 的详情',
  logProbeOk: '连接探测成功 · {ms}ms · {count} 个工具',
  logProbeFail: '连接探测失败：{error}',
  logInspectOk: '读取服务信息 · {ms}ms · 提示 {prompts} · 资源 {resources}',
  logInspectFail: '读取服务信息失败：{error}',
  fieldStatus: '连接状态',
  fieldTarget: '目标',
  fieldPatch: '补丁文件',
  fieldVersion: '服务版本',
  loadingHint: '长时间停在“加载中”，可尝试停用后再启用；仍不行则重启一次 DSH。',
  errUnknown: '操作失败',
}

/** English dictionary. */
export const en: McpManagerDict = {
  nav: 'MCP',
  title: 'MCP servers',
  unnamed: '(unnamed)',
  total: '{count} total',
  addServer: 'Add server',
  connected: '{count} connected',
  failed: '{count} failed',
  enabledOf: '{count}/{total} enabled',
  refresh: 'Refresh',
  loading: 'Loading servers…',
  empty: 'No MCP servers configured.',
  emptyHint: 'Use “Add server” to connect one.',
  patchMissing: 'patch file missing: {path}',
  removeConfirm: 'Remove MCP server "{name}" ({id})?\nThis edits cordis.patch.yml and disconnects its tools.',
  statusConnected: 'Connected · {count} tools',
  statusActiveNoTools: 'Not connected · no tools',
  statusFailed: 'Failed',
  statusDisabled: 'Disabled',
  statusLoading: 'Loading',
  statusPending: 'Pending',
  statusUnloading: 'Unloading',
  statusNotLoaded: 'Not loaded',
  toolCount: '{count} tools',
  toolsShow: 'Show {count} tools',
  toolsHide: 'Hide tools',
  bundleDefined: 'bundle-defined',
  reconnectOff: 'reconnect off',
  probeOk: '✓ Connected in {ms}ms · {count} tools',
  probeFail: '✗ {error} ({ms}ms)',
  enable: 'Enable',
  disable: 'Disable',
  test: 'Test',
  edit: 'Edit',
  remove: 'Remove',
  formAddTitle: 'Add MCP server',
  formEditTitle: 'Edit {name}',
  fieldId: 'Entry id',
  fieldServerName: 'serverName',
  fieldTransport: 'Transport',
  fieldUrl: 'URL',
  fieldCommand: 'Command',
  fieldArgs: 'Args (one per line)',
  fieldEnv: 'Env (KEY=VALUE, one per line)',
  fieldCwd: 'Working directory (optional)',
  fieldHeaders: 'Headers (Key: Value, one per line)',
  fieldTimeout: 'Timeout (ms, optional)',
  fieldFailStartup: 'Fail on startup error',
  cancel: 'Cancel',
  save: 'Save changes',
  errIdRequired: 'Entry id is required',
  errIdPattern: 'Match [A-Za-z0-9_-]{1,64}',
  errIdTaken: 'Entry id already in use',
  errNameRequired: 'serverName is required',
  errNamePattern: 'Match [A-Za-z0-9_-]{1,32}',
  errNameTaken: 'serverName already in use',
  errUrlRequired: 'URL is required',
  errCommandRequired: 'Command is required',
  errDuplicateId: 'Entry id is already in use',
  errDuplicateName: 'serverName is already used by another server',
  errInvalidConfig: 'Invalid MCP server configuration',
  errNotFound: 'MCP server entry not found',
  back: 'Back',
  tabOverview: 'Overview',
  tabTools: 'Tools',
  tabPrompts: 'Prompts',
  tabResources: 'Resources',
  tabLogs: 'Logs',
  searchServers: 'Search servers…',
  searchTools: 'Search tools…',
  filterConnected: 'Connected only',
  badgeStreaming: 'streaming',
  noTools: 'No tools on this connection',
  noPrompts: 'This server provides no prompts',
  noResources: 'This server provides no resources',
  noMatch: 'No matches',
  noParams: 'No parameters',
  description: 'Description',
  inputSchema: 'Input schema',
  schemaName: 'Parameter',
  schemaType: 'Type',
  schemaDesc: 'Description',
  schemaDefault: ' (default {value})',
  inspectLoading: 'Reading from server…',
  inspectFailed: 'Read failed: {error}',
  logsEmpty: 'No log entries',
  logOpened: 'Opened {name} details',
  logProbeOk: 'Probe ok · {ms}ms · {count} tools',
  logProbeFail: 'Probe failed: {error}',
  logInspectOk: 'Inspected server · {ms}ms · {prompts} prompts · {resources} resources',
  logInspectFail: 'Inspect failed: {error}',
  fieldStatus: 'Status',
  fieldTarget: 'Target',
  fieldPatch: 'Patch file',
  fieldVersion: 'Server version',
  loadingHint: 'Stuck on loading? Disable and enable again; if that fails, restart DSH.',
  errUnknown: 'Operation failed',
}
