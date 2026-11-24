# 南仔的 AI 实验室

体系化的 AI 技术博客：把快速迭代的技术，沉淀成系列专栏。基于 **VitePress** 构建。

## 目录结构

```
docs/                        # VitePress 站点源码
├── index.md                 # 首页（hero + 系列专栏卡片）
├── changelog.md / about.md  # 更新日志 / 关于
├── .vitepress/
│   ├── config.mts           # 站点配置：导航、系列侧边栏、搜索、Mermaid
│   └── theme/custom.css     # 自定义主题（清爽 + 趣味）
└── series/                  # 系列专栏
    ├── openclaw/            # 🤖 OpenClaw 实战（3 篇）
    ├── hermes/              # 🧠 Hermes 框架（2 篇）
    ├── ai-vendors/          # 🌐 AI 厂商图谱（2 篇）
    ├── ai-concepts/         # 💡 AI 概念词典（1 篇）
    ├── mcp/                 # 🔌 MCP 协议（1 篇）
    └── architecture/        # 🏗️ 架构随笔（1 篇，Mermaid 架构图）

legacy/                      # 旧站静态页面归档（仅供参考，不再更新）
```

## 本地开发

```bash
npm install
npm run dev        # 开发预览（默认 5173 端口）
npm run build      # 构建到项目根 dist/
npm run preview    # 预览构建产物
```

## 写作工作流

1. 在对应 `docs/series/<系列>/` 下新建 `NN-标题.md`（NN 为序号）
2. 在 `docs/.vitepress/config.mts` 的 `sidebar` 中登记该篇
3. 在系列 `index.md` 的大纲卡片中更新状态徽章
4. 提交推送，CI 自动构建发布

## 部署

GitLab Pages（`.gitlab-ci.yml`）：Node 构建 VitePress，产物发布到 `public/`。
