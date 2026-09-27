# 实践路线：从“看懂”到“完整交付产品”

仓库实践已经扩展为五层：

```text
教材 docs/
↓
实验 labs/
↓
软件工程模板 templates/
↓
完整案例 examples/
↓
毕业项目 projects/
```

---

# 技术实践

实验中心：

[labs/README.md](labs/README.md)

包含：

- HTML/CSS
- JavaScript
- TypeScript
- PostgreSQL
- React
- Next.js
- Supabase / RLS
- HTTP API
- Testing / Security
- Production Engineering

---

# 软件工程实践

入口：

[SOFTWARE-ENGINEERING.md](SOFTWARE-ENGINEERING.md)

学习一个真实 Feature 时，不要直接 Coding。

使用：

```text
Problem Statement
↓
User Need
↓
User Story
↓
Acceptance Criteria
↓
Functional / Non-Functional Requirements
↓
Architecture / Data / Permission
↓
Risk / Plan
↓
Implementation
↓
Test
↓
UAT
↓
Release
↓
Metric
```

模板：

[templates/software-engineering/README.md](templates/software-engineering/README.md)

---

# 推荐完整练习

选择毕业项目中的一个 Feature，例如：

```text
Archive Project
```

然后严格完成：

1. Problem Statement
2. User Story
3. Acceptance Criteria
4. SRS Requirements
5. NFR
6. Architecture Impact
7. ADR
8. Risk Register
9. Implementation Plan
10. AI Coding
11. Tests
12. Traceability
13. UAT
14. Go-Live Plan
15. Metrics

参考完整案例：

[examples/software-engineering-project-flow.md](examples/software-engineering-project-flow.md)

---

# 毕业项目

[projects/medical-implementation-saas/README.md](projects/medical-implementation-saas/README.md)

不要一次生成整个系统。

按 Milestone 做：

```text
Discovery
↓
Product Definition
↓
Architecture
↓
Initialize
↓
Database
↓
Auth
↓
CRUD
↓
Multi-Tenant
↓
RBAC/RLS
↓
Business Modules
↓
Tests
↓
UAT
↓
CI/CD
↓
Go-Live
↓
Operate
↓
Measure
```

---

# 每个 Feature 的 Git 流程

```bash
git switch -c feat/feature-name
git status
git diff
git add .
git commit -m "feat: implement feature name"
```

PR 前必须：

- Acceptance Criteria checked
- Tests passed
- Security/tenant reviewed
- Documentation updated

---

# 真正掌握的标准

不是：

> 我看懂这章了。

而是：

- 我能解释 Problem 吗？
- 我能写可测试 Requirement 吗？
- 我能设计 NFR 吗？
- 我能说明架构取舍吗？
- 我能识别 Risk 吗？
- 我能实现吗？
- 我能写 Allow/Deny Tests 吗？
- 我能组织 UAT 吗？
- 我能准备 Go-Live/Rollback 吗？
- 我能定义上线后的 Outcome Metric 吗？

做到这些，才真正从“会写代码”进入“会交付产品”。
