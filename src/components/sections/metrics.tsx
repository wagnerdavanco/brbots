"use client";
import { useTranslations } from "next-intl";
import { CountUp } from "@/components/ui/count-up";

export function MetricsSection() {
  const t = useTranslations("metrics");
  const items = [
    { key: "calls", to: 10, suffix: "M+" },
    { key: "years", to: 15, suffix: "+" },
    { key: "savings", to: 8, suffix: "x" },
    { key: "uptime", to: 24, suffix: "/7" },
  ];
  return (
    <section className="py-16 border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map(({ key, to, suffix }) => (
          <div key={key} className="text-center">
            <div className="font-mono text-4xl md:text-5xl font-semibold brand-text">
              <CountUp to={to} suffix={suffix} />
            </div>
            <div className="mt-2 text-xs uppercase tracking-widest text-white/50">
              {t(`${key}.label`)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
