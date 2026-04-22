import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { products } from "@/lib/content";
import { cn } from "@/lib/utils";

const cardClass =
  "group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.06]";

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  const t = useTranslations("products");
  const content = (
    <>
      <div className="flex h-24 items-center justify-center rounded-xl border border-white/10 bg-black/20 px-5">
        <Image
          src={product.src}
          alt={product.alt}
          width={product.width}
          height={product.height}
          sizes="(min-width: 1024px) 220px, (min-width: 640px) 45vw, 80vw"
          className="max-h-14 w-auto max-w-full object-contain"
        />
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-white">
            {t(`items.${product.key}.name`)}
          </h3>
          {"href" in product && product.href && (
            <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-white/40 transition group-hover:text-white/80" />
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          {t(`items.${product.key}.desc`)}
        </p>
      </div>
    </>
  );

  return (
    <ScrollReveal delay={index * 0.04} className="h-full">
      {"href" in product && product.href ? (
        <a
          href={product.href}
          target="_blank"
          rel="noreferrer"
          className={cn(cardClass, "focus:outline-none focus:ring-2 focus:ring-cyan-300/60")}
          aria-label={`${t("visit")} ${t(`items.${product.key}.name`)}`}
        >
          {content}
        </a>
      ) : (
        <article className={cardClass}>{content}</article>
      )}
    </ScrollReveal>
  );
}

export function ProductsSection() {
  const t = useTranslations("products");

  return (
    <section id="products" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.key} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
