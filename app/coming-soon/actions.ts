"use server";

/**
 * "Request a demo" on the Coming soon page and the home page: a name and email, emailed to
 * Jeremy through Mailtrap (the same sending API the app uses). Sent from
 * the no-reply address, with Reply-To set to the person asking, so
 * answering the email goes straight to them.
 *
 * Needs MAILTRAP_API_TOKEN in the marketing Vercel project (and, optionally,
 * MAILTRAP_SENDER_EMAIL; the default is noreply@stratacouncil.ca).
 */

const MAILTRAP_SEND_URL = "https://send.api.mailtrap.io/api/send";
const DEMO_REQUESTS_TO = "jeremy@stratacouncil.ca";
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export type DemoRequestState = { status: "idle" | "sent" | "error"; message?: string; name?: string; email?: string };

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function requestDemo(_prev: DemoRequestState, form: FormData): Promise<DemoRequestState> {
  // A field people never see: anything in it is a bot. Look successful so it doesn't retry.
  if (String(form.get("website") ?? "").trim()) return { status: "sent" };

  const name = String(form.get("name") ?? "").trim().replace(/\s+/g, " ");
  const where = form.get("page") === "home" ? "the home page" : "the Coming soon page";
  const email = String(form.get("email") ?? "").trim();
  // Errors hand back what was typed, so the form keeps it.
  const kept = { name, email };
  if (!name || name.length > 120) return { status: "error", message: "Please enter your name.", ...kept };
  if (!EMAIL.test(email) || email.length > 254) return { status: "error", message: "Please enter a valid email address.", ...kept };

  const token = process.env.MAILTRAP_API_TOKEN;
  if (!token) {
    console.error("[requestDemo] MAILTRAP_API_TOKEN is not set");
    return { status: "error", message: `Something went wrong. Please email ${DEMO_REQUESTS_TO} instead.`, ...kept };
  }

  const res = await fetch(MAILTRAP_SEND_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: { email: process.env.MAILTRAP_SENDER_EMAIL ?? "noreply@stratacouncil.ca", name: "StrataCouncil.ca" },
      to: [{ email: DEMO_REQUESTS_TO }],
      reply_to: { email, name },
      subject: `Demo request: ${name}`,
      text: `${name} (${email}) asked for a demo on ${where}.\n\nReply to this email to answer them.`,
      html: `<p><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}) asked for a demo on ${where}.</p><p>Reply to this email to answer them.</p>`,
      category: "demo_request",
    }),
  }).catch((err: unknown) => {
    console.error("[requestDemo] send failed", err instanceof Error ? err.message : err);
    return null;
  });
  if (!res?.ok) {
    if (res) console.error("[requestDemo] Mailtrap", res.status, await res.text().catch(() => ""));
    return { status: "error", message: `Something went wrong. Please email ${DEMO_REQUESTS_TO} instead.`, ...kept };
  }
  return { status: "sent" };
}
