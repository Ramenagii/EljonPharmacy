# Eljon Pharmacy

React/Vite pharmacy storefront with a serverless Supabase backend for sales recording and reporting.

## Local Setup

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Fill `.env.local` with your Supabase project values:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_ADMIN_EMAILS=owner@example.com,staff@example.com
```

## Supabase Setup

1. Create a free Supabase project.
2. Open the SQL editor.
3. Run [supabase/schema.sql](./supabase/schema.sql).
4. Create an Auth user for the admin account.
5. Add that admin email to `VITE_ADMIN_EMAILS`.

## Pages

- `/shop` - customer shopping page
- `/cart` - checkout writes a sale to Supabase
- `/admin` - admin sign-in, manual sale recording, and reports
- `/reports` - report view for signed-in Supabase users

## Deploy To Vercel

Use Vercel with these settings:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: same values from `.env.local`

This repo includes `vercel.json` so browser routes like `/admin` work after deployment.
