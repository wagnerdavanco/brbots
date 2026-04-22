"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./language-toggle";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { BrandLogo } from "./brand-logo";
import { ThemeToggle } from "./theme-toggle";

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
    { href: "#products", label: t("products") },
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
          ? "border-b border-[var(--border-faint)] bg-[var(--header-bg)] backdrop-blur-lg"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="BRBots S/A">
          <BrandLogo imageClassName="w-28 sm:w-36 md:w-44" />
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <ThemeToggle labels={{ light: t("theme_white"), dark: t("theme_black") }} />
          <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" className="hidden md:block">
            <Button variant="primary" size="sm">{t("cta_whatsapp")}</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
