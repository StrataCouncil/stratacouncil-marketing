"use server";

/**
 * The investor briefing form on the home page. The sign-up itself lives in
 * the app (lib/investors/signup.ts there): this posts the form to
 * /api/investors/request and passes back what it says. The app checks the
 * fields, records the disclaimer and the accredited confirmation, and
 * emails the personal link.
 */

const APP_URL = (process.env.APP_URL || "https://app.stratacouncil.ca").replace(/\/+$/, "");

export type InvestorRequestState = { status: "idle" | "sent" | "error"; message?: string; name?: string; email?: string };

export async function requestInvestorBriefing(_prev: InvestorRequestState, form: FormData): Promise<InvestorRequestState> {
  const name = String(form.get("name") ?? "");
  const email = String(form.get("email") ?? "");
  const kept = { name, email };
  const failed = { status: "error" as const, message: "Something went wrong. Please try again, or email investors@stratacouncil.ca.", ...kept };

  const res = await fetch(`${APP_URL}/api/investors/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      disclaimer: form.get("disclaimer") === "on",
      accredited: form.get("accredited") === "on",
      website: String(form.get("website") ?? ""),
    }),
    cache: "no-store",
  }).catch((err: unknown) => {
    console.error("[requestInvestorBriefing] request failed", err instanceof Error ? err.message : err);
    return null;
  });
  if (!res) return failed;

  const data = (await res.json().catch(() => null)) as { status?: string; message?: string; email?: string } | null;
  if (data?.status === "sent") return { status: "sent", email: data.email ?? email };
  if (data?.status === "error" && data.message) return { status: "error", message: data.message, ...kept };
  console.error("[requestInvestorBriefing] app replied", res.status);
  return failed;
}
