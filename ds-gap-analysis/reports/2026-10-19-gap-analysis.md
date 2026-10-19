# Component Gap Analysis — AP Design System vs. Industry

_Analyzed: 2026-10-19 · Claude (Sonnet 5), via the `design-systems` MCP and live Figma Desktop Bridge · Companion to the [2026-10-18 multi-point inspection](../../ds-inspection/reports/2026-10-18-inspection.md)_

## The ask

> Use the design systems MCP to analyze the AP Design System against the popular design systems represented in the design systems MCP. Do a gap analysis of the most important and pressing, or the most popular, components or variants of components that exist in other systems but don't exist in AP Design System.

Gaps turned out to exist at three layers, not one: **missing components**, **missing variants within components AP DS already has**, and **missing cross-cutting patterns** (states/behaviors meant to apply uniformly across many components, like loading or read-only treatment).

## The short version

AP Design System ships 10 code components (Button, Checkbox, Dropdown, Icon, Modal, Radio, SegmentGroup, Table, TextInput, Tooltip) on a genuinely strong token foundation. Cross-referencing against 12 real design systems' published component inventories (Carbon, Polaris, Material, Primer, Porsche, Skoda Flow, Razorpay Blade, Dell, Pluralsight, Helly Hansen, Atlassian, CBRE Blocks) plus a second, separate Figma file — **"Storybook Planning - Possible Components File"**, connected mid-analysis — surfaces a more specific picture than "components that don't exist anywhere yet."

That planning file is explicitly a research/scratch space (page names include "buttons that i'm not using," "092626_Mockups to try to apply design system," and "Components from GT" — material reused from a prior client project, Gramercy Tech, which also explains the unexplained `gramercy_tech_021726` token set the 2026-10-18 inspection flagged). Several components this analysis would otherwise call pure blank-slate gaps already have real design precedent somewhere in that file — Nav, Card, Tabs, Badge, Toggle, and a richer Table than what's built — at varying levels of maturity, from finalized to thin to explicitly rejected. Each is called out individually below with its actual provenance, rather than treated as a uniform "already designed" credit.

The single most load-bearing finding: **indeterminate state is missing from Checkbox in both code and Figma** — not a code oversight, a real unfinished design decision — and it matters now because Table already supports row-selection checkboxes per cell, which is exactly the pattern ("select all" headers) that needs indeterminate to work correctly.

## Methodology

- **AP DS code inventory**: 10 built components, each read directly from source for its real prop/variant signature (not inferred from docs, since Storybook autodocs is disabled per the 2026-10-18 inspection).
- **AP DS Figma inventory**: live Desktop Bridge read of two connected files — **"AP Design System"** (the tokens/foundations file from the 2026-10-18 inspection: 7,724 variables, 1 loose component + 4 nav-related sets) and **"Storybook Planning - Possible Components File"** (46 components/component sets across 14 pages, connected this session). Page-level provenance was traced for every relevant component via the Plugin API (`figma_execute`), not assumed from naming alone.
- **Industry comparison**: `design-systems` MCP, full component lists captured for 12 systems (Carbon, Polaris, Material, Primer, Porsche, Skoda Flow, Razorpay Blade, Dell, Pluralsight, Helly Hansen, Atlassian (partial), CBRE Blocks) out of 127 cataloged, plus the catalog's own cross-system "patterns" category (loading, disabled/read-only states, filtering, search, status indicators) for the cross-cutting-pattern layer.
- **Scope note**: Microsoft Fluent 2, Adobe Spectrum, and Salesforce Lightning are cataloged in the MCP but the indexed content for them this pass was guideline/accessibility material, not a component list — included in the system count, not the frequency tally.
- **Provenance handling**: where a component exists in the planning file, its page of origin is stated and weighted honestly — a finalized "AP DS -" prefixed set is different evidence than a page called "buttons that i'm not using." Per direction from the repo owner, designs reused from the GT/Gramercy Tech page count as real precedent AP DS can adapt, not discounted as foreign.

## AP Design System's current inventory

| Layer | Contents |
|---|---|
| Code components | Button, Checkbox, Dropdown, Icon, Modal, Radio, SegmentGroup, Table, TextInput, Tooltip (10 total, each with a 1:1 Tier 3 token set) |
| Figma — "AP Design System" file | 1 loose component + 4 nav-related sets (Primary Nav, Nav Item, Button - Nav Expand, Primary Nav Item Collapsed) |
| Figma — planning file | 13 loose components + 33 component sets across 14 research/scratch pages — see per-component provenance below |
| Foundations | Border, Color, Typography; Tier 1→2→3 architecture; 7,724 variables / 15 collections |

## Layer 1 — Missing components, ranked by cross-system frequency

| Component | Systems with it (of 12) | In AP DS code? | Figma precedent |
|---|:-:|:-:|---|
| **Tabs** | 11 | ❌ | Thin — `tabs_wrapper_082526` (Components from GT) is a 2-variant background-color wrapper only; no tab-item, active-indicator, or panel structure |
| **Alert banner / Toast** | 11 | ❌ | None found in either Figma file |
| **Link** | 9 | ❌ | None found |
| **Progress bar / indicator** | 9 | ❌ | None found |
| **Switch / Toggle** | 9 | ❌ | Real — `Toggle` (100526_Radio buttons research page), 4 variants: Off/On/Read-Only Off/Read-Only On. Dated research page, not promoted to an "AP DS -" prefix like Nav was |
| Card | 8 | ❌ (demo-only `ExampleCard` in `ThemingPlayground`) | Thin — `card-flavor` (092626_Mockups to try to apply design system) is 2 variants (default/hover + optional badge), built to test tokens in a layout, not a proposed library component |
| List | 8 | ❌ | None found |
| Badge | 7 | ❌ | Real but domain-specific — `status_badge` (Components from GT), 7 status variants (Active/Draft/Sent/Scheduled/Provisioning/Green_Text/Blue_Text) — these are email-campaign states, not generic badge semantics (success/warning/error/info); reusing this needs relabeling, not just re-skinning |
| Menu | 7 | ⚠️ internal only (`DropdownMenuRow`) | n/a |
| Breadcrumb | 6 | ❌ | None found |
| Accordion | 6 | ❌ | None found |
| Pagination | 6 | ❌ | None found |
| Divider | 6 | ❌ | None found |
| Avatar | 5 | ❌ | None found |
| Search | 5 | ❌ | None found |
| Date picker | 5 | ❌ | None found |
| **Navigation / App bar** | 5+ | ❌ | **Finalized** — "AP DS - Primary Nav", "AP DS - Nav Item", "AP DS - Button - Nav Expand", "AP DS - Primary Nav Item Collapsed" exist in the actual AP Design System file itself (not just the planning file), the only components here promoted to the system's real naming convention |

## Prioritized gaps — what to build, and why

**Tier 1 — build first (real design precedent, code-only or near-code-only lift)**

1. **Navigation bar / Nav** — the one gap where design work is genuinely finished and already living in the production AP Design System file, not the scratch file. Code-only lift. Appears in a majority of systems surveyed (Material, Primer, Polaris, Pluralsight, Atlassian).
2. **Switch / Toggle** — 9/12 systems, and the Figma research already models a Read-Only state pair alongside Off/On — more variant maturity than most other candidates on this list, even though it hasn't been promoted out of its research page yet.

**Tier 2 — build next (real gap, little or thin design precedent)**

3. **Alert banner / Toast** — 11/12 systems, no design precedent anywhere. AP DS has zero user-feedback/status-messaging mechanism today.
4. **Tabs** — 11/12 systems. The GT-page wrapper is too thin to build from (no tab-item or panel structure) — treat as a from-scratch build despite the nominal Figma hit.
5. **Link** — 9/12 systems, no precedent. Every clickable text today is hand-styled or borrowed from Button.
6. **Progress bar / indicator** — 9/12 systems, no precedent. No loading affordance exists anywhere in AP DS.
7. **Card** — 8/12 systems. The mockup-test version is real but minimal (badge flag + hover state only — no media/body/actions zones like Carbon or Polaris model). Use it as a starting point, not a finished spec.

**Tier 3 — schedule as backlog, build on real need**

8. **Badge** (7/12) — `status_badge`'s variants need genericizing (status vocabulary → success/warning/error/info/neutral) before reuse; not a drop-in.
9. Breadcrumb (6/12), Accordion (6/12), Pagination (6/12), List (8/12, low complexity), Avatar (5/12), Divider (6/12, trivial whenever first needed).

**Lower priority / already substantially covered**

- **Menu** — exists internally as `DropdownMenuRow`; extracting it standalone is a refactor, not a net-new gap.
- **Select** — Dropdown/DropdownField already covers this interaction under a different name.
- **Date picker, Search, Combobox, Autocomplete** — real gaps (5/12 each) but high build cost relative to Tier 1–2; defer per the 2026-10-18 inspection's existing guidance on the rest of the missing-staples list.

## Layer 2 — Variants missing within components AP DS already has

Checked against each component's real prop signature (`Button.jsx`, `Checkbox.jsx`, `Modal.jsx`, `TableCell.jsx`/`TableRow.jsx`, etc.) and, where available, the matching Figma component's variant properties.

| Component | Variant gap | Evidence |
|---|---|---|
| **Checkbox** | No indeterminate state | Confirmed missing in **both** code (`checked`/`disabled` only) and Figma (`Checkbox and Radio` set models Default/Hover/Checked/Disabled/Focus/Checked & Disabled/Focus & Checked — 7 states, no indeterminate). This is the highest-leverage variant gap on this list: Table's `TableCell` already supports a `checked` prop for row-selection checkboxes, which is exactly the pattern that needs an indeterminate "select all" header checkbox to be correct. |
| **Modal** | No size variants | Code (`Modal.jsx`) takes `title`/`onClose`/`children`/`footer`/`overlay` — no `size` prop at all, so every modal renders at one fixed width. Most systems surveyed (Carbon's dialog pattern, Polaris, Material) model small/medium/large or fullscreen as a first-class variant. |
| **Button** | No destructive/warning variant | Code's `priority` prop only has documented values `primary`/`ghost` (per the component's own doc comment); a rejected Figma exploration (`Button`, "buttons that i'm not using" page) modeled `Primary/Secondary/Warning/Drawer 1/Drawer 2/Transparent-On Light/Transparent-On Dark` — that specific design was discarded, but Warning/destructive and Secondary are near-universal button variants industry-wide (Material's guidance explicitly lists Primary/Secondary/Text/Icon as the standard set), independent of this one rejected mockup. Worth re-deriving a destructive variant from scratch rather than resurrecting the rejected set wholesale. |
| **Table** | No header/alt-row-background variant | Code's `TableRow` takes only `variant = "body"` — no explicit header-row treatment or alternating-background option. The GT-page `table_row_072426` set already models `header_row` / `body_row` / `body_row_alt_bg_color` as a three-way variant, and `table_row_cell_container` separately models a dedicated `table_header_row_title` cell type — real, reusable design precedent for a gap that's currently code-only. |
| **Dropdown** | Single-select only | No multi-select or searchable/typeahead mode in code; most systems treat these as separate components (Combobox, Multi-select) rather than Dropdown variants, so this is noted but not elevated — likely a new-component decision, not a variant add, if ever needed. |

## Layer 3 — Missing cross-cutting patterns

These apply *across* components rather than to one — surfaced via the `design-systems` MCP's `patterns` category, distinct from its `components` category used above.

| Pattern | Gap | Note |
|---|---|---|
| **Read-only state** | Started, not propagated | `Toggle`'s Figma design already distinguishes Off/On from Read-Only Off/Read-Only On — the one place in the entire system (code or Figma) this convention exists at all. Carbon's read-only-states pattern treats this as a system-wide concern (distinct from `disabled`: read-only means "visible but not editable," disabled means "not interactive, often invisible to screen readers"). AP DS has no equivalent distinction anywhere else — TextInput, Dropdown, Checkbox, Radio all only have `disabled`. |
| **Loading / skeleton state** | Missing entirely | No component in AP DS has a loading or skeleton treatment. Ties directly to the missing Progress indicator (Layer 1) but is broader — Table, Dropdown (async options), and Modal (async actions) would each need their own loading affordance under most systems' conventions. |
| **Status indicators** | Partial, inconsistent | `status_badge` (Components from GT) is the only status-communication pattern that exists anywhere, and its vocabulary is domain-specific to the GT project rather than a generic system (Carbon's status-indicator pattern distinguishes icon/shape/badge indicators with a consistent semantic set — success/warning/error/info). |
| **Filtering** | Not applicable yet | No components with collection/list semantics exist yet (Table only renders rows passed to it) — correctly out of scope until Table or a List component grows that need. |

## First move

Build Nav from the existing, already-finalized "AP DS -" prefixed Figma sets — the only gap on this entire list where production-ready design work is done and just needs code. It also directly resolves the Station 1 finding from the 2026-10-18 inspection that AP's design and code component inventories don't overlap at all today.

Second move, same session if there's room: add indeterminate state to Checkbox (both Figma and code) — it's the smallest fix with the clearest downstream consequence, since Table's row-selection checkboxes are already shipped and waiting on it.

## Flagged follow-up — design-source token binding (out of scope for this report)

While tracing Figma provenance for the components above, a direct `boundVariables` check (not visual inspection) on fills/strokes in the planning file turned up something adjacent to this gap analysis but outside its scope: **several already-shipped code components have Figma design sources that are only partially — or not at all — bound to variables**, even though their built code is confirmed tokenized (2026-10-18 inspection, Station 6).

| Component | Fills bound | Strokes bound | Shipped in code? |
|---|:-:|:-:|:-:|
| Segment / Segment Group / Segment Content | 0% | 0% | Yes — `SegmentGroup` |
| Dropdown_Field_070326 | 33% | 0% | Yes — `Dropdown`/`DropdownField` |
| Text Input Field_062526 | 50% | 100% | Yes — `TextInput` |
| Tooltip | 75% | — | Yes — `Tooltip` |
| Modal sections (header/body/footer) | 100% | — | Yes — `Modal` |

`SegmentGroup`'s design source is the starkest case — zero variable binding in Figma despite being a real, tokenized, shipped component. Nav shows what the fix looks like in practice: its plain-named sets are mostly unbound originals (0–50%), sitting alongside "AP DS -" prefixed rebuilds that are 97–100% bound — a real promotion pattern already used once in this file. The same rebuild-and-promote pass likely needs to happen for Segment Group, Dropdown Field, and Text Input Field.

This is a design↔code sync question, not a missing-component or missing-variant gap, and sits more naturally as a follow-up to the 2026-10-18 inspection's Station 6 (Orchestration) than as a finding in this report — noted here for the record, not scored or prioritized above.
