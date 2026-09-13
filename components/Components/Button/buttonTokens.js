/**
 * Central place for the Tier 3 Button's real property values and the CSS
 * custom property names build-tokens.js generates for them (see
 * tokens.json's "tier_3/buttons" set and build/tier_1_core/css/variables
 * .css) -- keeps every "--ap-button-..." var name construction in one
 * spot instead of hand-typing strings across multiple components.
 *
 * Property values here match the REAL Figma component's
 * componentPropertyDefinitions (see the project doc's Figma button audit,
 * "token + properties audit" section) -- Size: Small/Medium/Large (no
 * Tiny), Priority/Type: Primary/Secondary/Ghost (the token data already
 * calls the third option "ghost", matching what Andrew wants to call it
 * in Storybook -- no rename needed), Border-Radius: none/sm/lg, State:
 * Default/Hover/Clicked/Disabled (Figma's "Clicked" == this project's
 * "active", both in the token data and the generated CSS var name).
 */

export const SIZES = [
	{ key: "small", label: "Small" },
	{ key: "medium", label: "Medium" },
	{ key: "large", label: "Large" },
];

export const PRIORITIES = [
	{ key: "primary", label: "Primary" },
	{ key: "secondary", label: "Secondary" },
	{ key: "ghost", label: "Ghost" },
];

export const RADII = [
	{ key: "none", label: "None" },
	{ key: "sm", label: "Sm" },
	{ key: "lg", label: "Lg" },
];

// `label` keeps Andrew's Figma-facing name ("Clicked"); `key` keeps the
// real token/CSS-var name ("active") -- see the project doc's Dev Mode
// cross-check for why these two vocabularies differ.
export const STATES = [
	{ key: "default", label: "Default" },
	{ key: "hover", label: "Hover" },
	{ key: "active", label: "Clicked" },
	{ key: "disabled", label: "Disabled" },
];

export const buttonVar = {
	color: (priority, state, part) => `--ap-button-color-${priority}-${state}-${part}`,
	padding: (size) => `--ap-button-padding-${size}`,
	textPaddingHorizontal: (size) => `--ap-button-text-padding-horizontal-${size}`,
	minWidth: (size) => `--ap-button-min-width-${size}`,
	radius: (radius) => `--ap-button-border-radius-${radius}`,
	borderWidth: (n) => `--ap-button-border-width-${n}`,
	text: (size) => `--ap-button-text-${size}`,
	iconWidth: (size) => `--ap-button-size-${size}-icon-width`,
	iconHeight: (size) => `--ap-button-size-${size}-icon-height`,
};
