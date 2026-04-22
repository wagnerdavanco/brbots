"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./language-toggle";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { BrandLogo } from "./brand-logo";

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: t("about") },
    { href: "#advantages", label: t("advantages") },
    { href: "#cases", label: t("cases") },
    { href: "#differentials", label: t("differentials") },
    { href: "#applications", label: t("applications") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all",
        scrolled
          ? "bg-[var(--bg-primary)]/70 backdrop-blur-lg border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="shrink-0" aria-label="BRBots S/A">
          <BrandLogo />
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/70 hover:text-white transition">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer">
            <Button variant="primary" size="sm">{t("cta_whatsapp")}</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
