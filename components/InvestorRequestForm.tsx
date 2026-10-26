"use client";

import { useActionState } from "react";
import { requestInvestorBriefing, type InvestorRequestState } from "@/app/actions/investor";

/** The Legal Disclaimer, on its own page in the app. */
const DISCLAIMER_URL = "https://app.stratacouncil.ca/investors/disclaimer";

/**
 * The investor briefing sign-up, laid out like DemoRequestForm so the two
 * cards match: name, email, the disclaimer and the accredited-investor
 * confirmation. app/actions/investor.ts sends it to the app, which emails
 * the personal link.
 */
export function InvestorRequestForm() {
  const [state, action, pending] = useActionState<InvestorRequestState, FormData>(requestInvestorBriefing, {
    status: "idle",
  });

  if (state.status === "sent") {
    return (
      <div className="site-form site-form--done" role="status">
        <h3>Please check your email</h3>
        <p className="small">
          We&rsquo;ve sent your personal link to the investor briefing{state.email ? ` to ${state.email}` : ""}. It works
          for 30 days.
        </p>
      </div>
    );
  }

  return (
    <form className="site-form" action={action}>
      <h3>Investor briefing</h3>
      <p className="small">
        For prospective investors. Enter your details and we&rsquo;ll email you a personal link to the briefing.
      </p>
      <div className="site-form__fields">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} defaultValue={state.name} />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={254} defaultValue={state.email} />
        </label>
        {/* Hidden from people; bots fill it in. */}
        <label className="site-form__trap" aria-hidden="true">
          <span>Website</span>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="site-form__check">
          <input type="checkbox" name="disclaimer" required />
          <span>
            I have read and accept the{" "}
            <a href={DISCLAIMER_URL} target="_blank" rel="noopener noreferrer">
              Legal Disclaimer
            </a>
            .
          </span>
        </label>
        <label className="site-form__check">
          <input type="checkbox" name="accredited" required />
          <span>I confirm that I am an accredited investor, as defined in National Instrument 45-106 Prospectus Exemptions.</span>
        </label>
      </div>
      {state.status === "error" && (
        <p className="site-form__error" role="alert">
          {state.message}
        </p>
      )}
      <button type="submit" className="button button-primary site-form__submit" disabled={pending}>
        {pending ? "Sending…" : "Email me the briefing"}
      </button>
    </form>
  );
}
