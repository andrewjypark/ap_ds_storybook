import React from "react";
import { FaPlus } from "react-icons/fa6";

/**
 * Real icon for the button's default left/right icon slot.
 *
 * The real Figma component's icon slot is instance-swappable and was
 * originally documented (per the project doc's Figma button audit) as
 * Font Awesome "circle-plus." We moved off that glyph deliberately: Font
 * Awesome Free has no Regular/outline cut of circle-plus (or of
 * square-plus, the next-closest shape), so any "add" icon built on a
 * circle or square would be stuck Solid. The bare plus mark (`FaPlus`)
 * has no background shape to fill or outline in the first place -- it's
 * just the cross itself -- so it reads as a light/outline-weight icon
 * without needing a "Regular" variant at all. There's no separate
 * `FaRegPlus`; `FaPlus` is the only cut, and it's this project's default
 * "add" icon going forward.
 *
 * .ap-button-icon-container's own CSS (Button.css) already forces the
 * rendered svg to 100% of its fixed-size container, so no size prop is
 * needed here -- the container, not the icon, owns the sizing contract
 * (same reasoning as TextInput/Icon.jsx and CodeBlock.jsx's icons).
 */
export function Icon() {
	return <FaPlus aria-hidden="true" focusable="false" />;
}
