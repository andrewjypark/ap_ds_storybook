/**
 * Real property value lists + the CSS custom property names build-tokens.js
 * generates for them (see tokens.json's "tier_3/radio" set and
 * build/tier_1_core/css/variables.css) -- same pattern as checkboxTokens.js.
 *
 * Per Andrew: don't chase the Figma "Checkbox and Radio" component's own
 * raw mockup values (hover border color, a separate thicker checked-ring
 * width) -- none of them were bound to real variables there anyway, and
 * the result read as an over-built, inconsistent state model next to the
 * rest of this codebase's Tier 3 controls. Radio now mirrors Checkbox's
 * OWN, already-correct state model and token choices exactly:
 *   - Exactly two interactive states -- unchecked and checked -- plus a
 *     flat-opacity `disabled` dim on the real Default/Checked look
 *     (`.ap-radio:disabled { opacity: 0.5 }`), same as
 *     `.ap-checkbox[disabled]`. No hover state at all: Checkbox has none,
 *     so Radio doesn't invent one either -- this also fixes the bug
 *     where hovering an already-selected radio incorrectly reverted its
 *     ring color to a "hover" color (the hover rule's extra pseudo-class
 *     out-specified the checked rule).
 *   - A single `border-width` (no separate, thicker checked-state width)
 *     -- Checkbox doesn't vary its own border-width by state either.
 *   - `border` reuses the EXACT token Checkbox's own unchecked border
 *     uses -- `tier_2_color.border.strong` -- rather than a different,
 *     lighter gray, so the two sibling controls read as part of the same
 *     family at rest.
 *   - `border-checked` and `dot` both reuse `color.brand.color_set_1.500`
 *     -- the same token Checkbox's own `checked` fill and Button's
 *     primary background already use -- instead of Figma's generic
 *     placeholder blue.
 *   - 20x20 outer click target with an 18px ring centered inside (1px
 *     inset), 6x6 inner dot when checked -- geometry only, kept as-is
 *     since it isn't part of what Andrew flagged.
 */

export const STATES = [
	{ key: "unchecked", label: "Unchecked" },
	{ key: "checked", label: "Checked" },
];

export const radioVar = {
	size: () => `--ap-radio-size`,
	dotSize: () => `--ap-radio-dot-size`,
	borderWidth: () => `--ap-radio-border-width`,
	background: () => `--ap-radio-color-background`,
	border: () => `--ap-radio-color-border`,
	borderChecked: () => `--ap-radio-color-border-checked`,
	dot: () => `--ap-radio-color-dot`,
};
