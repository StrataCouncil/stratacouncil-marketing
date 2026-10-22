import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { DemoRequestForm } from "@/components/DemoRequestForm";

export const metadata: Metadata = {
  title: "StrataCouncil.ca — Coming soon",
  description: "Practical education and governance tools for BC strata council members. Launching soon.",
  robots: { index: false, follow: false },
};

/** The holding page that middleware.ts sends every production visitor to, with a demo request form. */
export default function ComingSoonPage() {
  return (
    <main className="coming-soon">
      <div className="wordmark">
        <Logo className="wordmark__mark" />
        <span>StrataCouncil.ca</span>
      </div>
      <p className="coming-soon__body">
        Practical education and governance tools for BC strata council members, launching soon.
      </p>
      <DemoRequestForm />
      <p className="coming-soon__investors">
        Prospective investors:{" "}
        <a href="https://app.stratacouncil.ca/investors">request the investor briefing</a>. This is not an offer to sell, or a
        solicitation of an offer to buy, any securities.
      </p>
      <nav className="coming-soon__legal" aria-label="Legal">
        <a href="/privacy">Privacy Policy</a>
        <span aria-hidden="true">&middot;</span>
        <a href="/terms">Terms of Service</a>
      </nav>
    </main>
  );
}
