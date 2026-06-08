import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-aces-navy text-white">
      <div className="absolute inset-0 bg-pitch-pattern opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="font-display text-7xl font-bold uppercase tracking-tight text-aces-red-bright md:text-8xl">
          404
        </p>
        <h1 className="font-display mt-4 text-3xl font-bold uppercase tracking-tight md:text-4xl">
          Off the pitch
        </h1>
        <p className="mx-auto mt-4 max-w-md text-gray-300">
          The page you&apos;re looking for couldn&apos;t be found. It may have been moved, or the link
          may be out of date.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Link href="/contact?topic=Tournament%20entry" className="text-sm font-semibold text-aces-red-bright hover:underline">
            Register your interest
          </Link>
        </div>
      </div>
    </section>
  );
}
