# 12 Supabase：PostgreSQL、Auth、Storage、API 与 CRUD

> 本章目标：把 Next.js 项目连接到真实数据库和认证系统，并理解 Supabase 的安全边界，而不是只会在 Dashboard 点按钮。

## 官方源资料

- Supabase Docs: https://supabase.com/docs
- Database: https://supabase.com/docs/guides/database
- Auth: https://supabase.com/docs/guides/auth
- SSR Auth: https://supabase.com/docs/guides/auth/server-side
- Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Securing your API: https://supabase.com/docs/guides/api/securing-your-api
- Storage: https://supabase.com/docs/guides/storage
- Storage Access Control: https://supabase.com/docs/guides/storage/security/access-control
- Production Checklist: https://supabase.com/docs/guides/deployment/going-into-prod
- Security Guidance: https://supabase.com/docs/guides/security/product-security

---

## 一、Supabase 的组成

可以理解为：

```text
PostgreSQL
+
Auth
+
Storage
+
Auto-generated APIs
+
Realtime
+
Edge/Platform Services
```

核心依然是 PostgreSQL。

所以数据库设计、Index、Transaction、Constraint、RLS 都不是“Supabase 专有概念”。

---

## 二、为什么适合学习型 SaaS

如果全部自己搭：

```text
Database
Auth Server
Token System
File Service
API Gateway
Realtime
Backup tooling
```

学习成本很高。

Supabase 让你先把注意力放在：

- SaaS 数据模型
- 用户
- 权限
- 租户
- 文件
- 产品功能

---

## 三、Database

Supabase 的 Database 是 PostgreSQL。

你应该尽量使用：

- SQL
- Migration
- Constraint
- Index
- RLS

而不是长期只依赖 Dashboard 手工修改表。

---

## 四、Auth 的职责

Supabase Auth 主要解决：

```text
用户是谁？
```

支持常见：

- Email + Password
- Magic Link
- OTP
- Social Login
- SSO

具体可用能力与配置应查当前 Auth 官方文档。

---

## 五、Session

用户登录后，应用需要保持身份。

Session 涉及：

- Access Token
- Refresh Token
- Expiry
- Logout
- Password Reset
- 多设备状态

不要只测试：

> 登录成功

还要测试：

- Session 过期
- Refresh
- Logout
- Disabled User
- Password reset 后旧 Session

---

## 六、JWT

JWT 是一种带签名的 Token 格式。

常见结构：

```text
Header
Payload
Signature
```

重要：

> JWT Payload 通常可被客户端读取，不应该放 Secret。

Signature 用于验证 Token 未被篡改。

JWT 不等于“加密”。

---

## 七、Auth User 与业务 User/Profile

不要把所有业务信息都塞 Auth User。

常见：

```text
auth.users
↓
profiles
↓
organization_members
```

Auth 用户负责身份。

业务表负责：

- display name
- department
- organization membership
- business role
- status

---

## 八、客户端 Key 与高权限 Key

Supabase 提供面向客户端使用的公开 key 类型，以及高权限服务端 key。

核心原则：

### Client-safe Key

可暴露到浏览器，但数据库安全必须依赖：

- RLS
- Policies
- grants

### Service Role / Secret 高权限 Key

只能在受控服务端。

通常具有很高权限，并可能绕过 RLS。

绝不能：

- 放浏览器
- 使用 NEXT_PUBLIC_*
- 提交 Git
- 打进日志

---

## 九、CRUD 不只是四个按钮

CRUD：

- Create
- Read
- Update
- Delete

真实 Project CRUD 还应考虑：

- Auth
- Permission
- Tenant
- Validation
- Constraint
- Audit
- Error
- Pagination
- Soft Delete

---

## 十、Read

概念：

```typescript
const { data, error } = await supabase
  .from("projects")
  .select("id,name,status,go_live_date");
```

思考：

- 当前用户属于哪个 Organization？
- RLS 是否限制 Row？
- 是否分页？
- 是否排序？
- 是否需要 deleted_at is null？
- 是否返回了不必要字段？

---

## 十一、为什么不要长期 select("*")

问题：

- 返回多余字段
- 网络负担
- 新增敏感字段时可能被意外返回
- API Contract 不稳定

更推荐明确字段。

---

## 十二、Create

危险方式：

浏览器提交：

```json
{
  "name": "Project",
  "organization_id": "victim-org"
}
```

服务端照单全收。

正确思路：

```text
Session
↓
User
↓
Verified Organization Membership
↓
Server derives organization_id
↓
Insert
```

安全上下文字段不要任由客户端决定。

---

## 十三、Update

需要防：

### Mass Assignment

前端本来只允许改：

```text
name
status
```

攻击者却额外传：

```text
organization_id
owner_id
role
```

解决：

> 服务端明确白名单字段。

---

## 十四、Delete

生产系统常考虑：

- Hard Delete
- Soft Delete
- Archive

选择依据：

- 恢复需求
- 审计
- 法律保存期限
- 隐私删除义务

不能简单认为 Soft Delete 永远最好。

---

## 十五、Runtime Validation

TypeScript 不能保护 HTTP 输入。

例如你定义：

```typescript
type Input = {
  name: string;
};
```

攻击者仍可发：

```json
{
  "name": 123
}
```

因此需要：

```text
HTTP/Form Input
↓
Runtime Schema
↓
Parsed Data
↓
Business Logic
```

可使用 Zod 等库。

---

## 十六、RLS

RLS 是 Supabase 客户端数据访问的关键防线。

它回答：

> 当前认证上下文允许访问哪些 Row？

如果 exposed table 没有合理 RLS，可能造成严重数据暴露。

官方 Production Checklist 明确强调生产环境检查 RLS。

---

## 十七、Policy

Policy 需要分别考虑：

- SELECT
- INSERT
- UPDATE
- DELETE

不是“写一个 Policy 就全安全”。

后续授权章节详细学习：

- USING
- WITH CHECK
- role/grant
- tenant membership

---

## 十八、Storage

用于：

- 实施方案
- 测试报告
- 截图
- 培训资料
- 上线材料

核心：

```text
Bucket
↓
Object
↓
Path
↓
Access Policy
```

---

## 十九、Public 与 Private

### Public

获取 URL 即可访问。

### Private

需要认证授权或签名 URL。

医疗行业项目资料一般建议优先从 Private 模式思考。

---

## 二十、Signed URL

流程：

```text
User requests file
↓
Server/Auth checks permission
↓
Generate temporary signed URL
↓
User downloads
```

要测试：

- A 租户能否给 B 文件生成 URL
- URL 多久过期
- URL 是否会进日志
- 是否被公开分享

---

## 二十一、Storage Policy

文件权限和数据库权限一样重要。

不能因为 Project 表 RLS 正确，就认为附件安全。

必须单独测试：

```text
A → A file
A → B file
Anonymous → private file
```

---

## 二十二、Realtime

Realtime 可用于：

- 评论更新
- Issue 状态
- Notification

但不要初期“为了高级”就全部实时化。

它会带来：

- Connection
- Authorization
- Event ordering
- Duplicate event
- Cost

先做普通可靠 CRUD，再按需要引入。

---

## 二十三、Migration

生产环境 schema 变更应进入代码仓库。

流程：

```text
New migration
↓
Review
↓
Local/Test
↓
Staging
↓
Production
```

不要长期：

> 直接在生产 Dashboard 手工加字段。

---

## 二十四、Seed Data

开发环境可准备：

```text
Organization A
Admin A
Engineer A
Project A1

Organization B
Admin B
Project B1
```

用途：

- 功能测试
- 权限测试
- 跨租户测试

绝不能用真实患者数据当 Seed。

---

## 二十五、Backup 与 Storage

Database Backup 不等于 Storage Object Backup。

要分别确认：

- DB backup
- DB restore
- Storage backup
- Storage restore

并在测试环境演练。

---

## 二十六、Production Security

上线前至少检查：

- RLS
- Auth rate limits
- Password policy
- SMTP
- Service key
- Storage policy
- Backup
- Database connection
- Logs
- Security advisor
- Custom domain/HTTPS

以官方 Production Checklist 当前版本为准。

---

## 二十七、完整写入流程

```text
Browser
↓
Form
↓
Server Action / Route Handler
↓
Session
↓
Runtime Validation
↓
Permission
↓
Tenant Scope
↓
Database INSERT/UPDATE
↓
RLS
↓
Audit Log
↓
Return
↓
Revalidate UI
```

---

## 二十八、实践任务

完成：

### Auth

- Register
- Login
- Logout
- Reset Password

### Project

- List
- Detail
- Create
- Update
- Archive

### Storage

- 上传 Project Document
- Private Bucket
- Signed Download
- Tenant Isolation

### Testing

两个 Organization 验证不能互访。

---

## 二十九、本章验收

能解释：

- Supabase 与 PostgreSQL 的关系
- Auth
- Session
- JWT
- Auth User vs Profile
- Client Key vs Service Role
- Runtime Validation
- CRUD 安全边界
- RLS
- Storage Policy
- Signed URL
- Migration
- Seed
- Backup

不能只做到“Dashboard 会点”。
