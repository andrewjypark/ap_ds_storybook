import { makeTier1ColorStories } from "./tier1ColorStories.jsx";

/**
 * Core contains the complete set of Tier 1 color tokens. Basil Tier 1
 * and Molasses Tier 1 only contain the tokens that differ from Core.
 */
export default {
	title: "Tier 1: Global Tokens/Themes/Tier 1 - Basil_Theme/Color - Default",
	parameters: { layout: "padded" },
};

const stories = makeTier1ColorStories("basil");

export const Brand = stories.Brand;
