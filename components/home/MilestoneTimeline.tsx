import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { heritageMilestones } from "@/content/tournament-2026";

export function MilestoneTimeline() {
  return (
    <div className="relative">
      <div
        className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-aces-red/25 md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      />
      <ol className="space-y-10">
        {heritageMilestones.map((m, i) => (
          <ScrollReveal key={m.year} delay={i * 0.08}>
            <li className="relative pl-10 md:grid md:grid-cols-2 md:gap-12 md:pl-0">
              <span
                className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-4 border-white bg-aces-red shadow md:left-1/2 md:-translate-x-1/2"
                aria-hidden="true"
              />
              <div className={i % 2 === 0 ? "md:pr-12 md:text-right" : "md:order-2 md:pl-12"}>
                <p className="font-display text-3xl font-bold text-aces-red">{m.year}</p>
                <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-tight text-aces-navy">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm text-aces-muted">{m.description}</p>
              </div>
              <div className={i % 2 === 0 ? "hidden md:block" : "hidden md:order-1 md:block"} aria-hidden="true" />
            </li>
          </ScrollReveal>
        ))}
      </ol>
    </div>
  );
}
