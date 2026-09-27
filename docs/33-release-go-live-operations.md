# 33 Release、Go-Live 与运营交接：把产品安全地送到真实用户

## 参考资料

- GitHub Environments: https://docs.github.com/en/actions/concepts/workflows-and-actions/deployment-environments
- GitHub Deployment Protection: https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments
- GOV.UK Live Phase: https://www.gov.uk/service-manual/agile-delivery/how-the-live-phase-works
- Google SRE: https://sre.google/books/

---

## 一、Deploy 与 Go-Live 不一样

Deploy：

> 新版本到了 Production。

Go-Live：

> 用户正式开始依赖它工作。

企业软件 Go-Live 还包含：

- 用户
- 数据
- 培训
- Support
- Cutover
- Rollback

---

## 二、Release Readiness

发布前：

- Scope frozen
- Test complete
- UAT approved
- Security reviewed
- Migration ready
- Monitoring ready
- Backup ready
- Rollback ready
- Support ready

---

## 三、Cutover Plan

如果替代旧系统：

```text
Freeze old data
↓
Export
↓
Transform
↓
Import
↓
Reconcile
↓
Switch users
↓
Monitor
```

每一步要有：

- Owner
- Time
- Expected
- Verification
- Rollback

---

## 四、Data Migration

迁移不是“跑 SQL”。

需要：

- Mapping
- Cleaning
- Validation
- Reconciliation
- Audit
- Rollback

---

## 五、Reconciliation

例如：

```text
Source Projects = 1250
Target Projects = 1250

Source Active = 815
Target Active = 815
```

数量相同还不够，高风险数据需要抽样/哈希/业务校验。

---

## 六、Release Notes

面向用户说明：

- New
- Changed
- Fixed
- Known Issues
- Required Action

---

## 七、Runbook

运营手册至少：

- Start/Stop
- Health Check
- Logs
- Common Incident
- Escalation
- Backup/Restore
- Contact

---

## 八、Support Readiness

Go-Live 前：

- 谁接工单？
- 谁处理 P1？
- 谁能执行 Admin 操作？
- 谁联系客户？

---

## 九、Hypercare

新上线初期：

- 更密集 Monitoring
- 快速响应
- 每日 Review
- 收集用户反馈

但仍需正常变更控制，不能 Production 随便改。

---

## 十、Rollback

事先定义 Trigger：

```text
Error Rate > X
Data corruption
Critical auth failure
```

Rollback 不是出问题后才想。

---

## 十一、Production Approval

GitHub Environment 等机制可以设置：

- Approval
- Secret boundary
- Branch restriction
- Protection rule

把发布治理技术化。

---

## 十二、实践

为毕业项目写完整 Go-Live Plan：

- Pre-check
- Migration
- Smoke Test
- User Communication
- Support
- Monitoring
- Rollback
- Sign-off

模板：
`templates/software-engineering/15-release-go-live-plan.md`
