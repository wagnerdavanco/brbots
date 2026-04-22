"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

type ThemeToggleProps = {
  labels: Record<Theme, string>;
  className?: string;
};

const storageKey = "brbots-theme";
const themeChangeEvent = "brbots-theme-change";

function getThemeSnapshot(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function subscribeToTheme(onStoreChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key !== storageKey) return;
    document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
    onStoreChange();
  }

  window.addEventListener(themeChangeEvent, onStoreChange);
  window.addEventListener("storage", handleStorage);
  queueMicrotask(onStoreChange);

  return () => {
    window.removeEventListener(themeChangeEvent, onStoreChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function ThemeToggle({ labels, className }: ThemeToggleProps) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  function selectTheme(nextTheme: Theme) {
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {
      // The page still switches theme when storage is unavailable.
    }
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <div
      className={cn(
        "inline-flex h-9 items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-1",
        className
      )}
      aria-label={`${labels.light} / ${labels.dark}`}
    >
      <button
        type="button"
        aria-label={labels.light}
        aria-pressed={theme === "light"}
        title={labels.light}
        onClick={() => selectTheme("light")}
        className={cn(
          "grid h-7 w-7 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-to)]",
          theme === "light" ? "bg-[var(--surface-hover)]" : "hover:bg-[var(--surface-muted)]"
        )}
      >
        <span className="h-4 w-4 rounded-full border border-slate-300 bg-white shadow-sm" />
      </button>
      <button
        type="button"
        aria-label={labels.dark}
        aria-pressed={theme === "dark"}
        title={labels.dark}
        onClick={() => selectTheme("dark")}
        className={cn(
          "grid h-7 w-7 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-to)]",
          theme === "dark" ? "bg-[var(--surface-hover)]" : "hover:bg-[var(--surface-muted)]"
        )}
      >
        <span className="h-4 w-4 rounded-full border border-white/20 bg-black shadow-sm" />
      </button>
    </div>
  );
}
