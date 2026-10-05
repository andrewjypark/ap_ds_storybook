/**
 * Real property value lists + the CSS custom property names build-tokens.js
 * generates for them (see tokens.json's "tier_3/radio" set and
 * build/tier_1_core/css/variables.css) -- same pattern as checkboxTokens.js.
 *
 * Sourced from the "Checkbox and Radio" component set (Storybook Planning
 * file, playground_options_container frame -- the Theming Playground's own
 * mockup) via the Desktop Bridge plugin, Button Type=Radio variants.
 * Real property surface: outer ring is an 18x18 circle (cornerRadius 10,
 * i.e. fully rounded) inset 1px inside a 20x20 click target
 * (radio_container's own bounds) -- same "target bigger than the mark it
 * shows" convention Checkbox's 20/14 split already uses. Inner filled dot
 * is 6x6, centered.
 *
 * Figma's own raw values, and how each one was mapped (none of Figma's
 * fills/strokes here were bound to a variable -- boundVariables: {} on
 * every one of them, same "hardcoded example value" situation Checkbox's
 * own audit flagged):
 *   - Every state's outer ring fill is white (`color.neutral.white`).
 *   - Default border (`#bac0c5` raw) is a near-exact match for the
 *     existing `tier_2_color.border.default` token (`#bfc4c8`) -- used
 *     as-is rather than inventing a new one-off value.
 *   - Hover border (`#899199` raw) sits closest to `color.neutral.400`
 *     (`#93989e`) of anything in the existing scale -- noticeably
 *     lighter than `tier_2_color.border.default_hover` (`#64696f`), so
 *     the raw Tier 1 step was used instead of forcing a semantic token
 *     that didn't actually match.
 *   - Checked border + inner dot both used Figma's own generic UI-blue
 *     placeholder (`#3da1ff`-ish), not a real brand color. Rather than
 *     import a second, off-brand blue into the system, both reuse the
 *     EXACT token Checkbox's own `checked` fill and Button's primary
 *     background already use -- `color.brand.color_set_1.500` -- same
 *     reasoning checkboxTokens.js gives for its own checked color.
 *   - Checked's ring is drawn at 3px vs. the unchecked states' 2px --
 *     kept as a second `border-width-checked` token (rounded up to the
 *     existing `{borderWidth.4}` step, same "round up, no 3px step in
 *     the scale" call Checkbox's own border-radius mapping made).
 *   - Disabled states (`State=Disabled`/`Checked & Disabled`) are NOT
 *     given their own color tokens -- same choice Checkbox.css already
 *     made (`.ap-checkbox[disabled] { opacity: 0.5 }`): a flat opacity
 *     dim on the real Default/Checked look reads as "disabled" without
 *     doubling the token surface for a state that's otherwise identical.
 *   - No Figma "Focus" styling (a generic blue outline) was carried over
 *     either -- Checkbox has no custom focus treatment, so Radio relies
 *     on the same native `:focus-visible` outline for consistency with
 *     its sibling control rather than introducing a new focus pattern
 *     only one Tier 3 component would have.
 */

export const radioVar = {
	size: () => `--ap-radio-size`,
	dotSize: () => `--ap-radio-dot-size`,
	borderWidth: () => `--ap-radio-border-width`,
	borderWidthChecked: () => `--ap-radio-border-width-checked`,
	background: () => `--ap-radio-color-background`,
	border: (state) => `--ap-radio-color-border-${state}`, // default | hover | checked
	dot: () => `--ap-radio-color-dot`,
};
