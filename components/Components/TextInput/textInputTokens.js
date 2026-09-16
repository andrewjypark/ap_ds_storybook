/**
 * Central place for the Tier 3 Text Input's real property values and the
 * CSS custom property names build-tokens.js generates for them (see
 * tokens.json's "tier_3/text-input" set and build/tier_1_core/css/
 * variables.css) -- same pattern as buttonTokens.js.
 *
 * Property values here match the real Figma component's
 * componentPropertyDefinitions, read live off the "Text Input
 * Field_062526" component set (node 49:5631) in the "Storybook Planning"
 * file via the Desktop Bridge plugin on 2026-09-16 -- see the project
 * doc's Text Input audit for the full property list and the bound-
 * variable trace for every color/typography value below.
 *
 * Two real variant axes: State (Default/Active/Filled/Error) and Type
 * (Default/Text Area/URL) -- no Size axis (the Figma component is a
 * fixed 300px wide, unlike Button's three sizes).
 */

export const TYPES = [
	{ key: "text", label: "Default" },
	{ key: "textarea", label: "Text Area" },
	{ key: "url", label: "URL" },
];

// `key` drives both the CSS var lookup and the real interaction this state
// maps to -- see TextInput.jsx's doc comment for how each one is reached
// in real usage (focus, a real value, the `error` prop) vs. via the
// docs-only `forceState` escape hatch used below on the Variations page.
export const STATES = [
	{ key: "default", label: "Default" },
	{ key: "active", label: "Active" },
	{ key: "filled", label: "Filled" },
	{ key: "error", label: "Error" },
];

export const textInputVar = {
	background: () => `--ap-text-input-color-background`,
	border: (state) => `--ap-text-input-color-border-${state}`, // default | active | filled | error
	text: () => `--ap-text-input-color-text`,
	label: () => `--ap-text-input-color-label`,
	description: () => `--ap-text-input-color-description`,
	// Figma's Filled border reuses the same 0.5px hairline as Default
	// (only Active/Error thicken to 1px) -- no separate "filled" border-
	// width token, matching what build/tier_1_core/css/variables.css
	// actually generated.
	borderWidth: (state) => `--ap-text-input-border-width-${state === "filled" ? "default" : state}`,
	borderRadius: () => `--ap-text-input-border-radius`,
	paddingHorizontal: () => `--ap-text-input-padding-horizontal`,
	paddingVertical: () => `--ap-text-input-padding-vertical`,
	gap: () => `--ap-text-input-gap`,
	font: () => `--ap-text-input-text`,
	labelFont: () => `--ap-text-input-label-text`,
	iconFieldTitle: (dim) => `--ap-text-input-icon-field-title-${dim}`, // width | height
	iconSlot: (dim) => `--ap-text-input-icon-slot-${dim}`, // width | height
};
