"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AppFrame, prefersReducedMotion, useInView } from "@/components/AppFrame";

/**
 * The Meeting Mode section's illustration: the app's Meeting Mode
 * (components/meetings/MeetingMode.tsx in the app), with its top bar, the
 * agenda down the left, the open item in the middle, and who's in
 * attendance on the right. Once in view the meeting moves down the agenda;
 * motions are moved and seconded, their votes count up, and the result is
 * recorded; then it loops. With reduced motion it holds on the roof item,
 * its vote recorded.
 *
 * Items follow the app's council meeting template. Votes are counted the
 * way Meeting Mode counts a council vote: carried by a majority of the
 * members present (5 of a council of 7 here; quorum is 4). A fictional
 * strata; officers by role, owners by strata lot.
 */

interface Motion {
  text: string;
  votes: [number, number, number];
  moved: string;
  seconded: string;
}

interface Item {
  cat: string;
  text: string;
  purpose: string;
  motion?: Motion;
}

const ITEMS: Item[] = [
  { cat: "Opening", text: "Call to Order", purpose: "For information" },
  { cat: "Administrative", text: "Approve Agenda", purpose: "For approval" },
  { cat: "Administrative", text: "Approve Minutes of Previous Council Meeting", purpose: "For approval" },
  { cat: "Financial", text: "Review Financial Statements", purpose: "For approval" },
  {
    cat: "New Business",
    text: "Roof: depreciation report and inspection",
    purpose: "For decision",
    motion: {
      text: "To obtain three quotes for roof replacement and report back at the next meeting.",
      votes: [4, 1, 0],
      moved: "SL012, Treasurer",
      seconded: "SL015, Secretary",
    },
  },
  {
    cat: "New Business",
    text: "Balcony alteration request, SL58",
    purpose: "For decision",
    motion: {
      text: "To approve SL58’s balcony alteration, subject to a signed alteration agreement.",
      votes: [5, 0, 0],
      moved: "SL015, Secretary",
      seconded: "SL010, President",
    },
  },
  { cat: "New Business", text: "EV charging policy", purpose: "For discussion" },
  { cat: "Next Meeting", text: "Set Next Meeting Date", purpose: "For information" },
  { cat: "Closing", text: "Adjournment", purpose: "For approval" },
];

const PRESENT = [
  { lot: "SL010", role: "President" },
  { lot: "SL011", role: "Vice President" },
  { lot: "SL012", role: "Treasurer" },
  { lot: "SL015", role: "Secretary" },
  { lot: "SL021", role: "Member at Large" },
];

const ROOF = 4;
const STEP_MS = 1500;
const VOTE_MS = 420;
const HOLD_MS = 2000;

/** How far through the meeting it is: the open item, and how many of its vote counts are in. */
interface Phase {
  at: number;
  counted: number;
}

const clock = (s: number) => [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, "0")).join(":");

export function MeetingAgenda() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const [phase, setPhase] = useState<Phase>({ at: 0, counted: 0 });
  const [seconds, setSeconds] = useState(1);
  const [offset, setOffset] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase({ at: ROOF, counted: 3 });
      setSeconds(1336);
      return;
    }
    if (!seen) return;
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
      at(t, () => setPhase({ at: ITEMS.length - 1, counted: 3 }));
      t += HOLD_MS + 1200;
      at(t, () => {
        setSeconds(1);
        loop();
      });
    };
    loop();
    const tick = setInterval(() => setSeconds((s) => s + 37), 1000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(tick);
    };
  }, [seen]);

  // Keep the open item near the top of the agenda column.
  useLayoutEffect(() => {
    const prev = rows.current[Math.max(phase.at - 2, 0)];
    setOffset(phase.at >= 3 && prev ? prev.offsetTop : 0);
  }, [phase.at]);

  const item = ITEMS[phase.at];
  const m = item.motion;
  const done = (i: number) => i < phase.at || (i === phase.at && (!ITEMS[i].motion ? false : phase.counted === 3));

  return (
    <div className="appshot" ref={ref}>
      <AppFrame url="app.stratacouncil.ca/strata/meetings/run" label="Meeting Mode in the app running a council meeting: the agenda, the motion, and the vote counted and recorded">
        <div className="amm">
          <header className="amm__bar">
            <div>
              <strong>Strata Council Meeting</strong>
              <span>Harbourview Commons</span>
            </div>
            <span className="amm__clock">{clock(seconds)}</span>
            <span className="amm__saved">Saved</span>
            <span className="amm__avatar">S</span>
            <span className="amm__handover">Hand over</span>
          </header>
          <div className="amm__cols">
            <nav className="amm__nav">
              <p className="amm__chair">Chair: President</p>
              <div className="amm__navport">
                <ol style={{ transform: `translateY(-${offset}px)` }}>
                  {ITEMS.map((it, i) => (
                    <li
                      key={it.text}
                      ref={(el) => {
                        rows.current[i] = el;
                      }}
                      data-active={i === phase.at ? "" : undefined}
                      data-done={done(i) ? "" : undefined}
                    >
                      {(i === 0 || ITEMS[i - 1].cat !== it.cat) && <span className="amm__cat">{it.cat}</span>}
                      <span className="amm__row">
                        <span className="amm__tick" />
                        {i + 1}. {it.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
            <main className="amm__main">
              <span className="amm__itemcat">{item.cat}</span>
              <h4 className="amm__title">
                {phase.at + 1}. {item.text}
              </h4>
              <div className="amm__pills">
                <span className="amm__pill amm__pill--accent">{item.purpose}</span>
                {m && <span className="amm__pill">Majority of council members present</span>}
              </div>
              {m ? (
                <>
                  <section className="amm__card">
                    <span className="amm__label">Motion</span>
                    <p className="amm__motion">{m.text}</p>
                    <div className="amm__by">
                      <span>
                        <em>Moved by</em> {m.moved}
                      </span>
                      <span>
                        <em>Seconded by</em> {m.seconded}
                      </span>
                    </div>
                  </section>
                  <section className="amm__card">
                    <span className="amm__label">Vote</span>
                    <div className="amm__votes">
                      {(["For", "Against", "Abstain"] as const).map((k, j) => (
                        <span key={k} data-kind={k.toLowerCase()}>
                          <b>{phase.counted > j ? m.votes[j] : "–"}</b>
                          {k}
                        </span>
                      ))}
                    </div>
                    {phase.counted === 3 ? (
                      <p className="amm__result">
                        Carried, {m.votes[0]} to {m.votes[1]}. Recorded in the draft minutes.
                      </p>
                    ) : (
                      <p className="amm__hint">Council members are voting on their own screens.</p>
                    )}
                  </section>
                </>
              ) : (
                <section className="amm__card">
                  <span className="amm__label">Procedure</span>
                  <p className="amm__hint">
                    {item.purpose === "For approval"
                      ? "Moved, seconded, and carried by a majority of the members present."
                      : item.purpose === "For discussion"
                        ? "Discussed; no motion. Notes go to the minutes summary."
                        : "Noted in the minutes."}
                  </p>
                </section>
              )}
            </main>
            <aside className="amm__side">
              <p className="amm__sidehead">
                <span>&minus;</span> In attendance (5)
              </p>
              <p className="amm__quorum">Quorum met: 5 of 7 council members</p>
              <ul className="amm__people">
                {PRESENT.map((p) => (
                  <li key={p.lot}>
                    <span className="amm__dot" />
                    {p.lot} <em>{p.role}</em>
                  </li>
                ))}
              </ul>
              <p className="amm__sidehead amm__sidehead--foot">
                <span>+</span> Stratasphere&trade;
              </p>
            </aside>
          </div>
        </div>
      </AppFrame>
      <p className="ask__caption">Example meeting using a fictional strata.</p>
    </div>
  );
}
