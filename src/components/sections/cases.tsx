"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { clientLogos } from "@/lib/content";

export function CasesSection() {
  const t = useTranslations("cases");
  const row = [...clientLogos, ...clientLogos];
  return (
    <section id="cases" className="py-24 scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      </div>
      <div className="relative mt-14">
        <div className="flex animate-marquee gap-12 w-max">
          {row.map((logo, i) => (
            <div key={`${logo.alt}-${i}`} className="h-14 w-40 relative grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
              <Image src={logo.src} alt={logo.alt} fill sizes="160px" className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
