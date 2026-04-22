import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[120px] w-full resize-y rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--brand-to)]",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
