import React from "react";
import { CompositeStyles } from "./CompositeStyles.jsx";

/**
 * Gold reuses Core's exact same composite-style component -- see
 * Tier2TypographyGreen.stories.jsx for why there's no per-item diff to
 * compute here.
 */
export default {
	title: "Tier 2: Semantic Tokens/Themes/Tier 2 - Gold_Theme/Typography",
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Each composite style (e.g. Body / lg) is one CSS `font` shorthand custom property covering font-family, font-weight, font-size, and line-height, plus three companion custom properties for letter-spacing, text-transform, and text-decoration -- properties the CSS `font` shorthand can't express on its own. Font-size and line-height are responsive, so this page has its own Mobile / Tablet / Desktop toggle, same as Tier 1's Font Size and Line Height pages.",
			},
		},
	},
};

export const CompositeStyles_ = {
	name: "Composite Styles",
	globals: { theme: "gold" },
	render: () => <CompositeStyles />,
};
