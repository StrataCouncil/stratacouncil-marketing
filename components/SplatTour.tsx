"use client";

import { useEffect, useRef, useState } from "react";

/**
 * TEST ONLY (unlisted /lab/splat): a scroll-driven tour of a Gaussian-splat
 * scan. As the visitor scrolls, the camera flies between stops on the
 * building (the roof, the balconies, the parking) and, at each one, a
 * Stratasphere window asks and answers a question about a decision made
 * there. Loads three.js and Spark only when the tour comes into view.
 * People who prefer reduced motion, or whose browser lacks WebGL2, get the
 * questions and answers as a plain list instead.
 *
 * The scan is a SuperSplat scene loaded from SuperSplat's own servers and
 * not copied here: its owner and licence aren't known, so it is for this
 * test only. The strata (Larchwood Commons, the demo strata) and its
 * records are fictional; owners appear by strata lot number only.
 */
const SCENE_URL = "https://d28zzqy0iyovbz.cloudfront.net/f4d775e4/v1/scene.compressed.ply";

type Vec = [number, number, number];
type Kind = "bylaw" | "rule" | "decision" | "law" | "record";

interface Source {
  kind: Kind;
  label: string;
  text: string;
  meta: string;
}

interface Stop {
  place?: string;
  /** Camera position and the point it looks at, in the scan's coordinates (y up, after the flip below). */
  pos: Vec;
  look: Vec;
  question?: string;
  sources?: Source[];
  answer?: string;
}

const STOPS: Stop[] = [
  { pos: [83.8, 95, 77.8], look: [6, 45, 0] },
  {
    place: "Roof",
    pos: [18.4, 100, 38.6],
    look: [8, 76, 0],
    question: "When was the roof last replaced, and how did we pay for it?",
    sources: [
      {
        kind: "decision",
        label: "Owners' resolution · March 2019",
        text: "A $412,000 special levy to replace the roof membrane, approved by a 3/4 vote.",
        meta: "Special general meeting minutes, March 12, 2019",
      },
      {
        kind: "law",
        label: "Strata Property Act, s. 108",
        text: "A special levy must be approved by a 3/4 vote at an annual or special general meeting.",
        meta: "BC legislation",
      },
      {
        kind: "record",
        label: "Depreciation report · 2024",
        text: "Roof membrane in good condition; next replacement expected around 2044.",
        meta: "Larchwood Commons documents",
      },
    ],
    answer:
      "The membrane was replaced in 2019, paid for by a $412,000 special levy that owners approved by a 3/4 vote at a special general meeting, as section 108 requires. The 2024 depreciation report expects the next replacement around 2044.",
  },
  {
    place: "Balconies",
    pos: [46.5, 45, 6.1],
    look: [12, 45, 0],
    question: "SL58 wants to tile their balcony. What do they need?",
    sources: [
      {
        kind: "record",
        label: "Strata plan",
        text: "Each balcony is limited common property for the strata lot it adjoins.",
        meta: "Larchwood Commons documents",
      },
      {
        kind: "bylaw",
        label: "Bylaw 6.1",
        text: "An owner must have the strata corporation's written approval before altering common property, including limited common property.",
        meta: "Larchwood Commons registered bylaws",
      },
      {
        kind: "decision",
        label: "Council decision · June 2025",
        text: "Approved SL41's balcony tile, on condition the owner signed an agreement taking responsibility for it.",
        meta: "Council meeting minutes, June 3, 2025",
      },
    ],
    answer:
      "Council's written approval first: the balcony is limited common property, so Bylaw 6.1 applies. In June 2025 council approved the same request from SL41 on condition of a signed alteration agreement, so those terms would be consistent.",
  },
  {
    place: "Parking",
    pos: [96.7, 40, 13.8],
    look: [45, 0, -5],
    question: "Can I put an EV charger in my parking stall?",
    sources: [
      {
        kind: "rule",
        label: "Rule 12 · EV charging",
        text: "With council's written approval, an owner may install a Level 2 charger in their assigned stall, paying for the equipment, the installation and their electricity through a separate meter.",
        meta: "Larchwood Commons rules, ratified at the 2025 AGM",
      },
      {
        kind: "decision",
        label: "Council decision · September 2025",
        text: "Approved SL12's Level 2 charger in stall P1-34, on a separate meter.",
        meta: "Council meeting minutes, September 9, 2025",
      },
    ],
    answer:
      "Yes, with council's written approval. Under Rule 12 you pay for the charger, its installation and your electricity through a separate meter. Council approved the same request from SL12 in September 2025.",
  },
  { pos: [131.6, 100, 33.6], look: [6, 40, 0] },
];

const KIND_NAMES: Record<Kind, string> = {
  bylaw: "Bylaw",
  rule: "Rule",
  decision: "Decision",
  law: "Legislation",
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

function Ask({ stop }: { stop: Stop }) {
  const [typed, setTyped] = useState(0);
  const [searching, setSearching] = useState(false);
  const [shown, setShown] = useState(0);
  const [answered, setAnswered] = useState(false);
  const question = stop.question ?? "";
  const sources = stop.sources ?? [];

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
      {answered && <Answer text={stop.answer ?? ""} />}
    </div>
  );
}

function Sources({ sources }: { sources: Source[] }) {
  return (
    <ol className="ask__sources">
      {sources.map((s) => (
        <li key={s.label} className="ask__source" data-kind={s.kind}>
          <span className="ask__label">
            <span className="visually-hidden">{KIND_NAMES[s.kind]}: </span>
            {s.label}
          </span>
          <p>{s.text}</p>
          <span className="ask__meta">{s.meta}</span>
        </li>
      ))}
    </ol>
  );
}

function Answer({ text }: { text: string }) {
  return (
    <div className="ask__answer">
      <span className="ask__label">Answer</span>
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
          const camera = new THREE.PerspectiveCamera(60, host.clientWidth / host.clientHeight, 0.5, 2000);
          scene.add(new SparkRenderer({ renderer }));
          const splat = new SplatMesh({ url: SCENE_URL });
          // The scan is stored upside down and mirrored relative to three.js: turn it half way round the z axis.
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
            pos.x += Math.sin(t / 2600) * 1.2;
            pos.y += Math.sin(t / 3400) * 0.6;
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

  const stop: Stop | undefined = STOPS[active];
  const asks = STOPS.filter((s) => s.question);

  if (state === "still") {
    return (
      <section className="splat-tour" data-state="still" data-testid="splat-tour">
        <div className="wrap">
          <Intro />
          <ol className="splat-tour__list">
            {asks.map((s) => (
              <li key={s.place} className="ask">
                <div className="ask__window">
                  <div className="ask__chrome">
                    <span className="ask__title">Stratasphere&trade; &middot; {s.place}</span>
                  </div>
                  <div className="ask__body">
                    <p className="ask__question">{s.question}</p>
                    <Sources sources={s.sources ?? []} />
                    <Answer text={s.answer ?? ""} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <p className="splat-tour__caption">An example, with a fictional strata.</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={tourRef} className="splat-tour" data-state={state} data-active={active} data-testid="splat-tour" style={{ height: `${STOPS.length * 100}vh` }}>
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
          <div className="splat-tour__head" data-on={active === STOPS.length - 1}>
            <p className="eyebrow">Stratasphere&trade;</p>
            <h2>Every answer shows where it came from</h2>
            <p className="splat-tour__lede">
              Your minutes, bylaws, rules and documents, and BC strata law, in one place that stays with the strata.
            </p>
          </div>
          {stop?.question && (
            <div className="ask splat-tour__ask" key={active}>
              <div className="ask__window">
                <div className="ask__chrome" aria-hidden="true">
                  <span className="ask__dot" />
                  <span className="ask__dot" />
                  <span className="ask__dot" />
                  <span className="ask__title">Stratasphere&trade; &middot; {stop.place}</span>
                </div>
                <Ask stop={stop} />
              </div>
              <p className="splat-tour__caption">An example, with a fictional strata.</p>
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
      <p className="eyebrow">Every building has a history</p>
      <h2>Every part of the building has a decision behind it</h2>
      <p className="splat-tour__lede">Scroll to fly round the building and ask Stratasphere about each part.</p>
    </>
  );
}
