"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

type InstagramEmbedGridProps = {
  postUrls: string[];
};

function loadInstagramEmbeds() {
  if (window.instgrm?.Embeds) {
    window.instgrm.Embeds.process();
    return;
  }

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src="https://www.instagram.com/embed.js"]'
  );
  if (existing) {
    existing.addEventListener("load", () => window.instgrm?.Embeds.process());
    return;
  }

  const script = document.createElement("script");
  script.src = "https://www.instagram.com/embed.js";
  script.async = true;
  script.onload = () => window.instgrm?.Embeds.process();
  document.body.appendChild(script);
}

/** Official Instagram embeds — load in the browser (works when server API is blocked). */
export function InstagramEmbedGrid({ postUrls }: InstagramEmbedGridProps) {
  useEffect(() => {
    loadInstagramEmbeds();
  }, [postUrls]);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {postUrls.map((url) => (
        <div key={url} className="flex justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: 0,
              borderRadius: 3,
              boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: 1,
              maxWidth: 540,
              minWidth: 280,
              padding: 0,
              width: "100%",
            }}
          />
        </div>
      ))}
    </div>
  );
}
