import { makeTier1ColorStories } from "./tier1ColorStories.jsx";

/**
 * Core contains the complete set of Tier 1 color tokens. Green Tier 1
 * and Gold Tier 1 only contain the tokens that differ from Core.
 */
export default {
	title: "Tier 1: Global Tokens/Tier 1 - Green/Color",
	parameters: { layout: "padded" },
};

const stories = makeTier1ColorStories("green");

export const Brand = stories.Brand;
