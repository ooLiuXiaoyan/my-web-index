---
title: 02 · Hermes 使用指南
status: 已发布
source: hermes-usage-guide.html
---

# Hermes 使用指南

<span class="badge badge-done">已发布</span>

Hermes — 开源、可自我改进的 AI 智能体，由 Nous Research 开发，支持多模型、工具调用、技能学习、持久记忆、定时任务和多种终端环境。适配 **Hermes Agent v0.23.3**，命令与功能核对日期：2026-11-23。

## 核心能力一览

- 🧠 **多模型接入**：支持 Nous Portal、OpenRouter、OpenAI、Anthropic、DeepSeek 和自定义端点等，可用 `hermes model` 切换
- 🔧 **工具调用**：提供文件、终端、浏览器和搜索等工具，支持本地、Docker、SSH 及多种云端沙箱
- 🎯 **自定义技能**：通过 Skill 系统封装领域知识，支持从经验创建和改进技能，也可安装社区技能
- 💾 **记忆系统**：MEMORY.md 与 USER.md 保存精选长期信息，历史会话通过 SQLite 会话检索按需查询
- 🔌 **MCP 协议**：支持本地 stdio 和远程 HTTP MCP 服务器，可通过 `hermes mcp` 管理目录和连接
- 🔐 **安全可控**：支持危险命令审批和隔离终端。使用云端模型或工具时，相关上下文仍可能发送给第三方，需按数据敏感度配置

## 🧬 在 Hermes 中创建智能体

Hermes 通过 **Profile（智能体档案）** 隔离配置、记忆、技能和会话。身份、项目约定、用户偏好和长期经验分别由上下文文件与记忆系统维护。

### 创建智能体的作用

- **持久身份与人格** — 用 SOUL.md 定义稳定的角色定位、语气与工作风格
- **项目约定** — 用 AGENTS.md 等项目上下文记录架构、工具链和业务规则
- **用户偏好与经验** — 用 USER.md 和 MEMORY.md 保存需要跨会话保留的精选信息
- **环境隔离** — 为不同任务创建不同 Profile，避免配置和记忆相互污染

### 创建步骤

**步骤 1：创建 Profile**

```bash
# 创建一个名为 mushroom 的 Agent Profile
hermes profile create mushroom
```

该命令会初始化独立的配置空间。默认 Profile 的记忆位于 `~/.hermes/memories/`，命名 Profile 则位于各自的 Profile 数据目录。

**步骤 2：配置上下文与长期记忆**

以下文件职责不同，不应把整套项目文档都塞入长期记忆：

| 文件 | 位置与作用 | 适合写什么 | 避免写什么 |
| --- | --- | --- | --- |
| `AGENTS.md` | 项目目录中的项目指令 | 架构、目录约定、构建测试命令、项目规范 | 用户私人偏好和密钥 |
| `SOUL.md` | 仅从当前 HERMES_HOME 加载的全局身份 | Agent 身份、语气、工作风格、长期行为准则 | 临时任务和项目细节 |
| `USER.md` | `memories/` 下的用户画像，默认上限 1,375 字符 | 用户身份、语言与回答风格偏好、稳定禁忌 | 一次性指令和大段项目文档 |
| `MEMORY.md` | `memories/` 下的个人笔记，默认上限 2,200 字符 | 环境事实、项目约定、工具经验和重要完成记录 | 宽泛口号、原始数据和大段日志 |

**步骤 3：加载并使用 Profile**

编辑完上下文文件后，启动 Hermes 时选择对应 Profile 即可生效。具体加载参数请以 `hermes --help` 输出为准，常见形式如下：

```bash
# 示例：加载 mushroom Profile
hermes --profile mushroom
```

### 写法示例

**SOUL.md 示例** —— 定义 Agent 的人格与行为总则：

```text
你是一位资深的地理信息（GIS）研发助手，擅长 GDAL、PostGIS、OpenLayers 和 Python 空间分析。

语气：专业、简洁、耐心，使用中文回答。
工作风格：先理解需求，再给出可执行的命令或代码；遇到可能损坏数据的操作，必须先提醒用户确认。
长期角色：帮助用户完成空间数据处理、地图服务开发和坐标转换任务。
```

**USER.md 示例** —— 描述用户画像：

```text
用户是一名 GIS 开发工程师，熟悉 Python 但不喜欢读长篇大论。

偏好：
- 回答语言：中文
- 称呼：用"你"或直呼其名即可，不要称"主人"
- 风格：先给结论，再给代码示例，最后补充注意事项
- 禁忌：不要生成未经验证的坐标系转换参数
```

**MEMORY.md 示例** —— Agent 的个人笔记：

```text
- 当前项目使用 PostGIS 存储矢量数据，默认坐标系为 4326。
- 用户经常批量处理 Shapefile 转 GeoJSON，可用 ogr2ogr 一键完成。
- 遇到"空间数据"相关问题时，优先检查坐标系与数据范围。
- 上次学到：Windows 下 GDAL 路径需用正斜杠，否则 ogr2ogr 会报错。
```

::: tip 💡 最佳实践
把 `SOUL.md` 当作「岗位说明书」，把 `USER.md` 当作「用户画像卡」，把 `MEMORY.md` 当作「工作手账」。三类文件越具体，Agent 的长期行为越稳定。
:::

::: warning ⚠️ 注意
长期上下文会显著影响模型输出，建议在修改后先进行小范围测试，确认行为符合预期再投入生产使用。
:::

## 功能矩阵

| 功能 | 描述 | 典型场景 |
| --- | --- | --- |
| **交互式会话** | 多轮对话，上下文感知，实时响应 | 日常问答、代码调试、文档查询 |
| **批量处理** | 非交互模式，支持脚本化批量任务 | 批量数据清洗、批量代码审查 |
| **文件操作** | 读写文件、目录管理、代码搜索 | 项目重构、文档生成、配置管理 |
| **Shell 执行** | 运行系统命令、脚本执行 | DevOps 自动化、环境搭建 |
| **网络搜索** | 实时联网搜索，获取最新信息 | 技术调研、竞品分析 |
| **子代理编排** | 并行/串行子代理协作，复杂任务拆解 | 大型项目开发、多步骤工作流 |

## 🌍 行业实战场景

以下场景基于 Hermes 核心能力，结合五大领域的典型需求展开。

### 🗺️ 地理信息研发（GIS）

空间数据处理 · 地图服务开发 · 遥感分析

**场景一：空间数据 ETL 自动化**

地理信息研发中，数据来源多样（Shapefile、GeoJSON、遥感影像、矢量瓦片），格式转换与清洗是高频任务。Hermes 可通过自定义技能封装 GDAL/OGR 工具链，实现一键式数据转换。

```bash
# 通过 Hermes 批量转换 Shapefile 为 GeoJSON
hermes chat --oneshot -q "将 data/shapes/ 目录下所有 .shp 文件转为 GeoJSON，输出到 output/geojson/"

# Hermes 会自动调用 GDAL 工具完成转换：
# ogr2ogr -f GeoJSON output/file.geojson data/shapes/file.shp
```

- **坐标系批量转换** — 将不同来源的空间数据统一到 WGS84 或 CGCS2000 坐标系
- **遥感影像预处理** — 批量裁剪、波段合成、辐射校正脚本生成
- **地理编码服务** — 地址文本转坐标，支持批量处理百万级地址

**场景二：地图服务开发辅助**

使用 Hermes 辅助开发 Mapbox GL / OpenLayers / Leaflet 前端代码，快速搭建 WebGIS 应用原型。

```bash
# 让 Hermes 生成一个基于 OpenLayers 的矢量瓦片查看器
hermes --skills webgis-dev --model deepseek-flash

> 生成一个基于当前稳定版 OpenLayers 的矢量瓦片地图应用，
> 支持图层切换、要素点击查询、坐标显示功能
```

::: tip 💡 最佳实践
将 Hermes 的记忆系统用于存储项目中的空间数据 Schema 和 API 规范，确保多轮对话中保持一致的上下文。
:::

`GIS开发` `GDAL` `遥感` `空间分析` `坐标转换`

### 🤖 人工智能

模型开发 · Prompt 工程 · Agent 构建

**场景一：模型评估与对比**

AI 研发人员需要在多个模型之间快速切换，评估不同模型在特定任务上的表现。Hermes 的多模型接入能力使这一过程高效可控。

```bash
# 先通过交互式向导配置对应提供商和模型
hermes model

# 使用当前 DeepSeek Flash 执行单次查询
hermes chat --model deepseek-flash --oneshot -q "分析这段代码的性能瓶颈"

# 切换到当前 Claude Sonnet 对比同一任务
hermes chat --model claude-sonnet-5-5 --oneshot -q "分析这段代码的性能瓶颈"
```

- **Prompt 模板管理** — 在记忆系统中存储经过验证的 Prompt 模板，跨会话复用
- **Agent 工作流设计** — 使用子代理编排复杂的多步骤 AI Pipeline
- **RAG 管道调试** — 通过文件工具读取文档片段，测试检索增强生成效果

**场景二：代码生成与审查**

Hermes 可作为 AI 辅助编程助手，在项目目录中读取代码上下文，生成符合项目风格的新代码。

```bash
# 在项目目录中启动 Hermes，自动加载项目上下文
hermes --in ./my-project

> 为 src/services/ 目录下的 API 模块编写单元测试，
> 使用 pytest，覆盖正常路径和边界情况
```

::: warning ⚠️ 注意
AI 生成的代码需经过人工审查。Hermes 的工具调用权限分级机制可确保敏感操作（如 git push）需用户确认。
:::

`模型评估` `Prompt工程` `Agent编排` `代码生成` `RAG`

### 📊 数据治理

数据质量 · 元数据管理 · 合规审查

**场景一：数据质量自动检测**

Hermes 可通过自定义技能封装数据质量检测规则，对数据集进行自动扫描并生成质量报告。

```bash
# 使用 Hermes 扫描 CSV 数据集质量
hermes chat --skills data-quality

> 分析 data/customers.csv 的数据质量：
> 1. 检查空值比例
> 2. 识别重复记录
> 3. 验证字段格式（邮箱、手机号、身份证）
> 4. 生成质量报告到 reports/ 目录
```

- **Schema 一致性校验** — 自动比对数据库 Schema 与文档定义，发现漂移
- **敏感数据扫描** — 识别数据集中的 PII 信息（姓名、手机号、身份证号）
- **数据血缘追踪** — 分析 ETL 脚本，自动生成数据流向图

**场景二：元数据管理自动化**

通过 Hermes 与数据库工具的集成，自动提取表结构、字段描述、数据类型等元数据，生成数据字典。

```yaml
# 在 ~/.hermes/config.yaml 中配置所选 PostgreSQL MCP 服务器
# 启动命令和参数以该服务器的官方文档为准
mcp_servers:
  postgres:
    command: "<PostgreSQL MCP 服务器启动命令>"
    args: ["<连接参数>"]
```

```bash
# 也可通过 MCP 管理入口查看目录和连接
hermes mcp

# 启动会话后提出只读任务
hermes chat
> 连接 postgres MCP，提取所有表的元数据，
> 生成 Markdown 格式的数据字典到 docs/data-dict.md
```

::: tip 💡 合规提示
处理敏感数据时，可评估本地模型和隔离终端，减少上下文外发；同时检查 MCP、搜索及其他外部工具的数据去向。仅使用本地模型并不能自动保证满足全部合规要求。
:::

`数据质量` `元数据` `合规审查` `数据字典` `PII检测`

### 🌐 企业出海

多语言处理 · 本地化 · 跨境合规

**场景一：多语言内容本地化**

企业出海面临的首要挑战是语言。Hermes 支持多语言 Prompt，可批量完成产品文案、帮助文档、营销素材的翻译与本地化。

```bash
# 批量翻译产品文案为多语言版本
hermes chat --model deepseek-flash

> 将 docs/product-intro.md 翻译为英语、日语、韩语、西班牙语，
> 保持技术术语一致性，输出到 docs/translations/ 目录下
> 每个语言版本保留对应的文件名后缀（_en, _ja, _ko, _es）
```

- **UI 文案国际化** — 批量提取代码中的硬编码字符串，生成 i18n 资源文件
- **本地化适配建议** — 分析目标市场文化差异，提供 UI/UX 本地化建议
- **多语言客服知识库** — 构建多语言 FAQ，支持跨语言语义检索

**场景二：跨境合规文档生成**

不同国家/地区的数据保护法规差异巨大（GDPR、CCPA、PIPL）。Hermes 可辅助生成合规文档模板。

```bash
hermes chat

> 根据我们产品的功能（用户注册、数据收集、第三方分析），
> 生成符合 GDPR 要求的隐私政策文档模板，
> 包含数据收集说明、用户权利、数据保留政策等关键条款
```

::: warning ⚠️ 重要提醒
AI 生成的合规文档仅供参考，必须经过法律专业人士审核后方可使用。Hermes 适合作为起草工具，而非最终合规方案。
:::

`多语言` `本地化` `GDPR` `i18n` `跨境合规`

### 🏭 工业互联网

设备监控 · 预测性维护 · 产线优化

**场景一：设备日志分析与故障诊断**

工业设备产生的日志量巨大，人工排查效率低。Hermes 可通过文件工具批量读取日志，结合模型能力进行智能诊断。

```bash
# 分析设备运行日志中的异常模式
hermes chat --model deepseek-flash

> 读取 logs/ 目录下最近 7 天的设备运行日志，
> 识别异常模式：
> 1. 温度超限事件
> 2. 振动频率异常
> 3. 通信超时
> 4. 能耗突变
> 输出异常报告到 reports/device-analysis.md
```

- **预测性维护** — 基于历史数据模式，预测设备故障窗口期
- **OPC UA 数据解读** — 解析 OPC UA 协议数据，生成可读的设备状态报告
- **产线效率分析** — 分析 OEE（设备综合效率）数据，识别瓶颈环节

**场景二：工业文档智能检索**

工业企业的设备手册、操作规程、维修记录通常分散在多个系统中。Hermes 的文件工具和记忆系统可用于构建智能文档助手。

```bash
# 加载预先准备的工业文档技能（名称仅为示例）
hermes --skills industrial-docs

> 检索 docs/manuals/ 中的设备手册，
> 查询："CNC 数控机床 X 轴报警 E07 的处理步骤是什么？"
> 仅将常用设备位置和排障经验通过 memory 工具保存到长期记忆。
```

::: tip 💡 部署建议
实时性或数据隔离要求较高时，可将 Hermes 部署在边缘节点，并根据硬件选择当前可用的本地 Qwen 等模型。模型能力与工具调用稳定性应通过实际任务验证。
:::

`设备监控` `预测性维护` `OPC UA` `OEE分析` `边缘部署`

## 常用命令速查

| 命令 | 说明 | 适用场景 |
| --- | --- | --- |
| `hermes` | 启动交互式会话 | 日常开发、问答 |
| `hermes chat --oneshot -q "问题"` | 单次查询模式 | 脚本集成、批量任务 |
| `hermes model` | 切换/查看模型 | 模型评估、任务适配 |
| `hermes skills list` | 查看已安装技能 | 能力管理 |
| `hermes tools` | 管理工具集 | 工具扩展 |
| `hermes config edit` | 编辑配置 | 环境配置 |
| `hermes doctor` | 检查安装状态 | 故障排查 |
| `hermes update` | 更新到最新版本 | 版本维护 |

## 进阶资源

- 📖 **官方文档**：完整的 API 参考、配置指南和架构说明 → [hermes-agent.nousresearch.com/docs](https://hermes-agent.nousresearch.com/docs/)
- 🔧 **GitHub 仓库**：源码、Issues、社区讨论和贡献指南 → [github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- 💬 **社区讨论**：与全球开发者交流最佳实践和用例 → [Discussions](https://github.com/NousResearch/hermes-agent/discussions)
