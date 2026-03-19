// ===== 礼品商品数据 =====
// 预留批量导入接口 - 将来你可以批量导入你的仓库礼品数据

// 礼品分类
const giftCategories = {
    business: '商务礼品',
    welfare: '员工福利',
    highend: '高端定制',
    festival: '节日礼盒',
    teambuilding: '团建礼物',
};

// 模拟礼品商品数据
const giftProducts = [
    {
        id: 1,
        name: '五粮液 第八代普五 500ml 礼盒装',
        category: 'business',
        subcategory: '酒水名茶',
        price: 1099,
        originalPrice: 1299,
        image: 'https://via.placeholder.com/400x400/f5e5d8/ffffff?text=五粮液',
        tags: ['高端', '商务宴请', '企业团购'],
        description: '四川宜宾五粮液股份出品，浓香型白酒标杆，经典八代普五，口感醇厚绵香，送礼高端大气，企业团购更优惠。适合送给客户、合作伙伴。',
        location: '全国包邮',
        minOrder: 1,
    },
    {
        id: 2,
        name: '米家 空气净化器 4 Pro',
        category: 'welfare',
        subcategory: '数码家电',
        price: 1299,
        originalPrice: 1599,
        image: 'https://via.placeholder.com/400x400/e5f5fd/ffffff?text=空气净化器',
        tags: ['实用', '家居', '员工福利'],
        description: '小米米家空气净化器，除醛除菌，智能控制，高效净化。员工年终福利优秀选择，实用贴心，提升员工满意度。支持批量团购开票。',
        location: '全国联保',
        minOrder: 10,
    },
    {
        id: 3,
        name: '智联 真丝围巾礼盒 礼盒定制',
        category: 'highend',
        subcategory: '服饰皮具',
        price: 688,
        originalPrice: 988,
        image: 'https://via.placeholder.com/400x400/f5e5f8/ffffff?text=真丝围巾',
        tags: ['高端定制', '商务送礼', '可刻字'],
        description: '100%桑蚕丝真丝围巾，手感顺滑，色泽亮丽。支持企业logo刺绣定制，高端礼盒包装，送给领导/客户非常上档次。',
        location: '定制周期 7-10天',
        minOrder: 1,
    },
    {
        id: 4,
        name: '故宫文化 朕知道了 文创礼盒套装',
        category: 'festival',
        subcategory: '文创礼盒',
        price: 298,
        originalPrice: 398,
        image: 'https://via.placeholder.com/400x400/d4f5e8/ffffff?text=故宫文创',
        tags: ['文化礼品', '节日礼盒', '国潮'],
        description: '故宫文创联名礼盒，包含笔记本+签字笔+邮票套装，设计大气有文化底蕴，适合节日送给客户员工，既有面子又有文化。',
        location: '现货速发',
        minOrder: 5,
    },
    {
        id: 5,
        name: 'SK-II 神仙水 230ml 礼盒',
        category: 'highend',
        subcategory: '美妆护肤',
        price: 1450,
        originalPrice: 1590,
        image: 'https://via.placeholder.com/400x400/f8e5f0/ffffff?text=SK-II',
        tags: ['高端美妆', '女领导', '女神节'],
        description: '官方正品，礼盒包装，滋润护肤，提亮肤色。送给女客户、女领导非常适合，高端有档次。',
        location: '正品保障',
        minOrder: 1,
    },
    {
        id: 6,
        name: '茶礼 武夷山大红袍 礼盒装',
        category: 'business',
        subcategory: '酒水名茶',
        price: 368,
        originalPrice: 468,
        image: 'https://via.placeholder.com/400x400/d8e5f5/ffffff?text=大红袍',
        tags: ['茶礼', '商务', '大红袍'],
        description: '正宗武夷山大红袍，岩茶代表，香气浓郁持久，滋味醇厚甘滑。精美礼盒包装，送给爱茶的客户非常合适。',
        location: '产地直发',
        minOrder: 1,
    },
    {
        id: 7,
        name: '飞利浦 电动牙刷 声波震动 礼盒',
        category: 'welfare',
        subcategory: '个人护理',
        price: 399,
        originalPrice: 499,
        image: 'https://via.placeholder.com/400x400/e5d8f5/ffffff?text=电动牙刷',
        tags: ['实用', '日用品', '员工福利'],
        description: '飞利浦声波电动牙刷，智能感应，清洁高效，全身水洗。员工福利、入职礼物性价比高，人人都能用得上。',
        location: '全国联保',
        minOrder: 5,
    },
    {
        id: 8,
        name: '苹果 AirPods Pro 2 主动降噪',
        category: 'highend',
        subcategory: '数码',
        price: 1699,
        originalPrice: 1899,
        image: 'https://via.placeholder.com/400x400/f5f0e5/ffffff?text=AirPods',
        tags: ['高端数码', '科技礼品', '商务'],
        description: 'Apple正品 AirPods Pro 第二代，主动降噪，空间音频，续航超长。送给科技爱好者客户/高管，非常时尚拿得出手。',
        location: '正品国行',
        minOrder: 1,
    },
    {
        id: 9,
        name: '五谷杂粮 中秋礼盒 杂粮组合',
        category: 'festival',
        subcategory: '食品礼盒',
        price: 168,
        originalPrice: 218,
        image: 'https://via.placeholder.com/400x400/d8f5e5/ffffff?text=五谷杂粮',
        tags: ['健康', '中秋礼盒', '节日'],
        description: '八种优质杂粮组合，健康养生，礼盒包装大气。中秋佳节送给客户员工，健康祝福诚意满满。',
        location: '现货',
        minOrder: 10,
    },
    {
        id: 10,
        name: '华为 手环 8 NFC 智能运动',
        category: 'welfare',
        subcategory: '智能穿戴',
        price: 269,
        originalPrice: 319,
        image: 'https://via.placeholder.com/400x400/e5f0f5/ffffff?text=华为手环',
        tags: ['科技', '运动健康', '员工福利'],
        description: '华为手环8，轻薄设计，心率血氧检测，NFC门禁，超长续航。员工入职礼物、周年福利性价比优选。',
        location: '全国联保',
        minOrder: 5,
    },
    {
        id: 11,
        name: '万宝龙 大班系列 签字笔礼盒',
        category: 'business',
        subcategory: '文具',
        price: 798,
        originalPrice: 998,
        image: 'https://via.placeholder.com/400x400/f5e8f0/ffffff?text=万宝龙',
        tags: ['商务文具', '高端', '签字'],
        description: '德国万宝龙大班签字笔，经典设计，书写流畅，皮质礼盒包装。送给商务伙伴、客户非常上档次，可以刻名字定制。',
        location: '正品',
        minOrder: 1,
    },
    {
        id: 12,
        name: '阳澄湖大闸蟹 礼券 8只装',
        category: 'festival',
        subcategory: '生鲜礼盒',
        price: 588,
        originalPrice: 788,
        image: 'https://via.placeholder.com/400x400/f5e8e8/ffffff?text=大闸蟹',
        tags: ['中秋', '生鲜礼券', '节日'],
        description: '正宗阳澄湖大闸蟹，礼券兑换，全国配送，中秋送礼经典选择，客户都喜欢。',
        location: '全国配送',
        minOrder: 1,
    },
];

// 预设对话推荐 - 根据用户问题推荐回复
const predefinedReplies = {
    '🎁 我需要给客户采购商务礼品': {
        text: '好的！给客户采购商务礼品，我给您推荐几款高性价比、拿得出手的选择：\n\n' +
              '💼 **高端商务首选**\n' +
              '• 五粮液普五礼盒 - 经典白酒，国人都认，1099元\n' +
              '• 万宝龙大班签字笔 - 可以定制刻字，798元\n' +
              '• 真丝围巾定制 - 高端上档次，688元\n\n' +
              '您看对哪款感兴趣？点推荐商品卡片可以看详情，我给您算团购报价！',
        recommendations: [1, 11, 3],
    },
    '🏢 公司年会员工福利礼品': {
        text: '收到！年会员工福利讲究实用性价比，我推荐这几款：\n\n' +
              '📦 **高性价比实用之选**\n' +
              '• 米家空气净化器 - 1299元，实用健康\n' +
              '• 飞利浦电动牙刷礼盒 - 399元，人人需要\n' +
              '• 华为手环8 - 269元，智能健康\n\n' +
              '我们可以按部门/人数批量报价，开票配送一条龙，您需要多少份？',
        recommendations: [2, 7, 10],
    },
    '✨ 高端礼品定制送给领导': {
        text: '明白！送给领导的高端礼品需要上档次又得体，我推荐：\n\n' +
              '👔 **精致高端之选**\n' +
              '• SK-II神仙水礼盒 - 送给女领导 1450元\n' +
              '• AirPods Pro 二代 - 数码科技高端 1699元\n' +
              '• 真丝围巾定制刺绣logo - 688元\n\n' +
              '点击商品卡片看详情，可以告诉我预算和人数，我给您做采购方案！',
        recommendations: [5, 8, 3],
    },
    '🎯 500元左右性价比礼品推荐': {
        text: '500元预算性价比很高，给您推荐几款适合不同场景的：\n\n' +
              '💰 **高性价比推荐**\n' +
              '• 武夷山大红袍茶礼礼盒 - 368元\n' +
              '• 飞利浦电动牙刷礼盒 - 399元\n' +
              '• 故宫文创中秋礼盒 - 298元\n' +
              '• 阳澄湖大闸蟹礼券 - 588元\n\n' +
              '你是采购给客户还是员工福利？我给您细化推荐！',
        recommendations: [6, 7, 4, 12],
    },
    '🎁 中秋节节日礼盒推荐': {
        text: '中秋节送礼，给您推荐几款经典选择：\n\n' +
              '🌕 **中秋热门礼盒**\n' +
              '• 阳澄湖大闸蟹礼券 8只装 - 588元\n' +
              '• 五谷杂粮健康礼盒 - 168元\n' +
              '• 故宫文创联名礼盒 - 298元\n\n' +
              '需要采购多少份？我给您算总价和开票配送方案！',
        recommendations: [12, 9, 4],
    },
};

// ===== 接口预留 =====
// 将来批量导入接口 - 实现: 从你的表格/CSV批量导入商品数据
function bulkImportProducts(productsArray) {
    // 参数: productsArray - 商品数组 [{id, name, category, price, originalPrice, image, description, ...}]
    // 返回: 成功导入数量
    giftProducts.push(...productsArray);
    return giftProducts.length;
}

// 将来第三方大模型接口 - 实现: 调用你的大模型接口获取对话回复
async function callAI(prompt, history) {
    // 参数:
    // - prompt: 当前用户输入
    // - history: 历史对话数组 [{role: 'user'/'bot', content: text}]
    // 返回: Promise<string> 回复文本
    // 
    // 当前演示: 使用预设回复
    return new Promise((resolve) => {
        // 模拟网络延迟
        setTimeout(() => {
            // 匹配关键词返回预设回复
            let reply = '感谢您的咨询，我给您推荐几款热门商品，点击左侧卡片查看详情，需要报价请告诉我！';
            for (const [key, data] of Object.entries(predefinedReplies)) {
                if (prompt.includes(key.split(' ')[1])) {
                    reply = data.text;
                    break;
                }
            }
            resolve(reply);
        }, 800);
    });
}
