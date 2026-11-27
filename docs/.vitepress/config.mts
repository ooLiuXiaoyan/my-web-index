import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// 系列专栏注册表：新增系列时在这里补充导航与侧边栏
const seriesNav = [
  { text: '🤖 OpenClaw 实战', link: '/series/openclaw/' },
  { text: '🧠 Hermes 框架', link: '/series/hermes/' },
  { text: '🌐 AI 厂商图谱', link: '/series/ai-vendors/' },
  { text: '💡 AI 概念词典', link: '/series/ai-concepts/' },
  { text: '🔌 MCP 协议', link: '/series/mcp/' },
  { text: '🏗️ 架构随笔', link: '/series/architecture/' },
  { text: '🖥️ AI 桌面办公助手', link: '/series/desktop-ai/' },
  { text: '🧩 Agent Harness 研究', link: '/series/agent-harness/' },
  { text: '📚 AI 知识库实战', link: '/series/knowledge-base/' },
]

export default withMermaid(defineConfig({
  title: '南仔的 AI 实验室',
  description: '把快速迭代的 AI 技术，沉淀成体系化的系列专栏',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  // 输出到项目根 dist/（根目录 .gitignore 已覆盖），避免 .vitepress 内残留损坏目录
  outDir: '../dist',

  // dev 模式下 fastdom（mermaid 间接依赖，CJS）需要强制预打包，
  // 否则浏览器报 "does not provide an export named 'default'"
  vite: {
    optimizeDeps: {
      include: ['mermaid', 'fastdom'],
    },
  },

  head: [
    ['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧪</text></svg>' }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '系列专栏', items: seriesNav },
      { text: '更新日志', link: '/changelog' },
      { text: '关于', link: '/about' },
    ],

    sidebar: {
      '/series/openclaw/': [
        {
          text: '🤖 OpenClaw 实战',
          items: [
            { text: '系列导览', link: '/series/openclaw/' },
            { text: '01 · 如何使用 OpenClaw', link: '/series/openclaw/01-how-to-use' },
            { text: '02 · 部署指南', link: '/series/openclaw/02-deploy' },
            { text: '03 · 飞书妙搭部署', link: '/series/openclaw/03-feishu-deploy' },
          ],
        },
      ],
      '/series/hermes/': [
        {
          text: '🧠 Hermes 框架',
          items: [
            { text: '系列导览', link: '/series/hermes/' },
            { text: '01 · 安装指南', link: '/series/hermes/01-install' },
            { text: '02 · 使用指南', link: '/series/hermes/02-usage' },
          ],
        },
      ],
      '/series/ai-vendors/': [
        {
          text: '🌐 AI 厂商图谱',
          items: [
            { text: '系列导览', link: '/series/ai-vendors/' },
            { text: '01 · 厂商全景', link: '/series/ai-vendors/01-overview' },
            { text: '02 · Google 产品图谱', link: '/series/ai-vendors/02-google' },
          ],
        },
      ],
      '/series/ai-concepts/': [
        {
          text: '💡 AI 概念词典',
          items: [
            { text: '系列导览', link: '/series/ai-concepts/' },
            { text: '01 · 新概念速览', link: '/series/ai-concepts/01-terms' },
          ],
        },
      ],
      '/series/mcp/': [
        {
          text: '🔌 MCP 协议',
          items: [
            { text: '系列导览', link: '/series/mcp/' },
            { text: '01 · MCP 详解', link: '/series/mcp/01-mcp-detail' },
          ],
        },
      ],
      '/series/architecture/': [
        {
          text: '🏗️ 架构随笔',
          items: [
            { text: '系列导览', link: '/series/architecture/' },
            { text: '01 · 智能体基础设施架构', link: '/series/architecture/01-infrastructure' },
          ],
        },
      ],
      '/series/desktop-ai/': [
        {
          text: '🖥️ AI 桌面办公助手',
          items: [
            { text: '系列导览', link: '/series/desktop-ai/' },
            { text: '01 · 从聊天框到桌面 Agent', link: '/series/desktop-ai/01-from-chat-to-agent' },
            { text: '02 · 主流产品全景横评', link: '/series/desktop-ai/02-landscape' },
            { text: '03 · 核心能力拆解', link: '/series/desktop-ai/03-capabilities' },
            { text: '04 · 同一任务实测', link: '/series/desktop-ai/04-hands-on-test' },
            { text: '05 · WorkBuddy 深度体验', link: '/series/desktop-ai/05-workbuddy' },
            { text: '06 · Computer Use 原理', link: '/series/desktop-ai/06-computer-use' },
            { text: '07 · 安全与隐私边界', link: '/series/desktop-ai/07-security-privacy' },
            { text: '08 · 搭建自己的桌面工作流', link: '/series/desktop-ai/08-diy-workflow' },
          ],
        },
      ],
      '/series/agent-harness/': [
        {
          text: '🧩 Agent Harness 研究',
          items: [
            { text: '系列导览', link: '/series/agent-harness/' },
            { text: '01 · 什么是 Harness', link: '/series/agent-harness/01-what-is-harness' },
            { text: '02 · DeerFlow 2.0 深度解析', link: '/series/agent-harness/02-deerflow' },
            { text: '03 · DeepSeek Harness 深度解析', link: '/series/agent-harness/03-deepseek-harness' },
            { text: '04 · 两条路线之争', link: '/series/agent-harness/04-two-philosophies' },
            { text: '05 · Harness 设计的关键取舍', link: '/series/agent-harness/05-design-tradeoffs' },
          ],
        },
      ],
      '/series/knowledge-base/': [
        {
          text: '📚 AI 知识库实战',
          items: [
            { text: '系列导览', link: '/series/knowledge-base/' },
            { text: '01 · 从存起来到用起来', link: '/series/knowledge-base/01-from-storage-to-execution' },
            { text: '02 · 我的知识库实战手记', link: '/series/knowledge-base/02-my-practice' },
            { text: '03 · ima 深度', link: '/series/knowledge-base/03-ima' },
            { text: '04 · Dify 深度', link: '/series/knowledge-base/04-dify' },
            { text: '05 · Coze 深度', link: '/series/knowledge-base/05-coze' },
            { text: '06 · 横评与选型', link: '/series/knowledge-base/06-landscape' },
            { text: '07 · 知识库质量工程', link: '/series/knowledge-base/07-quality-engineering' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '重置搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到结果',
            footer: { selectText: '选择', selectKeyAriaLabel: '输入', navigateText: '导航', navigateUpKeyAriaLabel: '上箭头', navigateDownKeyAriaLabel: '下箭头', closeText: '关闭', closeKeyAriaLabel: 'Esc' },
          },
        },
      },
    },

    outline: { level: [2, 3], label: '本页目录' },
    lastUpdated: { text: '最后更新' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '外观',

    editLink: {
      pattern: 'https://github.com/ooLiuXiaoyan/my-web-index/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ooLiuXiaoyan/my-web-index' },
    ],

    footer: {
      message: '基于 VitePress 构建 · 内容持续迭代中',
      copyright: '© 2024-2026 南仔 · aigo.qizhentech.cn',
    },
  },
}))
