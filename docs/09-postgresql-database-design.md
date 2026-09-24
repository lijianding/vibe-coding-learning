# 09 PostgreSQL 与数据库设计

官方：
https://www.postgresql.org/docs/current/tutorial.html

你已经有 SQL Server 基础，这一章重点不是重新学 SELECT，而是从“会查数据”升级到“会设计 SaaS 数据模型”。

## 必须掌握
- SELECT / INSERT / UPDATE / DELETE
- JOIN
- GROUP BY
- ORDER BY
- LIMIT
- WITH
- CASE
- Primary Key
- Foreign Key
- Unique Constraint
- Index
- Transaction
- UUID
- JSONB

## SaaS 第一版表结构
```text
organizations
users
organization_members
projects
project_members
tasks
issues
requirements
comments
attachments
audit_logs
```

## organizations
```sql
create table organizations (
  id uuid primary key,
  name text not null,
  created_at timestamptz not null default now()
);
```

## projects
```sql
create table projects (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  name text not null,
  status text not null,
  start_date date,
  go_live_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## 为什么 organization_id 很重要
它是多租户隔离的重要基础。

以后任何查询都要思考：
```sql
where organization_id = ?
```

## Index
典型索引：
```sql
create index idx_projects_org
on projects(organization_id);
```

常见需要考虑索引的字段：
- organization_id
- project_id
- user_id
- status
- created_at

## Transaction
场景：
1. 创建项目
2. 创建项目经理关系
3. 创建默认里程碑

任何一步失败，都不应留下半成品。

## Soft Delete
企业系统常用：
```text
deleted_at
```
而不是立刻物理删除。

## 练习
设计 Task 表：
- id
- organization_id
- project_id
- title
- status
- priority
- assignee_id
- due_date
- created_at
- updated_at

要求：
- 主键
- 外键
- 非空约束
- 至少两个索引

## 验收
能解释：
- 主键和外键区别
- 为什么需要索引
- 什么是事务
- 为什么多租户表通常要有 organization_id
- Soft Delete 的意义