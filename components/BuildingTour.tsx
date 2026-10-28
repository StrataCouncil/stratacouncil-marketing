"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The home page's "Know the history" band: a scroll-driven flight round an
 * apartment complex. As the visitor scrolls, the camera moves between stops
 * on the building (the roof, the balconies, the parkade) and, at each one, a
 * Stratasphere window plays one of the illustrative scenarios: the question,
 * the sources it would draw on, and an example answer.
 *
 * The flight is pre-rendered (in Blender, from a licensed TurboSquid model,
 * as a white model in the brand's off-white on the brand navy) into a frame
 * sequence in public/tour, which a canvas scrubs through as the page scrolls;
 * the model itself never reaches the browser, as its licence requires.
 * Phones load a lighter set of frames. People who prefer reduced motion get
 * the first frame and the scenarios as a plain list instead.
 */

/** Frames in the flight, and how many lie between one stop and the next. */
const FRAMES = 217;
const FRAMES_PER_STOP = 72;

type Kind = "bylaw" | "rule" | "decision" | "record";

interface Source {
  kind: Kind;
  label: string;
}

interface Scenario {
  title: string;
  question: string;
  answer: string;
  sources: Source[];
}

interface Stop {
  scenario?: Scenario;
}

const STOPS: Stop[] = [
  {},
  {
    scenario: {
      title: "Scenario 1: Roof replacement",
      question:
        "Our roof is approaching the end of its expected service life. What should council review before deciding whether to repair or replace it?",
      answer:
        "Start with the depreciation report, roof inspection records, previous repair invoices, warranty documents and the strata’s current financial position. Check what the report says about timing and estimated costs, and confirm whether newer inspections identify additional concerns. Council can then assess the available options, obtain any necessary professional advice and determine how the work should be funded.",
      sources: [
        { kind: "record", label: "Depreciation report" },
        { kind: "record", label: "Roof inspection" },
        { kind: "decision", label: "Previous council minutes" },
        { kind: "record", label: "Financial statements" },
      ],
    },
  },
  {
    scenario: {
      title: "Scenario 2: Limited common property alteration",
      question:
        "An owner wants to make changes to their balcony, which is designated as limited common property. What should council do first?",
      answer:
        "Check the strata plan, bylaws and alteration policies to establish the status of the area and the approval requirements. Ask the owner for a written description of the proposed work and any necessary plans or specifications. Before deciding, consider potential impacts on the building envelope, waterproofing, appearance, insurance and future maintenance. Confirm the applicable approval process and document the decision and any conditions.",
      sources: [
        { kind: "record", label: "Strata plan" },
        { kind: "bylaw", label: "Registered bylaws" },
        { kind: "rule", label: "Alteration policy" },
        { kind: "decision", label: "Relevant council minutes" },
      ],
    },
  },
  {
    scenario: {
      title: "Scenario 3: EV charger installation",
      question: "An owner wants to install an EV charger in their parking stall. What does council need to consider?",
      answer:
        "Start by reviewing the strata’s EV charging policy, applicable bylaws and any previous decisions. Establish what electrical capacity and infrastructure are available, whether an electrical assessment is needed, and what approvals, permits and agreements may apply. Consider installation costs, ongoing electricity use, responsibility for maintenance, insurance and the effect on other owners. The next step is to identify the information still needed before council can make a decision.",
      sources: [
        { kind: "rule", label: "EV charging policy" },
        { kind: "record", label: "Electrical assessment" },
        { kind: "bylaw", label: "Relevant bylaws" },
        { kind: "decision", label: "Previous council decisions" },
      ],
    },
  },
];

/** Extra scroll, in stops, to hold on the last view (the EV charger) before the page moves on. */
const END_HOLD = 0.6;

const KIND_NAMES: Record<Kind, string> = {
  bylaw: "Bylaws",
  rule: "Policy",
  decision: "Council record",
  record: "Document",
};

const NAVY = "#1b2a41";

const TYPE_MS = 28;
const SEARCH_MS = 800;
const SOURCE_MS = 480;

/** How much of the scroll either side of a stop holds the camera still there. */
const HOLD = 0.2;

/** The camera's place on the flight, in stops, for a scroll position: held near each stop, easing out and in between. */
function ease(s: number) {
  const i = Math.floor(s);
  const u = s - i;
  const v = Math.min(1, Math.max(0, (u - HOLD) / (1 - 2 * HOLD)));
  return i + v * v * (3 - 2 * v);
}

/** How quickly the camera catches up with the scroll position, in seconds (smooths out wheel steps). */
const FOLLOW_S = 0.14;

/** On phones, the scenario window's share of the stage height (matches .building-tour__ask in globals.css). */
const PHONE_ASK = 0.4;
const PHONE_GAP = 16;

function Ask({ scenario }: { scenario: Scenario }) {
  const [typed, setTyped] = useState(0);
  const [searching, setSearching] = useState(false);
  const [shown, setShown] = useState(0);
  const [answered, setAnswered] = useState(false);
  const { question, sources } = scenario;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    setTyped(0);
    setShown(0);
    setSearching(false);
    setAnswered(false);
    let t = 200;
    for (let i = 1; i <= question.length; i++) {
      at(t, () => setTyped(i));
      t += TYPE_MS;
    }
    at(t, () => setSearching(true));
    t += SEARCH_MS;
    for (let i = 1; i <= sources.length; i++) {
      at(t, () => setShown(i));
      t += SOURCE_MS;
    }
    at(t, () => {
      setSearching(false);
      setAnswered(true);
    });
    return () => timers.forEach(clearTimeout);
  }, [question, sources.length]);

  return (
    <div className="ask__body">
      <div className="ask__question">
        <svg className="ask__search" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12.6 12.6 17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span>
          {question.slice(0, typed)}
          {typed < question.length && <span className="ask__caret" aria-hidden="true" />}
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
      <Sources sources={sources.slice(0, shown)} />
      {answered && <Answer text={scenario.answer} />}
    </div>
  );
}

function Sources({ sources }: { sources: Source[] }) {
  return (
    <ul className="building-tour__sources" aria-label="Sources">
      {sources.map((s) => (
        <li key={s.label} className="ask__source" data-kind={s.kind}>
          <span className="ask__label">
            <span className="visually-hidden">{KIND_NAMES[s.kind]}: </span>
            {s.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Answer({ text }: { text: string }) {
  return (
    <div className="ask__answer">
      <span className="ask__label">Example answer</span>
      <p>{text}</p>
    </div>
  );
}

export function BuildingTour() {
  const tourRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "still" | "error">("idle");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const tour = tourRef.current;
    if (!tour) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("still");
      return;
    }

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const head = headRef.current!;

    // Scroll position through the tour, in stops (0 to STOPS.length - 1), holding on the last.
    const stopAt = () => {
      const r = tour.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - canvas.clientHeight)));
      return Math.min(STOPS.length - 1, p * (STOPS.length - 1 + END_HOLD));
    };

    // Phones (and small windows) get the lighter frames.
    const set = Math.min(window.innerWidth, window.innerHeight) < 700 ? "small" : "large";
    const frames: (HTMLImageElement | null)[] = new Array(FRAMES).fill(null);
    // The frame the camera is on (fractional: between two frames, the second fades in over the first).
    let wanted = 0;
    let drawn = "";
    // Where the building goes on tall screens: the space between the header panel and the scenario window.
    let gapTop = 0;

    const nearest = (i: number) => {
      for (let d = 0; d < FRAMES; d++) {
        if (frames[i - d]) return i - d;
        if (frames[i + d]) return i + d;
      }
      return -1;
    };

    const draw = () => {
      const { width: cw, height: ch } = canvas;
      const a = Math.floor(wanted);
      let t = wanted - a;
      let first = a;
      if (!frames[a] || (t > 0.01 && !frames[a + 1])) {
        first = nearest(Math.round(wanted));
        t = 0;
      }
      if (first < 0) return;
      const key = `${first}:${t.toFixed(2)}:${cw}x${ch}:${gapTop}`;
      if (key === drawn) return;
      drawn = key;

      const img = frames[first]!;
      // Cover the stage on wide screens. On tall ones, a little wider than the screen, centred in the
      // space between the header panel and the scenario window, its edges fading into the navy.
      const wide = cw / ch > 1;
      const scale = wide ? Math.max(cw / img.width, ch / img.height) : (cw / img.width) * 1.25;
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (cw - w) / 2;
      const gapBottom = ch * (1 - PHONE_ASK) - PHONE_GAP * (canvas.width / Math.max(1, canvas.clientWidth));
      const y = wide ? (ch - h) / 2 : (gapTop + gapBottom) / 2 - h / 2;
      ctx.globalAlpha = 1;
      ctx.fillStyle = NAVY;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
      if (t > 0.01) {
        ctx.globalAlpha = t;
        ctx.drawImage(frames[first + 1]!, x, y, w, h);
        ctx.globalAlpha = 1;
      }
      if (!wide) {
        const fade = h * 0.12;
        for (const [from, to] of [
          [y, y + fade],
          [y + h, y + h - fade],
        ]) {
          const g = ctx.createLinearGradient(0, from, 0, to);
          g.addColorStop(0, NAVY);
          g.addColorStop(1, "rgba(27, 42, 65, 0)");
          ctx.fillStyle = g;
          ctx.fillRect(0, Math.min(from, to), cw, fade);
        }
      }
    };

    const measure = () => {
      const dpr = canvas.width / Math.max(1, canvas.clientWidth);
      gapTop = Math.round((head.getBoundingClientRect().bottom - canvas.getBoundingClientRect().top) * dpr);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      measure();
      draw();
    };

    // The camera follows the scroll position with a little lag, so it glides into and out of each stop
    // instead of stepping with the wheel. `at` is where it is now, in stops.
    let at = stopAt();
    let raf = 0;
    let last = 0;
    const show = () => {
      const i = Math.floor(at);
      const u = at - i;
      // The stop being held, or -1 while the camera flies between stops.
      setActive(u <= HOLD + 0.05 ? i : u >= 1 - HOLD - 0.05 ? i + 1 : -1);
      wanted = Math.min(FRAMES - 1, ease(at) * FRAMES_PER_STOP);
      draw();
    };
    const tick = (now: number) => {
      const target = stopAt();
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60;
      last = now;
      at += (target - at) * (1 - Math.exp(-dt / FOLLOW_S));
      if (Math.abs(target - at) < 0.0005) at = target;
      show();
      raf = at === target ? 0 : requestAnimationFrame(tick);
      if (!raf) last = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    let disposed = false;
    const load = (i: number) =>
      new Promise<void>((resolve) => {
        if (frames[i]) return resolve();
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (!disposed) {
            frames[i] = img;
            draw(); // redraws only if this frame is nearer the camera than the one showing
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = `/tour/${set}/f${String(i).padStart(4, "0")}.webp`;
      });

    // Load coarse to fine: the stops first, then every 8th, 4th, 2nd frame, then the rest.
    const order: number[] = [];
    const seen = new Set<number>();
    for (const step of [FRAMES_PER_STOP, 8, 4, 2, 1]) {
      for (let i = 0; i < FRAMES; i += step) if (!seen.has(i)) (seen.add(i), order.push(i));
    }
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setState("loading");
        await load(0);
        if (disposed) return;
        setState(frames[0] ? "ready" : "error");
        // A few at a time, so the first views arrive quickly.
        let next = 0;
        const worker = async () => {
          while (!disposed && next < order.length) await load(order[next++]);
        };
        await Promise.all([worker(), worker(), worker(), worker()]);
      },
      { rootMargin: "600px" }
    );
    io.observe(tour);

    // The header panel's height changes with the fonts and the window width.
    const ro = new ResizeObserver(() => {
      measure();
      draw();
    });
    ro.observe(head);

    resize();
    show();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      disposed = true;
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scenario = STOPS[active]?.scenario;
  const scenarios = STOPS.flatMap((s) => (s.scenario ? [s.scenario] : []));

  if (state === "still") {
    return (
      <section id="know-the-history" className="building-tour" data-state="still" data-testid="building-tour">
        <div className="wrap">
          <Intro />
          <img className="building-tour__still" src="/tour/large/f0000.webp" alt="" width={1280} height={720} loading="lazy" />
          <ol className="building-tour__list">
            {scenarios.map((s) => (
              <li key={s.title} className="ask">
                <div className="ask__window">
                  <div className="ask__chrome">
                    <span className="ask__title">{s.title}</span>
                  </div>
                  <div className="ask__body">
                    <p className="ask__question">{s.question}</p>
                    <Sources sources={s.sources} />
                    <Answer text={s.answer} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={tourRef} id="know-the-history" className="building-tour" data-state={state} data-active={active} data-testid="building-tour" style={{ height: `${(STOPS.length + END_HOLD) * 100}vh` }}>
      <div className="building-tour__stage">
        <canvas ref={canvasRef} className="building-tour__canvas" aria-hidden />
        <div className="building-tour__overlay">
          <div className="building-tour__head" ref={headRef}>
            <Intro />
            {state === "loading" && (
              <p className="building-tour__note">Loading the building&hellip;</p>
            )}
            {state === "error" && <p className="building-tour__note">The building couldn&rsquo;t load.</p>}
          </div>
          {scenario && (
            <div className="ask building-tour__ask" key={active}>
              <div className="ask__window">
                <div className="ask__chrome">
                  <span className="ask__dot" aria-hidden="true" />
                  <span className="ask__dot" aria-hidden="true" />
                  <span className="ask__dot" aria-hidden="true" />
                  <span className="ask__title">{scenario.title}</span>
                </div>
                <Ask scenario={scenario} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <>
      <p className="eyebrow">Stratasphere&trade;</p>
      <h2>Know the history.</h2>
      <p className="building-tour__lede">
        Every bylaw, proposal, contract, invoice, report, and decision is embedded in the institutional memory and
        available whenever and wherever you need it.
      </p>
    </>
  );
}
