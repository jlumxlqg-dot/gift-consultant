// ===== 礼享 - 智能礼品采购顾问 =====

// DOM 元素缓存
const elements = {
    chatContainer: document.getElementById('chatContainer'),
    userInput: document.getElementById('userInput'),
    sendBtn: document.getElementById('sendBtn'),
    recommendations: document.getElementById('recommendations'),
    productModal: document.getElementById('productModal'),
    productDetailContent: document.getElementById('productDetailContent'),
    refreshRecommend: document.getElementById('refreshRecommend'),
};

// 应用状态
let appState = {
    messages: [],
    currentRecommendations: [],
};

// ===== 初始化 =====

function init() {
    // 渲染初始推荐商品
    renderRecommendations();
    
    // 绑定事件
    bindEvents();
    
    // 自动调整textarea高度
    adjustTextareaHeight();
}

// ===== 推荐商品渲染 =====

function getRandomRecommendations(count = 4) {
    // 随机打乱选择
    const shuffled = [...giftProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function createRecommendCard(product) {
    const card = document.createElement('div');
    card.className = 'recommend-card';
    card.innerHTML = `
        <div class="recommend-card-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="recommend-card-info">
            <div class="recommend-card-title">${product.name}</div>
            <div class="recommend-card-category">${giftCategories[product.category]} → ${product.subcategory}</div>
            <div class="recommend-card-price-row">
                <span class="recommend-card-price">¥${product.price}</span>
                <span class="recommend-card-tag">${product.tags[0]}</span>
            </div>
        </div>
    `;
    card.addEventListener('click', () => openProductDetail(product));
    return card;
}

function renderRecommendations() {
    elements.recommendations.innerHTML = '';
    appState.currentRecommendations = getRandomRecommendations(4);
    appState.currentRecommendations.forEach(product => {
        const card = createRecommendCard(product);
        elements.recommendations.appendChild(card);
    });
}

// ===== 商品详情弹窗 =====

function openProductDetail(product) {
    const html = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <h2 class="product-detail-title">${product.name}</h2>
            <div class="product-detail-price">
                <span class="current">¥${product.price}</span>
                ${product.originalPrice ? `<span class="original">¥${product.originalPrice}</span>` : ''}
            </div>
            <div class="product-detail-meta">
                <div class="product-detail-meta-item">
                    <div class="product-detail-meta-label">分类</div>
                    <div class="product-detail-meta-value">${giftCategories[product.category]} / ${product.subcategory}</div>
                </div>
                <div class="product-detail-meta-item">
                    <div class="product-detail-meta-label">最低起订</div>
                    <div class="product-detail-meta-value">${product.minOrder} 件</div>
                </div>
                <div class="product-detail-meta-item">
                    <div class="product-detail-meta-label">标签</div>
                    <div class="product-detail-meta-value">${product.tags.join(' / ')}</div>
                </div>
                <div class="product-detail-meta-item">
                    <div class="product-detail-meta-label">配送</div>
                    <div class="product-detail-meta-value">${product.location}</div>
                </div>
            </div>
            ${product.description ? `
                <div class="product-detail-description">
                    <h4>商品描述</h4>
                    <p>${product.description}</p>
                </div>
            ` : ''}
        </div>
    `;
    elements.productDetailContent.innerHTML = html;
    elements.productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
    elements.productModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== 对话处理 =====

function addMessage(role, text, quickReplies = []) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    
    const avatar = role === 'bot' ? `
        <div class="message-avatar">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="10" fill="#8B5CF6"/>
                <text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-weight="600">礼</text>
            </svg>
        </div>
    ` : `
        <div class="message-avatar">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="10" fill="#6B7280"/>
                <text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-weight="600">你</text>
            </svg>
        </div>
    `;
    
    messageDiv.innerHTML = `${avatar}<div class="message-content"><div class="message-text">${text}</div>`;
    
    // 添加快捷回复
    if (quickReplies.length > 0) {
        const quickDiv = document.createElement('div');
        quickDiv.className = 'quick-replies';
        quickReplies.forEach(reply => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply';
            btn.textContent = reply;
            btn.dataset.text = reply;
            btn.addEventListener('click', () => {
                sendMessage(reply);
            });
            quickDiv.appendChild(btn);
        });
        messageDiv.querySelector('.message-content').appendChild(quickDiv);
    }
    
    messageDiv.querySelector('.message-content').innerHTML += '</div>';
    elements.chatContainer.appendChild(messageDiv);
    
    // 滚动到底部
    setTimeout(() => {
        elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
    }, 100);
    
    return messageDiv;
}

function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="10" fill="#8B5CF6"/>
                <text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-weight="600">礼</text>
            </svg>
        </div>
        <div class="message-content">
            <div class="typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    elements.chatContainer.appendChild(typingDiv);
    elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
}

function removeTyping() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function getQuickRepliesForText(text) {
    // 根据内容提供不同快捷回复
    if (text.includes('客户') || text.includes('商务')) {
        return ['🎁 看推荐商品', '💰 报价团购'];
    }
    if (text.includes('年会') || text.includes('员工')) {
        return ['📋 要看推荐列表', '📦 批量报价'];
    }
    return ['🎁 看推荐商品', '📞 联系咨询'];
}

function getBotReply(userText) {
    // 先匹配预设回复
    for (const [key, data] of Object.entries(predefinedReplies)) {
        if (userText.includes(key.split(' ')[1]) || userText === key) {
            return {
                text: data.text,
                recs: data.recommendations,
            };
        }
    }
    
    // 默认回复
    return {
        text: '收到您的需求！我已经在左侧推荐了几款热门礼品，点击卡片可以查看详情。需要团购报价或者推荐其他品类请告诉我！',
        recs: null,
    };
}

async function sendMessage(text) {
    // 清空输入
    elements.userInput.value = '';
    elements.sendBtn.disabled = true;
    adjustTextareaHeight();
    
    // 添加用户消息
    addMessage('user', text);
    
    // 显示打字指示器
    showTyping();
    
    // 这里预留调用第三方大模型接口
    // await callAI(text, appState.messages); 将来替换这里
    
    // 当前使用预设回复
    const reply = getBotReply(text);
    
    // 模拟网络延迟，体现对话感
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
    
    removeTyping();
    
    // 添加机器人回复
    addMessage('bot', reply.text, getQuickRepliesForText(text));
    
    // 如果有指定推荐，刷新侧边推荐
    if (reply.recs) {
        // 清空并添加指定推荐
        elements.recommendations.innerHTML = '';
        reply.recs.forEach(id => {
            const product = giftProducts.find(p => p.id === id);
            if (product) {
                const card = createRecommendCard(product);
                elements.recommendations.appendChild(card);
            }
        });
        appState.currentRecommendations = reply.recs.map(id => giftProducts.find(p => p.id === id));
    }
    
    // 保存消息到历史
    appState.messages.push({role: 'user', content: text});
    appState.messages.push({role: 'bot', content: reply.text});
}

// ===== 事件绑定 =====

function bindEvents() {
    // 发送按钮点击
    elements.sendBtn.addEventListener('click', () => {
        const text = elements.userInput.value.trim();
        if (text) {
            sendMessage(text);
        }
    });
    
    // 回车发送
    elements.userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const text = elements.userInput.value.trim();
            if (text) {
                sendMessage(text);
            }
        }
    });
    
    // 输入变化启用发送按钮
    elements.userInput.addEventListener('input', () => {
        const text = elements.userInput.value.trim();
        elements.sendBtn.disabled = !text;
        adjustTextareaHeight();
    });
    
    // 快捷回复点击（已动态绑定）
    
    // 刷新推荐
    elements.refreshRecommend.addEventListener('click', () => {
        renderRecommendations();
    });
    
    // 关闭详情弹窗
    document.getElementById('closeProductModal').addEventListener('click', closeProductDetail);
    document.getElementById('closeDetailBtn').addEventListener('click', closeProductDetail);
    elements.productModal.querySelector('.modal-backdrop').addEventListener('click', closeProductDetail);
    
    // 咨询采购按钮
    document.getElementById('contactBtn').addEventListener('click', () => {
        closeProductDetail();
        // 滚动到输入框
        document.querySelector('.chat-input-footer').scrollIntoView({behavior: 'smooth'});
    });
}

// ===== 工具函数 =====

function adjustTextareaHeight() {
    const textarea = elements.userInput;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

// ===== 开发接口说明 =====

/* 
🔌 预留接口说明

1. **批量导入商品数据**
   ```javascript
   // 将来你的数据准备好了，调用这个方法批量导入
   const myProducts = [
       { id, name, category, price, originalPrice, image, description, ... },
       ...
   ];
   bulkImportProducts(myProducts);
   ```

2. **第三方大模型对接**
   ```javascript
   // 在 script.js 中已经预留了 callAI 函数，位置在 data.js 末尾
   // 将来对接你的大模型，替换这个函数实现即可
   async function callAI(prompt, history) {
       // 你的 API 调用逻辑
       return responseText;
   }
   ```

3. **数据结构**
   商品结构:
   {
     id: number,
     name: string,       // 商品名称
     category: string,   // 分类key: business/welfare/highend/festival
     subcategory: string, // 子分类名称
     price: number,      // 现价
     originalPrice: number, // 原价 (可选)
     image: string,      // 图片 URL
     tags: string[],     // 标签数组
     description: string, // 描述
     location: string,   // 配送/位置信息
     minOrder: number   // 最小起订量
   }
*/

// ===== 启动 =====
document.addEventListener('DOMContentLoaded', init);
