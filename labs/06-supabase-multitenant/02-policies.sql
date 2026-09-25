-- 教学策略：先读懂，再执行。
-- 生产环境还应结合 GRANT、角色模型、性能与完整安全审查。

create policy "members can read organizations"
on public.lab_organizations
for select
to authenticated
using (
  exists (
    select 1
    from public.lab_organization_members m
    where m.organization_id = lab_organizations.id
      and m.user_id = auth.uid()
  )
);

create policy "members can read memberships"
on public.lab_organization_members
for select
to authenticated
using (
  exists (
    select 1
    from public.lab_organization_members self_m
    where self_m.organization_id =
      lab_organization_members.organization_id
      and self_m.user_id = auth.uid()
  )
);

create policy "members can read projects"
on public.lab_projects
for select
to authenticated
using (
  exists (
    select 1
    from public.lab_organization_members m
    where m.organization_id =
      lab_projects.organization_id
      and m.user_id = auth.uid()
  )
);

create policy "admins and managers can create projects"
on public.lab_projects
for insert
to authenticated
with check (
  created_by = auth.uid()
  and exists (
    select 1
    from public.lab_organization_members m
    where m.organization_id =
      lab_projects.organization_id
      and m.user_id = auth.uid()
      and m.role in ('admin', 'manager')
  )
);

create policy "admins and managers can update projects"
on public.lab_projects
for update
to authenticated
using (
  exists (
    select 1
    from public.lab_organization_members m
    where m.organization_id =
      lab_projects.organization_id
      and m.user_id = auth.uid()
      and m.role in ('admin', 'manager')
  )
)
with check (
  exists (
    select 1
    from public.lab_organization_members m
    where m.organization_id =
      lab_projects.organization_id
      and m.user_id = auth.uid()
      and m.role in ('admin', 'manager')
  )
);

create policy "admins can delete projects"
on public.lab_projects
for delete
to authenticated
using (
  exists (
    select 1
    from public.lab_organization_members m
    where m.organization_id =
      lab_projects.organization_id
      and m.user_id = auth.uid()
      and m.role = 'admin'
  )
);
