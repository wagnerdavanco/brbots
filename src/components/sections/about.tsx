import { useTranslations } from "next-intl";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function AboutSection() {
  const t = useTranslations("about");
  return (
    <section id="about" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="left" />
          <p className="mt-6 text-white/70 leading-relaxed">{t("body_1")}</p>
          <p className="mt-4 text-white/70 leading-relaxed">{t("body_2")}</p>
        </div>
        <div className="space-y-8">
          <Image
            src="/images/cabeca-robo.png"
            alt="Rosto humano com elementos robóticos representando atendimento virtual"
            width={635}
            height={641}
            className="mx-auto h-auto w-full max-w-[420px] drop-shadow-[0_24px_70px_rgba(6,182,212,0.18)]"
            sizes="(min-width: 1024px) 420px, calc(100vw - 48px)"
          />
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white/60">
              {t("offices_title")}
            </h3>
            <Card className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-white/60 mt-0.5 shrink-0" />
              <span className="text-sm text-white/80">{t("office_sp")}</span>
            </Card>
            <Card className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-white/60 mt-0.5 shrink-0" />
              <span className="text-sm text-white/80">{t("office_sv")}</span>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
