# 16 毕业实战：Medical Implementation SaaS 完整项目规格

> 这个项目贯穿整套课程。目标不是做 Demo，而是按照真实 SaaS 工程流程完成一个可部署、可测试、具备租户隔离和审计能力的系统。

---

## 一、产品边界

用于医疗软件实施项目管理。

学习版不保存真实患者临床数据。

核心对象：

```text
Organization
User
Membership
Project
ProjectMember
Task
Requirement
Issue
Milestone
Comment
Attachment
AuditLog
Notification
```

---

## 二、角色

### Platform Admin

平台运维。

### Organization Admin

医院/客户组织管理员。

### Project Manager

实施项目经理。

### Implementation Engineer

实施工程师。

### Customer User

客户参与人员。

---

## 三、Organization

字段：

- id
- name
- code
- status
- plan
- created_at

状态：

- trial
- active
- suspended
- closed

---

## 四、Membership

```text
organization_members
- organization_id
- user_id
- role
- status
- joined_at
```

一个 User 可以属于多个 Organization。

Unique：

```text
organization_id + user_id
```

---

## 五、Project

字段：

- id
- organization_id
- name
- code
- description
- status
- manager_id
- start_date
- go_live_date
- created_at
- updated_at
- archived_at

状态：

```text
planning
implementing
testing
go_live
completed
archived
```

---

## 六、Project 状态规则

示例：

```text
planning
→ implementing
→ testing
→ go_live
→ completed
→ archived
```

需要定义：

- 谁能转换
- 是否可回退
- 是否必须满足条件

例如：

> go_live 前 Critical Issue 必须为 0。

---

## 七、Task

字段：

- id
- organization_id
- project_id
- title
- description
- status
- priority
- assignee_id
- due_date
- completed_at

状态：

- todo
- in_progress
- blocked
- done

---

## 八、Issue

字段：

- id
- organization_id
- project_id
- title
- description
- priority
- status
- reporter_id
- assignee_id
- resolved_at

Priority：

- low
- medium
- high
- critical

Status：

- open
- in_progress
- resolved
- closed

---

## 九、Requirement

用于客户需求管理。

字段：

- source
- requirement_type
- priority
- status
- owner
- acceptance_result

---

## 十、Milestone

例如：

- Environment Ready
- Interface Testing
- User Training
- UAT
- Go Live

---

## 十一、Comment

关联：

- Task
- Issue
- Requirement

不要一开始做复杂“任意多态关系”导致数据库难维护，可按实现复杂度选择明确 FK/关系模型。

---

## 十二、Attachment

字段：

- organization_id
- project_id
- owner_type
- owner_id
- storage_path
- filename
- mime_type
- size
- uploaded_by

Storage 默认 Private。

---

## 十三、AuditLog

至少记录：

- actor
- action
- resource
- before
- after
- timestamp
- request_id

---

## 十四、权限矩阵

建立正式表：

| Resource | Permission | Org Admin | PM | Engineer | Customer |
|---|---|---:|---:|---:|---:|
| Project | read | ✓ | ✓ | ✓ | ✓ |
| Project | create | ✓ | ✓ | × | × |
| Project | archive | ✓ | ✓ | × | × |
| Task | create | ✓ | ✓ | ✓ | 条件 |
| Issue | create | ✓ | ✓ | ✓ | ✓ |
| Member | invite | ✓ | 条件 | × | × |

你需要自己继续细化。

---

## 十五、租户规则

任何：

- Project
- Task
- Issue
- Attachment
- Audit

都不能跨 Organization 访问。

测试必须覆盖：

```text
A user + B resource
```

---

## 十六、页面

```text
/login
/dashboard
/projects
/projects/[id]
/projects/[id]/tasks
/projects/[id]/issues
/projects/[id]/requirements
/settings/members
/settings/audit
```

---

## 十七、Dashboard

指标：

- Active Projects
- Upcoming Go-Live
- Overdue Tasks
- Open Critical Issues
- Unresolved Requirements

必须全部 tenant-scoped。

---

## 十八、搜索

支持：

- Project name/code
- Issue title
- Task title

后期：

- Full Text Search

---

## 十九、分页

所有大列表：

- Projects
- Issues
- Audit
- Members

必须分页。

---

## 二十、通知

初期：

- In-app Notification

后期：

- Email

例如：

- Task assigned
- Issue critical
- Go-live approaching

---

## 二十一、错误模型

统一：

```json
{
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "Project not found",
    "requestId": "..."
  }
}
```

---

## 二十二、测试计划

### Unit

- progress
- status transition
- permission helper
- validation

### Integration

- CRUD
- RLS
- Audit

### E2E

- Login
- Create Project
- Assign Task
- Create Issue
- Tenant Isolation

---

## 二十三、安全验收

- 未登录拒绝
- 无权限拒绝
- 跨租户拒绝
- Storage 跨租户拒绝
- Service Role 不在 Client
- XSS 输入测试
- Mass Assignment 测试
- Rate Limit 关键入口

---

## 二十四、Production

必须：

- CI
- Staging
- Production
- Monitoring
- Backup
- Restore Drill
- Rollback

---

## 二十五、Definition of Done

Feature 完成必须：

- [ ] Requirement
- [ ] Acceptance Criteria
- [ ] UI states
- [ ] Validation
- [ ] AuthN
- [ ] AuthZ
- [ ] Tenant
- [ ] Audit（如需要）
- [ ] Tests
- [ ] Lint
- [ ] Typecheck
- [ ] Build
- [ ] Diff Review
- [ ] Docs

---

## 二十六、建议实现顺序

```text
Project skeleton
↓
Database schema
↓
Auth
↓
Organization
↓
Project CRUD
↓
Task
↓
Issue
↓
RBAC
↓
RLS
↓
Audit
↓
Attachment
↓
Search
↓
Pagination
↓
Dashboard
↓
Tests
↓
Security
↓
CI/CD
↓
Production
```

---

## 二十七、毕业验收

你应能从一个新需求独立完成：

```text
Requirement
→ Data Model
→ Permission
→ Plan
→ Implementation
→ Test
→ Security Review
→ Commit
→ Deploy
→ Monitor
→ Rollback
```

这就是整套课程最终目标。
