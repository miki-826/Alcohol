create table if not exists public.game_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  mood text not null,
  order_text text not null,
  drink text not null,
  food text not null,
  talk text not null,
  score int not null,
  reaction text not null,
  comment text not null,
  title text not null
);

alter table public.game_results enable row level security;

create policy "Allow anonymous insert" on public.game_results
  for insert with check (true);

create policy "Allow anonymous read" on public.game_results
  for select using (true);
