-- Lab 03.1
-- 多租户基础 Schema

create table if not exists lab_organizations (
  id uuid primary key,
  name text not null,
  code text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists lab_users (
  id uuid primary key,
  email text not null unique,
  display_name text not null
);

create table if not exists lab_organization_members (
  organization_id uuid not null
    references lab_organizations(id)
    on delete cascade,
  user_id uuid not null
    references lab_users(id)
    on delete cascade,
  role text not null
    check (role in (
      'admin',
      'manager',
      'engineer'
    )),
  primary key (
    organization_id,
    user_id
  )
);

create table if not exists lab_projects (
  id uuid primary key,
  organization_id uuid not null
    references lab_organizations(id),
  name text not null,
  status text not null
    check (status in (
      'planning',
      'active',
      'completed'
    )),
  go_live_date date,
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (organization_id, name)
);

create index if not exists
  idx_lab_projects_org_status
on lab_projects (
  organization_id,
  status
);
