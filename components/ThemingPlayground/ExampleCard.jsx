import React from "react";
import { FaRegNoteSticky } from "react-icons/fa6";
import { Icon } from "../Components/Icon/Icon.jsx";
import { Button } from "../Components/Button/Button.jsx";
import "./ThemingPlayground.css";

/**
 * The card rendered in the Theming Playground's canvas -- mirrors the
 * Figma "Storybook Planning" file's "example card" component (node
 * 131:8169) that Andrew pointed at directly for this build. That
 * component is actually TWO layers: an outer 495x503 wrapper (fill
 * tier2_color/background/base) and an inner 350x387 "Card" frame (fill
 * tier2_color/background/surface_primary, 1px tier2_color/border/default
 * stroke, 16px radius) centered inside it. Per Andrew, the OUTER wrapper
 * is what the playground's own canvas already represents -- so only the
 * inner Card is built here; the canvas itself picks up
 * background/base (see ThemingPlayground.jsx/.css).
 *
 * Figma's own icon is a custom decorative vector (an abstract bracket
 * shape behind a glyph), not something meant to be pixel-matched. Per
 * Andrew: use Font Awesome's "fa-square-list" -- which doesn't exist in
 * this project's react-icons/fa6 package (no FaSquareList export at any
 * weight) -- falling back to a note icon, FaRegNoteSticky (Regular,
 * matching Icon.jsx's own "prefer Regular when it exists" convention).
 *
 * The button is the SAME real <Button>, driven by the `buttonType` prop
 * the Theme Playground's own Button Type radio group already controls
 * (see ThemingPlaygroundControls.jsx) -- so picking Primary/Secondary/
 * Ghost there changes this exact button, per Andrew. `radius="lg"`
 * matches the Figma instance's own 999px (fully pill) corner radius --
 * the earlier bare canvas Button used "sm" before this card replaced it.
 * Title/description copy is Figma's own literal placeholder text.
 */
export function ExampleCard({ buttonType }) {
	return (
		<div className="ap-theming-playground-example-card">
			<div className="ap-theming-playground-example-card-icon">
				<Icon icon={FaRegNoteSticky} size="large" />
			</div>
			<div className="ap-theming-playground-example-card-info">
				<h3 className="ap-theming-playground-example-card-title">Card Title</h3>
				<div className="ap-theming-playground-example-card-description-and-button">
					<p className="ap-theming-playground-example-card-description">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed porta gravida et gravida egestas
						tortor. Metus, nulla mattis purus ac, vulputate.
					</p>
					<Button priority={buttonType} size="medium" radius="lg">
						GET DETAILS
					</Button>
				</div>
			</div>
		</div>
	);
}
