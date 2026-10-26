import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { DemoRequestForm } from "@/components/DemoRequestForm";
import { INVESTORS_URL } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "StrataCouncil.ca — Coming soon",
  description: "Training and governance tools for BC strata councils. Launching soon.",
  robots: { index: false, follow: false },
};

/** The holding page that middleware.ts sends every production visitor to, with a demo request form. */
export default function ComingSoonPage() {
  return (
    <main className="coming-soon">
      <div className="coming-soon__card">
        <div className="wordmark">
          <Logo className="wordmark__mark" />
          <span>StrataCouncil.ca</span>
        </div>
        <h2>Strata council, without the guesswork.</h2>
        <p className="lede">
          Free training for BC strata council members, one place for every strata record, and Stratasphere&trade; for
          running meetings and finding answers. Launching soon.
        </p>
        <DemoRequestForm page="coming-soon" />
        <p className="coming-soon__investors">
          Prospective investors: <a href={INVESTORS_URL}>request the investor briefing</a>. This is not an offer to sell,
          or a solicitation of an offer to buy, any securities.
        </p>
        <nav className="coming-soon__legal" aria-label="Legal">
          <a href="/privacy">Privacy Policy</a>
          <span aria-hidden="true">&middot;</span>
          <a href="/terms">Terms of Service</a>
        </nav>
      </div>
    </main>
  );
}
