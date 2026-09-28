import { makeTier1ColorDarkStories } from "./tier1ColorStories.jsx";

/**
 * Sibling to ColorMolasses.stories.jsx ("Color - Default"), one axis
 * over: Default diffs Molasses's light build against Core's light build
 * (Brand only); Dark diffs Molasses's DARK build against Core's DARK
 * build -- same theme axis, just evaluated on the dark builds. Comes out
 * to Brand only here too, for the same underlying reason (Color
 * Palettes/Data Viz/Utility/Neutral/Transparent are never touched by any
 * theme's own token set, light or dark -- only Core's own _dark set is,
 * and every theme's _dark build layers that same set in) -- see
 * generate-color-manifest.js's buildTier1ScaleDiff. Only exporting
 * "Brand" (not all six, unlike ColorDark.stories.jsx) mirrors
 * ColorMolasses.stories.jsx's own Brand-only pattern rather than padding
 * the sidebar with five pages that are never expected to differ.
 */
export default {
	title: "Tier 1: Global Tokens/Themes/Tier 1 - Molasses_Theme/Color - Dark",
	parameters: { layout: "padded" },
};

const stories = makeTier1ColorDarkStories("molasses");

export const Brand = stories.Brand;
