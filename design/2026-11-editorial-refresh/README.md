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
- **The three tools:** alternating rows divided by thin rules, eyebrowed
  Learn, Decide, and Remember, each with a large illustrated laptop on one
  side and the words on the other, a thin clay rule between them. The
  laptops are sized by width (up to 195% of their column, less on narrower
  windows so the screen stays 16px inside the page) so the screens can be
  read: each screen's inner edge sits at the column edge, and the rest of
  the drawing runs off the page and behind the words and the clay rule,
  with no fade. Each laptop
  illustration was drawn for its row (Meeting Mode with its mug). The live app demos (TrainingPreview, MeetingAgenda,
  StratasphereDemo) run on the laptops' screens: `components/Device.tsx`
  places each demo over the drawn screen (percentages per illustration in
  `.device--training` and so on) and scales it down from 160% of the
  screen's width (220% on phones), so the screens can be read.
- **For strata managers:** a dark band, with the illustration of a
  council member at a laptop above the list.
- **Pricing:** the Stratasphere plan is the one on offer, so it is the
  highlighted card: navy, lifted, with the clay button. Free and Enterprise
  have outline buttons.
- **Questions and answers:** a navy band, white questions, light answers,
  clay plus signs.
- **Take a closer look:** the words (with a link to start the free
  training), the demo request form shown outright, and the meeting
  illustration. Every Request a demo link lands on `/#demo`.

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
council member at a laptop), `closer-look`. The Stratasphere drawing's pen
cup was painted out (it sat behind the headline once the laptops grew). People are warm and smiling; no lettering, buildings as a
motif, or fake app screens (the laptops show the real demos). The
original reference image from the brief is not used anywhere.

## Copy

The three tools use the approved design's short lines, with two kept
accurate: Council Training is "free, on-demand lessons, guides, and
templates" (it is lessons, not courses), and Meeting Mode's minutes are
"draft minutes", not AI-assisted (they are drafted from the meeting
record). The note about the fictional strata and the Strata Property Act
under the rows was removed. Headlines keep the site's Fraunces 500 with its usual tracking; only
the layout changed.
