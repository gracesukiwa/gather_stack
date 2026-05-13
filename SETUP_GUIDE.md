# 🎲 GatherStack — Setup Guide

Everything is built. Follow these steps **in order** and you'll have a live product.

---

## STEP 1 — Create Your Supabase Project (5 min)

1. Go to **https://supabase.com** → click **Start your project**
2. Sign up / Log in → click **New Project**
3. Fill in:
   - Name: `gatherstack`
   - Database Password: (save this somewhere)
   - Region: pick the closest to Indonesia (e.g., Singapore)
4. Wait ~2 minutes for it to provision

---

## STEP 2 — Run the Database Schema (2 min)

1. In your Supabase project → click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file `supabase-schema.sql` from your GatherStack folder
4. Copy everything → paste it into the SQL editor
5. Click **Run** (the green button)

✅ You should see "Success. No rows returned."

---

## STEP 3 — Get Your Supabase Keys (1 min)

1. In Supabase → click **Settings** (gear icon) → **API**
2. Copy:
   - **Project URL** → looks like `https://abcxyz.supabase.co`
   - **anon public** key → long string starting with `eyJ...`
   - **service_role** key → another long string (keep secret!)

---

## STEP 4 — Set Up the Project Locally (3 min)

1. Install **Node.js** from https://nodejs.org (download the LTS version)
2. Open **Terminal** (Mac) or **Command Prompt** (Windows)
3. Navigate to your GatherStack folder:
   ```
   cd path/to/gatherstack
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Create your environment file:
   - Duplicate `.env.local.example`
   - Rename the copy to `.env.local`
   - Open it and fill in your keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key...
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

---

## STEP 5 — Run Locally (1 min)

```
npm run dev
```

Open **http://localhost:3000** in your browser. 🎉

---

## STEP 6 — Make Yourself an Admin

1. Go to http://localhost:3000/auth/register
2. Create your admin account
3. In Supabase → **SQL Editor** → run:
   ```sql
   update public.profiles set role = 'admin' where email = 'YOUR_EMAIL_HERE';
   ```
4. Now go to http://localhost:3000/admin — you have full access!

---

## STEP 7 — Deploy to Vercel (5 min)

1. Push your code to **GitHub**:
   - Go to https://github.com → New repository → `gatherstack`
   - Follow the instructions to push your local code

2. Go to **https://vercel.com** → Log in with GitHub
3. Click **Add New Project** → Import your `gatherstack` repo
4. Before deploying, add your environment variables:
   - Click **Environment Variables** section
   - Add the same 4 variables from your `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_SITE_URL` → set this to your Vercel URL (e.g. `https://gatherstack.vercel.app`)
5. Click **Deploy**

✅ Vercel will give you a live URL in ~2 minutes.

---

## WHAT'S BUILT

| Page | URL | Who sees it |
|------|-----|-------------|
| Landing Page | `/` | Everyone |
| Register | `/auth/register` | Everyone |
| Login | `/auth/login` | Everyone |
| Order Page | `/order` | Logged-in users |
| Order History | `/dashboard` | Logged-in users |
| Admin Dashboard | `/admin` | Admin users only |

---

## MANAGING ORDERS

- Log into `/admin` with your admin account
- See all orders in real-time
- Change status (Pending → Confirmed → Shipped → Delivered) via dropdown
- Search by name, email, city, or order ID
- All changes save instantly

---

## PRICE CHANGE

To change the product price, open:
`app/order/page.tsx`

Find line:
```
const UNIT_PRICE = 149000;
```

Change `149000` to your desired price in Rupiah.

---

## NEED HELP?

The entire codebase is yours. Every file is documented and readable.
No black boxes, no subscriptions, no hidden fees.
