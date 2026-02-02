# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static site generator (Node.js + `marked`) for a French-language publication on enterprise interoperability and agentic architecture. 12 chapters + 5 consolidated volumes + annexes are converted from Markdown to standalone HTML pages and deployed to GitHub Pages.

All content is in **French**. Commit messages and code comments should be in French.

Live site: https://agbruneau.github.io/InteroperabiliteAgentique/

## Commands

```bash
npm install        # Dependencies (Node.js 20+, single dep: marked)
npm run build      # Generate docs/*.html from Chapitres/*.md
npx serve docs     # Optional: local HTTP server at localhost:3000
```

No test or lint commands. No CI/CD pipeline — deploy by pushing generated `docs/` to `master`.

## Architecture

**Pipeline:** `Chapitres/*.md` + `templates/*.html` + `chapters.json` → `build.js` → `docs/*.html`

- **`build.js`** — Parses Markdown (GFM via `marked`), extracts h2 headings for sidebar TOC, adds anchor IDs, generates prev/next navigation per chapter/volume group, copies `public/` assets to `docs/public/`.
- **`chapters.json`** — Ordered array of entry metadata. Must be updated when adding a chapter. Schema per entry:
  - `source`: Markdown filename in `Chapitres/`
  - `slug`: URL-safe identifier (used for output filename `{slug}.html`)
  - `roman`: Roman numeral (empty string for annexes)
  - `title`, `shortTitle`: Full and card display titles
  - `category`: `transversal` | `applications` | `donnees` | `evenements` | `volume`
  - `color`: Hex color for the category
  - `badge` (optional): Label shown on cards
  - `type` (optional): `"volume"` for consolidated volumes
- **`templates/index.html`** — Homepage template. Placeholders: `{{CHAPTERS_GRID}}`, `{{VOLUMES_GRID}}`. Contains hero section, resource links (PDF, podcast), poster section.
- **`templates/chapter.html`** — Content page template. Placeholders: `{{TITLE}}`, `{{SIDEBAR}}`, `{{CONTENT}}`, `{{PREV_LINK}}`, `{{NEXT_LINK}}`. Two-column layout with sticky sidebar TOC.
- **`docs/`** — Generated output, committed to repo for GitHub Pages. Do not edit manually.
- **`public/`** — Source static assets (PDF, podcast M4A, poster PNGs). Copied to `docs/public/` during build.

**Styling:** Dark theme only, all CSS embedded in templates (no external stylesheets). Responsive breakpoints at 768px (chapter pages) and 600px (homepage).

**Category colors** (in `chapters.json` and templates): Applications `#2563eb`, Données `#059669`, Événements `#d97706`, Transversal `#6b7280`, Volumes `#7c3aed`.

## Content Workflow

1. Edit Markdown in `Chapitres/`
2. New chapter/volume → add entry to `chapters.json` (order matters for navigation)
3. `npm run build` then commit both source and `docs/` changes, push to `master`
