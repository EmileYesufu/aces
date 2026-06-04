import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ShopProductGrid } from "@/components/shop/ShopProductGrid";
import { shopConfig } from "@/content/shop";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "ACES Shop",
  description:
    "Official ACES Nationals merchandise — jerseys, polos, hoodies, training wear and tournament accessories from Grip Active.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        title="ACES Shop"
        subtitle="Official ACES Nationals branded kit and merchandise."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "ACES Shop" },
        ]}
      />

      <Section>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-lg text-aces-muted">{shopConfig.intro}</p>
          <p className="mt-4 text-sm text-aces-muted">{shopConfig.partnerNote}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href={shopConfig.storeUrl} external size="lg" className="gap-2">
              View full store
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button href={shopConfig.bundleUrl} external variant="outline" size="lg" className="gap-2">
              Bundle offers
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ShopProductGrid />

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-aces-muted">
          Prices and availability are managed by {shopConfig.partner}. Orders are placed on their
          secure checkout — delivery typically within 4–6 weeks for customised kit.
        </p>
      </Section>
    </>
  );
}
