# Vibe Coding → 商用 SaaS 学习仓库

这是一套面向 **医疗软件实施工程师 / 项目经理** 的实践型学习资料。

目标不是先成为传统全栈程序员，而是建立以下能力：

- 能理解 Web 系统的基本运行原理
- 能看懂并修改 AI 生成的代码
- 能用 AI Coding Agent 拆解、实现和测试功能
- 能设计数据库、权限、多租户和审计日志
- 能把一个系统部署到生产环境
- 能判断一个 Demo 与“可商用 SaaS”之间的差距
- 能基于真实业务需求持续迭代产品

---

## 一、推荐技术栈

| 层级 | 技术 |
|---|---|
| AI Coding | Cursor + ChatGPT |
| 主语言 | TypeScript |
| 前端 | React |
| 全栈框架 | Next.js |
| UI | Tailwind CSS + 组件库 |
| 数据库 | PostgreSQL |
| BaaS | Supabase |
| Auth | Supabase Auth |
| 文件 | Supabase Storage / S3 |
| 版本管理 | Git + GitHub |
| 单元测试 | Vitest |
| E2E 测试 | Playwright |
| 容器 | Docker |
| CI/CD | GitHub Actions |
| 部署 | Vercel |
| 监控 | Sentry / 平台日志 |

---

## 二、贯穿整个学习过程的实战项目

### Medical Implementation SaaS

用于管理医疗软件实施项目，不保存真实患者病历。

核心模块：

- Organization / 医院
- 用户与组织成员
- 项目
- 项目成员
- 任务
- 需求单
- 问题单
- 里程碑
- 评论
- 附件
- Dashboard
- RBAC
- Multi-Tenant
- RLS
- Audit Log
- Notification
- SaaS 套餐与订阅基础

> 学习阶段只使用模拟数据。不要在仓库中存放真实患者姓名、身份证件、电话号码、病历、处方、检验检查结果或其他敏感医疗信息。

---

## 三、学习顺序

请严格按照下面顺序推进，不需要按周或按月。

1. [学习方法与 Vibe Coding 工作流](docs/01-vibe-coding-workflow.md)
2. [开发环境搭建](docs/02-development-environment.md)
3. [Web 基础原理](docs/03-web-fundamentals.md)
4. [HTML / CSS 最小必需知识](docs/04-html-css.md)
5. [JavaScript 基础](docs/05-javascript.md)
6. [TypeScript 基础](docs/06-typescript.md)
7. [Git 与 GitHub](docs/07-git-github.md)
8. [HTTP / REST API / JSON](docs/08-http-api.md)
9. [PostgreSQL 与数据库设计](docs/09-postgresql-database-design.md)
10. [React 基础](docs/10-react.md)
11. [Next.js 全栈开发](docs/11-nextjs.md)
12. [Supabase、CRUD 与 Authentication](docs/12-supabase-auth-crud.md)
13. [RBAC、多租户、RLS 与审计日志](docs/13-rbac-multitenant-rls-audit.md)
14. [测试与 Web 安全](docs/14-testing-security.md)
15. [Docker、部署、CI/CD、监控与备份](docs/15-production-engineering.md)
16. [毕业项目：Medical Implementation SaaS](docs/16-capstone-project.md)
17. [AI Coding Prompt 模板](docs/17-ai-prompts.md)
18. [商用 SaaS 上线检查表](docs/18-production-checklist.md)

---

## 四、学习方法

每一章都按照以下流程学习：

```text
阅读概念
↓
理解代码
↓
完成小练习
↓
让 AI 辅助实现
↓
自己运行程序
↓
查看错误
↓
让 AI 解释错误
↓
查看 git diff
↓
运行测试
↓
Git Commit
↓
进入下一章
```

### 不追求“默写代码”

看到 AI 生成的代码时，优先回答：

1. 这段代码做什么？
2. 输入是什么？
3. 输出是什么？
4. 数据从哪里来？
5. 数据去了哪里？
6. 谁可以执行？
7. 什么情况下会失败？
8. 出错后怎么处理？
9. 有没有测试？
10. 有没有权限或安全风险？

只要你能越来越准确地回答这些问题，就在真正掌握软件开发。

---

## 五、推荐 Commit 方式

每完成一个独立功能就提交：

```bash
git add .
git commit -m "feat: add project list"
```

常见前缀：

```text
feat: 新功能
fix: Bug 修复
docs: 文档
test: 测试
refactor: 重构
chore: 工程配置
```

不要让 AI 连续修改大量功能后再一次提交。

---

## 六、官方学习资源

优先使用官方资料：

- MDN Web Docs: https://developer.mozilla.org/
- JavaScript Guide: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
- Git Book: https://git-scm.com/book/
- GitHub Docs: https://docs.github.com/
- PostgreSQL Tutorial: https://www.postgresql.org/docs/current/tutorial.html
- React Learn: https://react.dev/learn
- Next.js Docs: https://nextjs.org/docs
- Next.js Learn: https://nextjs.org/learn
- Supabase Docs: https://supabase.com/docs
- Vitest: https://vitest.dev/guide/
- Playwright: https://playwright.dev/docs/intro
- Docker: https://docs.docker.com/get-started/
- GitHub Actions: https://docs.github.com/actions
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/

---

## 七、最终能力目标

完成整套路线后，你应该能够：

- 从业务需求拆出系统功能
- 设计基础数据库
- 编写和理解基本 TypeScript
- 理解 React / Next.js 项目结构
- 创建 API 和 CRUD
- 设计 Authentication 与 Authorization
- 实现 RBAC
- 实现多租户数据隔离
- 使用 PostgreSQL RLS
- 建立 Audit Log
- 写基础 Unit / Integration / E2E Test
- 使用 Git 与 GitHub 管理版本
- 使用 Docker
- 配置 CI/CD
- 部署 Production
- 处理日志、监控、备份和恢复
- 使用安全检查清单进行上线前审查

---

## 八、重要原则

> **AI 可以负责大量“写代码”，但需求、架构、权限、安全、验收和上线责任必须由人掌握。**

本仓库会随着你的学习持续补充和升级。
