import type { Metadata } from "next";
import { SplatTour } from "@/components/SplatTour";

/** Unlisted test of a Gaussian-splat tour (not linked, not indexed, not in the sitemap). */
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
            A 3D scan of two towers, standing in for a scan of a real strata building. Scroll slowly through the dark section
            below: the camera flies to the roof, the balconies and the parking, and Stratasphere answers a question about
            each. The strata and its records are fictional.
          </p>
          <p className="lede">
            The scan is a SuperSplat scene, loaded from SuperSplat&rsquo;s servers for this test only. It is about 15 MB, so
            give it a moment, and it looks best on a computer with a graphics card.
          </p>
        </div>
      </section>
      <SplatTour />
      <section className="section">
        <div className="wrap section-head">
          <p className="lede">End of the test.</p>
        </div>
      </section>
    </main>
  );
}
