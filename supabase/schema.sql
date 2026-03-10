-- Abangares Run - Database Schema
-- Run this in the Supabase SQL Editor

-- Orders table
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  order_number text unique not null,
  total_amount integer not null,
  payment_proof_url text,
  status text default 'pendiente' check (status in ('pendiente', 'confirmado', 'rechazado')),
  created_at timestamp with time zone default now()
);

-- Registrations table
create table if not exists registrations (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  nombre text not null,
  apellidos text not null,
  genero text not null check (genero in ('masculino', 'femenino')),
  fecha_nacimiento date not null,
  cedula text not null,
  telefono text not null,
  talla_camiseta text not null check (talla_camiseta in ('XS', 'S', 'M', 'L', 'XL', 'XXL')),
  ruta text not null check (ruta in ('10km', '6km', '3.5km', 'kids')),
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table orders enable row level security;
alter table registrations enable row level security;

-- Policies: allow inserts from anon (public registration)
create policy "Allow public insert on orders" on orders for insert with check (true);
create policy "Allow public select on orders" on orders for select using (true);
create policy "Allow public update on orders" on orders for update using (true);

create policy "Allow public insert on registrations" on registrations for insert with check (true);
create policy "Allow public select on registrations" on registrations for select using (true);

-- Storage bucket for payment proofs
-- Run this separately or create via Supabase dashboard:
-- insert into storage.buckets (id, name, public) values ('comprobantes', 'comprobantes', true);

-- Storage policy for public uploads
-- create policy "Allow public uploads" on storage.objects for insert with check (bucket_id = 'comprobantes');
-- create policy "Allow public reads" on storage.objects for select using (bucket_id = 'comprobantes');
