# AGENTS.md — jessehirsh.com

Working instructions for AI agents on this project. Supersedes CLAUDE.md, which has been removed; the durable parts of it live here and in README.md.

## What this site is for

A speaking-first professional site. The conversion goal is a conversation: a warm referral reads it and either emails or forwards it internally. It is a positioning document, not a record of activity.

The governing rule: **every page must stay true without anyone editing it.**

That rule is not stylistic. It is why the site carries no dated content. No "recent" or "upcoming", no appearance lists, no current-focus modules, no event calendars, no generated galleries. Anything that decays gets deleted or pointed at where it is already maintained: thefutureherd.ca, LinkedIn, IMDb, the podcast feeds. Duplicating activity here creates maintenance debt that the practice will not pay.

## Stack and commands

- Eleventy (package.json pins `^2.0.1`; the resolved install reports **v3.1.7**. Check before upgrading anything.)
- Nunjucks templates, one CSS file, no JS build step
- `npm run dev` (dev server), `npm run build` (clean + production build to `_site/`)
- Deploy: GitHub → Cloudflare Pages. Push to `main` deploys.
- `functions/api/` holds Cloudflare Pages Functions (currently the briefing endpoint, which is slated for removal).

## Structure

**Live site** (`src/`, English plus `fr/`, `es/`, `de/`, `zh/`): home, `speaking/`, `topics/` (12 pages), `media/`, `about/`, `contact/`, `hire/`, `future-herd/`, `brief/` (AI briefing generator), `talks/` (generated gallery).

**Preview** (`src/new/`): proposed restructure, built for comparison, not live. English only. Reached at `/new/` and marked `noindex`. Nine pages: home, four threads (`autonomy`, `authority`, `food`, `building`), `speaking`, `media`, `about`, `contact`. It deliberately contains no brief generator, no topic catalogue, no engagement list, no dates, and no current-focus data.

Preview pages get their own nav through `partials/nav-preview.njk`, selected in `layouts/base.njk` when `page.url` contains `/new/`. Nothing else in the shared shell is forked, so the preview renders in the real design.

## Content rules

- **Audience:** conference organizers, associations, public institutions, executive teams, media producers, funders.
- **Voice:** concrete, outcome-driven, decision-grade. No hype, no "visionary", no emojis.
- **Frame:** the argument, then who it is for, then the form it takes in a room. Proof by endorsement and by linked work, not by dated lists.
- **No em-dashes in prose.** Use a colon, a comma, parentheses, or split the sentence. En-dash only in ranges.
- **Farm:** the farm is a working practice and an epistemic lens, and it is also now a public thread (food systems, The Future Herd, the book). The earlier instruction to restrict it to the About page no longer holds.
- **Book:** *The Programmable Farm* is in progress. It may be linked from the site (currently the argument as published at thefutureherd.ca/knowledge/the-programmable-farm/). It must not dominate the navigation or the home page until it has a book with readers.
- **Booking:** `speaking@jessehirsh.com` for speaking and media, `hire@jessehirsh.com` for advisory and research. Do not invent additional addresses.
- Do not rewrite meaning when editing copy. Tighten for clarity only.

## Design constraints

- System font stack. `h1`: `clamp(1.75rem, 5vw, 2.75rem)`, weight 800. `h2` gets a bottom border.
- Max-width container (~70ch), mobile-first, no horizontal scroll.
- Light header, dark muted nav links, `--link` blue for CTAs, active nav, and hover.
- Cards: `border-radius: 0.25rem`, border colour transitions to `--link` on hover.
- `.video-wrapper` for responsive 16:9 iframes. `.grid` + `.card` + `.card-label` are the reusable layout primitives.
- No heavy animation. Accessible, high contrast, visible focus.
- All styles in `src/assets/css/site.css`. Do not add separate CSS files.

## Translations

`node scripts/translate.js --lang <zh|fr|de|es>` with an incremental manifest in `scripts/.translation-manifest.json`. Never hand-write translated files; `--force` only when explicitly asked. Translation surface is a standing cost: five languages of every page means every copy edit multiplies. Shrinking the language set is an open question, not a settled decision.

## Working method

- **Explore before acting.** Check `scripts/`, `functions/`, and existing patterns before writing anything new.
- **Plan, then ask.** For multi-step work, propose the approach and wait for direction.
- **Minimum necessary action.** Do only what was asked. No unrequested refactors or additions.
- **Verify by building**, not by describing. `npm run build`, then check the output.
- Internal links must resolve after any restructure. No placeholder or lorem ipsum content.
- Prefer editing existing files over creating new ones.

## Key facts

- Canadian researcher, speaker, strategist, and farmer
- Hosts **The Future Herd** (thefutureherd.ca), and co-hosts **Metaviews to the Future** (news.metaviews.ca/episodes/)
- Long-running CBC Metro Morning technology columnist
- LinkedIn: linkedin.com/in/jessehirsh · IMDb: imdb.com/name/nm5513595
- Speaker bureau profiles: NSB, Talent Bureau, Global Speakers
