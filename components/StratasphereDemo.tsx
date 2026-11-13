"use client";

import { useEffect, useState } from "react";
import { AppFrame, prefersReducedMotion, useInView } from "@/components/AppFrame";

/**
 * The Remember section's illustration: the app's Stratasphere panel
 * (components/StratasphereDock.tsx in the app), docked beside a council
 * meeting's page and looking at it. Once in view a question is typed and
 * sent, the panel searches, and the answer arrives with its sources; then
 * it starts again. With reduced motion it holds on the answer.
 *
 * Illustrative, for a fictional strata. The answer reports what the records
 * say and cites them, as Stratasphere does; it gives no advice.
 */
const QUESTION = "What have we decided about the roof before?";
const ANSWER =
  "The 2024 depreciation report puts the roof at the end of its service life. On March 4, council carried a motion to commission a roof inspection (4 for, 1 against). The May inspection found two areas of membrane failure and recommends replacement within two years.";
const SOURCES = ["Depreciation Report 2024", "Decision ledger", "Roof Inspection, May 2026"];
const AGENDA = ["Call to Order", "Approve Agenda", "Approve Minutes", "Review Financial Statements", "Roof: depreciation report and inspection", "EV charging policy", "Adjournment"];

/** 0 typing, 1 sent and searching, 2 answered. */
type Step = 0 | 1 | 2;

export function StratasphereDemo() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState<Step>(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTyped(QUESTION.length);
      setStep(2);
      return;
    }
    if (!seen) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const loop = () => {
      setStep(0);
      setTyped(0);
      let t = 700;
      for (let i = 1; i <= QUESTION.length; i++) {
        at(t, () => setTyped(i));
        t += 45;
      }
      t += 500;
      at(t, () => setStep(1));
      t += 1800;
      at(t, () => setStep(2));
      t += 7500;
      at(t, loop);
    };
    loop();
    return () => timers.forEach(clearTimeout);
  }, [seen]);

  return (
    <div className="appshot" ref={ref}>
      <AppFrame url="app.stratacouncil.ca/strata/meetings" label="Stratasphere in the app, answering a question about past decisions with its sources">
        <div className="asp">
          <div className="asp__page">
            <span className="asp__tabs">
              <span>Overview</span>
              <span data-active="">Meetings</span>
              <span>Discussions</span>
              <span>Documents</span>
            </span>
            <strong className="asp__h">Strata Council Meeting</strong>
            <span className="asp__when">Thu, Nov 12, 2026 &middot; 7:00 p.m. PT</span>
            <ol className="asp__agenda">
              {AGENDA.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ol>
          </div>
          <aside className="asp__panel">
            <div className="asp__head">
              <strong>Stratasphere&trade;</strong>
              <span className="asp__links">
                <u>New</u>
                <u>Full page</u>
                <span>&times;</span>
              </span>
            </div>
            <div className="asp__focus">
              Looking at: <b>Strata Council Meeting, Nov 12, 2026</b>
            </div>
            <div className="asp__body">
              {step === 0 ? (
                <div className="asp__suggest">
                  <span>What&rsquo;s on this agenda, in brief?</span>
                  <span>What did we decide at our last meeting?</span>
                </div>
              ) : (
                <>
                  <p className="asp__q">{QUESTION}</p>
                  {step === 1 ? (
                    <p className="asp__thinking">
                      Searching your records<span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </p>
                  ) : (
                    <div className="asp__a">
                      <p>{ANSWER}</p>
                      <div className="asp__sources">
                        <span className="asp__srclabel">Sources</span>
                        {SOURCES.map((s) => (
                          <span key={s} className="asp__chip">
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="asp__note">Research only, not part of the minutes.</p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="asp__compose">
              <span className="asp__input">
                {step === 0 && typed > 0 ? QUESTION.slice(0, typed) : <i>Ask Stratasphere&hellip;</i>}
                {step === 0 && <span className="asp__caret" />}
              </span>
              <span className="asp__ask" data-ready={step === 0 && typed === QUESTION.length ? "" : undefined}>
                {step === 1 ? "Answering…" : "Ask"}
              </span>
            </div>
          </aside>
        </div>
      </AppFrame>
      <p className="ask__caption">An example, for a fictional strata.</p>
    </div>
  );
}
