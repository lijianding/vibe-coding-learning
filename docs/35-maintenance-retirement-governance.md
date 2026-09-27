# 35 维护、治理与产品退役：完整生命周期的最后一环

## 参考资料

- GOV.UK Service Lifecycle: https://www.gov.uk/service-manual/agile-delivery/running-your-service-in-a-sustainable-way
- GOV.UK Retiring Services: https://www.gov.uk/service-manual/agile-delivery/retiring-your-service
- NIST SSDF: https://csrc.nist.gov/projects/ssdf

---

## 一、Maintenance

上线后仍需要：

- Bug Fix
- Security Patch
- Dependency Upgrade
- DB Maintenance
- Performance
- Feature Change

---

## 二、Preventive Maintenance

不要只等系统坏。

定期：

- Upgrade dependencies
- Review indexes
- Restore drill
- Permission review
- Secret rotation
- Vulnerability review

---

## 三、Technical Debt Governance

Debt 记录：

- What
- Why
- Risk
- Cost
- Trigger
- Owner

每季度 Review。

---

## 四、Architecture Governance

关键变化应：

- ADR
- Security review
- NFR impact
- Migration plan

避免 AI 随意引入新技术栈。

---

## 五、Access Review

定期检查：

- Admin users
- Former employees
- Customer users
- Service accounts
- API keys

---

## 六、Data Retention

按数据类型定义：

- Active
- Archive
- Delete
- Backup expiry

---

## 七、Version Support

如果有 API/Integration：

- Supported version
- Deprecation
- Migration guide
- End of support

---

## 八、Deprecation

流程：

```text
Announce
↓
Measure Usage
↓
Migration Path
↓
Warn
↓
Disable
↓
Remove
```

不要突然删除客户依赖能力。

---

## 九、Product Retirement

产品退役需要：

- Customer communication
- Export
- Migration
- Contract
- Data retention
- Delete
- Infrastructure shutdown
- Domain/API closure

---

## 十、Knowledge Transfer

离职/交接前要有：

- Architecture
- Runbook
- ADR
- Deployment
- Incident history
- Vendor contacts

---

## 十一、Governance 最小集

建议仓库长期维护：

```text
README
Architecture
ADRs
Runbook
Risk Register
Production Checklist
Incident Postmortems
Release Notes
```

---

## 十二、实践

为毕业项目设计：

- Quarterly Maintenance Checklist
- Dependency Upgrade Policy
- Access Review
- Deprecation Policy
- Retirement Plan

模板：
`templates/software-engineering/19-retirement-plan.md`
