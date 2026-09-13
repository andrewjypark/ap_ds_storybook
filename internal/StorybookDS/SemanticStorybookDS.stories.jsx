import { makeTier2SemanticStories } from "../../components/Foundations/Color/tier2SemanticStories.jsx";

/**
 * INTERNAL / NOT PUBLISHED -- see .storybook/main.js's isPublicBuild gate.
 * Tier 2 semantic color tokens (Content/Background/Border) resolved
 * against the storybook_ds theme -- reuses tier2SemanticStories.jsx
 * exactly like SemanticGreen.stories.jsx/SemanticGold.stories.jsx do, so
 * only the items whose value actually differs from Core are shown (most
 * of Content/Background/Border reference color.neutral/color_palettes/
 * utility, which never changes per theme -- only entries referencing
 * color.brand.* do, see generate-color-manifest.js's tier2ThemeDiffs).
 */
export default {
	title: "Tier 2: Semantic Tokens/Tier 2 - Storybook DS - Internal/Color",
	parameters: { layout: "padded" },
};

const stories = makeTier2SemanticStories("storybook_ds");

export const Content = stories.Content;
export const Background = stories.Background;
export const Border = stories.Border;
