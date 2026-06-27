create table if not exists public.study_tracker_sync (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.study_tracker_sync enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.study_tracker_sync to anon, authenticated;

drop policy if exists "Study tracker can read shared row" on public.study_tracker_sync;
drop policy if exists "Study tracker can insert shared row" on public.study_tracker_sync;
drop policy if exists "Study tracker can update shared row" on public.study_tracker_sync;

create policy "Study tracker can read shared row"
on public.study_tracker_sync
for select
to anon, authenticated
using (id = 'resul-ai-tracker');

create policy "Study tracker can insert shared row"
on public.study_tracker_sync
for insert
to anon, authenticated
with check (id = 'resul-ai-tracker');

create policy "Study tracker can update shared row"
on public.study_tracker_sync
for update
to anon, authenticated
using (id = 'resul-ai-tracker')
with check (id = 'resul-ai-tracker');
