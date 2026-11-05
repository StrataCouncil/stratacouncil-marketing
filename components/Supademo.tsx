"use client";

import Script from "next/script";
import { DEMO_HREF } from "@/components/SiteChrome";

/**
 * Supademo walkthroughs (2026-11-05). Each one must show only the fictional
 * demo strata. Supademo's script loads only once a demo ID is set; until
 * then the button opens the demo request form.
 */
declare global {
  interface Window {
    Supademo?: { open: (id: string) => void };
  }
}

export function DemoButton(props: { demoId: string | null; className?: string; children: React.ReactNode }) {
  if (!props.demoId) {
    return (
      <a href={DEMO_HREF} className={props.className}>
        {props.children}
      </a>
    );
  }
  const id = props.demoId;
  return (
    <>
      <Script src="https://script.supademo.com/supademo.js" strategy="lazyOnload" />
      <a
        href={`https://app.supademo.com/demo/${encodeURIComponent(id)}`}
        className={props.className}
        target="_blank"
        rel="noopener"
        onClick={(e) => {
          if (window.Supademo) {
            e.preventDefault();
            window.Supademo.open(id);
          }
        }}
      >
        {props.children}
      </a>
    </>
  );
}

export function DemoEmbed(props: { demoId: string; title: string }) {
  return (
    <div className="demo-embed">
      <iframe
        src={`https://app.supademo.com/embed/${encodeURIComponent(props.demoId)}?embed_v=2`}
        title={props.title}
        loading="lazy"
        allow="clipboard-write"
        allowFullScreen
      />
    </div>
  );
}
