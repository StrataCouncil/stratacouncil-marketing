"use client";

import { useEffect } from "react";
import { SIGNUP_URL } from "@/components/SiteChrome";

/**
 * Campaign attribution, free version (doc10 §4.5). When someone arrives on
 * a link with campaign tags (utm_source and friends, as in our social
 * posts), the browser keeps the first set for 90 days. Every sign-up link
 * on the page then carries them to the app, which saves them on the new
 * account (app migration 0066), and the demo request form sends them
 * along. Nothing identifies the visitor; without storage it simply does
 * nothing.
 */
export const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export type Campaign = Partial<Record<(typeof CAMPAIGN_KEYS)[number], string>>;

const STORAGE_KEY = "sc_campaign";
const KEEP_MS = 90 * 24 * 60 * 60 * 1000;

function fromSearch(search: string): Campaign | null {
  const params = new URLSearchParams(search);
  const out: Campaign = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key)?.trim().slice(0, 100);
    if (value) out[key] = value;
  }
  return Object.keys(out).length ? out : null;
}

/** The kept campaign tags, if any and not older than 90 days. */
export function storedCampaign(): Campaign | null {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as { tags?: Campaign; at?: number } | null;
    if (!saved?.tags || typeof saved.at !== "number" || Date.now() - saved.at > KEEP_MS) return null;
    return saved.tags;
  } catch {
    return null;
  }
}

export function CampaignTags() {
  useEffect(() => {
    const arrived = fromSearch(window.location.search);
    // First touch: a new campaign only replaces one that has expired.
    if (arrived && !storedCampaign()) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ tags: arrived, at: Date.now() }));
      } catch {
        // Storage blocked: the tags still go on this page's sign-up links below.
      }
    }
    const tags = storedCampaign() ?? arrived;
    if (!tags) return;
    document.querySelectorAll<HTMLAnchorElement>(`a[href^="${SIGNUP_URL}"]`).forEach((a) => {
      const url = new URL(a.href);
      for (const [key, value] of Object.entries(tags)) if (value) url.searchParams.set(key, value);
      a.href = url.toString();
    });
  }, []);

  return null;
}
