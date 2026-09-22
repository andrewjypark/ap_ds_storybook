import React from "react";
import "./Typography.css";

/**
 * Page-level header for the Tier 1 typography pages -- the page's own name
 * ("Font Size", "Line Height", ...) in the Tier 2 Title style, same
 * markup/class as Foundations/Color/ColorScaleSection.jsx's title.
 *
 * data-theme/data-viewport are pinned to storybook_ds/desktop on the
 * heading itself so it always resolves storybook_ds's Tier 2 Title
 * composite, regardless of which theme this page/story is otherwise
 * pinned to (Core/Green/Gold) or which viewport the local toggle on Font
 * Size/Line Height is set to. CSS custom properties inherit down the
 * tree, but a rule matching an element directly (this
 * [data-theme][data-viewport] pair) wins over whatever it would've
 * inherited from an ancestor -- so only this title switches; the token
 * cards below still show the ambient page's own theme.
 */
export function PageTitle({ children }) {
	return (
		<h3 className="ap-section__title" data-theme="storybook_ds" data-viewport="desktop">
			{children}
		</h3>
	);
}
