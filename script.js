// 按钮跳转由 HTML onclick 处理

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
        summary: '记忆层为大脑赋能，提供语境保持、知识检索、经验复用。',
        details: `
            <ul>
                <li>短期记忆：交互会话缓存、历史问答上下文。</li>
                <li>长期记忆：向量数据库（Milvus、Pinecone）、本地 Git 语料库。</li>
                <li>知识库：FAQ、文档、行业规范，命名实体与知识图谱。</li>
                <li>检索策略：Semantic Search、Hybrid Search、LLM 重新排序。</li>
            </ul>
            <p>语料库,.md文件</p>
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
});