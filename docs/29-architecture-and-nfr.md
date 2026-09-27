# 29 架构设计与非功能需求：把质量目标落实到技术设计

## 参考资料

- Azure Architecture Center: https://learn.microsoft.com/en-us/azure/architecture/
- Azure Well-Architected: https://learn.microsoft.com/en-us/azure/well-architected/
- Martin Fowler ADR: https://martinfowler.com/bliki/ArchitectureDecisionRecord.html
- NIST SSDF: https://csrc.nist.gov/projects/ssdf

---

## 一、Architecture 从 Requirement 开始

不要：

```text
我想用 Redis/Kafka/Kubernetes
```

先问：

- 为什么需要？
- 哪个 Requirement 驱动？
- 不用会怎样？

架构是 Tradeoff。

---

## 二、Architecture Drivers

主要来自：

- Functional Complexity
- Scale
- Security
- Availability
- Performance
- Cost
- Compliance
- Team Capability
- Integration

---

## 三、Context Diagram

第一张图先画系统边界：

```text
Users
↓
Medical SaaS
├── Supabase
├── Email Provider
├── Monitoring
└── Hospital Systems
```

明确：

- 谁
- 系统
- 外部依赖
- 数据流

---

## 四、Container / Component View

再细化：

```text
Browser
↓
Next.js
├── UI
├── Server Actions
├── Permission
├── DAL
└── Integration
↓
PostgreSQL / Storage
```

---

## 五、Data Architecture

需要：

- ERD
- Ownership
- Tenant
- Retention
- Index
- Migration
- Backup

---

## 六、Security Architecture

至少明确：

- Trust Boundary
- Authentication
- Authorization
- RLS
- Secrets
- Encryption
- Audit
- Admin Boundary

---

## 七、Reliability

从业务目标推导：

- RPO
- RTO
- Availability
- Retry
- Timeout
- Failure Mode
- Restore

不是所有项目都需要“五个 9”。

---

## 八、Performance

定义可测目标：

- Expected Load
- p95
- Max records
- Concurrency
- Batch size

避免：

> 系统要快。

---

## 九、Cost

架构需要成本意识：

- Compute
- Database
- Storage
- Egress
- Email
- Observability
- AI API

技术“更高级”不等于更合适。

---

## 十、Build vs Buy

每个能力问：

- 自己做？
- Managed Service？
- SaaS Provider？

评估：

- Cost
- Control
- Security
- Compliance
- Lock-in
- Operations

---

## 十一、ADR

每个重要决定写 ADR：

```text
Context
Decision
Alternatives
Consequences
Status
```

例如：

```text
ADR-004:
Use shared-schema multi-tenancy with PostgreSQL RLS.
```

---

## 十二、Architecture Review

Review 问：

- 是否满足 Requirements？
- 哪些 Single Point of Failure？
- Security Boundary 清楚吗？
- 数据恢复吗？
- 运维复杂度是否可接受？
- 团队能维护吗？

---

## 十三、Architecture 不应一次冻结

产品迭代时：

```text
Requirement changes
↓
Architecture impact
↓
ADR
↓
Migration Plan
```

---

## 十四、实践

为毕业项目完成：

- Context Diagram
- Component Diagram
- ERD
- Auth Flow
- File Flow
- 5 个 NFR
- 3 个 ADR
- RPO/RTO
- Cost assumptions

模板：
`templates/software-engineering/08-architecture-design-spec.md`
