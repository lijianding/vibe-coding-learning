# Hands-on Labs：可运行实验区

> 教材负责解释“是什么、为什么”；Labs 负责让你亲手验证“它到底怎么工作”。

## 使用原则

每个 Lab 都按下面顺序：

```text
阅读对应章节
↓
运行示例
↓
先做 exercises
↓
自己调试
↓
最后再看 solutions
↓
修改实验
↓
Git Commit
```

不要先看答案。

---

## 实验目录

### Lab 01 — JavaScript
对应：
[05 JavaScript](../docs/05-javascript.md)

路径：
`01-javascript/`

重点：

- object / array
- map / filter / find
- function
- async / await
- Promise
- error handling
- mutation / immutability

运行：

```bash
cd labs/01-javascript
node 01-basics.js
node 02-arrays.js
node 03-async.js
node exercises.js
```

---

### Lab 02 — TypeScript
对应：
[06 TypeScript](../docs/06-typescript.md)

路径：
`02-typescript/`

重点：

- interface
- union
- optional / null
- narrowing
- generic
- unknown
- discriminated union

运行：

```bash
cd labs/02-typescript
npm install
npm run check
npm run start
```

---

### Lab 03 — PostgreSQL
对应：
[09 PostgreSQL](../docs/09-postgresql-database-design.md)

路径：
`03-postgresql/`

重点：

- schema
- PK/FK
- constraint
- index
- transaction
- tenant
- query
- EXPLAIN

使用本地 PostgreSQL、Supabase SQL Editor 或其他练习数据库。

不要在生产数据库运行练习 SQL。

---

### Lab 04 — React Dashboard
对应：
[10 React](../docs/10-react.md)

路径：
`04-react-dashboard/`

一个可以运行的 Vite + React 小项目。

---

### Lab 05 — Next.js Project Console
对应：
[11 Next.js](../docs/11-nextjs.md)

路径：
`05-nextjs-project-console/`

学习：

- App Router
- Server Component
- Client Component
- Route
- Search Params
- Data Access Layer

---

### Lab 06 — Supabase Multi-Tenant
对应：
[12 Supabase](../docs/12-supabase-auth-crud.md)
[13 Authorization](../docs/13-rbac-multitenant-rls-audit.md)

路径：
`06-supabase-multitenant/`

重点：

- organizations
- memberships
- projects
- RLS
- tenant isolation tests

---

## 学习进度

使用：

[LEARNING-CHECKLIST.md](LEARNING-CHECKLIST.md)

每完成一项自己打勾，并提交 Git：

```bash
git add .
git commit -m "learn: complete javascript array exercises"
```

## 最重要的规则

答案的价值不是“看懂”。

真正有效的是：

> 先预测输出 → 再运行 → 再解释原因 → 再自己修改。
