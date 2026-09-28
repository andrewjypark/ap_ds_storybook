import { makeTier2SemanticDarkStories } from "./tier2SemanticStories.jsx";

/**
 * Sibling to SemanticMolasses.stories.jsx ("Color - Default"), one axis
 * over: Default diffs Molasses's light build against Core's light build;
 * Dark diffs Molasses's DARK build against Core's DARK build -- same
 * theme axis, just evaluated on the dark builds (see generate-color-
 * manifest.js's buildTier2Diff / manifest.tier2DarkDiffs.molasses).
 * Mirrors ColorMolassesDark.stories.jsx's relationship to ColorMolasses.
 * stories.jsx at Tier 1, one tier up.
 */
export default {
	title: "Tier 2: Semantic Tokens/Themes/Tier 2 - Molasses_Theme/Color - Dark",
	parameters: { layout: "padded" },
};

const stories = makeTier2SemanticDarkStories("molasses");

export const Content = stories.Content;
export const Background = stories.Background;
export const Border = stories.Border;
