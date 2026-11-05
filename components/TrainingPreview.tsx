/**
 * The Council Training section's illustration: one screen of a module, a
 * knowledge check answered and explained. Still, on purpose: the home page
 * keeps movement to the Meeting Mode walkthrough.
 */

const OPTIONS = ["Each owner, for the area outside their door", "The strata corporation, acting through council", "The strata manager"];
const CORRECT = 1;

export function TrainingPreview() {
  const screenNo = 5;

  return (
    <div className="lesson" data-testid="training-preview" aria-hidden="true">
      <div className="lesson__window">
        <div className="lesson__bar">
          <span className="lesson__title">Check your understanding</span>
          <span className="lesson__count">{screenNo} / 14</span>
        </div>
        <div className="lesson__body">
          <p className="lesson__text">Who is responsible for repairing and maintaining common property?</p>
          <ul className="lesson__options">
            {OPTIONS.map((o, i) => (
              <li key={o} data-state={i === CORRECT ? "right" : "dim"}>
                <span className="lesson__radio" />
                {o}
              </li>
            ))}
          </ul>
          <p className="lesson__feedback" data-shown={true}>
            <strong>Correct.</strong> The strata corporation is responsible for repairing and maintaining common property
            under section 72 of the Strata Property Act. Council carries out the corporation&rsquo;s responsibilities,
            subject to the Act and the strata&rsquo;s bylaws.
          </p>
        </div>
        <div className="lesson__progress">
          <span style={{ width: `${(screenNo / 14) * 100}%` }} />
        </div>
      </div>
      <p className="ask__caption">Strata Basics &middot; What Is a Strata Corporation?</p>
    </div>
  );
}
