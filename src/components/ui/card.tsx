import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-white/10 bg-[var(--bg-elevated)] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export function CardGradientBorder({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-px brand-gradient [background-clip:padding-box,border-box]",
        className
      )}
    >
      <div className="rounded-[calc(1rem-1px)] bg-[var(--bg-elevated)] p-6 h-full">
        {children}
      </div>
    </div>
  );
}
