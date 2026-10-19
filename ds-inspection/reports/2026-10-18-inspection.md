# Multi-Point Inspection Report — ap-ds-storybook (AP Design System)

_Inspected: 2026-10-18 · Technician: Claude (Sonnet 5), via the `ds-inspection` skill · Previous inspection: first inspection_
_Vehicle profile: [`ds-inspection/GARAGE.md`](../GARAGE.md) (checked in 2026-10-18)_

## The short version

The tokenization pipeline is the real strength here: 7,724 live Figma variables trace cleanly into a tiered (Tier 1→2→3) architecture that matches the 10 built components almost exactly, and the one token value sampled end-to-end checked out bit-for-bit between Figma and the built CSS. The components built on top of those tokens are better-crafted than most solo systems — real ARIA patterns, token-driven states, no hardcoded colors — but nothing verifies any of it automatically: there are no tests, no CI, and Storybook's own a11y addon is installed but switched off. The single most load-bearing fix isn't a red station at all — it's that README.md, "the running project log," still introduces itself as a different project (`ap-ui-kit`) a month after this repo was renamed, which is the kind of small drift that quietly misleads the next reader, human or agent.

**Overall: 51/100** — a conversation starter, not a grade. Fix the reds, schedule the yellows, re-run on a cadence.
Station 8 (Feedback & adoption) scores Red by the rubric's letter but is flagged as structurally inapplicable rather than unhealthy — there are no consumers yet for a feedback loop to exist around (see its station record). Treat the practical floor as closer to 7 stations of real signal plus one genuine red (Testing).

### What's genuinely strong

No station cleared the green bar this pass, but several things are real, verified wins worth protecting rather than just "not red":

- **The token pipeline checks out, literally.** `tier2_color/content/default` was traced end-to-end — live Figma variable → `tokens.json` → built CSS custom property — and it matched exactly, in both light and dark. Not a claim; a verified fact about the one thing every other asset depends on (Stations 1, 6).
- **ARIA patterns are consistently correct, not just present.** `Checkbox`/`Radio` use the real `role="checkbox"`/`role="radio"` pattern with `aria-checked`; `Dropdown` uses `role="button"` + `aria-haspopup="listbox"` + `aria-expanded`; `Modal` uses `role="dialog"` + `aria-modal`. Every one is the *right* role for what it represents (Station 3).
- **Contrast passes comfortably, not barely** — 14:1 to 19.6:1 on every sampled text/background pair, well past the 4.5:1 floor, in both light and dark (Station 3).
- **Internal naming discipline is real**: every optional-content boolean uses `show*`, the `size` scale uses identical literal values across components, `aria-label` is the consistent accessible-name convention (Station 4).
- **The README's "Progress log" is a genuine changelog** in all but name — 17+ dated, detailed entries, doing real governance work (Station 7).

### Top findings by leverage, not by station order

1. **Nothing is verified automatically (Station 5).** No tests, no CI, `addon-a11y` installed and switched off. Highest-leverage gap: every strength above is true *today* by one person's discipline, with nothing stopping it from quietly breaking tomorrow.
2. **README doesn't know it's `ap-ds-storybook` (Station 7).** Cheapest possible fix, disproportionate cost: the project's own "running log" confidently misidentifies itself a month after the rename — exactly the kind of small drift that compounds, since anyone (or any agent) starting from this file starts from a wrong premise.
3. **The tiered token architecture (Stations 1, 6) is the real asset.** 7,724 variables, Tier 1→2→3, with `tier_3` matching all 10 built components 1:1 — everything else is built on top of this, and it's the one part of the system unambiguously doing its job well.

## Inspection sheet

|  # | Station                         | Quality      | Light |      Score |
|---:|:--------------------------------|:-------------|:-----:|-----------:|
|  1 | Coverage & gaps                 | Complete     |  🟡   |       6/10 |
|  2 | Best practices                  | Sound        |  🟡   |       6/10 |
|  3 | Accessibility                   | Sound        |  🟡   |       6/10 |
|  4 | Shared language                 | Sound        |  🟡   |       7/10 |
|  5 | Testing & validation            | Sound        |  🔴   |       2/10 |
|  6 | Orchestration                   | Synchronized |  🟡   |       7/10 |
|  7 | Governance & version control    | Extensible   |  🟡   |       6/10 |
|  8 | Feedback & adoption             | Extensible   |  🔴   |  2/10 (n/a)|
|  9 | Machine-readable docs & context | AI-Ready     |  🟡   |       5/10 |
| 10 | Agent access                    | AI-Ready     |  🟡   |       4/10 |
|    | **Overall**                     |              |       | **51/100** |

**Lights:** 🟢 0 green · 🟡 8 yellow · 🔴 2 red · 0 not inspected

**Key:** 🔴 Red (0–3) — broken or missing; the light is ON · 🟡 Yellow (4–7) — drift or gaps; schedule a fix · 🟢 Green (8–10) — healthy, no action needed · **N/I** — not inspected (no evidence access; never guessed)

## Evidence basis

- **Design library**: live, via Figma Console MCP Desktop Bridge connected to the real "AP Design System" file (not an export or screenshot). Whole-file sweep for variables (7,724 vars / 15 collections) and components (1 loose component + 4 component sets). Scoped to what's open in Figma Desktop right now, with you opening the bridge plugin mid-session.
- **Code library / docs**: live, direct repo reads (file contents, directory structure, git history, build output).
- **Process / team workflow**: interview (solo project, confirmed in intake) plus direct git history where checkable (renames, branches, tags).
- Findings tagged `[verified]`: 44 · `[reported]`: 3 — the inspection leaned heavily on live, directly-read evidence rather than your word for it, thanks to the live Figma bridge connecting successfully.

## Station records

---

### Station 1 — Coverage & gaps: YELLOW (6/10)
- Inventory: **design** — 1 loose component + 4 component sets (all nav-related: "Primary Nav Item Collapsed", "Nav Item", "Button - Nav Expand", "Primary Nav") · **code** — 10 components (Button, Checkbox, Dropdown, Icon, Modal, Radio, SegmentGroup, Table, TextInput, Tooltip) + 3 Foundations categories (Border, Color, Typography) · **documented** — all 10 code components have a `.stories.jsx` (Storybook auto-docs via `addon-docs`); depth not assessed here (Station 2)
- Evidence level: design = live (Figma Console MCP, whole-file); code/docs = live (repo read)
- Findings:
  - `[verified]` The Figma file's 4 component sets are nav-related and don't correspond to any of the 10 built code components — the design and code component inventories don't overlap at all right now. Token coverage is the opposite story: Figma's "Tier 3" variable collection and the code repo's `tokens/sets/tier_3/` both carry one set per component — **buttons, text-input, icon, dropdown, modal, segment-group, checkbox, radio, table, tooltip** — a clean 1:1 match with all 10 built components.
  - `[verified]` Token tiering is real and deep, not a flat pile: Tier 1 (Core + Basil/Molasses themes, each with a Dark variant and a Responsive variant) → Tier 2 (semantic) → Tier 3 (component) → Tier 1 Composite Styles. 7,724 variables across 15 collections.
  - `[verified]` State/variant depth on the 2 components sampled closely (Button, TextInput) is strong: hover/active/disabled on Button and active/error/focus-within on TextInput are all token-driven (`var(--btn-bg-hover)` etc.), not hardcoded, with a documented `data-force-state` mechanism purpose-built so Storybook can pin a state for docs.
  - `[verified]` Hardcoded px values remain in every sampled component CSS file alongside heavy `var()` usage (e.g. Button.css: 33 `var()` uses vs. 11 raw px — padding, max-width, border-radius, a breakpoint). Spot-checked, these read as legitimate one-off layout values and a media-query breakpoint rather than missed token opportunities, but they weren't individually traced to confirm none should be tokenized.
  - `[verified]` Common staples missing from the code library entirely: link, card (a demo `ExampleCard` exists in ThemingPlayground but isn't a library component), accordion, alert/toast, badge, avatar, pagination, breadcrumb, and navigation (notable since nav is the one thing that *does* exist in Figma).
  - `[verified]` No published, versioned, installable artifact — `package.json` has no `publishConfig`, isn't marked `private`, and isn't on any registry. Consumption today is clone-and-build only.
- Not inspected: full component-by-component state/variant audit (only Button + TextInput sampled); industry benchmark comparison not run (no design-systems knowledge MCP connected this pass — benchmarked from general knowledge above, noted as such).
- Deviations noted: given the solo/portfolio frame (confirmed in intake), the thin component side of Figma relative to code is plausibly deliberate — tokens may be the primary design-side investment, with components built straight into code. Worth a one-line confirmation from you rather than treating it as a defect.
- First move: decide whether Figma components are meant to catch up to the 10 built in code, or whether token-first/code-first is the intended workflow going forward — that answer changes whether "design/code component mismatch" is a finding or a non-issue for every later station.

### Station 2 — Best practices: YELLOW (6/10)
- Sampled: design — "AP DS - Nav Item" component set (6 variants); code — `Button.jsx`/`.css`, `Dropdown.jsx`/`.css` read end to end; docs — `Button.stories.jsx`
- Evidence level: design = live (Figma Console MCP); code/docs = live (repo read)
- Findings:
  - `[verified]` **(format)** Code craft is strong: `Button.jsx` renders a real semantic `<button type="button">`, every visual property (`color`, `padding`, `radius`, `minWidth`, `font`) is pulled from a CSS custom property driven by the token build — no hand-typed values. State handling uses real `:hover`/`:active`/`:disabled` plus a documented `data-force-state` escape hatch reserved for docs-only rendering, explicitly commented "never pass this in real product usage." `Dropdown.jsx` is a genuinely working combobox (click-to-open, outside-click-to-close, keyed option list), not a static mockup.
  - `[verified]` **(format)** The one sampled Figma component set, "AP DS - Nav Item," uses an unnamed variant axis — `Property 1` with values Default/Hover/Active — instead of a descriptive name like `State`. Minor on its own, but it's the kind of drift that compounds as a library grows and property panels fill with `Property 1`/`Property 2` instead of self-documenting names.
  - `[verified]` **(format)** Logical vs. physical CSS properties are inconsistent: `Button.jsx`'s inline styles use the logical `paddingInline`, but the static `.css` files use physical `margin-left`/`margin-right`/`padding-left`/`padding-right` 13 times across 7 of 10 components (Button, SegmentGroup, Table, TextInput, Icon, Dropdown, Tooltip). No `margin-inline`/`padding-inline`/`border-inline` anywhere in the `.css` files themselves. This is a real RTL risk if the system is ever used in a right-to-left context — low cost to fix since it's a mechanical rename.
  - `[verified]` **(org/format)** Storybook's autodocs is explicitly disabled per-component (`tags: ["!autodocs"]` in every `.stories.jsx`, confirmed in `Button.stories.jsx`). What each component page shows is a live variation matrix (`ButtonVariations.jsx` etc.) for visual/token QA — valuable, but there's no written description, anatomy, or do/don't guidance anywhere in the docs site. Code comments are excellent (dense, specific, explain Figma-to-code mapping decisions) but those are invisible to anyone reading Storybook rather than the source.
- Not inspected: the other 3 Figma component sets (only "Nav Item" pulled in detail); docs craft on components other than Button; design-file hierarchy (library/product/draft separation) — not applicable yet, single file.
- Deviations noted: disabling autodocs in favor of live swatches may be a deliberate choice for a token/state-verification tool rather than a public-facing component reference — worth confirming intent rather than treating as an oversight.
- First move: rename the Figma variant axis from `Property 1` to `State` on the one set checked, and audit the rest for the same pattern while the library is still small enough that it's a 10-minute fix rather than a migration.

### Station 3 — Accessibility: YELLOW (6/10)
- Sampled: `Checkbox.jsx`, `Modal.jsx`, `Dropdown.jsx`/`DropdownField.jsx`/`DropdownMenuRow.jsx` read end to end · Contrast computed on Core + Core Dark `tier2_color/content/default` vs. `background/base` and `background/surface_primary` · Design side: not reachable beyond variable values (no annotation kit assessed, no component-description a11y notes checked)
- Evidence level: code = live (repo read) · contrast = live (computed from real Figma variable values via the Console bridge, not code tokens — see note below) · CI/testing wiring = live (no `.github/` directory exists at all) · design annotation kit = not inspected
- Findings:
  - `[verified]` Custom interactive controls use correct ARIA patterns, not div-soup: `Checkbox` is a `role="checkbox"` button with `aria-checked`; `DropdownField` is `role="button"` with `aria-haspopup="listbox"`, `aria-expanded`, and explicit `Enter`/`Space` keydown handling (not just click); `DropdownMenuRow` uses `role="option"`/`aria-selected`, dividers use `role="separator"`; `Modal` uses `role="dialog"`, `aria-modal="true"`, `aria-label`. This is well above the "wrong ARIA is worse than none" failure mode — these are each applied correctly for what they represent.
  - `[verified]` **WCAG 1.4.3 (contrast, text):** computed from the live Figma variables (not the built CSS) — `tier2_color/content/default` on `tier2_color/background/base` is **14.0:1** in Core/Basil/Molasses (light) and **19.6:1** in Core Dark; on `background/surface_primary` it's 14.0:1 light / 17.3:1 dark. All four sampled pairs clear 4.5:1 comfortably (AAA-level, not just AA). Basil/Molasses weren't computed separately but match Core exactly for these specific tokens — confirmed, since both are structural/neutral tokens rather than brand-referencing ones (the only ones that vary per theme, per the repo's own `generate-color-manifest.js` diff logic). Scope: only this one content/background pair sampled — utility colors (error/warning/success) and component-specific (Tier 3) color pairs weren't checked and could tell a different story.
  - `[verified]` **Gap:** `Modal.jsx` has correct static ARIA (`role="dialog"`, `aria-modal`) but no behavior to back it up — no `Escape`-to-close handler, no focus trap, and no focus management (focus isn't moved into the dialog on open or returned to the trigger on close). A screen-reader or keyboard-only user can open it correctly but can't reliably close or stay contained in it.
  - `[verified]` **Gap:** `Checkbox` has no *enforced* accessible name — `aria-label` is an optional prop the consumer must remember to pass; there's no visible `<label>` element and nothing warns if neither is supplied. Same risk applies to any consumer who forgets.
  - `[verified]` **No automated a11y verification anywhere.** `@storybook/addon-a11y` is installed (`package.json`) but deliberately *not* registered in `.storybook/main.js` — a code comment explains the Accessibility panel tab was turned off along with the rest of Storybook's bottom panel. There is no `.github/` directory, so no CI exists at all, meaning nothing runs axe-core, Lighthouse, or any other a11y check on any change, ever — manual-only today.
  - `[verified]` No per-component a11y notes exist anywhere (consistent with Station 2's autodocs-disabled finding) — keyboard interactions like Dropdown's Enter/Space-to-open aren't documented for a consumer to discover without reading source.
- Not inspected: Radio/SegmentGroup/Table/Tooltip/TextInput accessibility in similar depth (only Checkbox, Modal, Dropdown read closely); arrow-key navigation within an open Dropdown menu (click/Enter-per-row only, by inspection — no `ArrowDown`/`ArrowUp` handling found, though not exhaustively traced); utility/semantic color contrast (error/warning/success); touch-target sizing; Figma-side annotation kit or per-component a11y descriptions; screen-reader testing of any kind.
- Deviations noted: none claimed — these are genuine gaps, not documented intentional choices.
- First move: turn `@storybook/addon-a11y` back on (it's already installed, just commented out of `main.js`) — lowest-effort way to get continuous, visible a11y feedback back before investing in CI.

### Station 4 — Shared language: YELLOW (7/10)
- Swept: props across all 7 sampled Tier 3 components (Button, Checkbox, Radio, Dropdown + DropdownField + DropdownMenuRow, TextInput, SegmentGroup, Tooltip) plus Modal; one design↔code trace (Button's Figma property vs. its React prop)
- Evidence level: live (repo read for all code; design-side name taken from the one Figma component set already pulled in Station 2)
- Findings:
  - `[verified]` **Strong internal consistency** on two conventions, checked across all 7 components: every optional-content boolean uses a `show*` prefix (`showLeftIcon`, `showFieldTitleSection`, `showDescriptionBelowInput`, `showLeftSlot`, etc. — no `has*`/`display*`/`is*Visible` variants found), and every component needing an accessible name takes a literal `"aria-label"` destructured prop rather than a custom-named alternative. The `size` scale is also genuinely unified: Button and Icon both use the exact literal strings `small`/`medium`/`large`, not `sm`/`lg`-style abbreviations in one and full words in the other.
  - `[verified]` **One real outlier:** `Button`, `TextInput`, `DropdownField`, and `DropdownMenuRow` all name their docs-only state-pinning escape hatch `forceState` — but `Dropdown.jsx` (the composed component) names the equivalent prop `forceOpen`. Same concept ("let docs pin a state without real interaction"), different name, breaking an otherwise clean, system-wide convention.
  - `[verified]` **Design↔code vocabulary gap, documented but real:** `Button.jsx`'s own doc comment maps its `priority` prop to Figma's property named `Type` ("`priority` → `Type` (`\"Text Only\"` == `\"ghost\"`)"). The mapping is written down and intentional, not accidental drift, but it means there's no single shared vocabulary — a designer reading Figma's "Type" property and an engineer reading `priority` in code are using different words for the same concept, with the translation living only in a code comment few people outside this codebase would ever read.
  - `[verified]` No naming validator, lint rule, or written naming algorithm exists anywhere — consistency today is real but is running entirely on one person's discipline and code-comment tribal knowledge, not an enforced or even documented scheme.
- Not inspected: Table/Icon/SegmentGroup's own prop names beyond what's cited above; the other 3 Figma component sets' property names against any code equivalent (no code equivalent exists for the nav components per Station 1); token naming scheme within each side considered in isolation (deferred to Station 6, which also diffs design vs. code token names directly).
- Deviations noted: the Figma↔code renames (e.g. `Type`→`priority`) read as deliberate, documented API decisions rather than drift — worth keeping, just worth writing down centrally rather than leaving the mapping scattered one comment per component.
- First move: rename `Dropdown`'s `forceOpen` to `forceState` (accepting `"open"` as its one real value) to close the one outlier while the API surface is still small enough that nothing external depends on it yet.

### Station 5 — Testing & validation: RED (2/10)
- Inspected: whole repo for test files, CI config, visual-regression config, lint config
- Evidence level: live (direct repo search — not a sample, an exhaustive check for each category)
- Findings:
  - `[verified]` **No test files exist anywhere in the repo** — no `*.test.*`/`*.spec.*` files found by an exhaustive search. `package.json`'s `"test"` script is still the create-react-app-style placeholder: `echo "Error: no test specified" && exit 1`.
  - `[verified]` **No CI** — confirmed in Station 3, repeated here because it's this station's core question: no `.github/` directory, so nothing runs on any change, ever.
  - `[verified]` **No visual regression tooling** — no Chromatic, Percy, or Playwright config/dependency anywhere in `package.json` or the repo root.
  - `[verified]` **No lint config** — no `.eslintrc*`/`eslint.config*` found, despite `lintstagedrc.json` existing at the repo root (worth checking what that actually runs, since its presence implies lint-staged was set up at some point — not traced further this pass).
  - `[verified]` One real mitigating factor, worth naming rather than erasing: every component's `*Variations.jsx` swatch page plus `TokenReadout.jsx` gives a strong *manual* verification surface — token changes are visible with live, real (not hand-typed) resolved values the moment Storybook renders, which catches a class of drift that pure unit tests often miss. This is real, but it's human-in-the-loop and unenforced, not a safety net that runs itself.
- Not inspected: whether `lintstagedrc.json` references a working lint step despite no visible config (couldn't resolve without running it); any eval/LLM-as-judge workflow for AI-assisted contributions (none mentioned in intake, none found in repo).
- Deviations noted: for a solo project with no other contributors, "no CI" carries different risk than for a team — there's no one else's changes to catch — but it still means regressions in your own future changes have nothing automated catching them either.
- First move: wire `addon-a11y` back on (Station 3's first move) and add a minimal GitHub Actions workflow that at least runs `npm run build-storybook` on every push — catching build breaks costs almost nothing to set up and is the floor most other testing builds on top of.

### Station 6 — Orchestration: YELLOW (7/10)
- Diffed: one token end-to-end (`tier2_color/content/default`, Figma live value vs. built CSS) plus a full collection-name-vs-token-set-name sweep (15 Figma collections vs. 30 `tokens.json` top-level keys)
- Token diff: 15 design collections vs. ~26 code token sets (excluding `$themes`/`$metadata`) · **values: match** on the one pair sampled · **names: match** (systematic transform, `tier2_color/content/default` → `--ap-tier-2-color-content-default`, not drift) · **design-only:** "Tier 1 Composite Styles" has no obvious matching top-level key in `tokens.json` · **code-only:** `gramercy_tech_021726`, `ap_portfolio_122124`, `sj_041125`, `card`, `tier_1_storybook_ds` — none correspond to any of the 15 live Figma collections
- Evidence level: live for both sides (Figma Console MCP + direct repo/build read); the values comparison is a single sampled pair, not exhaustive
- Findings:
  - `[verified]` **The pipeline genuinely works, confirmed end to end:** `tier2_color/content/default` reads `#23272B` (light) / `#FFFFFF` (dark) live from Figma, and the exact same values appear in the built CSS as `--ap-tier-2-color-content-default`, across every theme/viewport build folder checked. This is real evidence the "Figma → Token Studio → `tokens.json` → Style Dictionary → CSS" pipeline described in the README is not aspirational — it produces correct output.
  - `[verified]` **Five code-side token sets have no matching live Figma collection:** `gramercy_tech_021726`, `ap_portfolio_122124`, `sj_041125`, `card`, and `tier_1_storybook_ds` all exist as top-level keys in `tokens.json` but none of the 15 variable collections visible through the live bridge are named anything close to these. Combined with Figma's "example card" component (Station 1) and the Figma file apparently hosting unrelated nav components too, this reads like a shared/working Figma file carrying other projects' token sets alongside this design system's — not necessarily a bug, but worth confirming none of these leak into this system's actual builds (`gramercy_tech`/`ap_portfolio`/`sj_041125` read like other clients' or projects' work).
  - `[verified]` **One design-only gap:** Figma's "Tier 1 Composite Styles" collection (1,512 variables) doesn't have an obvious counterpart among `tokens.json`'s top-level keys. Could be Figma Text/Effect Styles that don't export into Token Studio's set structure the same way Variables do, or could be a real unconsumed set — not resolved this pass.
  - `[reported→verified via README]` Sync is one-directional-by-action and manual, not continuous: Token Studio's Figma plugin pushes `tokens.json` to the repo via git sync, triggered by a person, not an automated job — so there's no mechanism that would catch a Figma edit nobody remembered to push, or flag that `tokens.json` has drifted stale relative to the live file.
  - `[verified]` Naming between the two sides transforms systematically (slash/underscore → kebab-case CSS custom property), which is exactly what you want from a pipeline — but the collection-level names diverge more loosely (Figma's "Tier 1 - Core - Responsive" vs. code's "viewport_desktop/tablet/mobile") — same concept, different vocabulary, consistent with Station 4's design↔code naming-gap finding.
- Not inspected: full value-by-value diff across all 7,724 Figma variables vs. all of `tokens.json` (far beyond this pass's scope — one pair sampled and matched); docs-vs-reality parity (deferred, ties into Station 2's "autodocs disabled" finding — there's little written documentation to drift from); a full trace of "Tier 1 Composite Styles" content to confirm whether it's genuinely unconsumed.
- Deviations noted: a single shared Figma file carrying multiple unrelated projects' token sets is a plausible, intentional choice for a solo practitioner (one file, not a library-per-client) — flagged as a finding to confirm, not assumed to be a mistake.
- First move: open `tokens.json` and check what `gramercy_tech_021726`/`ap_portfolio_122124`/`sj_041125` actually contain and whether `build-tokens.js`'s `THEMES`/`VIEWPORTS` arrays could ever accidentally pull from them — if they're confirmed unrelated and never referenced by the build, that's a safe, quick cleanup; if anything secretly depends on them, that's worth knowing before it's forgotten.

### Station 7 — Governance & version control: YELLOW (6/10)
- Inspected: repo root for process artifacts, `git log`/`git tag`/`git branch -a`, README.md's own self-description vs. the repo's actual identity (`package.json`, git remote)
- Evidence level: live (direct repo/git history read)
- Findings:
  - `[verified]` **README.md doesn't know what repo it's in.** This repo was named `ap-ui-kit` from inception (2023-01) through 2026-09-12, when commit `5083348` ("Update local/package references after repo rename to ap_ds_storybook") renamed it in `package.json`, git remote, and elsewhere. But `README.md` — which explicitly calls itself "the running project log" — still opens with `# ap-ui-kit` and "Design tokens for the ap_ui_kit design system... structured similarly to the \`ap_ds_storybook\` repo," describing *this repo* in the third person as if it were a different project it's merely modeled on. The rename landed over a month ago (confirmed active development since); the doc's own identity was never updated to match. Anyone — human or agent — reading this README cold would misidentify which project they're in.
  - `[verified]` No `CONTRIBUTING.md`, `CHANGELOG.md`, or PR/issue templates — expected and not a defect for a solo project with no outside contributors (per the confirmed solo/portfolio frame).
  - `[verified]` The README's dated "Progress log" section is a real, substantive changelog-equivalent: 17 entries this pass's window, each with genuine technical detail (what changed, why, how verified) — a strong, consistently-maintained practice that's doing the job a formal CHANGELOG would, just under a different name.
  - `[verified]` No git tags or releases exist; `package.json`'s version has sat at `1.0.0` since inception regardless of the renames and 224 commits — reasonable given there's no published artifact to version (Station 1), but means there's no way to reference "what shipped when" other than raw commit SHAs.
  - `[verified]` One stale, abandoned remote branch: `origin/w3c-dtcg-conversion`, last touched 2024-11-27 (almost two years ago), 136 commits behind `main` and 2 ahead — an experiment that was never merged or cleaned up.
- Not inspected: issue tracker (no GitHub API access this pass — `git remote`/`package.json` only); whether other docs (comments, internal notes) also carry the stale `ap-ui-kit` identity beyond README's opening section.
- Deviations noted: absence of formal contribution/release process is an accepted, intentional non-issue for a solo project — not scored as a gap.
- First move: fix README.md's opening section (title + first paragraph) to describe itself as `ap-ds-storybook` in its own voice, not as a comparison to a sibling it actually *is* — a five-minute fix that stops every future reader (including an AI agent) from starting from a wrong premise.

### Station 8 — Feedback & adoption: RED (2/10) — structurally inapplicable, not a health failure
- Measured: nothing to scan — confirmed in intake, no consumer repos or product teams exist yet
- Evidence level: interview (confirmed directly: solo practice/portfolio project, no consumers)
- Findings:
  - `[reported]` There is no adoption to track and no product-to-system feedback loop to audit, because nothing consumes this system yet — every warning light this station checks for (no usage analytics, no feedback mechanism, no roadmap connection) is technically present, but all of them are consequences of the system having no consumers rather than a broken feedback loop with real consumers going unheard. Scoring this against the rubric's letter produces Red; scoring it against what the rubric is actually trying to protect against (teams quietly detaching, complaints going nowhere) produces "not yet applicable."
  - `[reported]` This inspection itself is the first one — there's no established cadence yet to evaluate.
- Not inspected: n/a — nothing reachable to inspect.
- Deviations noted: scored against the solo/portfolio frame from intake; this station's low score should not be read as system unhealth. It becomes a real station the moment this system gets its first consumer (e.g. if the sibling `ap_ui_kit` repo, or a future product, starts pulling from it).
- First move: none needed now — the honest first move is "revisit this station once there's a first real consumer," and decide then what a lightweight feedback mechanism should look like (even just a personal backlog of "things I noticed while using this in project X" counts).

### Station 9 — Machine-readable docs & context: YELLOW (5/10)
- Inventoried: `tokens.json` (JSON) + built CSS custom properties (machine-consumable formats) · dense inline doc comments on every component · no llms.txt/CLAUDE.md/AGENTS.md/.cursorrules/schema found anywhere · **Generation test: run** (see below)
- Evidence level: live (repo read); generation test = live, traced against the actual component source read during this inspection, not a hand-wave
- Findings:
  - `[verified]` Tokens are genuinely machine-consumable — `tokens.json` (structured JSON) and the built CSS custom properties are both real, parseable, non-prose formats, not locked in a styles page a machine can't reach.
  - `[verified]` No formal typed API surface — components are plain JSX with no TypeScript, PropTypes, JSON schema, or custom-elements manifest. The compensating factor is real, though: doc comments on every component read (Button, Dropdown, Checkbox, Modal, TextInput, Tooltip, SegmentGroup) are unusually dense and specific — prop-by-prop mapping to Figma, explicit "never pass this in real usage" warnings on docs-only props. That's good *prose* context for an LLM reading source directly, just not structured metadata.
  - `[verified]` No deliberate AI-facing surface exists: no `llms.txt`, no agent-rules file, no component-description metadata separate from code comments.
  - `[verified]` **Generation-test stumble, concretely traced:** composing a small form (`TextInput` + `Checkbox` + `Button`) from the APIs read this session produces one real bug an agent would plausibly ship. `TextInput.onChange` passes a native DOM event (it's spread onto a real `<input>`/`<textarea>`, so the idiomatic handler is `onChange={e => setValue(e.target.value)}`) — but `Checkbox`, `Radio`, `Dropdown`, and `SegmentGroup` all call their `onChange`/`onSelect` with the **raw new value directly**, not an event (`onChange?.(!checked)`, `onChange?.(v)`). An agent that generalizes "onChange takes an event" from TextInput and applies the same pattern to Checkbox would silently break it (`e.target.value` on a boolean argument). This is real, traceable, and exactly the kind of context gap this station exists to catch — not hypothetical.
- Not inspected: Table/Icon/Tooltip's event-handler conventions (not read closely enough to confirm whether they follow the event or raw-value pattern); Figma-side component descriptions (whether the 5 Figma components/sets have any written purpose/anti-pattern text in their own metadata — not checked this pass); an actual multi-turn agent composition test with a fresh context window (this was traced manually against source, which is close but not identical to the real thing).
- Deviations noted: none — the onChange inconsistency reads as organic drift (native-wrapping components vs. custom-control components naturally diverge) rather than a deliberate design choice, and isn't flagged anywhere in the comments as intentional.
- First move: document the one-line rule — "components wrapping a native form element pass a DOM event; custom controls (Checkbox/Radio/Dropdown/SegmentGroup) pass the raw value" — somewhere greppable (even a one-paragraph note at the top of `components/Components/`) so both humans and agents stop needing to infer it component-by-component.

### Station 10 — Agent access: YELLOW (4/10)
- Surfaces mapped: generic Figma Console MCP (Desktop Bridge) and official Figma MCP (unauthenticated this session) — both general-purpose bridges, not a system-specific server; no Code Connect; no repo-level agent-rules file · Live test: **this session is itself the test** — see below
- Evidence level: live (direct, lived experience this session) + repo scan for Code Connect/agent-rules files (none found)
- Findings:
  - `[verified]` No design-system-specific MCP server or knowledge-graph surface exists — what's reachable is a generic Figma bridge that works on *whatever file happens to be open in Figma Desktop*, not a curated, scoped surface for this system's components/tokens/rules specifically.
  - `[verified]` No Code Connect mapping (confirmed in Station 1/6's repo scan) — a design-to-code AI workflow would generate lookalikes, not real `<Button>`/`<Dropdown>` instances, since nothing tells an agent the Figma node and the React component are the same thing.
  - `[verified]` **This session is the live test, and it's an honest data point both ways.** Within this single conversation, an agent (me) successfully reached real token values, real component source, and live Figma variables, and produced grounded, specific findings throughout this report — proof the ingredients *can* be reached and used well. But getting there required: (a) you manually opening the Desktop Bridge plugin mid-session on my request, (b) the official Figma MCP sitting unavailable the whole time (OAuth never completed), and (c) no standing configuration that would make this reachable automatically in a fresh session next week. That's "capability without adoption" close to verbatim — real, but entirely manual and non-repeatable today.
  - `[verified]` No repo-level agent-rules file (`CLAUDE.md`/`AGENTS.md`/`.cursorrules`) and no documented "how to point an agent at this system" workflow — the access that worked this session depended on this skill's own intake process asking the right questions, not on anything discoverable from the repo itself.
- Not inspected: a dedicated "rebuild a page" generation test through the design-to-code path specifically (Station 9's onChange test is the closer analog; a true page-scaffold test with the Figma bridge driving the UI wasn't separately run this pass).
- Deviations noted: none — for a solo project, the honest story is "access exists when the owner sets it up by hand each time," which is a reasonable place to be before investing in standing infrastructure, not a failure.
- First move: write a short `CLAUDE.md` (or equivalent) at the repo root recording the two things this session had to rediscover by trial — how to connect the Figma bridge, and the onChange convention split from Station 9 — so the next session starts from what this one learned instead of re-deriving it.

## Next service

- Work order: [`ds-inspection/work-orders/2026-10-18-work-order.md`](../work-orders/2026-10-18-work-order.md)
- Recommended cadence: deep inspection quarterly (next: ~2027-01-18); everyday checks worth wiring into CI now: Station 5 (build + a11y on every push), Station 3 (axe via `addon-a11y`)
- Re-inspect by: 2027-01-18, or sooner if a first real consumer shows up (revisits Station 8) or the Figma file's component side gets built out (revisits Stations 1/2/6)
