// ==================== 版本配置 ====================
const APP_VERSION = '2.1.0';
const VERSION_KEY = 'app_last_seen_version';
const VISITOR_KEY = 'app_visitor_count';
const CHANGELOG = [
    'AI厂商信息更新至2026年6月最新状态',
    '新增Hermes智能体框架模块（安装指南+使用指南）',
    '导航结构重组为 OpenClaw/Hermes/AI厂商/文档 四大分组',
    '前端页面层次与视觉体验优化',
];

// ==================== 版本更新提醒 ====================
function checkVersionUpdate() {
    const lastSeen = localStorage.getItem(VERSION_KEY);
    if (lastSeen !== APP_VERSION) {
        showUpdateNotice();
    }
}

function showUpdateNotice() {
    if (document.getElementById('version-update-modal')) return;

    const changelogHTML = CHANGELOG.map(item => `<li>${item}</li>`).join('');

    const modal = document.createElement('div');
    modal.id = 'version-update-modal';
    modal.innerHTML = `
        <div class="vu-overlay" onclick="dismissUpdate()"></div>
        <div class="vu-dialog">
            <div class="vu-header">
                <span class="vu-icon">🎉</span>
                <h3>系统已更新至 v${APP_VERSION}</h3>
            </div>
            <div class="vu-body">
                <p class="vu-subtitle">本次更新内容：</p>
                <ul class="vu-changelog">${changelogHTML}</ul>
            </div>
            <div class="vu-footer">
                <button class="vu-btn" onclick="dismissUpdate()">我知道了</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    requestAnimationFrame(() => {
        modal.classList.add('vu-active');
    });
}

function dismissUpdate() {
    localStorage.setItem(VERSION_KEY, APP_VERSION);
    const modal = document.getElementById('version-update-modal');
    if (modal) {
        modal.classList.remove('vu-active');
        setTimeout(() => modal.remove(), 300);
    }
}

// ==================== 智能体三层架构 ====================

const layerData = {
    brain: {
        title: '大脑 (Brain)',
        summary: '大脑层实现任务理解、意图解析、计划生成、风险评估和反馈回路。',
        details: `
            <ul>
                <li>模型选型：GPT、Claude、LLaMA、通义千问、deepseek，kimi等，组合多模型混合推理。</li>
                <li>意图解析：NLU+语义嵌入预判；参考《自然语言理解综述》（ACL）。</li>
                <li>规划与决策：基于POMDP/强化学习架构，结合Agentic Loop策略。</li>
                <li>对话管理：上下文窗口与检索增强（RAG），避免“遗忘”。</li>
            </ul>
            
        `,
    },
    handsfeet: {
        title: '手脚 (Hands & Feet)',
        summary: '手脚层负责具体执行，有粒度授权、工具调用和安全审计。',
        details: `
            <ul>
                <li>命令抽象：shell、HTTP请求、浏览器自动化、SaaS接口。</li>
                <li>权限控制：可配置沙箱与访问令牌，避免权限泄露。</li>
                <li>可观测性：执行日志、时间戳、结果回写大脑层。</li>
                <li>实践参考：LangChain Tooling、Microsoft Copilot Actions。</li>
            </ul>
            
        `,
    },
    memory: {
        title: '记忆 (Memory)',
        summary: '记忆层为大脑赋能，提供语境保持、知识检索、经验复用。一般存储为.md文件，方便版本控制和人工编辑。',
        details: `
            <ul>
                <li>短期记忆：交互会话缓存、历史问答上下文。</li>
                <li>长期记忆：向量数据库（Milvus、Pinecone）、本地 Git 语料库。</li>
                <li>知识库：FAQ、文档、行业规范，命名实体与知识图谱。</li>
                <li>检索策略：Semantic Search、Hybrid Search、LLM 重新排序。</li>
            </ul>
        `,
    },
};

const detailContent = document.getElementById('detail-content');
const layerCards = document.querySelectorAll('.layer-card');

function renderLayer(layer) {
    const node = layerData[layer];
    if (!node) return;
    detailContent.innerHTML = `
        <h3 style="color:#7dd3fc;">${node.title}</h3>
        <p>${node.summary}</p>
        ${node.details}
    `;
}

layerCards.forEach(card => {
    card.addEventListener('click', () => {
        const layer = card.getAttribute('data-layer');
        renderLayer(layer);
    });
    card.style.cursor = 'pointer';
});

window.addEventListener('DOMContentLoaded', () => {
    renderLayer('brain');
    checkVersionUpdate();
    initVisitorCounter();
});

// ==================== 访客计数器 ====================
function initVisitorCounter() {
    const counterEl = document.getElementById('visitor-count');
    if (!counterEl) return;

    let count = parseInt(localStorage.getItem(VISITOR_KEY) || '0', 10);
    const isNewVisitor = !localStorage.getItem(VISITOR_KEY);

    if (isNewVisitor) {
        count = 1;
    } else {
        count += 1;
    }
    localStorage.setItem(VISITOR_KEY, count);

    animateCounter(counterEl, count);
}

function animateCounter(el, target) {
    let current = 0;
    const duration = 1200;
    const step = Math.max(1, Math.floor(target / (duration / 16)));
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = current.toLocaleString();
    }, 16);
}