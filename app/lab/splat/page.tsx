import type { Metadata } from "next";
import { SplatBand } from "@/components/SplatBand";

/** Unlisted test of a Gaussian-splat band (not linked, not indexed, not in the sitemap). */
export const metadata: Metadata = {
  title: "Splat test",
  robots: { index: false, follow: false },
};

export default function SplatTestPage() {
  return (
    <main>
      <section className="section">
        <div className="wrap section-head">
          <p className="eyebrow">Test page</p>
          <h1>Gaussian splatting test</h1>
          <p className="lede">
            A sample scene from the Spark viewer&rsquo;s examples (a snowy street), standing in for a scan of a real strata
            building. Scroll slowly through the band below: the camera moves with the page, and the example history labels
            appear one by one. The years and decisions are made-up examples.
          </p>
        </div>
      </section>
      <SplatBand />
      <section className="section">
        <div className="wrap section-head">
          <p className="lede">End of the test band. On the real home page, this would sit between the hero and &ldquo;The problem&rdquo;.</p>
        </div>
      </section>
    </main>
  );
}
