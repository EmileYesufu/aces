"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function MobileCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm transition-transform duration-300 lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-lg gap-3">
        <Button href="/tournament/register" className="flex-1">
          Register Interest
        </Button>
        <Button href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} external variant="outline" aria-label="Call ACES Nationals">
          <Phone className="h-4 w-4" />
          Call
        </Button>
      </div>
    </div>
  );
}
