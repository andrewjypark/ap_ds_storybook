import React from "react";
import { ColorSwatchCardGroup } from "./ColorSwatchCardGroup.jsx";

/**
 * Tier 2 semantic page body. The page's own name ("Content", "Background",
 * "Border") is rendered as the shared .ap-section__title page header --
 * previously a small .ap-color-swatch-card-label above the card list.
 * data-theme/data-viewport are pinned on the heading itself so it always
 * resolves storybook_ds's Tier 2 Title composite, regardless of the theme
 * this story is otherwise pinned to -- same pattern as ColorScaleSection.
 */
export function ColorGridSection({ grid }) {
	if (!grid) return null;
	return (
		<>
			<h3 className="ap-section__title" data-theme="storybook_ds" data-viewport="desktop">
				{grid.title}
			</h3>
			{grid.items.length === 0 ? (
				<p className="ap-color-section__empty">No tokens in this category differ from Core.</p>
			) : (
				<ColorSwatchCardGroup items={grid.items} />
			)}
		</>
	);
}
