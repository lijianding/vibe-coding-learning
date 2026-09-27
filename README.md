# Vibe Coding → 商用 SaaS 完整自学教材

这是一个面向 **医疗软件实施工程师 / 项目经理** 的系统化自学仓库。

现在仓库已经包含两条完整主线：

```text
技术能力
+
软件工程 / 产品落地能力
```

技术主线解决：

> 怎么写软件？

软件工程主线解决：

> 为什么做、做什么、如何验证需求、怎么设计、怎么组织交付、怎么上线、怎么持续改进？

---

# 总学习地图

```text
Web / Programming Fundamentals
↓
Full-stack SaaS Stack
↓
Security / Testing / Production
↓
Software Architecture
↓
Product Discovery
↓
Requirements Engineering
↓
Product Design
↓
Architecture / NFR
↓
Planning / Risk
↓
Delivery / Change
↓
QA / UAT
↓
Release / Go-Live
↓
Metrics / Feedback
↓
Maintenance / Retirement
```

---

# 技术课程

## 第一阶段：软件开发基础

1. [Vibe Coding 工作流](docs/01-vibe-coding-workflow.md)
2. [开发环境](docs/02-development-environment.md)
3. [Web 基础原理](docs/03-web-fundamentals.md)
4. [HTML / CSS](docs/04-html-css.md)
5. [JavaScript](docs/05-javascript.md)
6. [TypeScript](docs/06-typescript.md)
7. [Git 与 GitHub](docs/07-git-github.md)
8. [HTTP / REST API / JSON](docs/08-http-api.md)

## 第二阶段：全栈 SaaS

9. [PostgreSQL 与数据库设计](docs/09-postgresql-database-design.md)
10. [React](docs/10-react.md)
11. [Next.js](docs/11-nextjs.md)
12. [Supabase / Auth / Storage / CRUD](docs/12-supabase-auth-crud.md)
13. [RBAC / Multi-Tenant / RLS / Audit](docs/13-rbac-multitenant-rls-audit.md)

## 第三阶段：工程质量

14. [Testing 与 Web Security](docs/14-testing-security.md)
15. [Production Engineering](docs/15-production-engineering.md)
16. [毕业项目：Medical Implementation SaaS](docs/16-capstone-project.md)
17. [AI Coding Prompt 手册](docs/17-ai-prompts.md)
18. [Production Readiness Checklist](docs/18-production-checklist.md)

## 第四阶段：商用能力

19. [Node.js 与运行时](docs/19-nodejs-runtime.md)
20. [软件架构](docs/20-software-architecture.md)
21. [Web 性能](docs/21-performance.md)
22. [SaaS 商业化](docs/22-saas-commercialization.md)
23. [医疗 SaaS 合规基础](docs/23-healthcare-compliance-foundations.md)
24. [术语表与知识索引](docs/24-glossary-and-index.md)

---

# 软件工程：从需求分析到产品落地

专门入口：

[SOFTWARE-ENGINEERING.md](SOFTWARE-ENGINEERING.md)

## 第五阶段：完整软件工程生命周期

25. [软件工程全生命周期](docs/25-software-engineering-lifecycle.md)
26. [产品发现与问题定义](docs/26-product-discovery.md)
27. [需求工程](docs/27-requirements-engineering.md)
28. [产品设计与原型验证](docs/28-product-design-prototyping.md)
29. [架构设计与非功能需求](docs/29-architecture-and-nfr.md)
30. [计划、估算、依赖与风险](docs/30-planning-estimation-risk.md)
31. [研发交付与变更管理](docs/31-delivery-change-management.md)
32. [质量保证与 UAT](docs/32-quality-assurance-uat.md)
33. [Release、Go-Live 与运营交接](docs/33-release-go-live-operations.md)
34. [产品指标、反馈与持续迭代](docs/34-product-metrics-feedback-iteration.md)
35. [维护、治理与产品退役](docs/35-maintenance-retirement-governance.md)

---

# 软件工程模板包

[templates/software-engineering/README.md](templates/software-engineering/README.md)

包含 20 套可直接复用模板：

- Product Vision
- Discovery Plan
- Problem Statement
- PRD
- SRS
- User Story
- NFR Checklist
- Architecture Design Spec
- ADR
- Risk Register
- Change Request
- Traceability Matrix
- Test Plan
- UAT Plan
- Release / Go-Live Plan
- Product Metrics Plan
- Runbook
- Incident Postmortem
- Retirement Plan
- Definition of Ready / Done

---

# 完整案例

[Project Archive：从问题到上线完整案例](examples/software-engineering-project-flow.md)

这份案例把下面流程真正串起来：

```text
Problem
↓
User Need
↓
User Story
↓
Functional Requirement
↓
NFR
↓
Data / Architecture
↓
Permission
↓
Implementation
↓
Testing
↓
UAT
↓
Release
↓
Monitoring
↓
Outcome
```

---

# 实践与实验

- [实践总路线](PRACTICE.md)
- [Labs 实验中心](labs/README.md)
- [毕业项目实施手册](projects/medical-implementation-saas/README.md)

学习顺序：

```text
读教材
→ 做实验
→ 做需求/架构/测试文档
→ AI 辅助实现
→ Review
→ UAT
→ Release
→ Observe
→ Iterate
```

---

# 官方源资料

[SOURCES.md](SOURCES.md)

资料来源包含：

- IEEE / SWEBOK
- Agile Manifesto
- Scrum Guide
- GOV.UK Service Manual
- NIST SSDF
- OWASP
- Google SRE
- GitHub
- MDN
- TypeScript
- Node.js
- PostgreSQL
- React
- Next.js
- Supabase
- Docker
- Stripe
- HHS

---

# 推荐技术栈

| 层 | 技术 |
|---|---|
| AI Coding | Cursor + ChatGPT |
| Language | TypeScript |
| Runtime | Node.js |
| Frontend | React |
| Full Stack | Next.js |
| UI | Tailwind CSS + Component Library |
| Database | PostgreSQL |
| BaaS | Supabase |
| Authentication | Supabase Auth |
| Storage | Supabase Storage / S3 |
| Version Control | Git + GitHub |
| Unit Test | Vitest |
| E2E | Playwright |
| Container | Docker |
| CI/CD | GitHub Actions |
| Deployment | Vercel |
| Monitoring | Sentry / Platform Logs |

---

# 贯穿实战项目

## Medical Implementation SaaS

功能：

- Organization
- Users / Members
- Projects
- Tasks
- Requirements
- Issues
- Milestones
- Comments
- Attachments
- Dashboard
- RBAC
- Multi-Tenant
- RLS
- Audit Log
- Notification
- Plans / Subscription

学习阶段不保存真实患者临床数据。

---

# 最终能力目标

完成整套路线后，你应能够独立完成：

```text
发现真实问题
↓
用户研究
↓
需求定义
↓
PRD/SRS
↓
NFR
↓
架构
↓
风险与计划
↓
研发
↓
测试
↓
UAT
↓
Go-Live
↓
监控
↓
指标
↓
迭代
↓
维护/退役
```

并且能借助 AI Coding Agent 高效实现，而不是把产品决策和工程责任完全交给 AI。

---

# 学习原则

> AI 可以帮你高效地“写”，但你必须学会决定“为什么写、写什么、如何证明它正确、是否能安全上线，以及上线后是否真的产生价值”。
