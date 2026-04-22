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
                <div className="group flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-3 transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]">
                  {Icon && <Icon className="h-4 w-4 text-[var(--text-muted)] transition group-hover:text-[var(--text-primary)]" />}
                  <span className="text-sm text-[var(--text-primary)]">{t(`items.${key}`)}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
