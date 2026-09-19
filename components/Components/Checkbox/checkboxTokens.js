/**
 * Real property value lists + the CSS custom property names build-tokens.js
 * generates for them (see tokens.json's "tier_3/checkbox" set and
 * build/tier_1_core/css/variables.css) -- same pattern as buttonTokens.js /
 * dropdownTokens.js / segmentGroupTokens.js.
 *
 * Sourced from the real "Checkbox" component (Storybook Planning file,
 * "Components from GT" page, node 38:3812's "checkbox" cell-type variant)
 * via the Desktop Bridge plugin, found while auditing the Table Row
 * component system (see tableTokens.js's own doc comment for that audit).
 * Real property surface: a single `State` variant with exactly two
 * options -- `Empty` (unchecked) and `Filled` (checked). There is no
 * third "indeterminate" state in Figma -- this component only builds
 * what's actually there, not a state nobody asked for.
 *
 * Figma's own raw values, and how each one was mapped:
 *   - 20x20 outer bounds, with a 14x14 visual box centered inside (3px
 *     inset on every side) -- the 20px outer size is kept as a real
 *     token (`size`) since it sets a comfortable click/tap target
 *     distinct from the smaller visual glyph (`box-size`), the same
 *     "target bigger than the mark it shows" convention most checkbox
 *     implementations use even when a source design doesn't spell it out
 *     as two separate properties.
 *   - Empty: white fill (`#ffffff`), 1.5px near-black border (`#222222`),
 *     2px corner radius. `border-radius: {borderRadius.2}` is an exact
 *     match to the existing scale. `border-width` doesn't have a 1.5
 *     step -- rounded up to `{borderWidth.2}` (2px) rather than down to
 *     1px, since 1.5 is numerically closer to 2. Neither fill nor stroke
 *     was bound to a Figma variable (`boundVariables: {}` on both) --
 *     same "hardcoded example value, not a real token binding" situation
 *     already flagged for the Table's own status-badge example content
 *     (see the project doc's Table audit) -- so the border color maps
 *     onto the closest existing SEMANTIC token instead of the raw hex:
 *     `tier_2_color.border.strong` (`{color.neutral.900}`, `#101214`) is
 *     the nearest existing near-black border step.
 *   - Filled: a solid `#000596` box with a white checkmark glyph (a TEXT
 *     node in Figma, not a vector). Also unbound to any variable. Rather
 *     than invent a new one-off brand color for this single glyph,
 *     `checked` reuses the EXACT tokens Button's own primary variant
 *     already uses for its solid brand fill (`color.brand.color_set_1.500`)
 *     and its on-brand text/icon color (`color.neutral.white`) --
 *     `buttonTokens.js`/tokens.json's "tier_3/buttons" set,
 *     `button.color.primary.default.background` /
 *     `button.color.primary.default.text`. A checked checkbox is
 *     visually a small solid-brand control just like a primary button,
 *     so reusing that exact pair keeps the two consistent rather than
 *     introducing a second "brand solid" color into the system.
 */

export const STATES = [
	{ key: "unchecked", label: "Unchecked" },
	{ key: "checked", label: "Checked" },
];

export const checkboxVar = {
	size: () => `--ap-checkbox-size`,
	boxSize: () => `--ap-checkbox-box-size`,
	borderRadius: () => `--ap-checkbox-border-radius`,
	borderWidth: () => `--ap-checkbox-border-width`,
	border: () => `--ap-checkbox-color-border`,
	background: (state) => `--ap-checkbox-color-background-${state}`, // unchecked | checked
	checkmark: () => `--ap-checkbox-color-checkmark`,
};
