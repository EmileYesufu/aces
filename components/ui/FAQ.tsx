"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `faq-trigger-${index}`;
        const panelId = `faq-panel-${index}`;
        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-lg border bg-white transition-all duration-200",
              isOpen ? "border-aces-red/30 shadow-sm" : "border-gray-200"
            )}
          >
            <button
              type="button"
              id={buttonId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-aces-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              {item.question}
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-aces-red transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-gray-100 px-6 py-4 text-aces-muted">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
