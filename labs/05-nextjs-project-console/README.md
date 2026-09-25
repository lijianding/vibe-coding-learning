# Lab 05 — Next.js Project Console

对应：
[Next.js 教材](../../docs/11-nextjs.md)

## 官方资料

- App Router: https://nextjs.org/docs/app
- Server/Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers

## 运行

```bash
cd labs/05-nextjs-project-console
npm install
npm run dev
```

打开：

```text
/
 /projects
 /api/projects
```

## 观察重点

### app/projects/page.tsx

Server Component：

- 没有 use client
- 服务端调用 Data Access Layer
- 把数据传给 Client Component

### components/project-filter.tsx

Client Component：

- useState
- Event Handler
- 本地交互筛选

### lib/projects.ts

模拟 Data Access Layer。

### app/api/projects/route.ts

Route Handler。

## 必做练习

1. 添加 `/projects/[id]`。
2. 添加 search query。
3. 把 org-a 改成一个模拟 `getCurrentOrganization()`。
4. 明确解释：为什么不能让 Browser 直接传 organizationId 并信任它？
5. 添加 Loading / Not Found。
6. 添加一个 Create Project Server Action 草案。
7. Server Action 中列出：
   - Authentication
   - Validation
   - Authorization
   - Tenant
   - Audit
8. 运行：
```bash
npm run typecheck
npm run build
```
