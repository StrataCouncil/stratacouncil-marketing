"use client";

import { useActionState, useEffect, useState } from "react";
import { CAMPAIGN_KEYS, storedCampaign, type Campaign } from "@/components/CampaignTags";
import { requestDemo, type DemoRequestState } from "@/app/coming-soon/actions";

/**
 * Name and email; app/coming-soon/actions.ts emails them to Jeremy.
 * `page` says where it was asked from (it's in the email); `intro` is an
 * optional line under the title; `legal` adds the Privacy Policy and Terms
 * links under the button. Laid out like InvestorRequestForm.
 */
export function DemoRequestForm({
  page,
  intro,
  legal = false,
}: {
  page: "home" | "coming-soon";
  intro?: React.ReactNode;
  legal?: boolean;
}) {
  const [state, action, pending] = useActionState<DemoRequestState, FormData>(requestDemo, { status: "idle" });
  // The campaign the visitor arrived with, if any, so the email says which post brought them.
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  useEffect(() => setCampaign(storedCampaign()), []);

  if (state.status === "sent") {
    return (
      <div className="site-form site-form--done" role="status">
        <h3>Thanks</h3>
        <p className="small">We&rsquo;ll be in touch soon to set up your demo.</p>
      </div>
    );
  }

  return (
    <form className="site-form" action={action}>
      <h3>Request a demo</h3>
      {intro && <p className="small">{intro}</p>}
      <input type="hidden" name="page" value={page} />
      {campaign &&
        CAMPAIGN_KEYS.map((key) => (campaign[key] ? <input key={key} type="hidden" name={key} value={campaign[key]} /> : null))}
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
      </div>
      {state.status === "error" && (
        <p className="site-form__error" role="alert">
          {state.message}
        </p>
      )}
      <button type="submit" className="button button-primary site-form__submit" disabled={pending}>
        {pending ? "Sending…" : "Request a demo"}
      </button>
      {legal && (
        <p className="site-form__legal">
          <a href="/privacy">Privacy Policy</a>
          <span aria-hidden="true">&middot;</span>
          <a href="/terms">Terms &amp; Conditions</a>
        </p>
      )}
    </form>
  );
}
