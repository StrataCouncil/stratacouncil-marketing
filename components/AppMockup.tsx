/**
 * A placeholder mockup frame for product screenshots we don't have yet
 * (the Training platform, StrataSphere). Deliberately abstract — bars
 * and blocks standing in for real UI, not a fabricated screenshot of a
 * product that doesn't exist. Swap each one out for a real screenshot
 * as the app design comes together; the "Preview" label should come
 * off at that point too.
 */
export function AppMockup({
  label,
  variant,
}: {
  label: string;
  variant: "training" | "stratasphere";
}) {
  return (
    <div className="app-mockup">
      <div className="app-mockup__chrome">
        <span className="app-mockup__dot" />
        <span className="app-mockup__dot" />
        <span className="app-mockup__dot" />
        <span className="app-mockup__url">app.stratacouncil.ca</span>
      </div>
      <div className="app-mockup__body">
        {variant === "training" ? <TrainingSkeleton /> : <SphereSkeleton />}
      </div>
      <div className="app-mockup__label">{label} &mdash; preview</div>
    </div>
  );
}

function TrainingSkeleton() {
  return (
    <div className="app-mockup__grid">
      <aside className="app-mockup__sidebar">
        <span className="skel skel--title" />
        {[0, 1, 2, 3].map((i) => (
          <span
            className={`skel skel--nav ${i === 1 ? "skel--nav-active" : ""}`}
            key={i}
          />
        ))}
      </aside>
      <main className="app-mockup__main">
        <span className="skel skel--heading" />
        <div className="app-mockup__cards">
          {[0, 1, 2].map((i) => (
            <div className="app-mockup__card" key={i}>
              <span className="skel skel--bar skel--bar-accent" />
              <span className="skel skel--line" />
              <span className="skel skel--line skel--line-short" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function SphereSkeleton() {
  return (
    <div className="app-mockup__grid">
      <aside className="app-mockup__sidebar">
        <span className="skel skel--title" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            className={`skel skel--nav ${i === 2 ? "skel--nav-active" : ""}`}
            key={i}
          />
        ))}
      </aside>
      <main className="app-mockup__main">
        <span className="skel skel--heading" />
        <div className="app-mockup__table">
          {[0, 1, 2, 3].map((i) => (
            <div className="app-mockup__row" key={i}>
              <span className="skel skel--line skel--line-wide" />
              <span className="skel skel--pill" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
