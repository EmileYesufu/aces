import { ShieldCheck, Users, Eye, MapPin } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "FA Sanctioned", sub: "Every year" },
  { icon: Users, label: "400+ Teams", sub: "Across Great Britain" },
  { icon: Eye, label: "Pro & WSL Scouts", sub: "On the touchline" },
  { icon: MapPin, label: "Nottingham", sub: "Riverside Sports Complex" },
];

export function CredibilityStrip() {
  return (
    <section className="border-b border-gray-200 bg-white" aria-label="Tournament credentials">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-gray-100 px-4 sm:px-6 md:grid-cols-4 md:divide-y-0 lg:px-8">
        {items.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3 px-2 py-5 md:justify-center md:py-6">
            <Icon className="h-6 w-6 shrink-0 text-aces-red" aria-hidden="true" />
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wide text-aces-navy sm:text-base">
                {label}
              </p>
              <p className="text-xs text-aces-muted">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
