"use client";

import { useState } from "react";

/**
 * Pricing (2026-11-12): three plans and a comparison table, after the app's
 * lib/stripe/prices.ts and docs/learn-decide-remember.md §4.
 *
 * Free: Learn, council and committee meetings, and record storage; nothing
 * on it costs us per use. Stratasphere: everything that does (the
 * assistant, search, AI drafting, built-in video), and AGMs and SGMs
 * once they're built (the app says "coming soon"; so does this page).
 * Enterprise: management companies (or a strata past Stripe's $3,000 a
 * payment), at an agreed price. Any size of strata can subscribe itself.
 *
 * Every row in the table must match a gate in the app. If the app changes
 * what's free, change it here too.
 */

type Interval = "monthly" | "yearly";

const RATES: Record<Interval, { base: number; perLot: number }> = {
  monthly: { base: 30, perLot: 3 },
  yearly: { base: 25, perLot: 2.5 },
};

/** The typical strata, for the worked example under the price. */
const EXAMPLE_LOTS = 45;

const money = (n: number) =>
  n.toLocaleString("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: Number.isInteger(n) ? 0 : 2 });

type Mark = boolean | string;
type Row = { label: string; free: Mark; paid: Mark; enterprise: Mark };

const TABLE: { group: string; rows: Row[] }[] = [
  {
    group: "Learn",
    rows: [
      { label: "Council Training", free: true, paid: true, enterprise: true },
      { label: "The Library: playbooks, guides, templates, and forms", free: true, paid: true, enterprise: true },
    ],
  },
  {
    group: "Decide",
    rows: [
      { label: "Council and committee meetings in Meeting Mode", free: true, paid: true, enterprise: true },
      { label: "Quorum and voting thresholds worked out as people arrive and leave", free: true, paid: true, enterprise: true },
      { label: "Votes from members’ own screens, every result recorded", free: true, paid: true, enterprise: true },
      { label: "Conflicts of interest declared and recorded", free: true, paid: true, enterprise: true },
      { label: "Draft minutes when you adjourn", free: true, paid: true, enterprise: true },
      { label: "Discussions and votes between meetings", free: true, paid: true, enterprise: true },
      { label: "Built-in video for meetings", free: false, paid: true, enterprise: true },
      { label: "AGMs and SGMs in Meeting Mode", free: false, paid: "Coming soon", enterprise: "Coming soon" },
    ],
  },
  {
    group: "Remember",
    rows: [
      { label: "Storage for every record, kept for good", free: true, paid: true, enterprise: true },
      { label: "Your strata plan read for you at sign-up", free: true, paid: true, enterprise: true },
      { label: "Search across every document", free: false, paid: true, enterprise: true },
      { label: "The Stratasphere™ assistant, as often as council needs it", free: false, paid: true, enterprise: true },
      { label: "Answers from your records and BC strata law, with sources", free: false, paid: true, enterprise: true },
      { label: "Past minutes read for you, with their decisions pulled out", free: false, paid: true, enterprise: true },
      { label: "Motions drafted and uploaded agendas read for you", free: false, paid: true, enterprise: true },
    ],
  },
  {
    group: "Security",
    rows: [
      { label: "Data stored in Canada", free: true, paid: true, enterprise: true },
      { label: "Personal information removed before anything reaches the AI", free: true, paid: true, enterprise: true },
      { label: "Two-factor sign-in", free: true, paid: true, enterprise: true },
    ],
  },
  {
    group: "Management companies",
    rows: [
      { label: "Several stratas under one agreed price", free: false, paid: false, enterprise: true },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Email support", free: true, paid: true, enterprise: true },
      { label: "Help getting set up", free: false, paid: false, enterprise: true },
    ],
  },
];

function Cell({ mark }: { mark: Mark }) {
  if (typeof mark === "string") return <span className="compare__text">{mark}</span>;
  return mark ? (
    <span className="compare__yes" aria-label="Included">
      &#10003;
    </span>
  ) : (
    <span className="compare__no" aria-label="Not included">
      &ndash;
    </span>
  );
}

export function Pricing({ signupUrl, contactHref }: { signupUrl: string; contactHref: string }) {
  const [interval, setInterval] = useState<Interval>("monthly");
  const r = RATES[interval];
  const example = r.base + r.perLot * EXAMPLE_LOTS;

  return (
    <>
      <div className="pricing__switch" role="radiogroup" aria-label="Billing">
        {(["monthly", "yearly"] as const).map((i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={interval === i}
            className={interval === i ? "is-on" : undefined}
            onClick={() => setInterval(i)}
            data-testid={`pricing-${i}`}
          >
            {i === "monthly" ? "Monthly" : "Yearly"}
            {i === "yearly" && <span className="pricing__save">2 months free</span>}
          </button>
        ))}
      </div>

      <div className="plans3" data-testid="plans">
        <article className="plan plan--free">
          <div className="plan__head">
            <h3>Free, for good</h3>
            <span className="pill">Every council</span>
          </div>
          <p className="plan__for">For any strata, any size</p>
          <p className="plan__price">
            <span className="plan__amount">$0</span>
            <span className="plan__unit">per month</span>
          </p>
          <p className="plan__note">No card. Nothing to cancel.</p>
          <a href={signupUrl} className="button button-primary plan__cta" data-testid="plan-free-cta">
            Start free
          </a>
          <ul className="plan__list">
            <li>Council Training and the Library</li>
            <li>Council and committee meetings in Meeting Mode</li>
            <li>Quorum, thresholds, and votes worked out and recorded</li>
            <li>Draft minutes when you adjourn</li>
            <li>Discussions and votes between meetings</li>
            <li>Storage for every record, kept for good</li>
            <li className="plan__off">No AI features</li>
            <li className="plan__off">No AGMs or SGMs</li>
          </ul>
        </article>

        <article className="plan plan--paid">
          <div className="plan__head">
            <h3>Stratasphere&trade;</h3>
            <span className="pill pill--accent">The memory</span>
          </div>
          <p className="plan__for">For councils that want answers from their records</p>
          <p className="plan__price">
            <span className="plan__amount" data-testid="plan-paid-base">
              {money(r.base)}
            </span>
            <span className="plan__unit">per strata / month</span>
          </p>
          <p className="plan__note" data-testid="plan-paid-note">
            plus {money(r.perLot)} per lot a month. A {EXAMPLE_LOTS}-lot strata pays {money(example)}.
            {interval === "yearly" ? " 12-month commitment, billed monthly." : " Cancel any time."}
          </p>
          <a href={signupUrl} className="button button-secondary plan__cta" data-testid="plan-paid-cta">
            Start with Stratasphere
          </a>
          <ul className="plan__list">
            <li>
              <strong>Everything in Free, plus:</strong>
            </li>
            <li>
              <strong>Ask anything</strong> about your strata, as often as council needs
            </li>
            <li>Answers from your records and BC strata law, with sources</li>
            <li>Search across every document</li>
            <li>
              <strong>AGMs and SGMs</strong> in Meeting Mode, coming soon
            </li>
            <li>Built-in video for meetings</li>
            <li>Motions drafted, agendas and past minutes read for you</li>
          </ul>
        </article>

        <article className="plan plan--enterprise">
          <div className="plan__head">
            <h3>Enterprise</h3>
          </div>
          <p className="plan__for">For management companies running several stratas</p>
          <p className="plan__price">
            <span className="plan__amount">Custom</span>
          </p>
          <p className="plan__note">An agreed monthly price, before GST.</p>
          <a href={contactHref} className="button button-secondary plan__cta" data-testid="plan-enterprise-cta">
            Talk to us
          </a>
          <ul className="plan__list">
            <li>
              <strong>Everything in Stratasphere, plus:</strong>
            </li>
            <li>Several stratas under one agreed price</li>
            <li>Help getting set up</li>
          </ul>
        </article>
      </div>

      <p className="pricing__fine">
        Prices in Canadian dollars, plus GST. A lot is a strata lot. Paid by the strata corporation. If you stop
        subscribing, your records stay free to store.
      </p>

      <div className="compare" data-testid="compare">
        <h3 className="compare__title">Compare plans</h3>
        <div className="compare__wrap">
          <table className="compare__table">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Free</th>
                <th scope="col">Stratasphere</th>
                <th scope="col">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map((g) => (
                <Group key={g.group} group={g.group} rows={g.rows} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Group({ group, rows }: { group: string; rows: Row[] }) {
  return (
    <>
      <tr className="compare__group">
        <th scope="colgroup" colSpan={4}>
          {group}
        </th>
      </tr>
      {rows.map((row) => (
        <tr key={row.label}>
          <th scope="row">{row.label}</th>
          <td>
            <Cell mark={row.free} />
          </td>
          <td>
            <Cell mark={row.paid} />
          </td>
          <td>
            <Cell mark={row.enterprise} />
          </td>
        </tr>
      ))}
    </>
  );
}
