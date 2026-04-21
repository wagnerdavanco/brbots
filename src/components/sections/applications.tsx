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
