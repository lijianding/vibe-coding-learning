# 09 PostgreSQL 与数据库设计：从会写 SQL 到会设计 SaaS 数据层

主教材：
- PostgreSQL Tutorial: https://www.postgresql.org/docs/current/tutorial.html
- PostgreSQL Docs: https://www.postgresql.org/docs/current/

你已有 SQL Server 基础，本章重点放在 PostgreSQL 特性和数据库设计原则。

---

## 一、关系型数据库解决什么问题

关系数据库的核心不是“存表格”，而是：

- 结构化数据
- 关系
- 约束
- 查询
- 事务
- 并发
- 持久化

例如：

```text
Organization
  1 ─── N Project
Project
  1 ─── N Task
User
  N ─── N Project
```

---

## 二、Table / Row / Column

表：

```text
projects
```

Row：

一个具体项目。

Column：

```text
id
organization_id
name
status
```

---

## 三、Primary Key

Primary Key 唯一标识一行。

推荐 SaaS 常用 UUID：

```sql
id uuid primary key
```

优点：

- 分布式生成方便
- 不暴露简单自增数量
- 跨系统合并更容易

但 UUID 索引也有空间/局部性成本，需要理解而不是迷信。

---

## 四、Foreign Key

```sql
organization_id uuid
references organizations(id)
```

作用：

> 数据库保证 organization_id 引用真实 Organization。

没有 FK：

可能产生孤儿数据。

---

## 五、Constraint 是数据库最后一道业务结构防线

常见：

- NOT NULL
- UNIQUE
- CHECK
- FOREIGN KEY
- PRIMARY KEY

例如：

```sql
check (status in (
  'planning',
  'active',
  'completed'
))
```

即使应用代码 Bug，数据库仍然可以拒绝非法值。

---

## 六、Normalization

目标：

> 减少重复和更新异常。

错误设计：

```text
project
- manager_name
- manager_phone
- manager_email
```

如果同一个 User 管多个项目，会重复大量数据。

更合理：

```text
users
projects.manager_id → users.id
```

但也不是“越规范越好”。

报表、读性能等场景可能有合理冗余。

---

## 七、One-to-Many

Organization → Projects：

```text
organizations.id
↓
projects.organization_id
```

一个组织多个项目。

---

## 八、Many-to-Many

Project 与 User：

一个项目多个成员，一个用户也能参与多个项目。

建立中间表：

```text
project_members
- project_id
- user_id
- role
```

---

## 九、Index 的原理直觉

没有 Index：

```text
扫描大量行
↓
找到符合条件的数据
```

有 Index：

类似书的目录，可以更快定位。

例如：

```sql
create index idx_projects_org
on projects(organization_id);
```

### Index 不免费

代价：

- 占磁盘
- INSERT/UPDATE/DELETE 要维护
- 太多索引会降低写性能

所以索引应服务真实查询。

---

## 十、Composite Index

如果经常查询：

```sql
where organization_id = ?
  and status = ?
order by created_at desc
```

可能考虑组合索引。

但列顺序非常重要。

需要学会用：

```sql
EXPLAIN
EXPLAIN ANALYZE
```

而不是“觉得慢就加索引”。

---

## 十一、Transaction

事务的核心：

> 一组操作要么全部成功，要么全部失败。

ACID：

- Atomicity
- Consistency
- Isolation
- Durability

例如创建项目：

```text
INSERT project
INSERT project_manager
INSERT audit_log
```

如果中间失败，不应留下半个项目。

---

## 十二、并发与 Isolation

两个用户同时修改同一记录会发生什么？

这是商业系统必须考虑的问题。

可能涉及：

- lost update
- dirty read
- non-repeatable read
- serialization

PostgreSQL 使用 MVCC 管理大量并发场景。

初期至少要理解：

> 事务并不只是“失败回滚”，也决定多个并发操作看到什么。

---

## 十三、Lock

数据库可能锁：

- Row
- Table

例如：

```sql
select ...
for update
```

可以锁住将被更新的行。

但锁持有太久可能造成阻塞甚至死锁。

---

## 十四、UUID / timestamptz / jsonb

### UUID

适合实体 ID。

### timestamptz

通常比不带时区 timestamp 更适合全球 SaaS 的事件时间。

推荐内部以明确时区语义保存，展示时转换用户时区。

### JSONB

适合：

- 可变 metadata
- 不固定配置
- 某些 audit payload

但不要把整个关系模型全部塞 JSONB。

---

## 十五、Soft Delete

增加：

```sql
deleted_at timestamptz null
```

读取：

```sql
where deleted_at is null
```

优点：

- 可恢复
- 审计友好

代价：

- 所有查询需考虑 deleted
- unique 约束更复杂
- 数据一直保留带来隐私/合规问题

所以 Soft Delete 也不是所有表都必须使用。

---

## 十六、Audit Columns

常见：

```text
created_at
created_by
updated_at
updated_by
deleted_at
```

注意：

业务 Audit Log 与这些字段不是一回事。

---

## 十七、多租户数据模型

核心：

```text
organization_id
```

典型：

```sql
create table projects (
  id uuid primary key,
  organization_id uuid not null
    references organizations(id),
  name text not null
);
```

查询永远考虑租户：

```sql
where organization_id = :current_org
```

后面进一步用 RLS 在数据库层限制。

---

## 十八、唯一约束必须考虑租户

错误：

```sql
unique(name)
```

这会导致不同医院不能有同名项目。

可能应该：

```sql
unique(organization_id, name)
```

所以 SaaS 建模必须问：

> 唯一是全平台唯一，还是租户内唯一？

---

## 十九、Migration

数据库结构不能手工“在线上点两下”。

应该：

```text
Migration File
↓
Review
↓
Test
↓
Apply
```

Migration 要考虑：

- 老数据
- default
- nullability
- lock
- rollback
- index creation cost

---

## 二十、Pagination

Offset：

```sql
limit 20 offset 40
```

简单，但深分页可能变慢且数据变化会造成跳行。

Cursor/Keyset：

```sql
where created_at < :last_seen
order by created_at desc
limit 20
```

大列表通常更稳。

---

## 二十一、Schema 设计建议

基础：

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

### organizations

```text
id
name
created_at
```

### organization_members

```text
organization_id
user_id
role
status
joined_at
```

### projects

```text
id
organization_id
name
status
manager_id
start_date
go_live_date
created_at
updated_at
deleted_at
```

---

## 二十二、数据库设计检查问题

任何表都问：

1. 主键是什么？
2. 是否属于 Organization？
3. 哪些字段 NOT NULL？
4. 唯一性范围是什么？
5. Foreign Key 是什么？
6. 删除父数据怎么办？
7. 哪些查询频繁？
8. 需要哪些 Index？
9. 是否需要事务？
10. 是否要审计？
11. 是否有隐私保存周期？

---

## 二十三、练习

设计 Issue 表，并解释：

- 为什么每个字段存在
- 哪些 NOT NULL
- 哪些 FK
- 哪些 Index
- Unique 是否需要
- Soft Delete 是否需要
- Tenant 如何隔离

然后写：

```sql
EXPLAIN
SELECT ...
```

观察查询计划。

---

## 二十四、验收

你应该理解：

- PK / FK / Constraint
- Normalization
- 1:N / N:N
- Index 与成本
- Composite Index
- Transaction / ACID
- 基础并发问题
- MVCC 直觉
- Soft Delete
- JSONB 使用边界
- Multi-Tenant schema
- Migration

## 推荐资料

- PostgreSQL Tutorial: https://www.postgresql.org/docs/current/tutorial.html
- Indexes: https://www.postgresql.org/docs/current/indexes.html
- Concurrency Control: https://www.postgresql.org/docs/current/mvcc.html
- Constraints: https://www.postgresql.org/docs/current/ddl-constraints.html
- JSON Types: https://www.postgresql.org/docs/current/datatype-json.html
