import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { products } from "@/lib/content";

const cardClass =
  "group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-5 transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]";

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  const t = useTranslations("products");

  return (
    <ScrollReveal delay={index * 0.04} className="h-full">
      <article className={cardClass}>
        <div className="flex h-24 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-5">
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
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">
            {t(`items.${product.key}.name`)}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            {t(`items.${product.key}.desc`)}
          </p>
        </div>
      </article>
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
