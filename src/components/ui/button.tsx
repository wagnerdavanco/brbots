"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "text-white brand-gradient hover:shadow-[0_0_40px_-10px_var(--brand-to)] focus-visible:ring-[var(--brand-to)]",
        secondary:
          "bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur focus-visible:ring-white/30",
        ghost: "text-white hover:bg-white/5 focus-visible:ring-white/20",
        whatsapp:
          "bg-[#25D366] text-black hover:bg-[#1ebe5d] focus-visible:ring-[#25D366]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
);
Button.displayName = "Button";
