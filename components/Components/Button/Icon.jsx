import React from "react";
import { FaCirclePlus } from "react-icons/fa6";

/**
 * Real icon for the button's default left/right icon slot -- the real
 * Figma component's icon slot is an instance-swappable Font Awesome
 * "circle-plus" (per the project doc's Figma button audit).
 *
 * Project convention (see components/Components/Icon/ "About" section):
 * default to Font Awesome's REGULAR (outline) style, falling back to
 * SOLID only when Font Awesome Free doesn't ship a Regular cut of that
 * glyph. "circle-plus" is one of those exceptions -- react-icons/fa6 has
 * no `FaRegCirclePlus` (Regular only covers a fixed ~164-icon subset,
 * mostly "content" glyphs like star/heart/envelope, not UI-chrome icons
 * like this one) -- so this one is Solid out of necessity, not choice.
 *
 * .ap-button-icon-container's own CSS (Button.css) already forces the
 * rendered svg to 100% of its fixed-size container, so no size prop is
 * needed here -- the container, not the icon, owns the sizing contract
 * (same reasoning as TextInput/Icon.jsx and CodeBlock.jsx's icons).
 */
export function Icon() {
	return <FaCirclePlus aria-hidden="true" focusable="false" />;
}
