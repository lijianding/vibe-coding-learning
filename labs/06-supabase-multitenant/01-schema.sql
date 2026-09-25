-- 仅在测试 Supabase Project 使用。

create table if not exists public.lab_organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.lab_organization_members (
  organization_id uuid not null
    references public.lab_organizations(id)
    on delete cascade,
  user_id uuid not null
    references auth.users(id)
    on delete cascade,
  role text not null
    check (role in ('admin', 'manager', 'engineer')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table if not exists public.lab_projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null
    references public.lab_organizations(id)
    on delete cascade,
  name text not null,
  status text not null
    check (status in ('planning', 'active', 'completed')),
  created_by uuid not null
    references auth.users(id),
  created_at timestamptz not null default now(),
  unique (organization_id, name)
);

create index if not exists idx_lab_members_user
on public.lab_organization_members(user_id);

create index if not exists idx_lab_projects_org
on public.lab_projects(organization_id);

alter table public.lab_organizations
enable row level security;

alter table public.lab_organization_members
enable row level security;

alter table public.lab_projects
enable row level security;
