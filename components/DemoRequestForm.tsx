"use client";

import { useActionState } from "react";
import { requestDemo, type DemoRequestState } from "@/app/coming-soon/actions";

/**
 * Name and email; app/coming-soon/actions.ts emails them to Jeremy.
 * `page` says where it was asked from (it's in the email); `intro` is an
 * optional line under the title.
 */
export function DemoRequestForm({ page, intro }: { page: "home" | "coming-soon"; intro?: React.ReactNode }) {
  const [state, action, pending] = useActionState<DemoRequestState, FormData>(requestDemo, { status: "idle" });

  if (state.status === "sent") {
    return (
      <p className="demo-request__done" role="status">
        Thanks. We&rsquo;ll be in touch soon to set up your demo.
      </p>
    );
  }

  return (
    <form className="demo-request" action={action}>
      <h3 className="demo-request__title">Request a demo</h3>
      {intro && <p className="small">{intro}</p>}
      <input type="hidden" name="page" value={page} />
      <div className="demo-request__fields">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} defaultValue={state.name} />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={254} defaultValue={state.email} />
        </label>
        {/* Hidden from people; bots fill it in. */}
        <label className="demo-request__trap" aria-hidden="true">
          <span>Website</span>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {state.status === "error" && (
        <p className="demo-request__error" role="alert">
          {state.message}
        </p>
      )}
      <button type="submit" className="button button-primary" disabled={pending}>
        {pending ? "Sending…" : "Request a demo"}
      </button>
    </form>
  );
}
