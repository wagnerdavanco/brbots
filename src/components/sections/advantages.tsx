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
