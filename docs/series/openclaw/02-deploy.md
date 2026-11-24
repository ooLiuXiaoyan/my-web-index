---
title: 02 · OpenClaw 部署指南
status: 已发布
source: openclaw-deploy.html
---

# OpenClaw 部署指南

<span class="badge badge-done">已发布</span>

> 📅 资料核对日期：2026-11-23。当前官方稳定版为 **2026.11.7**；版本和安装要求会持续变化，部署前请再次查看官方文档。

## Type 1：本地部署

- **个人电脑**：推荐使用官方安装脚本——macOS / Linux / WSL2 执行 `curl -fsSL https://openclaw.ai/install.sh | bash`；Windows PowerShell 执行 `iwr -useb https://openclaw.ai/install.ps1 | iex`
- **npm 安装**：已有 Node 环境时也可通过 npm 安装，当前要求 Node 24.16.0+（24.x）或 26.1.0+，推荐 Node 26；随后运行 `openclaw onboard --install-daemon` 完成初始化
- **Windows**：可优先使用原生 Windows Hub，也可选择 PowerShell CLI 或 WSL2 Gateway，不再局限于 WSL2
- **Docker 容器**：适合隔离或临时环境，状态目录、端口和启动方式以当前官方 Docker 文档为准
- **家庭服务器 / NAS**：可在受支持的内网环境中自托管，远程访问时应配置认证、TLS 和访问控制

**优点与代价**：数据和运行环境可控、内网延迟低，配合本地模型时可离线运行；代价是升级、备份、安全和故障恢复均由用户负责。使用云端模型时，对话上下文仍会发送给对应模型提供商。

### 部署记录与当前参考环境

平台部署记录：🍎 [macOS（飞书共享文档）](https://zcnbpdq25nk7.feishu.cn/wiki/YF4Jw78gsiNM8akXsJUcmPfdnZb) ｜ 🪟 Windows（记录见文末）｜ 🐧 Linux

::: details 📦 历史实测快照（保留原始环境，不作为当前推荐）
**配置组合 1（2026 年上半年）**

- 操作系统：macOS Monterey 12.7.6
- Node.js：22.16.0（低于当前 OpenClaw 安装要求）
- Model：gemini-2.5-flash、deepseek-chat（均已属于旧配置）
- Search Provider：kimi (moonshot)
- Channel：feishu

**配置组合 2（2026 年 3 月）**

- 操作系统：Windows 10
- OpenClaw：2026.3.x
- Model：kimi-k2.5（已于 2026-08-31 退役，迁移时可参考 kimi-k3.1-pro）
- Channel：Feishu / Lark
- Search Provider：kimi

**配置组合 3（2026 年 3 月）**

- 操作系统：Ubuntu 24
- OpenClaw：v2026.3.28
- Model：当时尚未完成配置
:::

**当前官方参考（非本站实测记录）**

- OpenClaw：v2026.11.7
- Node.js：24.16.0+（24.x）或 26.1.0+，推荐 Node 26
- 模型示例：kimi-k3.1-pro、deepseek-flash、gpt-6.2-sol；按实际提供商模型列表配置

## Type 2：云端部署

- **自托管云服务器或容器平台**：可选择 VPS、AWS ECS / Fargate、Azure Container Apps、Google Cloud Run 等，仍需负责 OpenClaw 配置与升级
- **托管服务**：由平台承担实例和接入配置，例如[飞书妙搭 OpenClaw](./03-feishu-deploy)（我们目前餐饮 AI 使用的平台），但应核对模型选择、额度和数据规则
- **通过认证入口开放访问**：按需配置 TLS、限流、日志和监控，避免直接暴露无认证的 Gateway

云端部署可减少本地维护并获得更好的在线能力，但会增加第三方依赖和可变成本。敏感数据应做好最小化发送、加密、访问控制与审计。

## 关键维度对比

| 维度 | 本地部署 | 云端部署 |
| --- | --- | --- |
| 数据控制 | 环境自主性高，取决于模型与工具去向 | 依赖云供应商及托管平台规则 |
| 部署速度 | 中等（需要环境配置） | 托管服务较快，自托管云端仍需配置 |
| 运维成本 | 自行承担升级、备份与安全维护 | 托管模式较低，自托管云端仍需运维 |
| 弹性伸缩 | 受本地硬件资源限制 | 取决于所选平台能力 |
| 可用性 | 取决于本地网络、电力与硬件 | 取决于平台 SLA 和自身配置 |

## 典型部署模式

- **本地部署**：个人助手、内网办公和需要控制运行环境的自动化工作流
- **云端自托管**：跨团队访问、长期在线任务和需要公网渠道接入的机器人
- **托管服务**：快速试用、低运维门槛的飞书集成，以及不希望自行维护服务器的团队

## 官方资料与共享记录

- [OpenClaw 官方安装文档](https://docs.openclaw.ai/install) · [Windows 部署](https://docs.openclaw.ai/platforms/windows) · [2026.11.7 发布说明](https://github.com/openclaw/openclaw/releases/tag/v2026.11.7)
- [Kimi 当前模型与弃用说明](https://platform.moonshot.ai/docs/models)
- macOS 部署记录：[飞书共享文档](https://zcnbpdq25nk7.feishu.cn/wiki/YF4Jw78gsiNM8akXsJUcmPfdnZb)
- Windows 部署记录：[飞书共享文档](https://zcnbpdq25nk7.feishu.cn/wiki/Kxzywr8AviScxXkexmBcQyHMn0e)
