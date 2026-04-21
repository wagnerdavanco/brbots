import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";

export function LocationSection() {
  const t = useTranslations("location");
  return (
    <section id="location" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card className="space-y-3">
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest">{t("sp.city")}</span>
            </div>
            <p className="text-lg text-white">{t("sp.address")}</p>
            <p className="text-sm text-white/60">{t("sp.neighborhood")} — {t("sp.zip")}</p>
            <div className="pt-3 flex items-center gap-2 text-white/80 text-sm">
              <Phone className="h-4 w-4" /> {t("phone")}
            </div>
          </Card>
          <Card className="space-y-3">
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest">{t("sv.city")}</span>
            </div>
            <p className="text-lg text-white">{t("sv.address")}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
