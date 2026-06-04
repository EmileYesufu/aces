"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

declare global {
  interface Window {
    twttr?: {
      ready: (fn: () => void) => void;
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
      const done = () => resolve();
      if (window.twttr?.widgets) done();
      else existing.addEventListener("load", done);
      existing.addEventListener("error", () => reject(new Error("Twitter widgets failed")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Twitter widgets failed"));
    document.body.appendChild(script);
  });

  return widgetsLoadPromise;
}

type XTimelineEmbedProps = {
  screenName: string;
  profileUrl: string;
  height?: number;
  tweetLimit?: number;
};

export function XTimelineEmbed({
  screenName,
  profileUrl,
  height = 520,
  tweetLimit = 5,
}: XTimelineEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    const timeout = window.setTimeout(() => {
      if (!cancelled) setStatus((s) => (s === "loading" ? "error" : s));
    }, 12_000);

    loadTwitterWidgetsScript()
      .then(() => {
        if (cancelled) return;
        const render = () => {
          if (cancelled) return;
          window.twttr?.widgets.load(container);
          setStatus("ready");
        };
        if (window.twttr?.ready) {
          window.twttr.ready(render);
        } else {
          render();
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [screenName, height, tweetLimit]);

  if (status === "error") {
    return (
      <div className="flex flex-col">
        <div
          className="flex flex-col items-center justify-center gap-3 bg-gray-50 p-8 text-center text-sm text-aces-muted"
          style={{ minHeight: height }}
        >
          <p>Posts could not be loaded here (often blocked by privacy extensions).</p>
          <Link
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-aces-red hover:underline"
          >
            Open @{screenName} on X
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden" style={{ minHeight: height }}>
        {status === "loading" && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50 text-sm text-aces-muted">
            Loading posts from @{screenName}…
          </div>
        )}
        <div ref={containerRef}>
          <a
            className="twitter-timeline"
            data-height={height}
            data-chrome="noheader nofooter transparent"
            data-tweet-limit={tweetLimit}
            href={`https://twitter.com/${screenName}?ref_src=twsrc%5Etfw`}
          >
            Posts from @{screenName}
          </a>
        </div>
      </div>
      <Link
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold text-aces-red hover:bg-gray-100"
      >
        View all posts on X
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
