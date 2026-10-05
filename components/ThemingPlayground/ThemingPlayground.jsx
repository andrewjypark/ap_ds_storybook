import React, { useState } from "react";
import { ExampleCard } from "./ExampleCard.jsx";
import { ThemingPlaygroundControls } from "./ThemingPlaygroundControls.jsx";
import "./ThemingPlayground.css";

/**
 * A page with a canvas where a component renders live under whichever
 * theme the card's radio controls pick (see the Figma "Storybook
 * Planning" file's playground_options_container frame, which Andrew
 * pointed at directly for this build -- and ThemingPlaygroundControls.jsx
 * for the controls themselves).
 *
 * Defaults: Theme=Core, Mode=Light, Button Type=Primary, matching
 * Andrew's stated defaults. data-theme/data-bg-style on the canvas follow
 * build-tokens.js's own attribute scheme exactly (its THEMES/BG_STYLES
 * arrays): a dark mode is "<theme>_dark", and [data-bg-style="neutral"]
 * is only ever set for a dark theme on the neutral sub-choice -- "brand"
 * (the default) omits the attribute entirely, same as the generated CSS
 * expects.
 *
 * The canvas renders Figma's "example card" component (node 131:8169 in
 * the "Storybook Planning" file, which Andrew pointed at directly). Per
 * Andrew, that component's OUTER wrapper (fill tier2_color/background/
 * base) is conceptually the canvas itself -- see the canvas's own
 * background-color in ThemingPlayground.css -- so only the INNER "Card"
 * is built as a component (ExampleCard.jsx); the card's own Button is
 * the same real <Button priority={buttonType}>, so picking a Button Type
 * below updates the button rendered inside the card.
 */
export function ThemingPlayground() {
	const [theme, setTheme] = useState("core");
	const [mode, setMode] = useState("light");
	const [bgStyle, setBgStyle] = useState("neutral");
	const [buttonType, setButtonType] = useState("primary");

	const isDark = mode === "dark";
	const canvasTheme = isDark ? `${theme}_dark` : theme;
	const canvasBgStyle = isDark && bgStyle === "neutral" ? "neutral" : undefined;

	return (
		<div>
			<h3 className="ap-section__title" data-theme="storybook_ds" data-viewport="desktop">
				Theming Playground
			</h3>
			<p className="ap-theming-playground-intro" data-theme="storybook_ds" data-viewport="desktop">
				Pick a Theme, a Light/Dark Mode, and -- once Dark is selected -- a background style. The canvas below
				updates live to match.
			</p>
			<div className="ap-theming-playground-layout">
				<div
					className="ap-theming-playground-canvas"
					data-theme={canvasTheme}
					data-viewport="desktop"
					data-bg-style={canvasBgStyle}
				>
					<ExampleCard buttonType={buttonType} />
				</div>
				<ThemingPlaygroundControls
					theme={theme}
					mode={mode}
					bgStyle={bgStyle}
					buttonType={buttonType}
					onThemeChange={setTheme}
					onModeChange={setMode}
					onBgStyleChange={setBgStyle}
					onButtonTypeChange={setButtonType}
				/>
			</div>
		</div>
	);
}
