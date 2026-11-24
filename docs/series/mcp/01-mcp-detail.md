---
title: 01 · MCP 详解
status: 已发布
source: mcp-detail.html
---

# MCP 深度解读

<span class="badge badge-done">已发布</span>

Model Context Protocol —— 让 AI 应用拥有「手和眼」的统一协议。

## 📖 什么是 MCP？

MCP（Model Context Protocol，模型上下文协议）是一个**开源通信标准**，定义了 AI 应用（如 Claude、ChatGPT）如何与外部数据源和工具进行交互。

类比理解：如果大模型是「大脑」，MCP 就是让大脑连接「眼睛」（读取数据）、「手」（执行操作）和「记忆」（访问知识库）的**标准化神经系统**。

在 MCP 出现之前，每个 AI 应用需要为每个外部服务单独编写集成代码（N×M 问题）。MCP 将这个问题简化为 **N+M**：开发者只需为每个 AI 应用写一个 MCP 客户端，为每个服务写一个 MCP Server，即可实现全面互通。

## 🏗️ 核心架构

```text
                ┌─────────────────────────────────┐
                │            MCP Host             │
                │  AI 应用（Claude / ChatGPT / Cursor）│
                └───────────────┬─────────────────┘
                        ↓ 管理多个 ↓
        ┌───────────────┬───────────────┬───────────────┐
        │  MCP Client 1 │  MCP Client 2 │  MCP Client 3 │
        │  维护专用连接  │  维护专用连接  │  维护专用连接  │
        └───────┬───────┴───────┬───────┴───────┬───────┘
                ↕ JSON-RPC 2.0 ↕
        ┌───────────────┬───────────────┬───────────────┐
        │    Server A   │    Server B   │    Server C   │
        │  文件系统(本地) │ 数据库(本地/远程)│ Sentry/GitHub │
        └───────────────┴───────────────┴───────────────┘
```

| 角色 | 说明 | 示例 |
| --- | --- | --- |
| **MCP Host** | 协调和管理多个 Client 的 AI 应用 | Claude Desktop、ChatGPT、VS Code |
| **MCP Client** | 与单个 Server 维持连接的组件 | Host 内部自动实例化的连接管理器 |
| **MCP Server** | 暴露工具 / 资源 / 提示词的程序 | 文件系统 Server、GitHub Server、数据库 Server |

## 📡 传输层：两种通信模式

**💻 STDIO 传输**：通过标准输入 / 输出流进行进程间通信，零网络开销，适合**本地 MCP Server**。

- 同机通信，延迟极低
- Server 作为子进程启动
- 适合文件系统、本地数据库等场景

**🌐 Streamable HTTP**：基于 HTTP POST + SSE 的远程通信，支持标准认证，适合**远程 MCP Server**。

- 支持 OAuth / Bearer Token / API Key
- 一个 Server 可服务多个 Client
- 适合云端 API、SaaS 集成等场景

## 🧩 三大核心原语

**🔧 Tools（工具）**：AI 可主动调用的可执行函数，**模型决定何时使用**。

- 文件读写、API 调用、数据库查询
- 搜索航班、发送消息、创建日程
- 通过 JSON Schema 定义输入参数
- 支持用户审批机制确保安全

**📚 Resources（资源）**：被动数据源，提供只读上下文信息，**应用决定如何使用**。

- 文件内容、数据库 Schema、API 文档
- 支持固定 URI 和动态模板两种模式
- 可通过 URI 模板参数化查询，如 `calendar://events/2024`

**📝 Prompts（提示词模板）**：预构建的交互模板，**用户主动选择使用**。

- 结构化的任务引导模板，支持参数化输入
- 如：「规划旅行」「总结会议」「起草邮件」
- 可通过斜杠命令触发（`/plan-vacation`）

## ⚡ 工作流程

1. **初始化握手** — Client 与 Server 交换能力声明，协商协议版本
2. **能力发现** — Client 调用 `tools/list`、`resources/list` 发现可用原语
3. **执行操作** — LLM 根据对话上下文决定调用哪个工具，Client 转发请求
4. **结果返回** — Server 执行完毕，结果作为上下文注入 LLM 对话流
5. **实时通知** — Server 可主动推送变更通知（如工具列表更新），Client 按需刷新

## 🎯 典型使用场景

- 📁 **文件系统访问** — AI 读取 / 写入本地文件，进行代码分析、文档处理，无需手动复制粘贴内容
- 🗄️ **数据库查询** — AI 直接查询 SQL / NoSQL 数据库，生成报表、分析数据趋势，支持自然语言转 SQL
- 🌐 **API 集成** — AI 调用第三方服务（GitHub、Slack、Jira、日历），自动完成跨平台协作任务
- 🔍 **网页抓取与搜索** — AI 获取实时网页内容、执行搜索引擎查询，突破训练数据的时间限制
- 🧠 **持久化记忆** — 通过知识图谱 MCP Server 实现跨会话记忆，AI 不再「健忘」
- 🔒 **企业安全集成** — AI 接入 Sentry 监控错误、连接内部系统，同时通过权限控制确保数据安全

## 🌍 生态系统支持

MCP 已获得广泛行业支持，「一次构建，处处集成」：

`Anthropic Claude` `OpenAI ChatGPT` `VS Code Copilot` `Cursor` `Windsurf` `Zed` `Sourcegraph` `Replit` `MCPJam` `Cline` `Continue` `Amazon Bedrock` `Google Vertex AI`

## 🚀 快速上手

在 Claude Desktop 中配置一个 MCP Server（以文件系统为例）：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/files"
      ]
    }
  }
}
```

支持的 Server 启动方式：

```bash
# TypeScript Server（通过 npx）
npx -y @modelcontextprotocol/server-memory

# Python Server（通过 uvx）
uvx mcp-server-git

# Python Server（通过 pip）
pip install mcp-server-git
python -m mcp_server_git
```

## 📊 MCP vs 传统集成方式

| 维度 | 传统方式（N×M 集成） | MCP（N+M 集成） |
| --- | --- | --- |
| 集成复杂度 | 每个 AI × 每个服务都需要单独适配 | AI 只需实现 Client，服务只需实现 Server |
| 可复用性 | 集成代码绑死特定 AI 应用 | Server 可被任意 MCP Client 调用 |
| 协议标准化 | 各自定义接口，无统一规范 | 统一 JSON-RPC 2.0 协议 |
| 发现机制 | 硬编码能力，无法动态发现 | 运行时动态发现工具 / 资源 / 提示词 |
| 安全模型 | 各平台自行实现权限控制 | 内置用户审批、权限协商机制 |
