import { cn } from "@/lib/utils";
import { GradientText } from "./gradient-text";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center mb-4">
          <span className="text-xs font-mono uppercase tracking-[0.2em]">
            <GradientText>{eyebrow}</GradientText>
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-white/60">{subtitle}</p>}
    </div>
  );
}
