import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "StrataCouncil.ca — Coming soon",
  description:
    "Practical education and governance tools for BC strata council members. Launching soon.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Temporary holding page for the whole marketing site (2026-09-30, doc00
 * changelog) — the real site is live at every route beneath this one, but
 * has placeholder art and non-functional links, so it's not ready for a
 * cold visitor yet. middleware.ts redirects every request that isn't this
 * page (or a static asset) here.
 *
 * To take the gate down once the real site is ready: delete
 * middleware.ts. Nothing else needs to change — every real page keeps
 * working exactly as it does today, this page and the redirect are purely
 * additive.
 */
export default function ComingSoonPage() {
  return (
    <main className="coming-soon">
      <div className="coming-soon__wordmark">
        <Logo className="coming-soon__logo" />
        <span>StrataCouncil.ca</span>
      </div>
      <p className="coming-soon__body">
        Practical education and governance tools for BC strata council
        members &mdash; launching soon.
      </p>
    </main>
  );
}
