import { makeTier1ColorDarkStories } from "./tier1ColorStories.jsx";

/**
 * Sibling to ColorMolasses.stories.jsx ("Color - Default"), one level
 * down the light/dark axis instead of the theme axis -- Molasses Dark
 * contains only the Tier 1 color tokens whose value actually differs
 * from Molasses's own light build (Neutral and Transparent turn out
 * identical, so those two pages show ColorScaleSection's "no differences"
 * message instead of swatches). Unlike ColorMolasses.stories.jsx (which
 * only exports "Brand", since that's the only category Molasses's light
 * theme ever touches), Molasses Dark exports all six -- Color
 * Palettes/Data Viz/Utility/Brand all turn out to differ from light along
 * the dark axis, not just Brand.
 */
export default {
	title: "Tier 1: Global Tokens/Themes/Tier 1 - Molasses_Theme/Color - Dark",
	parameters: { layout: "padded" },
};

const stories = makeTier1ColorDarkStories("molasses");

export const ColorPalettes = stories.ColorPalettes;
export const DataViz = stories.DataViz;
export const Utility = stories.Utility;
export const Brand = stories.Brand;
export const Neutral = stories.Neutral;
export const Transparent = stories.Transparent;
