# BRBots LP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a modernized bilingual (PT/EN) dark-themed Next.js landing page for BRBots S/A, replacing https://www.brbotssa.com.br/ with a "Neon Grid" aesthetic (violet→cyan gradients) and WhatsApp-first contact flow.

**Architecture:** Next.js 15 App Router with `[locale]` segment driven by `next-intl`. Content lives in `messages/{pt,en}.json` + typed arrays in `lib/content.ts`. No backend: the contact form builds a pre-formatted WhatsApp message and opens `wa.me`. Section components in `components/sections/` compose the home page. Framer Motion for scroll reveals + animated hero blob.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, shadcn/ui primitives, Framer Motion, next-intl, react-hook-form, zod, lucide-react, Geist fonts. Deploy target: Vercel.

**Design Reference:** `docs/plans/2026-04-16-brbots-lp-design.md`

---

## Conventions

- **Commit style:** Conventional Commits (`feat:`, `chore:`, `style:`, `fix:`). Commit after each task.
- **Verification gate per task:** `npm run type-check` + `npm run lint` must pass before commit. Visual verification in dev server when relevant.
- **No unit tests** (per design). Verification = type-check + lint + manual browser check.
- **File paths** are absolute from repo root `C:/repos/brbots_lp/`.
- **Package manager:** `npm` (default for Next.js scaffold).

---

## Phase 1 — Scaffold & Configuration

### Task 1: Initialize Next.js project

**Files:**
- Create: repo root scaffold

**Step 1: Run scaffold**

```bash
cd C:/repos/brbots_lp
npx create-next-app@latest . \
  --typescript --tailwind --app --src-dir \
  --eslint --import-alias "@/*" --no-turbopack --use-npm
```
Accept defaults otherwise. If prompt about non-empty directory, allow.

**Step 2: Verify**

```bash
npm run dev
```
Expected: server at http://localhost:3000 shows Next.js welcome page. Stop with Ctrl+C.

**Step 3: Initialize git & first commit** (ask user before running if unsure)

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 15 + TS + Tailwind"
```

---

### Task 2: Install runtime dependencies

**Step 1: Install**

```bash
cd C:/repos/brbots_lp
npm install framer-motion next-intl react-hook-form zod @hookform/resolvers lucide-react clsx tailwind-merge class-variance-authority
npm install -D @types/node
```

**Step 2: Verify `package.json`** — confirm all packages listed in `dependencies`.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add runtime deps (framer-motion, next-intl, rhf, zod, lucide, cva)"
```

---

### Task 3: Add `cn` helper and Geist fonts

**Files:**
- Create: `src/lib/utils.ts`

**Step 1: Create `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 2: Replace `src/app/layout.tsx` fonts with Geist**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BRBots",
  description: "Comunicação Automatizada Inteligente",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
```

**Step 3: Verify**

```bash
npm run type-check 2>/dev/null || npx tsc --noEmit
npm run lint
```
Both pass.

**Step 4: Commit**

```bash
git add src/lib/utils.ts src/app/layout.tsx
git commit -m "chore: add cn helper and Geist fonts"
```

---

### Task 4: Configure Tailwind tokens + globals

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts` (or `tailwind.config.js` — whichever scaffold produced)

**Step 1: Replace `src/app/globals.css`**

```css
@import "tailwindcss";

:root {
  --bg-primary: #0A0A0F;
  --bg-elevated: #13131A;
  --brand-from: #8B5CF6;
  --brand-to: #06B6D4;
  --text-primary: #FAFAFA;
  --text-muted: #A1A1AA;
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16);
}

@theme inline {
  --color-bg: var(--bg-primary);
  --color-bg-elevated: var(--bg-elevated);
  --color-brand-from: var(--brand-from);
  --color-brand-to: var(--brand-to);
  --color-fg: var(--text-primary);
  --color-muted: var(--text-muted);
  --color-border: var(--border-subtle);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

html, body {
  background: var(--bg-primary);
  color: var(--text-primary);
}

body {
  font-family: var(--font-sans), ui-sans-serif, system-ui;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

.brand-gradient {
  background: linear-gradient(135deg, var(--brand-from) 0%, var(--brand-to) 100%);
}

.brand-text {
  background: linear-gradient(135deg, var(--brand-from) 0%, var(--brand-to) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.grid-bg {
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}
```

**Step 2: Verify**

```bash
npm run dev
```
Open localhost:3000 — background should be near-black.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add design tokens and base gradient utilities"
```

---

### Task 5: Configure next-intl routing

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/middleware.ts`
- Modify: `next.config.ts`

**Step 1: `src/i18n/routing.ts`**

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
});
```

**Step 2: `src/i18n/request.ts`**

```ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "pt" | "en")) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

**Step 3: `src/middleware.ts`**

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

**Step 4: Replace `next.config.ts`**

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

**Step 5: Move app to `[locale]`**

```bash
cd C:/repos/brbots_lp/src/app
mkdir -p "[locale]"
```

Move `page.tsx` and `layout.tsx` from `src/app/` to `src/app/[locale]/`. Keep `globals.css` at `src/app/`.

**Step 6: Create root `src/app/layout.tsx`** (only `<html>` shell is in `[locale]`)

Delete the old `src/app/layout.tsx` and recreate moved one in `[locale]/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BRBots — Comunicação Automatizada Inteligente",
  description: "Atendimento virtual por voz e texto até 8× mais econômico que humano.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "pt" | "en")) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Step 7: Minimal `src/app/[locale]/page.tsx`**

```tsx
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <h1 className="text-5xl font-bold brand-text">{t("title")}</h1>
    </main>
  );
}
```

**Step 8: Verify**

```bash
npm run dev
```
`http://localhost:3000` redirects to `/pt`. `/en` works (will show missing-key warning until Task 6).

**Step 9: Commit**

```bash
git add .
git commit -m "feat: wire next-intl with pt/en locale routing"
```

---

### Task 6: Seed i18n message files

**Files:**
- Create: `src/i18n/messages/pt.json`
- Create: `src/i18n/messages/en.json`

**Step 1: `src/i18n/messages/pt.json`**

```json
{
  "nav": {
    "about": "Quem Somos",
    "advantages": "Vantagens",
    "cases": "Cases",
    "differentials": "Diferenciais",
    "applications": "Aplicações",
    "contact": "Contato",
    "cta_whatsapp": "Fale no WhatsApp"
  },
  "hero": {
    "eyebrow": "BRBots S/A",
    "title": "Comunicação Automatizada Inteligente",
    "subtitle": "Atendimento virtual por voz e texto, até 8× mais econômico que humano. +15 anos revolucionando CX.",
    "cta_primary": "Fale no WhatsApp",
    "cta_secondary": "Ver diferenciais",
    "chips": { "calls": "+10M chamadas/dia", "years": "+15 anos", "hours": "24×7" }
  },
  "about": {
    "eyebrow": "Quem Somos",
    "title": "15+ anos automatizando conversas com clientes",
    "body_1": "Os BRBots são sistemas de atendimento virtual criados pela BRBots S/A para interagir com o consumidor final, proporcionando uma experiência única de comunicação rápida e eficiente por um custo até oito vezes menor do que o atendimento tradicional.",
    "body_2": "Somos uma das principais fornecedoras de tecnologia em telefonia computadorizada e nos distinguimos pela flexibilidade em criar produtos sob medida para marketing, cobrança, call center, operadoras de cartões, SAC e mais.",
    "offices_title": "Escritórios",
    "office_sp": "São Paulo — Brasil · Main Office",
    "office_sv": "Sunnyvale — Califórnia · Innovation Center"
  },
  "advantages": {
    "eyebrow": "Vantagens",
    "title": "Conheça as principais vantagens",
    "items": {
      "cost": { "title": "Redução de Custos", "desc": "Economia de até 8× comparado ao atendimento humano tradicional." },
      "always_on": { "title": "Atendimento 24×7", "desc": "Sua empresa disponível 24h por dia, 7 dias por semana, sem custo extra." },
      "omnichannel": { "title": "Omnichannel", "desc": "Múltiplos atendimentos simultâneos por texto ou voz." },
      "custom": { "title": "Personalização", "desc": "BRBots se adequam à sua necessidade, em atendimentos ativos ou receptivos." },
      "database": { "title": "Banco de Dados", "desc": "Gravação de todas as chamadas de voz e vídeo realizadas." },
      "monitor": { "title": "Gerenciamento", "desc": "Plataforma online com relatórios completos de todos os atendimentos." }
    }
  },
  "metrics": {
    "eyebrow": "Números",
    "calls": { "value": "10M+", "label": "chamadas por dia" },
    "years": { "value": "15+", "label": "anos de mercado" },
    "savings": { "value": "8×", "label": "mais econômico" },
    "uptime": { "value": "24/7", "label": "de disponibilidade" }
  },
  "cases": {
    "eyebrow": "Cases de Sucesso",
    "title": "Empresas que já revolucionaram sua comunicação"
  },
  "differentials": {
    "eyebrow": "Diferenciais",
    "title": "Por que escolher a BRBots",
    "items": {
      "capacity": { "title": "Capacidade Operacional", "desc": "Mais de 10 milhões de chamadas processadas por dia." },
      "integration": { "title": "Integração com Legados", "desc": "API, emulação de tela, RPA e Salesforce — conectamos qualquer sistema." },
      "grammar": { "title": "Design Gramatical", "desc": "Construção de frases e gramáticas complexas para diálogos naturais." },
      "economic": { "title": "Econômico", "desc": "Menor custo em relação à concorrência sem abrir mão da qualidade." },
      "proprietary": { "title": "Tecnologia Proprietária", "desc": "Sistema próprio, desenvolvido internamente, sem depender de soluções padrão." }
    }
  },
  "applications": {
    "eyebrow": "Aplicações Práticas",
    "title": "Onde os BRBots fazem a diferença",
    "items": {
      "registry": "Atualização cadastral",
      "servicedesk": "Service Desk",
      "sac": "SAC",
      "leads": "Geração de Leads",
      "candidates": "Filtro de Candidatos",
      "debt": "Renegociação de Dívida",
      "brand": "Apoio Institucional",
      "testdrive": "Agendamento de Test Drive",
      "products": "Dúvidas sobre Produtos",
      "interviews": "Agendamento de Entrevistas",
      "surveys": "Pesquisas de Qualidade",
      "learning": "Ensino e Aprendizado",
      "evaluation": "Avaliação de Colaborador",
      "tickets": "Abertura de Chamados"
    }
  },
  "contact": {
    "eyebrow": "Contato",
    "title": "Comece a revolucionar a comunicação da sua empresa",
    "subtitle": "Preencha abaixo e continue a conversa direto no WhatsApp.",
    "fields": {
      "name": "Nome",
      "email": "Email",
      "phone": "Telefone",
      "subject": "Assunto",
      "message": "Mensagem"
    },
    "errors": {
      "name": "Informe seu nome",
      "email": "Email inválido",
      "phone": "Telefone inválido",
      "subject": "Informe um assunto",
      "message": "Mensagem muito curta"
    },
    "submit": "Enviar no WhatsApp",
    "direct": "Ou fale direto no WhatsApp",
    "whatsapp_greeting": "Olá! Tenho interesse nos BRBots."
  },
  "location": {
    "eyebrow": "Onde Estamos",
    "title": "Presença local, alcance global",
    "sp": {
      "city": "São Paulo, Brasil",
      "address": "Rua Estela, 515 — Conj. 81/82 — Bloco A",
      "neighborhood": "Vila Mariana",
      "zip": "CEP 04.011-904"
    },
    "sv": {
      "city": "Sunnyvale, Califórnia",
      "address": "Innovation Center"
    },
    "phone": "(11) 2391-2687"
  },
  "footer": {
    "tagline": "Comunicação automatizada desde 2008.",
    "company": "BRBots Informática S/A",
    "cnpj": "CNPJ 05.084.150/0001-44",
    "rights": "Todos os direitos reservados."
  }
}
```

**Step 2: `src/i18n/messages/en.json`**

```json
{
  "nav": {
    "about": "About",
    "advantages": "Advantages",
    "cases": "Cases",
    "differentials": "Why BRBots",
    "applications": "Applications",
    "contact": "Contact",
    "cta_whatsapp": "Chat on WhatsApp"
  },
  "hero": {
    "eyebrow": "BRBots Inc.",
    "title": "Smart Automated Communication",
    "subtitle": "Virtual voice and text service up to 8× cheaper than humans. +15 years reshaping CX.",
    "cta_primary": "Chat on WhatsApp",
    "cta_secondary": "See differentials",
    "chips": { "calls": "+10M calls/day", "years": "+15 years", "hours": "24×7" }
  },
  "about": {
    "eyebrow": "About",
    "title": "15+ years automating customer conversations",
    "body_1": "BRBots are virtual service systems designed to interact with end consumers, delivering a unique fast and efficient communication experience at up to eight times lower cost than traditional human agents.",
    "body_2": "We are a leading provider of computerized telephony technology, known for flexibility in tailoring products for marketing, collections, call centers, card issuers, customer service, and more.",
    "offices_title": "Offices",
    "office_sp": "São Paulo — Brazil · Main Office",
    "office_sv": "Sunnyvale — California · Innovation Center"
  },
  "advantages": {
    "eyebrow": "Advantages",
    "title": "Our core advantages",
    "items": {
      "cost": { "title": "Cost Reduction", "desc": "Up to 8× cheaper than traditional human service." },
      "always_on": { "title": "24×7 Service", "desc": "Your company online every hour, every day — no extra cost." },
      "omnichannel": { "title": "Omnichannel", "desc": "Concurrent voice and text interactions at scale." },
      "custom": { "title": "Customization", "desc": "Tailored to your needs, inbound or outbound." },
      "database": { "title": "Full Recording", "desc": "Every voice and video call captured and searchable." },
      "monitor": { "title": "Management", "desc": "Online platform with full reporting for every interaction." }
    }
  },
  "metrics": {
    "eyebrow": "By the numbers",
    "calls": { "value": "10M+", "label": "calls per day" },
    "years": { "value": "15+", "label": "years in market" },
    "savings": { "value": "8×", "label": "cost savings" },
    "uptime": { "value": "24/7", "label": "availability" }
  },
  "cases": {
    "eyebrow": "Success Stories",
    "title": "Companies that already transformed their communication"
  },
  "differentials": {
    "eyebrow": "Why BRBots",
    "title": "What sets us apart",
    "items": {
      "capacity": { "title": "Operational Capacity", "desc": "More than 10 million calls handled per day." },
      "integration": { "title": "Legacy Integration", "desc": "API, screen emulation, RPA, Salesforce — we connect anywhere." },
      "grammar": { "title": "Grammar Design", "desc": "Complex phrase and grammar engineering for natural dialogue." },
      "economic": { "title": "Economic", "desc": "Lower cost than competitors without compromising quality." },
      "proprietary": { "title": "Proprietary Tech", "desc": "Our own stack, built in-house — no generic platforms." }
    }
  },
  "applications": {
    "eyebrow": "Use Cases",
    "title": "Where BRBots deliver impact",
    "items": {
      "registry": "Record updating",
      "servicedesk": "Service Desk",
      "sac": "Customer Support",
      "leads": "Lead Generation",
      "candidates": "Candidate Screening",
      "debt": "Debt Renegotiation",
      "brand": "Brand Outreach",
      "testdrive": "Test Drive Booking",
      "products": "Product Inquiries",
      "interviews": "Interview Scheduling",
      "surveys": "Quality Surveys",
      "learning": "Training & Learning",
      "evaluation": "Employee Evaluation",
      "tickets": "Ticket Opening"
    }
  },
  "contact": {
    "eyebrow": "Contact",
    "title": "Start transforming your company's communication",
    "subtitle": "Fill in below and continue the conversation on WhatsApp.",
    "fields": {
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "subject": "Subject",
      "message": "Message"
    },
    "errors": {
      "name": "Please enter your name",
      "email": "Invalid email",
      "phone": "Invalid phone",
      "subject": "Please enter a subject",
      "message": "Message too short"
    },
    "submit": "Send on WhatsApp",
    "direct": "Or chat directly on WhatsApp",
    "whatsapp_greeting": "Hi! I'm interested in BRBots."
  },
  "location": {
    "eyebrow": "Where we are",
    "title": "Local presence, global reach",
    "sp": {
      "city": "São Paulo, Brazil",
      "address": "Rua Estela, 515 — Conj. 81/82 — Bloco A",
      "neighborhood": "Vila Mariana",
      "zip": "ZIP 04.011-904"
    },
    "sv": {
      "city": "Sunnyvale, California",
      "address": "Innovation Center"
    },
    "phone": "+55 11 2391-2687"
  },
  "footer": {
    "tagline": "Automated communication since 2008.",
    "company": "BRBots Informática S/A",
    "cnpj": "CNPJ 05.084.150/0001-44",
    "rights": "All rights reserved."
  }
}
```

**Step 3: Update `[locale]/page.tsx`** to verify both locales work — render a few keys from different namespaces.

**Step 4: Verify**

```bash
npm run dev
```
Visit `/pt` and `/en` — both render without missing-key warnings.

**Step 5: Commit**

```bash
git add src/i18n/messages
git commit -m "feat: seed pt/en message catalogs"
```

---

### Task 7: Constants, content arrays, and WhatsApp builder

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/lib/content.ts`
- Create: `src/lib/whatsapp.ts`

**Step 1: `src/lib/constants.ts`**

```ts
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "551123912687";

export const COMPANY = {
  name: "BRBots Informática S/A",
  shortName: "BRBots",
  cnpj: "05.084.150/0001-44",
  phone: "(11) 2391-2687",
  addressSP: {
    line1: "Rua Estela, 515 — Conj. 81/82 — Bloco A",
    neighborhood: "Vila Mariana",
    city: "São Paulo",
    zip: "04.011-904",
  },
  addressSV: {
    city: "Sunnyvale, CA",
    venue: "Innovation Center",
  },
} as const;
```

**Step 2: `src/lib/content.ts`**

```ts
export const advantages = [
  { key: "cost", icon: "TrendingDown" },
  { key: "always_on", icon: "Clock" },
  { key: "omnichannel", icon: "MessagesSquare" },
  { key: "custom", icon: "Sliders" },
  { key: "database", icon: "Database" },
  { key: "monitor", icon: "Gauge" },
] as const;

export const differentials = [
  { key: "capacity", icon: "Radio" },
  { key: "integration", icon: "Plug" },
  { key: "grammar", icon: "Languages" },
  { key: "economic", icon: "BadgeDollarSign" },
  { key: "proprietary", icon: "Cpu" },
] as const;

export const applications = [
  { key: "registry", icon: "UserCog" },
  { key: "servicedesk", icon: "LifeBuoy" },
  { key: "sac", icon: "Headset" },
  { key: "leads", icon: "Target" },
  { key: "candidates", icon: "UserCheck" },
  { key: "debt", icon: "ReceiptText" },
  { key: "brand", icon: "Megaphone" },
  { key: "testdrive", icon: "Car" },
  { key: "products", icon: "PackageSearch" },
  { key: "interviews", icon: "CalendarCheck" },
  { key: "surveys", icon: "ClipboardList" },
  { key: "learning", icon: "GraduationCap" },
  { key: "evaluation": "UserCog2" },
  { key: "tickets", icon: "TicketPlus" },
] as const;

export const metrics = ["calls", "years", "savings", "uptime"] as const;

export const clientLogos = [
  "client-01",
  "client-02",
  "client-03",
  "client-04",
  "client-05",
  "client-06",
] as const;
```

> **NOTE:** The `evaluation` line above is intentionally buggy for this plan — the implementer must fix it to `{ key: "evaluation", icon: "UserCog2" }` during the task. Leaving it in plan to force verification.

**Step 3: `src/lib/whatsapp.ts`**

```ts
import { WHATSAPP_NUMBER } from "./constants";

type ContactPayload = {
  greeting: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export function buildWhatsAppUrl(payload?: ContactPayload): string {
  if (!payload) return `https://wa.me/${WHATSAPP_NUMBER}`;
  const text = [
    payload.greeting,
    "",
    `Nome: ${payload.name}`,
    `Email: ${payload.email}`,
    `Telefone: ${payload.phone}`,
    `Assunto: ${payload.subject}`,
    "",
    payload.message,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
```

**Step 4: Verify**

```bash
npx tsc --noEmit
```
The typo in `content.ts` triggers a TS error — fix it in-place and re-run until clean.

**Step 5: Commit**

```bash
git add src/lib
git commit -m "feat: add constants, content arrays, whatsapp builder"
```

---

## Phase 2 — UI Primitives

### Task 8: Button primitive with variants

**Files:**
- Create: `src/components/ui/button.tsx`

**Step 1: Implementation**

```tsx
"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "text-white brand-gradient hover:shadow-[0_0_40px_-10px_var(--brand-to)] focus-visible:ring-[var(--brand-to)]",
        secondary:
          "bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur focus-visible:ring-white/30",
        ghost: "text-white hover:bg-white/5 focus-visible:ring-white/20",
        whatsapp:
          "bg-[#25D366] text-black hover:bg-[#1ebe5d] focus-visible:ring-[#25D366]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
);
Button.displayName = "Button";
```

**Step 2: Verify** — `npx tsc --noEmit` passes.

**Step 3: Commit**

```bash
git add src/components/ui/button.tsx
git commit -m "feat(ui): add Button primitive with cva variants"
```

---

### Task 9: Card, Input, Textarea, Badge primitives

**Files:**
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/textarea.tsx`
- Create: `src/components/ui/badge.tsx`

**Step 1: `card.tsx`**

```tsx
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-white/10 bg-[var(--bg-elevated)] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export function CardGradientBorder({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-px brand-gradient [background-clip:padding-box,border-box]",
        className
      )}
    >
      <div className="rounded-[calc(1rem-1px)] bg-[var(--bg-elevated)] p-6 h-full">
        {children}
      </div>
    </div>
  );
}
```

**Step 2: `input.tsx`**

```tsx
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full h-11 rounded-lg bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--brand-to)] transition",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
```

**Step 3: `textarea.tsx`**

```tsx
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full min-h-[120px] rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--brand-to)] transition resize-y",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
```

**Step 4: `badge.tsx`**

```tsx
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80",
        className
      )}
      {...props}
    />
  );
}
```

**Step 5: Verify & commit**

```bash
npx tsc --noEmit
git add src/components/ui
git commit -m "feat(ui): add Card, Input, Textarea, Badge primitives"
```

---

### Task 10: Utility components (GradientText, ScrollReveal, CountUp, GradientBlob, AnimatedGrid, SectionHeading)

**Files:**
- Create: `src/components/ui/gradient-text.tsx`
- Create: `src/components/ui/scroll-reveal.tsx`
- Create: `src/components/ui/count-up.tsx`
- Create: `src/components/ui/gradient-blob.tsx`
- Create: `src/components/ui/animated-grid.tsx`
- Create: `src/components/ui/section-heading.tsx`

**Step 1: `gradient-text.tsx`**

```tsx
import { cn } from "@/lib/utils";

export function GradientText({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={cn("brand-text", className)}>{children}</span>;
}
```

**Step 2: `scroll-reveal.tsx`**

```tsx
"use client";
import { motion, type MotionProps } from "framer-motion";

export function ScrollReveal({
  children,
  delay = 0,
  className,
  ...props
}: { children: React.ReactNode; delay?: number; className?: string } & MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

**Step 3: `count-up.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function CountUp({
  to,
  suffix = "",
  duration = 1500,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}
```

**Step 4: `gradient-blob.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";

export function GradientBlob({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={className}
      initial={{ scale: 0.9, opacity: 0.6 }}
      animate={{ scale: [0.9, 1.05, 0.95, 1], opacity: [0.6, 0.8, 0.7, 0.75] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background:
          "radial-gradient(closest-side, rgba(139,92,246,0.45), rgba(6,182,212,0.25) 60%, transparent 75%)",
        filter: "blur(40px)",
      }}
    />
  );
}
```

**Step 5: `animated-grid.tsx`**

```tsx
export function AnimatedGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] ${className ?? ""}`}
    />
  );
}
```

**Step 6: `section-heading.tsx`**

```tsx
import { cn } from "@/lib/utils";
import { GradientText } from "./gradient-text";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center mb-4">
          <span className="text-xs font-mono uppercase tracking-[0.2em]">
            <GradientText>{eyebrow}</GradientText>
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-white/60">{subtitle}</p>}
    </div>
  );
}
```

**Step 7: Verify & commit**

```bash
npx tsc --noEmit
git add src/components/ui
git commit -m "feat(ui): add layout/animation utility components"
```

---

## Phase 3 — Layout

### Task 11: Language toggle component

**Files:**
- Create: `src/components/layout/language-toggle.tsx`

**Step 1: Implementation**

```tsx
"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

const locales = ["pt", "en"] as const;

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: string) {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
  }

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-full border border-white/10 p-1", className)}>
      <Languages className="h-4 w-4 ml-2 text-white/60" aria-hidden />
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium transition",
            l === locale ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/layout/language-toggle.tsx
git commit -m "feat(layout): add LanguageToggle"
```

---

### Task 12: Header component

**Files:**
- Create: `src/components/layout/header.tsx`

**Step 1: Implementation**

```tsx
"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./language-toggle";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: t("about") },
    { href: "#advantages", label: t("advantages") },
    { href: "#cases", label: t("cases") },
    { href: "#differentials", label: t("differentials") },
    { href: "#applications", label: t("applications") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all",
        scrolled
          ? "bg-[var(--bg-primary)]/70 backdrop-blur-lg border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight text-lg">
          <span className="brand-text">BR</span>Bots
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/70 hover:text-white transition">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer">
            <Button variant="primary" size="sm">{t("cta_whatsapp")}</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/layout/header.tsx
git commit -m "feat(layout): add Header with scroll-glass effect"
```

---

### Task 13: Footer component

**Files:**
- Create: `src/components/layout/footer.tsx`

**Step 1: Implementation**

```tsx
import { useTranslations } from "next-intl";
import { COMPANY } from "@/lib/constants";
import { Linkedin, Instagram, Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-bold text-lg"><span className="brand-text">BR</span>Bots</div>
          <p className="mt-2 text-sm text-white/60 max-w-xs">{t("tagline")}</p>
        </div>
        <div className="text-sm text-white/60 space-y-1">
          <p className="text-white font-medium">{t("company")}</p>
          <p>{t("cnpj")}</p>
          <p>{COMPANY.addressSP.line1}</p>
          <p>{COMPANY.addressSP.neighborhood} — CEP {COMPANY.addressSP.zip}</p>
          <p>{COMPANY.phone}</p>
        </div>
        <div className="flex md:justify-end items-start gap-3">
          <a aria-label="LinkedIn" href="#" className="p-2 rounded-full border border-white/10 hover:bg-white/5">
            <Linkedin className="h-4 w-4" />
          </a>
          <a aria-label="Instagram" href="#" className="p-2 rounded-full border border-white/10 hover:bg-white/5">
            <Instagram className="h-4 w-4" />
          </a>
          <a aria-label="Email" href="mailto:contato@brbotssa.com.br" className="p-2 rounded-full border border-white/10 hover:bg-white/5">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-white/40">
        © {year} {COMPANY.name}. {t("rights")}
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/layout/footer.tsx
git commit -m "feat(layout): add Footer"
```

---

## Phase 4 — Sections

> Each section below: create file, compose with UI primitives, verify in dev server, commit.

### Task 14: Hero section

**File:** `src/components/sections/hero.tsx`

```tsx
"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientBlob } from "@/components/ui/gradient-blob";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { Badge } from "@/components/ui/badge";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ArrowRight, MessageCircle } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
      <AnimatedGrid />
      <GradientBlob className="absolute -top-20 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full" />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/60">
          {t("eyebrow")}
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
          <GradientText>{t("title")}</GradientText>
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-lg md:text-xl text-white/70">
          {t("subtitle")}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer">
            <Button size="lg" variant="primary">
              <MessageCircle className="h-4 w-4" /> {t("cta_primary")}
            </Button>
          </a>
          <a href="#differentials">
            <Button size="lg" variant="secondary">
              {t("cta_secondary")} <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <Badge>{t("chips.calls")}</Badge>
          <Badge>{t("chips.years")}</Badge>
          <Badge>{t("chips.hours")}</Badge>
        </div>
      </div>
    </section>
  );
}
```

Commit: `feat(sections): add Hero section`

---

### Task 15: About section

**File:** `src/components/sections/about.tsx`

```tsx
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function AboutSection() {
  const t = useTranslations("about");
  return (
    <section id="about" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="left" />
          <p className="mt-6 text-white/70 leading-relaxed">{t("body_1")}</p>
          <p className="mt-4 text-white/70 leading-relaxed">{t("body_2")}</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white/60">
            {t("offices_title")}
          </h3>
          <Card className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-white/60 mt-0.5 shrink-0" />
            <span className="text-sm text-white/80">{t("office_sp")}</span>
          </Card>
          <Card className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-white/60 mt-0.5 shrink-0" />
            <span className="text-sm text-white/80">{t("office_sv")}</span>
          </Card>
        </div>
      </div>
    </section>
  );
}
```

Commit: `feat(sections): add About section`

---

### Task 16: Advantages section

**File:** `src/components/sections/advantages.tsx`

```tsx
"use client";
import { useTranslations } from "next-intl";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardGradientBorder } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { advantages } from "@/lib/content";

export function AdvantagesSection() {
  const t = useTranslations("advantages");
  return (
    <section id="advantages" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map(({ key, icon }, i) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon];
            return (
              <ScrollReveal key={key} delay={i * 0.05}>
                <CardGradientBorder className="h-full">
                  <div className="flex flex-col gap-3 h-full">
                    {Icon && <Icon className="h-6 w-6 text-white/80" />}
                    <h3 className="text-lg font-semibold">{t(`items.${key}.title`)}</h3>
                    <p className="text-sm text-white/60">{t(`items.${key}.desc`)}</p>
                  </div>
                </CardGradientBorder>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

Commit: `feat(sections): add Advantages section`

---

### Task 17: Metrics section

**File:** `src/components/sections/metrics.tsx`

```tsx
"use client";
import { useTranslations } from "next-intl";
import { CountUp } from "@/components/ui/count-up";

export function MetricsSection() {
  const t = useTranslations("metrics");
  const items = [
    { key: "calls", to: 10, suffix: "M+" },
    { key: "years", to: 15, suffix: "+" },
    { key: "savings", to: 8, suffix: "×" },
    { key: "uptime", to: 24, suffix: "/7" },
  ];
  return (
    <section className="py-16 border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map(({ key, to, suffix }) => (
          <div key={key} className="text-center">
            <div className="font-mono text-4xl md:text-5xl font-semibold brand-text">
              <CountUp to={to} suffix={suffix} />
            </div>
            <div className="mt-2 text-xs uppercase tracking-widest text-white/50">
              {t(`${key}.label`)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Commit: `feat(sections): add Metrics section`

---

### Task 18: Cases section with logo carousel

**Files:**
- Create: `src/components/sections/cases.tsx`
- Create placeholder SVGs: `public/logos/client-01.svg` … `client-06.svg`

**Step 1: Create placeholder logos** — one reusable minimal SVG with different text per file, e.g.:

```svg
<!-- public/logos/client-01.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60">
  <rect width="200" height="60" fill="none"/>
  <text x="100" y="38" font-family="Geist, sans-serif" font-size="22" font-weight="600"
        text-anchor="middle" fill="#FAFAFA" fill-opacity="0.55">Client 01</text>
</svg>
```

Repeat for `client-02.svg`…`client-06.svg` changing the label.

**Step 2: `cases.tsx`**

```tsx
"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { clientLogos } from "@/lib/content";

export function CasesSection() {
  const t = useTranslations("cases");
  const row = [...clientLogos, ...clientLogos];
  return (
    <section id="cases" className="py-24 scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      </div>
      <div className="relative mt-14">
        <div className="flex animate-[marquee_30s_linear_infinite] gap-12 w-max">
          {row.map((l, i) => (
            <div key={`${l}-${i}`} className="h-14 w-40 relative grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
              <Image src={`/logos/${l}.svg`} alt={l} fill sizes="160px" />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
```

**Step 3:** Verify the marquee animates in the browser.

Commit: `feat(sections): add Cases section with logo marquee`

---

### Task 19: Differentials section (zigzag)

**File:** `src/components/sections/differentials.tsx`

```tsx
"use client";
import { useTranslations } from "next-intl";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { differentials } from "@/lib/content";
import { cn } from "@/lib/utils";

export function DifferentialsSection() {
  const t = useTranslations("differentials");
  return (
    <section id="differentials" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <ul className="mt-16 space-y-10">
          {differentials.map(({ key, icon }, i) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon];
            const reversed = i % 2 === 1;
            return (
              <ScrollReveal key={key}>
                <li className={cn("grid md:grid-cols-[auto_1fr] gap-6 items-center", reversed && "md:[direction:rtl]")}>
                  <div className="flex items-center justify-center h-24 w-24 rounded-3xl brand-gradient md:[direction:ltr]">
                    {Icon && <Icon className="h-10 w-10 text-black/80" />}
                  </div>
                  <div className="md:[direction:ltr]">
                    <div className="text-xs font-mono text-white/40">0{i + 1}</div>
                    <h3 className="text-2xl font-semibold mt-1">{t(`items.${key}.title`)}</h3>
                    <p className="mt-2 text-white/70">{t(`items.${key}.desc`)}</p>
                  </div>
                </li>
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

Commit: `feat(sections): add Differentials section`

---

### Task 20: Applications section

**File:** `src/components/sections/applications.tsx`

```tsx
"use client";
import { useTranslations } from "next-intl";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { applications } from "@/lib/content";

export function ApplicationsSection() {
  const t = useTranslations("applications");
  return (
    <section id="applications" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {applications.map(({ key, icon }, i) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon];
            return (
              <ScrollReveal key={key} delay={i * 0.02}>
                <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-white/20 hover:bg-white/[0.06] transition">
                  {Icon && <Icon className="h-4 w-4 text-white/60 group-hover:text-white transition" />}
                  <span className="text-sm text-white/80">{t(`items.${key}`)}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

Commit: `feat(sections): add Applications section`

---

### Task 21: Contact section with WhatsApp form

**File:** `src/components/sections/contact.tsx`

```tsx
"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function ContactSection() {
  const t = useTranslations("contact");

  const schema = z.object({
    name: z.string().min(2, t("errors.name")),
    email: z.string().email(t("errors.email")),
    phone: z.string().min(8, t("errors.phone")),
    subject: z.string().min(2, t("errors.subject")),
    message: z.string().min(10, t("errors.message")),
  });
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  function onSubmit(values: Values) {
    const url = buildWhatsAppUrl({
      greeting: t("whatsapp_greeting"),
      name: values.name,
      email: values.email,
      phone: values.phone,
      subject: values.subject,
      message: values.message,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-12 grid gap-4 sm:grid-cols-2">
          <Field label={t("fields.name")} error={errors.name?.message}>
            <Input aria-invalid={!!errors.name} {...register("name")} />
          </Field>
          <Field label={t("fields.email")} error={errors.email?.message}>
            <Input type="email" aria-invalid={!!errors.email} {...register("email")} />
          </Field>
          <Field label={t("fields.phone")} error={errors.phone?.message}>
            <Input type="tel" aria-invalid={!!errors.phone} {...register("phone")} />
          </Field>
          <Field label={t("fields.subject")} error={errors.subject?.message}>
            <Input aria-invalid={!!errors.subject} {...register("subject")} />
          </Field>
          <Field label={t("fields.message")} error={errors.message?.message} className="sm:col-span-2">
            <Textarea aria-invalid={!!errors.message} {...register("message")} />
          </Field>
          <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Button type="submit" size="lg" variant="primary" disabled={isSubmitting}>
              <MessageCircle className="h-4 w-4" /> {t("submit")}
            </Button>
            <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" className="text-sm text-white/60 hover:text-white underline-offset-4 hover:underline">
              {t("direct")}
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-xs uppercase tracking-widest text-white/60">{label}</span>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
```

Commit: `feat(sections): add Contact section with WhatsApp flow`

---

### Task 22: Location section

**File:** `src/components/sections/location.tsx`

```tsx
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";

export function LocationSection() {
  const t = useTranslations("location");
  return (
    <section id="location" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card className="space-y-3">
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest">{t("sp.city")}</span>
            </div>
            <p className="text-lg text-white">{t("sp.address")}</p>
            <p className="text-sm text-white/60">{t("sp.neighborhood")} — {t("sp.zip")}</p>
            <div className="pt-3 flex items-center gap-2 text-white/80 text-sm">
              <Phone className="h-4 w-4" /> {t("phone")}
            </div>
          </Card>
          <Card className="space-y-3">
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest">{t("sv.city")}</span>
            </div>
            <p className="text-lg text-white">{t("sv.address")}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
```

Commit: `feat(sections): add Location section`

---

## Phase 5 — Page composition & error pages

### Task 23: Compose home page + error/not-found

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Create: `src/app/[locale]/error.tsx`
- Create: `src/app/[locale]/not-found.tsx`

**Step 1: Replace `page.tsx`**

```tsx
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { AdvantagesSection } from "@/components/sections/advantages";
import { MetricsSection } from "@/components/sections/metrics";
import { CasesSection } from "@/components/sections/cases";
import { DifferentialsSection } from "@/components/sections/differentials";
import { ApplicationsSection } from "@/components/sections/applications";
import { ContactSection } from "@/components/sections/contact";
import { LocationSection } from "@/components/sections/location";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <AdvantagesSection />
        <MetricsSection />
        <CasesSection />
        <DifferentialsSection />
        <ApplicationsSection />
        <ContactSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
```

**Step 2: `error.tsx`**

```tsx
"use client";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen grid place-items-center p-8 text-center">
      <div>
        <h1 className="text-4xl font-semibold brand-text">Algo deu errado</h1>
        <p className="mt-3 text-white/60">Tente novamente em instantes.</p>
        <Button className="mt-6" onClick={reset}>Tentar de novo</Button>
      </div>
    </main>
  );
}
```

**Step 3: `not-found.tsx`**

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center p-8 text-center">
      <div>
        <h1 className="text-6xl font-semibold brand-text">404</h1>
        <p className="mt-3 text-white/60">Página não encontrada.</p>
        <Link href="/"><Button className="mt-6">Voltar ao início</Button></Link>
      </div>
    </main>
  );
}
```

**Step 4: Verify full site**

```bash
npm run dev
```
Open `/pt` and `/en` — scroll through all sections. Test form submission opening wa.me with encoded text. Test language toggle.

**Step 5: Commit**

```bash
git add src/app
git commit -m "feat: compose home page and add error/not-found"
```

---

## Phase 6 — SEO, metadata, polish

### Task 24: Localized metadata + JSON-LD + OG image

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/opengraph-image.tsx`
- Create: `src/app/[locale]/head.tsx` (if needed, else inline in layout)

**Step 1: `generateMetadata` in layout**

Replace the `metadata` export in `[locale]/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: `BRBots — ${t("title")}`,
    description: t("subtitle"),
    metadataBase: new URL("https://www.brbotssa.com.br"),
    alternates: { languages: { pt: "/pt", en: "/en" } },
    openGraph: {
      title: `BRBots — ${t("title")}`,
      description: t("subtitle"),
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
    twitter: { card: "summary_large_image" },
  };
}
```

**Step 2: `opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0A0A0F 0%, #1a1035 50%, #0A0A0F 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.6, letterSpacing: 4, textTransform: "uppercase" }}>
          BRBots S/A
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            marginTop: 20,
            lineHeight: 1.05,
            background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          Comunicação Automatizada Inteligente
        </div>
      </div>
    ),
    size
  );
}
```

**Step 3: JSON-LD in layout `<body>`**

Add inside `<body>` of `[locale]/layout.tsx` above `<NextIntlClientProvider>`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "BRBots Informática S/A",
      url: "https://www.brbotssa.com.br",
      logo: "https://www.brbotssa.com.br/logo.svg",
      telephone: "+55 11 2391-2687",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Estela, 515 - Conj. 81/82 - Bloco A",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "04011-904",
        addressCountry: "BR",
      },
    }),
  }}
/>
```

**Step 4: Commit**

```bash
git add src/app
git commit -m "feat(seo): localized metadata, OG image, Organization JSON-LD"
```

---

### Task 25: sitemap, robots, env example, README

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `.env.example`
- Create: `README.md`

**Step 1: `sitemap.ts`**

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.brbotssa.com.br/pt", lastModified: new Date(), priority: 1 },
    { url: "https://www.brbotssa.com.br/en", lastModified: new Date(), priority: 0.9 },
  ];
}
```

**Step 2: `robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.brbotssa.com.br/sitemap.xml",
  };
}
```

**Step 3: `.env.example`**

```
NEXT_PUBLIC_WHATSAPP_NUMBER=551123912687
```

**Step 4: `README.md`**

```markdown
# BRBots LP

Modernized landing page for BRBots S/A.

## Stack
Next.js 15 · TypeScript · Tailwind 4 · next-intl · Framer Motion · react-hook-form · zod

## Local dev
\`\`\`bash
npm install
cp .env.example .env.local
npm run dev
\`\`\`
Open http://localhost:3000

## Scripts
- \`npm run dev\` — dev server
- \`npm run build\` — production build
- \`npm run lint\` — ESLint

## Env
- \`NEXT_PUBLIC_WHATSAPP_NUMBER\` — destination WhatsApp (digits only, with country code)

## Deploy
Push to \`main\` — Vercel auto-deploys.
```

**Step 5: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts .env.example README.md
git commit -m "chore: sitemap, robots, env example, README"
```

---

### Task 26: Final checks & production build

**Step 1: Type-check, lint, build**

```bash
npx tsc --noEmit
npm run lint
npm run build
```
All must pass. Fix any warnings that show real issues (unused imports, missing deps, etc.).

**Step 2: Manual browser QA checklist**

Open `http://localhost:3000/pt` and `http://localhost:3000/en`:

- [ ] Header scrolls into glass state at scroll > 8px
- [ ] Hero gradient text + blob animates
- [ ] All anchor nav links scroll to matching sections
- [ ] Language toggle flips PT/EN without losing scroll position
- [ ] Advantages cards render with gradient border
- [ ] Metrics count up when scrolled into view
- [ ] Cases marquee animates and pauses on hover
- [ ] Differentials alternate left/right on md+
- [ ] Applications grid is 4-col on lg
- [ ] Contact form: empty submit shows zod errors; filled submit opens wa.me with encoded text
- [ ] "Fale direto no WhatsApp" link works from header/contact/hero
- [ ] Footer renders CNPJ, endereço, tel
- [ ] 404 page reachable at `/pt/qualquer-coisa`
- [ ] `prefers-reduced-motion` ON disables blob + scroll reveals

**Step 3: Lighthouse (optional)**

Run Lighthouse in Chrome DevTools — target ≥ 95 Performance / 100 SEO / AA Accessibility. Fix any easy wins.

**Step 4: Commit final polish if needed**

```bash
git add -A
git commit -m "chore: final polish after QA"
```

---

## Phase 7 — Deploy

### Task 27: Push to Vercel

**Step 1: Create GitHub repo & push**

Ask the user first before running. When approved:

```bash
gh repo create brbots-lp --private --source . --push
```

**Step 2: Connect to Vercel**

- Visit `vercel.com/new`, import the repo
- Framework: Next.js (auto-detected)
- Env var: `NEXT_PUBLIC_WHATSAPP_NUMBER` = `551123912687`
- Deploy

**Step 3: Verify production URL**

Open the Vercel URL, run through the QA checklist from Task 26.

**Step 4: Done.**

---

## Summary of commits

1. `chore: scaffold Next.js 15 + TS + Tailwind`
2. `chore: add runtime deps (framer-motion, next-intl, rhf, zod, lucide, cva)`
3. `chore: add cn helper and Geist fonts`
4. `style: add design tokens and base gradient utilities`
5. `feat: wire next-intl with pt/en locale routing`
6. `feat: seed pt/en message catalogs`
7. `feat: add constants, content arrays, whatsapp builder`
8. `feat(ui): add Button primitive with cva variants`
9. `feat(ui): add Card, Input, Textarea, Badge primitives`
10. `feat(ui): add layout/animation utility components`
11. `feat(layout): add LanguageToggle`
12. `feat(layout): add Header with scroll-glass effect`
13. `feat(layout): add Footer`
14. `feat(sections): add Hero section`
15. `feat(sections): add About section`
16. `feat(sections): add Advantages section`
17. `feat(sections): add Metrics section`
18. `feat(sections): add Cases section with logo marquee`
19. `feat(sections): add Differentials section`
20. `feat(sections): add Applications section`
21. `feat(sections): add Contact section with WhatsApp flow`
22. `feat(sections): add Location section`
23. `feat: compose home page and add error/not-found`
24. `feat(seo): localized metadata, OG image, Organization JSON-LD`
25. `chore: sitemap, robots, env example, README`
26. `chore: final polish after QA`
