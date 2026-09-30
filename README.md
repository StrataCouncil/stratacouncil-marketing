# stratacouncil-marketing

The public marketing site for [StrataCouncil.ca](https://stratacouncil.ca) — no auth, no Supabase client, optimized for speed and SEO. See the `app.stratacouncil.ca` repo for the authenticated product itself.

## Stack

Next.js (App Router) + TypeScript. Design tokens in `app/globals.css` are duplicated from the project's `05-brand-design-system.md` doc — that doc is the source of truth if the two ever disagree.

## Development

```
npm install
npm run dev
```

## Deployment

Deploys via Vercel's GitHub integration — a push to `main` deploys to production, a push to `development` deploys to the preview environment. No separate build step to run by hand.
