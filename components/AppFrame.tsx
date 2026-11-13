"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A browser window around a recreation of an app screen (2026-11-13): the
 * home page's illustrations look like the app itself (app.stratacouncil.ca),
 * built from the app's own layout, colours, and type, with a fictional
 * strata. They animate once in view; with reduced motion they hold still.
 */
export function AppFrame({ url, label, children }: { url: string; label: string; children: React.ReactNode }) {
  return (
    <div className="appframe" role="img" aria-label={label}>
      <div className="appframe__bar" aria-hidden="true">
        <span className="appframe__dots">
          <span />
          <span />
          <span />
        </span>
        <span className="appframe__url">{url}</span>
      </div>
      <div className="appframe__screen" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}

/** True once the element has scrolled into view (and stays true). */
export function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
