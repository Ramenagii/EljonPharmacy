create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  sale_date date not null default current_date,
  items jsonb not null default '[]'::jsonb,
  total numeric(12, 2) not null check (total >= 0),
  payment_method text not null default 'cash',
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists sales_sale_date_idx on public.sales (sale_date);
create index if not exists sales_created_at_idx on public.sales (created_at desc);

alter table public.sales enable row level security;

drop policy if exists "Anyone can create sales" on public.sales;
create policy "Anyone can create sales"
on public.sales
for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated users can read sales" on public.sales;
create policy "Authenticated users can read sales"
on public.sales
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can update sales" on public.sales;
create policy "Authenticated users can update sales"
on public.sales
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete sales" on public.sales;
create policy "Authenticated users can delete sales"
on public.sales
for delete
to authenticated
using (true);
