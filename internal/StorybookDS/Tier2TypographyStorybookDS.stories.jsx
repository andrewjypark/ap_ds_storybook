import React from "react";
import { CompositeStyles } from "../../components/Foundations/Typography/CompositeStyles.jsx";

/**
 * INTERNAL / NOT PUBLISHED -- see .storybook/main.js's isPublicBuild gate.
 * Tier 2 composite typography styles (Display/Headline/Title/Label/Body/
 * Meta) resolved against the storybook_ds theme. Reuses CompositeStyles
 * unchanged, same as Tier2TypographyGreen/Gold.stories.jsx -- every
 * style's font-family/font-weight differ from Core for this theme too
 * (Inter/IBM Plex Mono/Archivo SemiExpanded vs. Core's fonts), so there's
 * no per-item diff to compute, just the whole scale re-rendered under
 * this theme global.
 */
export default {
	title: "Tier 2: Semantic Tokens/Tier 2 - Storybook DS - Internal/Typography",
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
	globals: { theme: "storybook_ds" },
	render: () => <CompositeStyles />,
};
