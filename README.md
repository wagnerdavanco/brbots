# BRBots LP

Modernized landing page for BRBots S/A.

## Stack
Next.js 16 | TypeScript | Tailwind 4 | next-intl | Framer Motion | react-hook-form | zod

## Local dev
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000

## Scripts
- `npm run dev` -- dev server
- `npm run build` -- production build
- `npm run lint` -- ESLint

## Env
- `NEXT_PUBLIC_WHATSAPP_NUMBER` -- destination WhatsApp (digits only, with country code)

## Deploy
Push to `main` -- Vercel auto-deploys.
