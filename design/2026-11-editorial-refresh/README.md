# Editorial refresh (November 2026, built)

The home page rebuilt to the approved design (`approved-design.jpg`): warmer,
more human, and less like a generic software site. Built on the existing
CSS, not a parallel system; the app is unchanged.

## Layout

- **Header:** a flat cream bar with a thin rule beneath, sticky. Links,
  Sign in, and one button, Start free training.
- **Hero:** "Learn. Decide. Remember." with a short clay rule, the headline
  with *better* in clay italic, the two buttons, and the hero illustration:
  the three council members cut out on a transparent ground, no room
  behind them, shown as drawn.
- **The three tools:** alternating rows divided by thin rules, each with an
  illustrated laptop on one side, running out to the page edge, and the
  words on the other, a thin clay rule between them. Each laptop
  illustration was drawn for its row (Meeting Mode with its mug). The live app demos (TrainingPreview, MeetingAgenda,
  StratasphereDemo) run on the laptops' screens: `components/Device.tsx`
  places each demo over the drawn screen (percentages per illustration in
  `.device--training` and so on) and scales it from three times the
  screen's width, so it runs as it does full size.
- **For strata managers:** the one dark band, with the illustration of a
  council member at a laptop above the list.
- **Pricing, plan comparison, and questions:** unchanged.
- **Take a closer look:** the words, Request a demo and Start free training,
  and the meeting illustration. Request a demo opens the demo request form
  in place (`components/DemoReveal.tsx`), and so does arriving at `/#demo`,
  so every Request a demo link still reaches the form.

## Colour and type

- The page is a warm cream (`--cream`); navy, clay, and paper keep their
  exact values. Supporting tokens: `--petrol`, `--teal`, `--terracotta`,
  `--sand`. Teal and terracotta fail contrast as text on cream (about 3:1):
  illustrations and accents only.
- Fraunces and Work Sans as before, larger: the display sizes, tighter
  headline spacing. Buttons have squared corners, matching the app.

## Illustrations

One set, made with an AI image tool whose terms allow commercial use, on
transparent backgrounds, in `public/illustrations` at 1400px wide:
`hero`, `training`, `meeting-mode`, `stratasphere`, `managers` (the
council member at a laptop), `closer-look`. People are warm and smiling; no lettering, buildings as a
motif, or fake app screens (the laptops show the real demos). The
original reference image from the brief is not used anywhere.

## Copy

The three tools use the approved design's short lines, with two kept
accurate: Council Training is "free, on-demand lessons, guides, and
templates" (it is lessons, not courses), and Meeting Mode's minutes are
"draft minutes", not AI-assisted (they are drafted from the meeting
record). The fictional-strata and Strata Property Act notes sit under the
rows. Headlines keep the site's Fraunces 500 with its usual tracking; only
the layout changed.
