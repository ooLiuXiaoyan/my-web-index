---
title: 01 · 如何使用 OpenClaw
status: 已发布
source: how-to-use.html
---

# 如何使用 OpenClaw

<span class="badge badge-done">已发布</span> <span class="badge badge-wip">持续更新</span>

将代码 / 文档 / OpenClaw 等智能体框架应用到日常工作中，提升开发效率与团队协作。本文按场景组织：代码开发 → 运维 DevOps → 团队协作 → 语料库建设 → 业务应用 → 最佳实践 → 快速开始。

## 一、代码开发场景 💻

### 1.1 代码生成与补全

- 📝 **需求描述生成代码**：直接描述功能需求，OpenClaw 自动生成对应代码实现（见下方「临安系统日志生成」案例）
- 🔌 **API 接口编写**：输入接口定义，自动生成 Controller / Service / DAO 层代码
- 🧪 **单元测试生成**：基于现有代码自动生成测试用例，提升测试覆盖率
- 🗄️ **SQL 语句优化**：复杂查询优化建议，索引推荐

### 1.2 代码审查与重构

- 👀 **自动 Code Review**：提交 PR 前自动检查代码规范、潜在 Bug、安全漏洞 ✨（已在实施，见下方阿里 OCR 实战）
- 🔄 **重构建议**：识别代码坏味道，提供重构方案
- ⚡ **性能分析**：发现性能瓶颈，给出优化建议
- 📦 **依赖检查**：检测过时依赖，提示安全漏洞

::: details 🛡️ 实战案例：阿里 Open Code Review（OCR）——确定性工程 + LLM Agent 的代码审查框架
阿里巴巴内部用 AI 做 Code Review 两年后，于 2026 年 5 月将工具开源为 **Open Code Review**（命令 `ocr`，GitHub `alibaba/open-code-review`，Go + TypeScript，Apache-2.0）：内部服务过数万名开发者、识别数百万个代码缺陷，开源两周即破千 Star。

**为什么不用通用 Agent 直接审查**

用 Claude Code 加个 Skill 做 Review 的常见问题：大 diff 时 Agent「偷懒」漏审文件、报出的行号对不上、换个 prompt 写法质量就跳水。这不是模型不聪明，而是**纯语言驱动的架构缺少硬约束**。

**核心设计：确定性工程 × Agent 混合架构**

把「不能出错」的部分交给工程代码，把「需要判断力」的部分交给 LLM：

- **精准文件筛选**：哪些文件该审、哪些过滤（lock 文件、生成代码），由工程逻辑决定，不靠 LLM 判断，确保重要改动一个不漏
- **智能文件打包**：关联文件（如中英文 properties 文件）归并为一个审查单元，每个包作为独立 sub-agent 运行，上下文隔离、天然并发，超大变更集也稳定
- **精细化规则匹配**：Java 文件查 NPE 和线程安全、XML mapper 查 SQL 注入、前端文件查 XSS——按文件特征自动匹配规则模板
- **外挂定位与反思模块**：独立组件保证行号精确、对生成意见做二次校验，而不是 prompt 里的一句话

**三阶段审查流程**

1. **Plan**：变更超 50 行先做风险分析，小改动直接进主审查
2. **Main Task**：每个文件独立 goroutine 并发处理（默认 8 并发、单文件 10 分钟超时），LLM 多轮工具调用，直到调用 `task_done` 结束
3. **Memory Compression**：上下文超限时自动压缩，分冻结区 / 压缩区 / 活跃区

**内置规则与自定义**

内置覆盖国内团队最高频的坑：NPE、SQL 注入、XSS、线程安全、参数校验缺失、Mapper SQL 配置错误。规则按四层优先级解析：`--rule` 参数 > 项目级 `<repo>/.opencodereview/rule.json` > 全局 `~/.opencodereview/rule.json` > 系统内置，团队可沉淀自己的 Review 标准。

**快速上手**

```bash
# 安装
npm install -g @alibaba-group/open-code-review

# 配置模型（兼容 OpenAI / Anthropic，也兼容 Claude Code 环境变量）
ocr config set llm.url https://api.anthropic.com/v1/messages
ocr config set llm.auth_token your-api-key
ocr config set llm.model claude-opus-4-6
ocr config set llm.use_anthropic true
ocr llm test   # 测试连通性

# 日常使用
ocr review                          # 审查工作区变更
ocr review --from main --to feat    # 分支对比
ocr review --commit abc123          # 单个提交
ocr review --preview                # 预览审查范围，不调 LLM 零成本
ocr viewer                          # Web UI 翻审查历史
```

**与 Agent / CI 的集成**

- 装成 Skill：`npx skills add alibaba/open-code-review --skill open-code-review`，编码 Agent 学会调用 `ocr` 并按优先级分类修复
- Claude Code 插件：`/plugin marketplace add alibaba/open-code-review`，获得 `/open-code-review:review` 斜杠命令
- CI/CD：`ocr review --from origin/main --to origin/feature --format json --audience agent` 输出机器可读结果，官方提供 GitHub Actions / GitLab CI 示例

> 💡 **经验**：OCR 的思路——「确定性工程兜底稳定性，Agent 负责判断力」——与 OpenClaw 的技能体系可以组合使用：把 `ocr review` 封装为 OpenClaw 技能，在提交流水线中自动触发，是代码审查场景目前最稳的落地姿势。
:::

### 1.3 技术方案设计

- 🗂️ **架构设计辅助**：根据业务场景推荐合适的技术架构
- 🗃️ **数据库设计**：根据业务模型生成 ER 图、表结构设计
- 🔌 **API 设计规范**：RESTful / GraphQL 接口设计建议

::: details 🚀 实战案例：Claude Code + VS Code + CC Switch + Kimi API
打造智能代码开发一体化工作流（另有配套 [飞书部署文档](https://zcnbpdq25nk7.feishu.cn/wiki/E4mLwZhY3ioeg1kyd1ccU0J1nCe?from=from_copylink)）。

**第 1 步 · 安装 Claude Code 扩展**

在 VS Code 扩展商店搜索并安装官方 Claude Code 扩展，或按照 Anthropic 官方文档完成安装。

```
ext: anthropic.claude-code
```

**第 2 步 · 安装 CC Switch 桌面工具**

CC Switch 是跨平台桌面配置管理工具，用于集中维护 Claude Code、Codex、Kimi Code 等工具的供应商、模型、MCP 和技能配置，**不是**必须单独部署的 Docker 网关。从官方仓库 Releases 下载对应系统版本：[farion1231/cc-switch](https://github.com/farion1231/cc-switch/releases)。如确需本地代理或故障转移，再按官方代理服务文档单独开启。

**第 3 步 · 在 CC Switch 中配置 Kimi**

先在 Kimi 开放平台创建 API Key，再在 CC Switch 的 Claude Code 供应商配置中选择或新增 Kimi，填写官方提供的 Base URL、API Key 和当前可用模型。Claude Code 使用 Anthropic Messages 协议，不应配置为 OpenAI 的 `openai.baseUrl`。

截至 2026-11-23，新配置可优先选择 `kimi-k3.1-pro`；不要继续使用已退役的 `kimi-k2.5`。模型和接入地址以 [Kimi 官方模型列表](https://platform.moonshot.ai/docs/models) 为准。

**第 4 步 · 启用并验证**

在 CC Switch 中启用对应供应商，让其写入 Claude Code 配置；如未热切换，则完全重启 Claude Code。随后用一个只读小任务验证模型、工作目录和工具权限：

- 基于仓库上下文生成和修改代码
- 代码解释、审查与重构建议
- 生成并运行单元测试
- 按审批策略执行终端命令

> 💡 **效果**：在熟悉的 VS Code 环境中，用 Kimi 大模型能力实现代码补全、生成、审查的一体化工作流，大幅提升开发效率。
:::

::: details 💡 实战案例：临安系统日志生成（基于 AOP 的用户操作日志自动化）
从手动埋点到声明式日志，一行注解实现全链路审计。

**第 1 步 · 痛点分析**

传统日志记录需要在每个 Controller 方法中手动编写日志代码：

- 代码侵入性强，业务逻辑与日志逻辑耦合
- 容易遗漏，新增接口时经常忘记加日志
- 格式不统一，不同开发者的日志风格各异
- 维护成本高，修改日志字段需要全局调整

**第 2 步 · 方案设计**

采用 Spring AOP + 自定义注解实现声明式日志记录：

- `@UserLogAnnotation`：自定义注解，标记需要记录日志的方法
- `BusinessType` 枚举：统一业务类型（新增 / 修改 / 删除 / 登录等）
- `UserLogAspect` 切面：自动拦截、收集信息、保存日志
- `UserLog` 实体：标准化日志数据结构

**第 3 步 · 核心代码**

自定义注解定义：

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface UserLogAnnotation {
    String title() default "";
    BusinessType businessType() default BusinessType.OTHER;
}
```

AOP 切面核心逻辑：

```java
@Around("logPointCut()")
public Object doAround(ProceedingJoinPoint jp) {
    UserLogAnnotation ann = getAnnotation(jp);
    UserLog log = new UserLog();
    log.setTitle(ann.title());
    log.setBusinessType(ann.businessType().getDescription());
    log.setPerimeters(buildParametersString(jp.getArgs()));
    // ... 获取用户信息、请求方法
    try {
        Object result = jp.proceed();
        log.setIsSuccess("成功");
        return result;
    } catch (Exception e) {
        log.setIsSuccess("失败");
        throw e;
    } finally {
        userLogService.saveLog(log);
    }
}
```

Controller 中使用（只需一行注解）：

```java
@UserLogAnnotation(title = "新增字典", businessType = BusinessType.INSERT)
@PostMapping("/api/dict/add")
public ResponseEntity<?> addDict(@RequestBody DataDict dict) {
    dataDictService.insert(dict);
    return ResponseEntity.ok(BaseResponse.success("新增成功"));
}
```

**第 4 步 · 批量落地**

利用 OpenClaw 扫描所有 Controller，自动为写操作添加注解：

- 识别所有 POST / PUT / DELETE 映射方法
- 根据方法名智能推断 businessType（add → INSERT，update → UPDATE）
- 结合方法注释生成中文 title
- 批量生成并注入注解，保持原有代码风格

**第 5 步 · 效果验证**

```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "username": "admin",
  "title": "新增字典",
  "businessType": "新增",
  "requestMethod": "POST",
  "perimeters": "dictType=system, dictCode=status",
  "isSuccess": "成功",
  "createTime": "2026-04-08 10:30:00"
}
```

> 💡 **应用效果**：某政务系统接入后，3 天内完成 200+ 个接口的日志注解补全，操作日志覆盖率从 30% 提升至 100%，日志格式完全统一。后续新增接口只需添加一行注解即可自动接入审计体系。
:::

## 二、运维与 DevOps 场景 🔧

### 2.1 自动化运维

- 📜 **日志分析**：自动分析系统日志，定位异常根因
- 🚨 **故障排查**：根据告警信息提供排查步骤和解决方案
- ⚙️ **配置管理**：生成 Kubernetes / Docker 配置文件
- 📜 **脚本编写**：Shell / Python 自动化运维脚本生成

### 2.2 CI/CD 集成

- 📈 **流水线优化**：分析现有 CI/CD 流程，提供优化建议
- 📦 **发布管理**：辅助制定发布计划、回滚策略
- 📊 **监控告警**：生成 Prometheus / Grafana 监控配置

::: details 🤖 设想案例：智能运维助手
7×24 小时智能运维，让故障无处遁形。

1. **日志实时分析**：接入 ELK / ClickHouse 日志系统，AI 实时分析异常模式，自动关联相关日志。对接链路：`Filebeat → Logstash → Elasticsearch`
2. **告警智能降噪**：基于历史告警数据训练模型，自动合并重复告警，识别根因告警：
   - 告警聚类：相似告警自动合并
   - 优先级排序：业务影响评估
   - 值班通知：飞书 / 钉钉 / 短信
3. **故障诊断建议**：根据告警上下文自动生成排查步骤，推荐可能的原因和解决方案
4. **运维知识库**：沉淀历史故障案例，形成可检索的运维知识图谱

> 💡 **应用效果**：某电商公司部署后，MTTR（平均修复时间）从 45 分钟降至 12 分钟，告警噪音减少 70%，值班人员工作效率显著提升。
:::

::: details ⚡ 设想案例：无人值守自动响应系统
常见故障自动修复，真正实现无人值守。

1. **故障自动识别**：基于多维度监控数据（Metrics / Logs / Traces），AI 判断故障类型和影响范围。数据源：`Prometheus + Grafana Loki + Jaeger`
2. **预案匹配执行**：根据故障特征自动匹配修复预案，经人工确认（或完全自动）执行修复动作：
   - 服务重启：内存泄漏、连接池耗尽
   - 流量切换：单点故障自动降级
   - 配置回滚：配置变更导致的问题
   - 扩容触发：CPU / 内存使用率过高
3. **执行结果验证**：自动验证修复效果，如未恢复则升级告警、执行备选方案或通知人工介入
4. **复盘报告生成**：自动生成故障处理报告，包含时间线、根因分析、改进建议

> 💡 **典型场景**：夜间低峰期自动处理磁盘清理、日志轮转、服务健康检查等常规任务；高峰期自动扩容应对流量洪峰，故障发生 30 秒内完成自动切换，业务无感知。

> ⚠️ **安全提示**：生产环境自动操作需设置熔断机制，关键操作建议配置人工确认环节，避免误操作导致更大损失。
:::

## 三、团队协作场景 👥

### 3.1 知识管理

- 📄 **文档自动生成**：根据代码自动生成 API 文档、README
- 📋 **技术方案沉淀**：将讨论内容整理成结构化文档
- ❓ **FAQ 智能问答**：基于知识库回答团队成员技术问题

### 3.2 项目管理

- 📋 **需求分析**：协助梳理产品需求，拆解技术任务
- ⏱️ **工时估算**：基于历史数据辅助评估开发工时
- ⚠️ **风险预警**：识别项目进度风险，提前预警

### 3.3 跨平台集成（通过 Feishu / Lark）

- 🤖 **群聊助手**：在飞书群中直接 @机器人提问技术问题
- 📰 **日报生成**：自动汇总代码提交生成工作日报
- 📝 **会议辅助**：会议纪要自动生成、待办事项提取

## 四、大模型语料库建设 🗃️

### 4.1 语料库架构设计

- 🏗️ **分层架构**：原始层 → 清洗层 → 标注层 → 训练层，构建完整数据 Pipeline
- 📂 **分类体系**：按领域（金融 / 医疗 / 法律）、类型（问答 / 对话 / 文档）、语言（中 / 英 / 多语言）多维分类
- 🔄 **版本控制**：Git LFS 管理大文件，支持数据集版本回溯与差异对比
- 📊 **质量看板**：实时监控数据质量指标、标注进度、分布统计

### 4.2 数据采集与处理

- 🌐 **多源采集**：网页抓取、API 接口、PDF / Word 解析、数据库同步
- 🧹 **清洗 Pipeline**：去重、去噪、格式统一、编码转换、敏感信息过滤
- ✂️ **智能分块**：语义感知的文本切分，保持上下文连贯性
- 🏷️ **自动标注**：基于规则 + 模型预标注，提升标注效率 10 倍以上

### 4.3 数据质量保障

- ✅ **质量检测**：完整性、准确性、一致性、时效性多维度评估
- 👥 **人机协同**：模型初筛 + 人工复核 + 专家抽检三级质检
- 📈 **效果反馈**：训练效果反向评估数据质量，持续优化语料库
- 🔒 **安全合规**：版权检查、隐私脱敏、内容审核，确保合法合规

### 4.4 语料库应用场景

- 🤖 **预训练数据**：通用语料构建行业基座模型
- 🎯 **微调数据**：高质量指令数据实现领域适配
- 🔍 **RAG 知识库**：向量化语料支撑检索增强生成
- 📊 **评测基准**：标准化测试集评估模型能力

::: details 📖 案例：食安领域语料库建设实践
构建高质量食品安全行业专属语料，支撑业务场景模型。

1. **需求分析与规划**：明确语料库目标——支撑菜单分析、客服对话、食安检测等业务场景：
   - 菜单数据：菜品名称、配料、口味、价格区间
   - 对话数据：点餐场景、投诉处理、会员服务
   - 食安数据：检查标准、违规案例、整改措施
2. **数据采集与清洗**：多源采集餐饮相关数据，构建清洗 Pipeline。来源：公开菜单 + 合作商户 + 众包采集；清洗流程：去重 → 格式统一 → 敏感信息脱敏 → 质量评分
3. **智能标注与质检**：模型预标注 + 人工复核的混合模式：
   - 实体标注：菜品名、食材、口味、餐厅名
   - 意图标注：点餐、咨询、投诉、推荐
   - 质检抽检：10% 专家抽检 + 交叉验证
4. **语料库管理与应用**：建立语料版本管理，对接模型训练流程。规模：50 万+ 菜单条目 ｜ 10 万+ 对话样本

> 💡 **建设成果**：完成餐饮领域首个百万级语料库建设，菜单识别准确率从 72% 提升至 94%，客服意图理解准确率达 91%，成为餐饮从业者的食品安全顾问、市场监管部门的得力助手；并形成了一套完整的餐饮领域语料库建设方法论，为后续类似项目提供经验。
:::

## 五、业务场景应用 🏢

### 5.1 餐饮行业（当前主要应用）

- 📊 **菜单智能分析**：分析销售数据，推荐菜品优化方案
- 📦 **库存预警**：基于历史消耗预测库存需求
- 💬 **客服自动回复**：常见问题自动回答，人工客服兜底
- ✍️ **营销文案生成**：节日活动文案、朋友圈宣传语自动生成 ✨
- 📷 **食品安全**：后厨拍照自动进行食安分析；摄像头定期采集食安异常数据；整治报告 ✨
- ⚖️ **法律顾问**：智能法律咨询与文书生成 ✨

### 5.2 数据分析场景

- 🧹 **数据清洗**：自动生成数据清洗脚本
- 📊 **报表生成**：自然语言描述需求，自动生成数据报表 ✨
- 📉 **可视化建议**：推荐合适的图表类型展示数据

### 5.3 高质量数据集建设

- 🔍 **数据质量检测**：自动识别脏数据、缺失值、异常值，提供清洗建议
- 🏷️ **智能标注辅助**：利用模型预标注，降低人工标注成本，提升标注一致性
- 📚 **数据增强生成**：基于现有样本生成多样化训练数据，扩充数据集规模
- ⚖️ **样本均衡优化**：检测类别不平衡问题，生成少数类样本或采样策略建议
- 🔐 **隐私脱敏处理**：自动识别敏感信息（手机号、身份证等），进行脱敏或合成数据替换
- 📋 **标注规范制定**：协助制定标注指南、验收标准，提升数据标注质量
- 🔄 **数据版本管理**：数据集迭代版本控制，追踪数据变更与模型效果关联

## 六、最佳实践建议 ⭐

| 场景 | 推荐用法 | 注意事项 |
| --- | --- | --- |
| 日常编码 | 代码生成 + 自动审查 | 生成代码需人工复核 |
| 故障处理 | 日志分析 + 方案推荐 | 生产环境操作需谨慎 |
| 团队协作 | 飞书集成 + 知识库 | 敏感信息脱敏处理 |
| 方案设计 | 架构建议 + 方案对比 | 结合团队实际情况决策 |

## 七、快速开始 🚀

1. 📱 **选择 Channel**：根据团队习惯选择 Web 端、飞书或 Slack 集成
2. 🧠 **配置 Model**：根据任务、成本和数据要求选择当前可用模型；开发场景可评估 Claude Sonnet 5.5、GPT-6.2 Sol、Kimi K3.1 Pro 等，具体以提供商模型列表为准
3. 🎯 **设置 Skills**：启用需要的技能（代码生成、代码审查等）
4. 🔍 **接入 Search**：配置搜索提供方，增强知识检索能力
5. ✨ **开始使用**：直接描述需求，与 OpenClaw 对话协作

::: tip 💡 提示
建议从小场景开始试用，逐步扩展到更多工作流中。
:::
