import { makeTier1ColorStories } from "../../components/Foundations/Color/tier1ColorStories.jsx";

/**
 * INTERNAL / NOT PUBLISHED -- see .storybook/main.js's isPublicBuild gate.
 * These are the color tokens Andrew is using to restyle Storybook's own
 * manager chrome (sidebar, headings, toolbar) -- see tokens.json's
 * `tier_1_storybook_ds` set. Reuses the exact same ColorScaleSection /
 * tier1ColorStories.jsx pipeline Tier 1 - Core/Green/Gold already use
 * (see build-tokens.js's THEMES entry for "tier_1_storybook_ds"), just
 * pinned to a different theme -- so every swatch below is a real,
 * live-computed value, not hand-copied. Only "Brand" is shown because
 * that's the only color category this set actually overrides -- Neutral/
 * Utility/Transparent/Color Palettes/Data Viz are inherited unchanged
 * from Tier 1 - Core, same reasoning as Green/Gold's Color pages.
 */
export default {
	title: "Tier 1: Global Tokens/Tier 1 - Storybook DS - Internal/Color",
	parameters: { layout: "padded" },
};

const stories = makeTier1ColorStories("storybook_ds");

export const Brand = stories.Brand;
