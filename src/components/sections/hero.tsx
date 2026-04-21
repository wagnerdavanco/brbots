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
