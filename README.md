# Vibe Coding → 商用 SaaS 完整自学教材

这是一个面向 **医疗软件实施工程师 / 项目经理** 的系统化自学仓库。

目标不是让你只学会“让 AI 生成页面”，而是从零建立：

```text
Web 基础
→ JavaScript / TypeScript
→ Git
→ HTTP/API
→ PostgreSQL
→ React
→ Next.js
→ Supabase
→ Auth / RBAC / Multi-Tenant / RLS
→ Testing / Security
→ Architecture
→ Docker / CI/CD / Production
→ Performance
→ SaaS Commercialization
→ Healthcare Compliance Foundations
→ 完整商用 SaaS 实战
```

---

## 学习目标

完成后，你应该能够借助 AI Coding Agent：

- 阅读和修改真实项目代码
- 设计 SaaS 数据库
- 设计 API
- 完成 React / Next.js 全栈功能
- 实现 Authentication / Authorization
- 实现 Multi-Tenant 与 RLS
- 建立 Audit Log
- 写 Unit / Integration / E2E Test
- 做基本 Security Review
- 使用 Docker / GitHub Actions
- 部署 Staging / Production
- 做 Monitoring / Backup / Restore
- 分析性能
- 设计 Plan / Subscription / Entitlement
- 理解医疗 SaaS 的数据与合规边界

---

# 课程目录

## 第一阶段：软件开发基础

1. [Vibe Coding 工作流](docs/01-vibe-coding-workflow.md)
2. [开发环境](docs/02-development-environment.md)
3. [Web 基础原理](docs/03-web-fundamentals.md)
4. [HTML / CSS](docs/04-html-css.md)
5. [JavaScript](docs/05-javascript.md)
6. [TypeScript](docs/06-typescript.md)
7. [Git 与 GitHub](docs/07-git-github.md)
8. [HTTP / REST API / JSON](docs/08-http-api.md)

## 第二阶段：全栈 SaaS 主技术栈

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

## 第四阶段：补齐真实商用能力

19. [Node.js 与运行时](docs/19-nodejs-runtime.md)
20. [软件架构](docs/20-software-architecture.md)
21. [Web 性能](docs/21-performance.md)
22. [SaaS 商业化](docs/22-saas-commercialization.md)
23. [医疗 SaaS 合规基础](docs/23-healthcare-compliance-foundations.md)
24. [术语表与知识索引](docs/24-glossary-and-index.md)

---

# 官方源资料总索引

查看：

[SOURCES.md](SOURCES.md)

这里集中包含：

- MDN
- TypeScript
- Node.js
- Git/GitHub
- PostgreSQL
- React
- Next.js
- Supabase
- Vitest
- Playwright
- OWASP
- NIST
- Docker
- Vercel
- Stripe
- HHS

所有章节也在正文开头或结尾直接附带官方源链接。

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

功能包括：

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

# 每章学习方法

建议固定执行：

```text
阅读教材
↓
理解概念
↓
手工完成最小练习
↓
用 AI 辅助扩展
↓
运行代码
↓
查看错误
↓
看 git diff
↓
运行测试
↓
Review
↓
Commit
↓
完成章节验收
```

不要只“看懂”。

必须做到：

> 能运行、能修改、能解释、能测试。

---

# AI 代码阅读的 10 个问题

看到任何 AI 代码，都问：

1. 它解决什么需求？
2. 输入是什么？
3. 输出是什么？
4. 数据从哪里来？
5. 数据写到哪里？
6. 当前用户是谁？
7. 权限在哪里判断？
8. 什么情况下失败？
9. 有哪些测试？
10. 有哪些安全风险？

---

# 商用 SaaS 的最低工程边界

页面能打开远远不够。

至少需要：

- Authentication
- Authorization
- Tenant Isolation
- Validation
- Audit
- Error Handling
- Tests
- Security
- Migration
- Monitoring
- Backup
- Restore
- Rollback
- CI/CD
- Privacy
- Support

详见：
[Production Readiness Checklist](docs/18-production-checklist.md)

---

# 完成课程后的能力验收

你应该能够独立解释并实现：

- Browser → HTTP → Server → DB 的数据流
- JavaScript Promise / async-await
- TypeScript 类型系统
- Git Branch / PR / Diff / Revert
- REST API
- PostgreSQL Constraint / Index / Transaction / MVCC
- React Props / State / Effect
- Next.js Server / Client Boundary
- Supabase Auth / Storage
- RBAC
- Multi-Tenant
- RLS
- Audit Log
- Unit / Integration / E2E
- OWASP 核心风险
- Docker
- GitHub Actions
- Monitoring
- Backup / RPO / RTO
- Architecture Layering
- Performance Diagnosis
- SaaS Subscription Lifecycle
- Healthcare Data Boundary

---

# 重要提醒

本仓库是学习资料和工程实践指南，不等同于：

- 法律意见
- 合规认证
- 安全审计报告
- 医疗器械监管结论

涉及真实患者数据、临床决策、处方、诊断、医疗器械功能时，需要进一步做专项合规与安全评估。

---

# 学习原则

> AI 可以帮你高效地“写”，但你必须学会判断“写得对不对、安不安全、能不能上线”。


---

# 实践与实验

除了教材正文，本仓库还包含可运行实验和毕业项目：

- [实践总路线](PRACTICE.md)
- [Labs 实验中心](labs/README.md)
- [毕业项目实施手册](projects/medical-implementation-saas/README.md)

推荐顺序：

```text
读 docs
→ 做 labs
→ 完成 exercises
→ 对照 solutions
→ Git Commit
→ 再进入下一章
```

真正掌握的标准不是“看懂”，而是：

> 能运行、能修改、能解释、能测试、能发现安全边界。
