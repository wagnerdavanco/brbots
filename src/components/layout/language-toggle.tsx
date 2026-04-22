"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

const locales = ["pt", "en"] as const;

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: string) {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
  }

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-1", className)}>
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium transition",
            l === locale
              ? "bg-[var(--surface-hover)] text-[var(--text-primary)]"
              : "text-[var(--text-faint)] hover:text-[var(--text-primary)]"
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
