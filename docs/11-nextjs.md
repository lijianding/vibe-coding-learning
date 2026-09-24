# 11 Next.js 全栈开发

官方：
- https://nextjs.org/docs
- https://nextjs.org/learn

Next.js 可以同时承载页面和服务端逻辑，非常适合减少初学者需要维护的技术栈数量。

## 必学概念
- App Router
- Page
- Layout
- Server Component
- Client Component
- Route Handler
- Server Action
- Loading
- Error
- Environment Variables
- Data Fetching

## 常见结构
```text
app/
├── layout.tsx
├── page.tsx
├── login/
│   └── page.tsx
├── projects/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
└── api/
    └── projects/
        └── route.ts
```

## 动态路由
```text
/projects/123
```
可映射到：
```text
projects/[id]/page.tsx
```

## Route Handler
示例：
```typescript
export async function GET() {
  return Response.json([]);
}
```

## 环境变量
例如：
```text
DATABASE_URL
SUPABASE_URL
SUPABASE_ANON_KEY
```

绝不能把密钥硬编码到仓库。

## 学习重点
你要能在脑中形成：
```text
URL
↓
Next.js Route
↓
Server
↓
Database
↓
Response / Page
```

## 练习
建立：
- /projects
- /projects/[id]
- /issues
- /dashboard

先用本地假数据。

## 验收
能解释：
- page.tsx
- layout.tsx
- 动态路由
- Server Component 与 Client Component 为什么存在
- API 路由大致放在哪里