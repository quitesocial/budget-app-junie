-- Create users table
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.users enable row level security;

-- Create policy for users to only see their own data
create policy "Users can only view their own data"
  on public.users
  for select
  using (auth.uid() = id);

-- Create policy for users to only update their own data
create policy "Users can only update their own data"
  on public.users
  for update
  using (auth.uid() = id);
