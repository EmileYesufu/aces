"use client";

import { useEffect, useState } from "react";

/** First fixture of the 2026 tournament — May 30th 2026, 09:00 BST */
export const FIRST_FIXTURE = new Date("2026-05-30T09:00:00+01:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    done: false,
  };
}

type CountdownProps = {
  target?: Date;
  variant?: "hero" | "panel";
  className?: string;
};

const units = ["days", "hours", "minutes", "seconds"] as const;
const unitLabels: Record<(typeof units)[number], string> = {
  days: "Days",
  hours: "Hrs",
  minutes: "Min",
  seconds: "Sec",
};

export function Countdown({ target = FIRST_FIXTURE, variant = "hero", className }: CountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const isHero = variant === "hero";

  if (mounted && time.done) {
    return (
      <p className={className}>
        <span className="font-display text-lg font-bold uppercase tracking-wide text-aces-gold-bright">
          The 2026 tournament is underway
        </span>
      </p>
    );
  }

  return (
    <div className={className}>
      <p
        className={
          isHero
            ? "mb-3 font-display text-xs font-semibold uppercase tracking-widest text-gray-300"
            : "mb-3 text-sm font-semibold uppercase tracking-widest text-aces-muted"
        }
      >
        Kick-off in
      </p>
      <div className="flex gap-2 sm:gap-3" aria-hidden={!mounted}>
        {units.map((unit) => (
          <div
            key={unit}
            className={
              isHero
                ? "flex min-w-[3.5rem] flex-col items-center rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm sm:min-w-[4rem]"
                : "flex min-w-[3.5rem] flex-col items-center rounded-lg border border-aces-navy/10 bg-surface px-3 py-2 sm:min-w-[4rem]"
            }
          >
            <span
              className={
                isHero
                  ? "font-display text-2xl font-bold tabular-nums text-white sm:text-3xl"
                  : "font-display text-2xl font-bold tabular-nums text-aces-navy sm:text-3xl"
              }
            >
              {mounted ? String(time[unit]).padStart(2, "0") : "--"}
            </span>
            <span
              className={
                isHero
                  ? "text-[10px] font-medium uppercase tracking-wide text-gray-400"
                  : "text-[10px] font-medium uppercase tracking-wide text-aces-muted"
              }
            >
              {unitLabels[unit]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
