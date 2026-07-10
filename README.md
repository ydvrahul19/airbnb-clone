# Airbnb Listing Clone — Take-Home Submission

A pixel-fidelity clone of the reference listing page
(`airbnb-clone-umber-two.vercel.app`), covering all three required views:
**Listing Page**, **Photo Tour**, and **Lightbox**.

## Tech stack

- **Next.js 14 (App Router) + TypeScript** — frontend framework
- **Tailwind CSS v4** — styling, using Airbnb's real design tokens (pink
  `#FF385C`, spacing scale, system font stack)
- **lucide-react** — icon set
- No backend — listing content is a static JSON file (`data/listing.json`);
  booking/reserve actions are stubbed since no backend was required
- Deployed as a standard Next.js app (Vercel-compatible out of the box)

## Content note

Per the task's IP-safety guidance, all listing copy (title, description,
host name, reviews) is **original content written in the same structure**
as the reference, not copied verbatim. Layout, spacing, component
structure, and interaction behavior match the reference; the words do not.

Property photos are the user's own uploaded images; a few sections
(co-host avatars, some nearby-stay thumbnails) use lightweight placeholders
pending additional photos.

## Structure

```
app/                  # Next.js pages (single-page app; overlays are
                       # client-state driven, not separate routes)
components/           # One component per reference section
data/listing.json     # All listing content — edit this to change copy
lib/
  types.ts             # Listing data shape
  useFocusTrap.ts       # Shared focus-trap/restoration hook for overlays
.claude/
  agents/               # Sub-agent configs used during this build
  skills/ui-cloning/     # Reusable "clone an existing UI" methodology
```

## How the three required views work

- **Listing Page**: `app/page.tsx`, composed from `components/*`
- **Photo Tour**: `components/PhotoTour.tsx`, opened via "Show all photos"
  or any grid photo; full-screen overlay, scroll-linked thumbnail→header
  transition
- **Lightbox**: `components/Lightbox.tsx`, opened from any Photo Tour image;
  arrow-key navigation, focus-trapped, returns focus to trigger on close

## Accessibility

- Skip-to-content link
- All three overlays: focus-trapped, Escape-to-close, focus restored to the
  triggering element on close
- Keyboard ←/→ navigation in the Lightbox
- `aria-live` on elements that update without a page navigation (photo
  counter, room title)
- `prefers-reduced-motion` respected
- Booking sidebar's date/guest popovers: `aria-expanded`/`aria-haspopup`,
  close on Escape and outside click

## AI workflow used for this build

Built with Claude (Sonnet), using the sub-agent roles documented in
`.claude/agents/`:

1. **reference-inventory** — walked all reference screenshots and produced
   a structural inventory (sections, elements, interaction notes) before
   any code was written
2. **component-builder** — implemented one batch of related components at
   a time against that inventory
3. **visual-qa** — after each batch, started the dev server and used
   headless-browser automation (Playwright) to screenshot and exercise
   real interactions (photo tour → lightbox → keyboard nav → escape),
   rather than only reading the code
4. **accessibility-auditor** — dedicated pass adding focus traps, focus
   restoration, and ARIA semantics, each verified by scripting the actual
   Tab/Escape behavior rather than inspecting markup alone

The general methodology is captured as a reusable skill in
`.claude/skills/ui-cloning/SKILL.md`, including pitfalls hit during this
specific build (e.g. an early version conditionally hid the price/Reserve
bar in the sticky nav when the reference actually shows it unconditionally
— caught during the visual-qa pass and corrected).

## Architecture diagram

See `architecture-diagram.png` (also `.pdf`) for the production-scale
scaling strategy: multi-region edge/CDN, API gateway, independently-scaled
microservices, sharded Postgres + Redis + OpenSearch for search, Kafka for
async events (booking/payment/review → notifications + analytics), and a
Kubernetes + CI/CD + observability platform layer.

## Running locally

```bash
npm install
npm run dev
```

## Known simplifications (scope was kept intentionally focused)

- Reserve/booking flow is stubbed (shows an alert) — no backend was in
  scope per the task's optional-backend note
- A few placeholder images remain pending additional real photos
- Map is a stylized illustrative placeholder, not a live map provider
  integration (kept scope to frontend-only per task's suggested options)
