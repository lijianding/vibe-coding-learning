# Labs：可运行实验中心

这里不是代码展示区，而是课程的“实验室”。

学习顺序：

```text
docs 教材
↓
labs 实验
↓
exercises
↓
solution
↓
自己修改
↓
测试
↓
Commit
```

## 实验目录

| Lab | 内容 | 对应教材 |
|---|---|---|
| 00 | HTML/CSS Dashboard | 03-04 |
| 01 | JavaScript | 05 |
| 02 | TypeScript | 06 |
| 03 | PostgreSQL | 09 |
| 04 | React Dashboard | 10 |
| 05 | Next.js Project Console | 11 |
| 06 | Supabase Multi-Tenant | 12-13 |
| 07 | HTTP API | 03/08/19 |
| 08 | Testing + Security | 13-14 |
| 09 | Production Engineering | 15/18 |

---

## Lab 00

`00-html-css-dashboard/`

静态后台页面。

学习：

- semantic HTML
- flex/grid
- responsive
- form/table

---

## Lab 01

`01-javascript/`

包含：

- basics
- arrays
- async
- exercises
- solutions

运行：

```bash
node 01-basics.js
node 02-arrays.js
node 03-async.js
```

---

## Lab 02

`02-typescript/`

安装：

```bash
npm install
```

然后根据 README 完成 TypeScript 类型实验。

---

## Lab 03

`03-postgresql/`

包含：

- schema
- seed
- queries
- exercises
- solutions

重点是“设计数据库”，不只是写 SELECT。

---

## Lab 04

`04-react-dashboard/`

真正运行 React UI。

重点：

- Props
- State
- Events
- Filters
- Component boundaries

---

## Lab 05

`05-nextjs-project-console/`

学习 Next.js 全栈边界。

重点：

- Server Component
- Client Component
- Routing
- Data Layer

---

## Lab 06

`06-supabase-multitenant/`

这是 SaaS 安全核心实验。

一定完成：

- Org A
- Org B
- SELECT deny
- UPDATE deny
- DELETE deny
- RLS policies

---

## Lab 07

`07-http-api/`

不用 Framework，从 Node 原生 HTTP 开始理解 API。

包含：

- starter
- exercises
- solution

---

## Lab 08

`08-testing-security/`

运行：

```bash
npm install
npm test
```

重点：

- allow test
- deny test
- cross-tenant test

---

## Lab 09

`09-production-engineering/`

模板：

- Dockerfile
- GitHub Actions
- Restore Drill
- Incident Runbook

注意：

`ci-example.yml` 是教学模板，不会自动启用 Workflow。

---

# 学习检查

总检查表：

`LEARNING-CHECKLIST.md`

毕业项目：

`../projects/medical-implementation-saas/README.md`

实践总路线：

`../PRACTICE.md`
