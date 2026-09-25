# 实践路线：从“看懂”到“会做”

本仓库现在采用四层学习结构：

```text
教材正文 docs/
↓
可运行实验 labs/
↓
练习与参考答案
↓
毕业项目 projects/
```

## 学习规则

每一章按下面顺序：

1. 阅读对应 `docs/` 教材。
2. 进入对应 `labs/`。
3. 先做练习，不看答案。
4. 运行代码并观察结果。
5. 主动制造错误，再自己排查。
6. 对照参考答案。
7. 用 Git Commit 保存学习成果。
8. 完成章节验收后进入下一章。

---

# 实验路线

## Lab 00：HTML/CSS Dashboard

路径：

`labs/00-html-css-dashboard/`

对应：

- Web 基础
- HTML/CSS

目标：

- semantic HTML
- flex
- grid
- responsive
- table/form
- accessibility basics

---

## Lab 01：JavaScript

路径：

`labs/01-javascript/`

目标：

- 变量
- object/array
- map/filter/find
- some/every/reduce
- function
- async/await
- error handling

---

## Lab 02：TypeScript

路径：

`labs/02-typescript/`

目标：

- interface
- union
- narrowing
- generic
- unknown
- strict mode

---

## Lab 03：PostgreSQL

路径：

`labs/03-postgresql/`

目标：

- schema
- seed
- query
- FK
- constraint
- index
- aggregation
- tenant-aware data model

---

## Lab 04：React Dashboard

路径：

`labs/04-react-dashboard/`

目标：

- component
- props
- state
- event
- filter
- controlled form
- render states

---

## Lab 05：Next.js Project Console

路径：

`labs/05-nextjs-project-console/`

目标：

- App Router
- Server Component
- Client Component
- Route
- data access
- form mutation
- loading/error

---

## Lab 06：Supabase Multi-Tenant

路径：

`labs/06-supabase-multitenant/`

目标：

- multi-tenant schema
- RLS
- policies
- allow/deny cases
- cross-tenant tests

---

## Lab 07：HTTP API

路径：

`labs/07-http-api/`

目标：

- Request/Response
- Method
- URL
- Status
- JSON
- validation
- error contract

---

## Lab 08：Testing + Security

路径：

`labs/08-testing-security/`

目标：

- unit test
- permission tests
- deny cases
- cross-tenant cases
- IDOR
- mass assignment
- XSS thinking

---

## Lab 09：Production Engineering

路径：

`labs/09-production-engineering/`

目标：

- Dockerfile
- CI
- backup/restore
- incident runbook
- production thinking

---

# 毕业项目

路径：

`projects/medical-implementation-saas/`

项目采用 Milestone 方式实现：

```text
Initialize
↓
Static UI
↓
Database
↓
Authentication
↓
CRUD
↓
Multi-Tenant
↓
RBAC
↓
RLS
↓
Task/Issue
↓
Audit
↓
Storage
↓
Testing
↓
Security
↓
CI/CD
↓
Staging
↓
Production
↓
Monitoring/Restore
```

---

# 每次实验的 Git 流程

```bash
git status
git diff
git add .
git commit -m "learn: complete lab xx"
```

每个 Lab 独立 Commit。

---

# 自我验收标准

不要只问：

> 我看懂了吗？

而要问：

- 我能运行吗？
- 我能改吗？
- 我能解释为什么吗？
- 我能制造一个错误并修复吗？
- 我能写测试证明它正确吗？
- 我能指出安全边界吗？

满足这些，才算真正掌握。
