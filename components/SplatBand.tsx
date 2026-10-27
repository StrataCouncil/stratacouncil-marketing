"use client";

import { useEffect, useRef, useState } from "react";

/**
 * TEST ONLY (unlisted /lab/splat): a Gaussian-splat scene in a full-width
 * band, the camera drifting as the visitor scrolls, with history labels
 * fading in. Loads three.js and Spark only when the band comes into view.
 * People who prefer reduced motion, or whose browser lacks WebGL2, get a
 * still note instead. The sample scene is Spark's own example, loaded from
 * sparkjs.dev and not copied here: its licence isn't stated, so it is for
 * this test only, never for the live home page.
 */
const SAMPLE_URL = "https://sparkjs.dev/assets/splats/snow-street.spz";

const LABELS = [
  { at: 0.2, year: "2019", text: "Roof membrane replaced, 3/4 vote at the AGM" },
  { at: 0.45, year: "2022", text: "Bylaw amended for EV chargers" },
  { at: 0.7, year: "2024", text: "Depreciation report received and filed" },
];

export function SplatBand() {
  const bandRef = useRef<HTMLElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "still" | "error">("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;
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

    let disposed = false;
    let cleanup = () => {};
    const onScroll = () => {
      const r = band.getBoundingClientRect();
      const total = r.height + window.innerHeight;
      setProgress(Math.min(1, Math.max(0, (window.innerHeight - r.top) / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setState("loading");
        try {
          const THREE = await import("three");
          const { SparkRenderer, SplatMesh } = await import("@sparkjsdev/spark");
          if (disposed || !canvasHost.current) return;
          const host = canvasHost.current;
          const renderer = new THREE.WebGLRenderer({ antialias: false });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          renderer.setSize(host.clientWidth, host.clientHeight);
          host.appendChild(renderer.domElement);
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(55, host.clientWidth / host.clientHeight, 0.01, 1000);
          scene.add(new SparkRenderer({ renderer }));
          const splat = new SplatMesh({ url: SAMPLE_URL });
          // Spark's examples are stored upside down relative to three.js.
          splat.quaternion.set(1, 0, 0, 0);
          // Centre the sample street on the origin (measured from its splat positions).
          splat.position.set(-4.5, -15.5, -94);
          scene.add(splat);
          await splat.initialized;
          if (disposed) return;
          setState("ready");

          let visible = true;
          const vis = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
          vis.observe(band);
          const resize = () => {
            renderer.setSize(host.clientWidth, host.clientHeight);
            camera.aspect = host.clientWidth / host.clientHeight;
            camera.updateProjectionMatrix();
          };
          window.addEventListener("resize", resize);
          renderer.setAnimationLoop((t: number) => {
            if (!visible) return;
            const r = band.getBoundingClientRect();
            const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (r.height + window.innerHeight)));
            // Orbit slowly round the scene as the visitor scrolls, drawing a little closer.
            const a = -0.6 + p * 0.9 + Math.sin(t / 6000) * 0.02;
            const d = 30 - p * 8;
            camera.position.set(Math.sin(a) * d, 4, Math.cos(a) * d);
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
          });
          cleanup = () => {
            renderer.setAnimationLoop(null);
            vis.disconnect();
            window.removeEventListener("resize", resize);
            renderer.dispose();
            host.replaceChildren();
          };
        } catch (err) {
          console.error("[splat]", err);
          if (!disposed) setState("error");
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(band);

    return () => {
      disposed = true;
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cleanup();
    };
  }, []);

  return (
    <section ref={bandRef} className="splat-band" data-state={state} data-testid="splat-band">
      <div ref={canvasHost} className="splat-band__canvas" aria-hidden />
      <div className="splat-band__overlay">
        <p className="eyebrow">Every building has a history</p>
        <h2>Your council&rsquo;s decisions, kept with the building</h2>
        <ol className="splat-band__labels">
          {LABELS.map((l) => (
            <li key={l.year} data-on={progress >= l.at || state === "still"}>
              <strong>{l.year}</strong> {l.text}
            </li>
          ))}
        </ol>
        {state === "loading" && <p className="splat-band__note">Loading the 3D scene&hellip;</p>}
        {state === "still" && <p className="splat-band__note">Still view: motion is off on this device.</p>}
        {state === "error" && <p className="splat-band__note">The 3D scene couldn&rsquo;t load.</p>}
      </div>
    </section>
  );
}
