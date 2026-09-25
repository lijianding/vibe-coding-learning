-- PostgreSQL 参考答案

-- 1. 所有 active project
select organization_id, id, name
from lab_projects
where status = 'active'
  and deleted_at is null;

-- 2. Hospital A 未来 60 天上线项目
select id, name, go_live_date
from lab_projects
where organization_id =
  '00000000-0000-0000-0000-000000000001'
  and deleted_at is null
  and go_live_date between current_date
  and current_date + 60
order by go_live_date;

-- 3. 每个 Organization 项目总数
select organization_id, count(*) as project_count
from lab_projects
where deleted_at is null
group by organization_id;

-- 4. 每个 Organization active 数量
select
  organization_id,
  count(*) filter (
    where status = 'active'
  ) as active_count
from lab_projects
where deleted_at is null
group by organization_id;

-- 5. go_live_date 索引
create index if not exists idx_lab_projects_go_live
on lab_projects(go_live_date);

-- 是否值得创建必须结合实际 Query + EXPLAIN。

-- 6. Transaction
begin;

update lab_projects
set status = 'completed'
where id =
  '20000000-0000-0000-0000-000000000001';

-- 故意违反 CHECK
insert into lab_projects (
  id, organization_id, name, status
) values (
  '20000000-0000-0000-0000-000000000099',
  '00000000-0000-0000-0000-000000000001',
  'Broken Project',
  'INVALID'
);

rollback;

-- 7. 同租户重名会违反：
-- unique (organization_id, name)

-- 8. invalid status 会违反 CHECK constraint.

-- 9. Query Plan
explain
select id, name
from lab_projects
where organization_id =
  '00000000-0000-0000-0000-000000000001'
  and status = 'active';

-- 10.
-- unique(name) 会错误地要求所有租户全平台不能重名。
-- 多租户通常需要：
-- unique(organization_id, name)
