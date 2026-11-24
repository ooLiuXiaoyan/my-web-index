---
title: 04 · 两条路线之争
status: 已发布
---

# 两条路线之争：编排优先 vs 插件优先

<span class="badge badge-done">已发布</span>

前两篇分别拆解了 DeerFlow 2.0 和 DeepSeek Harness。这篇把它们放到同一张桌子上正面对比，再把视野拉宽——拉入 OpenClaw、Hermes、Claude Code、Codex，画一张 Harness 全景坐标系。

## 正面对比：DeerFlow × DeepSeek Harness

| 维度 | DeerFlow 2.0 | DeepSeek Harness |
| --- | --- | --- |
| 一句话哲学 | 给你一台装好系统的电脑 | 给你一套乐高，图纸也是积木 |
| 架构基座 | LangGraph 显式编排 | Cordis 无特权核心 |
| 核心可替换性 | 运行时核心固定 | 连 Agent Loop 都是插件 |
| 扩展方式 | Markdown 技能包 + MCP | 全栈插件（模型/工具/会话/UI 皆可换） |
| 状态管理 | LangGraph state + 长期记忆 | 仅追加事件日志，天然支持恢复/分叉/回放 |
| 部署形态 | 微服务（3-4 进程），Docker 优先 | 单命令 `dsh web`，桌面/Web/CLI/SDK |
| 目标人群 | 要快速搭建生产级 Agent 的团队 | 要彻底掌控运行时的开发者/研究者 |
| 模型策略 | 多模型配置（config.yaml） | 模型中立，官方叙事刻意去绑定 |

一句话总结分歧：**DeerFlow 赌「大多数人要的是开箱即用」，DSH 赌「总有一群人要拆开发动机」**。两个赌注都成立——它们服务的是同一枚硬币的两面。

## 拉通坐标系：六款 Harness 全景

以「核心是否可替换」和「模型开放性」为轴：

| Harness | 核心架构 | 模型开放性 | 编排能力 | 生态策略 |
| --- | --- | --- | --- | --- |
| **DeerFlow** | LangGraph 固定核心 | 多模型 | 子代理编排最强 | 开源社区（MIT） |
| **DSH** | 无特权核心 | 模型中立 | 插件化工作流 | 开源 + 征集插件生态（MIT） |
| **OpenClaw** | Gateway 中枢 | 多模型 | 渠道 + 技能驱动 | 开源，技能包生态（联动 [OpenClaw 实战](../openclaw/)） |
| **Hermes** | 跨平台框架 | 多模型 | 场景化智能体 | 开源（联动 [Hermes 框架](../hermes/)） |
| **Claude Code** | 固定内置 Loop | 仅 Claude | skills/hooks/MCP/Agent SDK 扩展 | 闭源核心，体验绑定模型 |
| **Codex** | 固定核心（CLI 开源） | 仅 OpenAI | 文档化扩展点 | 云端 + 终端，绑定模型 |

可以看到清晰的阵营划分：

- **开放派**（DeerFlow / DSH / OpenClaw / Hermes）：模型可换、核心可动、生态共建
- **绑定派**（Claude Code / Codex）：模型即产品，Harness 是模型的延伸——体验极致，但你在哪个 Harness 里就用谁家的模型

有意思的是 WorkBuddy 式的「兼容打法」：直接兼容 OpenClaw 技能包（见 [WorkBuddy 深度体验](../desktop-ai/05-workbuddy)）——商业产品开始承认开源 Harness 生态的资产价值。

## 选型决策树

```
你的首要诉求是什么？
├─ 尽快让 Agent 稳定干活（研究/办公流水线）
│   ├─ 团队有部署运维能力 → DeerFlow 2.0
│   └─ 个人/小团队要省事 → WorkBuddy 等商业产品
├─ 彻底掌控/研究运行时本身
│   └─ DeepSeek Harness（Creator 模式就是为这准备的）
├─ 深度绑定某个模型生态
│   ├─ Claude 重度用户 → Claude Code
│   └─ OpenAI 生态 → Codex
└─ IM 渠道驱动的智能体（飞书/微信/Slack 机器人）
    └─ OpenClaw / DeerFlow（都内置 IM 渠道）
```

## 小结：没有银弹，只有取舍

编排优先赢在**确定性**：流程显式、行为可预测、团队接手成本低。插件优先赢在**自由度**：研究友好、任何组件可换、审计到每一行。

2026 年的现实是两条路线都在快速收敛对方的优点：DeerFlow 的技能系统和 MCP 支持在补「开放性」，DSH 的 preset 模式在补「开箱即用」。最终拼的不是架构纯度，而是**谁的默认配置能让 80% 的用户不碰底层就达成目标**。

**下一篇：《Harness 设计的关键取舍》**——往再深一层，聊架构背后的工程哲学。
