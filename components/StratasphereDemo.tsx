"use client";

import { useEffect, useState } from "react";
import { AppFrame, prefersReducedMotion, useInView } from "@/components/AppFrame";

/**
 * The Remember section's illustration: Stratasphere's own window, the Ask
 * page (components/StratasphereChat.tsx in the app), with conversations,
 * projects, and pinned ones down the side. Once in view a question is
 * typed and sent, the answer is written out, and its sources appear; then
 * it starts again. With reduced motion it holds on the answer.
 *
 * Illustrative, for a fictional strata. The answer reports what the records
 * say and cites them, as Stratasphere does; it gives no advice.
 */
const QUESTION = "What do our bylaws say about short-term rentals?";
const ANSWER =
  "Bylaw 42 prohibits renting a strata lot for less than 30 days. Owners added it by a 3/4 vote resolution at the AGM on February 21, 2023, and council later set the fine for a breach at $500 a day.";
const SOURCES = ["Bylaws, amended 2023", "AGM minutes, Feb 21, 2023", "Decision ledger"];
const WORDS = ANSWER.split(" ");

/** 0 typing, 1 sent, 2 writing the answer, 3 answered with sources. */
type Step = 0 | 1 | 2 | 3;

export function StratasphereDemo() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState<Step>(0);
  const [words, setWords] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTyped(QUESTION.length);
      setWords(WORDS.length);
      setStep(3);
      return;
    }
    if (!seen) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const loop = () => {
      setStep(0);
      setTyped(0);
      setWords(0);
      let t = 800;
      for (let i = 1; i <= QUESTION.length; i++) {
        at(t, () => setTyped(i));
        t += 45;
      }
      at((t += 500), () => setStep(1));
      at((t += 1400), () => setStep(2));
      for (let w = 1; w <= WORDS.length; w++) {
        at((t += 70), () => setWords(w));
      }
      at((t += 400), () => setStep(3));
      at(t + 7000, loop);
    };
    loop();
    return () => timers.forEach(clearTimeout);
  }, [seen]);

  const asked = step >= 1;

  return (
    <div className="appshot appshot--tall" ref={ref}>
      <AppFrame url="app.stratacouncil.ca/strata/assistant" label="Stratasphere in the app, answering a question about the strata's bylaws and past decisions with its sources">
        <div className="ach">
          <aside className="ach__side">
            <span className="ach__new">New conversation</span>
            <span className="ach__section">Pinned</span>
            <span className="ach__item">Roof decisions so far</span>
            <span className="ach__section ach__section--row">
              Projects <em>New</em>
            </span>
            <span className="ach__project">Roof replacement</span>
            <span className="ach__item ach__item--in">Quotes for the membrane</span>
            <span className="ach__section">Recents</span>
            <span className="ach__date">Today</span>
            {asked && <span className="ach__item ach__item--active">Short-term rentals bylaw</span>}
            <span className="ach__item">Pet bylaw and the new policy</span>
            <span className="ach__date">Previous 7 days</span>
            <span className="ach__item">Contingency reserve fund balance</span>
            <span className="ach__item">Move-in fees</span>
          </aside>
          <div className="ach__main">
            <div className="ach__head">
              <strong>{asked ? "Short-term rentals bylaw" : "New conversation"}</strong>
              <span>
                Draws on everything Harbourview Commons has on StrataCouncil.ca (the owner roster, council, meetings, the
                document repository with 124 indexed documents, minutes included, and the decision ledger), and BC strata
                legislation.
              </span>
            </div>
            <div className="ach__transcript">
              {!asked ? (
                <p className="ach__empty">What would you like to know?</p>
              ) : (
                <>
                  <p className="ach__q">{QUESTION}</p>
                  {step === 1 ? (
                    <p className="ach__a ach__a--dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </p>
                  ) : (
                    <div className="ach__answer">
                      <p className="ach__a">{WORDS.slice(0, words).join(" ")}</p>
                      {step === 3 && (
                        <div className="ach__sources">
                          <span className="ach__srclabel">Sources</span>
                          {SOURCES.map((x, i) => (
                            <span key={x} className="ach__chip" data-doc={i < 2 ? "" : undefined}>
                              {x}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="ach__composer">
              <span className="ach__input">
                {step === 0 && typed > 0 ? QUESTION.slice(0, typed) : <i>Ask Stratasphere a question</i>}
                {step === 0 && <span className="asp__caret" />}
              </span>
              <span className="ach__send" data-ready={step === 0 && typed === QUESTION.length ? "" : undefined}>
                {step === 1 || step === 2 ? "Answering" : "Send"}
              </span>
            </div>
            <p className="ach__disclaimer">
              Stratasphere explains your records and the law in general terms. It isn&rsquo;t legal advice, and it can be
              wrong: check the sources it names.
            </p>
          </div>
        </div>
      </AppFrame>
      <p className="ask__caption">An example, for a fictional strata.</p>
    </div>
  );
}
