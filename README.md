# dsh-mcp-manager-web

**DeepSeek Harness 的 MCP 可视化管理器**：在 **设置 → MCP** 里查看、添加、编辑、启停 MCP 服务器，并且能点进单个服务，看到它注册了哪些工具、每个工具的参数结构，以及服务端提供的提示（prompts）和资源（resources）。

> 维护者：[zengshuaishuai](https://github.com/zengshuaishuai)
>
> 本项目在 MIT 许可的开源项目 dsh-mcp-manager 基础上二次开发：重做了列表与详情界面，并新增工具目录、提示/资源读取等能力。原始版权声明保留在 [LICENSE](LICENSE) 中。

---

## 功能

### 服务器列表

- 紧凑行式列表：状态圆点（已连接 / 告警 / 失败 / 停用）、名称、服务版本、传输方式徽章（流式 / stdio）、工具数、启停开关
- 顶部工具条：刷新、只看已连接、搜索服务器、添加服务器
- 点任意一行进入详情页

### 详情页

| 标签 | 内容 |
|---|---|
| **通用** | 连接状态、条目 ID、传输方式、目标地址 / 命令、serverName、工具数、服务版本、超时、补丁文件路径；测试 / 编辑 / 停用 / 删除 |
| **工具** | 该服务注册到工具表里的全部工具（`mcp__<serverName>__*`），支持搜索；展开可见描述和**输入参数表**（参数名 / 类型 / 必填 / 说明 / 默认值） |
| **提示** | 按需建立一条独立 MCP 连接读取 `prompts/list`；服务端未实现时显示为空 |
| **资源** | 同上，读取 `resources/list`（名称 / URI / MIME 类型） |
| **日志** | 本页的操作流水（打开详情、探测结果、读取提示/资源的结果），带时间戳 |

### 其他

- **添加 / 编辑 / 删除**：支持 `stdio`（command / args / env / cwd）与 `streamable-http`（url / headers），带 id、serverName、URL 等字段校验
- **连接测试**：独立连接跑一次 `initialize + tools/list`，报告耗时与工具数
- **中英双语**：界面文案跟随 DSH 当前语言
- **深浅主题自适应**：颜色全部取自 DSH 的 `--dsw-*` token，不写死
- **即改即生效**：所有修改写入 profile 的 `cordis.patch.yml`，由 harness 的 HMR 热应用（配置层面无需重启）
- **MCP 图标**：设置导航里把未知插件默认的齿轮换成了 MCP 插头图标（浏览器端运行时替换）

## 安装

前置：DSH 已经能正常启动（`dsh web` 或 DSH Desktop）。

> 桌面版（Electron）的 profile 名是 `desktop`，Web 版通常是 `web`。下面命令里的 `--profile desktop` 按你的实际情况替换。

### 方式一：本地源码（`link:`）

```sh
git clone https://github.com/zengshuaishuai/dsh-mcp-manager-web.git dsh-mcp-manager-web
cd dsh-mcp-manager-web
# 仓库已包含构建产物 lib/，只有改过 src/ 才需要重新构建：
node scripts/build.mjs

dsh plugin --profile desktop add "link:$PWD"
```

### 方式二：直接装 GitHub 源

```sh
dsh plugin --profile desktop add github:zengshuaishuai/dsh-mcp-manager-web
```

`lib/` 已入库，GitHub 源安装不需要本地构建。

### 生效

安装后**硬刷新浏览器**（`Cmd/Ctrl + Shift + R`），打开 **设置 → MCP**。
如果没看到 MCP 页签，重启一次 DSH（宿主端首次挂载需要）。

## 配置

插件自身只有一项可选配置 —— 它要编辑哪个补丁文件：

```yaml
- id: mcp-manager
  name: "@zengshuaishuai/dsh-mcp-manager-web"
  config:
    patchFile: /Users/you/.dsh/profiles/desktop/cordis.patch.yml
```

`patchFile` 默认是 `$DSH_HOME/profiles/web/cordis.patch.yml`。**桌面版必须显式指向 `profiles/desktop/`**，否则增删的 MCP 服务器会写进 Web 版 profile、不生效。

## 架构

```
src/
├── index.ts       宿主端入口：注册 /api/mcp-manager 的 Fetch 路由并分发 action
├── status.ts      遍历 loader 里的 mcp-client 条目，投影状态与工具目录
├── probe.ts       独立 MCP 连接：probe（计数）/ inspect（工具+提示+资源+版本）
├── patch.ts       读写 profile 的 cordis.patch.yml（insert / 覆盖 / disabled）
├── validate.ts    表单校验（与 dsh-mcp-client 的 schema 对齐）
├── shared.ts      两端共享的类型与常量
└── client/        浏览器端：设置页、详情页、文案、样式、图标、RPC 封装
```

**RPC 端点**（走 harness 自带的 `/api` 通道，复用浏览器鉴权）：

| action | 说明 |
|---|---|
| `list` | 所有 mcp-client 条目 + 状态 + 工具目录 |
| `add` / `update` / `remove` | 增改删补丁行 |
| `setEnabled` | 启停（写 `disabled` 标记） |
| `probe` | 连通性探测（工具数、版本） |
| `inspect` | 读取工具（含 schema）、提示、资源、服务版本 |
| `patchInfo` | 当前补丁文件路径与是否存在 |

浏览器端通过 `settings.section` 槽位注册页面（order 18），宿主端不依赖任何 `@deepseek-ai` 运行时包（`js-yaml` 方言与 `isJsExpr` 均内联），因此可以放在任意路径安装。

## 开发

```sh
pnpm install          # 安装依赖（含 esbuild 等构建工具）
node scripts/build.mjs # 或 pnpm build
```

产物：

- `lib/index.js` — 宿主端 ESM bundle（`js-yaml`、`@modelcontextprotocol/*`、`@deepseek-ai/*` 均为 external）
- `lib/client.js` — 浏览器端 `window.__ModuleLoader__` bundle（`react` 为 external，运行时由宿主注入）

**类型检查的坑**：`tsconfig.json` 里的 `paths` 指向上游作者的 Windows 绝对路径（`D:/ProgramFiles/...`），直接 `tsc` 会找不到 `@deepseek-ai/*`。需要先改成你本地安装的包路径，或另建一份本地 tsconfig。

修改 `src/` 后必须重新构建；客户端改动硬刷新浏览器即可（宿主会观察 `lib/client.js` 的变更），宿主端改动需要重启 DSH。

`test/fixtures/` 下有一个最小的 stdio MCP 服务器，可用于本地联调。

## 已知限制

- **不支持按工具启用 / 自动批准**：`@deepseek-ai/dsh-mcp-client` 会把服务端工具全量注册，插件无法单独开关某个工具，也无法为单个工具设置自动批准，所以工具行是只读展示。
- **提示 / 资源不是实时数据**：它们由 `inspect` 单独建连读取，点开时拉一次，不会持续同步。
- **日志是本页操作流水**，不是 mcp-client 进程日志（插件拿不到宿主插件实例的日志）。
- **服务版本**只有在成功连接（打开详情或点测试）之后才有。
- **只能管理用户补丁层的条目**：由 bundle 定义的 MCP 条目不能删除或停用。
- **启停沿用 loader 的 `disabled` 标记**：部分 DSH 版本上重新启用后可能长时间停在「加载中」，此时重启一次 DSH 可恢复。

## 兼容性

在 **DSH Desktop 0.2.1-rc.2（macOS arm64）** 上开发与验证；MCP 协议侧兼容 stdio 与 streamable-http。

## 许可

[MIT](LICENSE)。本仓库同样以 MIT 发布；原始项目的版权声明保留在 LICENSE 中。
