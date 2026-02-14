# AGENTS.md

## Project
Rebuild jessehirsh.com as an Eleventy (11ty) site with a “speaking-first” conversion focus.
This is iteration 1: we are NOT integrating jessehirsh.ca content in full yet, but we ARE reusing endorsements and public-facing speaking engagement examples already curated.

## Primary goal
Maximize speaking gig conversions.

Primary CTA: email-based booking.
Use: speaking@jessehirsh.com (placeholder; keep as a single constant so it can be swapped later).

## Non-goals (for this iteration)
- Do not build a full blog or import the entire jessehirsh.ca archive.
- Do not build complex search, tagging, or pagination.
- Do not over-design with heavy JS. Keep it static, fast, and legible.
- Do not add “start here” or unnecessary onboarding pages.

## Site strategy (speaking-first)
The site should read like a high-clarity booking hub:
1) Who is this for? (organizers, associations, conferences, public institutions, media producers)
2) What outcomes do audiences leave with? (decision-grade clarity)
3) What can be booked? (formats)
4) What topics are available? (topic pages with outcomes + sample titles)
5) Proof: endorsements + selected engagements
6) Booking CTA repeated (top/mid/bottom)

## IA / Pages (v1)
- / (home, speaking-oriented landing page)
- /speaking/ (sales page + formats + proof + CTA)
- /speaking/endorsements/ (curated quotes)
- /topics/ (index)
- /topics/future-of-authority/
- /topics/ai-literacy/
- /topics/disinformation/
- /topics/agroecology/
- /media/ (authority page, curated clips/links; minimal)
- /about/ (short bio; farm as systems lens; credibility)
- /contact/ (direct booking instructions + email)

## Seed content (already drafted)
Use the markdown files and copy that exist in this repo (or will be pasted in) as the authoritative v1 copy:
- src/speaking/index.md
- src/speaking/endorsements.md
- src/topics/index.md
- src/topics/future-of-authority.md
- src/topics/ai-literacy.md
- src/topics/disinformation.md
- src/topics/agroecology.md
Optional data files:
- src/_data/endorsements.json
- src/_data/engagements.json

Do not rewrite the meaning. You can tighten for clarity and consistency, but keep the “speaking-first” posture and the outcome-driven tone.

## Style constraints
- Minimal, text-forward, “operator’s hub” feel.
- No emojis.
- No fluffy “visionary” language. Use concrete outcomes and decision-grade framing.
- Avoid negative rhetoric that defines things by what they are not.
- Prefer short paragraphs, crisp bullets, scannable headings.

## Design constraints
- Accessible, high-contrast typography.
- Mobile-first layout; fast load.
- Keep CSS simple (one file is fine).
- No heavy animation.
- Use semantic HTML, proper heading hierarchy, and visible focus styles.
- Ensure all pages have clear CTA links (mailto).

## Technical stack
- Eleventy + Nunjucks layouts.
- Markdown content pages.
- One global data file: src/_data/site.json for name/tagline/cta/social links.
- Optional data files for endorsements/engagements.

## Repo conventions
- All site source lives in /src.
- Layouts in src/_includes/layouts.
- Partials in src/_includes/partials.
- Static assets in src/assets (passthrough copy).
- Prefer permalink front matter for stable URLs.

## Commands (Codex must run and verify)
- npm install
- npm run dev (or npx @11ty/eleventy --serve)
- npm run build (or npx @11ty/eleventy)

Codex must fix build errors before finishing.

## Deliverables
1) Working Eleventy site with the IA above.
2) Clean base layout, nav, footer, and a consistent CTA component.
3) Home page content that routes quickly into /speaking/ and /topics/.
4) Lightweight CSS that makes the pages feel “finished” without overdesign.
5) Netlify/Cloudflare-ready output (just standard _site build).

## Quality bar / acceptance criteria
- All internal links valid.
- No placeholder lorem ipsum.
- No missing layouts or broken collections.
- Lighthouse-style basics: decent contrast, proper titles/descriptions, no huge assets.
- Booking CTA appears at least 3 times on home and at least 2 times on topic pages.
