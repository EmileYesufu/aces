import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "ACES Shop",
  description: "Official ACES Nationals merchandise — tees, hoodies, mugs and more.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        title="ACES Shop"
        subtitle="Official ACES Nationals branded merchandise."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "ACES Shop" },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-aces-red/10">
            <ShoppingBag className="h-10 w-10 text-aces-red" />
          </div>
          <h2 className="text-2xl font-bold text-aces-navy">Official ACES Merchandise</h2>
          <p className="mt-4 text-lg text-aces-muted">
            Browse our range of ACES branded items — from tee-shirts and hoodies to mugs and water
            bottles. Show your support for the ACES Nationals with official tournament merchandise.
          </p>
          <p className="mt-4 text-aces-muted">
            The ACES Shop is hosted externally. Click below to visit the store and place your order.
          </p>
          <Button
            href="https://acesfootball.co.uk/aces-shop/"
            external
            size="lg"
            className="mt-8 gap-2"
          >
            Visit ACES Shop
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
