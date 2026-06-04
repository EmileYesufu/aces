"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { XIcon } from "@/components/ui/SocialIcons";
import { socialFeedConfig } from "@/content/social-feed";

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

let scriptPromise: Promise<void> | null = null;

function loadWidgetsScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.twttr?.widgets) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const src = "https://platform.twitter.com/widgets.js";
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (window.twttr?.widgets) resolve();
      else existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.body.appendChild(script);
  });

  return scriptPromise;
}

/** X profile timeline via widgets.js (avoids syndication rate limits). */
export function XTimeline() {
  const { x } = socialFeedConfig;
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    const timeout = window.setTimeout(() => {
      if (!cancelled) setStatus((s) => (s === "loading" ? "error" : s));
    }, 15_000);

    loadWidgetsScript()
      .then(() => {
        if (cancelled) return;
        const render = () => {
          if (cancelled) return;
          window.twttr?.widgets.load(container);
          setStatus("ready");
        };
        if (window.twttr?.ready) window.twttr.ready(render);
        else render();
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black">
            <XIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold uppercase text-aces-navy">X</h3>
            <p className="text-sm text-aces-muted">{x.displayName}</p>
          </div>
        </div>
        <Link
          href={x.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-aces-red hover:underline"
        >
          Follow
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {status === "error" ? (
          <div
            className="flex flex-col items-center justify-center gap-3 bg-gray-50 p-8 text-center"
            style={{ minHeight: x.embedHeight }}
          >
            <p className="text-sm text-aces-muted">
              The X timeline could not be loaded. This is often caused by ad blockers or browser privacy settings.
            </p>
            <Link
              href={x.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-aces-red hover:underline"
            >
              View {x.displayName} on X
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="relative" style={{ minHeight: x.embedHeight }}>
            {status === "loading" && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50 text-sm text-aces-muted">
                Loading posts…
              </div>
            )}
            <div ref={containerRef} className="min-h-[200px]">
              <a
                className="twitter-timeline"
                data-height={x.embedHeight}
                data-theme="light"
                data-chrome="noheader nofooter transparent"
                data-tweet-limit={x.tweetLimit}
                href={`https://twitter.com/${x.username}?ref_src=twsrc%5Etfw`}
              >
                Posts by @{x.username}
              </a>
            </div>
          </div>
        )}
        <Link
          href={x.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold text-aces-red hover:bg-gray-100"
        >
          View latest on X
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
