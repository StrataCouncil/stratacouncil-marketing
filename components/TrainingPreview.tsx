"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Council Training section's illustration: two screens of a module,
 * played on a loop once the window scrolls into view. First the four
 * flip cards turn over one by one; then a knowledge check is answered and
 * explained. With reduced motion it shows the knowledge check, answered,
 * and stays still.
 */

const CARDS = [
  { front: "Strata lot", back: "The home you own, as shown on the strata plan." },
  { front: "Common property", back: "Hallways, roofs, grounds: owned by all the owners together." },
  { front: "Limited common property", back: "Common property set aside for one lot, like a balcony." },
  { front: "Common assets", back: "Things the corporation itself owns, like the gym equipment." },
];

const OPTIONS = ["Each owner, for the area outside their door", "The strata corporation, acting through council", "The strata manager"];
const CORRECT = 1;

type Phase = { screen: "cards"; flipped: number } | { screen: "check"; chosen: boolean };

export function TrainingPreview() {
  const [phase, setPhase] = useState<Phase>({ screen: "cards", flipped: 0 });
  const [started, setStarted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase({ screen: "check", chosen: true });
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const loop = () => {
      let t = 0;
      at(t, () => setPhase({ screen: "cards", flipped: 0 }));
      t += 900;
      for (let i = 1; i <= CARDS.length; i++) {
        at(t, () => setPhase({ screen: "cards", flipped: i }));
        t += 1100;
      }
      t += 1600;
      at(t, () => setPhase({ screen: "check", chosen: false }));
      t += 1800;
      at(t, () => setPhase({ screen: "check", chosen: true }));
      t += 5200;
      at(t, loop);
    };
    loop();
    return () => timers.forEach(clearTimeout);
  }, [started]);

  const onCards = phase.screen === "cards";
  const screenNo = onCards ? 4 : 5;

  return (
    <div className="lesson" ref={root} data-testid="training-preview" aria-hidden="true">
      <div className="lesson__window">
        <div className="lesson__bar">
          <span className="lesson__title">{onCards ? "Four terms to know" : "Check your understanding"}</span>
          <span className="lesson__count">{screenNo} / 14</span>
        </div>

        {phase.screen === "cards" ? (
          <div className="lesson__body" key="cards">
            <p className="lesson__text">Four terms describe what you own and what you share. Turn each card over.</p>
            <div className="lesson__cards">
              {CARDS.map((c, i) => (
                <div className="lesson__card" data-flipped={i < phase.flipped} key={c.front}>
                  <div className="lesson__card-inner">
                    <div className="lesson__face lesson__face--front">
                      <strong>{c.front}</strong>
                      <span>Select to reveal</span>
                    </div>
                    <div className="lesson__face lesson__face--back">{c.back}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="lesson__hint">
              {phase.flipped >= CARDS.length ? "You've turned them all." : `Select each card to turn it over (${CARDS.length - phase.flipped} to go).`}
            </p>
          </div>
        ) : (
          <div className="lesson__body" key="check">
            <p className="lesson__text">Who is responsible for repairing and maintaining common property?</p>
            <ul className="lesson__options">
              {OPTIONS.map((o, i) => (
                <li key={o} data-state={phase.chosen ? (i === CORRECT ? "right" : "dim") : "idle"}>
                  <span className="lesson__radio" />
                  {o}
                </li>
              ))}
            </ul>
            <p className="lesson__feedback" data-shown={phase.chosen}>
              <strong>Right.</strong> The strata corporation must repair and maintain common property (Strata
              Property Act, s. 72), and council does that work on its behalf.
            </p>
          </div>
        )}

        <div className="lesson__progress">
          <span style={{ width: `${(screenNo / 14) * 100}%` }} />
        </div>
      </div>
      <p className="ask__caption">Strata Basics &middot; What Is a Strata Corporation?</p>
    </div>
  );
}
