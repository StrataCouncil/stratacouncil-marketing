import type { Metadata } from "next";
import { AskStratasphere } from "@/components/AskStratasphere";
import { DemoRequestForm } from "@/components/DemoRequestForm";
import { Reveal } from "@/components/Reveal";
import { DEMO_HREF, SiteFooter, SiteHeader, SIGNUP_URL } from "@/components/SiteChrome";
import { TrainingPreview } from "@/components/TrainingPreview";

export const metadata: Metadata = { alternates: { canonical: "/" }, openGraph: { url: "/" } };

/** What council is up against: the problem, in the order a new member meets it. */
const problems = [
  {
    title: "Accountable, but untrained",
    body: "Council acts for the strata corporation under the Strata Property Act. Budgets, repairs, bylaw fines and insurance are council’s call, and most members learn the rules on the job.",
  },
  {
    title: "Records everywhere",
    body: "Bylaws in a binder, minutes in someone’s inbox, the depreciation report on a former member’s laptop. Finding what was decided before can take an evening, if it can be found at all.",
  },
  {
    title: "Every AGM resets the memory",
    body: "Councils change every year. What the last council knew leaves with it, and the same questions get asked, and argued, again.",
  },
  {
    title: "Meetings that drag, minutes that lag",
    body: "Motions get worded on the fly, votes go unrecorded, and minutes arrive weeks later, when nobody remembers exactly what was decided.",
  },
];

/** What StrataCouncil.ca does about it: one line per problem, in the same spirit. */
const solutions = [
  {
    title: "Free council training",
    body: "Short lessons on the role, the Strata Property Act and your bylaws, so every council member starts knowing what council can and can’t decide.",
  },
  {
    title: "Meeting software built for councils",
    body: "Agendas built from your records, motions and votes recorded as they happen, and minutes drafted from the meeting itself.",
  },
  {
    title: "An indexed document library",
    body: "Every bylaw, set of minutes, contract, financial statement and report in one organized place, staying with the strata when council changes.",
  },
  {
    title: "Answers in plain language",
    body: "Ask a question the way you’d say it and get an answer from your own records and BC law, with the source attached.",
  },
];

/**
 * The page's three photos, chosen by a person: one shoot, by Theo Decker on
 * Pexels (credited in the footer). Kept in public/photos at web sizes.
 */
const PHOTOS = {
  hero: { src: "/photos/hero.jpg", alt: "A group reviewing documents together at a table" },
  solution: { src: "/photos/solution.jpg", alt: "A group talking around a meeting table with laptops" },
  demo: { src: "/photos/demo.jpg", alt: "A group listening to a colleague at a meeting table" },
};

/** The free ways in, before a strata pays anything. */
const free = [
  {
    title: "Council training",
    body: "Short lessons on council’s duties, budgets and the CRF, meetings and votes, bylaws and fines. Free for every council member.",
  },
  {
    title: "Your document library",
    body: "Upload your bylaws, minutes, financials, contracts and insurance. Free for as long as your strata uses it, subscribed or not.",
  },
  {
    title: "Your first meeting",
    body: "Run one full meeting in Stratasphere, from agenda to minutes, with the assistant. No credit card.",
  },
  {
    title: "No lock-in",
    body: "Monthly plans cancel any time. If you stop subscribing, your documents and minutes stay in your library.",
  },
];

const managerPoints = [
  "Point new council members to free training instead of explaining the basics again",
  "Agendas built from each strata’s own records",
  "Motions and votes recorded as the meeting happens, and minutes drafted from them",
  "Answers from each strata’s bylaws, minutes and BC law, with the source attached",
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "How much does Stratasphere™ cost?",
    a: (
      <>
        <p>
          Council training is free. So are your strata&rsquo;s document library, guides and owner roster, and your
          first meeting in Meeting Mode. A subscription, paid by the strata corporation, adds Meeting Mode for every
          meeting and the Stratasphere assistant:
        </p>
        <ul>
          <li>
            <strong>Annual:</strong> $82.50 a month plus $2.08 per strata lot a month, for a 12-month term.
          </li>
          <li>
            <strong>Monthly:</strong> $99 a month plus $2.49 per strata lot a month. Cancel any time.
          </li>
        </ul>
        <p>
          Prices are in Canadian dollars, plus GST. If you cancel, your records stay in your free document library.
        </p>
      </>
    ),
  },
  {
    q: "Is Stratasphere secure?",
    a: (
      <>
        <p>Yes. Your strata&rsquo;s records are protected by:</p>
        <ul>
          <li>
            <strong>Data stored in Canada:</strong> your strata&rsquo;s records and files stay in Canada.
          </li>
          <li>
            <strong>Bank-grade encryption:</strong> in transit and at rest.
          </li>
          <li>
            <strong>Row-level security:</strong> only the people your strata connects can see its records, limited by
            their role.
          </li>
          <li>
            <strong>Two-factor sign-in:</strong> available on every account.
          </li>
          <li>
            <strong>Certified hosting:</strong> our hosting provider is SOC 2 and ISO 27001 compliant.
          </li>
          <li>
            <strong>Privacy before AI:</strong> names and personal details are removed before anything reaches
            Stratasphere&rsquo;s AI, and what&rsquo;s sent isn&rsquo;t used to train AI models.
          </li>
        </ul>
        <p>
          StrataCouncil.ca complies with BC&rsquo;s Personal Information Protection Act (PIPA); our{" "}
          <a href="/privacy">Privacy Policy</a> has the details.
        </p>
      </>
    ),
  },
  {
    q: "Does this replace the strata manager?",
    a: (
      <p>
        No. Stratasphere helps council run meetings, keep good records and understand the rules. It works alongside a
        strata manager or for a self-managed strata, and it isn&rsquo;t legal advice.
      </p>
    ),
  },
  {
    q: "Do I need to be on council to take the training?",
    a: (
      <p>
        No. Anyone can sign up for free. Owners thinking about putting their name forward use it to understand the role
        before the AGM.
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
                You were elected to council. Nobody handed you <em>the manual.</em>
              </h1>
              <p className="lede">
                Council decides how owners&rsquo; money is spent and how their building is run, usually with no
                training, records scattered across inboxes and binders, and a new council every year. StrataCouncil.ca
                teaches you the role, keeps every record in one place, and helps you run meetings by the rules.
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
              <h2>Council is a real job, done by volunteers</h2>
              <p className="lede">
                The decisions are binding, the money is other people&rsquo;s, and the rules are in an Act most owners
                have never read.
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
                <h2>Everything council needs, in one place</h2>
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
                  <h3>Learn what council can and can&rsquo;t do</h3>
                  <p className="lede">
                    Council Ready training covers the role in 10 to 20 minute lessons, one screen at a time: duties,
                    budgets and the CRF, meetings and votes, bylaws and fines. Your progress saves as you go.
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
                    Upload your bylaws, minutes, financials, contracts and insurance once, and they stay with the strata
                    when council changes. New members see what was decided before, instead of starting over.
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
                  <p className="ask__caption">An example, with a fictional strata.</p>
                </div>
              </div>

              <div className="step">
                <div className="step__text">
                  <span className="step__num">3</span>
                  <h3>Run the meeting, and get answers with sources</h3>
                  <p className="lede">
                    Stratasphere&trade; builds the agenda from your records, records motions and votes as the meeting
                    happens, and drafts the minutes from them. Ask a question and get an answer from your bylaws,
                    minutes and BC law, with the source attached.
                  </p>
                  <span className="pill step__free">First meeting free</span>
                </div>
                <AskStratasphere />
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
              <h2>Councils that arrive prepared</h2>
              <p className="lede">
                You manage many buildings, and every council asks the same questions, needs an agenda and waits on the
                minutes. Councils that have taken the training arrive knowing what they can and can&rsquo;t decide.
                Stratasphere builds each agenda from that strata&rsquo;s records and drafts the minutes from the
                meeting, so less of the paperwork lands on you.
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
              <h2>See if it works for your strata before it costs anything</h2>
              <p className="lede">
                A strata pays only when council wants Meeting Mode for every meeting and the Stratasphere assistant.
                Prices are in the <a href="#faq">questions below</a>.
              </p>
            </div>
            <div className="cards cards--4">
              {free.map((f) => (
                <article className="card" key={f.title}>
                  <span className="pill card__tag">Free</span>
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
                <h2>Get a closer look before you decide</h2>
                <p className="lede">
                  We&rsquo;ll set up a demo strata for you to try: the training, the documents, a meeting from agenda to
                  minutes, and the assistant. Or <a href={SIGNUP_URL}>start the free training</a> now.
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
