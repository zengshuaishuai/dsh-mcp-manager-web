window.__ModuleLoader__.load({
	id: "@zengshuaishuai/dsh-mcp-manager",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		"use strict";
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __export = (target, all) => {
		  for (var name in all)
		    __defProp(target, name, { get: all[name], enumerable: true });
		};
		var __copyProps = (to, from, except, desc) => {
		  if (from && typeof from === "object" || typeof from === "function") {
		    for (let key of __getOwnPropNames(from))
		      if (!__hasOwnProp.call(to, key) && key !== except)
		        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
		  }
		  return to;
		};
		var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

		// src/client/index.tsx
		var index_exports = {};
		__export(index_exports, {
		  apply: () => apply,
		  inject: () => inject
		});
		module.exports = index_exports;

		// src/client/McpManagerSection.tsx
		var import_react2 = require("react");

		// src/shared.ts
		var RPC_CHANNEL = "/api";
		var RPC_ENDPOINT_PREFIX = "mcp-manager";

		// src/client/rpc.ts
		function connectionRpcOf(ctx) {
		  const connection = ctx.connection;
		  if (connection === void 0) {
		    throw new Error("connection service is unavailable (is @deepseek-ai/dsh-client-connection loaded?)");
		  }
		  return connection.rpc;
		}
		var McpManagerRpcError = class extends Error {
		  code;
		  fields;
		  constructor(error) {
		    super(`${error.code}: ${error.message}`);
		    this.name = "McpManagerRpcError";
		    this.code = error.code;
		    this.fields = error.details?.["fields"] ?? void 0;
		  }
		};
		async function callRpc(ctx, endpoint, payload) {
		  const raw = await connectionRpcOf(ctx).call(
		    RPC_CHANNEL,
		    RPC_ENDPOINT_PREFIX,
		    { action: endpoint, data: payload ?? null }
		  );
		  const result = raw;
		  if (result.ok) return result.value;
		  throw new McpManagerRpcError(result.error);
		}

		// src/client/ServerDetail.tsx
		var import_react = require("react");

		// src/client/icons.tsx
		var import_jsx_runtime = require("react/jsx-runtime");
		function base(size, className) {
		  return {
		    width: size ?? 16,
		    height: size ?? 16,
		    viewBox: "0 0 24 24",
		    fill: "none",
		    stroke: "currentColor",
		    strokeWidth: 2,
		    strokeLinecap: "round",
		    strokeLinejoin: "round",
		    className,
		    "aria-hidden": true
		  };
		}
		function PlusIcon({ size, className }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(size, className), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14M5 12h14" }) });
		}
		function TrashIcon({ size, className }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(size, className), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" }) });
		}
		function EditIcon({ size, className }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(size, className), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" }) });
		}
		function RefreshIcon({ size, className }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(size, className), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" }) });
		}
		function PlugIcon({ size, className }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(size, className), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22v-5M9 8V3M15 8V3M6 8h12v4a6 6 0 0 1-12 0Z" }) });
		}
		function PowerIcon({ size, className }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(size, className), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0" }) });
		}
		function McpIcon({ size, className }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(size, className), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: "rotate(-30 12 12)", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 3.5v4M15 3.5v4" }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "6", y: "7.5", width: "12", height: "7", rx: "3" }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 14.5v5" })
		  ] }) });
		}
		function ChevronDownIcon({ size, className }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(size, className), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 9 6 6 6-6" }) });
		}
		function SearchIcon({ size, className }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(size, className), children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "11", cy: "11", r: "7" }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m20 20-3.6-3.6" })
		  ] });
		}
		function FilterIcon({ size, className }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(size, className), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 5h18l-7 8v6l-4-2v-4Z" }) });
		}

		// src/client/ServerDetail.tsx
		var import_jsx_runtime2 = require("react/jsx-runtime");
		function clock(at) {
		  return `${String(at.getHours()).padStart(2, "0")}:${String(at.getMinutes()).padStart(2, "0")}:${String(at.getSeconds()).padStart(2, "0")}`;
		}
		function errorMessage(error, t) {
		  if (error instanceof McpManagerRpcError) {
		    switch (error.code) {
		      case "not-found":
		        return t("errNotFound");
		      case "invalid-config":
		        return t("errInvalidConfig");
		      default:
		        return error.message.replace(/^[a-z-]+: /, "");
		    }
		  }
		  return error instanceof Error ? error.message : String(error);
		}
		function statusOf(server) {
		  if (!server.enabled) return { tone: "off", key: "statusDisabled" };
		  switch (server.fiberPhase) {
		    case "active":
		      return server.toolCount > 0 ? { tone: "ok", key: "statusConnected", count: String(server.toolCount) } : { tone: "warn", key: "statusActiveNoTools" };
		    case "failed":
		      return { tone: "bad", key: "statusFailed" };
		    case "loading":
		      return { tone: "warn", key: "statusLoading" };
		    case "pending":
		      return { tone: "warn", key: "statusPending" };
		    case "unloading":
		      return { tone: "warn", key: "statusUnloading" };
		    default:
		      return { tone: "off", key: "statusNotLoaded" };
		  }
		}
		function shortVersion(version) {
		  return version.length > 20 ? `${version.slice(0, 20)}\u2026` : version;
		}
		function targetOf(server) {
		  if (server.transport === "stdio") {
		    return [server.command, ...server.args ?? []].filter(Boolean).join(" ");
		  }
		  return server.url ?? "";
		}
		function typeLabel(spec) {
		  const type = spec["type"];
		  if (typeof type === "string") return type;
		  if (Array.isArray(type)) return type.map(String).join(" | ");
		  if (Array.isArray(spec["enum"])) return `enum(${spec["enum"].map(String).join(" | ")})`;
		  if (Array.isArray(spec["oneOf"]) || Array.isArray(spec["anyOf"])) return "union";
		  return "any";
		}
		function ParamsTable({ schema, t }) {
		  const properties = schema?.["properties"] ?? {};
		  const required = (0, import_react.useMemo)(() => {
		    const raw = schema?.["required"];
		    return new Set(Array.isArray(raw) ? raw.map(String) : []);
		  }, [schema]);
		  const entries = Object.entries(properties);
		  if (entries.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dshmcp-muted", children: t("noParams") });
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-schema", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-schema-head", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("schemaName") }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("schemaType") }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("schemaDesc") })
		    ] }),
		    entries.map(([name, spec]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-schema-row", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("code", { className: "dshmcp-schema-name", children: [
		        name,
		        required.has(name) ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("em", { className: "dshmcp-required", children: " *" }) : null
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-schema-type", children: typeLabel(spec) }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshmcp-schema-desc", children: [
		        typeof spec["description"] === "string" ? spec["description"] : "",
		        spec["default"] !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-schema-default", children: t("schemaDefault", { value: JSON.stringify(spec["default"]) }) }) : null
		      ] })
		    ] }, name))
		  ] });
		}
		function ServerDetail({
		  ctx,
		  t,
		  server,
		  probe,
		  patchPath,
		  busy,
		  onBack,
		  onToggle,
		  onTest,
		  onEdit,
		  onRemove,
		  onVersion
		}) {
		  const [tab, setTab] = (0, import_react.useState)("overview");
		  const [query, setQuery] = (0, import_react.useState)("");
		  const [open, setOpen] = (0, import_react.useState)({});
		  const [inspect, setInspect] = (0, import_react.useState)(null);
		  const [inspecting, setInspecting] = (0, import_react.useState)(false);
		  const [inspectError, setInspectError] = (0, import_react.useState)(null);
		  const [logs, setLogs] = (0, import_react.useState)([]);
		  const status = statusOf(server);
		  const tools = server.tools ?? [];
		  const version = inspect?.serverVersion;
		  const log = (0, import_react.useCallback)((text) => {
		    setLogs((prev) => [...prev, { at: clock(/* @__PURE__ */ new Date()), text }].slice(-200));
		  }, []);
		  const runInspect = (0, import_react.useCallback)(async () => {
		    setInspecting(true);
		    setInspectError(null);
		    try {
		      const result = await callRpc(ctx, "inspect", { id: server.id });
		      setInspect(result);
		      if (result.ok) {
		        if (result.serverVersion !== void 0) onVersion?.(server.id, result.serverVersion);
		        log(t("logInspectOk", {
		          ms: String(result.latencyMs),
		          prompts: String(result.prompts.length),
		          resources: String(result.resources.length)
		        }));
		      } else {
		        setInspectError(result.error ?? "failed");
		        log(t("logInspectFail", { error: result.error ?? "failed" }));
		      }
		    } catch (error) {
		      const message = errorMessage(error, t);
		      setInspectError(message);
		      log(t("logInspectFail", { error: message }));
		    } finally {
		      setInspecting(false);
		    }
		  }, [ctx, log, onVersion, server.id, t]);
		  const inspectedFor = (0, import_react.useRef)(null);
		  (0, import_react.useEffect)(() => {
		    if (inspectedFor.current === server.id) return;
		    inspectedFor.current = server.id;
		    void runInspect();
		  }, [runInspect, server.id]);
		  (0, import_react.useEffect)(() => {
		    log(t("logOpened", { name: server.serverName }));
		  }, [log, server.serverName, t]);
		  (0, import_react.useEffect)(() => {
		    if (probe === void 0) return;
		    if (probe.ok) {
		      log(t("logProbeOk", { ms: String(probe.latencyMs), count: String(probe.toolCount ?? 0) }));
		    } else {
		      log(t("logProbeFail", { error: probe.error ?? "failed" }));
		    }
		  }, [probe, log, t]);
		  const filtered = (0, import_react.useMemo)(() => {
		    const needle = query.trim().toLowerCase();
		    if (needle === "") return tools;
		    return tools.filter((tool) => tool.name.toLowerCase().includes(needle) || (tool.description ?? "").toLowerCase().includes(needle));
		  }, [tools, query]);
		  const tabLabel = (key) => {
		    switch (key) {
		      case "overview":
		        return t("tabOverview");
		      case "tools":
		        return `${t("tabTools")} (${tools.length})`;
		      case "prompts":
		        return t("tabPrompts");
		      case "resources":
		        return t("tabResources");
		      default:
		        return t("tabLogs");
		    }
		  };
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-detail", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-detail-head", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dshmcp-iconbtn", title: t("back"), onClick: onBack, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-back", children: "\u2190" }) }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-detail-name", children: server.serverName || t("unnamed") }),
		      version !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-row-version", title: version, children: shortVersion(version) }) : null,
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: `dshmcp-status dshmcp-status-${status.tone}`, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-status-dot" }),
		        t(status.key, status.count !== void 0 ? { count: status.count } : void 0)
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-spacer" }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		        "button",
		        {
		          type: "button",
		          role: "switch",
		          "aria-checked": server.enabled,
		          className: `dshmcp-switch${server.enabled ? " dshmcp-switch-on" : ""}${busy ? " dshmcp-switch-busy" : ""}`,
		          disabled: busy,
		          title: server.enabled ? t("disable") : t("enable"),
		          onClick: onToggle,
		          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-switch-knob" })
		        }
		      )
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshmcp-tabs", role: "tablist", children: ["overview", "tools", "prompts", "resources", "logs"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		      "button",
		      {
		        type: "button",
		        role: "tab",
		        "aria-selected": tab === key,
		        className: `dshmcp-tab${tab === key ? " dshmcp-tab-active" : ""}`,
		        onClick: () => setTab(key),
		        children: tabLabel(key)
		      },
		      key
		    )) }),
		    tab === "overview" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-overview", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-kv", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("fieldStatus") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: t(status.key, status.count !== void 0 ? { count: status.count } : void 0) })
		      ] }),
		      server.fiberPhase === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dshmcp-muted dshmcp-hint-inline", children: t("loadingHint") }) : null,
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-kv", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("fieldId") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: server.id })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-kv", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("fieldTransport") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: server.transport })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-kv", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("fieldTarget") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { className: "dshmcp-wrap", children: targetOf(server) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-kv", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("fieldServerName") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: server.serverName })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-kv", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("tabTools") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("toolCount", { count: String(server.toolCount) }) })
		      ] }),
		      version !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-kv", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("fieldVersion") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: version })
		      ] }) : null,
		      server.toolCallTimeoutMs !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-kv", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("fieldTimeout") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
		          String(server.toolCallTimeoutMs),
		          " ms"
		        ] })
		      ] }) : null,
		      patchPath !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-kv", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("fieldPatch") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { className: "dshmcp-wrap", children: patchPath })
		      ] }) : null,
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-actions", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "dshmcp-btn dshmcp-btn-sm", onClick: onTest, disabled: busy, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PlugIcon, { size: 12 }),
		          " ",
		          t("test")
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "dshmcp-btn dshmcp-btn-sm", onClick: onEdit, disabled: busy, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EditIcon, { size: 12 }),
		          " ",
		          t("edit")
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "dshmcp-btn dshmcp-btn-sm", onClick: onToggle, disabled: busy, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PowerIcon, { size: 12 }),
		          " ",
		          server.enabled ? t("disable") : t("enable")
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-spacer" }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
		          "button",
		          {
		            type: "button",
		            className: "dshmcp-btn dshmcp-btn-sm dshmcp-btn-danger",
		            onClick: onRemove,
		            disabled: busy,
		            title: server.userManaged ? t("remove") : t("bundleDefined"),
		            children: [
		              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TrashIcon, { size: 12 }),
		              " ",
		              t("remove")
		            ]
		          }
		        )
		      ] })
		    ] }) : null,
		    tab === "tools" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-tabbody", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-toolbar", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		          "input",
		          {
		            className: "dshmcp-input dshmcp-search",
		            placeholder: t("searchTools"),
		            value: query,
		            spellCheck: false,
		            onChange: (e) => setQuery(e.target.value)
		          }
		        ),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-spacer" }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-muted", children: t("toolCount", { count: String(tools.length) }) })
		      ] }),
		      filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshmcp-empty", children: tools.length === 0 ? t("noTools") : t("noMatch") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshmcp-toolrows", children: filtered.map((tool) => {
		        const expanded = open[tool.name] === true;
		        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `dshmcp-toolrow${expanded ? " dshmcp-toolrow-open" : ""}`, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
		            "button",
		            {
		              type: "button",
		              className: "dshmcp-toolrow-head",
		              "aria-expanded": expanded,
		              onClick: () => setOpen((prev) => ({ ...prev, [tool.name]: !prev[tool.name] })),
		              children: [
		                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-caret", children: "\u25B8" }),
		                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { className: "dshmcp-tool-name", children: tool.name }),
		                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-tool-preview", children: tool.description ?? "" })
		              ]
		            }
		          ),
		          expanded ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-toolrow-body", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshmcp-section-label", children: t("description") }),
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dshmcp-tool-desc", children: tool.description ?? "\u2014" }),
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshmcp-section-label", children: t("inputSchema") }),
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ParamsTable, { schema: tool.parameters, t })
		          ] }) : null
		        ] }, tool.name);
		      }) })
		    ] }) : null,
		    tab === "prompts" || tab === "resources" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-tabbody", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-toolbar", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-muted", children: inspecting ? t("inspectLoading") : inspectError !== null ? t("inspectFailed", { error: inspectError }) : "" }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-spacer" }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
		          "button",
		          {
		            type: "button",
		            className: "dshmcp-btn dshmcp-btn-sm",
		            disabled: inspecting,
		            onClick: () => {
		              void runInspect();
		            },
		            children: [
		              inspecting ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RefreshIcon, { size: 12 }),
		              " ",
		              t("refresh")
		            ]
		          }
		        )
		      ] }),
		      inspecting && inspect === null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-empty", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-spin" }),
		        " ",
		        t("inspectLoading")
		      ] }) : null,
		      tab === "prompts" ? inspect !== null && inspect.prompts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshmcp-items", children: inspect.prompts.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-item", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { className: "dshmcp-item-name", children: prompt.name }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-item-desc", children: prompt.description ?? "" })
		      ] }, prompt.name)) }) : inspect !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshmcp-empty", children: t("noPrompts") }) : null : inspect !== null && inspect.resources.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshmcp-items", children: inspect.resources.map((resource) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-item", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { className: "dshmcp-item-name", children: resource.name || resource.uri }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-item-desc", children: resource.description ?? "" }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { className: "dshmcp-item-uri", title: resource.uri, children: resource.uri }),
		        resource.mimeType !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-item-mime", children: resource.mimeType }) : null
		      ] }, resource.uri)) }) : inspect !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshmcp-empty", children: t("noResources") }) : null
		    ] }) : null,
		    tab === "logs" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshmcp-tabbody", children: logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshmcp-empty", children: t("logsEmpty") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshmcp-logs", children: logs.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshmcp-logline", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-logtime", children: entry.at }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshmcp-logtext", children: entry.text })
		    ] }, `${entry.at}-${index}`)) }) }) : null
		  ] });
		}

		// src/client/locales.ts
		var NS = "mcpManager";
		var zh = {
		  nav: "MCP",
		  title: "MCP \u670D\u52A1\u5668",
		  unnamed: "\uFF08\u672A\u547D\u540D\uFF09",
		  total: "\u5171 {count} \u4E2A",
		  addServer: "\u6DFB\u52A0\u670D\u52A1\u5668",
		  connected: "{count} \u4E2A\u5DF2\u8FDE\u63A5",
		  failed: "{count} \u4E2A\u5931\u8D25",
		  enabledOf: "{count}/{total} \u5DF2\u542F\u7528",
		  refresh: "\u5237\u65B0",
		  loading: "\u6B63\u5728\u52A0\u8F7D\u670D\u52A1\u5668\u2026",
		  empty: "\u5C1A\u672A\u914D\u7F6E MCP \u670D\u52A1\u5668\u3002",
		  emptyHint: "\u70B9\u51FB\u201C\u6DFB\u52A0\u670D\u52A1\u5668\u201D\u5F00\u59CB\u63A5\u5165\u3002",
		  patchMissing: "\u8865\u4E01\u6587\u4EF6\u7F3A\u5931\uFF1A{path}",
		  removeConfirm: "\u5220\u9664 MCP \u670D\u52A1\u5668 \u201C{name}\u201D\uFF08{id}\uFF09\uFF1F\n\u6B64\u64CD\u4F5C\u4F1A\u4FEE\u6539 cordis.patch.yml \u5E76\u65AD\u5F00\u5176\u5DE5\u5177\u3002",
		  statusConnected: "\u5DF2\u8FDE\u63A5 \xB7 {count} \u4E2A\u5DE5\u5177",
		  statusActiveNoTools: "\u672A\u8FDE\u63A5 \xB7 \u65E0\u5DE5\u5177",
		  statusFailed: "\u5931\u8D25",
		  statusDisabled: "\u5DF2\u505C\u7528",
		  statusLoading: "\u52A0\u8F7D\u4E2D",
		  statusPending: "\u7B49\u5F85\u4E2D",
		  statusUnloading: "\u5378\u8F7D\u4E2D",
		  statusNotLoaded: "\u672A\u52A0\u8F7D",
		  toolCount: "{count} \u4E2A\u5DE5\u5177",
		  toolsShow: "\u67E5\u770B {count} \u4E2A\u5DE5\u5177",
		  toolsHide: "\u6536\u8D77\u5DE5\u5177",
		  bundleDefined: "bundle \u5B9A\u4E49",
		  reconnectOff: "\u5DF2\u5173\u95ED\u91CD\u8FDE",
		  probeOk: "\u2713 \u5DF2\u8FDE\u63A5\uFF0C\u8017\u65F6 {ms}ms \xB7 {count} \u4E2A\u5DE5\u5177",
		  probeFail: "\u2717 {error}\uFF08{ms}ms\uFF09",
		  enable: "\u542F\u7528",
		  disable: "\u505C\u7528",
		  test: "\u6D4B\u8BD5",
		  edit: "\u7F16\u8F91",
		  remove: "\u5220\u9664",
		  formAddTitle: "\u6DFB\u52A0 MCP \u670D\u52A1\u5668",
		  formEditTitle: "\u7F16\u8F91 {name}",
		  fieldId: "\u6761\u76EE ID",
		  fieldServerName: "serverName",
		  fieldTransport: "\u4F20\u8F93\u65B9\u5F0F",
		  fieldUrl: "URL",
		  fieldCommand: "\u547D\u4EE4",
		  fieldArgs: "\u53C2\u6570\uFF08\u6BCF\u884C\u4E00\u4E2A\uFF09",
		  fieldEnv: "\u73AF\u5883\u53D8\u91CF\uFF08KEY=VALUE\uFF0C\u6BCF\u884C\u4E00\u4E2A\uFF09",
		  fieldCwd: "\u5DE5\u4F5C\u76EE\u5F55\uFF08\u53EF\u9009\uFF09",
		  fieldHeaders: "\u8BF7\u6C42\u5934\uFF08Key: Value\uFF0C\u6BCF\u884C\u4E00\u4E2A\uFF09",
		  fieldTimeout: "\u8D85\u65F6\uFF08\u6BEB\u79D2\uFF0C\u53EF\u9009\uFF09",
		  fieldFailStartup: "\u542F\u52A8\u5931\u8D25\u5373\u62A5\u9519",
		  cancel: "\u53D6\u6D88",
		  save: "\u4FDD\u5B58\u66F4\u6539",
		  errIdRequired: "\u6761\u76EE ID \u5FC5\u586B",
		  errIdPattern: "\u9700\u5339\u914D [A-Za-z0-9_-]{1,64}",
		  errIdTaken: "\u6761\u76EE ID \u5DF2\u88AB\u5360\u7528",
		  errNameRequired: "serverName \u5FC5\u586B",
		  errNamePattern: "\u9700\u5339\u914D [A-Za-z0-9_-]{1,32}",
		  errNameTaken: "serverName \u5DF2\u88AB\u5360\u7528",
		  errUrlRequired: "URL \u5FC5\u586B",
		  errCommandRequired: "\u547D\u4EE4\u5FC5\u586B",
		  errDuplicateId: "\u6761\u76EE ID \u5DF2\u88AB\u4F7F\u7528",
		  errDuplicateName: "serverName \u5DF2\u88AB\u5176\u4ED6\u670D\u52A1\u5668\u4F7F\u7528",
		  errInvalidConfig: "MCP \u670D\u52A1\u5668\u914D\u7F6E\u65E0\u6548",
		  errNotFound: "\u672A\u627E\u5230\u8BE5 MCP \u670D\u52A1\u5668\u6761\u76EE",
		  back: "\u8FD4\u56DE",
		  tabOverview: "\u901A\u7528",
		  tabTools: "\u5DE5\u5177",
		  tabPrompts: "\u63D0\u793A",
		  tabResources: "\u8D44\u6E90",
		  tabLogs: "\u65E5\u5FD7",
		  searchServers: "\u641C\u7D22\u670D\u52A1\u5668\u2026",
		  searchTools: "\u641C\u7D22\u5DE5\u5177\u2026",
		  filterConnected: "\u53EA\u770B\u5DF2\u8FDE\u63A5",
		  badgeStreaming: "\u6D41\u5F0F",
		  noTools: "\u5F53\u524D\u8FDE\u63A5\u6CA1\u6709\u53EF\u7528\u5DE5\u5177",
		  noPrompts: "\u5F53\u524D\u8FDE\u63A5\u672A\u63D0\u4F9B\u63D0\u793A",
		  noResources: "\u5F53\u524D\u8FDE\u63A5\u672A\u63D0\u4F9B\u8D44\u6E90",
		  noMatch: "\u6CA1\u6709\u5339\u914D\u9879",
		  noParams: "\u65E0\u53C2\u6570",
		  description: "\u63CF\u8FF0",
		  inputSchema: "\u8F93\u5165\u6A21\u5F0F",
		  schemaName: "\u53C2\u6570",
		  schemaType: "\u7C7B\u578B",
		  schemaDesc: "\u8BF4\u660E",
		  schemaDefault: "\uFF08\u9ED8\u8BA4 {value}\uFF09",
		  inspectLoading: "\u6B63\u5728\u8FDE\u63A5\u8BFB\u53D6\u2026",
		  inspectFailed: "\u8BFB\u53D6\u5931\u8D25\uFF1A{error}",
		  logsEmpty: "\u6682\u65E0\u65E5\u5FD7",
		  logOpened: "\u6253\u5F00 {name} \u7684\u8BE6\u60C5",
		  logProbeOk: "\u8FDE\u63A5\u63A2\u6D4B\u6210\u529F \xB7 {ms}ms \xB7 {count} \u4E2A\u5DE5\u5177",
		  logProbeFail: "\u8FDE\u63A5\u63A2\u6D4B\u5931\u8D25\uFF1A{error}",
		  logInspectOk: "\u8BFB\u53D6\u670D\u52A1\u4FE1\u606F \xB7 {ms}ms \xB7 \u63D0\u793A {prompts} \xB7 \u8D44\u6E90 {resources}",
		  logInspectFail: "\u8BFB\u53D6\u670D\u52A1\u4FE1\u606F\u5931\u8D25\uFF1A{error}",
		  fieldStatus: "\u8FDE\u63A5\u72B6\u6001",
		  fieldTarget: "\u76EE\u6807",
		  fieldPatch: "\u8865\u4E01\u6587\u4EF6",
		  fieldVersion: "\u670D\u52A1\u7248\u672C",
		  loadingHint: "\u957F\u65F6\u95F4\u505C\u5728\u201C\u52A0\u8F7D\u4E2D\u201D\uFF0C\u53EF\u5C1D\u8BD5\u505C\u7528\u540E\u518D\u542F\u7528\uFF1B\u4ECD\u4E0D\u884C\u5219\u91CD\u542F\u4E00\u6B21 DSH\u3002",
		  errUnknown: "\u64CD\u4F5C\u5931\u8D25"
		};
		var en = {
		  nav: "MCP",
		  title: "MCP servers",
		  unnamed: "(unnamed)",
		  total: "{count} total",
		  addServer: "Add server",
		  connected: "{count} connected",
		  failed: "{count} failed",
		  enabledOf: "{count}/{total} enabled",
		  refresh: "Refresh",
		  loading: "Loading servers\u2026",
		  empty: "No MCP servers configured.",
		  emptyHint: "Use \u201CAdd server\u201D to connect one.",
		  patchMissing: "patch file missing: {path}",
		  removeConfirm: 'Remove MCP server "{name}" ({id})?\nThis edits cordis.patch.yml and disconnects its tools.',
		  statusConnected: "Connected \xB7 {count} tools",
		  statusActiveNoTools: "Not connected \xB7 no tools",
		  statusFailed: "Failed",
		  statusDisabled: "Disabled",
		  statusLoading: "Loading",
		  statusPending: "Pending",
		  statusUnloading: "Unloading",
		  statusNotLoaded: "Not loaded",
		  toolCount: "{count} tools",
		  toolsShow: "Show {count} tools",
		  toolsHide: "Hide tools",
		  bundleDefined: "bundle-defined",
		  reconnectOff: "reconnect off",
		  probeOk: "\u2713 Connected in {ms}ms \xB7 {count} tools",
		  probeFail: "\u2717 {error} ({ms}ms)",
		  enable: "Enable",
		  disable: "Disable",
		  test: "Test",
		  edit: "Edit",
		  remove: "Remove",
		  formAddTitle: "Add MCP server",
		  formEditTitle: "Edit {name}",
		  fieldId: "Entry id",
		  fieldServerName: "serverName",
		  fieldTransport: "Transport",
		  fieldUrl: "URL",
		  fieldCommand: "Command",
		  fieldArgs: "Args (one per line)",
		  fieldEnv: "Env (KEY=VALUE, one per line)",
		  fieldCwd: "Working directory (optional)",
		  fieldHeaders: "Headers (Key: Value, one per line)",
		  fieldTimeout: "Timeout (ms, optional)",
		  fieldFailStartup: "Fail on startup error",
		  cancel: "Cancel",
		  save: "Save changes",
		  errIdRequired: "Entry id is required",
		  errIdPattern: "Match [A-Za-z0-9_-]{1,64}",
		  errIdTaken: "Entry id already in use",
		  errNameRequired: "serverName is required",
		  errNamePattern: "Match [A-Za-z0-9_-]{1,32}",
		  errNameTaken: "serverName already in use",
		  errUrlRequired: "URL is required",
		  errCommandRequired: "Command is required",
		  errDuplicateId: "Entry id is already in use",
		  errDuplicateName: "serverName is already used by another server",
		  errInvalidConfig: "Invalid MCP server configuration",
		  errNotFound: "MCP server entry not found",
		  back: "Back",
		  tabOverview: "Overview",
		  tabTools: "Tools",
		  tabPrompts: "Prompts",
		  tabResources: "Resources",
		  tabLogs: "Logs",
		  searchServers: "Search servers\u2026",
		  searchTools: "Search tools\u2026",
		  filterConnected: "Connected only",
		  badgeStreaming: "streaming",
		  noTools: "No tools on this connection",
		  noPrompts: "This server provides no prompts",
		  noResources: "This server provides no resources",
		  noMatch: "No matches",
		  noParams: "No parameters",
		  description: "Description",
		  inputSchema: "Input schema",
		  schemaName: "Parameter",
		  schemaType: "Type",
		  schemaDesc: "Description",
		  schemaDefault: " (default {value})",
		  inspectLoading: "Reading from server\u2026",
		  inspectFailed: "Read failed: {error}",
		  logsEmpty: "No log entries",
		  logOpened: "Opened {name} details",
		  logProbeOk: "Probe ok \xB7 {ms}ms \xB7 {count} tools",
		  logProbeFail: "Probe failed: {error}",
		  logInspectOk: "Inspected server \xB7 {ms}ms \xB7 {prompts} prompts \xB7 {resources} resources",
		  logInspectFail: "Inspect failed: {error}",
		  fieldStatus: "Status",
		  fieldTarget: "Target",
		  fieldPatch: "Patch file",
		  fieldVersion: "Server version",
		  loadingHint: "Stuck on loading? Disable and enable again; if that fails, restart DSH.",
		  errUnknown: "Operation failed"
		};

		// src/client/McpManagerSection.tsx
		var import_jsx_runtime3 = require("react/jsx-runtime");
		function errorMessage2(error, t) {
		  if (error instanceof McpManagerRpcError) {
		    switch (error.code) {
		      case "duplicate-id":
		        return t("errDuplicateId");
		      case "duplicate-server-name":
		        return t("errDuplicateName");
		      case "invalid-config":
		        return t("errInvalidConfig");
		      case "not-found":
		        return t("errNotFound");
		      default:
		        return error.message.replace(/^[a-z-]+: /, "");
		    }
		  }
		  return error instanceof Error ? error.message : String(error);
		}
		function statusOf2(server) {
		  if (!server.enabled) return { tone: "off", key: "statusDisabled" };
		  switch (server.fiberPhase) {
		    case "active":
		      return server.toolCount > 0 ? { tone: "ok", key: "statusConnected", count: String(server.toolCount) } : { tone: "warn", key: "statusActiveNoTools" };
		    case "failed":
		      return { tone: "bad", key: "statusFailed" };
		    case "loading":
		      return { tone: "warn", key: "statusLoading" };
		    case "pending":
		      return { tone: "warn", key: "statusPending" };
		    case "unloading":
		      return { tone: "warn", key: "statusUnloading" };
		    default:
		      return { tone: "off", key: "statusNotLoaded" };
		  }
		}
		function McpManagerSection({ ctx }) {
		  const t = ctx.locale.bind(NS);
		  const [, bump] = (0, import_react2.useReducer)((x) => x + 1, 0);
		  (0, import_react2.useEffect)(() => ctx.locale.subscribe(bump), [ctx]);
		  const [servers, setServers] = (0, import_react2.useState)([]);
		  const [patchInfo, setPatchInfo] = (0, import_react2.useState)(null);
		  const [loading, setLoading] = (0, import_react2.useState)(true);
		  const [error, setError] = (0, import_react2.useState)(null);
		  const [adding, setAdding] = (0, import_react2.useState)(false);
		  const [editingId, setEditingId] = (0, import_react2.useState)(null);
		  const [detailId, setDetailId] = (0, import_react2.useState)(null);
		  const [busy, setBusy] = (0, import_react2.useState)(null);
		  const [probes, setProbes] = (0, import_react2.useState)({});
		  const [versions, setVersions] = (0, import_react2.useState)({});
		  const [query, setQuery] = (0, import_react2.useState)("");
		  const [searchOpen, setSearchOpen] = (0, import_react2.useState)(false);
		  const [connectedOnly, setConnectedOnly] = (0, import_react2.useState)(false);
		  const pendingToggles = (0, import_react2.useRef)({});
		  const formOpen = adding || editingId !== null;
		  const actionsDisabled = busy !== null || formOpen;
		  const refresh = (0, import_react2.useCallback)(async () => {
		    setLoading(true);
		    setError(null);
		    try {
		      const { servers: list } = await callRpc(ctx, "list");
		      setServers(list.map((server) => {
		        const intent = pendingToggles.current[server.id];
		        if (intent === void 0) return server;
		        if (server.enabled === intent) {
		          delete pendingToggles.current[server.id];
		          return server;
		        }
		        return { ...server, enabled: intent, fiberPhase: intent ? server.fiberPhase : null };
		      }));
		      const { patch } = await callRpc(ctx, "patchInfo");
		      setPatchInfo(patch);
		    } catch (err) {
		      setError(errorMessage2(err, t));
		    } finally {
		      setLoading(false);
		    }
		  }, [ctx, t]);
		  (0, import_react2.useEffect)(() => {
		    void refresh();
		  }, [refresh]);
		  const refreshSettled = (0, import_react2.useCallback)(() => {
		    void refresh();
		    window.setTimeout(() => {
		      void refresh();
		    }, 800);
		    window.setTimeout(() => {
		      void refresh();
		    }, 2400);
		  }, [refresh]);
		  const run = (0, import_react2.useCallback)(async (action, label) => {
		    setBusy(label);
		    setError(null);
		    try {
		      await action();
		      refreshSettled();
		    } catch (err) {
		      setError(errorMessage2(err, t));
		    } finally {
		      setBusy(null);
		    }
		  }, [refreshSettled, t]);
		  const toggleEnabled = (0, import_react2.useCallback)((server) => {
		    const next = !server.enabled;
		    const key = `toggle:${server.id}`;
		    pendingToggles.current[server.id] = next;
		    window.setTimeout(() => {
		      if (pendingToggles.current[server.id] === next) delete pendingToggles.current[server.id];
		    }, 6e3);
		    setServers((prev) => prev.map((item) => item.id === server.id ? { ...item, enabled: next, fiberPhase: next ? item.fiberPhase : null } : item));
		    setBusy(key);
		    setError(null);
		    void (async () => {
		      try {
		        await callRpc(ctx, "setEnabled", { id: server.id, enabled: next });
		        window.setTimeout(() => {
		          void refresh();
		        }, 700);
		        window.setTimeout(() => {
		          void refresh();
		        }, 2200);
		      } catch (err) {
		        delete pendingToggles.current[server.id];
		        setServers((prev) => prev.map((item) => item.id === server.id ? { ...item, enabled: !next } : item));
		        setError(errorMessage2(err, t));
		      } finally {
		        setBusy(null);
		      }
		    })();
		  }, [ctx, refresh, t]);
		  const removeServer = (0, import_react2.useCallback)((server) => {
		    if (!window.confirm(t("removeConfirm", { name: server.serverName, id: server.id }))) return;
		    void run(() => callRpc(ctx, "remove", { id: server.id }), `remove:${server.id}`);
		  }, [ctx, run, t]);
		  const testConnection = (0, import_react2.useCallback)((server) => {
		    void run(async () => {
		      const result = await callRpc(ctx, "probe", { id: server.id });
		      setProbes((prev) => ({ ...prev, [server.id]: result }));
		      if (result.ok && typeof result.serverVersion === "string" && result.serverVersion !== "") {
		        setVersions((prev) => ({ ...prev, [server.id]: result.serverVersion }));
		      }
		    }, `probe:${server.id}`);
		  }, [ctx, run]);
		  const handleVersion = (0, import_react2.useCallback)((id, version) => {
		    setVersions((prev) => ({ ...prev, [id]: version }));
		  }, []);
		  const beginAdd = (0, import_react2.useCallback)(() => {
		    setEditingId(null);
		    setDetailId(null);
		    setAdding(true);
		  }, []);
		  const closeForms = (0, import_react2.useCallback)(() => {
		    setAdding(false);
		    setEditingId(null);
		  }, []);
		  const beginEdit = (0, import_react2.useCallback)((server) => {
		    setAdding(false);
		    setEditingId(server.id);
		  }, []);
		  const summary = (0, import_react2.useMemo)(() => {
		    const enabled = servers.filter((s) => s.enabled).length;
		    const connected = servers.filter((s) => s.enabled && s.fiberPhase === "active" && s.toolCount > 0).length;
		    const failed = servers.filter((s) => s.enabled && s.fiberPhase === "failed").length;
		    return { total: servers.length, enabled, connected, failed };
		  }, [servers]);
		  const footer = patchInfo !== null ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dshmcp-footer", title: patchInfo.path, children: patchInfo.exists ? patchInfo.path : t("patchMissing", { path: patchInfo.path }) }) : null;
		  const detailServer = detailId !== null ? servers.find((server) => server.id === detailId) : void 0;
		  if (detailServer !== void 0) {
		    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-section", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		        ServerDetail,
		        {
		          ctx,
		          t,
		          server: detailServer,
		          probe: probes[detailServer.id],
		          patchPath: patchInfo?.path,
		          busy: actionsDisabled,
		          onBack: () => setDetailId(null),
		          onToggle: () => toggleEnabled(detailServer),
		          onTest: () => testConnection(detailServer),
		          onEdit: () => {
		            setDetailId(null);
		            beginEdit(detailServer);
		          },
		          onRemove: () => removeServer(detailServer),
		          onVersion: handleVersion
		        }
		      ),
		      footer
		    ] });
		  }
		  const needle = query.trim().toLowerCase();
		  const visible = servers.filter((server) => {
		    if (connectedOnly && !(server.enabled && server.fiberPhase === "active" && server.toolCount > 0)) return false;
		    if (needle === "") return true;
		    return server.serverName.toLowerCase().includes(needle) || server.id.toLowerCase().includes(needle);
		  });
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-section", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-head", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dshmcp-head-title", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(McpIcon, { size: 17 }),
		        t("title")
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshmcp-head-sub", children: t("total", { count: String(summary.total) }) }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshmcp-spacer" }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		        "button",
		        {
		          type: "button",
		          className: "dshmcp-iconbtn",
		          title: t("refresh"),
		          onClick: () => void refresh(),
		          disabled: loading,
		          children: loading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshmcp-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(RefreshIcon, { size: 14 })
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		        "button",
		        {
		          type: "button",
		          className: `dshmcp-iconbtn${connectedOnly ? " dshmcp-iconbtn-on" : ""}`,
		          title: t("filterConnected"),
		          onClick: () => setConnectedOnly((value) => !value),
		          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(FilterIcon, { size: 15 })
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		        "button",
		        {
		          type: "button",
		          className: `dshmcp-iconbtn${searchOpen ? " dshmcp-iconbtn-on" : ""}`,
		          title: t("searchServers"),
		          onClick: () => setSearchOpen((value) => !value),
		          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SearchIcon, { size: 15 })
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
		        "button",
		        {
		          type: "button",
		          className: "dshmcp-btn dshmcp-btn-primary dshmcp-btn-sm",
		          onClick: beginAdd,
		          disabled: actionsDisabled,
		          children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PlusIcon, { size: 12 }),
		            " ",
		            t("addServer"),
		            " ",
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronDownIcon, { size: 12 })
		          ]
		        }
		      )
		    ] }),
		    searchOpen ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		      "input",
		      {
		        className: "dshmcp-input dshmcp-search",
		        autoFocus: true,
		        placeholder: t("searchServers"),
		        value: query,
		        spellCheck: false,
		        onChange: (e) => setQuery(e.target.value)
		      }
		    ) : null,
		    error !== null ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dshmcp-error", children: error }) : null,
		    adding ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		      ServerForm,
		      {
		        ctx,
		        t,
		        initial: void 0,
		        existingIds: new Set(servers.map((s) => s.id)),
		        existingNames: new Set(servers.map((s) => s.serverName)),
		        busy: busy !== null,
		        onCancel: closeForms,
		        onSaved: () => {
		          closeForms();
		          void run(() => Promise.resolve(), "form:add");
		        }
		      }
		    ) : null,
		    editingId !== null ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		      ServerForm,
		      {
		        ctx,
		        t,
		        initial: servers.find((server) => server.id === editingId),
		        existingIds: new Set(servers.map((s) => s.id)),
		        existingNames: new Set(servers.map((s) => s.serverName)),
		        busy: busy !== null,
		        onCancel: closeForms,
		        onSaved: () => {
		          closeForms();
		          void run(() => Promise.resolve(), "form:update");
		        }
		      }
		    ) : null,
		    loading && servers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-empty", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshmcp-spin" }),
		      " ",
		      t("loading")
		    ] }) : null,
		    !loading && servers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-empty", children: [
		      t("empty"),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("br", {}),
		      t("emptyHint")
		    ] }) : null,
		    servers.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-rows", children: [
		      visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dshmcp-empty", children: t("noMatch") }) : null,
		      visible.map((server) => {
		        const status = statusOf2(server);
		        const version = versions[server.id];
		        return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `dshmcp-row${server.enabled ? "" : " dshmcp-row-off"}`, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
		            "button",
		            {
		              type: "button",
		              className: "dshmcp-row-main",
		              onClick: () => {
		                setAdding(false);
		                setEditingId(null);
		                setDetailId(server.id);
		              },
		              children: [
		                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dshmcp-dot dshmcp-dot-${status.tone}` }),
		                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshmcp-row-name", children: server.serverName || t("unnamed") }),
		                version !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshmcp-row-version", children: version }) : null,
		                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshmcp-badge", children: server.transport === "stdio" ? "stdio" : t("badgeStreaming") }),
		                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshmcp-row-tools", children: t("toolCount", { count: String(server.toolCount) }) })
		              ]
		            }
		          ),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		            "button",
		            {
		              type: "button",
		              role: "switch",
		              "aria-checked": server.enabled,
		              className: `dshmcp-switch${server.enabled ? " dshmcp-switch-on" : ""}${busy === `toggle:${server.id}` ? " dshmcp-switch-busy" : ""}`,
		              disabled: formOpen || busy !== null && busy !== `toggle:${server.id}`,
		              title: server.enabled ? t("disable") : t("enable"),
		              onClick: () => toggleEnabled(server),
		              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshmcp-switch-knob" })
		            }
		          )
		        ] }, server.id);
		      })
		    ] }) : null,
		    footer
		  ] });
		}
		var EMPTY_FORM = {
		  id: "",
		  serverName: "",
		  transport: "streamable-http",
		  url: "",
		  command: "",
		  argsText: "",
		  envText: "",
		  cwd: "",
		  headersText: "",
		  toolCallTimeoutMs: "",
		  failOnStartupError: false
		};
		function toForm(server) {
		  if (server === void 0) return EMPTY_FORM;
		  return {
		    id: server.id,
		    serverName: server.serverName,
		    transport: server.transport,
		    url: server.url ?? "",
		    command: server.command ?? "",
		    argsText: (server.args ?? []).join("\n"),
		    envText: (server.env !== void 0 ? Object.entries(server.env).map(([k, v]) => `${k}=${v}`) : []).join("\n"),
		    cwd: server.cwd ?? "",
		    headersText: (server.headers !== void 0 ? Object.entries(server.headers).map(([k, v]) => `${k}: ${v}`) : []).join("\n"),
		    toolCallTimeoutMs: server.toolCallTimeoutMs !== void 0 ? String(server.toolCallTimeoutMs) : "",
		    failOnStartupError: server.failOnStartupError === true
		  };
		}
		function splitLines(text) {
		  return text.split(/\r?\n/).map((line) => line.trim()).filter((line) => line !== "");
		}
		function stripQuotes(value) {
		  const trimmed = value.trim();
		  if (trimmed.length >= 2) {
		    const first = trimmed[0];
		    const last = trimmed[trimmed.length - 1];
		    if (first === '"' && last === '"' || first === "'" && last === "'") {
		      return trimmed.slice(1, -1).trim();
		    }
		  }
		  return trimmed;
		}
		function parsePairs(text) {
		  const lines = splitLines(text);
		  if (lines.length === 0) return void 0;
		  const out = {};
		  for (const line of lines) {
		    const eq = line.indexOf("=");
		    const colon = line.indexOf(":");
		    const sep = eq === -1 ? colon : colon === -1 ? eq : Math.min(eq, colon);
		    if (sep <= 0) continue;
		    out[stripQuotes(line.slice(0, sep))] = stripQuotes(line.slice(sep + 1));
		  }
		  return out;
		}
		function toConfig(form) {
		  const config = {
		    serverName: form.serverName.trim(),
		    transport: form.transport
		  };
		  if (form.transport === "streamable-http") {
		    if (form.url.trim() !== "") config.url = form.url.trim();
		  } else {
		    if (form.command.trim() !== "") config.command = form.command.trim();
		    const args = splitLines(form.argsText);
		    if (args.length > 0) config.args = args;
		    const env = parsePairs(form.envText);
		    if (env !== void 0) config.env = env;
		    if (form.cwd.trim() !== "") config.cwd = form.cwd.trim();
		  }
		  const headers = parsePairs(form.headersText);
		  if (headers !== void 0) config.headers = headers;
		  if (form.toolCallTimeoutMs.trim() !== "" && Number.isFinite(Number(form.toolCallTimeoutMs))) {
		    config.toolCallTimeoutMs = Number(form.toolCallTimeoutMs);
		  }
		  if (form.failOnStartupError) config.failOnStartupError = true;
		  return config;
		}
		function ServerForm({ ctx, t, initial, existingIds, existingNames, busy, onCancel, onSaved }) {
		  const editing = initial !== void 0;
		  const [form, setForm] = (0, import_react2.useState)(() => toForm(initial));
		  const [fieldErrors, setFieldErrors] = (0, import_react2.useState)({});
		  const [submitError, setSubmitError] = (0, import_react2.useState)(null);
		  const [saving, setSaving] = (0, import_react2.useState)(false);
		  const set = (key, value) => {
		    setForm((prev) => ({ ...prev, [key]: value }));
		  };
		  const validateLocal = () => {
		    const errors = {};
		    if (form.id.trim() === "") errors["id"] = t("errIdRequired");
		    else if (!/^[A-Za-z0-9_-]{1,64}$/.test(form.id.trim())) errors["id"] = t("errIdPattern");
		    else if (!editing && existingIds.has(form.id.trim())) errors["id"] = t("errIdTaken");
		    if (form.serverName.trim() === "") errors["serverName"] = t("errNameRequired");
		    else if (!/^[A-Za-z0-9_-]{1,32}$/.test(form.serverName.trim())) errors["serverName"] = t("errNamePattern");
		    else if (!editing && existingNames.has(form.serverName.trim())) errors["serverName"] = t("errNameTaken");
		    if (form.transport === "streamable-http" && form.url.trim() === "") errors["url"] = t("errUrlRequired");
		    if (form.transport === "stdio" && form.command.trim() === "") errors["command"] = t("errCommandRequired");
		    return errors;
		  };
		  const submit = async () => {
		    const local = validateLocal();
		    setFieldErrors(local);
		    if (Object.keys(local).length > 0) return;
		    setSaving(true);
		    setSubmitError(null);
		    try {
		      const payload = { id: form.id.trim(), config: toConfig(form) };
		      if (editing) {
		        await callRpc(ctx, "update", payload);
		      } else {
		        await callRpc(ctx, "add", payload);
		      }
		      onSaved();
		    } catch (err2) {
		      if (err2 instanceof McpManagerRpcError && err2.fields !== void 0) setFieldErrors(err2.fields);
		      setSubmitError(errorMessage2(err2, t));
		    } finally {
		      setSaving(false);
		    }
		  };
		  const err = (key) => fieldErrors[key];
		  const inputClass = (key) => `dshmcp-input${err(key) !== void 0 ? " dshmcp-input-invalid" : ""}`;
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-form", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dshmcp-form-title", children: editing ? t("formEditTitle", { name: initial.serverName }) : t("formAddTitle") }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-field-row", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-field", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "dshmcp-label", htmlFor: "dshmcp-id", children: t("fieldId") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "input",
		          {
		            id: "dshmcp-id",
		            className: inputClass("id"),
		            value: form.id,
		            placeholder: "mcp-github",
		            spellCheck: false,
		            disabled: editing || saving || busy,
		            onChange: (e) => set("id", e.target.value)
		          }
		        ),
		        err("id") !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dshmcp-hint", children: err("id") }) : null
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-field", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "dshmcp-label", htmlFor: "dshmcp-server", children: t("fieldServerName") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "input",
		          {
		            id: "dshmcp-server",
		            className: inputClass("serverName"),
		            value: form.serverName,
		            placeholder: "github",
		            spellCheck: false,
		            disabled: saving || busy,
		            onChange: (e) => set("serverName", e.target.value)
		          }
		        ),
		        err("serverName") !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dshmcp-hint", children: err("serverName") }) : null
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-field", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "dshmcp-label", htmlFor: "dshmcp-transport", children: t("fieldTransport") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
		        "select",
		        {
		          id: "dshmcp-transport",
		          className: "dshmcp-select",
		          value: form.transport,
		          disabled: saving || busy,
		          onChange: (e) => set("transport", e.target.value),
		          children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "streamable-http", children: "streamable-http" }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "stdio", children: "stdio" })
		          ]
		        }
		      )
		    ] }),
		    form.transport === "streamable-http" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-field", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "dshmcp-label", htmlFor: "dshmcp-url", children: t("fieldUrl") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		        "input",
		        {
		          id: "dshmcp-url",
		          className: inputClass("url"),
		          value: form.url,
		          placeholder: "http://127.0.0.1:3000/mcp",
		          spellCheck: false,
		          disabled: saving || busy,
		          onChange: (e) => set("url", e.target.value)
		        }
		      ),
		      err("url") !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dshmcp-hint", children: err("url") }) : null
		    ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-field", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "dshmcp-label", htmlFor: "dshmcp-command", children: t("fieldCommand") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "input",
		          {
		            id: "dshmcp-command",
		            className: inputClass("command"),
		            value: form.command,
		            placeholder: "npx",
		            spellCheck: false,
		            disabled: saving || busy,
		            onChange: (e) => set("command", e.target.value)
		          }
		        ),
		        err("command") !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dshmcp-hint", children: err("command") }) : null
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-field", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "dshmcp-label", htmlFor: "dshmcp-args", children: t("fieldArgs") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "textarea",
		          {
		            id: "dshmcp-args",
		            className: "dshmcp-input",
		            rows: 3,
		            value: form.argsText,
		            placeholder: "-y\n@modelcontextprotocol/server-github",
		            spellCheck: false,
		            disabled: saving || busy,
		            onChange: (e) => set("argsText", e.target.value)
		          }
		        )
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-field", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "dshmcp-label", htmlFor: "dshmcp-env", children: t("fieldEnv") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "textarea",
		          {
		            id: "dshmcp-env",
		            className: "dshmcp-input",
		            rows: 3,
		            value: form.envText,
		            placeholder: "GITHUB_TOKEN=ghp_xxx",
		            spellCheck: false,
		            disabled: saving || busy,
		            onChange: (e) => set("envText", e.target.value)
		          }
		        )
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-field", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "dshmcp-label", htmlFor: "dshmcp-cwd", children: t("fieldCwd") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "input",
		          {
		            id: "dshmcp-cwd",
		            className: "dshmcp-input",
		            value: form.cwd,
		            spellCheck: false,
		            disabled: saving || busy,
		            onChange: (e) => set("cwd", e.target.value)
		          }
		        )
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-field", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "dshmcp-label", htmlFor: "dshmcp-headers", children: t("fieldHeaders") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		        "textarea",
		        {
		          id: "dshmcp-headers",
		          className: "dshmcp-input",
		          rows: 2,
		          value: form.headersText,
		          placeholder: "Authorization: Bearer xxx",
		          spellCheck: false,
		          disabled: saving || busy,
		          onChange: (e) => set("headersText", e.target.value)
		        }
		      )
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-field-row", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-field", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "dshmcp-label", htmlFor: "dshmcp-timeout", children: t("fieldTimeout") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "input",
		          {
		            id: "dshmcp-timeout",
		            className: "dshmcp-input",
		            value: form.toolCallTimeoutMs,
		            inputMode: "numeric",
		            placeholder: "60000",
		            disabled: saving || busy,
		            onChange: (e) => set("toolCallTimeoutMs", e.target.value.replace(/[^0-9]/g, ""))
		          }
		        )
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dshmcp-field", style: { justifyContent: "flex-end" }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "dshmcp-check", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "input",
		          {
		            type: "checkbox",
		            checked: form.failOnStartupError,
		            disabled: saving || busy,
		            onChange: (e) => set("failOnStartupError", e.target.checked)
		          }
		        ),
		        t("fieldFailStartup")
		      ] }) })
		    ] }),
		    submitError !== null ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dshmcp-error", children: submitError }) : null,
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshmcp-form-actions", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dshmcp-btn dshmcp-btn-sm", onClick: onCancel, disabled: saving, children: t("cancel") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { type: "button", className: "dshmcp-btn dshmcp-btn-sm dshmcp-btn-primary", onClick: () => void submit(), disabled: saving || busy, children: [
		        saving ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshmcp-spin" }) : null,
		        " ",
		        editing ? t("save") : t("addServer")
		      ] })
		    ] })
		  ] });
		}

		// src/client/styles.ts
		var STYLE_ID = "dsh-mcp-manager-styles";
		var CSS = `
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
		`;
		function injectPanelStyles() {
		  if (document.getElementById(STYLE_ID) !== null) return;
		  const style = document.createElement("style");
		  style.id = STYLE_ID;
		  style.textContent = CSS;
		  document.head.appendChild(style);
		}

		// src/client/index.tsx
		var NAV_LABELS = /* @__PURE__ */ new Set(["MCP", "MCP \u670D\u52A1\u5668", "MCP servers"]);
		function mcpIconElement(size) {
		  const svgNs = "http://www.w3.org/2000/svg";
		  const svg = document.createElementNS(svgNs, "svg");
		  svg.setAttribute("width", String(size));
		  svg.setAttribute("height", String(size));
		  svg.setAttribute("viewBox", "0 0 24 24");
		  svg.setAttribute("fill", "none");
		  svg.setAttribute("stroke", "currentColor");
		  svg.setAttribute("stroke-width", "2");
		  svg.setAttribute("stroke-linecap", "round");
		  svg.setAttribute("stroke-linejoin", "round");
		  svg.setAttribute("aria-hidden", "true");
		  svg.setAttribute("data-mcp-icon", "true");
		  const group = document.createElementNS(svgNs, "g");
		  group.setAttribute("transform", "rotate(-30 12 12)");
		  const pins = ["M9 3.5v4", "M15 3.5v4"];
		  for (const d of pins) {
		    const path = document.createElementNS(svgNs, "path");
		    path.setAttribute("d", d);
		    group.appendChild(path);
		  }
		  const body = document.createElementNS(svgNs, "rect");
		  body.setAttribute("x", "6");
		  body.setAttribute("y", "7.5");
		  body.setAttribute("width", "12");
		  body.setAttribute("height", "7");
		  body.setAttribute("rx", "3");
		  group.appendChild(body);
		  const stem = document.createElementNS(svgNs, "path");
		  stem.setAttribute("d", "M12 14.5v5");
		  group.appendChild(stem);
		  svg.appendChild(group);
		  return svg;
		}
		function patchNavIcon() {
		  for (const nav of document.querySelectorAll('[role="dialog"] nav')) {
		    for (const button of nav.querySelectorAll("button")) {
		      const label = (button.textContent ?? "").trim();
		      if (!NAV_LABELS.has(label)) continue;
		      const icon = button.querySelector("svg");
		      if (icon === null || icon.getAttribute("data-mcp-icon") === "true") continue;
		      const size = Number(icon.getAttribute("width") ?? "16") || 16;
		      const plug = mcpIconElement(size);
		      const className = icon.getAttribute("class");
		      if (className !== null) plug.setAttribute("class", className);
		      icon.replaceWith(plug);
		    }
		  }
		}
		var inject = ["slots", "connection", "locale"];
		var SECTION_ORDER = 18;
		function apply(ctx) {
		  ctx.effect(() => {
		    injectPanelStyles();
		    return () => {
		    };
		  }, "mcp-manager: styles");
		  ctx.effect(() => {
		    let scheduled = false;
		    const schedule = () => {
		      if (scheduled) return;
		      scheduled = true;
		      window.requestAnimationFrame(() => {
		        scheduled = false;
		        patchNavIcon();
		      });
		    };
		    patchNavIcon();
		    const observer = new MutationObserver(schedule);
		    observer.observe(document.body, { childList: true, subtree: true });
		    return () => {
		      observer.disconnect();
		    };
		  }, "mcp-manager: nav icon");
		  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "mcp-manager: locale");
		  const t = ctx.locale.bind(NS);
		  ctx.slots.inject("settings.section", () => ctx.slots.register({
		    name: "settings.section",
		    id: "mcp",
		    order: SECTION_ORDER,
		    label: () => t("nav"),
		    inject: () => ({ ctx })
		  }, McpManagerSection));
		}
		//# sourceMappingURL=client.js.map


		return module.exports;
	}
});

//# sourceMappingURL=client.js.map
