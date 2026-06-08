import { Button } from "@/components/ui/Button";

export function CTABanner() {
  return (
    <section className="bg-aces-red py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">Has your club got what it takes?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          Are you league champions or county cup winners in your town/city? Register your interest
          for the 2027 ACES Nationals.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact?topic=Tournament%20entry" variant="secondary" size="lg">
            Register Interest
          </Button>
          <Button href="/tournament/entry-criteria" variant="outline-white" size="lg">
            View Entry Criteria
          </Button>
        </div>
      </div>
    </section>
  );
}
