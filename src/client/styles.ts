/**
 * Panel stylesheet. A single `<style>` element injected once by the client
 * entry, using the shell's design tokens (`--dsw-alias-*`) with sensible
 * fallbacks so the panel never looks broken even if a token is missing.
 *
 * Layout keeps the MCP settings page airy and scannable: roomy cards, a clear
 * status line, one target line, one muted meta line, and spaced actions.
 *
 * @module dsh-mcp-manager-web/client/styles
 */

const STYLE_ID = 'dsh-mcp-manager-web-styles'

const CSS = `
.dshmcp-section{max-width:720px;width:100%;display:flex;flex-direction:column;gap:14px;color:var(--dsw-alias-label-primary,#e6e8eb);font:13px/1.55 system-ui,-apple-system,'Segoe UI',sans-serif}
.dshmcp-head{display:flex;align-items:center;gap:10px}
.dshmcp-head-title{font-size:16px;font-weight:600;flex:1;min-width:0;display:flex;align-items:center;gap:8px;color:var(--dsw-alias-label-primary,#e6e8eb)}
.dshmcp-head-sub{color:var(--dsw-alias-label-tertiary,#8b919c);font-size:12px;font-weight:400}
.dshmcp-toolbar{display:flex;gap:10px;align-items:center}
.dshmcp-btn{appearance:none;font:inherit;border:1px solid var(--dsw-alias-border-l2,#2b2f38);border-radius:8px;padding:6px 14px;
  background:var(--dsw-alias-bg-layer-3,#22262e);color:var(--dsw-alias-label-primary,#e6e8eb);cursor:pointer;line-height:1.45;white-space:nowrap;display:inline-flex;align-items:center;gap:6px}
.dshmcp-btn:hover:not(:disabled){border-color:var(--dsw-alias-label-dimmed,#4a505c)}
.dshmcp-btn:disabled{opacity:.45;cursor:default}
.dshmcp-btn-danger{color:var(--dsw-alias-state-error-primary,#ff6b6b)}
.dshmcp-btn-sm{padding:4px 10px;font-size:12px;border-radius:7px;gap:5px}
.dshmcp-iconbtn{appearance:none;font:inherit;border:1px solid transparent;border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary,#a7adb8);cursor:pointer;padding:5px 7px;display:inline-flex;align-items:center}
.dshmcp-iconbtn:hover:not(:disabled){background:var(--dsw-alias-bg-module-platform,#262b34);color:var(--dsw-alias-label-primary,#e6e8eb)}
.dshmcp-iconbtn:disabled{opacity:.4;cursor:default}
.dshmcp-empty{color:var(--dsw-alias-label-tertiary,#8b919c);text-align:center;padding:40px 16px;font-size:13px}
.dshmcp-card{border:1px solid var(--dsw-alias-border-l2,#2b2f38);background:var(--dsw-alias-bg-layer-3,#22262e);border-radius:14px;padding:16px 18px;display:flex;flex-direction:column;gap:10px;transition:border-color .15s,background .15s}
.dshmcp-card:hover{border-color:var(--dsw-alias-label-dimmed,#4a505c)}
.dshmcp-card-head{display:flex;align-items:center;gap:10px}
.dshmcp-status{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;border-radius:999px;padding:2px 10px;font-size:12px;font-weight:500;line-height:18px}
.dshmcp-status-dot{width:7px;height:7px;border-radius:50%;background:currentColor}
.dshmcp-status-ok{background:rgba(63,185,80,.14);color:var(--dsw-alias-state-success-primary,#3fb950)}
.dshmcp-status-warn{background:rgba(210,153,34,.14);color:var(--dsw-alias-state-warn-primary,#d29922)}
.dshmcp-status-bad{background:rgba(248,81,73,.14);color:var(--dsw-alias-state-error-primary,#f85149)}
.dshmcp-status-off{background:var(--dsw-alias-bg-module-platform,#262b34);color:var(--dsw-alias-label-secondary,#a7adb8)}
.dshmcp-id{color:var(--dsw-alias-label-tertiary,#8b919c);font-size:12px;font-family:ui-monospace,Consolas,monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshmcp-name{font-size:15px;font-weight:600;color:var(--dsw-alias-label-primary,#e6e8eb)}
.dshmcp-target{color:var(--dsw-alias-label-secondary,#a7adb8);font-size:12.5px;font-family:ui-monospace,Consolas,monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshmcp-meta{display:flex;gap:14px;flex-wrap:wrap;color:var(--dsw-alias-label-tertiary,#8b919c);font-size:12px}
.dshmcp-probe{font-size:12px;line-height:1.5;color:var(--dsw-alias-label-tertiary,#8b919c);max-width:100%;overflow-wrap:anywhere}
.dshmcp-probe-ok{color:var(--dsw-alias-state-success-primary,#3fb950)}
.dshmcp-probe-bad{color:var(--dsw-alias-state-error-primary,#ff6b6b)}
.dshmcp-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--dsw-alias-border-l2,#2b2f38);padding-top:10px;margin-top:2px}
.dshmcp-form{display:flex;flex-direction:column;gap:10px;padding:18px;border:1px solid var(--dsw-alias-border-l2,#2b2f38);border-radius:14px;background:var(--dsw-alias-bg-layer-3,#22262e)}
.dshmcp-form-title{font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary,#e6e8eb);margin-bottom:2px}
.dshmcp-field{display:flex;flex-direction:column;gap:5px}
.dshmcp-label{font-size:12px;color:var(--dsw-alias-label-secondary,#a7adb8)}
.dshmcp-input{border:1px solid var(--dsw-alias-border-l2,#2b2f38);background:var(--dsw-alias-bg-layer-3,#22262e);color:var(--dsw-alias-label-primary,#e6e8eb);border-radius:8px;padding:7px 11px;font:inherit;font-size:13px;width:100%;max-width:420px;box-sizing:border-box}
.dshmcp-input:focus-visible{border-color:var(--dsw-alias-brand-primary,#4f8cff);outline:none}
.dshmcp-input-invalid{border-color:var(--dsw-alias-state-error-primary,#ff6b6b)}
.dshmcp-select{border:1px solid var(--dsw-alias-border-l2,#2b2f38);background:var(--dsw-alias-bg-layer-3,#22262e);color:var(--dsw-alias-label-primary,#e6e8eb);border-radius:8px;padding:7px 11px;font:inherit;font-size:13px;width:100%;max-width:420px;box-sizing:border-box}
.dshmcp-hint{color:var(--dsw-alias-state-error-primary,#ff6b6b);font-size:12px;margin:0}
.dshmcp-field-row{display:flex;gap:10px}
.dshmcp-field-row .dshmcp-field{flex:1}
.dshmcp-check{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--dsw-alias-label-secondary,#a7adb8);cursor:pointer}
.dshmcp-form-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:6px}
.dshmcp-error{color:var(--dsw-alias-state-error-primary,#ff6b6b);font-size:12px;padding:8px 12px;border:1px solid rgba(248,81,73,.35);border-radius:9px;background:rgba(248,81,73,.08)}
.dshmcp-footer{color:var(--dsw-alias-label-tertiary,#8b919c);font-size:11.5px;font-family:ui-monospace,Consolas,monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-top:2px}
.dshmcp-tools{display:flex;flex-direction:column;gap:8px}
.dshmcp-tools-toggle{appearance:none;font:inherit;font-size:12px;color:var(--dsw-alias-label-secondary,#a7adb8);background:transparent;border:0;padding:0;cursor:pointer;display:inline-flex;align-items:center;gap:6px;align-self:flex-start}
.dshmcp-tools-toggle:hover{color:var(--dsw-alias-label-primary,#e6e8eb)}
.dshmcp-caret{display:inline-block;font-size:10px;transition:transform .15s}
.dshmcp-caret-open{transform:rotate(90deg)}
.dshmcp-tool-list{display:flex;flex-wrap:wrap;gap:6px;max-height:190px;overflow:auto;padding:8px 10px;border:1px solid var(--dsw-alias-border-l2,#2b2f38);border-radius:10px;background:var(--dsw-alias-bg-module-platform,#262b34)}
.dshmcp-tool{font-family:ui-monospace,Consolas,monospace;font-size:11.5px;line-height:1.9;color:var(--dsw-alias-label-secondary,#a7adb8);background:var(--dsw-alias-bg-layer-3,#22262e);border:1px solid var(--dsw-alias-border-l2,#2b2f38);border-radius:6px;padding:1px 7px;white-space:nowrap}
.dshmcp-rows{display:flex;flex-direction:column;border:1px solid var(--dsw-alias-border-l2,#2b2f38);border-radius:12px;overflow:hidden;background:var(--dsw-alias-bg-layer-3,#22262e)}
.dshmcp-row{display:flex;align-items:center;gap:10px;padding:0 12px;min-height:46px;border-bottom:1px solid var(--dsw-alias-border-l2,#2b2f38)}
.dshmcp-row:last-child{border-bottom:0}
.dshmcp-row:hover{background:var(--dsw-alias-bg-module-platform,#262b34)}
.dshmcp-row-off{opacity:.6}
.dshmcp-row-main{appearance:none;font:inherit;background:transparent;border:0;color:inherit;display:flex;align-items:center;gap:10px;flex:1;min-width:0;text-align:left;cursor:pointer;padding:8px 0}
.dshmcp-dot{width:8px;height:8px;border-radius:50%;flex:none;background:var(--dsw-alias-label-dimmed,#4a505c)}
.dshmcp-dot-ok{background:var(--dsw-alias-state-success-primary,#3fb950)}
.dshmcp-dot-warn{background:var(--dsw-alias-state-warn-primary,#d29922)}
.dshmcp-dot-bad{background:var(--dsw-alias-state-error-primary,#f85149)}
.dshmcp-dot-off{background:var(--dsw-alias-label-dimmed,#4a505c)}
.dshmcp-row-name{font-size:13.5px;font-weight:500;color:var(--dsw-alias-label-primary,#e6e8eb);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshmcp-row-version{color:var(--dsw-alias-label-tertiary,#8b919c);font-size:12px;font-family:ui-monospace,Consolas,monospace}
.dshmcp-badge{font-size:11px;line-height:1.6;padding:1px 8px;border-radius:999px;border:1px solid var(--dsw-alias-border-l2,#2b2f38);color:var(--dsw-alias-label-secondary,#a7adb8);flex:none}
.dshmcp-row-tools{margin-left:auto;color:var(--dsw-alias-label-tertiary,#8b919c);font-size:12px;white-space:nowrap;padding-right:6px}
.dshmcp-switch{appearance:none;border:0;padding:0;width:36px;height:20px;border-radius:999px;background:var(--dsw-alias-border-l2,#3a3f4a);position:relative;cursor:pointer;flex:none;transition:background .15s}
.dshmcp-switch-on{background:#3fb950}
.dshmcp-switch:disabled{opacity:.5;cursor:default}
.dshmcp-switch-busy{opacity:.55;cursor:progress}
.dshmcp-switch-knob{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .15s}
.dshmcp-switch-on .dshmcp-switch-knob{transform:translateX(16px)}
.dshmcp-iconbtn-on{background:var(--dsw-alias-bg-module-platform,#262b34);color:var(--dsw-alias-label-primary,#e6e8eb)}
.dshmcp-search{max-width:100%;margin-top:2px}
.dshmcp-detail{display:flex;flex-direction:column;gap:12px}
.dshmcp-detail-head{display:flex;align-items:center;gap:10px}
.dshmcp-back{font-size:16px;line-height:1}
.dshmcp-detail-name{font-size:15px;font-weight:600;color:var(--dsw-alias-label-primary,#e6e8eb);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshmcp-tabs{display:flex;gap:4px;border-bottom:1px solid var(--dsw-alias-border-l2,#2b2f38);flex-wrap:wrap}
.dshmcp-tab{appearance:none;font:inherit;font-size:13px;background:transparent;border:0;border-bottom:2px solid transparent;color:var(--dsw-alias-label-secondary,#a7adb8);padding:8px 10px;cursor:pointer;margin-bottom:-1px}
.dshmcp-tab:hover{color:var(--dsw-alias-label-primary,#e6e8eb)}
.dshmcp-tab-active{color:var(--dsw-alias-label-primary,#e6e8eb);border-bottom-color:var(--dsw-alias-button-primary-fill,#4f8cff);font-weight:600}
.dshmcp-tabbody{display:flex;flex-direction:column;gap:10px}
.dshmcp-overview{display:flex;flex-direction:column;gap:8px}
.dshmcp-kv{display:flex;gap:12px;font-size:12.5px;color:var(--dsw-alias-label-tertiary,#8b919c);align-items:baseline}
.dshmcp-kv>span:first-child{width:84px;flex:none}
.dshmcp-kv code{font-family:ui-monospace,Consolas,monospace;color:var(--dsw-alias-label-secondary,#a7adb8);font-size:12px}
.dshmcp-kv b{font-weight:500;color:var(--dsw-alias-label-primary,#e6e8eb)}
.dshmcp-wrap{overflow-wrap:anywhere;word-break:break-all}
.dshmcp-hint-inline{margin:-2px 0 2px 96px;line-height:1.5}
.dshmcp-muted{color:var(--dsw-alias-label-tertiary,#8b919c);font-size:12px}
.dshmcp-toolrows{display:flex;flex-direction:column;border:1px solid var(--dsw-alias-border-l2,#2b2f38);border-radius:12px;overflow:hidden;background:var(--dsw-alias-bg-layer-3,#22262e)}
.dshmcp-toolrow{border-bottom:1px solid var(--dsw-alias-border-l2,#2b2f38)}
.dshmcp-toolrow:last-child{border-bottom:0}
.dshmcp-toolrow-head{appearance:none;font:inherit;background:transparent;border:0;color:inherit;width:100%;display:flex;align-items:baseline;gap:8px;padding:9px 12px;cursor:pointer;text-align:left}
.dshmcp-toolrow-head:hover{background:var(--dsw-alias-bg-module-platform,#262b34)}
.dshmcp-tool-name{font-family:ui-monospace,Consolas,monospace;font-size:12.5px;color:var(--dsw-alias-label-primary,#e6e8eb)}
.dshmcp-tool-preview{color:var(--dsw-alias-label-tertiary,#8b919c);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0}
.dshmcp-toolrow-body{padding:4px 14px 14px 30px;display:flex;flex-direction:column;gap:6px;background:var(--dsw-alias-bg-module-platform,#262b34)}
.dshmcp-tool-desc{margin:0;font-size:12.5px;color:var(--dsw-alias-label-secondary,#a7adb8);line-height:1.6;white-space:pre-wrap}
.dshmcp-section-label{font-size:11.5px;font-weight:600;color:var(--dsw-alias-label-tertiary,#8b919c);text-transform:uppercase;letter-spacing:.04em;margin-top:4px}
.dshmcp-schema{display:flex;flex-direction:column;border:1px solid var(--dsw-alias-border-l2,#2b2f38);border-radius:9px;overflow:hidden}
.dshmcp-schema-head,.dshmcp-schema-row{display:grid;grid-template-columns:minmax(120px,1.1fr) 90px minmax(160px,2fr);gap:10px;padding:6px 10px}
.dshmcp-schema-head{font-size:11px;color:var(--dsw-alias-label-tertiary,#8b919c);background:var(--dsw-alias-bg-layer-3,#22262e);border-bottom:1px solid var(--dsw-alias-border-l2,#2b2f38)}
.dshmcp-schema-row{border-bottom:1px solid var(--dsw-alias-border-l2,#2b2f38);font-size:12px;align-items:baseline}
.dshmcp-schema-row:last-child{border-bottom:0}
.dshmcp-schema-name{font-family:ui-monospace,Consolas,monospace;color:var(--dsw-alias-label-primary,#e6e8eb)}
.dshmcp-required{color:var(--dsw-alias-state-error-primary,#f85149);font-style:normal}
.dshmcp-schema-type{font-family:ui-monospace,Consolas,monospace;color:#7aa2f7;font-size:11.5px}
.dshmcp-schema-desc{color:var(--dsw-alias-label-tertiary,#8b919c);line-height:1.55}
.dshmcp-schema-default{color:var(--dsw-alias-label-dimmed,#4a505c)}
.dshmcp-items{display:flex;flex-direction:column;border:1px solid var(--dsw-alias-border-l2,#2b2f38);border-radius:12px;overflow:hidden}
.dshmcp-item{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:baseline;padding:9px 12px;border-bottom:1px solid var(--dsw-alias-border-l2,#2b2f38)}
.dshmcp-item:last-child{border-bottom:0}
.dshmcp-item-name{font-family:ui-monospace,Consolas,monospace;font-size:12.5px;color:var(--dsw-alias-label-primary,#e6e8eb)}
.dshmcp-item-desc{color:var(--dsw-alias-label-tertiary,#8b919c);font-size:12px}
.dshmcp-item-uri{flex-basis:100%;font-family:ui-monospace,Consolas,monospace;font-size:11px;color:var(--dsw-alias-label-dimmed,#4a505c);overflow-wrap:anywhere}
.dshmcp-item-mime{font-size:11px;color:var(--dsw-alias-label-tertiary,#8b919c)}
.dshmcp-logs{display:flex;flex-direction:column;gap:2px;font-family:ui-monospace,Consolas,monospace;font-size:11.5px}
.dshmcp-logline{display:flex;gap:10px;padding:3px 0;border-bottom:1px dashed var(--dsw-alias-border-l2,#2b2f38)}
.dshmcp-logtime{color:var(--dsw-alias-label-dimmed,#4a505c);flex:none}
.dshmcp-logtext{color:var(--dsw-alias-label-secondary,#a7adb8);overflow-wrap:anywhere}
.dshmcp-spin{display:inline-block;width:12px;height:12px;border:2px solid var(--dsw-alias-label-dimmed,#4a505c);border-top-color:transparent;border-radius:50%;animation:dshmcp-spin .8s linear infinite;vertical-align:-2px}
@keyframes dshmcp-spin{to{transform:rotate(360deg)}}
`

/** Inject the panel stylesheet once (idempotent). */
export function injectPanelStyles(): void {
  if (document.getElementById(STYLE_ID) !== null) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = CSS
  document.head.appendChild(style)
}
