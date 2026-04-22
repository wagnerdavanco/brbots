import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
};

export function BrandLogo({ className, imageClassName }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/logos/brbots-logo.svg"
        alt="BRBots S/A"
        width={190}
        height={52}
        className={cn("h-auto w-36 drop-shadow-[0_1px_1px_rgba(15,23,42,0.35)] md:w-44", imageClassName)}
      />
    </span>
  );
}
