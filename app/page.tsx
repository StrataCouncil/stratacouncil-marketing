import type { Metadata } from "next";
import { DemoRequestForm } from "@/components/DemoRequestForm";
import { MeetingAgenda } from "@/components/MeetingAgenda";
import { Pricing } from "@/components/Pricing";
import { DEMO_HREF, SiteFooter, SiteHeader, SIGNUP_URL } from "@/components/SiteChrome";
import { TrainingPreview } from "@/components/TrainingPreview";

export const metadata: Metadata = { alternates: { canonical: "/" }, openGraph: { url: "/" } };

/**
 * One promise, three capabilities (2026-11-05): Learn. Decide. Remember.
 * StrataCouncil.ca builds effective councils; it isn't strata management
 * software. Council Training, the Library, and council and committee
 * meetings in Meeting Mode are free; Stratasphere is the paid product (the
 * assistant, search across the records, AGMs and SGMs, and AI drafting).
 * Prices (2026-11-12): $30 a month plus $3 a lot, or $25 plus $2.50 on a
 * 12-month commitment, billed monthly; over 100 lots, talk to us.
 *
 * Copy rules: outcomes, not features; nothing about learning from other
 * stratas; no "knows everything"; no Zoom until it's live; Meeting Mode's
 * legal side is "worked out for you", never a promise of compliance; the
 * security FAQ stays word for word.
 *
 * Layout (2026-11-05): tight, in the manner of Glide and Amperos. Each
 * section is a headline, a line or two, one visual and at most one button.
 * Nothing fades in on scroll, and nothing moves. The building flight (components/BuildingTour.tsx) is
 * off the home page for now.
 */

/**
 * A still of Meeting Mode (2026-11-11), from a Super Admin sandbox on the
 * demo site, so only the fictional strata appears. Until it's added, the
 * section shows its mockup. Interactives (an interactive walkthrough built
 * into the app) replace it later.
 */
const MEETING_STILL: { src: string; width: number; height: number } | null = null;

const pillars = [
  { id: "learn", verb: "Learn", line: "Know your role.", what: "Council Training and Reference Library", price: "Free training" },
  { id: "decide", verb: "Decide", line: "Run the meeting.", what: "Set up, run, and document meetings with ease", price: "Council meetings free" },
  {
    id: "remember",
    verb: "Remember",
    line: "Retain the knowledge.",
    what: "Every decision council\u2019s ever made at your fingertips",
    price: "Free document storage",
  },
];

/** What's in the Library, by kind (the titles themselves change as it grows). */
const libraryKinds = ["Emergency playbooks", "Policy templates", "Forms", "Practical guides"];

const meetingOutcomes = [
  "Quorum and voting thresholds worked out for you, as people arrive and leave.",
  "Members vote from their own screens, and every result is recorded.",
  "Conflicts of interest declared and recorded with the item.",
  "Draft minutes the moment you adjourn.",
];

/**
 * One example question and answer, for a fictional strata. Illustrative:
 * not a promise about any one strata's documents.
 */
const example = {
  question:
    "Our roof is near the end of its service life. What should council review before deciding whether to repair or replace it?",
  answer:
    "Start with the depreciation report, the latest roof inspection, past repair invoices and warranties, and the strata\u2019s financial position. Then weigh the options, get professional advice where it\u2019s needed, and decide how the work will be funded.",
  sources: ["Depreciation report", "Roof inspection", "Previous council minutes", "Financial statements"],
};

const managerPoints = [
  "Motions, votes, and conflicts recorded as the meeting happens, with draft minutes at adjournment.",
  "Councils find answers in their own bylaws, minutes, and BC strata law, with the sources.",
  "New council members learn the basics, free.",
  "Works alongside your management software; it doesn\u2019t replace it.",
];

/**
 * The page's photos, chosen by a person: one shoot, by Theo Decker on
 * Pexels (credited in the footer). Kept in public/photos at web sizes.
 */
const PHOTOS = {
  hero: { src: "/photos/hero.jpg", alt: "A group reviewing documents together at a table." },
  demo: { src: "/photos/demo.jpg", alt: "A group listening to a colleague at a meeting table." },
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
        Yes. There is no trial, no time limit, and no card. Council Training, the Library, council and committee meetings
        in Meeting Mode, and storage for your records stay free. You pay only if you want Stratasphere.
      </p>
    ),
  },
  {
    q: "How is Stratasphere billed?",
    a: (
      <>
        <p>
          Monthly, to the strata corporation, by card or pre-authorized debit. Monthly is $30 per strata plus $3 per strata
          lot, so a 45-lot strata pays $165 a month. Yearly is $25 plus $2.50 per lot on a 12-month commitment, still
          billed monthly, so the same strata pays $137.50 a month.
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
        $2,000, a full year of the Yearly plan stays under it, GST included, for stratas of up to 53 lots (Monthly: up to
        42). Check your own bylaws, or add it to the next budget.
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
        Nothing is lost. Your records stay, free to store, and the strata moves back to Free. The assistant, search, AGMs
        and SGMs, and built-in video turn off. Anything you add in the meantime is read as soon as you subscribe again.
      </p>
    ),
  },
  {
    q: "Can we cancel?",
    a: (
      <p>
        Yes. On Monthly, the subscription ends at the end of the month you&rsquo;ve paid for. On Yearly, it doesn&rsquo;t
        renew, and billing and access continue to the end of the 12-month term.
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
          No. Stratasphere helps councils prepare for meetings, maintain records, and find relevant information. It can be
          used alongside a strata manager or by a self-managed strata.
        </p>
        <p>
          It does not replace the professional judgement of a strata manager, qualified specialist, or lawyer, and it is not
          legal advice.
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
              <p className="eyebrow" data-testid="hero-eyebrow">
                Learn. Decide. Remember.
              </p>
              <h1>
                Build a <em>better</em> strata council.
              </h1>
              <p className="lede">
                Training, meeting tools, and institutional memory to make your strata council super-effective.
              </p>
              <div className="actions">
                <a href={SIGNUP_URL} className="button button-primary" data-testid="hero-primary-cta">
                  Start free training
                </a>
                <a href={DEMO_HREF} className="button button-secondary">
                  Request a demo
                </a>
              </div>
              
            </div>
            <figure className="hero__media">
              <img src={PHOTOS.hero.src} alt={PHOTOS.hero.alt} />
            </figure>
          </div>
        </section>

        <section className="section section--tight" id="platform">
          <div className="wrap">
            <div className="section-head">
              <h2>Three essentials of an effective strata council.</h2>
            </div>
            <div className="cards cards--3 pillars" data-testid="pillars">
              {pillars.map((p) => (
                <a className="card pillar" href={`#${p.id}`} key={p.id}>
                  <span className="pillar__verb">{p.verb}</span>
                  <h3>{p.line}</h3>
                  <p>{p.what}</p>
                  <span className="pill card__tag">{p.price}</span>
                </a>
              ))}
            </div>
            <p className="pillars__note" id="different">
              <strong>Not another property management platform.</strong> Your strata manager manages the property. Your
              council governs the strata corporation. StrataCouncil.ca helps council do its job better.
            </p>
          </div>
        </section>

        <section className="section section--paper" id="learn">
          <div className="wrap">
            <div className="step">
              <div className="step__text">
                <p className="eyebrow">Learn &middot; Council Training and the Library</p>
                <h2>Know your role. Have the playbook.</h2>
                <p className="lede">
                  Short, free lessons on council duties, budgets and the CRF, meetings and voting, and bylaws and fines. The
                  Library keeps the tools beside them.
                </p>
                <ul className="chips" aria-label="What's in the Library">
                  {libraryKinds.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
                <div className="actions">
                  <a href={SIGNUP_URL} className="button button-primary">
                    Start free training
                  </a>
                  <span className="pill">Free</span>
                </div>
              </div>
              <TrainingPreview />
            </div>
          </div>
        </section>

        <section className="section section--feature" id="decide">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Decide &middot; Meeting Mode</p>
              <h2>Make every meeting count.</h2>
              <p className="lede">
                From agenda to adjournment, with Stratasphere beside the agenda for questions as they come up.
              </p>
            </div>
            <div className="decide">
              <div className="decide__text">
                <ul className="list-check">
                  {meetingOutcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                <span className="pill">Council meetings free</span>
                <p className="small">
                  Quorum and thresholds are based on the Strata Property Act and the Standard Bylaws. If your bylaws
                  differ, they govern, and council remains responsible for following the Act, its bylaws, and applicable meeting requirements.
                </p>
              </div>
              {MEETING_STILL ? (
                <figure className="product-still">
                  <img
                    src={MEETING_STILL.src}
                    width={MEETING_STILL.width}
                    height={MEETING_STILL.height}
                    alt="Meeting Mode running a council meeting: the agenda, the motion, and a live vote with the result worked out"
                    loading="lazy"
                  />
                </figure>
              ) : (
                <MeetingAgenda />
              )}
            </div>
          </div>
        </section>

        <section className="section section--paper" id="remember">
          <div className="wrap">
            <div className="step">
              <div className="step__text">
                <p className="eyebrow">Remember &middot; Stratasphere&trade;</p>
                <h2>Never lose what your council knows.</h2>
                <p className="lede">
                  Ask a question and get an answer grounded in your strata&rsquo;s records, its past decisions, and BC strata law, with references you can check. When the answer isn&rsquo;t in the records, it says so.
                </p>
                <p className="lede">Your records stay free to store, so they stay with the strata, whoever is on council.</p>
                <div className="actions">
                  <a href={DEMO_HREF} className="button button-primary">
                    Explore Stratasphere
                  </a>
                  <span className="pill">Free document storage</span>
                </div>
              </div>
              <div className="records" aria-label="An example question for Stratasphere">
                <div className="ask__window">
                  <div className="ask__chrome" aria-hidden="true">
                    <span className="ask__dot" />
                    <span className="ask__dot" />
                    <span className="ask__dot" />
                    <span className="ask__title">Ask Stratasphere&trade;</span>
                  </div>
                  <div className="ask__body qa">
                    <p className="qa__q">{example.question}</p>
                    <p className="qa__a">{example.answer}</p>
                    <ul className="chips chips--small" aria-label="Sources">
                      {example.sources.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="ask__caption">An example, for a fictional strata.</p>
              </div>
            </div>
          </div>
        </section>

        {SHOW_TESTIMONIAL && (
          <section className="section section--paper">
            <div className="wrap section-head">
              <h2>&ldquo;{testimonial.quote}&rdquo;</h2>
              <p className="small">{testimonial.cite}</p>
            </div>
          </section>
        )}

        <section className="section section--ink" id="managers">
          <div className="wrap split">
            <div>
              <p className="eyebrow">For strata managers</p>
              <h2>Better-prepared councils. Less meeting administration.</h2>
              <p className="lede">
                Councils that know their responsibilities, and meetings that end with organized decisions and draft
                minutes.
              </p>
              <div className="actions">
                <a href={DEMO_HREF} className="button button--light">
                  Request a demo
                </a>
              </div>
            </div>
            <ul className="list-check">
              {managerPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--paper" id="pricing">
          <div className="wrap">
            <div className="section-head section-head--center">
              <p className="eyebrow">Pricing</p>
              <h2>Free for every council. Pay only for the memory.</h2>
              <p className="lede">
                Training, council meetings, and your records cost nothing, for as long as you use them. Stratasphere adds
                answers from your records, general meetings, and built-in video.
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

        <section className="section section--paper" id="demo">
          <div className="wrap photo-split photo-split--flip">
            <figure className="photo photo--wide">
              <img src={PHOTOS.demo.src} alt={PHOTOS.demo.alt} loading="lazy" />
              <figcaption className="photo__credit">
                Photos by <a href="https://www.pexels.com/@theo-decker/">Theo Decker on Pexels</a>.
              </figcaption>
            </figure>
            <div className="photo-split__text">
              <div className="section-head section-head--tight">
                <h2>Take a closer look.</h2>
                <p className="lede">
                  We&rsquo;ll set up a demo strata so you can explore the records, run a meeting, and ask Stratasphere.
                  Or <a href={SIGNUP_URL}>start the free training</a> now.
                </p>
              </div>
              <div className="panel">
                <DemoRequestForm page="home" legal />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
