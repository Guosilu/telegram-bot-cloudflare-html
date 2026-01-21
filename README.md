# Telegram Bot Cloudflare HTML

## 项目描述

这是一个基于React + TypeScript开发的前端项目，用于与Telegram Bot的API进行交互。项目部署在Cloudflare Pages上，通过自定义域 `telbot.yaoyao.party` 访问。

## 技术栈

- **前端框架**：React 18
- **开发语言**：TypeScript
- **构建工具**：Vite
- **样式**：CSS3
- **API调用**：Fetch API
- **部署平台**：Cloudflare Pages

## 项目结构

```
telegram-bot-cloudflare-html/
├── public/             # 静态资源
├── src/
│   ├── components/     # 可复用组件
│   ├── pages/          # 功能页面
│   ├── services/       # API服务
│   ├── types/          # TypeScript类型定义
│   ├── utils/          # 工具函数
│   ├── App.tsx         # 应用主组件
│   ├── main.tsx        # 应用入口
│   └── index.css       # 全局样式
├── .eslintrc.cjs       # ESLint配置
├── .gitignore          # Git忽略文件
├── index.html          # HTML模板
├── package.json        # 项目配置
├── tsconfig.json       # TypeScript配置
├── tsconfig.node.json  # TypeScript Node配置
└── vite.config.ts      # Vite配置
```

## 功能特性

- **用户管理**：注册、登录、获取Token、获取用户次数
- **AI分析**：AI分析、AI详细分析
- **响应式设计**：适配手机端和桌面端
- **错误处理**：详细的错误提示
- **表单验证**：实时表单验证
- **性能优化**：代码分割、缓存策略

## 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd telegram-bot-cloudflare-html
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **开发模式**
   ```bash
   npm run dev
   ```
   访问 http://localhost:3000

4. **构建生产版本**
   ```bash
   npm run build
   ```

## 部署到Cloudflare Pages

1. 登录Cloudflare账户
2. 创建新的Pages项目
3. 连接到GitHub仓库
4. 配置构建命令：`npm run build`
5. 配置构建输出目录：`dist`
6. 部署到自定义域：`telbot.yaoyao.party`

## API接口文档

### 用户管理接口

#### 1. 用户注册

**请求方式**：POST
**接口地址**：`/api/register`
**请求体**：

```json
{
  "bot_user_id": 123456789,
  "username": "testuser",
  "password": "testpassword"
}
```

**响应**：

```json
{
  "code": 200,
  "message": "User registered successfully",
  "status": "success",
  "data": {
    "user_id": 1,
    "username": "testuser",
    "bot_user_id": 123456789,
    "ai_analysis_count": 10,
    "ai_detailed_analysis_count": 5
  }
}
```

#### 2. 用户登录

**请求方式**：POST
**接口地址**：`/api/login`
**请求体**：

```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

**响应**：

```json
{
  "code": 200,
  "message": "Login successful",
  "status": "success",
  "data": {
    "user_id": 1,
    "username": "testuser",
    "token": "<JWT token>"
  }
}
```

#### 3. 获取Token

**请求方式**：POST
**接口地址**：`/api/token`
**请求体**：

```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

**响应**：

```json
{
  "code": 200,
  "message": "Token generated successfully",
  "status": "success",
  "data": {
    "token": "<JWT token>"
  }
}
```

#### 4. 获取用户次数

**请求方式**：GET
**接口地址**：`/api/user/counts`
**请求头**：

```
Authorization: Bearer <JWT token>
```

**响应**：

```json
{
  "code": 200,
  "message": "User counts retrieved successfully",
  "status": "success",
  "data": {
    "ai_analysis_count": 10,
    "ai_detailed_analysis_count": 5
  }
}
```

### AI分析接口

#### 5. AI分析

**请求方式**：GET
**接口地址**：`/api/ai/analysis?crypto_type=BTC`
**请求头**：

```
Authorization: Bearer <JWT token>
```

**响应**：

```json
{
  "code": 200,
  "message": "AI analysis completed",
  "status": "success",
  "data": {
    "analysis": {
      "crypto_type": "BTC",
      "analysis": "AI analysis for BTC: This is a sample analysis result."
    }
  }
}
```

#### 6. AI详细分析

**请求方式**：GET
**接口地址**：`/api/ai/detailed-analysis?crypto_type=BTC`
**请求头**：

```
Authorization: Bearer <JWT token>
```

**响应**：

```json
{
  "code": 200,
  "message": "AI detailed analysis completed",
  "status": "success",
  "data": {
    "analysis": {
      "crypto_type": "BTC",
      "detailed_analysis": "Detailed AI analysis for BTC: This is a sample detailed analysis result with more comprehensive information."
    }
  }
}
```
