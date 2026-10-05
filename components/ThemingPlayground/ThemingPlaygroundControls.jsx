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

function RadioRow({ name, option, checked, disabled, sub, onSelect }) {
	return (
		<label
			className={
				disabled
					? "ap-theming-playground-option-row ap-theming-playground-option-row--disabled"
					: "ap-theming-playground-option-row"
			}
		>
			<Radio name={name} checked={checked} disabled={disabled} onChange={() => onSelect(option.key)} />
			<span
				className={
					sub
						? "ap-theming-playground-option-label ap-theming-playground-option-label--sub"
						: "ap-theming-playground-option-label"
				}
			>
				{option.label}
			</span>
		</label>
	);
}

/**
 * The Theming Playground's control card -- mirrors the Figma "Storybook
 * Planning" file's playground_options_container frame (THEME /
 * LIGHT/DARK MODE radio groups, Button Type=Radio variants) which Andrew
 * pointed at directly for this build.
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
export function ThemingPlaygroundControls({ theme, mode, bgStyle, onThemeChange, onModeChange, onBgStyleChange }) {
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
		</div>
	);
}
