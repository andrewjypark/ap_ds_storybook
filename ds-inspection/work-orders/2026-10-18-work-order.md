# Work Order — ap-ds-storybook (AP Design System)

_From inspection: [`reports/2026-10-18-inspection.md`](../reports/2026-10-18-inspection.md) · Written: 2026-10-18_

Reds get fixed now. Yellows get scheduled. Greens get left alone (and celebrated — there weren't any this pass, but several stations came close). Every item cites its station and evidence. You own prioritization; this is the technician's recommendation.

## 🔴 Fix now (reds)

### 1. Stand up a minimal CI + wire `addon-a11y` back on
- **Station:** 5 (Testing & validation), with Station 3 (Accessibility) · **Evidence:** `[verified]` no `.github/` directory, no test files, `package.json`'s `"test"` script is still the unmodified placeholder; `@storybook/addon-a11y` is installed but deliberately unregistered in `.storybook/main.js`
- **Why it's first:** everything else in this report — the token pipeline, the component craft, the a11y patterns — is currently verified by one person's manual spot-checks. Nothing automated would catch a regression in any of it, and this is the cheapest of the two reds to start closing.
- **First move:** re-enable `@storybook/addon-a11y` in `.storybook/main.js` (one line — it's already installed), then add a minimal GitHub Actions workflow that runs `npm run build-storybook` on every push.
- **AI assist:** have an agent draft the workflow YAML and a first pass at component tests (render + key interaction per component); you review and decide what's worth keeping.
- **Done when:** a push to `main` triggers a CI run, and the Storybook a11y panel shows real output again.
- **Effort:** S

### 2. Decide what to do about Feedback & adoption now that it has no consumers
- **Station:** 8 · **Evidence:** `[reported]` confirmed in intake — solo/portfolio project, no product teams consuming this system yet
- **Why it's listed under reds but isn't urgent:** scored Red by the rubric's letter, but flagged throughout as structurally inapplicable rather than broken. Listed here only so it doesn't get silently treated as "fixed" later — it isn't fixable until there's a first consumer.
- **First move:** none today. Revisit when the sibling `ap_ui_kit` repo or any other project starts pulling from this system.
- **AI assist:** n/a yet.
- **Done when:** a first consumer exists and a lightweight feedback mechanism (even a personal notes file) is in place for it.
- **Effort:** — (deferred, not scheduled)

## 🟡 Schedule (yellows)

### 1. Fix README.md's stale self-identity
- **Station:** 7 (Governance) · **Evidence:** `[verified]` repo renamed `ap-ui-kit` → `ap-ds-storybook` on 2026-09-12 (commit `5083348`); README.md's title and opening paragraph still read "# ap-ui-kit... structured similarly to the `ap_ds_storybook` repo" a month-plus later
- **First move:** rewrite README's opening section to describe itself in its own voice as `ap-ds-storybook`. · **Done when:** the README's first paragraph no longer contradicts `package.json`'s `name` field.
- **Suggested timing:** this week — it's a five-minute fix with outsized "next reader starts from a wrong premise" payoff.

### 2. Close the Dropdown `forceOpen` naming outlier
- **Station:** 4 (Shared language) · **Evidence:** `[verified]` every other docs-only state-pin prop is named `forceState` (Button, TextInput, DropdownField, DropdownMenuRow); `Dropdown.jsx` alone uses `forceOpen`
- **First move:** rename `forceOpen` → `forceState` (accepting `"open"`) in `Dropdown.jsx`. · **Done when:** the prop name matches the rest of the system.
- **Suggested timing:** next time you're in `Dropdown.jsx` for any other reason — low cost, no external consumers yet to break.

### 3. Document the onChange event-vs-value split
- **Station:** 9 (Machine-readable docs) · **Evidence:** `[verified]` `TextInput.onChange` receives a native DOM event; `Checkbox`/`Radio`/`Dropdown`/`SegmentGroup` receive the raw value directly — confirmed by reading all five components' source
- **First move:** add a one-paragraph note (top of `components/Components/`, or a future `CLAUDE.md`) stating the rule explicitly. · **Done when:** the rule is written down somewhere greppable, not just inferable component-by-component.
- **Suggested timing:** bundle with Work Order item 1 above (same root cause — tribal knowledge living only in scattered code comments).

### 4. Add focus management and Escape-to-close to Modal
- **Station:** 3 (Accessibility) · **Evidence:** `[verified]` `Modal.jsx` has correct static ARIA (`role="dialog"`, `aria-modal`) but no `Escape` handler, no focus trap, no focus-on-open/return-on-close
- **First move:** add a `useEffect` that moves focus into the dialog on mount, traps `Tab`, and calls `onClose` on `Escape`. · **Done when:** a keyboard-only user can open, stay contained in, and close the modal without a mouse.
- **Suggested timing:** before this component sees any real product use — overlays are the single most common a11y failure point in component libraries.

### 5. Confirm or clean up the unexplained token sets
- **Station:** 6 (Orchestration) · **Evidence:** `[verified]` `gramercy_tech_021726`, `ap_portfolio_122124`, `sj_041125`, `card`, `tier_1_storybook_ds` exist in `tokens.json` with no matching live Figma collection among the 15 checked
- **First move:** open `tokens.json`, confirm what each set actually contains, and check `build-tokens.js`'s `THEMES`/`VIEWPORTS` arrays never reference them. · **Done when:** you know whether these are safe-to-ignore leftovers from a shared Figma file or something that needs reconciling.
- **Suggested timing:** next token-pipeline touch — low urgency, but worth knowing before it's forgotten entirely.

### 6. Delete the stale `w3c-dtcg-conversion` branch
- **Station:** 7 (Governance) · **Evidence:** `[verified]` `origin/w3c-dtcg-conversion` last touched 2024-11-27, 136 commits behind `main`, 2 ahead, never merged
- **First move:** confirm nothing in it is still wanted, then delete the remote branch. · **Done when:** `git branch -a` shows only `main` and `gh-pages`.
- **Suggested timing:** anytime — pure hygiene, zero risk.

### 7. Fill out the missing staple components (as needed)
- **Station:** 1 (Coverage) · **Evidence:** `[verified]` no card, link, alert/toast, badge, avatar, accordion, pagination, breadcrumb, or nav component exists in code (Figma has a nav component set with no code counterpart)
- **First move:** none forced — decide per real need, not as a checklist. If the sibling `ap_ui_kit`'s nav work is meant to land here too, that's the natural first staple to port.
- **Suggested timing:** driven by whatever you build next that needs one of these, not a standalone project.

## 🔧 Access upgrades (sharper next inspection)

- **Authenticate the native Figma MCP** (OAuth wasn't completed this session) — would let a future inspection cross-check the Console bridge's whole-file reads against the native server's node-specific reads, and remove the "you have to manually open the Desktop Bridge plugin" step each time.
- **Write a `CLAUDE.md`** recording the Figma-bridge connection steps and the onChange convention (Work Order item 3) — directly improves Station 10's score next time, since "access existed but required rediscovery" was its core finding.

## 🟢 Keeping the greens green

No station scored Green this pass, so nothing to protect yet — but two things are close and worth not losing:
- **Token pipeline accuracy** (Station 6): the one value traced matched exactly end-to-end. Don't let the CI gap (Work Order item 1) become the reason a future mismatch goes unnoticed.
- **ARIA correctness on sampled components** (Station 3): genuinely above-average instincts. Keep applying the same "correct role for what this actually is" discipline as new components get built.

## Cadence

- Re-inspect (deep, all stations): 2027-01-18 (quarterly), or sooner if triggered by a first consumer (Station 8) or a Figma component build-out (Stations 1/2/6)
- Everyday checks to wire into CI now: Storybook build (Work Order item 1), `addon-a11y` output
- Owner of this work order: Andrew (solo) · Review: no standing ritual yet — this inspection itself can be the trigger for the next one
