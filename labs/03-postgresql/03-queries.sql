-- 1. 查看全部项目
select *
from lab_projects
order by created_at;

-- 2. Hospital A 的项目
select id, name, status
from lab_projects
where organization_id =
  '00000000-0000-0000-0000-000000000001'
and deleted_at is null;

-- 3. JOIN
select
  p.name as project_name,
  o.name as organization_name,
  p.status
from lab_projects p
join lab_organizations o
  on o.id = p.organization_id
order by o.name, p.name;

-- 4. GROUP BY
select
  organization_id,
  status,
  count(*) as project_count
from lab_projects
group by organization_id, status
order by organization_id, status;

-- 5. 查询计划
explain
select id, name, status
from lab_projects
where organization_id =
  '00000000-0000-0000-0000-000000000001'
and status = 'active';

-- 6. Transaction 示例
begin;

update lab_projects
set status = 'completed'
where id =
  '20000000-0000-0000-0000-000000000001';

-- 先观察，再决定：
rollback;

-- 把 rollback 改成 commit 可真正提交。
