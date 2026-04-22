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
            <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" className="text-sm text-[var(--text-muted)] underline-offset-4 hover:text-[var(--text-primary)] hover:underline">
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
      <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">{label}</span>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
