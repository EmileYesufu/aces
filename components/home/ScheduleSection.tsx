"use client";

import { useMemo, useState } from "react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Countdown } from "@/components/ui/Countdown";
import {
  tournamentSchedule,
  tournamentDatesConfirmed,
  tournamentYear,
} from "@/content/tournament-2027";
import { CalendarPlus } from "lucide-react";
import { cn } from "@/lib/utils";

function parseDate(dateStr: string): Date {
  const months: Record<string, number> = { May: 4, June: 5 };
  const match = dateStr.match(/(\w+)\s+(\d+)/);
  if (!match) return new Date(tournamentYear, 5, 1);
  const month = months[match[1]] ?? 5;
  return new Date(tournamentYear, month, parseInt(match[2], 10));
}

function buildIcs(day: (typeof tournamentSchedule)[number]) {
  const start = parseDate(day.date);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const title = `ACES Nationals ${tournamentYear} — ${day.ageGroups.join(" & ")}`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ACES Nationals//EN",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    "LOCATION:Riverside Sports Complex, Nottingham NG7 2SA",
    `DESCRIPTION:ACES Nationals ${tournamentYear} football tournament`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function isGirls(group: string) {
  return group.toLowerCase().includes("girl");
}

function AgeBadge({ group }: { group: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize",
        isGirls(group) ? "bg-aces-red/10 text-aces-red" : "bg-aces-navy/10 text-aces-navy"
      )}
    >
      {group}
    </span>
  );
}

type Filter = "all" | "boys" | "girls";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "boys", label: "Boys" },
  { id: "girls", label: "Girls" },
];

export function ScheduleSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const hasAgeGroups = tournamentSchedule.some((day) => day.ageGroups.length > 0);

  const days = useMemo(() => {
    return tournamentSchedule
      .map((day) => ({
        ...day,
        ageGroups: day.ageGroups.filter((g) => {
          if (filter === "all") return true;
          return filter === "girls" ? isGirls(g) : !isGirls(g);
        }),
      }))
      .filter((day) => !hasAgeGroups || day.ageGroups.length > 0);
  }, [filter, hasAgeGroups]);

  return (
    <Section className="bg-surface bg-pitch-pattern">
      <ScrollReveal>
        <SectionHeader
          title={`${tournamentYear} Tournament Schedule`}
          subtitle="Four weekends in May & June — dates and age groups coming soon · season 2027/28"
          centered
        />
      </ScrollReveal>

      <ScrollReveal>
        <div className="mb-10 flex justify-center">
          <Countdown variant="panel" className="text-center" />
        </div>
      </ScrollReveal>

      {hasAgeGroups && (
        <ScrollReveal>
          <div
            className="mx-auto mb-10 flex w-full max-w-xs rounded-full border border-aces-navy/15 bg-white p-1"
            role="group"
            aria-label="Filter schedule by tournament"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cn(
                  "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red",
                  filter === f.id ? "bg-aces-red text-white shadow-sm" : "text-aces-navy hover:bg-surface-muted"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>
      )}

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-aces-red/30 md:block" aria-hidden="true" />
        <div className="space-y-8">
          {days.map((day, index) => (
            <ScrollReveal key={day.label + day.ageGroups.join()} delay={index * 0.06}>
              <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                <div className="flex items-center gap-3 md:w-40 md:shrink-0 md:flex-col md:items-start">
                  <div className="hidden h-3 w-3 rounded-full bg-aces-red ring-4 ring-aces-red/20 md:block md:absolute md:-left-[5px]" />
                  <div className="rounded-full bg-aces-navy px-4 py-2 text-center font-display text-sm font-bold uppercase tracking-wide text-white">
                    {day.date}
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-aces-muted">
                    {day.label}
                  </span>
                </div>
                <div className="flex-1 rounded-card border border-gray-200 bg-white p-6 shadow-[var(--shadow-card)] transition-all hover:border-aces-red/30 hover:shadow-[var(--shadow-card-hover)]">
                  {day.ageGroups.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {day.ageGroups.map((group) => (
                        <AgeBadge key={group} group={group} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-aces-muted">Age groups coming soon</p>
                  )}
                  {tournamentDatesConfirmed && (
                    <a
                      href={`data:text/calendar;charset=utf-8,${encodeURIComponent(buildIcs(day))}`}
                      download={`aces-nationals-${day.date.replace(/\s/g, "-").toLowerCase()}.ics`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-aces-red hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red"
                    >
                      <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                      Add to calendar
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
