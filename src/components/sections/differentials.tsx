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
