-- 使用固定 UUID，方便练习

insert into lab_organizations (
  id, name, code
) values
(
  '00000000-0000-0000-0000-000000000001',
  'Hospital A',
  'HOSP-A'
),
(
  '00000000-0000-0000-0000-000000000002',
  'Hospital B',
  'HOSP-B'
)
on conflict do nothing;

insert into lab_users (
  id, email, display_name
) values
(
  '10000000-0000-0000-0000-000000000001',
  'admin-a@example.test',
  'Admin A'
),
(
  '10000000-0000-0000-0000-000000000002',
  'engineer-a@example.test',
  'Engineer A'
),
(
  '10000000-0000-0000-0000-000000000003',
  'admin-b@example.test',
  'Admin B'
)
on conflict do nothing;

insert into lab_organization_members (
  organization_id,
  user_id,
  role
) values
(
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'admin'
),
(
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  'engineer'
),
(
  '00000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000003',
  'admin'
)
on conflict do nothing;

insert into lab_projects (
  id,
  organization_id,
  name,
  status,
  go_live_date
) values
(
  '20000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'HIS Upgrade',
  'active',
  current_date + 30
),
(
  '20000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'LIS Interface',
  'planning',
  current_date + 60
),
(
  '20000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000002',
  'PACS Upgrade',
  'active',
  current_date + 45
)
on conflict do nothing;
