"use client";

import { useEffect, useRef, useState } from "react";

type LazyMountProps = {
  children: React.ReactNode;
  /** Min-height placeholder to avoid layout shift before mount */
  minHeight?: number | string;
  rootMargin?: string;
  className?: string;
};

/** Renders children only once scrolled near the viewport, to defer heavy embeds. */
export function LazyMount({ children, minHeight = 400, rootMargin = "200px", className }: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
