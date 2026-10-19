# Component Gap Analysis — AP Design System vs. Industry

_Analyzed: 2026-10-19 · Claude (Sonnet 5), via the `design-systems` MCP · Companion to the [2026-10-18 multi-point inspection](../../ds-inspection/reports/2026-10-18-inspection.md)_

## The ask

> Use the design systems MCP to analyze the AP Design System against the popular design systems represented in the design systems MCP. Do a gap analysis of the most important and pressing, or the most popular, components or variants of components that exist in other systems but don't exist in AP Design System.

## The short version

AP Design System ships 10 components (Button, Checkbox, Dropdown, Icon, Modal, Radio, SegmentGroup, Table, TextInput, Tooltip) on a genuinely strong token foundation. Cross-referencing against 12 real design systems' published component inventories (Carbon, Polaris, Material, Primer, Porsche, Skoda Flow, Razorpay Blade, Dell, Pluralsight, Helly Hansen, Atlassian, CBRE Blocks — drawn from the `design-systems` MCP's 127-system catalog) plus the catalog's own cross-system component taxonomy, two components are near-universal and **completely absent** from AP DS: **Tabs** (11/12 systems) and **Alert banner/Toast** (11/12 systems). Neither was flagged in the 2026-10-18 inspection's "missing staples" list — Tabs in particular is a genuinely new finding, not a restatement of known gaps.

The highest-leverage single addition, though, isn't the most frequent one: AP DS already has 4 navigation-related component sets live in Figma with zero code equivalent (flagged in the 2026-10-18 inspection, Station 1) — that's a design asset sitting unused while Nav/App bar appears in the majority of systems surveyed. Building Nav first converts existing design work into shipped code, rather than starting from zero.

## Methodology

- **AP DS inventory**: pulled from the 2026-10-18 inspection (`ds-inspection/reports/2026-10-18-inspection.md`, Station 1) — live Figma read (7,724 variables / 15 collections; 1 loose component + 4 nav-related component sets) + direct repo read (10 built components, each with a matching Tier 3 token set).
- **Industry comparison**: `design-systems` MCP, `browse_by_category("components")` (127 cataloged systems) and `search_chunks`/`search_design_knowledge` for full per-system component lists. Full lists captured for 12 systems: **Carbon** (IBM), **Polaris** (Shopify), **Material Design** (Google), **Primer** (GitHub), **Porsche**, **Skoda Flow**, **Razorpay Blade**, **Dell**, **Pluralsight**, **Helly Hansen**, **Atlassian** (partial — list was truncated at source), **CBRE Blocks**. Also used the catalog's own aggregated component taxonomy (`designsystems.surf/components`), which names Alert banner, Button, Checkbox, Tabs, Text field, and Switch as its top-level featured set.
- **Scope note**: Microsoft Fluent 2, Adobe Spectrum, and Salesforce Lightning are cataloged in the MCP (confirmed present) but the MCP's indexed content for them this pass was guideline/accessibility material, not a component-by-component listing — they're included in the system count but didn't contribute to the frequency tally below. Frequency counts are out of the 12 systems with captured full lists, not all 127.
- **"Important and pressing" vs. "popular"**: ranked primarily by cross-system frequency, then adjusted up for components with a clear low-cost path (existing Figma assets, simple to build) and down for components whose function is already substantially covered by an existing AP component (e.g., Select vs. Dropdown).

## AP Design System's current inventory

| Layer | Contents |
|---|---|
| Code components | Button, Checkbox, Dropdown, Icon, Modal, Radio, SegmentGroup, Table, TextInput, Tooltip (10 total, each with a 1:1 Tier 3 token set) |
| Figma components | 1 loose component + 4 component sets — all nav-related (Primary Nav, Nav Item, Button - Nav Expand, Primary Nav Item Collapsed) — no code equivalent exists |
| Foundations | Border, Color, Typography (3 categories), tiered Tier 1→2→3 architecture, 7,724 variables / 15 collections |

## Cross-system frequency — components AP Design System is missing

Counted across the 12 systems with captured full component lists; AP DS currently has none of these.

| Component | Systems with it (of 12) | In AP DS today? |
|---|:-:|:-:|
| **Tabs** | 11 | ❌ |
| **Alert banner / Toast** | 11 | ❌ |
| **Link** | 9 | ❌ |
| **Progress bar / indicator** | 9 | ❌ |
| **Switch / Toggle** | 9 | ❌ |
| Card | 8 | ❌ (demo-only `ExampleCard`, not a library component) |
| List | 8 | ❌ |
| Badge | 7 | ❌ |
| Menu | 7 | ⚠️ partially — exists internally as `DropdownMenuRow`, not standalone |
| Breadcrumb | 6 | ❌ |
| Accordion | 6 | ❌ |
| Pagination | 6 | ❌ |
| Divider | 6 | ❌ |
| Avatar | 5 | ❌ |
| Search | 5 | ❌ |
| Date picker | 5 | ❌ |
| Navigation / App bar | 5+ (Material, Primer, Polaris, Pluralsight, Atlassian) | ⚠️ in Figma only, no code |

## Prioritized gaps — what to build, and why

**Tier 1 — build first**

1. **Navigation bar / Nav** — not the most frequent, but the cheapest high-value win: Figma assets already exist (4 component sets), so this is a code-only lift, not a design-and-code lift. Appears in a majority of systems surveyed (Material, Primer, Polaris, Pluralsight, Atlassian) and is the one category where AP's design investment is already ahead of its code.
2. **Tabs** — 11/12 systems, and a genuinely new finding (not in the 2026-10-18 "missing staples" list). High reuse: once built, usable inside Modal, Table, and any future settings/detail pages.
3. **Alert banner / Toast** — 11/12 systems. AP DS has zero user-feedback/status-messaging component today; this is the standard mechanism for it everywhere else.

**Tier 2 — build next**

4. **Link** — 9/12. Currently every clickable text in the system has to be hand-styled or borrowed from Button; a dedicated Link closes a real, frequently-hit gap.
5. **Switch / Toggle** — 9/12. Distinct interaction pattern from Checkbox (instant-apply vs. form-submit semantics) that most systems treat as a separate primitive.
6. **Progress bar / indicator** — 9/12. No loading/progress affordance exists anywhere in AP DS today.
7. **Card** — 8/12, and the single most structurally significant gap: Card is a composition primitive other components (and most real pages) get built inside of. A `ExampleCard` demo already exists in `ThemingPlayground`, so this has a rough starting point.

**Tier 3 — schedule as backlog, build on real need**

8. Badge (7/12), Breadcrumb (6/12), Accordion (6/12), Pagination (6/12), List (8/12, but low complexity/low risk), Avatar (5/12), Divider (6/12, trivial to build whenever first needed).

**Lower priority / already substantially covered**

- **Menu** — exists internally as `DropdownMenuRow`; extracting it as a standalone component is a refactor, not a net-new gap.
- **Select** — several systems (Carbon, Primer, Porsche, Dell) list Select separately from Dropdown, but AP's `Dropdown`/`DropdownField` already covers the same interaction; treat as naming, not a missing capability.
- **Date picker, Search, Combobox, Autocomplete** — real gaps (5/12 each) but meaningfully higher build cost than anything in Tiers 1–2 for the frequency they'd buy; defer until there's a concrete product need, consistent with the 2026-10-18 inspection's existing guidance on the rest of the missing-staples list.

## First move

Build Nav from the existing Figma component sets — it's the only gap on this list where the design work is already done, and it directly resolves the Station 1 finding (2026-10-18 inspection) that AP's design and code component inventories don't overlap at all today.
