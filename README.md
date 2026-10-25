# Wordle

A Wordle clone with accounts: guess the five-letter word in six tries, sign in, and keep your game history and stats.

## What it does

- Six guesses at a five-letter word, with an on-screen keyboard and toast feedback
- Sign up / log in with email and password, or with Google (Supabase Auth)
- Finished games are saved per user; a stats dialog shows games played, win %, current and max streak
- Change your username
- Light and dark theme

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- Supabase Auth via `@supabase/ssr`
- Prisma 5 with PostgreSQL (hosted on Supabase)
- TanStack Query
- Tailwind CSS, Radix UI primitives (shadcn/ui style), lucide-react icons
- react-hot-toast

## Run locally

Requires Node.js 20+ and a Supabase project (or any Postgres database plus a Supabase project for auth).

```bash
git clone https://github.com/lucaszebre/Wordle.git
cd Wordle
npm ci
cp .env.example .env
```

Fill in `.env` (see `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL` (pooled connection)
- `DIRECT_URL` (direct connection, used for migrations)

Then create the tables and start the app:

```bash
npx prisma migrate deploy
npm run dev
```

The app runs at http://localhost:3000. For Google sign-in, enable the Google provider in Supabase and add `http://localhost:3000/auth/callback` as a redirect URL.

Production build:

```bash
npm run build
npm start
```

## Status

Built in 2024 as a learning project; not actively maintained.
