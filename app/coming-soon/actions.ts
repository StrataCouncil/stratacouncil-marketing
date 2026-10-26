"use server";

/**
 * "Request a demo" on the home page (and the old Coming soon page). The
 * request itself lives in the app (lib/demo-requests-server.ts there):
 * this posts the form to /api/demo-requests and passes back what it says.
 * The app checks the fields, saves the request for the Super Admin
 * console, and emails staff a notice.
 */

const APP_URL = (process.env.APP_URL || "https://app.stratacouncil.ca").replace(/\/+$/, "");
const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export type DemoRequestState = { status: "idle" | "sent" | "error"; message?: string; name?: string; email?: string };

export async function requestDemo(_prev: DemoRequestState, form: FormData): Promise<DemoRequestState> {
  const name = String(form.get("name") ?? "");
  const email = String(form.get("email") ?? "");
  // Errors hand back what was typed, so the form keeps it.
  const kept = { name, email };
  const failed = { status: "error" as const, message: "Something went wrong. Please try again, or email support@stratacouncil.ca.", ...kept };

  // The campaign tags the visitor arrived with (components/CampaignTags.tsx), if any.
  const campaign = Object.fromEntries(CAMPAIGN_KEYS.map((key) => [key, String(form.get(key) ?? "")]).filter(([, value]) => value));

  const res = await fetch(`${APP_URL}/api/demo-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      page: form.get("page") === "home" ? "home" : "coming-soon",
      campaign,
      website: String(form.get("website") ?? ""),
    }),
    cache: "no-store",
  }).catch((err: unknown) => {
    console.error("[requestDemo] request failed", err instanceof Error ? err.message : err);
    return null;
  });
  if (!res) return failed;

  const data = (await res.json().catch(() => null)) as { status?: string; message?: string } | null;
  if (data?.status === "sent") return { status: "sent" };
  if (data?.status === "error" && data.message) return { status: "error", message: data.message, ...kept };
  console.error("[requestDemo] app replied", res.status);
  return failed;
}
