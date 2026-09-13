import { makeTier2SemanticStories } from "./tier2SemanticStories.jsx";

/**
 * Core contains the complete set of Tier 2 semantic color tokens. Green
 * Tier 2 and Gold Tier 2 only contain the tokens that differ from Core.
 */
export default {
	title: "Tier 2: Semantic Tokens/Tier 2 - Gold/Color",
	parameters: { layout: "padded" },
};

const stories = makeTier2SemanticStories("gold");

export const Content = stories.Content;
export const Background = stories.Background;
export const Border = stories.Border;
