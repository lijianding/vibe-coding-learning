# 13 RBAC、多租户、RLS 与审计日志

这是从 Demo 迈向 SaaS 的关键章节。

## 1. RBAC

基本模型：
```text
User
↓
Role
↓
Permission
```

权限示例：
```text
project.read
project.create
project.update
project.delete
task.read
task.create
issue.assign
report.export
```

角色：
- Platform Admin
- Organization Admin
- Project Manager
- Implementation Engineer
- Customer User

## 权限矩阵
| 功能 | 平台管理员 | 组织管理员 | 项目经理 | 实施工程师 |
|---|---:|---:|---:|---:|
| 查看项目 | ✓ | ✓ | ✓ | ✓ |
| 创建项目 | ✓ | ✓ | ✓ | × |
| 删除项目 | ✓ | ✓ | × | × |
| 分配任务 | ✓ | ✓ | ✓ | × |

## 2. Multi-Tenant
```text
Platform
├── Organization A
│   ├── Users
│   └── Projects
└── Organization B
    ├── Users
    └── Projects
```

核心要求：
> A 组织绝不能访问 B 组织的数据。

## 3. organization_id
业务表通常需要：
```text
organization_id
```

例如：
```sql
select *
from projects
where organization_id = :current_org;
```

## 4. Row Level Security
Supabase RLS：
https://supabase.com/docs/guides/database/postgres/row-level-security

示例概念：
```sql
alter table projects
enable row level security;
```

然后用 Policy 决定哪些行可访问。

## 5. 专门做越权测试
建立：
- Organization A
- Organization B
- A 用户
- B 用户

测试：
- A 能否读 B 项目
- A 能否改 B 项目
- A 能否删 B 项目
- A 能否访问 B 附件
- A 能否绕过页面直接调用 API

任何一项可以，都说明租户隔离未完成。

## 6. Audit Log
建议字段：
```text
id
organization_id
user_id
action
resource_type
resource_id
old_value
new_value
ip_address
user_agent
created_at
```

需要回答：
- 谁操作？
- 什么时间？
- 操作什么对象？
- 修改前是什么？
- 修改后是什么？

## 练习
实现：
1. role
2. permission
3. organization_members
4. RLS
5. 跨租户测试
6. 项目状态更新审计日志

## 验收
能清楚解释 RBAC 与 RLS 的区别：
- RBAC：角色允许做什么
- RLS：数据库中的哪些行允许访问