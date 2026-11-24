# 🧩 Agent Harness 研究

「Agent = Model + Harness」——当模型能力逐渐趋同，竞争焦点转向模型外面那层运行时。本系列以字节 DeerFlow 2.0 和 DeepSeek Harness 为切入点，研究智能体运行时的两条设计路线：编排优先 vs 插件优先。

## 📚 系列大纲

<div class="series-toc">
<a class="toc-card" href="./01-what-is-harness">
  <div class="toc-order">第 01 篇 · <span class="badge badge-done">已发布</span></div>
  <div class="toc-title">什么是 Harness</div>
  <div class="toc-desc">从词源到行业共识：为什么 2026 年 OpenAI、Anthropic、字节、DeepSeek 都在抢「模型外面那层壳」。</div>
</a>
<a class="toc-card" href="./02-deerflow">
  <div class="toc-order">第 02 篇 · <span class="badge badge-done">已发布</span></div>
  <div class="toc-title">DeerFlow 2.0 深度解析</div>
  <div class="toc-desc">字节路线：LangGraph 编排、子代理并行、沙箱执行、长期记忆、技能系统，含部署上手。</div>
</a>
<a class="toc-card" href="./03-deepseek-harness">
  <div class="toc-order">第 03 篇 · <span class="badge badge-done">已发布</span></div>
  <div class="toc-title">DeepSeek Harness 深度解析</div>
  <div class="toc-desc">DeepSeek 路线：Cordis 一切皆插件、时空可组合性、四种模式、事件日志与 Trajectory，含安装上手。</div>
</a>
<a class="toc-card" href="./04-two-philosophies">
  <div class="toc-order">第 04 篇 · <span class="badge badge-done">已发布</span></div>
  <div class="toc-title">两条路线之争</div>
  <div class="toc-desc">DeerFlow × DeepSeek Harness 正面对比，拉入 OpenClaw、Hermes、Claude Code、Codex 画 Harness 全景坐标系。</div>
</a>
<a class="toc-card" href="./05-design-tradeoffs">
  <div class="toc-order">第 05 篇 · <span class="badge badge-done">已发布</span></div>
  <div class="toc-title">Harness 设计的关键取舍</div>
  <div class="toc-desc">状态管理、沙箱与审批、固定核心 vs 无特权核心——藏在架构背后的工程哲学。</div>
</a>
</div>

> ✅ 本系列 5 篇于 2026-11-24 全部首发完成。第 02、03 篇涉及具体产品细节，将随版本迭代定期刷新。
