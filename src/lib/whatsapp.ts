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
