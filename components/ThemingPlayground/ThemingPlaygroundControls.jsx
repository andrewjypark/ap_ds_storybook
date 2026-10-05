import React from "react";
import { Radio } from "../Components/Radio/Radio.jsx";
import "./ThemingPlayground.css";

const THEMES = [
	{ key: "core", label: "Core" },
	{ key: "basil", label: "Basil" },
	{ key: "molasses", label: "Molasses" },
];

const MODES = [
	{ key: "light", label: "Light" },
	{ key: "dark", label: "Dark" },
];

// Neutral BG first, matching the order in the Figma mockup.
const BG_STYLES = [
	{ key: "neutral", label: "Neutral BG" },
	{ key: "brand", label: "Branded BG" },
];

const BUTTON_TYPES = [
	{ key: "primary", label: "Primary" },
	{ key: "secondary", label: "Secondary" },
	{ key: "ghost", label: "Ghost" },
];

// Each theme actually defines its OWN primary font family (tier_1_basil
// and tier_1_molasses do NOT inherit tier_1_core's fontFamilies.font1 --
// confirmed directly against build/tier_1_*/css/variables.css's own
// --ap-font-families-font1 / --ap-tier-2-typography-title-default vars),
// so this is per-theme data, not a shared literal. Per Andrew's catch:
// Basil is "Basier Circle", Molasses is "Nudica" -- only Core is actually
// "TWK Lausanne". The same Tier 2 var drives each theme's brand color --
// only what that token RESOLVES TO differs per theme. Per Andrew: show
// the Tier 2 var the swatch is actually tied to rather than a hard-coded
// hex, and let the swatch itself (scoped to that row's own theme via
// data-theme) render the real, per-theme resolved color.
const THEME_DESCRIPTION_FONT_FAMILIES = {
	core: "TWK Lausanne",
	basil: "Basier Circle",
	molasses: "Nudica",
};
const THEME_DESCRIPTION_BRAND_VAR = "--ap-tier-2-color-content-brand";

/**
 * "Font Family: ... / Brand Color: --ap-tier-2-color-content-brand [swatch]"
 * -- mirrors the Figma frame's playground_option_description_container,
 * shown only under the Theme row's three options (its
 * "theme description container" boolean component property is true for
 * Core/Basil/Molasses, false for Light/Dark). Figma's own copy was still
 * the unfilled "{name of font family 1}" / "{name of brand color...}"
 * placeholder text; these are the real values.
 *
 * This is dev-facing readout text (token names, not product content), so
 * it's pinned to the storybook_ds theme -- same as the page's own
 * heading/intro copy -- rather than re-theming per row; that's also what
 * makes --ap-font2-body-text-xs-regular resolve to storybook_ds's own
 * monospace font (Menlo), the same "--ap-font2-*" readout convention
 * Checkbox's own TokenReadout.jsx already uses for showing var names, per
 * Andrew. Only the swatch itself re-scopes to the ROW's own theme (a
 * nested data-theme override) so e.g. Basil's swatch still shows Basil's
 * real brand color regardless of the text around it.
 */
function ThemeDescription({ themeKey }) {
	return (
		<div className="ap-theming-playground-option-description" data-theme="storybook_ds" data-viewport="desktop">
			<span className="ap-theming-playground-option-description-line">
				Font Family: {THEME_DESCRIPTION_FONT_FAMILIES[themeKey]}
			</span>
			<span className="ap-theming-playground-option-description-line ap-theming-playground-option-description-brand">
				<span className="ap-theming-playground-option-description-brand-text">
					Brand Color: {THEME_DESCRIPTION_BRAND_VAR}
				</span>
				<span
					className="ap-theming-playground-brand-swatch"
					data-theme={themeKey}
					data-viewport="desktop"
					style={{ background: `var(${THEME_DESCRIPTION_BRAND_VAR})` }}
				/>
			</span>
		</div>
	);
}

function RadioRow({ name, option, checked, disabled, sub, extra, onSelect }) {
	return (
		<label
			className={
				disabled
					? "ap-theming-playground-option-row ap-theming-playground-option-row--disabled"
					: "ap-theming-playground-option-row"
			}
		>
			<Radio name={name} checked={checked} disabled={disabled} onChange={() => onSelect(option.key)} />
			<span className="ap-theming-playground-option-row-content">
				<span
					className={
						sub
							? "ap-theming-playground-option-label ap-theming-playground-option-label--sub"
							: "ap-theming-playground-option-label"
					}
				>
					{option.label}
				</span>
				{extra}
			</span>
		</label>
	);
}

/**
 * The Theming Playground's control card -- mirrors the Figma "Storybook
 * Planning" file's playground_options_container frame (THEME /
 * LIGHT/DARK MODE radio groups, Button Type=Radio variants) which Andrew
 * pointed at directly for this build. Button Type (Primary/Secondary/
 * Ghost) is a third group added on top of the Figma selection, wired
 * straight to Button.jsx's own `priority` prop values.
 *
 * Theme and Light/Dark Mode are two independent radio groups. Neutral BG /
 * Branded BG is a THIRD choice nested directly under the Dark row (not a
 * separate group, not hidden) -- same nesting the Figma frame itself uses
 * (its sub_bg_options_container sits inside the "Dark" playground_option
 * instance). Both sub-radios stay disabled until Dark is actually
 * selected; selecting Dark lands the sub-choice on Neutral BG by default,
 * per Andrew's stated behavior, every time (the control's value is
 * invisible/inert while Light is selected, so there's no "remembered"
 * prior choice to preserve).
 */
export function ThemingPlaygroundControls({
	theme,
	mode,
	bgStyle,
	buttonType,
	onThemeChange,
	onModeChange,
	onBgStyleChange,
	onButtonTypeChange,
}) {
	const isDark = mode === "dark";

	function handleModeChange(nextMode) {
		onModeChange(nextMode);
		if (nextMode === "dark") {
			onBgStyleChange("neutral");
		}
	}

	return (
		<div className="ap-theming-playground-card">
			<div className="ap-theming-playground-group">
				{/* Figma types this label as literal uppercase characters
				    (textCase: ORIGINAL) rather than relying on a CSS
				    text-transform -- see ThemingPlayground.css. */}
				<h4 className="ap-theming-playground-group-title">THEME</h4>
				<div className="ap-theming-playground-option-list">
					{THEMES.map((option) => (
						<RadioRow
							key={option.key}
							name="theming-playground-theme"
							option={option}
							checked={theme === option.key}
							disabled={false}
							extra={<ThemeDescription themeKey={option.key} />}
							onSelect={onThemeChange}
						/>
					))}
				</div>
			</div>

			<div className="ap-theming-playground-group">
				<h4 className="ap-theming-playground-group-title">LIGHT/DARK MODE</h4>
				<div className="ap-theming-playground-option-list">
					<RadioRow
						name="theming-playground-mode"
						option={MODES[0]}
						checked={mode === "light"}
						disabled={false}
						onSelect={handleModeChange}
					/>
					<div>
						<RadioRow
							name="theming-playground-mode"
							option={MODES[1]}
							checked={mode === "dark"}
							disabled={false}
							onSelect={handleModeChange}
						/>
						<div className="ap-theming-playground-sub-option-list">
							{BG_STYLES.map((option) => (
								<RadioRow
									key={option.key}
									name="theming-playground-bg-style"
									option={option}
									checked={bgStyle === option.key}
									disabled={!isDark}
									sub
									onSelect={onBgStyleChange}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="ap-theming-playground-group">
				<h4 className="ap-theming-playground-group-title">BUTTON TYPE</h4>
				<div className="ap-theming-playground-option-list">
					{BUTTON_TYPES.map((option) => (
						<RadioRow
							key={option.key}
							name="theming-playground-button-type"
							option={option}
							checked={buttonType === option.key}
							disabled={false}
							onSelect={onButtonTypeChange}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
