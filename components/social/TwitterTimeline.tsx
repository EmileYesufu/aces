"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

let widgetsLoadPromise: Promise<void> | null = null;

function loadTwitterWidgetsScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.twttr?.widgets) return Promise.resolve();

  if (widgetsLoadPromise) return widgetsLoadPromise;

  widgetsLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Twitter widgets failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Twitter widgets failed to load"));
    document.body.appendChild(script);
  });

  return widgetsLoadPromise;
}

type TwitterTimelineProps = {
  screenName: string;
  height: number;
  chrome?: string;
  tweetLimit?: number;
};

/** Profile timeline via Twitter's widgets.js (replaces react-twitter-embed for React 19). */
export function TwitterTimeline({ screenName, height, chrome, tweetLimit }: TwitterTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    loadTwitterWidgetsScript()
      .then(() => {
        if (!cancelled) window.twttr?.widgets.load(container);
      })
      .catch(() => {
        /* embed unavailable — fallback link remains in the anchor */
      });

    return () => {
      cancelled = true;
    };
  }, [screenName, height, chrome, tweetLimit]);

  return (
    <div ref={containerRef}>
      <a
        className="twitter-timeline"
        data-height={height}
        data-chrome={chrome}
        {...(tweetLimit != null ? { "data-tweet-limit": tweetLimit } : {})}
        href={`https://twitter.com/${screenName}?ref_src=twsrc%5Etfw`}
      >
        Posts from @{screenName}
      </a>
    </div>
  );
}
