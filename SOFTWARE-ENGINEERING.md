# 软件工程：从需求分析到产品落地

这是仓库新增的软件工程主路线。

技术学习解决：

> 怎么写软件？

软件工程路线解决：

> 为什么做、做什么、怎么设计、怎么组织开发、怎么证明正确、怎么上线、怎么持续改进？

---

## 生命周期

```text
Discovery
↓
Requirements
↓
Product Design
↓
Architecture / NFR
↓
Planning / Risk
↓
Delivery
↓
QA / UAT
↓
Release / Go-Live
↓
Operations
↓
Metrics / Feedback
↓
Maintenance / Retirement
```

---

## 教材

1. [25 软件工程全生命周期](docs/25-software-engineering-lifecycle.md)
2. [26 产品发现与问题定义](docs/26-product-discovery.md)
3. [27 需求工程](docs/27-requirements-engineering.md)
4. [28 产品设计与原型验证](docs/28-product-design-prototyping.md)
5. [29 架构设计与 NFR](docs/29-architecture-and-nfr.md)
6. [30 计划、估算、依赖与风险](docs/30-planning-estimation-risk.md)
7. [31 研发交付与变更管理](docs/31-delivery-change-management.md)
8. [32 QA 与 UAT](docs/32-quality-assurance-uat.md)
9. [33 Release / Go-Live / Operations](docs/33-release-go-live-operations.md)
10. [34 产品指标、反馈与迭代](docs/34-product-metrics-feedback-iteration.md)
11. [35 维护、治理与退役](docs/35-maintenance-retirement-governance.md)

---

## 模板

完整模板入口：

[Software Engineering Templates](templates/software-engineering/README.md)

包括：

- Product Vision
- Discovery Plan
- Problem Statement
- PRD
- SRS
- User Story
- NFR Checklist
- Architecture Spec
- ADR
- Risk Register
- Change Request
- Traceability Matrix
- Test Plan
- UAT Plan
- Go-Live Plan
- Product Metrics Plan
- Runbook
- Incident Postmortem
- Retirement Plan
- Definition of Ready / Done

---

## 完整案例

[Project Archive：需求到上线案例](examples/software-engineering-project-flow.md)

建议先读完 25–35，再阅读这个案例，看各类文档如何互相串联。

---

## 推荐实践方式

对毕业项目的每个 Feature：

```text
Problem
↓
User Story
↓
Acceptance Criteria
↓
NFR
↓
Architecture/Data/Permission
↓
Plan
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

不要跳过前半段直接进入 Coding。
