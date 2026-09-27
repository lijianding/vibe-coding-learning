# 25 软件工程全生命周期：从问题到产品落地

> 这一章是后续软件工程章节的总地图。目标是建立“产品不是写完代码就结束”的完整认知。

## 参考资料

- SWEBOK / IEEE Computer Society: https://www.computer.org/education/bodies-of-knowledge/software-engineering
- Agile Manifesto: https://agilemanifesto.org/
- Scrum Guide: https://scrumguides.org/scrum-guide.html
- GOV.UK Agile Delivery: https://www.gov.uk/service-manual/agile-delivery
- NIST SSDF: https://csrc.nist.gov/projects/ssdf
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- Google SRE Books: https://sre.google/books/

---

## 一、完整产品生命周期

```text
机会 / 问题
↓
Discovery
↓
产品目标
↓
需求工程
↓
方案探索 / Prototype
↓
架构与非功能需求
↓
Delivery Plan
↓
Implementation
↓
Verification / Validation
↓
UAT
↓
Release Readiness
↓
Go-Live
↓
Operate / Observe
↓
Measure
↓
Iterate
↓
Maintain / Retire
```

每个阶段都有明确的输入、输出和退出条件。

---

## 二、不要把“需求”直接翻译成“功能”

例如客户说：

> 我需要一个项目进度页面。

真正需要先问：

- 为什么现在看不到进度？
- 谁需要看？
- 看完后做什么决策？
- 现有流程在哪里？
- 数据来源是什么？
- 成功指标是什么？

需求分析的目标是从“解决方案表述”退回到“问题与用户需要”。

---

## 三、软件工程的五类约束

任何产品都同时受以下约束：

### Business
- 收益
- 成本
- 时间
- 合同

### User
- 任务
- 易用性
- 可访问性

### Technical
- Existing systems
- Data
- Architecture
- Performance

### Security / Compliance
- Access Control
- Privacy
- Audit
- Retention

### Delivery
- Team
- Skill
- Deadline
- Dependency

所以架构与范围不可能脱离业务做“技术最优”。

---

## 四、Functional Requirement 与 Non-Functional Requirement

### Functional

系统要做什么。

例如：

```text
用户可以创建 Project。
```

### Non-Functional

系统要达到什么质量。

例如：

```text
只有同一 Organization 成员可读取 Project。

Project List p95 响应时间 < 1 秒。

关键写操作必须产生 Audit Log。
```

生产系统失败往往来自忽略 NFR。

---

## 五、Verification 与 Validation

### Verification

> 我们是否正确地构建了规格中要求的东西？

### Validation

> 我们构建的是不是用户真正需要的东西？

测试通过可以证明一部分 Verification。

用户研究、UAT、真实指标则帮助做 Validation。

---

## 六、Artifact Chain

建议项目形成一条可追踪链：

```text
Problem
↓
User Need
↓
Requirement
↓
Acceptance Criteria
↓
Architecture Decision
↓
Implementation
↓
Test Case
↓
Release
↓
Metric
```

这是后续 Traceability 的核心。

---

## 七、阶段 Gate

不是每个阶段都必须开正式会议，但必须能回答：

### Discovery Gate
- 问题值得解决吗？
- 用户是谁？
- 成功怎么衡量？

### Requirement Gate
- Scope 清楚吗？
- NFR 清楚吗？
- Acceptance Criteria 可测试吗？

### Design Gate
- 架构满足 NFR 吗？
- 关键风险有方案吗？

### Release Gate
- 测试通过吗？
- 安全通过吗？
- 可监控吗？
- 可回滚吗？

### Live Gate
- 支持团队准备了吗？
- 指标能观察吗？
- Incident/Restore 流程准备了吗？

---

## 八、Agile 不等于不要文档

敏捷强调：

- 用户价值
- 迭代
- 快速反馈
- 持续计划

不是：

> 什么都不写。

真正有价值的文档应该：

- 帮助决策
- 降低歧义
- 形成追踪
- 支持交接
- 支持审计

---

## 九、Definition of Ready

一个需求进入开发前，至少应满足：

- Problem/Goal 清楚
- Scope 清楚
- Acceptance Criteria 清楚
- Dependencies 已识别
- Data / Permission 已考虑
- Design 足够明确
- Testable

---

## 十、Definition of Done

功能完成至少：

- Code complete
- Review complete
- Tests pass
- Security concerns handled
- Documentation updated
- Monitoring added where needed
- Acceptance Criteria satisfied

“开发说写完了”不是 Done。

---

## 十一、毕业项目如何使用本流程

Medical Implementation SaaS：

```text
Discovery:
医院实施项目协作的问题是什么？

Requirements:
哪些角色需要哪些能力？

Architecture:
Multi-Tenant + RLS 怎么设计？

Delivery:
按 Milestone 实现。

Validation:
让模拟用户完成关键任务。

Go-Live:
跑 Production Checklist。

Live:
持续看错误、性能、使用率和反馈。
```

---

## 十二、本章验收

你应该能解释：

- Discovery
- Requirement
- NFR
- Verification
- Validation
- Traceability
- Stage Gate
- Definition of Ready
- Definition of Done
- 为什么“上线”不是项目结束
