import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full min-h-[120px] rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--brand-to)] transition resize-y",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
