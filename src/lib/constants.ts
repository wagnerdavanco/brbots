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
