"use client";

import { Printer } from "lucide-react";

type PrintButtonProps = {
  label?: string;
  className?: string;
};

export function PrintButton({ label = "Download / Print", className }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 rounded-md bg-aces-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-aces-red-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red"
      }
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
