"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
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
    <div className={cn("inline-flex items-center gap-1 rounded-full border border-white/10 p-1", className)}>
      <Languages className="h-4 w-4 ml-2 text-white/60" aria-hidden />
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium transition",
            l === locale ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
