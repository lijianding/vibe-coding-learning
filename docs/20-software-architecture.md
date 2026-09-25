# 20 软件架构：如何让 AI 生成的 SaaS 不失控

> 本章目标：建立“系统应该如何拆分”的基本能力。Vibe Coding 最大风险之一，是 AI 不断往同一个文件或任意位置追加逻辑，最后形成无法维护的系统。

## 推荐源资料

- Next.js Architecture Docs: https://nextjs.org/docs
- React Thinking in React: https://react.dev/learn/thinking-in-react
- NIST SSDF: https://csrc.nist.gov/projects/ssdf
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/

---

## 一、架构不是画图

软件架构真正解决：

- 代码职责在哪里
- 数据如何流动
- 模块如何依赖
- 安全边界在哪里
- 变化如何被隔离

好的架构目标：

> 让一个功能变化尽量只影响有限区域。

---

## 二、Separation of Concerns

把不同职责分开。

例如不要：

```text
ProjectPage
=
UI
+ SQL
+ Permission
+ Validation
+ Audit
+ Email
+ File
```

推荐：

```text
UI
↓
Application/Service
↓
Domain Rules
↓
Data Access
↓
Database
```

---

## 三、常见分层

### Presentation Layer

页面/API。

### Application Layer

用例编排：

```text
CreateProject
CloseIssue
InviteMember
```

### Domain Layer

业务规则。

### Infrastructure Layer

- Database
- Email
- Storage
- Payment

---

## 四、为什么需要 Service Layer

例如创建 Project：

```text
validate
authorize
insert project
add manager
audit
send notification
```

如果全写 Route Handler，会越来越大。

可设计：

```typescript
createProject(command, context)
```

Route 只负责 HTTP 转换。

---

## 五、Data Access Layer

统一数据库访问：

```text
ProjectService
↓
ProjectRepository / queries
↓
PostgreSQL
```

价值：

- SQL 集中
- Tenant filter 集中
- 测试容易
- 避免重复查询

---

## 六、Feature-based Structure

推荐 SaaS：

```text
features/
  projects/
    components/
    queries/
    mutations/
    schemas/
    permissions/
    tests/
  issues/
  members/
```

比单纯：

```text
components/
services/
utils/
```

在项目变大后更容易定位业务。

---

## 七、Dependency Direction

高层业务逻辑不应强绑定某个第三方实现。

例如：

```text
ProjectService
↓
Storage Interface
↓
Supabase Storage Adapter
```

未来切 S3 时影响更小。

初期不必过度抽象，但要理解原则。

---

## 八、Coupling 与 Cohesion

### High Coupling

模块互相知道太多。

一个字段改动导致全项目修改。

### High Cohesion

相关功能放在一起。

目标：

> 低耦合，高内聚。

---

## 九、Single Responsibility

一个模块应该有一个主要变化原因。

例如：

```text
project-permission.ts
```

主要处理 Project 授权。

不要同时：

- 发 Email
- 生成 Excel
- 修改 Storage

---

## 十、Domain Model

不要把系统只理解为 CRUD。

真实业务有规则：

```text
Issue
open
↓ assign
in_progress
↓ resolve
resolved
↓ verify
closed
```

这叫状态转换。

不是任意字符串 UPDATE。

---

## 十一、State Machine 思维

可以明确：

```text
planning
→ implementing
→ testing
→ go_live
→ completed
```

禁止：

```text
completed
→ planning
```

除非有明确回退流程。

把规则集中，避免散落 UI。

---

## 十二、Command 与 Query

可以区分：

### Query

读取：

```text
getProject
listIssues
```

### Command

改变：

```text
createProject
closeIssue
inviteMember
```

这样业务操作更明确。

---

## 十三、DTO

Data Transfer Object：

用于系统边界的数据结构。

例如 CreateProjectDTO：

```typescript
{
  name: string;
  goLiveDate?: string;
}
```

不要直接把数据库 Row 当所有层的数据契约。

---

## 十四、Domain Entity 与 DB Row

DB 可能是：

```text
go_live_date
organization_id
```

应用可能：

```text
goLiveDate
organizationId
```

中间可以有映射层。

初期可以简单，但要知道数据库结构不必完全绑死 UI。

---

## 十五、Error Model

不要所有错误都是：

```text
throw Error("failed")
```

可以区分：

- ValidationError
- UnauthorizedError
- ForbiddenError
- NotFoundError
- ConflictError
- InfrastructureError

这样 API 能映射合理状态码。

---

## 十六、Cross-cutting Concerns

跨业务模块能力：

- Logging
- Auth
- Permission
- Audit
- Validation
- Error
- Metrics

这些最好集中，而不是每个 Feature 自创一套。

---

## 十七、Idempotency

某些 Command 必须防重复：

- Invite
- Payment
- Webhook
- Import
- Email send

例如同一个 Webhook 收到两次，不应该重复创建订单。

---

## 十八、Background Job

不是所有操作都应该让用户 Request 等待。

例如：

- 大型 Excel Export
- 批量导入
- 发大量邮件
- 图像处理

可以：

```text
HTTP Request
↓
Create Job
↓
Queue
↓
Worker
↓
Complete
```

---

## 十九、Queue 基础

Queue 解决：

- 异步处理
- Retry
- Backpressure
- Worker scaling

但也增加：

- Eventual consistency
- Duplicate
- Ordering
- Monitoring

初期只有需要时再引入。

---

## 二十、External Integration

医院软件常涉及：

- HIS
- LIS
- PACS
- SSO
- Webhook
- API

集成层应避免直接散落在业务页面。

建议 Adapter：

```text
Business Service
↓
Integration Interface
↓
Vendor Adapter
```

---

## 二十一、Feature Flag

用于：

- 灰度
- 企业客户特性
- 安全上线

```text
Code deployed
but feature disabled
```

让 Deploy 与 Release 分离。

---

## 二十二、Architecture Decision Record

重要架构决策记录：

```text
ADR-001
Decision:
Use Supabase RLS for tenant isolation

Context:
...

Alternatives:
...

Consequences:
...
```

Vibe Coding 特别适合用 ADR 防止 AI 每次换一套架构。

---

## 二十三、什么时候不要过度架构

第一版不要：

- 20 个微服务
- Kafka
- Kubernetes
- CQRS 全套
- Event Sourcing

如果：

```text
一个 Next.js
+
Postgres
+
Supabase
```

足够，就先保持简单。

原则：

> Simple until pain is real.

---

## 二十四、模块化单体

你的第一套 SaaS 很适合：

```text
Modular Monolith
```

一个部署单元，但内部业务模块清晰。

相比微服务：

- 更易调试
- 部署简单
- 事务简单
- 成本低

---

## 二十五、练习

把 Medical SaaS 拆成：

- auth
- organizations
- projects
- tasks
- issues
- attachments
- audit
- reporting

为每个模块写：

- 职责
- 输入
- 输出
- 依赖
- 权限

---

## 二十六、验收

应理解：

- Separation of Concerns
- Layering
- Service Layer
- Data Access
- Feature structure
- Coupling/Cohesion
- State Machine
- Command/Query
- DTO
- Error Model
- Background Job
- Queue
- Adapter
- Feature Flag
- ADR
- Modular Monolith
