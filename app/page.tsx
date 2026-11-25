import type { Metadata } from "next";
import { DemoReveal } from "@/components/DemoReveal";
import { type Art, Device } from "@/components/Device";
import { MeetingAgenda } from "@/components/MeetingAgenda";
import { Pricing } from "@/components/Pricing";
import { StratasphereDemo } from "@/components/StratasphereDemo";
import { DEMO_HREF, SiteFooter, SiteHeader, SIGNUP_URL } from "@/components/SiteChrome";
import { TrainingPreview } from "@/components/TrainingPreview";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

/**
 * One promise, three capabilities (2026-11-05): Learn. Decide. Remember.
 * StrataCouncil.ca builds effective councils; it isn't strata management
 * software. Council Training, the Library, and council and committee
 * meetings in Meeting Mode are free; Stratasphere is the paid product (the
 * assistant, search across the records, AI drafting, and AGMs and SGMs
 * once they're built).
 * Prices (2026-11-12): $30 a month plus $3 a lot, or $25 plus $2.50 on a
 * 12-month commitment, billed monthly; management companies talk to us.
 *
 * Copy rules: outcomes, not features; nothing about learning from other
 * stratas; no "knows everything"; no Zoom until it's live; Meeting Mode's
 * legal side is "worked out for you", never a promise of compliance; the
 * security FAQ stays word for word.
 *
 * Layout (2026-11-25, editorial refresh; design/2026-11-editorial-refresh):
 * one continuous page on paper, sections divided by thin rules rather than
 * boxes. Learn. Decide. Remember. is a typographic band, the product demos
 * are the main visuals, and two illustrations carry the people. Each
 * section is a headline, a line or two, one visual and at most one button.
 * Nothing fades in on scroll. The building flight (components/BuildingTour.tsx)
 * is off the home page for now.
 */

/**
 * A still of Meeting Mode (2026-11-11), from a Super Admin sandbox on the
 * demo site, so only the fictional strata appears. Until it's added, the
 * section shows its mockup. Interactives (an interactive walkthrough built
 * into the app) replace it later.
 */
const MEETING_STILL: { src: string; width: number; height: number } | null = null;

const managerPoints: { lead: string; rest: string }[] = [
  {
    lead: "Meetings that practically run themselves.",
    rest: "Manage agendas, attendance, motions, voting, and decisions in one place, with structured draft minutes ready for review.",
  },
  {
    lead: "Answers without the endless email chains.",
    rest: "Give councils access to their bylaws, meeting history, and relevant BC legislation through Stratasphere, with verifiable sources.",
  },
  {
    lead: "Better-informed council members.",
    rest: "Free, practical training helps new and experienced volunteers understand their responsibilities.",
  },
  {
    lead: "Works with the tools you already use.",
    rest: "StrataCouncil.ca complements your existing management software rather than replacing it.",
  },
];

/**
 * The page's illustrations (2026-11-25, editorial refresh): one set, made
 * with an AI image tool whose terms allow commercial use, on transparent
 * backgrounds. The three laptops carry the live app demos on their screens
 * (components/Device.tsx). Kept in public/illustrations at 1400px wide.
 */
const ART: Record<"hero" | "training" | "meeting" | "stratasphere" | "managers" | "closer", Art> = {
  hero: {
    src: "/illustrations/hero.webp",
    width: 1400,
    height: 795,
    alt: "Three council members of different ages talking around a table with a laptop, notebooks, and coffee.",
  },
  training: {
    src: "/illustrations/training.webp",
    width: 1400,
    height: 788,
    alt: "",
  },
  meeting: {
    src: "/illustrations/meeting-mode.webp",
    width: 1400,
    height: 788,
    alt: "",
  },
  stratasphere: {
    src: "/illustrations/stratasphere.webp",
    width: 1400,
    height: 700,
    alt: "",
  },
  managers: {
    src: "/illustrations/managers.webp",
    width: 1400,
    height: 700,
    alt: "Four people of different ages talking together and smiling.",
  },
  closer: {
    src: "/illustrations/closer-look.webp",
    width: 1400,
    height: 700,
    alt: "Council members around a table with laptops, notebooks, and coffee, talking and smiling.",
  },
};

/**
 * Pricing questions (2026-11-12), under the comparison table. Each answer
 * must match the app: lib/stripe/prices.ts, billing/actions.ts (how each
 * plan cancels), and the 0090 gates (who can use Stratasphere).
 */
const pricingFaqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is Free really free for good?",
    a: (
      <p>
        Yes. There is no trial, no time limit, and no card. Council Training, the Library, council and committee
        meetings in Meeting Mode, and storage for your records stay free. You pay only if you want Stratasphere.
      </p>
    ),
  },
  {
    q: "How is Stratasphere billed?",
    a: (
      <>
        <p>
          Monthly, to the strata corporation, by card or pre-authorized debit. Monthly is $30 per strata plus $3 per
          strata lot, so a 45-lot strata pays $165 a month. Yearly is $25 plus $2.50 per lot on a 12-month commitment,
          still billed monthly, so the same strata pays $137.50 a month.
        </p>
        <p>Prices are in Canadian dollars, plus GST.</p>
      </>
    ),
  },
  {
    q: "Can council approve it without a general meeting?",
    a: (
      <p>
        Spending that isn&rsquo;t in the budget is limited by your bylaws and the Strata Property Act. If your limit is
        $2,000, a full year of the Yearly plan stays under it, GST included, for stratas of up to 53 lots (Monthly: up
        to 42). Check your own bylaws, or add it to the next budget.
      </p>
    ),
  },
  {
    q: "Who can use it?",
    a: (
      <p>
        Council, your strata manager and their assistants, and the admins named on your Council page. There is no charge
        per person. Owners don&rsquo;t sign in: this is a tool for the people who run the strata, not an owner portal.
      </p>
    ),
  },
  {
    q: "What happens to our records if we stop?",
    a: (
      <p>
        Nothing is lost. Your records stay, free to store, and the strata moves back to Free. The assistant, search, AI
        drafting, and built-in video turn off. Anything you add in the meantime is read as soon as you subscribe again.
      </p>
    ),
  },
  {
    q: "Can we cancel?",
    a: (
      <p>
        Yes. On Monthly, the subscription ends at the end of the month you&rsquo;ve paid for. On Yearly, it
        doesn&rsquo;t renew, and billing and access continue to the end of the 12-month term.
      </p>
    ),
  },
  {
    q: "Can we use it with our strata manager?",
    a: (
      <p>
        Yes. Invite your strata manager, and the record stays with the strata if you ever change management companies.
        Management companies running several stratas can talk to us about one agreed price.
      </p>
    ),
  },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is Stratasphere secure?",
    a: (
      <>
        <p>Strata records can contain sensitive information. Protecting that information is essential.</p>
        <p>Stratasphere&rsquo;s safeguards include:</p>
        <ul>
          <li>
            <strong>Data stored in Canada:</strong> Strata records and files are stored in Canada.
          </li>
          <li>
            <strong>Encryption:</strong> Data is encrypted in transit and at rest.
          </li>
          <li>
            <strong>Access controls:</strong> Row-level security limits access to records according to the user&rsquo;s
            permissions.
          </li>
          <li>
            <strong>Two-factor sign-in:</strong> Available on every account.
          </li>
          <li>
            <strong>Hosting standards:</strong> The hosting provider is SOC 2 and ISO 27001 compliant.
          </li>
          <li>
            <strong>Privacy before AI processing:</strong> Names and personal details are removed before information is
            sent to Stratasphere&rsquo;s AI. Information sent to the AI is not used to train AI models.
          </li>
        </ul>
        <p>
          StrataCouncil.ca is designed to support compliance with BC&rsquo;s Personal Information Protection Act (PIPA).
          See the <a href="/privacy">Privacy Policy</a> for details about how personal information is handled.
        </p>
      </>
    ),
  },
  {
    q: "How is this different from strata management software?",
    a: (
      <>
        <p>
          Strata management software typically supports the day-to-day administration of a building, including
          accounting, owner payments, maintenance requests, and bookings.
        </p>
        <p>
          StrataCouncil.ca focuses on the council and its decisions: helping members learn their responsibilities,
          organize records, run meetings, and find relevant information when questions arise.
        </p>
        <p>It is designed to work alongside your existing management software and strata manager, not replace them.</p>
      </>
    ),
  },
  {
    q: "Does this replace the strata manager?",
    a: (
      <>
        <p>
          No. Stratasphere helps councils prepare for meetings, maintain records, and find relevant information. It can
          be used alongside a strata manager or by a self-managed strata.
        </p>
        <p>
          It does not replace the professional judgement of a strata manager, qualified specialist, or lawyer, and it is
          not legal advice.
        </p>
      </>
    ),
  },
  {
    q: "Do I need to be on council to take the training?",
    a: (
      <p>
        No. The training is free and open to anyone. If you own a strata lot and are considering running for council, it
        can help you understand the responsibilities before the next AGM.
      </p>
    ),
  },
];

/**
 * Member quotes. Hidden until there are real ones: never fill this with an
 * invented name or words. Add the quote, then set SHOW_TESTIMONIAL to true.
 */
const SHOW_TESTIMONIAL = false;
const testimonial = {
  quote: "[Quote to come: a real council member, once we have one.]",
  cite: "[Name], [Role], [Strata corporation]",
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero__inner">
            <div className="hero__text">
              <p className="eyebrow eyebrow--ruled" data-testid="hero-eyebrow">
                Learn. Decide. Remember.
              </p>
              <h1>
                Build a <em>better</em>
                <br />
                strata council.
              </h1>
              <p className="lede">
                Training, meeting tools, and institutional memory to make your strata council more effective.
              </p>
              <div className="actions">
                <a href={SIGNUP_URL} className="button button-primary" data-testid="hero-primary-cta">
                  Start free training <span aria-hidden="true">&rarr;</span>
                </a>
                <a href={DEMO_HREF} className="button button-secondary">
                  Request a demo
                </a>
              </div>
            </div>
            <figure className="hero__media">
              <img src={ART.hero.src} width={ART.hero.width} height={ART.hero.height} alt={ART.hero.alt} />
            </figure>
          </div>
        </section>

        <section className="tools" id="platform" aria-label="The platform">
          <div className="wrap">
            <article className="tool" id="learn">
              <Device art={ART.training} variant="training">
                <TrainingPreview />
              </Device>
              <div className="tool__text">
                <p className="eyebrow">Council Training</p>
                <h2>Practical training for real-world strata governance.</h2>
                <p className="lede">
                  Free, on-demand lessons, guides, and templates for council members, owners, and strata managers.
                </p>
                <a href={SIGNUP_URL} className="tool__link">
                  Explore training <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>

            <article className="tool tool--flip" id="decide">
              <Device art={ART.meeting} variant="meeting">
                {MEETING_STILL ? (
                  <img
                    src={MEETING_STILL.src}
                    width={MEETING_STILL.width}
                    height={MEETING_STILL.height}
                    alt="Meeting Mode running a council meeting: the agenda, the motion, and a live vote with the result worked out"
                    loading="lazy"
                  />
                ) : (
                  <MeetingAgenda />
                )}
              </Device>
              <div className="tool__text">
                <p className="eyebrow">Meeting Mode</p>
                <h2>Run effective meetings and capture the details.</h2>
                <p className="lede">
                  Agendas, live voting, and draft minutes that turn discussion into action.
                </p>
                <a href={DEMO_HREF} className="tool__link">
                  See Meeting Mode <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>

            <article className="tool" id="remember">
              <Device art={ART.stratasphere} variant="stratasphere">
                <StratasphereDemo />
              </Device>
              <div className="tool__text">
                <p className="eyebrow">Stratasphere&trade;</p>
                <h2>Your strata knowledge, instantly accessible.</h2>
                <p className="lede">
                  A private, AI-powered knowledge base for your bylaws, minutes, contracts, and decisions.
                </p>
                <a href={DEMO_HREF} className="tool__link">
                  Explore Stratasphere <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
            <p className="small tools__note">
              The screens show a fictional strata. Quorum and thresholds are based on the Strata Property Act and the
              Standard Bylaws. If your bylaws differ, they govern, and council remains responsible for following the Act,
              its bylaws, and applicable meeting requirements.
            </p>
          </div>
        </section>

        <section className="section section--ink" id="managers">
          <div className="wrap split">
            <div>
              <p className="eyebrow">For strata managers</p>
              <h2>Less administration. More effective councils.</h2>
              <p className="lede">
                Strata managers have enough on their plates. StrataCouncil.ca helps councils take greater responsibility
                for their own governance, streamlines meetings and decision-making, and makes important information
                easier to find. Less time chasing paperwork and answering repetitive questions. More time managing
                properties.
              </p>
              <div className="actions">
                <a href={DEMO_HREF} className="button button--light">
                  Request a demo
                </a>
              </div>
            </div>
            <div className="managers__side">
              <figure className="managers__media">
                <img
                  src={ART.managers.src}
                  width={ART.managers.width}
                  height={ART.managers.height}
                  alt={ART.managers.alt}
                  loading="lazy"
                />
              </figure>
              <ul className="list-check">
                {managerPoints.map((p) => (
                  <li key={p.lead}>
                    <strong>{p.lead}</strong> {p.rest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section section--paper" id="pricing">
          <div className="wrap">
            <div className="section-head section-head--center">
              <p className="eyebrow">Pricing</p>
              <h2>Free for every council. Pay only for the Stratasphere.</h2>
              <p className="lede">
                Training, council meetings, and your records cost nothing, for as long as you use them. Stratasphere
                adds answers from your records and built-in video, with AGMs and SGMs coming soon.
              </p>
            </div>
            <Pricing signupUrl={SIGNUP_URL} contactHref={DEMO_HREF} />
          </div>
        </section>

        <section className="section" id="faq">
          <div className="wrap">
            <div className="section-head">
              <h2>Questions and answers</h2>
            </div>
            <div className="faq" data-testid="faq">
              {faqs.map((f) => (
                <details className="faq__item" key={f.q}>
                  <summary>{f.q}</summary>
                  <div className="faq__answer">{f.a}</div>
                </details>
              ))}
              <details className="faq__item faq__item--group" data-testid="pricing-faq">
                <summary>Pricing questions</summary>
                <div className="faq faq--sub">
                  {pricingFaqs.map((f) => (
                    <details className="faq__item" key={f.q}>
                      <summary>{f.q}</summary>
                      <div className="faq__answer">{f.a}</div>
                    </details>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </section>

        <section className="section closer-section" id="demo">
          <div className="wrap closer">
            <div className="closer__text">
              <h2>Take a closer look.</h2>
              <p className="lede">
                We&rsquo;ll set up a demo strata so you can explore the records, run a meeting, and ask Stratasphere. Or
                start the free training now.
              </p>
              <DemoReveal signupUrl={SIGNUP_URL} />
            </div>
            <figure className="closer__media">
              <img
                src={ART.closer.src}
                width={ART.closer.width}
                height={ART.closer.height}
                alt={ART.closer.alt}
                loading="lazy"
              />
            </figure>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
