# TASKS.md

## Scope (Iteration 1)
Build a speaking-first Eleventy site for jessehirsh.com using provided content pages.

### Step 1 — Initialize Eleventy project skeleton
- Create package.json scripts:
  - "dev": "npx @11ty/eleventy --serve"
  - "build": "npx @11ty/eleventy"
- Add .eleventy.js:
  - input: "src"
  - output: "_site"
  - passthroughCopy: ["src/assets"]
- Add basic README with run commands.

### Step 2 — Create layouts and partials
Create:
- src/_includes/layouts/base.njk
- src/_includes/layouts/page.njk
- src/_includes/layouts/home.njk (optional; or handle home in page layout)
- src/_includes/partials/nav.njk
- src/_includes/partials/footer.njk
- src/_includes/partials/cta.njk
- src/_includes/partials/card.njk (optional)

Requirements:
- Consistent typography and spacing.
- Reusable CTA component:
  - Takes label + href (from front matter if present).
  - Defaults to site-wide CTA if not present.
- Nav should include: Speaking, Topics, Media, About, Contact.
- Footer should repeat booking email and link to Speaking.

### Step 3 — Global data
Create src/_data/site.json with:
- siteName: "Jesse Hirsh"
- tagline: short, speaking-first line (keep sober and concrete)
- bookingEmail: "speaking@jessehirsh.com"
- primaryCtaLabel: "Book Jesse to speak"
- primaryCtaHref: "mailto:speaking@jessehirsh.com?subject=Speaking%20Inquiry"
- social links (optional placeholders; keep minimal)

### Step 4 — Pages (content integration)
Add (or ensure present) pages with these permalinks:
- src/index.md (home) — must be speaking-first, scannable, and CTA-heavy
- src/speaking/index.md
- src/speaking/endorsements.md
- src/topics/index.md
- src/topics/future-of-authority.md
- src/topics/ai-literacy.md
- src/topics/disinformation.md
- src/topics/agroecology.md
- src/media/index.md (new; minimal but credible)
- src/about/index.md (new; short bio + farm as systems lens)
- src/contact/index.md (new; direct booking instructions)

Home page requirements:
- Above the fold: 1–2 sentence positioning + CTA.
- Outcomes (bullets).
- Formats (short list).
- Topics (cards linking to topic pages).
- Proof (3 endorsements + 5 engagements).
- CTA repeated at least 3 times.

### Step 5 — Media page (minimal)
Goal: “authority page,” not a gallery.
Include:
- A short “what I’m good on” list (3–5 bullets).
- A small curated list of appearances/podcasts (links only).
- A CTA for producers: mailto with “Media inquiry”.

### Step 6 — About page (short, strategic)
Include:
- 1 paragraph bio.
- 1 paragraph on the farm as systems lens (not cute; epistemic stance).
- 3-bullet credibility / working areas.
- CTA.

### Step 7 — Styling (single CSS file)
Create src/assets/css/site.css:
- System font stack.
- Max width container (~70ch).
- Accessible link styles + focus styles.
- Simple card grid for topics.
- No complex animation.

### Step 8 — Build verification
- Run npm install
- Run npm run build (must succeed)
- Run npm run dev (must serve)
- Check links between pages.

## Acceptance tests
- /speaking/ and all /topics/* pages load with correct titles + descriptions.
- CTA mailto works and is consistent.
- Mobile layout is readable, no horizontal scrolling.
- No broken includes or missing data files.
