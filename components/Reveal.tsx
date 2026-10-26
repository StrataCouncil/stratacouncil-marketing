"use client";

import { useEffect } from "react";

/**
 * Elements fade up a little as they come into view. Nothing is hidden
 * until this runs (the `reveal-on` class on <html> turns the starting
 * state on), so the page reads fine without scripts, and with reduced
 * motion nothing moves at all. Siblings stagger slightly.
 */
const SELECTOR = [
  ".hero__text > *",
  ".hero__media",
  ".section-head",
  ".card",
  ".step",
  ".panel",
  ".split > *",
  ".faq",
  ".photo",
  ".solutions li",
].join(",");

export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    els.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const i = Math.min(siblings.indexOf(el), 4);
      if (i > 0) el.style.transitionDelay = `${i * 80}ms`;
    });
    document.documentElement.classList.add("reveal-on");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
