"use client";

import { useEffect, useState } from "react";
import { AppFrame, prefersReducedMotion, useInView } from "@/components/AppFrame";

/**
 * The Council Training section's illustration: the app's module player
 * (components/training/ModulePlayer.tsx in the app) on a knowledge check.
 * Once in view, an answer is picked and checked, the explanation shows,
 * then it starts again. With reduced motion it holds on the answer.
 */
const OPTIONS = ["Each owner, for the area outside their door", "The strata corporation, acting through council", "The strata manager"];
const CORRECT = 1;
const TOPICS = ["What a strata corporation is", "Common property", "Council and the owners", "Bylaws and rules"];

/** 0 nothing picked, 1 picked, 2 checked. */
type Step = 0 | 1 | 2;

export function TrainingPreview() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const [step, setStep] = useState<Step>(0);

  useEffect(() => {
    if (prefersReducedMotion()) return setStep(2);
    if (!seen) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const loop = () => {
      setStep(0);
      timers.push(setTimeout(() => setStep(1), 1400));
      timers.push(setTimeout(() => setStep(2), 2600));
      timers.push(setTimeout(loop, 8600));
    };
    loop();
    return () => timers.forEach(clearTimeout);
  }, [seen]);

  return (
    <div className="appshot" ref={ref} data-testid="training-preview">
      <AppFrame url="app.stratacouncil.ca/training/strata-basics" label="A Council Training module in the app: a knowledge check, answered and explained">
        <div className="atr">
          <aside className="atr__side">
            <span className="atr__back">&larr; Strata Basics</span>
            <strong className="atr__title">What Is a Strata Corporation?</strong>
            <span className="atr__progress">
              <span style={{ width: "25%" }} />
            </span>
            <span className="atr__meta">1 of 4 topics complete</span>
            <ul className="atr__topics">
              {TOPICS.map((t, i) => (
                <li key={t} data-state={i === 0 ? "done" : i === 1 ? "now" : undefined}>
                  {t}
                </li>
              ))}
            </ul>
          </aside>
          <div className="atr__main">
            <div className="atr__card">
              <div className="atr__head">
                <span>Check your understanding</span>
                <span className="atr__count">5/14</span>
              </div>
              <div className="atr__body">
                <div className="atr__check">
                  <span className="atr__kicker">Knowledge check</span>
                  <p className="atr__q">Who is responsible for repairing and maintaining common property?</p>
                  <ul className="atr__options">
                    {OPTIONS.map((o, i) => (
                      <li
                        key={o}
                        data-picked={step >= 1 && i === CORRECT ? "" : undefined}
                        data-state={step === 2 ? (i === CORRECT ? "right" : "dim") : undefined}
                      >
                        <span className="atr__radio" />
                        <b>{"ABC"[i]}</b>
                        {o}
                      </li>
                    ))}
                  </ul>
                  {step < 2 ? (
                    <span className="atr__btn" data-ready={step === 1 ? "" : undefined}>
                      Check my answer
                    </span>
                  ) : (
                    <p className="atr__feedback">
                      <strong>Correct.</strong> Under section 72 of the Strata Property Act, the strata corporation must
                      repair and maintain common property. Council carries out the corporation&rsquo;s duties, subject
                      to the Act and the bylaws.
                    </p>
                  )}
                </div>
                <p className="atr__source">
                  <strong>Source:</strong> Strata Property Act, s. 72 Repair of property
                </p>
              </div>
            </div>
            <div className="atr__nav">
              <span className="atr__prev">&lsaquo; Prev</span>
              <span className="atr__next">Next &rsaquo;</span>
            </div>
          </div>
        </div>
      </AppFrame>
      <p className="ask__caption">Strata Basics &middot; What Is a Strata Corporation?</p>
    </div>
  );
}
