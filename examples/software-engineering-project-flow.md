# 完整案例：Project Archive 功能如何从需求走到上线

> 本案例演示软件工程文档之间如何连接。

---

## 1. Problem

项目完成后仍然和 Active Project 混在一起。

项目经理：

- 列表噪声大
- 搜索困难
- Dashboard 指标不准确

---

## 2. User Need

```text
项目经理需要把不再活跃的项目从日常工作区移出，
但仍能保留历史记录和审计信息。
```

---

## 3. User Story

```text
As a Project Manager
I want to archive a completed project
So that the active project workspace stays focused.
```

---

## 4. Acceptance Criteria

### AC-01

```gherkin
Given I am a Project Manager in Org A
And Project P belongs to Org A
And Project P status is completed
When I archive Project P
Then archived_at is recorded
And the project disappears from the default active list
```

### AC-02

```gherkin
Given Project P belongs to Org B
When a user from Org A tries to archive it
Then the request is denied
```

### AC-03

```gherkin
Given a Project is archived
When it is viewed from archive history
Then its previous tasks, issues and audit history remain readable according to permission
```

---

## 5. Functional Requirements

### FR-ARCH-001

系统应允许具有 `project.archive` 权限的用户归档当前租户内已完成项目。

### FR-ARCH-002

系统默认 Project List 不显示已归档项目。

### FR-ARCH-003

系统应提供 Archive List。

---

## 6. Non-Functional Requirements

### NFR-SEC-001

用户不得归档其他 Organization 的 Project。

### NFR-AUD-001

归档操作必须生成 Audit Log。

### NFR-REL-001

归档操作失败时 Project 状态不得处于半完成状态。

---

## 7. Data Design

projects 增加：

```text
archived_at timestamptz null
archived_by uuid null
```

选择 Soft Archive，而不是 DELETE。

原因：

- 保留历史
- Audit
- 可恢复
- 关联 Task/Issue 不需要级联删除

---

## 8. Architecture Decision

ADR：

```text
Decision:
Archive is represented by archived_at rather than moving data to another table.

Reason:
Keep relationships simple and allow history queries.

Consequence:
All active project queries must explicitly filter archived_at is null.
```

---

## 9. Permission

只有：

- Org Admin
- Project Manager（按组织策略）

可以 archive。

Engineer / Customer 不允许。

同时必须满足：

```text
project.organization_id == currentOrganization
```

---

## 10. API / Server Action

输入：

```text
projectId
```

不要允许客户端传：

```text
archivedBy
organizationId
```

这些由 Session/Tenant Context 推导。

---

## 11. Transaction

```text
BEGIN
↓
UPDATE projects archived_at / archived_by
↓
INSERT audit_logs
↓
COMMIT
```

Audit 写失败时是否回滚归档，需要根据业务策略明确。

本案例选择：

> 同一 Transaction，Audit 失败则整个操作失败。

---

## 12. UI

Project Detail：

```text
Archive Project
```

点击后：

1. Confirmation
2. Submit
3. Loading
4. Success → redirect/list refresh
5. Error → clear error message

---

## 13. Test Plan

### Unit

- canArchiveProject()
- archived project filter

### Integration

- archive DB update
- audit insert
- transaction rollback

### Permission

- Admin A → Project A = allow
- Engineer A → Project A = deny
- Admin A → Project B = deny

### E2E

```text
Login
→ Project Detail
→ Archive
→ Confirm
→ Active list no longer contains project
→ Archive list contains project
```

---

## 14. Traceability

| Requirement | Design | Test |
|---|---|---|
| FR-ARCH-001 | archived_at + permission | TC-001/002 |
| FR-ARCH-002 | active query filter | TC-003 |
| NFR-SEC-001 | Server AuthZ + RLS | TC-004 |
| NFR-AUD-001 | Transaction Audit | TC-005 |

---

## 15. Delivery

```text
Issue
↓
Branch feat/project-archive
↓
Implementation
↓
Tests
↓
PR
↓
CI
↓
Review
↓
Staging
```

---

## 16. UAT

Scenario：

项目经理归档一个模拟已完成项目，然后从 Archive 页面找到它。

Business Sign-off：

- Active List 更清晰
- History 仍可访问
- 不影响其他 Organization

---

## 17. Release

Release Note：

```text
New:
Completed projects can now be archived while retaining project history.
```

---

## 18. Monitoring

上线后观察：

- archive API error rate
- unauthorized attempts
- archive count
- support feedback

---

## 19. Outcome

验证原始目标：

> Active Project 工作区是否更聚焦？

可以观察：

- Active list size
- 搜索任务时间
- PM feedback

---

## 20. 这条链为什么重要

完整链路：

```text
Problem
↓
User Need
↓
Story
↓
Requirements
↓
NFR
↓
Data/Architecture
↓
Permission
↓
Implementation
↓
Tests
↓
UAT
↓
Release
↓
Metrics
```

这就是软件工程的核心：

> 每一步都能解释“为什么”，并且下一步能追溯到上一步。
