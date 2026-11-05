/**
 * Central place for the Tier 3 Link's CSS custom property names
 * build-tokens.js generates from tokens.json's "tier_3/link" set (see
 * build/tier_1_core/css/variables.css) -- keeps every "--ap-tier-3-link-..."
 * var name construction in one spot, same convention as Button's
 * buttonTokens.js.
 */

export const STATES = [
	{ key: "default", label: "Default" },
	{ key: "hover", label: "Hover" },
	{ key: "active", label: "Active" },
	{ key: "visited", label: "Visited" },
];

export const VARIANTS = [
	{ key: "content", label: "Default" },
	{ key: "knockout", label: "Knockout (dark background)" },
];

export const linkVar = {
	color: (variant, state) => `--ap-tier-3-link-color-${variant}-${state}`,
};
