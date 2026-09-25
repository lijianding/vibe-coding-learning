# Lab 06 — Supabase Multi-Tenant + RLS

对应教材：

- [Supabase](../../docs/12-supabase-auth-crud.md)
- [RBAC / Multi-Tenant / RLS](../../docs/13-rbac-multitenant-rls-audit.md)

## 官方资料

- Supabase Database: https://supabase.com/docs/guides/database
- Supabase Auth: https://supabase.com/docs/guides/auth
- RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- API Security: https://supabase.com/docs/guides/api/securing-your-api

## 目标

建立 organizations、organization_members、projects，并通过 RLS 证明：

> Org A 用户只能访问 Org A 项目。

## 推荐顺序

1. 在一个专用测试 Supabase Project 中运行 `01-schema.sql`
2. 阅读并执行 `02-policies.sql`
3. 准备测试用户和租户数据
4. 按 `03-test-plan.md` 验证 Allow / Deny
5. 完成 `exercises.md`

## 强烈提醒

不要在生产 Supabase 项目运行本 Lab。

不要使用真实患者数据。

## 学习重点

你必须能解释：

- auth.uid()
- authenticated role
- RLS enabled
- USING
- WITH CHECK
- SELECT / INSERT / UPDATE / DELETE policy
- Service Role 风险
- UUID 为什么不是 Authorization
