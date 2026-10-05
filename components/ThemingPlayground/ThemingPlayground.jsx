import React from "react";
import { Button } from "../Components/Button/Button.jsx";
import "./ThemingPlayground.css";

/**
 * Step one of Andrew's theming playground (see the Figma "Storybook
 * Planning" file's playground_options_container frame, and the project's
 * ap-design-system-figma notes on the planned brand / light-dark /
 * background-style controls): a page with a canvas where a component
 * renders live under a chosen theme.
 *
 * Not built yet, coming in follow-ups:
 *   - The card of radio controls (Theme: Core/Basil/Molasses; Light/Dark
 *     Mode; and, only enabled once Dark is selected, Neutral BG / Branded
 *     BG, defaulting to Neutral BG the moment Dark is first picked).
 *   - Wiring the canvas's data-theme/data-viewport to those controls
 *     instead of the hardcoded "core" below.
 *   - Swapping the single Button for whatever component(s) the finished
 *     card ends up letting you preview.
 *
 * The hardcoded Core / Light pinning below matches the eventual controls'
 * own default state, so nothing will visually jump once they're wired up.
 */
export function ThemingPlayground() {
	return (
		<div>
			<h3 className="ap-section__title" data-theme="storybook_ds" data-viewport="desktop">
				Theming Playground
			</h3>
			<p className="ap-theming-playground-intro" data-theme="storybook_ds" data-viewport="desktop">
				A live canvas for previewing components across the design system's themes. Theme-switching controls
				are coming next -- for now the canvas below just renders a Button pinned to Core / Light.
			</p>
			<div className="ap-theming-playground-canvas" data-theme="core" data-viewport="desktop">
				<Button priority="primary" size="medium" radius="sm">
					Button
				</Button>
			</div>
		</div>
	);
}
