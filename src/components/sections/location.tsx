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
        <div className="mt-14 grid gap-6 md:mx-auto md:max-w-xl">
          <Card className="space-y-3">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <MapPin className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest">{t("sp.city")}</span>
            </div>
            <p className="text-lg text-[var(--text-primary)]">{t("sp.address")}</p>
            <p className="text-sm text-[var(--text-muted)]">{t("sp.neighborhood")} — {t("sp.zip")}</p>
            <div className="flex items-center gap-2 pt-3 text-sm text-[var(--text-primary)]">
              <Phone className="h-4 w-4" /> {t("phone")}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
