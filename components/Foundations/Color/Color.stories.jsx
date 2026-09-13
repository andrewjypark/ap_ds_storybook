import { makeTier1ColorStories } from "./tier1ColorStories.jsx";

/**
 * Core contains the complete set of Tier 1 color tokens. Green Tier 1
 * and Gold Tier 1 only contain the tokens that differ from Core.
 */
export default {
	title: "Tier 1: Global Tokens/Tier 1 - Core/Color",
	// No explicit docs.description.component override here -- falls back to
	// the leading JSDoc comment above, same as ColorGreen.stories.jsx and
	// ColorGold.stories.jsx already do. Previously had its own override text
	// ("Live-computed color tokens for the Core theme...") that had drifted
	// out of sync with the Green/Gold copy and was no longer accurate.
	parameters: { layout: "padded" },
};

const stories = makeTier1ColorStories("core");

export const ColorPalettes = stories.ColorPalettes;
export const DataViz = stories.DataViz;
export const Utility = stories.Utility;
export const Brand = stories.Brand;
export const Neutral = stories.Neutral;
export const Transparent = stories.Transparent;
