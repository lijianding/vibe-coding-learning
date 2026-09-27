# 31 研发交付与变更管理：让开发过程可控

## 参考资料

- Agile Manifesto: https://agilemanifesto.org/
- Scrum Guide: https://scrumguides.org/scrum-guide.html
- GitHub Pull Requests: https://docs.github.com/en/pull-requests
- GitHub Issues/Projects: https://docs.github.com/en/issues

---

## 一、Feature Delivery Flow

推荐：

```text
Ready Requirement
↓
Technical Plan
↓
Branch
↓
Implementation
↓
Local Verification
↓
PR
↓
CI
↓
Review
↓
Merge
↓
Staging
↓
Acceptance
```

---

## 二、Issue

一个开发 Issue 应包含：

- Context
- Goal
- Scope
- Acceptance Criteria
- Design Link
- Dependencies
- Test Notes

---

## 三、Branch

建议：

```text
feat/project-archive
fix/tenant-filter
chore/upgrade-nextjs
```

---

## 四、PR

PR 不是“请合并”。

应包含：

- Why
- What
- Screenshots
- Test
- Risk
- Migration
- Rollback

---

## 五、Code Review

Review：

- Correctness
- Maintainability
- Security
- Test
- Performance
- Scope

不要只检查格式。

---

## 六、CI Gate

至少：

- lint
- typecheck
- test
- build

高风险模块加：

- security test
- migration test
- E2E

---

## 七、Change Request

需求中途变化：

```text
Request
↓
Impact
↓
Priority
↓
Approve/Reject/Defer
↓
Update Baseline
```

不能“客户群里一句话”直接进入开发。

---

## 八、Impact Analysis

变更至少评估：

- Requirement
- UI
- API
- DB
- Permission
- Test
- Documentation
- Timeline
- Cost
- Migration

---

## 九、Technical Debt

记录：

- Debt
- Reason
- Impact
- Trigger to fix
- Owner

不要把“以后再说”变成永久状态。

---

## 十、Feature Flag

高风险 Feature：

```text
Deploy
↓
Flag Off
↓
Internal Test
↓
Limited Enable
↓
Full Release
```

降低上线风险。

---

## 十一、Release Branch?

小团队可用 Trunk/Main + PR。

不要为了“看起来专业”引入复杂 Git Flow。

流程应服务实际团队规模。

---

## 十二、实践

针对 Project Archive：

- 创建 Issue
- 建 Branch
- 写 Plan
- 实现
- PR Template
- CI
- Review
- Staging Acceptance
