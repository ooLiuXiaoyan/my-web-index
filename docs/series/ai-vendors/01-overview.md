---
title: 01 · AI 厂商全景
status: 已发布
source: ai-vendors.html
---

# AI 厂商全景

<span class="badge badge-done">已发布</span> <span class="badge badge-wip">持续更新</span>

本页整理主流 AI 厂商的模型、应用与基础设施产品。资料核对日期：**2026-11-23**。型号、可用性和商业化规则变化较快，请点击各条目官方链接复核；公司股权与估值不作为本页持续跟踪指标。

## 🌍 国际厂商

### OpenAI `美国`

GPT 系列和 ChatGPT 的开发者，产品覆盖通用助手、编程 Agent、多模态生成与企业 API。

🏛️ **公司**：私人公司 · 2026-06-08 官方确认已秘密提交 S-1 草案，后续时间未定

`GPT-6.2 Astra` `GPT-6.2 Sol` `GPT-6.1 Terra` `ChatGPT` `Codex` `Sora` `Apps SDK`

- GPT-6.2 Astra 面向高复杂度任务，Sol 面向日常编码与 Agent 工作流
- Codex 支持异步软件工程任务
- 模型可用性、退役计划与价格以官方平台文档为准

→ [官方模型文档](https://platform.openai.com/docs/models)

### Google / DeepMind `美国`

覆盖 Gemini 4、开放 Gemma 模型、世界模型、机器人和 Agent 开发平台的全栈 AI 体系。

🏛️ **公司**：Alphabet 旗下 · 2023 年 DeepMind 与 Google Brain 合并

`Gemini 4` `Gemini Omni` `Gemma 4` `Nano Banana 2` `Lyria 3` `Genie 4` `Gemini Robotics`

- Gemini 4 Neon、Hydrogen、Carbon、Argon 构成当前模型系列
- Gemini Omni 面向多模态理解与视频创作
- Genie 4 用于可交互世界模拟，Antigravity 面向 Agent-first 开发

→ [官方模型页](https://deepmind.google/models/) ｜ 📖 [展开讲讲：Google 产品图谱](./02-google)

### Anthropic `美国`

以 AI 安全和 Claude 模型为核心，覆盖推理、长周期 Agent、编程和知识工作场景。

🏛️ **公司**：私人公司 · Dario 与 Daniela Amodei 联合创立 · Amazon、Google 为战略投资方

`Claude Fable 5.2` `Claude Opus 5.5` `Claude Sonnet 5.5` `Claude Haiku 5.5` `Claude Code` `Claude Cowork` `Claude for Chrome`

- Opus 5.5 面向长周期编程与知识工作，Fable 5.2 面向高要求推理和 Agent 任务
- Sonnet 5.5 平衡速度与能力，Haiku 5.5 面向高吞吐低延迟任务
- Claude Code 与 Cowork 覆盖开发者和通用工作场景

→ [官方模型文档](https://docs.anthropic.com/en/docs/about-claude/models)

### Microsoft `美国`

通过 Copilot、Azure AI 和 GitHub 将模型能力整合进办公、操作系统、开发与云基础设施。

🏛️ **公司**：NASDAQ 上市公司（MSFT）

`Copilot` `Azure AI` `Azure OpenAI` `GitHub Copilot` `Microsoft 365 Copilot`

- Microsoft 365、Windows 与 GitHub 的 AI 产品集成
- Azure 提供企业级模型、数据与 AI 基础设施
- 同时发展自有模型和多方模型生态

→ [访问官网](https://www.microsoft.com/ai)

### Meta (Facebook) `美国`

以 Llama 开放模型生态、Meta AI 消费产品和 PyTorch 等基础设施为主要代表。

🏛️ **公司**：NASDAQ 上市公司（META）

`Llama 4 Scout / Maverick` `Meta AI` `PyTorch` `Segment Anything 2`

- Llama 4 Scout 与 Maverick 提供原生多模态开放权重模型
- Meta AI 集成到 Facebook、Instagram、WhatsApp 等产品
- 开放模型与托管模型的产品路线应分别核对，不再笼统概括为单一「开源路线」

→ [访问官网](https://ai.meta.com)

### NVIDIA `美国`

提供从 GPU、网络与系统到 CUDA、推理服务和物理 AI 平台的完整计算栈。

🏛️ **公司**：NASDAQ 上市公司（NVDA）

`Rubin` `Blackwell` `Nemotron` `CUDA` `Dynamo` `Cosmos` `NIM`

- Blackwell 于 2024 年发布；Rubin 平台于 2026 年公布并进入量产阶段
- Nemotron 覆盖推理、编码和多模态模型
- Cosmos 面向物理 AI 与世界模型，Dynamo 面向分布式推理

→ [Rubin 官方说明](https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer)

### xAI `美国`

Grok 模型与 X 平台深度整合，同时提供开发者 API、编程工具和自有算力基础设施。

🏛️ **公司**：非上市体系 · 公司结构与投资信息以官方披露为准

`Grok 4.7` `Grok Build` `Colossus` `X Premium`

- Grok 4.7 为本次核对时的当前 API 模型，后续以 xAI 官方模型页为准
- 与 X 平台信息及工具生态集成
- 模型行为、内容过滤和上下文能力应按具体版本评估

→ [官方模型文档](https://docs.x.ai/docs/models)

### Mistral AI `法国`

欧洲 AI 公司，产品覆盖开放权重与商业模型、Vibe Agent、开发者平台和模型定制。

🏛️ **公司**：私人公司 · Arthur Mensch 等联合创立

`Mistral Large 4` `Mistral Small 4` `Vibe` `Vibe for Code` `Studio` `Forge`

- Mistral Large 4 为当前大型模型，Small 4 面向较高效的多模态与 Agent 场景
- Vibe 支持编码、企业知识检索和多步骤任务
- Studio 与 Forge 分别覆盖 Agent 开发和模型定制工作流

→ [访问官网](https://mistral.ai)

## 🇨🇳 国内厂商

### 百度

布局文心大模型、飞桨、千帆平台和 Apollo，覆盖模型、开发框架、云服务与自动驾驶。

🏛️ **公司**：NASDAQ / 港交所上市（BIDU / 9888）

`文心大模型` `文心一言` `飞桨 PaddlePaddle` `百度智能云千帆` `Apollo`

- 从深度学习框架到模型和应用的全栈布局
- 千帆面向企业模型开发、部署与管理
- 具体模型版本以文心和千帆官方文档为准

→ [访问官网](https://yiyan.baidu.com)

### 阿里巴巴

以 Qwen 模型体系、阿里云百炼、通义应用和魔搭社区构成模型与开发生态。

🏛️ **公司**：NYSE / 港交所上市（BABA / 9988）

`Qwen` `Qwen Code` `通义万相` `通义灵码` `钉钉 AI` `魔搭社区`

- Qwen 覆盖通用、多模态、编码和开放权重模型
- Qwen Code 与通义灵码面向不同开发工作流
- 百炼提供企业模型服务，具体型号以平台列表为准

→ [Qwen 官方页面](https://qwenlm.github.io/)

### 字节跳动

围绕豆包、火山引擎、扣子和内容创作工具构建消费与企业 AI 产品体系。

🏛️ **公司**：未上市私人公司 · 股权信息以公司正式披露为准

`豆包` `豆包大模型` `火山方舟` `Coze / 扣子` `即梦 AI` `剪映 AI`

- 豆包面向消费端，火山方舟面向企业模型服务
- 扣子降低 Agent 与工作流应用搭建门槛
- 图像、视频和办公创作工具持续集成 AI 能力

→ [访问官网](https://www.doubao.com)

### 腾讯

以混元模型、腾讯元宝和腾讯云 AI 服务连接社交、内容、办公与产业场景。

🏛️ **公司**：港交所上市（0700.HK）

`腾讯元宝` `混元大模型` `腾讯文档 AI` `腾讯云 TI 平台`

- 混元覆盖文本与多模态模型能力
- 元宝连接消费端助手与腾讯内容生态
- 腾讯云提供企业模型开发与应用服务

→ [访问官网](https://yuanbao.tencent.com)

### 华为

形成昇腾、MindSpore、ModelArts、盘古大模型与终端小艺的软硬件协同体系。

🏛️ **公司**：员工持股的私人公司 · 具体治理结构以华为年报为准

`盘古大模型` `昇腾` `MindSpore` `ModelArts` `鸿蒙小艺`

- 覆盖 AI 芯片、框架、开发平台和行业模型
- 盘古面向气象、矿山、制造等行业场景
- 昇腾与 ModelArts 支撑模型训练和部署

→ [访问官网](https://www.huaweicloud.com/product/pangu.html)

### 月之暗面 (Moonshot AI)

Kimi 当前旗舰为 K3.1 Pro，面向长周期编码、知识工作、深度推理和 Agent 场景。

🏛️ **公司**：私人公司 · 杨植麟联合创立 · 投资与股权信息以正式披露为准

`Kimi K3.1 Pro` `Kimi K3` `Kimi Code` `Kimi Claw` `Kimi API`

- K3.1 Pro 提供原生视觉理解和 1M token 上下文
- Kimi Code 支持终端、IDE 和后台开发工作流
- K2.5 已退役，K2.6 等旧型号进入弃用阶段，新项目应按官方列表迁移

→ [官方模型文档](https://platform.moonshot.ai/docs/models)

### DeepSeek

幻方量化孵化的 AI 公司，当前模型体系包括 V4.1 Flash 和 V4 Pro，并提供应用与开发者 API。

🏛️ **公司**：私人公司 · 梁文锋创立 · 由幻方量化孵化

`DeepSeek-V4.1-Flash` `DeepSeek-V4-Pro` `DeepSeek-R1` `DeepSeek Search` `DeepSeek API`

- API 使用 deepseek-flash 调用当前 V4.1 Flash，V4 Pro 使用 deepseek-v4-pro
- V4.1 Flash 支持原生多模态，应用 API 增加搜索、文件和 URL 能力
- 开放权重与许可范围按具体模型仓库核对，不再统一表述为「完全开源」

→ [官方更新日志](https://api-docs.deepseek.com/updates)

### 智谱AI

源自清华大学 KEG 实验室，当前 GLM-5.3 面向复杂软件工程和长周期 Agent 任务。

🏛️ **公司**：公司属性、融资与股权信息以官方及交易所披露为准

`GLM-5.3` `GLM-5.2` `ChatGLM` `智谱清言` `CodeGeeX` `AutoGLM`

- GLM-5.3 支持 1M token 上下文、工具调用和多级推理强度
- CodeGeeX 面向编程辅助，AutoGLM 面向设备与任务自动化
- 迁移旧模型时应同步检查 thinking 和 reasoning_effort 参数

→ [GLM-5.3 官方文档](https://docs.z.ai/guides/llm/glm-5.3)

### 百川智能

由王小川创立，当前重点包括 Baichuan-M3 系列、医疗模型和企业 API 服务。

🏛️ **公司**：私人公司 · 融资与估值以公司正式披露为准

`Baichuan-M3-Plus` `Baichuan-Med` `Baichuan API`

- Baichuan-M3-Plus 为当前 API 文档列出的模型之一
- 医疗大模型是其重点行业方向
- 模型上下文、价格和可用范围以官方平台为准

→ [官方模型与价格](https://platform.baichuan-ai.com/prices)

### 商汤科技

从计算机视觉扩展至日日新多模态模型、SenseCore 算力基础设施和行业应用。

🏛️ **公司**：港交所上市（0020.HK）

`日日新 SenseNova` `商量 SenseChat` `秒画` `SenseCore`

- 覆盖视觉、多模态模型和生成式应用
- SenseCore 提供 AI 算力与平台能力
- 行业覆盖城市、汽车、医疗等场景

→ [访问官网](https://www.sensetime.com)

### 科大讯飞

以语音技术和讯飞星火模型为基础，深耕教育、办公、医疗与智能硬件。

🏛️ **公司**：深交所上市（002230.SZ）

`讯飞星火` `讯飞听见` `讯飞输入法` `智医助理`

- 覆盖语音识别、合成、翻译和多模态交互
- 星火模型用于教育、办公和行业应用
- 学习机、翻译机等硬件与软件服务协同

→ [访问官网](https://xinghuo.xfyun.cn)

---

> 📅 最后核对：2026 年 11 月 23 日 · GitHub Actions 每 3 天自动创建人工更新提醒，不会自动修改内容
