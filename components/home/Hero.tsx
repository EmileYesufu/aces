import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Countdown } from "@/components/ui/Countdown";

const stats = [
  { value: "14", label: "Age Groups" },
  { value: "400", suffix: "+", label: "Teams" },
  { value: "FA", label: "Sanctioned", animate: false },
  { value: "18", suffix: "th", label: "Annual Event" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-aces-navy">
      <Image
        src="/hero.jpg"
        alt="ACES Nationals tournament at Riverside Sports Complex"
        fill
        priority
        className="object-cover object-center opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-aces-navy via-aces-navy/90 to-aces-navy/55" />
      <div className="absolute inset-0 bg-pitch-pattern opacity-[0.35] mix-blend-overlay" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-aces-navy to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-aces-red-bright/40 bg-aces-red/15 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-widest text-aces-red-bright">
            18th Annual · May &amp; June 2026
          </p>
          <h1 className="font-display mt-5 text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl text-balance">
            ACES Nationals <span className="text-aces-red-bright">2026</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
            The invitation-only finals for elite junior boys and girls teams from across the
            country — all competing for the prestigious ACES National title at Nottingham&apos;s
            Riverside Sports Complex.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact?topic=Register%20interest" size="lg">
              Register Interest
            </Button>
            <Button href="/tournament/entry-criteria" variant="outline-white" size="lg">
              Entry Criteria
            </Button>
          </div>
          <Countdown variant="hero" className="mt-10" />
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-white/10 px-4 py-6 text-center backdrop-blur-sm transition-transform hover:scale-[1.02]"
            >
              <div className="font-display text-3xl font-bold text-white md:text-4xl">
                {stat.animate === false ? (
                  stat.value
                ) : (
                  <CountUp value={`${stat.value}${stat.suffix ?? ""}`} />
                )}
              </div>
              <div className="mt-1 text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
