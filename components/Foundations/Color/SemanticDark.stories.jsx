import { makeTier2SemanticDarkStories } from "./tier2SemanticStories.jsx";

/**
 * Sibling to Semantic.stories.jsx ("Color - Default"), one level down the
 * light/dark axis instead of the theme axis -- Core Tier 2 Dark contains
 * only the semantic (Content/Background/Border) tokens whose value
 * actually differs from Core's own light build. Mirrors ColorDark.
 * stories.jsx's relationship to Color.stories.jsx at Tier 1.
 */
export default {
	title: "Tier 2: Semantic Tokens/Tier 2 - Core/Color - Dark",
	parameters: { layout: "padded" },
};

const stories = makeTier2SemanticDarkStories("core");

export const Content = stories.Content;
export const Background = stories.Background;
export const Border = stories.Border;
