---
title: 01 · 什么是 Harness
status: 已发布
---

# 什么是 Harness：Agent = Model + Harness

<span class="badge badge-done">已发布</span> <span class="badge badge-wip">持续更新</span>

2026 年的 Agent 圈出现了一个耐人寻味的现象：字节把 DeerFlow 2.0 定位成「Super Agent Harness」，DeepSeek 干脆把产品直接命名为 DeepSeek Harness，OpenAI 的 Codex、Anthropic 的 Claude Code 在文档里也越来越频繁地使用这个词。作为系列开篇，先把这个概念讲透——**Harness 到底是什么，为什么巨头们突然都在抢它？**

## 词源：马具的隐喻

Harness 的本义是**马具、挽具**——套在马身上的一整套装备：缰绳、鞍座、轭。它的作用不是让马跑得更快，而是**让马的力量变得可用、可控、可驾驭**：拉车、犁地、驮货，全看马具怎么设计。

引申到工程领域，harness 泛指「驾驭某种力量的外围装置」：

- **测试领域**早就用这个词：test harness（测试框架）——被测代码是那匹马，harness 提供输入、收集输出、控制环境
- 到了 Agent 时代，这个词被完美复用：**模型是那匹马，Harness 是让它在真实世界里干活的全套装备**

DeepSeek 的表述最干脆：

> **Agent = Model + Harness**

模型负责理解、推理、生成；Harness 负责其余一切——工具、会话、沙箱、上下文管理、反馈循环、执行边界。模型决定 Agent「能想出什么」，Harness 决定 Agent「能做成什么」。

## Harness 的组成件

拆开看，一个完整的 Harness 通常包含五层：

| 层 | 职责 | 典型实现 |
| --- | --- | --- |
| 模型适配 | 对接不同模型供应商，统一调用接口 | OpenAI 兼容协议、多模型路由 |
| 工具与技能 | 让模型能读写文件、跑命令、调接口 | 内置工具集、技能包、MCP |
| 会话与状态 | 管理上下文、记忆、任务进度 | 消息历史、事件日志、长期记忆 |
| 沙箱与权限 | 控制执行边界，隔离风险 | Docker 沙箱、审批节点、权限分级 |
| 编排与循环 | 驱动「感知-规划-执行-校验」循环 | Agent Loop、子代理编排 |

换个角度看本站的已有内容：[OpenClaw 实战](../openclaw/) 里的 Gateway、渠道、Agent 运行时，[Hermes 框架](../hermes/) 的组件体系，其实都是 Harness——只是 2026 年之前，大家还没有统一用这个词。

## 为什么 2026 年所有人都在抢 Harness

三个原因：

1. **模型能力趋同且「够用」了**。头部模型在多数任务上的差距，已经小于「同一模型配上好/差 Harness」的差距。DeepSeek 用自家 Harness 的 Minimal 模式跑基准测试，就是为了说明一个扎心的事实：**基准分数不仅反映模型权重，也反映测试时用的 Harness**。护城河从模型层上移到了运行时层。
2. **Harness 定义了 Agent 的能力边界**。同样的模型，接上文件系统就是编程助手，接上浏览器就是研究助手，接上 IM 就是办公助理（想想 [WorkBuddy](../desktop-ai/05-workbuddy) 对企业微信十项能力的调用）。模型是通用件，Harness 才是产品形态本身。
3. **战略路线分化**。OpenAI 和 Anthropic 走「向下整合」：用极致体验绑定自家模型；DeepSeek 走「横向铺开」：开源模型中立的 Harness 标准，争当基础设施；字节 DeerFlow 走「编排平台」：开源可私有部署的全栈运行时。抢 Harness，本质是抢「Agent 时代的操作系统层」。

## Harness 不能做什么

也要泼一盆冷水：**Harness 不会让模型变聪明**。它改变的是模型工作的环境——喂给模型什么上下文、允许它做什么动作、执行约束多严格。指望换个 Harness 就让弱模型变强，是缘木求鱼；反过来，强模型配上糟糕的 Harness（上下文塞爆、工具不给力、循环没校验），表现会大打折扣。

## 两条设计路线预告

本系列研究的两个主角，恰好代表 Harness 设计的两种哲学：

- **编排优先（DeerFlow 2.0）**：基于 LangGraph 的显式工作流，子代理编排、记忆、沙箱都是框架内置的一等公民——「给你一台装好系统的电脑」
- **插件优先（DeepSeek Harness）**：基于 Cordis 的「一切皆插件」，连 Agent Loop 本身都可替换，没有特权核心——「给你一套乐高和图纸」

哪种更好？没有标准答案，但有清晰的取舍逻辑——这正是第 04、05 篇要掰开揉碎的东西。

## 本系列接下来怎么写

- **第 02 篇**：DeerFlow 2.0 深度解析——字节的 Super Agent Harness 架构与上手
- **第 03 篇**：DeepSeek Harness 深度解析——Cordis 插件哲学与四种模式
- **第 04 篇**：两条路线之争——加上 OpenClaw、Hermes、Claude Code、Codex 画全景坐标系
- **第 05 篇**：Harness 设计的关键取舍——状态、沙箱、核心架构的工程哲学

**下一篇：《DeerFlow 2.0 深度解析：字节的长程 SuperAgent》**，正在撰写中。
