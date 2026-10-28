"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The home page's "See how it works" band: a scroll-driven tour of a
 * Gaussian-splat scan of a tower. As the visitor scrolls, the camera flies
 * between stops on the building (the roof, the balconies, the parking) and,
 * at each one, a Stratasphere window plays one of the illustrative scenarios:
 * the question, the sources it would draw on, and an example answer.
 * Loads three.js, Spark and the scan only when the band comes into view.
 * People who prefer reduced motion, or whose browser lacks WebGL2, get the
 * scenarios as a plain list instead.
 *
 * The scan is by Jose David Pabon Orejarena, used with credit: the SuperSplat
 * scene cut down to the tower and its block and thinned to 1.1 million
 * splats (public/splats/tower.sog, about 14 MB). The scenarios use fictional
 * strata records.
 */
const SCENE_URL = "/splats/tower.sog";
export const SCAN_CREDIT = "3D scan by Jose David Pabon Orejarena";
const CAPTION =
  "Illustrative Stratasphere scenarios using fictional strata records. Answers depend on the documents, facts and applicable law in each case.";

type Vec = [number, number, number];
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
  /** Camera position and the point it looks at, in the scan's coordinates (y up, after the flip below). */
  pos: Vec;
  look: Vec;
  scenario?: Scenario;
}

const STOPS: Stop[] = [
  { pos: [-205, 118, 40], look: [-128, 55, 112] },
  {
    pos: [-165, 128, 72],
    look: [-128, 92, 110],
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
    pos: [-165, 64, 70],
    look: [-125, 60, 105],
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
    pos: [-172, 45, 78],
    look: [-135, 14, 115],
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
  { pos: [-110, 150, -40], look: [-125, 45, 112] },
];

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
    <ul className="splat-tour__sources" aria-label="Sources">
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

export function SplatTour() {
  const tourRef = useRef<HTMLElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "still" | "error">("idle");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const tour = tourRef.current;
    if (!tour) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasGl2 = (() => {
      try {
        return Boolean(document.createElement("canvas").getContext("webgl2"));
      } catch {
        return false;
      }
    })();
    if (reduced || !hasGl2) {
      setState("still");
      return;
    }

    // Scroll position through the tour, in stops (0 to STOPS.length - 1).
    const stopAt = () => {
      const r = tour.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      return p * (STOPS.length - 1);
    };
    // The stop the camera is holding at, or -1 while it flies between stops.
    const onScroll = () => {
      const s = stopAt();
      const i = Math.floor(s);
      const u = s - i;
      setActive(u <= 0.3 ? i : u >= 0.7 ? i + 1 : -1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let disposed = false;
    let cleanup = () => {};
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setState("loading");
        try {
          const [THREE, { SparkRenderer, SplatMesh }] = await Promise.all([import("three"), import("@sparkjsdev/spark")]);
          if (disposed || !canvasHost.current) return;
          const host = canvasHost.current;
          const renderer = new THREE.WebGLRenderer({ antialias: false });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          renderer.setSize(host.clientWidth, host.clientHeight);
          host.appendChild(renderer.domElement);
          const scene = new THREE.Scene();
          // The scan is cut out round the building; the brand navy fills the space around it.
          scene.background = new THREE.Color(0x1b2a41);
          const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.5, 2000);
          scene.add(new SparkRenderer({ renderer }));
          const splat = new SplatMesh({ url: SCENE_URL });
          // The scan is stored upside down relative to three.js: turn it half way round the z axis.
          splat.quaternion.set(0, 0, 1, 0);
          scene.add(splat);
          await splat.initialized;
          if (disposed) return;
          setState("ready");

          const path = new THREE.CatmullRomCurve3(STOPS.map((s) => new THREE.Vector3(...s.pos)));
          const looks = new THREE.CatmullRomCurve3(STOPS.map((s) => new THREE.Vector3(...s.look)));
          const pos = new THREE.Vector3();
          const look = new THREE.Vector3();
          let visible = true;
          const vis = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
          vis.observe(tour);
          const resize = () => {
            renderer.setSize(host.clientWidth, host.clientHeight);
            camera.aspect = host.clientWidth / host.clientHeight;
            camera.updateProjectionMatrix();
          };
          window.addEventListener("resize", resize);
          renderer.setAnimationLoop((t: number) => {
            if (!visible) return;
            onScroll();
            const u = ease(stopAt()) / (STOPS.length - 1);
            path.getPoint(u, pos);
            looks.getPoint(u, look);
            // A slow sway, so the scene reads as 3D even while the page is still.
            pos.x += Math.sin(t / 2600) * 0.8;
            pos.y += Math.sin(t / 3400) * 0.4;
            camera.position.copy(pos);
            camera.lookAt(look);
            renderer.render(scene, camera);
          });
          cleanup = () => {
            renderer.setAnimationLoop(null);
            vis.disconnect();
            window.removeEventListener("resize", resize);
            splat.dispose();
            renderer.dispose();
            host.replaceChildren();
          };
        } catch (err) {
          console.error("[splat]", err);
          if (!disposed) setState("error");
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(tour);

    return () => {
      disposed = true;
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cleanup();
    };
  }, []);

  const scenario = STOPS[active]?.scenario;
  const scenarios = STOPS.flatMap((s) => (s.scenario ? [s.scenario] : []));

  if (state === "still") {
    return (
      <section id="see-how-it-works" className="splat-tour" data-state="still" data-testid="splat-tour">
        <div className="wrap">
          <Intro />
          <ol className="splat-tour__list">
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
          <p className="splat-tour__caption">
            {CAPTION} {SCAN_CREDIT}.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={tourRef} id="see-how-it-works" className="splat-tour" data-state={state} data-active={active} data-testid="splat-tour" style={{ height: `${STOPS.length * 100}vh` }}>
      <div className="splat-tour__stage">
        <div ref={canvasHost} className="splat-tour__canvas" aria-hidden />
        <div className="splat-tour__overlay">
          <div className="splat-tour__head" data-on={active === 0}>
            <Intro />
            {state === "loading" && (
              <p className="splat-tour__note">Loading the 3D scene&hellip;</p>
            )}
            {state === "error" && <p className="splat-tour__note">The 3D scene couldn&rsquo;t load.</p>}
          </div>
          <p className="splat-tour__credit">{SCAN_CREDIT}</p>
          {scenario && (
            <div className="ask splat-tour__ask" key={active}>
              <div className="ask__window">
                <div className="ask__chrome">
                  <span className="ask__dot" aria-hidden="true" />
                  <span className="ask__dot" aria-hidden="true" />
                  <span className="ask__dot" aria-hidden="true" />
                  <span className="ask__title">{scenario.title}</span>
                </div>
                <Ask scenario={scenario} />
              </div>
              <p className="splat-tour__caption">{CAPTION}</p>
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
      <h2>See how it works</h2>
      <p className="splat-tour__lede">
        The following scenarios demonstrate how Stratasphere can help a council work through real-world questions. Each
        example uses a fictional strata and is intended to illustrate the workflow, not to replace council&rsquo;s
        judgment or legal advice.
      </p>
    </>
  );
}
