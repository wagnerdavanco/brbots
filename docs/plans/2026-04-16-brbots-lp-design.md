# BRBots Landing Page — Design Document

**Data:** 2026-04-16
**Projeto:** Recriação modernizada da LP `https://www.brbotssa.com.br/`
**Estilo:** IA/SaaS 2026 — dark mode com gradientes neon (Neon Grid)

---

## 1. Objetivo

Recriar a landing page institucional da BRBots S/A preservando propósito e conteúdo, mas com design modernizado (dark, gradientes violeta→ciano), performance superior, i18n PT/EN e integração direta com WhatsApp.

**Stakeholder:** wagner.davanco@talkcomm.com.br
**Negócio BRBots:** comunicação automatizada (voz + texto) para CX, SAC, cobrança, leads — até 8× mais econômico que atendimento humano. +15 anos de mercado, escritórios em SP e Sunnyvale.

## 2. Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS 4** + **shadcn/ui**
- **Framer Motion** (scroll reveals, hero blob animado, hover 3D leve)
- **next-intl** (i18n PT/EN com roteamento `/pt` · `/en`)
- **react-hook-form** + **zod** (validação do form)
- **lucide-react** (ícones)
- Deploy: **Vercel**

## 3. Estrutura do projeto

```
brbots_lp/
├── src/
│   ├── app/[locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── sections/   # Hero, About, Advantages, Metrics, Cases, Differentials, Applications, Contact, Location
│   │   ├── ui/         # Button, Card, Input, Textarea, Badge (shadcn)
│   │   └── layout/     # Header, Footer, LanguageToggle
│   ├── lib/
│   │   ├── whatsapp.ts
│   │   ├── content.ts
│   │   └── constants.ts
│   ├── i18n/
│   │   ├── messages/{pt,en}.json
│   │   └── routing.ts
│   └── types/
├── public/logos/
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## 4. Design tokens

| Token | Valor |
|-------|-------|
| `--bg-primary` | `#0A0A0F` |
| `--bg-elevated` | `#13131A` |
| `--brand-from` | `#8B5CF6` (violeta) |
| `--brand-to` | `#06B6D4` (ciano) |
| `--text-primary` | `#FAFAFA` |
| `--text-muted` | `#A1A1AA` |
| `--border` | `rgba(255,255,255,0.08)` |

**Tipografia:** Geist Sans (600/700 títulos, 400/500 corpo) · Geist Mono (métricas/labels)

## 5. Seções da página (ordem)

1. **Header fixo** — logo, nav, LanguageToggle, CTA WhatsApp (glass blur no scroll)
2. **Hero** — H1 com gradient text, blob animado, 2 CTAs, chips de métricas
3. **Quem Somos** — 2 colunas: texto + ilustração abstrata
4. **Vantagens** — grid 3×2 com 6 cards borda-gradiente
5. **Métricas** — faixa full-width com 4 contadores animados (`+10M`, `+15`, `8×`, `24/7`)
6. **Cases de Sucesso** — carrossel marquee com logos placeholder (grayscale → color no hover)
7. **Diferenciais** — layout zigzag com 5 itens numerados
8. **Aplicações Práticas** — grid 4 colunas com 13 chips/tags
9. **Contato** — formulário → WhatsApp + botão direto wa.me
10. **Localização** — cards SP + Sunnyvale
11. **Footer** — nav, redes sociais, CNPJ, endereço, tel

## 6. Componentes-chave

**UI base:** `Button` (variantes primary/secondary/ghost/whatsapp), `Card`, `CardGradientBorder`, `Input`, `Textarea`, `Badge`, `SectionHeading`

**Compostos:** `GradientText`, `AnimatedGrid`, `GradientBlob`, `CountUp`, `LogoCarousel`, `LanguageToggle`, `ScrollReveal`

**Dados em `lib/content.ts`:** arrays tipados de vantagens/diferenciais/aplicações referenciam chaves de tradução — ícones ficam no código.

## 7. Data flow — formulário → WhatsApp

```
User preenche form → RHF + zod valida
  → monta mensagem pré-formatada
  → window.open(`https://wa.me/551123912687?text=${encoded}`)
```

Mensagem pré-formatada:
```
Olá! Tenho interesse nos BRBots.

Nome: {nome}
Email: {email}
Telefone: {telefone}
Assunto: {assunto}

{mensagem}
```

Sem backend. Número BRBots atual: `(11) 2391-2687` → `551123912687` (fixo — WhatsApp Business aceita). Fica em `lib/constants.ts` + override opcional via `NEXT_PUBLIC_WHATSAPP_NUMBER`.

## 8. i18n

- Roteamento: `/pt/...` · `/en/...`, redirect de `/` por `Accept-Language`
- `messages/pt.json` + `messages/en.json` com todas as strings
- `LanguageToggle` preserva a seção (hash) ao trocar idioma
- `<html lang="...">` atribuído por locale

## 9. Validação (zod)

```ts
const contactSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  telefone: z.string().min(10),
  assunto: z.string().min(2),
  mensagem: z.string().min(10),
})
```

## 10. Tratamento de erro

- Form: erros inline por campo (`aria-invalid` + mensagem)
- `error.tsx` estilizado (gradient + botão voltar)
- `not-found.tsx` customizado
- Sem try/catch em client (form é puro, WhatsApp abre em nova aba)

## 11. Acessibilidade

- Contraste AA em todo texto sobre bg dark
- `prefers-reduced-motion` desativa scroll reveals e blob animado
- Focus visible em todos elementos interativos (ring gradiente)
- Navegação por teclado completa (toggle, carrossel, form)

## 12. SEO & metadata

- `generateMetadata` por locale (title + description)
- OG image via `next/og` (1200×630, gradiente + título)
- `sitemap.ts` + `robots.ts`
- Schema.org `Organization` JSON-LD (nome, endereço, CNPJ, tel)
- Favicon SVG + apple-touch-icon

## 13. Performance

- Fonts via `next/font` (Geist local)
- SVG onde possível, `next/image` para raster
- Framer Motion code-split por seção (App Router)
- **Meta:** Lighthouse ≥ 95 Performance / 100 SEO / AA acessibilidade

## 14. Testes

- `tsc --noEmit` no CI
- ESLint + Prettier
- Checklist manual Chrome/Firefox/Safari mobile
- Sem unit tests nesta versão (LP estática, ROI baixo)

## 15. Deploy

- Vercel, push em `main` → deploy automático
- `.env.example` com `NEXT_PUBLIC_WHATSAPP_NUMBER`

## 16. Conteúdo textual (resumo)

### Hero
- **H1 PT:** "Comunicação Automatizada Inteligente"
- **H1 EN:** "Smart Automated Communication"
- **Sub PT:** "Atendimento virtual por voz e texto, até 8× mais econômico que humano. +15 anos revolucionando CX."
- **CTAs:** "Fale no WhatsApp" / "Ver diferenciais"

### Vantagens (6)
1. Redução de Custos (8×)
2. Atendimento 24×7
3. Omnichannel (voz + texto)
4. Personalização (ativo/receptivo)
5. Banco de Dados (gravação total)
6. Gerenciamento & Monitoramento

### Diferenciais (5)
1. Capacidade Operacional (+10M chamadas/dia)
2. Integração Legados (API / RPA / Salesforce)
3. Design Gramatical (frases complexas)
4. Econômico (menor custo vs concorrência)
5. Tecnologia Proprietária (desenvolvimento interno)

### Aplicações Práticas (13)
Atualização cadastral · Service Desk · SAC · Geração de Leads · Filtro de Candidatos · Renegociação de Dívida · Apoio Institucional · Test Drive · Dúvidas sobre Produtos · Agendamento de Entrevistas · Pesquisas de Qualidade · Ensino e Aprendizado · Avaliação de Colaborador · Abertura de OS

### Contato
- **São Paulo:** Rua Estela, 515 — Conj. 81/82 — Bloco A — Vila Mariana — CEP 04.011-904
- **Sunnyvale:** Innovation Center, California
- **Telefone:** (11) 2391-2687
- **CNPJ:** 05.084.150/0001-44

---

## 17. Próximos passos

1. Invocar skill `superpowers:writing-plans` para gerar plano de implementação detalhado com tarefas sequenciadas
2. Executar plano (scaffold Next.js → componentes → seções → i18n → deploy)
