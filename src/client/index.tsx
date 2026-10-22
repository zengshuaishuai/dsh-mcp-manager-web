/**
 * dsh-mcp-manager-web — browser half.
 *
 * Registers an "MCP" page in the Settings panel (a `settings.section` entry
 * beside 通用设置 / 模型 / 插件 / Agent 预设), hosting the server list,
 * add/remove, enable/disable and connection-status tools. Copy is localized
 * (zh/en) and follows the GUI's active locale automatically. All data flows
 * over the loopback-only `/mcp-manager` Connection RPC channel registered by
 * the node half; the browser never touches the host filesystem directly.
 *
 * @module dsh-mcp-manager-web/client
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
// Type-only: pulls the slot-registry Context merge (ctx.slots) and the
// settings-slot declarations (`settings.section`) into this program so the
// register call below type-checks.
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import { McpManagerSection } from './McpManagerSection.tsx'
import { injectPanelStyles } from './styles.ts'
import { NS, en, zh } from './locales.ts'

/** Labels the settings nav may render for this section (zh / en). */
const NAV_LABELS = new Set(['MCP', 'MCP 服务器', 'MCP servers'])

/** Build the MCP glyph as a plain SVG node (the shell mounts icons outside React). */
function mcpIconElement(size: number): SVGSVGElement {
  const svgNs = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNs, 'svg')
  svg.setAttribute('width', String(size))
  svg.setAttribute('height', String(size))
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-width', '2')
  svg.setAttribute('stroke-linecap', 'round')
  svg.setAttribute('stroke-linejoin', 'round')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('data-mcp-icon', 'true')
  const group = document.createElementNS(svgNs, 'g')
  group.setAttribute('transform', 'rotate(-30 12 12)')
  const pins = ['M9 3.5v4', 'M15 3.5v4']
  for (const d of pins) {
    const path = document.createElementNS(svgNs, 'path')
    path.setAttribute('d', d)
    group.appendChild(path)
  }
  const body = document.createElementNS(svgNs, 'rect')
  body.setAttribute('x', '6')
  body.setAttribute('y', '7.5')
  body.setAttribute('width', '12')
  body.setAttribute('height', '7')
  body.setAttribute('rx', '3')
  group.appendChild(body)
  const stem = document.createElementNS(svgNs, 'path')
  stem.setAttribute('d', 'M12 14.5v5')
  group.appendChild(stem)
  svg.appendChild(group)
  return svg
}

/**
 * The settings shell picks nav icons by section id and gives unknown ids a
 * gear. This section is not a shipped id, so swap that gear for the MCP glyph
 * whenever the settings dialog (re)mounts.
 */
function patchNavIcon(): void {
  for (const nav of document.querySelectorAll('[role="dialog"] nav')) {
    for (const button of nav.querySelectorAll('button')) {
      const label = (button.textContent ?? '').trim()
      if (!NAV_LABELS.has(label)) continue
      const icon = button.querySelector('svg')
      if (icon === null || icon.getAttribute('data-mcp-icon') === 'true') continue
      const size = Number(icon.getAttribute('width') ?? '16') || 16
      const plug = mcpIconElement(size)
      const className = icon.getAttribute('class')
      if (className !== null) plug.setAttribute('class', className)
      icon.replaceWith(plug)
    }
  }
}

/** Required services: the slot registry, connection RPC, and locale. */
export const inject = ['slots', 'connection', 'locale']

/** Nav position of the MCP section (models=10, plugins=15, agent-presets=20). */
const SECTION_ORDER = 18

/**
 * Client plugin body: register the settings section, dictionaries, and styles.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => {
    injectPanelStyles()
    return () => { /* styles stay for the page lifetime */ }
  }, 'mcp-manager: styles')

  ctx.effect(() => {
    let scheduled = false
    const schedule = (): void => {
      if (scheduled) return
      scheduled = true
      window.requestAnimationFrame(() => {
        scheduled = false
        patchNavIcon()
      })
    }
    patchNavIcon()
    const observer = new MutationObserver(schedule)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => { observer.disconnect() }
  }, 'mcp-manager: nav icon')

  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'mcp-manager: locale')

  const t = ctx.locale.bind(NS)

  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'mcp',
    order: SECTION_ORDER,
    label: () => t('nav'),
    inject: () => ({ ctx }),
  }, McpManagerSection))
}
