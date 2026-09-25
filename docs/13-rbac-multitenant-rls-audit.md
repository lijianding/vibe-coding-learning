# 13 Authorization：RBAC、多租户、RLS 与审计日志

> SaaS 最危险的 Bug 往往不是页面打不开，而是“用户看到了不属于自己的数据”或者“低权限用户完成了高权限操作”。

主教材：
- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase API Security: https://supabase.com/docs/guides/api/securing-your-api
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/

---

## 一、Authentication 与 Authorization

Authentication：你是谁？

Authorization：你能做什么？

登录成功，只能证明当前请求代表某个用户，并不意味着这个用户能删除任意项目、邀请管理员、查看其他医院或下载任何附件。

## 二、授权决策的完整模型

真实授权通常同时考虑：

```text
Subject + Action + Resource + Tenant + Context
```

例如：张三执行 project.update，资源是 Project P100，Tenant 是 Hospital A，同时还要判断张三是否属于该组织、是否是项目成员、项目是否已归档。

因此只写 `role == project_manager` 通常不够。

## 三、RBAC：Role-Based Access Control

```text
User → Role → Permission
```

建议把权限设计成动作，例如：

```text
project.read
project.create
project.update
project.delete
task.read
task.assign
issue.read
issue.assign
report.export
member.invite
```

角色只是 Permission 的集合。比起在业务代码里到处写 `if role == admin`，更推荐统一调用 `hasPermission()` 或 `can()`。

## 四、RBAC 的局限

RBAC 能回答“这个角色通常能做什么”，但不能单独回答“他能操作哪一个具体资源”。

真实系统一般需要：

```text
RBAC + Resource-level Authorization + Tenant Isolation
```

例如 Project Manager 可以更新项目，但可能只能更新自己参与的项目。

## 五、ABAC 的概念

ABAC = Attribute-Based Access Control。授权基于属性，例如：

```text
user.department == project.department
AND
project.status != archived
```

你不需要一开始实现完整 ABAC，但要知道复杂系统往往不仅依赖 Role。

## 六、多租户 SaaS

Multi-Tenant 意味着一套应用服务多个客户，但每个客户的数据与权限相互隔离。

```text
Platform
├── Hospital A
│   ├── Users
│   └── Projects
└── Hospital B
    ├── Users
    └── Projects
```

## 七、常见多租户数据库模式

### Shared Database + Shared Schema

所有客户共用表，通过 `organization_id` 区分。

优点：简单、成本低、适合早期 SaaS。

最大风险：每次访问都必须正确限定 Tenant。

### Schema per Tenant

每个租户独立 Schema，隔离更强，但 Migration、连接和运维复杂度更高。

### Database per Tenant

每租户独立数据库，隔离更强，但成本与运维复杂度也最高，常见于大客户或特殊隔离要求。

## 八、Tenant Context 从哪里来

不要信任客户端直接提交的 `organizationId`。

正确思路：

```text
Authenticated User
↓
organization_members
↓
确认用户真实属于某 Organization
↓
建立当前 Tenant Context
```

如果一个用户可加入多个 Organization，还要明确当前选中的 Organization，并在每次数据访问中验证成员关系。

## 九、业务表的租户归属

常见租户数据：projects、tasks、issues、requirements、comments、attachments、audit_logs。

设计时问：

- 当前记录属于哪个 Organization？
- 能否安全、稳定地从关系推导？
- 是否应直接保存 organization_id 以简化授权和查询？

## 十、Row Level Security

PostgreSQL RLS 的目标是让数据库自己参与授权决策。

```sql
alter table public.projects
enable row level security;
```

开启 RLS 后还需要 Policy。

## 十一、GRANT 与 RLS 是两层控制

```text
GRANT
→ 某数据库角色能否对表执行 SELECT/INSERT/UPDATE/DELETE

RLS Policy
→ 即使能执行，该操作允许作用到哪些 Row
```

二者都要设计。Supabase 官方文档也强调 exposed schema 中的表应同时正确配置权限与 RLS。

## 十二、SELECT Policy

概念示例：

```sql
create policy "org members can read projects"
on public.projects
for select
to authenticated
using (
  organization_id in (
    select organization_id
    from organization_members
    where user_id = auth.uid()
  )
);
```

含义：当前登录用户只能读取自己所属 Organization 的 Project。

## 十三、INSERT Policy 与 WITH CHECK

INSERT 时要验证新 Row 是否属于用户可写范围。

```text
WITH CHECK
→ 新行是否允许存在
```

这可以阻止 Hospital A 用户伪造 `organization_id = Hospital B`。

## 十四、UPDATE 的两层问题

UPDATE 必须同时考虑：

1. 原来的 Row 能否被当前用户定位和修改？
2. 修改后的 Row 是否仍然合法？

因此 UPDATE Policy 常同时涉及 `USING` 与 `WITH CHECK`。

## 十五、RLS 不等于全部授权逻辑

RLS 非常适合保护 Row-level data access，但复杂业务规则仍可能需要服务层判断，例如：

- 只有 Project Manager 能关闭项目
- 已归档项目不能修改
- Critical Issue 关闭需要额外确认

推荐纵深防御：

```text
UI Control
↓
Server Authorization
↓
Database RLS
```

## 十六、Service Role 风险

高权限 Service Role 通常可绕过 RLS，因此：

- 不能进入浏览器 Bundle
- 不能放到 NEXT_PUBLIC_*
- 不能提交 Git
- 不能被普通用户接口无条件使用

使用 Service Role 时，服务端必须自己完整执行授权。

## 十七、水平越权与垂直越权

### Horizontal Privilege Escalation

同级用户访问别人的资源，例如 Hospital A 读取 Hospital B 项目。

### Vertical Privilege Escalation

低权限用户执行高权限动作，例如 Implementation Engineer 邀请管理员。

两类都要自动化测试。

## 十八、IDOR / BOLA

把 `/projects/1001` 改成 `/projects/1002` 后，如果能看到别人的资源，就是典型资源级越权。

UUID 只能降低猜测便利性，不能替代授权。

## 十九、Audit Log

Audit Log 回答：谁在什么时候对什么做了什么。

建议字段：

```text
id
organization_id
actor_user_id
action
resource_type
resource_id
old_value
new_value
ip_address
user_agent
request_id
created_at
```

## 二十、Audit Log 与 Application Log 的区别

Application Log 关注系统运行，例如数据库超时、API 500。

Audit Log 关注业务操作，例如 Zhang 把 Project P100 从 testing 改为 completed。

两者用途不同。

## 二十一、哪些动作应审计

至少考虑：

- 用户邀请
- 角色/权限变更
- Project 创建、修改、归档
- Issue 状态变化
- 敏感文件下载
- 数据导出
- 系统设置修改
- Tenant 管理

不要无脑记录所有 GET，否则审计噪声和成本会很高。

## 二十二、审计日志的防篡改

普通业务用户不应拥有 UPDATE/DELETE audit_logs 的能力。

更高要求场景可考虑 append-only、外部日志存储或不可变存储。

## 二十三、授权测试矩阵

准备：

```text
Organization A
- Admin A
- Engineer A

Organization B
- Admin B
- Engineer B
```

对 SELECT/INSERT/UPDATE/DELETE 分别测试：

- 同租户允许路径
- 同租户拒绝路径
- 跨租户路径
- anonymous
- authenticated 但无权限

安全测试不仅要证明“允许正确”，也要证明“拒绝正确”。

## 二十四、推荐设计流程

```text
列角色
↓
列 Permission
↓
做 Permission Matrix
↓
定义 Resource Ownership
↓
定义 Tenant Boundary
↓
定义 Server Authorization
↓
定义 RLS
↓
写 Allow / Deny Tests
↓
定义 Audit Events
```

## 二十五、练习

1. 为 Platform Admin、Organization Admin、Project Manager、Implementation Engineer、Customer User 建权限矩阵。
2. 为 projects 表设计 SELECT/INSERT/UPDATE/DELETE RLS 策略。
3. 创建 Organization A/B 和对应用户，尝试篡改 projectId、organizationId、userId。
4. 为 Project 状态变化写审计事件模型。

## 二十六、本章验收

你应该能解释：

- Authentication vs Authorization
- RBAC 与 ABAC 的区别
- Resource-level Authorization
- Multi-Tenant 三种模式
- Tenant Context
- GRANT vs RLS Policy
- USING vs WITH CHECK
- Horizontal / Vertical Privilege Escalation
- IDOR/BOLA
- Service Role 风险
- Audit Log 与 Application Log
- Allow/Deny Security Testing

如果这一章掌握不好，不建议进入真实商用数据阶段。