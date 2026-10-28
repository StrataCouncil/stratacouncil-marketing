import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CampaignTags } from "@/components/CampaignTags";
import { SITE_URL } from "@/app/site-url";
import "./globals.css";

// Variable, with the SOFT axis: headings use it at full softness and a
// light weight, which keeps the serif from reading formal.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal"],
  axes: ["SOFT", "opsz"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700"],
});

const TITLE = "StrataCouncil.ca | Training and tools for BC strata councils";
const DESCRIPTION =
  "Free training for BC strata councils, a permanent home for strata records, and Stratasphere tools for meetings and answers grounded in your records and BC strata law.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { type: "website", siteName: "StrataCouncil.ca", locale: "en_CA", title: TITLE, description: DESCRIPTION },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        {children}
        {/* Vercel Web Analytics: page views and referring sites, no cookies (privacy policy §11). */}
        <Analytics />
        <CampaignTags />
      </body>
    </html>
  );
}
