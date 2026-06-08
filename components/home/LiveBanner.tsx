"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Radio, ArrowRight } from "lucide-react";
import { firstFixtureDate, lastFixtureDate } from "@/content/tournament-2027";
import { siteConfig } from "@/content/site";

function isWithinWindow(): boolean {
  if (!firstFixtureDate || !lastFixtureDate) return false;
  const now = Date.now();
  return now >= firstFixtureDate.getTime() && now <= lastFixtureDate.getTime();
}

export function LiveBanner() {
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(isWithinWindow());
  }, []);

  if (!live) return null;

  return (
    <div className="bg-aces-red text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <p className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide">
          <Radio className="h-4 w-4 animate-pulse" aria-hidden="true" />
          The ACES Nationals is live
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
          >
            Watch the livestream
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href="/hall-of-fame"
            className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
          >
            Results &amp; champions
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
