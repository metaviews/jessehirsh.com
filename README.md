# jessehirsh.com

Speaking-first Eleventy site for Jesse Hirsh.

A positioning document, not a record of activity: no dated content, no appearance lists, no event calendars. Activity lives where it is maintained (thefutureherd.ca, LinkedIn, IMDb) and this site points at it.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`

Build output goes to `_site/`. Deployment is GitHub to Cloudflare Pages on push to `main`.

## Working notes

Agent and contributor conventions live in [AGENTS.md](AGENTS.md): content rules, design constraints, translation workflow, and the structure map.

## Status

`src/new/` holds a preview of a proposed restructure (four threads, no catalogue, no dated content), served at `/new/` and marked `noindex`. The live pages are unchanged until a switchover is decided.

## TODO (next iteration)

- Decide the switchover and map every live URL to its destination; keep redirects for anything removed.
- Integrate selected jessehirsh.ca archive content where it supports a thread rather than a topic page.
- Settle the language set before the next round of copy edits.
