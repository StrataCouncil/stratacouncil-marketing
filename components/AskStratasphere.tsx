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

type Kind = "bylaw" | "decision" | "law" | "precedent";

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
    tab: "EV chargers",
    question: "Has council approved EV charger installations before?",
    sources: [
      {
        kind: "decision",
        label: "Council decision · March 2024",
        text: "Motion carried 4–1: commission an engineering study of EV charging for parkade level P1.",
        meta: "Council meeting minutes, March 14, 2024",
      },
      {
        kind: "bylaw",
        label: "Bylaw 7.2",
        text: "Alterations to common property, including electrical work, need council’s written approval and an alteration agreement.",
        meta: "Larchwood Commons registered bylaws",
      },
      {
        kind: "law",
        label: "Strata Property Act, s. 71",
        text: "A significant change in the use or appearance of common property needs a 3/4 vote at a general meeting.",
        meta: "BC legislation",
      },
      {
        kind: "precedent",
        label: "Precedent · a similar strata",
        text: "Approved individual chargers, with each owner paying for installation and electricity under an alteration agreement.",
        meta: "Anonymized, from another strata corporation",
      },
    ],
    answer:
      "Not for individual chargers yet. In March 2024 council approved an engineering study for P1. An owner’s charger needs council’s written approval under Bylaw 7.2 and an alteration agreement; a building-wide system may need a 3/4 vote under s. 71.",
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
      {
        kind: "precedent",
        label: "Precedent · tribunal decisions",
        text: "Fines have been cancelled where the strata skipped the section 135 steps.",
        meta: "Civil Resolution Tribunal",
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
      {
        kind: "precedent",
        label: "Precedent · a similar strata",
        text: "Required an acoustic test after installation when a neighbour reported noise.",
        meta: "Anonymized, from another strata corporation",
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
  precedent: "Precedent",
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
