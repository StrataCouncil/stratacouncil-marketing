import type { Metadata } from "next";
import { DemoRequestForm } from "@/components/DemoRequestForm";
import { MeetingAgenda } from "@/components/MeetingAgenda";
import { Reveal } from "@/components/Reveal";
import { DEMO_HREF, SiteFooter, SiteHeader, SIGNUP_URL } from "@/components/SiteChrome";
import { SplatTour } from "@/components/SplatTour";
import { TrainingPreview } from "@/components/TrainingPreview";

export const metadata: Metadata = { alternates: { canonical: "/" }, openGraph: { url: "/" } };

/** What council is up against: the problem, in the order a new member meets it. */
const problems = [
  {
    title: "Accountable, but untrained",
    body: "Council acts on behalf of the strata corporation. Budgets, maintenance, insurance, bylaws and owner concerns all require sound judgment and an understanding of the Strata Property Act. Most council members have to learn on the job.",
  },
  {
    title: "Records scattered everywhere",
    body: "The bylaws are in a binder. Minutes are buried in email. The depreciation report is on a former council member’s laptop. Finding the right document or confirming an earlier decision can take far longer than it should.",
  },
  {
    title: "Knowledge walks out the door",
    body: "Council membership changes. When experienced members leave, their knowledge and the reasons behind past decisions can leave with them. The new council is left to piece together the history and answer the same questions again.",
  },
  {
    title: "Meetings take too much work",
    body: "Agendas need preparing, motions need to be clear, votes need to be recorded and minutes need to be written. Without a consistent process, meetings drag on and the record can be incomplete or delayed.",
  },
];

/** What StrataCouncil.ca does about it: one line per problem, in the same spirit. */
const solutions = [
  {
    title: "Free training for council members",
    body: "Learn how strata governance works, what council can and cannot decide, and how to approach meetings, finances, maintenance and bylaws. Build your understanding before the next difficult decision, not halfway through it.",
  },
  {
    title: "Meetings with a clear process",
    body: "Prepare the agenda, work through business, record motions and votes, and turn the meeting record into minutes. Stratasphere is designed around the decisions councils need to make and document.",
  },
  {
    title: "One home for your strata’s records",
    body: "Keep bylaws, minutes, contracts, financial statements, insurance documents and reports organized in one place. Give future council members a record they can build on instead of a trail of old emails.",
  },
  {
    title: "Answers grounded in your records",
    body: "Ask a question in plain language. Stratasphere can help find relevant information in your strata’s documents and BC strata law, with sources so you can check the answer and make an informed decision.",
  },
];

/**
 * The page's three photos, chosen by a person: one shoot, by Theo Decker on
 * Pexels (credited in the footer). Kept in public/photos at web sizes.
 */
const PHOTOS = {
  hero: { src: "/photos/hero.jpg", alt: "A group reviewing documents together at a table." },
  solution: { src: "/photos/solution.jpg", alt: "A group talking around a meeting table with laptops." },
  demo: { src: "/photos/demo.jpg", alt: "A group listening to a colleague at a meeting table." },
};

/** The free ways in, before a strata pays anything. The last card is about plans, so it carries no Free tag. */
const free = [
  {
    title: "Council training",
    body: "Short lessons on council responsibilities, budgets and the CRF, meetings and votes, bylaws and fines. Free for every council member, and open to owners considering a future council role.",
    tag: true,
  },
  {
    title: "Your document library",
    body: "Organize your bylaws, minutes, financials, contracts, insurance documents and reports. Your library remains free whether or not your strata subscribes.",
    tag: true,
  },
  {
    title: "Your first meeting",
    body: "Try one full meeting in Stratasphere, from agenda to minutes, with the assistant. No credit card required.",
    tag: true,
  },
  {
    title: "No lock-in",
    body: "Choose a monthly or annual plan if your strata decides to subscribe. Monthly subscriptions can be cancelled at any time. If you stop subscribing, your documents and minutes remain in your free library.",
    tag: false,
  },
];

/** What sets us apart, without naming anyone: the council's decisions, not the building's operations. */
const different = [
  {
    title: "Know the job before the first meeting",
    body: "Free training helps council members understand the Strata Property Act, their bylaws, budgets and meetings. Owners can also learn before deciding whether to stand for council.",
  },
  {
    title: "Follow a consistent meeting process",
    body: "Meeting Mode is designed to help councils work through the agenda, record motions and votes, and create a useful meeting record. The process supports good governance; council remains responsible for following the Act, its bylaws and applicable meeting requirements.",
  },
  {
    title: "Keep the answer and its source together",
    body: "Ask a question in plain language and find relevant information from your strata’s records and BC strata law. Check the source, consider the circumstances and make the decision with the information in front of you.",
  },
  {
    title: "Keep your records as council changes",
    body: "Your strata’s document library is free, regardless of the number of lots. Keep the corporation’s knowledge together instead of relying on individual council members to preserve it.",
  },
];

const managerPoints = [
  "Give new council members a free place to learn their responsibilities.",
  "Prepare agendas using the relevant strata records.",
  "Record motions and votes during the meeting and draft minutes from the meeting record.",
  "Help councils find answers in their own bylaws, minutes and applicable BC strata law.",
  "Keep the strata’s records organized as council membership changes.",
  "Complement your management software, not replace it.",
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "How much does Stratasphere™ cost?",
    a: (
      <>
        <p>
          Council training, your strata&rsquo;s document library, guides and owner roster, and your first meeting in
          Meeting Mode are free.
        </p>
        <p>
          A paid subscription adds Meeting Mode for every meeting and the Stratasphere assistant. The subscription is paid
          by the strata corporation.
        </p>
        <ul>
          <li>
            <strong>Annual plan:</strong> $82.50 per month plus $2.08 per strata lot per month, on a 12-month term.
          </li>
          <li>
            <strong>Monthly plan:</strong> $99 per month plus $2.49 per strata lot per month. Cancel at any time.
          </li>
        </ul>
        <p>
          Prices are in Canadian dollars, plus GST. If you cancel, your records remain in your free document library.
        </p>
      </>
    ),
  },
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
          accounting, owner payments, maintenance requests and bookings.
        </p>
        <p>
          StrataCouncil.ca focuses on the council and its decisions: helping members learn their responsibilities,
          organize records, run meetings and find relevant information when questions arise.
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
          No. Stratasphere helps councils prepare for meetings, maintain records and find relevant information. It can be
          used alongside a strata manager or by a self-managed strata.
        </p>
        <p>
          It does not replace the professional judgment of a strata manager, qualified specialist or lawyer, and it is not
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
                For BC strata councils and strata managers
              </p>
              <h1>
                Run your strata council <em>like a pro.</em>
              </h1>
              <p className="lede">
                Free training so every member knows the role. Meetings run by the book, from agenda to minutes. Every
                record kept with the strata, and answers with the source attached.
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

        <section className="section section--paper" id="problem">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">The problem</p>
              <h2>Council is a serious responsibility. Most people learn it as they go.</h2>
              <p className="lede">
                Council members are volunteers, but the decisions they make have real consequences. They need to
                understand their responsibilities, follow the rules and know what happened before they took office.
              </p>
            </div>
            <div className="cards">
              {problems.map((p) => (
                <article className="card" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="solution">
          <div className="wrap photo-split">
            <figure className="photo photo--wide">
              <img src={PHOTOS.solution.src} alt={PHOTOS.solution.alt} loading="lazy" />
            </figure>
            <div className="photo-split__text">
              <div className="section-head section-head--tight">
                <p className="eyebrow">The solution</p>
                <h2>The knowledge, records and tools your council needs to do the job well.</h2>
              </div>
              <ul className="solutions">
                {solutions.map((x) => (
                  <li key={x.title}>
                    <h3>{x.title}</h3>
                    <p>{x.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section section--paper" id="how-it-works">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">How it works</p>
              <h2>Learn the role. Keep the record. Run the meeting.</h2>
            </div>
            <div className="steps">
              <div className="step">
                <div className="step__text">
                  <span className="step__num">1</span>
                  <h3>Get the training you need to succeed on council</h3>
                  <p className="lede">
                    Council Ready training breaks down the responsibilities and practical decisions that come with
                    serving on a BC strata council. Short lessons cover duties, budgets and the CRF, meetings and voting,
                    bylaws and fines. Learn at your own pace and pick up where you left off.
                  </p>
                  <span className="pill step__free">Free</span>
                </div>
                <TrainingPreview />
              </div>

              <div className="step step--flip">
                <div className="step__text">
                  <span className="step__num">2</span>
                  <h3>Keep every record in one place</h3>
                  <p className="lede">
                    Upload your bylaws, minutes, financial statements, contracts, insurance documents and reports. Keep
                    them organized and available as council changes, so new members can understand previous decisions
                    and find the information they need.
                  </p>
                  <span className="pill step__free">Free, always</span>
                </div>
                <div className="records" aria-label="An example document library">
                  <div className="ask__window">
                    <div className="ask__chrome" aria-hidden="true">
                      <span className="ask__dot" />
                      <span className="ask__dot" />
                      <span className="ask__dot" />
                      <span className="ask__title">Stratasphere&trade; &middot; Documents</span>
                    </div>
                    <div className="ask__body">
                      <ul className="records__list">
                        <li>
                          Bylaws and rules <span>4 documents</span>
                        </li>
                        <li>
                          Minutes <span>38 documents</span>
                        </li>
                        <li>
                          Financials and budgets <span>12 documents</span>
                        </li>
                        <li>
                          Depreciation report <span>2 documents</span>
                        </li>
                        <li>
                          Contracts and service providers <span>9 documents</span>
                        </li>
                        <li>
                          Insurance <span>5 documents</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="ask__caption">Example library using a fictional strata.</p>
                </div>
              </div>

              <div className="step">
                <div className="step__text">
                  <span className="step__num">3</span>
                  <h3>Run the meeting. Ask questions. See the sources.</h3>
                  <p className="lede">
                    Use Stratasphere to prepare for a meeting, work through the agenda, record motions and votes, and
                    draft minutes from the meeting record. Ask questions about your strata and find relevant information
                    in its records and BC strata law.
                  </p>
                  <span className="pill step__free">First meeting free</span>
                </div>
                <MeetingAgenda />
              </div>
            </div>
          </div>
        </section>

        <SplatTour />

        {SHOW_TESTIMONIAL && (
          <section className="section section--paper">
            <div className="wrap section-head">
              <h2>&ldquo;{testimonial.quote}&rdquo;</h2>
              <p className="small">{testimonial.cite}</p>
            </div>
          </section>
        )}

        <section className="section" id="different">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Why StrataCouncil.ca</p>
              <h2>Built for the people who make the decisions.</h2>
              <p className="lede">
                Most strata management software focuses on running the building. StrataCouncil.ca focuses on helping the
                council understand its responsibilities, make informed decisions and preserve the record of why those
                decisions were made.
              </p>
            </div>
            <div className="cards cards--4">
              {different.map((d) => (
                <article className="card" key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--ink" id="managers">
          <div className="wrap split">
            <div>
              <p className="eyebrow">For strata managers</p>
              <h2>Better-prepared councils. Less time spent starting from scratch.</h2>
              <p className="lede">
                You support multiple buildings and work with councils that have different levels of experience. The same
                questions come up, meeting preparation takes time, and minutes still need to be completed after the
                meeting.
              </p>
              <p className="lede">
                StrataCouncil.ca gives council members a place to learn the basics. Stratasphere helps organize each
                strata&rsquo;s records and supports the meeting process, while working alongside your existing
                management software and services.
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

        <section className="section section--paper" id="free">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Start free</p>
              <h2>Get to know StrataCouncil.ca before committing to a subscription.</h2>
              <p className="lede">
                Start with the training and document library at no cost. Try your first meeting in Stratasphere before
                deciding whether the paid features are right for your strata.
              </p>
            </div>
            <div className="cards cards--4">
              {free.map((f) => (
                <article className="card" key={f.title}>
                  {f.tag && <span className="pill card__tag">Free</span>}
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </article>
              ))}
            </div>
            <p className="assurance">
              <span>Data stored in Canada</span>
              <span>Personal information removed before anything reaches Stratasphere&rsquo;s AI</span>
              <span>Two-factor sign-in available</span>
            </p>
            <div className="actions actions--spaced">
              <a href={SIGNUP_URL} className="button button-primary">
                Start free training
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Questions</p>
              <h2>Questions and answers</h2>
            </div>
            <div className="faq" data-testid="faq">
              {faqs.map((f) => (
                <details className="faq__item" key={f.q}>
                  <summary>{f.q}</summary>
                  <div className="faq__answer">{f.a}</div>
                </details>
              ))}
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
                <p className="eyebrow">Learn more</p>
                <h2>Take a closer look before you decide.</h2>
                <p className="lede">
                  See how the training, document library and Stratasphere meeting tools fit together. We&rsquo;ll set up
                  a demo strata so you can explore the records, try a meeting workflow and see how the assistant uses
                  source material to answer questions.
                </p>
                <p className="lede">
                  Prefer to start on your own? You can <a href={SIGNUP_URL}>begin the free training</a> now.
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
      <Reveal />
    </>
  );
}
