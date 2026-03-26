# CLAUDE.md — jessehirsh.com

Working instructions for Claude Code on this project.

## Project overview

jessehirsh.com is a speaking-first professional site for Jesse Hirsh: keynotes, briefings, and consulting for leaders navigating AI, media, and systems disruption. The primary conversion goal is speaking gig bookings via email.

**Stack:** Eleventy 2.x · Nunjucks templates · single CSS file · no JS build step
**Commands:** `npm run dev` (dev server) · `npm run build` (production)
**Source:** `src/` → built to `_site/` · deployed via Cloudflare Pages

---

## Architecture

```
src/
  index.md                  # Home page (home.njk layout)
  speaking/index.md         # Speaking sales page
  speaking/endorsements.md  # Full endorsement list
  topics/index.md           # Topic catalog
  topics/*.md               # Individual topic pages (order: N in front matter)
  media/index.md
  about/index.md
  contact/index.md
  404.md
  brief/index.md            # AI briefing generator page
  hire/index.md             # Hire Jesse — broader engagement types beyond speaking
  future-herd/index.md      # The Future Herd page

  _includes/
    layouts/
      base.njk              # HTML shell, <head>, meta, OG tags
      home.njk              # Home layout (extends base)
      page.njk              # All other pages (extends base)
    partials/
      nav.njk               # Light header, aria-current active state
      footer.njk            # Booking email + LinkedIn
      cta.njk               # Reusable CTA button
      card.njk              # Topic card

  _data/
    site.json               # siteName, bookingEmail, CTA defaults, url, OG image, LinkedIn
    currentFocus.json       # Jesse's active/timely topic — update when focus shifts
    endorsements.json       # Testimonials
    engagements.json        # Speaking history

  assets/
    css/site.css            # Single CSS file — all styles here
    img/                    # Images (passthrough copy)
```

### Topics system
- Topic pages live in `src/topics/` with `tags: topics` and `order: N` in front matter
- `.eleventy.js` sorts the `topics` collection by `data.order`
- Required front matter: `tags: topics`, `order: N`, `cardDek: "short description"`
- Adding a topic = create a new `.md` file; grids auto-update

### currentFocus.json
Drives the "Speaking now" featured block on home and topics pages. Fields:
- `title` — topic name
- `hook` — one-line framing
- `bookingSubject` — URL-encoded email subject line

Update this file whenever Jesse's current speaking focus shifts.

### CTA partial
`cta.njk` resolves in this order: `ctaLabel`/`ctaHref` front matter → `cta.label`/`cta.href` → `site.json` defaults.

---

## Content and tone

- **Audience:** Conference organizers, associations, public institutions, media producers
- **Voice:** Concrete, outcome-driven, decision-grade. No hype, no "visionary" language, no emojis
- **Frame:** What outcomes does the audience leave with? What can be booked? What's the proof?
- **Farm:** Jesse's farm is a systems-thinking lens, not a speaking topic — mention in About, not elsewhere
- **Booking email:** speaking@jessehirsh.com (single constant in `site.json`)
- **CTA minimum:** 3× on home, 2× on topic pages

Do not rewrite meaning when editing copy. Tighten for clarity and consistency only.

---

## Design constraints

- **Typography:** System font stack · h1: `clamp(1.75rem, 5vw, 2.75rem)` weight 800 · h2: bottom border
- **Layout:** Max-width container (~70ch) · mobile-first · no horizontal scroll
- **Colors:** Light header (`#ffffff` bg, `var(--border)` bottom rule) · dark/muted nav links · `--link` blue for CTAs, active nav, and hover states
- **Cards:** `border-radius: 0.25rem` · border-color hover transition to `--link`
- **Video:** `.video-wrapper` class for responsive 16:9 iframes
- **No heavy animation.** Accessible, high-contrast, visible focus styles.
- All styles in `src/assets/css/site.css` — do not add separate CSS files

---

## Dev guidelines

- Prefer editing existing files over creating new ones
- Do not run `npm run dev` unless explicitly requested — use `npm run build` to verify
- Do not add JS unless strictly necessary — keep the site static
- Do not add features beyond what is requested
- Internal links must remain valid after any restructure
- No placeholder or lorem ipsum content

---

## Key facts about Jesse

- Canadian professional speaker, futurist farmer, researcher, and strategist
- Co-hosts **Metaviews to the Future** podcast: https://news.metaviews.ca/episodes/
- Long-running CBC Metro Morning tech columnist
- Speaker bureau profiles: NSB / Talent Bureau / Global Speakers
- IMDb: https://www.imdb.com/name/nm5513595/
- LinkedIn: https://www.linkedin.com/in/jessehirsh/

---

## Current topic pages (as of 2026-03)

| Order | Slug | Title |
|-------|------|-------|
| 1 | future-of-authority | Future of Authority |
| 2 | ai-literacy | AI Literacy |
| 3 | disinformation | Disinformation |
| 4 | agentic-turn | The Agentic Turn |

`agroecology` was removed — farm is a background lens only, not a speaking topic.

---

## Briefing generator

- Page: `/brief/` — form where visitors describe their org/event
- Cloudflare Pages Function: `functions/api/brief.js` — POST `/api/brief`
- Calls OpenRouter API (`google/gemini-2.0-flash-001`) with a system prompt grounded in Jesse's topics, voice, and formats
- Returns: recommended topic, suggested format, 3 outcome bullets, draft booking email
- Client JS: `src/assets/js/brief.js` (vanilla, no dependencies, renders basic markdown to HTML)
- API key: `OPENROUTER_API_KEY` env var — set in Cloudflare Pages dashboard, never committed to repo

## Deployment

GitHub → Cloudflare Pages (configured). Push to `main` to deploy.
