import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "StrataCouncil.ca — Coming soon",
  description: "Practical education and governance tools for BC strata council members. Launching soon.",
  robots: { index: false, follow: false },
};

/** The holding page that middleware.ts sends every production visitor to. */
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
    </main>
  );
}
