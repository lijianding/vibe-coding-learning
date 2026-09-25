# 11 Next.js：从 React 页面到全栈 SaaS

> 本章目标：理解 Next.js 为什么能同时承担页面、服务端逻辑、路由、数据获取与部署，并建立清晰的 Server / Client 边界。

## 官方源资料

- Next.js Docs: https://nextjs.org/docs
- App Router: https://nextjs.org/docs/app
- Server & Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Fetching Data: https://nextjs.org/docs/app/getting-started/fetching-data
- Updating Data / Server Functions: https://nextjs.org/docs/app/getting-started/updating-data
- Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Caching Guide: https://nextjs.org/docs/app/guides/caching
- Environment Variables: https://nextjs.org/docs/app/guides/environment-variables
- Next.js Learn: https://nextjs.org/learn

---

## 一、Next.js 到底解决什么问题

React 本身主要解决 UI。

真实 SaaS 还需要：

- URL Routing
- Server Rendering
- Server-side data access
- API endpoint
- Form mutation
- Build
- Asset optimization
- Error boundary
- Loading UI
- Deployment integration

Next.js 把这些能力组合成一个约定式框架。

可以理解：

```text
React
+
Router
+
Server Runtime
+
Build System
+
Full-stack conventions
=
Next.js
```

---

## 二、App Router 的文件系统路由

目录：

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
└── settings/
    └── page.tsx
```

映射：

```text
app/page.tsx                  → /
app/login/page.tsx            → /login
app/projects/page.tsx         → /projects
app/projects/[id]/page.tsx    → /projects/:id
```

这叫 File-system Routing。

### Dynamic Segment

```text
[id]
```

代表动态参数。

例如：

```text
/projects/abc123
```

对应：

```text
id = abc123
```

---

## 三、Layout

`layout.tsx` 用于共享 UI。

例如 SaaS：

```text
Dashboard Layout
├── Header
├── Sidebar
└── Page Content
```

你不需要每个页面重复写 Sidebar。

可以嵌套 Layout：

```text
Root Layout
└── Dashboard Layout
    └── Settings Layout
```

---

## 四、Server Component

App Router 中组件默认可以在服务器执行。

示例：

```tsx
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <ProjectList projects={projects} />
  );
}
```

### Server Component 的优势

- 数据库查询留在服务器
- Secret 不发给浏览器
- 可减少客户端 JavaScript
- 初始 HTML 可在服务器生成

### Server Component 适合

- 数据读取
- 权限检查
- 静态内容
- 非交互区域

---

## 五、Client Component

需要浏览器能力时使用：

```tsx
"use client";
```

例如：

```tsx
"use client";

import { useState } from "react";

export function ProjectFilter() {
  const [status, setStatus] = useState("all");

  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
    </select>
  );
}
```

### Client Component 适合

- useState
- useEffect
- Event Handler
- Browser API
- Local interactive UI

---

## 六、不要所有文件都写 use client

这是初学者和 AI 很容易犯的错误。

如果所有组件都 Client：

- 浏览器 JS 变大
- Server 优势消失
- Secret 边界更容易混乱
- 数据流更复杂

更好的设计：

```text
Server Page
├── Server data fetch
├── Server auth
└── Small Client Components
    ├── Filter
    ├── Modal
    └── Interactive Form
```

---

## 七、Server 与 Client 的安全边界

重要原则：

> 进入 Client Bundle 的代码和变量应视为用户可见。

Server-only：

- DB password
- Service Role Key
- Internal API secret

不能进入 Client。

如果环境变量有客户端公开前缀，例如 `NEXT_PUBLIC_*`，就不能把它当 Secret。

---

## 八、Data Fetching

### Server-side Fetch

```tsx
export default async function Page() {
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}
```

优势：

- 首屏直接有数据
- Secret 留服务端
- 更少客户端请求胶水

### Client-side Fetch

适合：

- 用户交互后动态查询
- Realtime
- Infinite Scroll
- 非首屏数据

不要形成教条：

> Server 永远好 / Client 永远坏

而要根据数据生命周期选择。

---

## 九、Data Access Layer

不要在每个 page.tsx 中重复：

```text
auth
permission
query
error handling
```

推荐建立：

```text
lib/
  projects/
    queries.ts
    mutations.ts
    permissions.ts
    schemas.ts
```

调用链：

```text
Page / Server Action
↓
Service / Data Access Layer
↓
Database
```

优点：

- 权限逻辑集中
- 查询容易复用
- 更容易测试
- AI 不容易每个页面生成不同写法

---

## 十、Route Handler

路径：

```text
app/api/projects/route.ts
```

示例：

```typescript
export async function GET() {
  return Response.json({
    data: []
  });
}
```

可以处理：

- GET
- POST
- PUT
- PATCH
- DELETE

### 适合 Route Handler 的情况

- 外部系统调用
- Webhook
- Mobile Client
- 明确 REST API
- 第三方集成

不必为了所有内部 Server Component 读取都创建一层 HTTP API。

---

## 十一、Server Functions / Server Actions

概念：

```typescript
"use server";

export async function createProject(formData: FormData) {
  // 1. Authentication
  // 2. Authorization
  // 3. Validation
  // 4. DB mutation
  // 5. Audit
  // 6. Revalidation
}
```

优点：

- 与 Form 集成方便
- 少写一层客户端 fetch glue

但是：

> “运行在服务器”不等于“自动安全”。

仍然必须：

- 验证身份
- 验证权限
- 验证输入
- 限制租户
- 处理错误

---

## 十二、Runtime Validation

TypeScript 只检查开发时类型。

用户可以手工提交：

```json
{
  "name": 123,
  "organizationId": "other-org"
}
```

所以 Server Action / Route Handler 必须做 Runtime Validation。

常用：

- Zod
- Valibot

数据流：

```text
Untrusted Input
↓
Schema Parse
↓
Validated DTO
↓
Business Logic
```

---

## 十三、Loading / Error / Not Found

### loading.tsx

用于路由加载状态。

### error.tsx

用于错误边界。

### not-found.tsx

资源不存在。

商业 SaaS 不应该只有：

```text
Success UI
```

还应该明确：

```text
Loading
Empty
Error
Forbidden
Not Found
Success
```

---

## 十四、Caching：最容易产生“数据库改了页面却没变”的地方

缓存可能存在于多个层：

- Browser
- CDN
- Framework
- Data layer

你需要理解两个问题：

1. 这个数据能否缓存？
2. 数据变化后如何失效？

例如：

### 可缓存较久

- 帮助文档
- 字典
- 公共静态配置

### 更需要新鲜

- Task Status
- Issue
- Permission
- Audit Log

缓存行为会随 Next.js 版本演进，所以遇到具体问题应以当前官方文档为准。

---

## 十五、Revalidation

概念：

```text
Mutation
↓
Database updated
↓
Cache invalidation / revalidation
↓
UI obtains fresh data
```

否则：

```text
DB = 新数据
UI = 旧数据
```

---

## 十六、Search Params

例如：

```text
/projects?status=active&page=2
```

Query String 适合：

- Filter
- Search
- Sort
- Pagination

对于可分享、可返回的后台列表状态，URL 通常比把全部筛选状态只存在 useState 更好。

---

## 十七、Redirect

常见：

```text
Anonymous
↓
/projects
↓
redirect /login
```

但：

> Redirect 是用户体验，不是最终数据权限。

即使页面跳走，数据库/API 仍然需要权限保护。

---

## 十八、Middleware / 请求入口逻辑

适合部分：

- 路由级预处理
- Redirect
- Locale
- 粗粒度认证

不要把全部 Authorization 只放这里。

因为：

- Server Actions 仍需保护
- 数据库访问仍需保护
- RLS 仍需保护

---

## 十九、典型 SaaS 读取流程

```text
Browser GET /projects
↓
Next.js Server Component
↓
getCurrentSession()
↓
resolveCurrentOrganization()
↓
authorize("project.read")
↓
queryProjectsForTenant()
↓
PostgreSQL
↓
Render
↓
Browser
```

---

## 二十、典型 SaaS 写入流程

```text
Form Submit
↓
Server Action
↓
Authentication
↓
Runtime Validation
↓
Authorization
↓
Tenant Scope
↓
Transaction
↓
Database
↓
Audit Log
↓
Revalidate
↓
Response/UI
```

这条链要熟到可以画出来。

---

## 二十一、项目目录建议

```text
app/
components/
features/
lib/
  auth/
  db/
  permissions/
  validation/
  projects/
types/
tests/
```

### components

通用 UI。

### features

业务模块。

### lib

跨模块基础能力。

### tests

测试。

---

## 二十二、常见坏味道

- 所有组件 use client
- 页面直接访问 Service Role
- 把 secret 传给 Client Component
- Mutation 不做 auth
- 直接相信 form 中的 organizationId
- Page 中写 800 行 SQL/业务代码
- 缓存策略不明确
- 数据访问层重复
- 用隐藏按钮代替授权

---

## 二十三、实践任务

实现：

```text
/projects
/projects/[id]
/issues
/dashboard
```

要求：

- 页面默认 Server Component
- Filter 使用 Client Component
- 数据读取放 Data Access Layer
- Mutation 做 Validation
- Loading/Error/Empty 状态齐全
- 不使用真实患者数据

---

## 二十四、本章验收题

能够解释：

- Next.js 与 React 的关系
- App Router
- Page
- Layout
- Dynamic Route
- Server Component
- Client Component
- Server/Client 安全边界
- Route Handler
- Server Action
- Runtime Validation
- Data Fetching
- Cache/Revalidation
- Loading/Error/Not Found
- Data Access Layer
- 为什么 Redirect 不是权限控制

完成后再进入 Supabase。
