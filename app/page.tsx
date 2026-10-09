import { AskStratasphere } from "@/components/AskStratasphere";
import { SiteFooter, SiteHeader, SIGNUP_URL } from "@/components/SiteChrome";
import { TrainingPreview } from "@/components/TrainingPreview";

const topics = [
  "Council responsibilities and operations",
  "Strata finances and the CRF",
  "Meetings, motions and voting",
  "Bylaws, rules and legislation",
  "Building maintenance and repairs",
  "Insurance and risk",
  "Contracts and service providers",
  "Working with your strata manager",
  "Owner concerns and difficult situations",
  "Long-term planning and major decisions",
];

const formats = [
  {
    title: "Short modules",
    body: "Each module takes 10 to 20 minutes, one screen at a time. Your progress saves as you go, so you can stop whenever you need to.",
  },
  {
    title: "Real-world examples",
    body: "See how the principles apply to situations councils actually encounter, grounded in BC strata legislation.",
  },
  {
    title: "Learn by doing",
    body: "Narrated screens, flip cards and quick knowledge checks help the important ideas stick.",
  },
];

const strataSphereItems = [
  "A document library for bylaws, minutes, contracts and insurance",
  "Agendas built from your strata’s own records",
  "Meeting Mode: run the meeting and record motions and votes as they happen",
  "Minutes drafted from what happened in the meeting",
  "A decision ledger of every motion council has passed",
  "Answers from your bylaws, minutes and BC legislation, with sources",
];

const audiences = [
  {
    title: "Current council members",
    body: "Build your knowledge, refresh the fundamentals and find practical guidance when something new comes up.",
  },
  {
    title: "Prospective council members",
    body: "Understand the role before you put your name forward and know what you’re taking on.",
  },
  {
    title: "Owners",
    body: "Learn how your strata is governed, what council is responsible for and how decisions are made.",
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

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "How much does Stratasphere™ cost?",
    a: (
      <>
        <p>
          Council Training is free. So are your strata&rsquo;s document library, guides and owner
          roster, and your first meeting in Meeting Mode. A subscription, paid by the strata
          corporation, adds Meeting Mode for every meeting and the Stratasphere assistant:
        </p>
        <ul>
          <li>
            <strong>Annual:</strong> $82.50 a month plus $2.08 per strata lot a month, for a 12-month
            term.
          </li>
          <li>
            <strong>Monthly:</strong> $99 a month plus $2.49 per strata lot a month. Cancel any time.
          </li>
        </ul>
        <p>
          Prices are in Canadian dollars, plus GST. If you cancel, your records stay in your free
          document library.
        </p>
      </>
    ),
  },
  {
    q: "Is Stratasphere secure?",
    a: (
      <p>
        Yes. Your strata&rsquo;s records are stored in Canada and encrypted in transit and at rest.
        Only the people your strata connects can see them, limited by their role. Stratasphere runs
        on infrastructure that holds SOC 2 Type 2 and ISO 27001 certification.
      </p>
    ),
  },
  {
    q: "Is our data used to train AI?",
    a: (
      <p>
        No. Before anything goes to our AI provider, names and personal details are removed, and
        what&rsquo;s sent isn&rsquo;t used to train their models. StrataCouncil.ca complies with
        BC&rsquo;s PIPA and Canada&rsquo;s PIPEDA; our <a href="/privacy">Privacy Policy</a> has the
        details.
      </p>
    ),
  },
  {
    q: "Does this replace the strata manager?",
    a: (
      <p>
        No. Stratasphere helps council run meetings, keep good records and understand the rules. It
        works alongside a strata manager or for a self-managed strata, and it isn&rsquo;t legal
        advice.
      </p>
    ),
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero">
          <div className="wrap hero__inner">
            <span className="pill" data-testid="hero-eyebrow">
              Practical education for BC strata council members
            </span>
            <h1>Know your role. Understand the issues. Govern with confidence.</h1>
            <p className="hero__lede">
              Strata council is a volunteer role, but the responsibilities are real. Whether
              you&rsquo;ve just joined council, are considering putting your name forward, or have
              been serving for years, StrataCouncil.ca helps you understand how strata governance
              works in British Columbia and apply that knowledge to the decisions councils make
              every day.
            </p>
            <div className="hero__actions">
              <a href={SIGNUP_URL} className="button button-primary" data-testid="hero-primary-cta">
                Start Learning
              </a>
            </div>
          </div>
        </section>

        <section id="built-for" className="section">
          <div className="wrap section-split">
            <div>
              <h2>Built for people who serve on strata council</h2>
              <p className="section-lede">
                You don&rsquo;t need to be a strata manager, lawyer, accountant or building expert to
                serve on council. You do need to understand your responsibilities, know what council
                can and cannot decide, and be able to participate meaningfully in the decisions that
                affect your strata.
              </p>
              <p className="section-lede">
                StrataCouncil.ca focuses on the practical knowledge council members need, including:
              </p>
              <ul className="list-check">
                {topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
            <div className="section-split__media">
              <img
                src="https://images.pexels.com/photos/7433833/pexels-photo-7433833.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Strata council members reviewing documents together"
              />
            </div>
          </div>
        </section>

        <section className="section section--alt">
          <div className="wrap narrative">
            <h2>Wherever you are in your council journey</h2>
            <p className="section-lede">
              Whether you&rsquo;re new to council or have been serving for years, there&rsquo;s always
              something new to figure out. Budgets, contracts, owner concerns, repairs, legislation
              and major decisions all bring their own questions.
            </p>
            <p className="section-lede">
              StrataCouncil.ca gives you practical guidance when you need it. Learn the fundamentals,
              build your knowledge and come back whenever a new issue comes up.
            </p>
            <p className="section-lede">
              You don&rsquo;t have to wait until you&rsquo;re elected to start learning.
              Understanding the role beforehand can help you decide whether council is right for you.
            </p>
            <div className="hero__actions">
              <a href={SIGNUP_URL} className="button button-primary" data-testid="explore-training-cta">
                Get Started
              </a>
            </div>
          </div>
        </section>

        {SHOW_TESTIMONIAL && (
          <section className="section section--trust">
            <div className="wrap pull-quote pull-quote--on-dark">
              <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <cite>{testimonial.cite}</cite>
            </div>
          </section>
        )}

        <section className="section section--alt">
          <div className="wrap sphere-split sphere-split--flip">
            <TrainingPreview />
            <div>
              <h2>Learn what you need, when you need it</h2>
              <p className="section-lede">
                StrataCouncil.ca isn&rsquo;t one long course you complete and forget. Training is
                organized into practical topics so you can focus on what matters to you, pause when
                you need to, and come back whenever a new issue arises.
              </p>
              <ul className="formats">
                {formats.map((f) => (
                  <li key={f.title}>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section section--trust">
          <div className="wrap">
            <h2>A resource you can keep coming back to</h2>
            <p className="section-lede">
              Council education shouldn&rsquo;t end after your first few meetings. The role changes
              over time, and so does the environment in which councils operate: legislation and
              regulations change, buildings age, new issues emerge. What you need to know in your
              first year may be very different from what you need to know five years later.
            </p>
            <p className="section-lede">
              StrataCouncil.ca is designed to grow with the role: a practical reference you can return
              to throughout your time on council, not something you complete once and put away.
            </p>
          </div>
        </section>

        <section id="stratasphere" className="section section--alt">
          <div className="wrap sphere-split">
            <div className="narrative">
              <h2>From learning to better governance</h2>
              <p className="section-lede">
                Knowing how strata governance works is the first step. The next is putting that
                knowledge to work. StrataCouncil.ca includes Stratasphere&trade;, a governance
                platform built for BC strata councils:
              </p>
              <ul className="list-check list-check--single">
                {strataSphereItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="section-lede">
                The idea is simple: learn how to govern, and have the tools to help you do it.
              </p>
            </div>
            <AskStratasphere />
          </div>
        </section>

        <section id="who-its-for" className="section">
          <div className="wrap">
            <h2>For people who care about how their strata is run</h2>
            <div className="grid-3">
              {audiences.map((a) => (
                <article className="card" key={a.title}>
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section section--alt">
          <div className="wrap">
            <h2>Questions and answers</h2>
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

        <section className="section section--trust section--trust--center">
          <div className="wrap">
            <h2>Good governance starts with people who understand the role they&rsquo;ve taken on.</h2>
            <p className="section-lede">Practical education for BC strata councils.</p>
            <div className="hero__actions">
              <a href={SIGNUP_URL} className="button button-primary" data-testid="closing-cta">
                Start Learning
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
