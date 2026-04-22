"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { differentials } from "@/lib/content";
import { cn } from "@/lib/utils";

export function DifferentialsSection() {
  const t = useTranslations("differentials");
  return (
    <section id="differentials" className="overflow-hidden py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(280px,0.9fr)_1.1fr] lg:items-center">
          <ScrollReveal>
            <div className="relative mx-auto flex min-h-[300px] w-full max-w-[460px] items-end justify-center lg:min-h-[540px]">
              <div className="absolute inset-x-8 bottom-0 h-2/3 rounded-full bg-cyan-400/10 blur-3xl" />
              <Image
                src="/images/brbots-differentials-robot.png"
                alt="Robo atendente da BRBots"
                width={733}
                height={652}
                className="relative z-10 h-auto w-full max-w-[420px] drop-shadow-[0_28px_80px_rgba(6,182,212,0.22)]"
                sizes="(min-width: 1024px) 420px, calc(100vw - 48px)"
              />
            </div>
          </ScrollReveal>
          <ul className="space-y-10">
            {differentials.map(({ key, icon }, i) => {
              const Icon = (Icons as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[icon];
              const reversed = i % 2 === 1;
              return (
                <ScrollReveal key={key}>
                  <li className={cn("grid md:grid-cols-[auto_1fr] gap-5 items-start", reversed && "md:[direction:rtl]")}>
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl brand-gradient md:[direction:ltr]">
                      {Icon && <Icon className="h-6 w-6 text-black/80" strokeWidth={2.25} />}
                    </div>
                    <div className="md:[direction:ltr]">
                      <div className="text-xs font-mono text-[var(--text-faint)]">0{i + 1}</div>
                      <h3 className="text-2xl font-semibold mt-1">{t(`items.${key}.title`)}</h3>
                      <p className="mt-2 text-[var(--text-muted)]">{t(`items.${key}.desc`)}</p>
                    </div>
                  </li>
                </ScrollReveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
