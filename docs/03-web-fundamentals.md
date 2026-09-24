# 03 Web 基础原理

## 核心数据流
```text
用户
↓
浏览器
↓
HTTP Request
↓
服务器
↓
业务逻辑 / API
↓
数据库
↓
HTTP Response
↓
浏览器
```

## Frontend
负责：
- 页面
- 表单
- 交互
- 展示

## Backend
负责：
- 权限
- 校验
- 业务规则
- 数据库
- 日志

## API
例如：
```text
GET    /api/projects
POST   /api/projects
GET    /api/projects/123
PATCH  /api/projects/123
DELETE /api/projects/123
```

## JSON
```json
{
  "id": 123,
  "name": "医院实施项目",
  "status": "active"
}
```

## 需要理解
- Client / Server
- Frontend / Backend
- Domain / DNS / IP / Port
- HTTP / HTTPS
- Cookie / Session / Token
- API
- JSON
- Database

## 浏览器 DevTools
重点学：
- Elements
- Console
- Network

Network 中要会看：
- Request URL
- Method
- Status
- Request Headers
- Request Body
- Response

## 官方资料
https://developer.mozilla.org/zh-CN/docs/Web/HTTP

## 验收
能口头解释“点击保存”后数据经过哪些层。