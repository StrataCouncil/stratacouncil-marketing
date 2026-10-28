"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * How it works, step 3's illustration: a council meeting playing out in
 * Meeting Mode, in a short window. Once it scrolls into view, the current
 * item moves down the agenda (which scrolls to keep it near the top);
 * motions appear, their votes count up and the result is recorded; then it
 * loops. With reduced motion it holds on the roof item, motion recorded.
 *
 * Items follow the app's council meeting template and purposes. Votes are
 * counted the way Meeting Mode counts a council vote: carried by a majority
 * of the members present (5 of a council of 7 here, quorum being 4). A
 * fictional strata; officers by role, owners by strata lot.
 */

interface Motion {
  text: string;
  votes: [number, number, number];
}

interface Item {
  text: string;
  purpose: string;
  motion?: Motion;
  /** Recorded once the item is dealt with. */
  result?: string;
}

const ITEMS: Item[] = [
  { text: "Call to Order", purpose: "For information" },
  { text: "Approve Agenda", purpose: "For approval", result: "Carried" },
  { text: "Approve Minutes of Previous Council Meeting", purpose: "For approval", result: "Carried" },
  { text: "Review Financial Statements", purpose: "For approval", result: "Carried" },
  {
    text: "Roof: depreciation report and inspection",
    purpose: "For decision",
    motion: { text: "To obtain three quotes for roof replacement and report back at the next meeting.", votes: [4, 1, 0] },
    result: "Carried",
  },
  {
    text: "Balcony alteration request, SL58",
    purpose: "For decision",
    motion: { text: "To approve SL58’s balcony alteration, subject to a signed alteration agreement.", votes: [5, 0, 0] },
    result: "Carried",
  },
  { text: "EV charging policy", purpose: "For discussion" },
  { text: "Set Next Meeting Date", purpose: "For information" },
  { text: "Adjournment", purpose: "For approval", result: "Carried" },
];

const ROOF = 4;
const STEP_MS = 1500;
const VOTE_MS = 380;
const HOLD_MS = 1800;

/** How far through the meeting it is: the current item, and how many of its votes are counted. */
interface Phase {
  at: number;
  counted: number;
}

export function MeetingAgenda() {
  const [phase, setPhase] = useState<Phase>({ at: 0, counted: 0 });
  const [started, setStarted] = useState(false);
  const [offset, setOffset] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setStarted(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase({ at: ROOF, counted: 3 });
      return;
    }
    if (!started) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const loop = () => {
      let t = 0;
      ITEMS.forEach((item, i) => {
        at(t, () => setPhase({ at: i, counted: 0 }));
        t += STEP_MS;
        if (item.motion) {
          for (let c = 1; c <= 3; c++) {
            at(t, () => setPhase({ at: i, counted: c }));
            t += VOTE_MS;
          }
          t += HOLD_MS;
        }
      });
      at(t, () => setPhase({ at: ITEMS.length, counted: 0 }));
      t += HOLD_MS + 1200;
      at(t, loop);
    };
    loop();
    return () => timers.forEach(clearTimeout);
  }, [started]);

  // Keep the current item second from the top of the window.
  useLayoutEffect(() => {
    const prev = rows.current[Math.min(phase.at, ITEMS.length - 1) - 1];
    setOffset(prev ? prev.offsetTop : 0);
  }, [phase.at]);

  return (
    <div className="agenda" ref={root} aria-label="An example council meeting in Meeting Mode">
      <div className="ask__window">
        <div className="ask__chrome" aria-hidden="true">
          <span className="ask__dot" />
          <span className="ask__dot" />
          <span className="ask__dot" />
          <span className="ask__title">Stratasphere&trade; &middot; Meeting Mode</span>
        </div>
        <div className="ask__body">
          <div className="agenda__head">
            <strong>Council meeting</strong>
            <span className="agenda__quorum">Quorum met &middot; 5 of 7 present</span>
          </div>
          <div className="agenda__viewport">
            <ol className="agenda__list" style={{ transform: `translateY(-${offset}px)` }}>
              {ITEMS.map((it, i) => {
                const status = i < phase.at ? "done" : i === phase.at ? "now" : "next";
                const counted = i === phase.at ? phase.counted : i < phase.at ? 3 : 0;
                const recorded = status === "done" || (status === "now" && it.motion && counted === 3);
                return (
                  <li
                    key={it.text}
                    ref={(el) => {
                      rows.current[i] = el;
                    }}
                    className="agenda__item"
                    data-status={status}
                  >
                    <span className="agenda__num">{i + 1}</span>
                    <span className="agenda__text">
                      {it.text}
                      <span className="agenda__purpose">{it.purpose}</span>
                    </span>
                    {recorded && it.result ? (
                      <span className="agenda__result">{it.result}</span>
                    ) : status === "now" ? (
                      <span className="agenda__now">Now</span>
                    ) : null}
                    {it.motion && status === "now" && (
                      <div className="agenda__motion">
                        <p>
                          <span className="ask__label">Motion</span> {it.motion.text}
                        </p>
                        <p className="agenda__by">Moved by the treasurer &middot; Seconded by the secretary</p>
                        <p className="agenda__votes">
                          <span>For {counted >= 1 ? it.motion.votes[0] : "–"}</span>
                          <span>Against {counted >= 2 ? it.motion.votes[1] : "–"}</span>
                          <span>Abstain {counted >= 3 ? it.motion.votes[2] : "–"}</span>
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
      <p className="ask__caption">Example meeting using a fictional strata.</p>
    </div>
  );
}
