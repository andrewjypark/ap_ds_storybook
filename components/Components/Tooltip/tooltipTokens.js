/**
 * Real property value lists + the CSS custom property names build-tokens.js
 * generates for them (see tokens.json's "tier_3/tooltip" set and
 * build/tier_1_core/css/variables.css) -- same pattern as
 * checkboxTokens.js / tableTokens.js.
 *
 * Sourced from the real "Tooltip" Figma COMPONENT_SET (Storybook Planning
 * file, "Components from GT" page, node 38:3326, found by opening the
 * "tooltip" demo frame Andrew had selected -- node 38:3315 -- which turned
 * out to just be a page of example content wrapping the real component
 * set two frames deep) via the Desktop Bridge plugin.
 *
 * Real property surface -- exactly two VARIANT axes plus one TEXT prop,
 * no more:
 *   - `Color`: `Dark` (default) / `Light`.
 *   - `Position`: `Bottom` (default) / `Top` / `Left` / `Right` -- this is
 *     where the ARROW sits (and which direction it points), matching the
 *     universal tooltip convention of describing where the bubble sits
 *     relative to whatever it's pointing at: "Bottom" means the tooltip
 *     is below its target, so the arrow is on the bubble's TOP edge
 *     pointing up at the target above it (confirmed against the real
 *     component's child order/transforms below).
 *   - `Tooltip Text` (a TEXT property, default "Tooltip Text") -- the
 *     bubble's own label, mapped onto this component's `text` prop.
 *
 * Structure per variant: an auto-layout frame (VERTICAL for Top/Bottom,
 * HORIZONTAL for Left/Right) holding exactly two children -- a small
 * triangular "Polygon 1" vector (the arrow, 10x5 at its unrotated size)
 * and a padded text frame (the bubble). Child ORDER and TRANSFORM differ
 * by position, both confirmed by inspecting each variant's real
 * `relativeTransform` (not just the `.rotation` getter, which reported 0
 * for the Top variant's arrow even though its transform is actually a
 * vertical flip -- Figma's rotation getter doesn't decompose a pure
 * reflection into a rotation value, so the raw matrix had to be read
 * directly to confirm the Top arrow really does point down, not up):
 *   - Bottom: arrow, then bubble (vertical stack) -- arrow unrotated
 *     (points up), sits above the bubble.
 *   - Top: bubble, then arrow -- arrow's transform is a Y-axis flip
 *     (points down), sits below the bubble.
 *   - Left: bubble, then arrow (horizontal stack) -- arrow's transform
 *     rotates+reflects it to point right, sits to the bubble's right.
 *   - Right: arrow, then bubble -- transform points it left, sits to the
 *     bubble's left.
 *   All four checked out as correctly authored (arrow always points
 *     toward whatever the tooltip is attached to) once the real
 *     transform matrices were read instead of the `.rotation` scalar.
 *
 * Sizing: bubble padding 8px horizontal / 4px vertical, 2px corner
 * radius (`{borderRadius.2}`, an exact match to the existing scale, same
 * step Checkbox's own border-radius uses). Arrow: 10px (base) x 5px
 * (point-to-base height) at its unrotated size -- kept as two plain
 * `sizing` tokens (`arrow-width`/`arrow-height`) since the CSS
 * implementation draws it as a border-triangle rather than an SVG, and
 * needs both numbers independently (see Tooltip.css). No gap between
 * arrow and bubble (Figma's own auto-layout has `itemSpacing: 0` here).
 *
 * Text: Figma's demo renders 14px/300 "Lexend" (this file's own demo
 * font, not the project's real type scale, the same situation flagged
 * throughout this whole component-family audit) -- 14px/300 is an exact
 * match for `tier_2_typography.body.sm`, the same step Table's own body
 * text already uses, so that's what `tooltip.text` aliases to.
 *
 * Colors -- neither the bubble/arrow fill nor the text fill is bound to
 * a token in Figma; all four are raw hex values pulled from a separate
 * "grays-v2" variable collection that isn't this project's own color
 * scale (the same "foreign/unbound library" situation already flagged
 * for the Table's divider line and the Checkbox's border/fill in their
 * own audits). Mapped onto the closest step of this project's OWN
 * `color.neutral` scale instead of importing that outside library:
 *   - Dark background/arrow: Figma's `color/grays-v2/600` (`#40444b`) ->
 *     `{color.neutral.600}` (`#3d4247`) -- nearly identical, and there's
 *     no existing `tier_2_color.background.*` semantic step at this
 *     exact tone (the closest named dark surface, `surface_inverse_
 *     primary`, is `{color.neutral.800}` -- visibly darker than Figma's
 *     actual value), so this binds straight to the tier_1 neutral scale
 *     rather than reach for a semantic token that doesn't really match.
 *   - Dark text: Figma's `color/grays-v2/0` (`#fcfdff`) ->
 *     `{color.neutral.white}` (`#ffffff`) -- effectively identical.
 *   - Light background/arrow: same `color/grays-v2/0` -> `{color.neutral
 *     .white}` again (Figma reuses its own "0" step for both).
 *   - Light text: Figma's `color/grays-v2/700` (`#272a30`) ->
 *     `{color.neutral.700}` (`#23272b`) -- nearly identical, and
 *     conveniently the exact step `tier_2_color.content.default`
 *     already aliases to, though this binds directly to the tier_1
 *     value like its Dark counterpart for symmetry between the two
 *     color variants.
 */

export const COLORS = [
	{ key: "dark", label: "Dark" },
	{ key: "light", label: "Light" },
];

export const POSITIONS = [
	{ key: "bottom", label: "Bottom" },
	{ key: "top", label: "Top" },
	{ key: "left", label: "Left" },
	{ key: "right", label: "Right" },
];

export const tooltipVar = {
	paddingHorizontal: () => `--ap-tooltip-padding-horizontal`,
	paddingVertical: () => `--ap-tooltip-padding-vertical`,
	borderRadius: () => `--ap-tooltip-border-radius`,
	arrowWidth: () => `--ap-tooltip-arrow-width`,
	arrowHeight: () => `--ap-tooltip-arrow-height`,
	text: () => `--ap-tooltip-text`,
	background: (color) => `--ap-tooltip-color-background-${color}`, // dark | light
	textColor: (color) => `--ap-tooltip-color-text-${color}`, // dark | light
};
