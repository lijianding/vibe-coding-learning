# RLS 测试计划

准备：

- Organization A
- Organization B
- Admin A
- Engineer A
- Admin B
- Engineer B
- Project A1
- Project B1

## SELECT

| User | Resource | Expected |
|---|---|---|
| Admin A | Project A1 | Allow |
| Engineer A | Project A1 | Allow |
| Admin A | Project B1 | Deny/Invisible |
| Anonymous | Project A1 | Deny |

## INSERT

| User | organization_id | Expected |
|---|---|---|
| Admin A | A | Allow |
| Engineer A | A | Deny |
| Admin A | B | Deny |

## UPDATE

| User | Resource | Expected |
|---|---|---|
| Admin A | Project A1 | Allow |
| Engineer A | Project A1 | Deny |
| Admin A | Project B1 | Deny |

## DELETE

| User | Resource | Expected |
|---|---|---|
| Admin A | Project A1 | Allow |
| Manager A | Project A1 | Deny |
| Admin A | Project B1 | Deny |

## 必做攻击实验

### 改 Project ID

把 A 的项目 ID 换成 B 的项目 ID，验证不能读取。

### 改 organization_id

Admin A 尝试创建 organization_id=B 的项目，必须失败。

### 直接调用 API

不要只通过 UI。使用普通 authenticated 用户身份直接调用 Supabase API，验证 Policy。

### Service Role

不要用 Service Role 进行 RLS 用户行为测试，因为高权限角色可能绕过 RLS。
