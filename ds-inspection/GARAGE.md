# GARAGE.md — ap-ds-storybook (AP Design System)
_Checked in: 2026-10-18 · Re-confirm at next inspection_

## Vehicle
- System: `ap-ds-storybook`, backing the "AP Design System" — a solo practice/portfolio design system (not yet feeding other product teams)
- Team: solo (Andrew) — design + eng + docs all one person
- Consumers: none yet; a sibling repo `ap_ui_kit` is modeled on this one but is a separate, independently-evolving system, not a consumer of it
- Age: git history from 2023-01-08 to present (224 commits); long dormant stretches (2023–2025 sparse), then a heavy active burst from 2026-09 onward (88 commits in 2026-09, 26 in 2026-10) — effectively a relaunch/rebuild era, not continuous development
- Reason for service: routine health check / curiosity, no specific incident or deadline

## Assets
- **Design library**: Figma file "AP Design System" (`Shl6BS7R7y9HqvjLAsPQlQ`), tokens authored via the Token Studio plugin, synced to native Figma Variables. Confirmed live: **15 variable collections, 7,724 variables** — Tier 1 Core/Theme-Basil/Theme-Molasses (+ Responsive variants), Tier 2, Tier 3, Tier 1 Composite Styles, and a parallel **Dark-mode** collection set (Core Dark, Theme-Basil/Molasses Dark, Tier 2/3 dark) not referenced anywhere in the code repo. Component side is thin: only 1 loose component + 4 component sets (all nav-related) exist in the file — the 10 components built out in Storybook do not appear to have matching Figma components.
- **Code library**: this repo, React 19 + Storybook 10 + Style Dictionary v5, single package `ap-ds-storybook`, not published to a registry. `tokens.json` (Token Studio raw export, 1.3MB) → `build-tokens.js` → per-theme/per-viewport CSS → Storybook.
- **Docs**: Storybook, deployed via `gh-pages` to https://andrewjypark.github.io/ap_ds_storybook/ — live, reachable.
- **Process**: GitHub issues only (`andrewjypark/ap_ds_storybook`); no CONTRIBUTING.md, no CHANGELOG.md, no formal support channel (solo project).
- **AI surface**: none found — no `llms.txt`, no Code Connect (`*.figma.tsx`/`figma.config.json`), no `CLAUDE.md`/agent-rules file in this repo.

## Evidence access map
| Asset | Access | Verified how |
|---|---|---|
| Design library | **live** | Figma Console MCP (Desktop Bridge), connected to the actual open file. `figma_get_design_system_summary` and `figma_get_variables` both returned real content (7,724 variables / 15 collections; 4 component sets). Whole-file sweep capability, scoped to what's open in Figma Desktop right now — unpublished changes included. Native Figma MCP not available (OAuth not completed this session). |
| Code library | **live** | Read directly from the repo (README.md, package.json, config.json, components/ tree, git log). |
| Docs | **live** | Storybook deploy URL is public; repo scripts confirm build/deploy path. Did not crawl the live site itself this pass. |
| Process | **live** (thin) | GitHub remote confirmed via `git remote -v`; no tracker content beyond that — no issues/PRs pulled. |

## Known symptoms
- Self-reported in README's "Known issues" section: theme + viewport can't combine correctly yet (CSS specificity conflict, not a merge); `font_weights_font_1`'s numeric scale is non-standard (light=100, regular=300, semibold=500, bold=700); Typography/Spacing/Elevation Foundations pages are incomplete; dead/unused leftovers from the original Style Dictionary tutorial scaffold (`config.json`, `MyStyleDictionary/`, `output`/`output.json`, unused `build/` platform folders) still sitting in the repo.
- Found during intake, not self-reported: Figma's component library is far behind the code library's 10 built components (only 1 loose component + 4 nav-related component sets exist in Figma). Correction after deeper check: dark mode (initially thought Figma-only) is in fact built end-to-end — `tokens.json` carries `_dark` sets, `build/` outputs them, and `.storybook/preview.jsx`'s theme dropdown offers core/basil/molasses each with a `_dark` variant. README's "Known issues" section predates this work and doesn't mention it — a docs-currency gap, not a coverage gap.

## Probable greens
- Live-computed token values in Storybook (`getComputedStyle` at render time) rather than hand-typed hex values — deliberately built to never drift from the real tokens.
- Tiered token architecture (Tier 1/2/3) consistently named across both Figma and code.

## Intentional deviations
- None flagged yet — will confirm per-station if something that looks off turns out to be deliberate.

## Scope & frame
- Stations this pass: **all 10**
- Scoring frame: **solo/portfolio project** — calibrate expectations accordingly (e.g., no governance team, no formal contribution process is expected, not automatically a red)
- Out of scope: nothing explicitly excluded
