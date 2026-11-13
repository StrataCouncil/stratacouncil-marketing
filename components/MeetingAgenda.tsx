"use client";

import { useEffect, useState } from "react";
import { AppFrame, prefersReducedMotion, useInView } from "@/components/AppFrame";

/**
 * The Meeting Mode section's illustration: the runner's view of Meeting
 * Mode (components/meetings/MeetingMode.tsx and LiveVote.tsx in the app),
 * on the roof item of a council meeting. Once in view:
 *
 *   1. The runner asks Stratasphere, in the right column, about the item.
 *   2. They open the vote; members vote on their own screens, one by one,
 *      and the tally builds against the majority needed.
 *   3. Everyone has voted, the runner closes the vote, and it's counted
 *      and recorded as carried. Then it loops.
 *
 * With reduced motion it holds on the counted vote, the answer showing.
 * Counted the way Meeting Mode counts a council vote: carried by a majority
 * of the members present (5 of a council of 7; quorum is 4). A fictional
 * strata; officers by role, owners by strata lot.
 */

type Choice = "for" | "against";

const AGENDA: { cat: string; text: string }[] = [
  { cat: "Opening", text: "Call to Order" },
  { cat: "Administrative", text: "Approve Agenda" },
  { cat: "Administrative", text: "Approve Minutes of Previous Council Meeting" },
  { cat: "Financial", text: "Review Financial Statements" },
  { cat: "New Business", text: "Roof: depreciation report and inspection" },
  { cat: "New Business", text: "EV charging policy" },
  { cat: "Next Meeting", text: "Set Next Meeting Date" },
  { cat: "Closing", text: "Adjournment" },
];
const NOW = 4;

/** Who votes, in the order their ballots come in. */
const VOTERS: { lot: string; role: string; choice: Choice; own?: boolean }[] = [
  { lot: "SL010", role: "President", choice: "for" },
  { lot: "SL012", role: "Treasurer", choice: "against" },
  { lot: "SL015", role: "Secretary", choice: "for", own: true },
  { lot: "SL011", role: "Vice President", choice: "for" },
  { lot: "SL021", role: "Member at Large", choice: "for" },
];
const ROWS = ["SL010", "SL011", "SL012", "SL015", "SL021"].map((lot) => VOTERS.find((v) => v.lot === lot)!);

const QUESTION = "Have we had roof quotes before?";
const ANSWER =
  "Yes. In June 2019 council approved a $41,800 quote from North Shore Membrane Co. for membrane repairs, over a second quote of $46,200. No quotes for a full replacement are on file.";

/**
 * The scene: how far the question is typed, whether it's answered, and the
 * vote: 0 not open, 1 open, 2 closed and counted; `ballots` are in.
 */
interface Scene {
  typed: number;
  asked: "no" | "searching" | "answered";
  vote: 0 | 1 | 2;
  ballots: number;
  seconds: number;
}

const START: Scene = { typed: 0, asked: "no", vote: 0, ballots: 0, seconds: 1123 };
const END: Scene = { typed: QUESTION.length, asked: "answered", vote: 2, ballots: VOTERS.length, seconds: 1336 };

const clock = (s: number) => [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, "0")).join(":");

function Check() {
  return (
    <svg viewBox="0 0 12 12" width="9" height="9" aria-hidden="true">
      <path d="M2 6.5 5 9l5-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 12 12" width="9" height="9" aria-hidden="true">
      <path d="m3 3 6 6M9 3 3 9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MeetingAgenda() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const [s, setS] = useState<Scene>(START);

  useEffect(() => {
    if (prefersReducedMotion()) return setS(END);
    if (!seen) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, patch: Partial<Scene>) => timers.push(setTimeout(() => setS((p) => ({ ...p, ...patch })), ms));
    const loop = () => {
      setS(START);
      let t = 900;
      for (let i = 1; i <= QUESTION.length; i++) {
        at(t, { typed: i });
        t += 50;
      }
      at((t += 500), { asked: "searching" });
      at((t += 1600), { asked: "answered" });
      at((t += 2400), { vote: 1 });
      t += 800;
      VOTERS.forEach((_, i) => at((t += 750), { ballots: i + 1 }));
      at((t += 1300), { vote: 2 });
      timers.push(setTimeout(loop, t + 5200));
    };
    loop();
    const tick = setInterval(() => setS((p) => ({ ...p, seconds: p.seconds + 1 })), 1000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(tick);
    };
  }, [seen]);

  const inBallots = VOTERS.slice(0, s.ballots);
  const ballotOf = (lot: string) => inBallots.find((v) => v.lot === lot);
  const tally = { for: inBallots.filter((v) => v.choice === "for").length, against: inBallots.filter((v) => v.choice === "against").length };
  const waiting = ROWS.filter((r) => !ballotOf(r.lot));

  return (
    <div className="appshot appshot--runner" ref={ref}>
      <AppFrame url="app.stratacouncil.ca/strata/meetings/run" label="The runner's view of Meeting Mode: a live vote counted as members vote on their own screens, and Stratasphere answering a question about the agenda item">
        <div className="amm">
          <header className="amm__bar">
            <div>
              <strong>Strata Council Meeting</strong>
              <span>Harbourview Commons</span>
            </div>
            <span className="amm__clock">{clock(s.seconds)}</span>
            <span className="amm__saved">Saved</span>
            <span className="amm__avatar">S</span>
            <span className="amm__handover">Hand over</span>
          </header>
          <div className="amm__cols amm__cols--runner">
            <nav className="amm__nav">
              <p className="amm__chair">Chair: President</p>
              <div className="amm__navport">
                <ol>
                  {AGENDA.map((it, i) => (
                    <li key={it.text} data-active={i === NOW ? "" : undefined} data-done={i < NOW || (i === NOW && s.vote === 2) ? "" : undefined}>
                      {(i === 0 || AGENDA[i - 1].cat !== it.cat) && <span className="amm__cat">{it.cat}</span>}
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
              <span className="amm__itemcat">New Business</span>
              <h4 className="amm__title">5. Roof: depreciation report and inspection</h4>
              <div className="amm__pills">
                <span className="amm__pill amm__pill--accent">For decision</span>
                <span className="amm__pill">Majority of council members present</span>
              </div>
              <section className="amm__card amm__card--still" data-compact={s.vote === 1 ? "" : undefined}>
                <span className="amm__label">Motion</span>
                <p className="amm__motion">To obtain three quotes for roof replacement and report back at the next meeting.</p>
                <div className="amm__by">
                  <span>
                    <em>Moved by</em> SL012, Treasurer
                  </span>
                  <span>
                    <em>Seconded by</em> SL015, Secretary
                  </span>
                </div>
              </section>

              {s.vote === 0 ? (
                <section className="amm__card amm__card--still">
                  <span className="amm__label">Vote</span>
                  <div className="amm__actions">
                    <span className="amm__btn amm__btn--primary">Open vote</span>
                    <span className="amm__btn">Defer</span>
                  </div>
                  <p className="amm__hint">Council members vote on their own screens; you can enter a vote for anyone on the phone or in the room.</p>
                </section>
              ) : s.vote === 1 ? (
                <section className="amm-live">
                  <div className="amm-live__head">
                    <span className="amm-live__badge">Vote open 0:{String(4 + s.ballots * 7).padStart(2, "0")}</span>
                    <span className="amm-live__meta">
                      {s.ballots} of 5 have voted &middot; members see the result when you close it
                    </span>
                  </div>
                  {ROWS.map((r) => {
                    const b = ballotOf(r.lot);
                    return (
                      <div className="amm-live__row" key={r.lot}>
                        <span className="amm-live__who">
                          {r.role}, {r.lot}
                          {r.own ? " (you)" : ""}
                          <small>{b ? (r.own ? "your vote" : "voted themselves") : "not voted yet"}</small>
                        </span>
                        {b ? (
                          <span className={`amm-ch amm-ch--${b.choice}`}>
                            {b.choice === "for" ? <Check /> : <Cross />}
                            {b.choice === "for" ? "For" : "Against"}
                          </span>
                        ) : (
                          <span className="amm-ch amm-ch--idle">&hellip;</span>
                        )}
                      </div>
                    );
                  })}
                  <div className="amm-live__foot">
                    <span>
                      <b>{tally.for}</b> For
                    </span>
                    <span>
                      <b>{tally.against}</b> Against
                    </span>
                    <span>
                      <b>0</b> Abstain
                    </span>
                    <span className="amm-live__meta amm-live__need">Needs 3 For: a majority of the 5 council members present</span>
                  </div>
                  <div className="amm-live__actions">
                    {waiting.length > 0 ? (
                      <span className="amm-live__meta">Waiting on {waiting.map((w) => w.lot).join(", ")}</span>
                    ) : (
                      <span className="amm-live__meta">Everyone present has voted.</span>
                    )}
                    <span className="amm__btn amm__btn--primary" data-off={waiting.length ? "" : undefined}>
                      Close vote
                    </span>
                  </div>
                </section>
              ) : (
                <section className="amm-live">
                  <div className="amm-live__head">
                    <span className="amm-live__counted">Counted in the app</span>
                    <span className="amm-live__meta">4 for, 1 against, 0 abstaining &middot; 5 present</span>
                  </div>
                  <p className="amm__result amm__result--in">Carried, 4 to 1. Recorded in the draft minutes.</p>
                </section>
              )}
            </main>

            <aside className="amm__side amm__side--ask">
              <p className="amm__sidehead">
                <span>+</span> In attendance (5)
              </p>
              <p className="amm__quorum">Quorum met: 5 of 7</p>
              <p className="amm__sidehead amm__sidehead--open">
                <span>&minus;</span> Stratasphere&trade;
              </p>
              <div className="amm-ask">
                <div className="amm-ask__focus">
                  Looking at: <b>Roof: depreciation report and inspection</b>
                </div>
                <div className="amm-ask__body">
                  {s.asked === "no" ? (
                    <div className="amm-ask__suggest">
                      <span>What have we decided about the roof before?</span>
                      <span>What do our bylaws say about this?</span>
                    </div>
                  ) : (
                    <>
                      <p className="amm-ask__q">{QUESTION}</p>
                      {s.asked === "searching" ? (
                        <p className="amm-ask__thinking">
                          Searching your records<span>.</span>
                          <span>.</span>
                          <span>.</span>
                        </p>
                      ) : (
                        <div className="amm-ask__a">
                          <p>{ANSWER}</p>
                          <div className="amm-ask__sources">
                            <span className="amm-ask__chip">Council minutes, June 2019</span>
                            <span className="amm-ask__chip">Decision ledger</span>
                          </div>
                          <p className="amm-ask__note">Research only, not part of the minutes.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="amm-ask__compose">
                  <span className="amm-ask__input">
                    {s.asked === "no" && s.typed > 0 ? QUESTION.slice(0, s.typed) : <i>Ask Stratasphere&hellip;</i>}
                    {s.asked === "no" && <span className="asp__caret" />}
                  </span>
                  <span className="amm-ask__send" data-ready={s.asked === "no" && s.typed === QUESTION.length ? "" : undefined}>
                    Ask
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </AppFrame>
      <p className="ask__caption">Example meeting using a fictional strata.</p>
    </div>
  );
}
