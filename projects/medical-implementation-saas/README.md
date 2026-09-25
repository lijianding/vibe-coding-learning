# Medical Implementation SaaS：毕业项目实施手册

教材规格：

- docs/16-capstone-project.md

上线检查：

- docs/18-production-checklist.md

目标：

> 按软件工程步骤完成，而不是一次让 AI 生成整个项目。

---

## Milestone 0：初始化

建立：

- Next.js
- TypeScript
- Git
- lint
- README
- .env.example

验收：

```bash
npm run dev
npm run build
```

Commit：

```text
chore: initialize medical implementation saas
```

---

## Milestone 1：静态 UI

页面：

```text
/login
/dashboard
/projects
/projects/[id]
```

使用 fake data。

UI 状态：

- loading
- empty
- error
- success

---

## Milestone 2：Database

先设计：

- organizations
- profiles
- organization_members
- projects

要求：

- PK
- FK
- unique
- check
- indexes
- migration

先 Review SQL，再执行。

---

## Milestone 3：Authentication

实现：

- login
- logout
- session
- protected routes

测试：

- anonymous denied
- authenticated allowed

---

## Milestone 4：Project CRUD

- list
- detail
- create
- update
- archive

必须：

- runtime validation
- error model
- pagination
- tenant field

---

## Milestone 5：Multi-Tenant

Seed：

```text
Org A
Admin A

Org B
Admin B
```

测试：

```text
A cannot SELECT B
A cannot UPDATE B
A cannot DELETE B
```

不通过则停止继续。

---

## Milestone 6：RBAC

角色：

- org_admin
- project_manager
- engineer
- customer

先做 Permission Matrix，再编码。

---

## Milestone 7：RLS

为业务表建立：

- SELECT
- INSERT
- UPDATE
- DELETE

Allow 与 Deny Case 都要测试。

---

## Milestone 8：Task + Issue

实现：

- status
- priority
- assignee
- due date
- filter

---

## Milestone 9：Audit Log

记录：

- project mutation
- role change
- issue status

普通业务用户禁止修改 Audit。

---

## Milestone 10：Storage

- private bucket
- upload
- signed URL
- tenant isolation

---

## Milestone 11：Tests

最低：

- Unit
- Integration
- E2E
- Permission deny
- Cross-tenant

---

## Milestone 12：Security

测试：

- IDOR/BOLA
- Mass Assignment
- XSS
- CSRF
- SSRF
- Secret
- File Access

---

## Milestone 13：CI/CD

PR 自动：

- lint
- typecheck
- test
- build

main Branch Protection。

---

## Milestone 14：Staging

使用独立：

- DB
- Auth
- Storage
- Env

不要共用 Production 数据。

---

## Milestone 15：Production

运行：

`docs/18-production-checklist.md`

存在 Critical Blocker 不上线。

---

## Milestone 16：Monitoring / Backup / Restore

必须实际完成：

```text
backup
↓
delete test data
↓
restore
↓
verify
```

---

## 每个 Milestone 的固定 Prompt

```text
先阅读仓库，不修改代码。

我要完成 Milestone X。

请输出：
1. Current state
2. Gap
3. Minimal implementation plan
4. Files
5. Data changes
6. Auth changes
7. Tenant impact
8. Tests
9. Risks
10. Acceptance criteria

我确认计划后再实现。
```

---

## 每个 Milestone 的 Definition of Done

- [ ] Requirement clear
- [ ] Acceptance criteria
- [ ] Minimal diff
- [ ] Validation
- [ ] AuthN/AuthZ
- [ ] Tenant check
- [ ] Tests
- [ ] lint
- [ ] typecheck
- [ ] build
- [ ] git diff reviewed
- [ ] commit
- [ ] docs updated
