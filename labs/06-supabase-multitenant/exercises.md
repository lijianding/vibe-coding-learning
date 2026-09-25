# Supabase / RLS 练习

## 练习 1

修改规则：

> Engineer 可以创建 Project，但不能 Update/Delete。

指出需要修改哪个 Policy，并解释原因。

## 练习 2

增加 `project_members`。

要求：

> Project Manager 只能更新自己参与的 Project。

回答：

- 仅 RBAC 是否足够？
- 是否需要 Resource-level Authorization？
- RLS 中需要增加什么关系判断？

## 练习 3

解释为什么下面的 Policy 危险：

`USING (true)`

## 练习 4

分别解释：

- `USING`
- `WITH CHECK`

它们在 SELECT/UPDATE/INSERT 场景中各控制什么。

## 练习 5

为什么使用 UUID 仍不能代替授权？

请解释 UUID 与 Authorization 的区别。

## 练习 6

为附件 Storage 设计测试：

- A 下载 A 文件
- A 下载 B 文件
- Anonymous 下载 Private 文件
- Signed URL 过期
- A 尝试为 B 文件生成 Signed URL

## 练习 7

写自己的 Tenant Security Checklist，至少覆盖：

- SELECT
- INSERT
- UPDATE
- DELETE
- Search
- Dashboard
- Export
- Storage
- Audit
