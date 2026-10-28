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

const TYPE_MS = 28;
const SEARCH_MS = 800;
const SOURCE_MS = 480;

/** Hold the camera at each stop for the middle half of the scroll between stops. */
function ease(s: number) {
  const i = Math.floor(s);
  const u = s - i;
  const v = Math.min(1, Math.max(0, (u - 0.25) / 0.5));
  return i + v * v * (3 - 2 * v);
}

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
  const [state, setState] = useState<"idle" | "loading" | "ready" | "still" | "error">("idle");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const tour = tourRef.current;
    if (!tour) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("still");
      return;
    }

    // Scroll position through the tour, in stops (0 to STOPS.length - 1), holding on the last.
    const stopAt = () => {
      const r = tour.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      return Math.min(STOPS.length - 1, p * (STOPS.length - 1 + END_HOLD));
    };

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    // Phones (and small windows) get the lighter frames.
    const set = Math.min(window.innerWidth, window.innerHeight) < 700 ? "small" : "large";
    const frames: (HTMLImageElement | null)[] = new Array(FRAMES).fill(null);
    let shown = -1;
    let wanted = 0;

    const draw = () => {
      // Nearest loaded frame to the one the scroll position wants.
      let idx = -1;
      for (let d = 0; d < FRAMES && idx < 0; d++) {
        if (frames[wanted - d]) idx = wanted - d;
        else if (frames[wanted + d]) idx = wanted + d;
      }
      if (idx < 0 || (idx === shown && canvas.dataset.size === `${canvas.width}x${canvas.height}`)) return;
      const img = frames[idx]!;
      const { width: cw, height: ch } = canvas;
      // Cover the stage on wide screens. On tall ones, a little wider than the screen and in the
      // space between the header and the scenario window (the frames' navy fills the rest).
      const wide = cw / ch > 1;
      const scale = wide ? Math.max(cw / img.width, ch / img.height) : (cw / img.width) * 1.3;
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.fillStyle = "#1b2a41";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - w) / 2, wide ? (ch - h) / 2 : ch * 0.4 - h / 2, w, h);
      shown = idx;
      canvas.dataset.size = `${cw}x${ch}`;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      shown = -1;
      draw();
    };

    // The stop being held, or -1 while the camera flies between stops; and the frame to show.
    let raf = 0;
    const update = () => {
      raf = 0;
      const s = stopAt();
      const i = Math.floor(s);
      const u = s - i;
      setActive(u <= 0.3 ? i : u >= 0.7 ? i + 1 : -1);
      wanted = Math.min(FRAMES - 1, Math.round(ease(s) * FRAMES_PER_STOP));
      draw();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
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
            if (Math.abs(i - wanted) <= Math.abs(shown - wanted)) draw();
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

    resize();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      disposed = true;
      io.disconnect();
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
          <div className="building-tour__head" data-on="true" data-ask={Boolean(scenario)}>
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
