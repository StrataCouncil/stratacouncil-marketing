import Link from "next/link";
import { Logo } from "@/components/Logo";
import { AppMockup } from "@/components/AppMockup";

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
    title: "Short lessons",
    body: "Learn one topic at a time without having to work through an entire course.",
  },
  {
    title: "Real-world examples",
    body: "See how the principles apply to situations councils actually encounter.",
  },
  {
    title: "Case studies",
    body: "Work through realistic council scenarios and consider the issues before deciding how you would approach them.",
  },
  {
    title: "Different ways to learn",
    body: "Combine written material, video, examples and diagrams to make complex topics easier to understand.",
  },
];

const strataSphereItems = [
  "Council documents",
  "Bylaws and rules",
  "Agendas and minutes",
  "Motions and decisions",
  "Contracts and warranties",
  "Insurance information",
  "Policies and procedures",
  "Important correspondence",
  "Corporate history and institutional knowledge",
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

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="wrap site-header__inner">
          <Link href="/" className="wordmark" data-testid="header-logo-link">
            <Logo className="wordmark__mark" />
            <span>StrataCouncil.ca</span>
          </Link>
          <nav aria-label="Primary" className="site-nav">
            <Link href="#built-for">What you&rsquo;ll learn</Link>
            <Link href="#who-its-for">Who it&rsquo;s for</Link>
            <Link
              href="/join"
              className="button button-primary"
              data-testid="nav-cta"
            >
              Start Learning
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap hero__inner">
            <span className="pill" data-testid="hero-eyebrow">
              Practical education for BC strata council members
            </span>
            <h1>
              Know your role. Understand the issues. Govern with
              confidence.
            </h1>
            <p className="hero__lede">
              Strata council is a volunteer role, but the responsibilities
              are real. Whether you&rsquo;ve just joined council, are
              considering putting your name forward, or have been serving
              for years, StrataCouncil.ca helps you understand how strata
              governance works in British Columbia and apply that
              knowledge to the decisions councils make every day.
            </p>
            <div className="hero__actions">
              <Link
                href="/join"
                className="button button-primary"
                data-testid="hero-primary-cta"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </section>

        <section id="built-for" className="section">
          <div className="wrap section-split">
            <div>
              <h2>Built for people who serve on strata council</h2>
              <p className="section-lede">
                You don&rsquo;t need to be a strata manager, lawyer,
                accountant or building expert to serve on council. You do
                need to understand your responsibilities, know what
                council can and cannot decide, and be able to participate
                meaningfully in the decisions that affect your strata.
              </p>
              <p className="section-lede">
                StrataCouncil.ca focuses on the practical knowledge
                council members need, including:
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
              Whether you&rsquo;re new to council or have been serving for
              years, there&rsquo;s always something new to figure out.
              Budgets, contracts, owner concerns, repairs, legislation and
              major decisions all bring their own questions.
            </p>
            <p className="section-lede">
              StrataCouncil.ca gives you practical guidance when you need
              it. Learn the fundamentals, build your knowledge and come
              back whenever a new issue comes up.
            </p>
            <p className="section-lede">
              You don&rsquo;t have to wait until you&rsquo;re elected to
              start learning. Understanding the role beforehand can help
              you decide whether council is right for you.
            </p>
            <div className="hero__actions">
              <Link
                href="/join"
                className="button button-primary"
                data-testid="explore-training-cta"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        <section className="section section--trust">
          <div className="wrap pull-quote pull-quote--on-dark">
            <blockquote>
              &ldquo;[Quote to come &mdash; a real council member, once we
              have one.]&rdquo;
            </blockquote>
            <cite>[Name], [Role], [Strata corporation]</cite>
          </div>
        </section>

        <section className="section section--alt">
          <div className="wrap">
            <h2>Learn what you need, when you need it</h2>
            <p className="section-lede">
              StrataCouncil.ca isn&rsquo;t one long course you complete
              and forget. Training is organized into practical topics so
              you can focus on what matters to you, pause when you need
              to, and come back whenever a new issue arises.
            </p>
            <div className="grid-3">
              {formats.map((f) => (
                <article className="card" key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </article>
              ))}
            </div>
            <AppMockup label="Training platform" variant="training" />
          </div>
        </section>

        <section className="section section--trust">
          <div className="wrap">
            <h2>A resource you can keep coming back to</h2>
            <p className="section-lede">
              Council education shouldn&rsquo;t end after your first few
              meetings. The role changes over time, and so does the
              environment in which councils operate &mdash; legislation
              and regulations change, buildings age, new issues emerge.
              What you need to know in your first year may be very
              different from what you need to know five years later.
            </p>
            <p className="section-lede">
              StrataCouncil.ca is designed to grow with the role: a
              practical reference you can return to throughout your time
              on council, not something you complete once and put away.
            </p>
          </div>
        </section>

        <section className="section section--alt">
          <div className="wrap narrative">
            <h2>From learning to better governance</h2>
            <p className="section-lede">
              Knowing how strata governance works is the first step. The
              next is putting that knowledge to work. StrataCouncil.ca
              includes StrataSphere&trade;, a governance platform designed
              specifically for strata councils. It helps councils
              organize the information they need to manage their
              governance responsibilities, including:
            </p>
            <ul className="list-check">
              {strataSphereItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <AppMockup label="StrataSphere" variant="stratasphere" />
            <p className="section-lede">
              The idea is simple: learn how to govern. Have the tools to
              help you do it.
            </p>
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

        <section className="section section--trust section--trust--center">
          <div className="wrap">
            <h2>
              Good governance starts with people who understand the role
              they&rsquo;ve taken on.
            </h2>
            <p className="section-lede">
              Practical education for BC strata councils.
            </p>
            <div className="hero__actions">
              <Link
                href="/join"
                className="button button-primary"
                data-testid="closing-cta"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap site-footer__inner">
          <span className="wordmark wordmark--small">
            <Logo className="wordmark__mark" />
            <span>StrataCouncil.ca</span>
          </span>
          <ul className="site-footer__links">
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms &amp; Conditions</Link>
            </li>
          </ul>
          <p>&copy; {new Date().getFullYear()} StrataCouncil.ca</p>
        </div>
      </footer>
    </>
  );
}
