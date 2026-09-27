import { makeTier1ColorDarkStories } from "./tier1ColorStories.jsx";

/**
 * Sibling to Color.stories.jsx ("Color - Default"), one level down the
 * light/dark axis instead of the theme axis -- Core Dark contains only
 * the Tier 1 color tokens whose value actually differs from Core's own
 * light build (Neutral and Transparent turn out identical, so those two
 * pages show ColorScaleSection's "no differences" message instead of
 * swatches).
 */
export default {
	title: "Tier 1: Global Tokens/Tier 1 - Core/Color - Dark",
	parameters: { layout: "padded" },
};

const stories = makeTier1ColorDarkStories("core");

export const ColorPalettes = stories.ColorPalettes;
export const DataViz = stories.DataViz;
export const Utility = stories.Utility;
export const Brand = stories.Brand;
export const Neutral = stories.Neutral;
export const Transparent = stories.Transparent;
