import React from "react";
import manifest from "../../tokens/generated/typography-manifest.json";
import { FontSizeScale } from "../../components/Foundations/Typography/FontSizeScale.jsx";
import { LineHeightScale } from "../../components/Foundations/Typography/LineHeightScale.jsx";
import { FontWeightScale } from "../../components/Foundations/Typography/FontWeightScale.jsx";
import { FontFamilyScale } from "../../components/Foundations/Typography/FontFamilyScale.jsx";

/**
 * INTERNAL / NOT PUBLISHED -- see .storybook/main.js's isPublicBuild gate.
 * Same reuse pattern as ColorStorybookDS.stories.jsx: FontSizeScale /
 * LineHeightScale / FontWeightScale / FontFamilyScale are the exact same
 * components Tier 1 - Core/Green/Gold's Typography pages use, just pinned
 * to `theme: "storybook_ds"` -- every value below is real and
 * live-computed. No Letter Spacing page here because tier_1_storybook_ds
 * doesn't override letterSpacing at all (inherits Core's unchanged, same
 * reasoning as Green/Gold not getting one either).
 */
export default {
	title: "Tier 1: Global Tokens/Tier 1 - Storybook DS - Internal/Typography",
	parameters: {
		docs: {
			description: {
				component:
					"Font Size and Line Height are responsive: their values change per breakpoint (this page shows the desktop viewport). Font Weight and Font Family are not affected by viewport at all.",
			},
		},
	},
};

export const FontSize = {
	globals: { theme: "storybook_ds" },
	render: () => <FontSizeScale />,
};

export const LineHeight = {
	globals: { theme: "storybook_ds" },
	render: () => <LineHeightScale />,
};

export const FontWeight = {
	globals: { theme: "storybook_ds" },
	render: () => <FontWeightScale groups={manifest.fontWeightThemeDiffs.storybook_ds} />,
};

export const FontFamily = {
	globals: { theme: "storybook_ds" },
	render: () => <FontFamilyScale />,
};
