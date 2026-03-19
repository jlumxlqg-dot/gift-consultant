# 礼享 - 智能礼品采购顾问

> 对话式智能礼品采购顾问，面向礼品采购客户，推荐礼品商品，支持批量导入、大模型对接。

## 功能特性

- 💬 **对话式交互** - 类似 ChatGPT 的对话体验，智能推荐礼品
- 🏷️ **商品推荐侧边栏** - 实时展示推荐商品卡片，点击查看详情
- 🎁 **模拟商品数据** - 内置 12 款热门礼品商品（商务/福利/高端/节日）
- ⚡ **预留接口** - 支持批量导入商品数据、支持对接第三方大模型
- 👉 **快捷回复** - 推荐问题点击直接发送，演示流畅自然
- 📱 **响应式设计** - 完美适配桌面/平板/手机
- 🚀 **纯前端静态** - GitHub Pages 直接部署，不需要后端

## 商品分类

- `business` - 商务礼品（送给客户、合作伙伴）
- `welfare` - 员工福利（年会、节日福利）
- `highend` - 高端定制（送给领导、重要客户）
- `festival` - 节日礼盒（中秋、春节、年会）

## 数据结构

商品对象结构：
```javascript
{
  id: number,
  name: string,            // 商品名称
  category: string,       // 分类key
  subcategory: string,   // 子分类
  price: number,         // 销售价
  originalPrice: number, // 原价（可选）
  image: string,        // 图片URL
  tags: string[],       // 标签数组
  description: string,  // 商品描述
  location: string,    // 配送信息
  minOrder: number    // 最小起订量
}
```

## 预留接口

### 1. 批量导入商品数据

```javascript
// 在 data.js 中
bulkImportProducts(productsArray)
// 参数：商品数组，返回总商品数量
```

### 2. 对接第三方大模型对话

```javascript
// 在 data.js 中
async function callAI(prompt, history)
// 参数：
// - prompt: 当前用户提问
// - history: 历史对话 [{role: 'user'/'bot', content: text}]
// 返回: Promise<string> 回复文本
```

## 部署到 GitHub Pages

项目已配置 GitHub Actions 自动部署，推送到 main 分支自动部署。

## 本地开发

```bash
python3 -m http.server 8001
# 访问 http://localhost:8001
```

## 技术栈

- 纯 HTML + CSS + JavaScript
- 谷歌字体 Inter
- GitHub Pages 托管

## 作者

Created with ❤️ by OpenClaw AI
