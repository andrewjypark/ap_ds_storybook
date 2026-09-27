import React from "react";
import manifest from "../../../tokens/generated/typography-manifest.json";
import { FontSizeScale } from "./FontSizeScale.jsx";
import { LineHeightScale } from "./LineHeightScale.jsx";
import { FontWeightScale } from "./FontWeightScale.jsx";
import { FontFamilyScale } from "./FontFamilyScale.jsx";
import { Tier1CompositeStyles } from "./Tier1CompositeStyles.jsx";

/**
 * Core contains the complete set of Tier 1 typography tokens. Basil
 * Tier 1 and Molasses Tier 1 only contain the tokens that differ from Core.
 */
export default {
	title: "Tier 1: Global Tokens/Themes/Tier 1 - Molasses_Theme/Typography",
	parameters: {
		docs: {
			description: {
				component:
					"Font Size and Line Height are responsive: their values change per breakpoint. Each of those two pages has its own Mobile / Tablet / Desktop toggle to preview them for this theme. Font Weight and Font Family are not affected by viewport at all. Composite Styles bundles family, weight, size, and line height into one CSS font shorthand per style; every one of them differs from Core in this theme, so that page shows the full set (Desktop values) rather than a diff.",
			},
		},
	},
};

export const FontSize = {
	globals: { theme: "molasses" },
	render: () => <FontSizeScale />,
};

export const LineHeight = {
	globals: { theme: "molasses" },
	render: () => <LineHeightScale />,
};

export const FontWeight = {
	globals: { theme: "molasses" },
	render: () => <FontWeightScale groups={manifest.fontWeightThemeDiffs.molasses} />,
};

export const FontFamily = {
	globals: { theme: "molasses" },
	render: () => <FontFamilyScale />,
};

export const CompositeStyles = {
	globals: { theme: "molasses" },
	render: () => <Tier1CompositeStyles />,
};
