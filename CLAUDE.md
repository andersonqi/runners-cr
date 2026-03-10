# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server (http://localhost:3000)
- `npm run build` — Production build
- `npm run lint` — Run ESLint (flat config with Next.js core-web-vitals + TypeScript rules)

## Architecture

Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4, Supabase (DB + Storage).

**Path alias:** `@/*` maps to project root.

### Pages
- `/` — Landing page (event info, routes, pricing)
- `/inscripcion` — Registration form (multi-participant, payment upload, WhatsApp link)
- `/dashboard` — Admin dashboard (view orders, registrations, confirm/reject payments)

### API Routes
- `POST /api/orders` — Create order + registrations, returns order with generated order_number
- `POST /api/upload` — Upload payment proof (multipart form: file + order_id), stores in Supabase Storage `comprobantes` bucket

### Data Model (Supabase)
- `orders` — id, order_number, total_amount, payment_proof_url, status (pendiente/confirmado/rechazado)
- `registrations` — id, order_id (FK), nombre, apellidos, genero, fecha_nacimiento, cedula, telefono, talla_camiseta, ruta

### Key Files
- `lib/supabase.ts` — Supabase client (uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY)
- `lib/types.ts` — Shared types, route definitions (RUTAS), pricing, helpers
- `supabase/schema.sql` — Database schema to run in Supabase SQL Editor

### Design System
Colors from the event flyer: navy (#0f1b2d), orange (#f58a3b), teal (#4bc5c1), purple (#9b59b6), gold (#d4a843). Defined as CSS variables and Tailwind theme tokens (e.g. `bg-navy`, `text-orange`).
