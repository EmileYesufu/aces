import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { shopProducts, type ShopProduct } from "@/content/shop";

const categoryOrder = ["Apparel", "Equipment", "Accessories"] as const;

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
}

function ProductCard({ product, index }: { product: ShopProduct; index: number }) {
  return (
    <ScrollReveal delay={index * 0.04}>
      <Link
        href={product.productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
      >
        <Card className="flex h-full flex-col overflow-hidden p-0">
          <div className="relative aspect-square bg-gray-50">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-aces-red">
              {product.category}
            </span>
            <h3 className="mt-2 font-display text-base font-bold leading-snug text-aces-navy line-clamp-2">
              {product.title.replace(/^Aces Nationals Tournament\s+/i, "")}
            </h3>
            <div className="mt-auto flex items-baseline gap-2 pt-4">
              <span className="text-lg font-bold text-aces-navy">{formatPrice(product.price)}</span>
              {product.compareAt && (
                <span className="text-sm text-aces-muted line-through">
                  {formatPrice(product.compareAt)}
                </span>
              )}
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-aces-red group-hover:underline">
              Buy now
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>
        </Card>
      </Link>
    </ScrollReveal>
  );
}

export function ShopProductGrid() {
  const byCategory = categoryOrder.map((category) => ({
    category,
    products: shopProducts.filter((p) => p.category === category),
  })).filter((g) => g.products.length > 0);

  return (
    <div className="space-y-14">
      {byCategory.map(({ category, products }) => (
        <div key={category}>
          <h2 className="mb-6 font-display text-2xl font-bold uppercase text-aces-navy">{category}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
