"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Stratasphere section's illustration: a question typed into
 * Stratasphere, the sources it finds appearing one by one, then the
 * answer. Three examples from a fictional strata (Larchwood Commons, the
 * demo strata), cycling on their own once the window scrolls into view;
 * picking a tab plays that one. With reduced motion, each example shows
 * complete and nothing cycles.
 *
 * Owners appear by strata lot number only, as they do in Stratasphere.
 */

type Kind = "bylaw" | "decision" | "law";

interface Source {
  kind: Kind;
  label: string;
  text: string;
  meta: string;
}

interface Example {
  tab: string;
  question: string;
  sources: Source[];
  answer: string;
}

const EXAMPLES: Example[] = [
  {
    tab: "Records request",
    question: "An owner wants copies of last year’s council minutes. What do we have to do?",
    sources: [
      {
        kind: "law",
        label: "Strata Property Act, s. 36",
        text: "Copies must be provided within 2 weeks of the request; for the bylaws or rules, within 1 week.",
        meta: "BC legislation",
      },
      {
        kind: "law",
        label: "Strata Property Regulation, s. 4.2",
        text: "The strata may charge up to 25 cents a page for copies.",
        meta: "BC legislation",
      },
      {
        kind: "decision",
        label: "Council decision · January 2025",
        text: "Records requested by owners are sent by email as PDFs, at no charge.",
        meta: "Council meeting minutes, January 15, 2025",
      },
    ],
    answer:
      "Send the copies within two weeks of the request. The Regulation allows up to 25 cents a page, but in January 2025 council decided to email records as PDFs at no charge, so send them that way.",
  },
  {
    tab: "Bylaw fines",
    question: "What do we have to do before fining an owner?",
    sources: [
      {
        kind: "law",
        label: "Strata Property Act, s. 135",
        text: "Before a fine, the owner must get the particulars of the complaint in writing and a reasonable chance to answer it, including a hearing if they ask.",
        meta: "BC legislation",
      },
      {
        kind: "bylaw",
        label: "Bylaw 23.1",
        text: "Fines of up to $200 for each contravention of a bylaw.",
        meta: "Larchwood Commons registered bylaws",
      },
      {
        kind: "decision",
        label: "Council decision · June 2025",
        text: "Warning letter to SL14 about repeated parking in visitor stalls.",
        meta: "Council meeting minutes, June 11, 2025",
      },
    ],
    answer:
      "Give the owner the complaint in writing, a reasonable chance to respond and a hearing if they ask. Only then decide on a fine: up to $200 per contravention under Bylaw 23.1. SL14 has already had a warning letter.",
  },
  {
    tab: "Renovations",
    question: "Does an owner need approval to replace their flooring?",
    sources: [
      {
        kind: "bylaw",
        label: "Bylaw 5.4",
        text: "Hard flooring needs council’s written approval and an approved acoustic underlay.",
        meta: "Larchwood Commons registered bylaws",
      },
      {
        kind: "decision",
        label: "Council decision · November 2025",
        text: "Approved SL21’s laminate flooring, with the approved underlay and a signed alteration agreement.",
        meta: "Council meeting minutes, November 5, 2025",
      },
    ],
    answer:
      "Yes, for hard flooring. Bylaw 5.4 requires council’s written approval and an approved acoustic underlay. Council approved SL21’s laminate on those terms in November 2025.",
  },
];

const KIND_NAMES: Record<Kind, string> = {
  bylaw: "Bylaw",
  decision: "Council decision",
  law: "Legislation",
};

const TYPE_MS = 32;
const SEARCH_MS = 900;
const SOURCE_MS = 520;
const HOLD_MS = 6500;

export function AskStratasphere() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [searching, setSearching] = useState(false);
  const [started, setStarted] = useState(false);
  const [auto, setAuto] = useState(true);
  // Bumped by a tab click, so picking the current example plays it again.
  const [run, setRun] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const example = EXAMPLES[index];

  // Start when the window scrolls into view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setStarted(true);
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setStarted(true);
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Play the current example.
  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTyped(example.question.length);
      setShown(example.sources.length);
      setSearching(false);
      setAnswered(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    setTyped(0);
    setShown(0);
    setAnswered(false);
    setSearching(false);
    let t = 250;
    for (let i = 1; i <= example.question.length; i++) {
      at(t, () => setTyped(i));
      t += TYPE_MS;
    }
    at(t, () => setSearching(true));
    t += SEARCH_MS;
    for (let i = 1; i <= example.sources.length; i++) {
      at(t, () => setShown(i));
      t += SOURCE_MS;
    }
    at(t, () => {
      setSearching(false);
      setAnswered(true);
    });
    if (auto) at(t + HOLD_MS, () => setIndex((n) => (n + 1) % EXAMPLES.length));
    return () => timers.forEach(clearTimeout);
  }, [started, index, auto, run, example]);

  return (
    <div className="ask" ref={root} data-testid="ask-stratasphere">
      <div className="ask__window">
        <div className="ask__chrome" aria-hidden="true">
          <span className="ask__dot" />
          <span className="ask__dot" />
          <span className="ask__dot" />
          <span className="ask__title">Stratasphere&trade; &middot; Ask anything</span>
        </div>
        <div className="ask__body">
          <div className="ask__tabs" role="tablist" aria-label="Example questions">
            {EXAMPLES.map((e, i) => (
              <button
                key={e.tab}
                type="button"
                role="tab"
                aria-selected={i === index}
                className="ask__tab"
                onClick={() => {
                  setAuto(false);
                  setIndex(i);
                  setRun((r) => r + 1);
                }}
              >
                {e.tab}
              </button>
            ))}
          </div>

            <div role="tabpanel" aria-label={example.tab}>
              <div className="ask__question">
                <svg className="ask__search" viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12.6 12.6 17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span>
                  {example.question.slice(0, typed)}
                  {typed < example.question.length && <span className="ask__caret" aria-hidden="true" />}
                </span>
              </div>

              <p className="ask__status" aria-hidden={!searching}>
                {searching && (
                  <>
                    <span className="ask__pulse" />
                    <span className="ask__pulse" />
                    <span className="ask__pulse" />
                    Searching your records and BC legislation&hellip;
                  </>
                )}
              </p>

              <ol className="ask__sources">
                {example.sources.slice(0, shown).map((s) => (
                  <li key={s.label} className="ask__source" data-kind={s.kind}>
                    <span className="ask__label">
                      <span className="visually-hidden">{KIND_NAMES[s.kind]}: </span>
                      {s.label}
                    </span>
                    <p>{s.text}</p>
                    <span className="ask__meta">{s.meta}</span>
                  </li>
                ))}
              </ol>

              {answered && (
                <div className="ask__answer">
                  <span className="ask__label">Answer</span>
                  <p>{example.answer}</p>
                </div>
              )}
            </div>
        </div>
      </div>
      <p className="ask__caption">An example, with a fictional strata.</p>
    </div>
  );
}
