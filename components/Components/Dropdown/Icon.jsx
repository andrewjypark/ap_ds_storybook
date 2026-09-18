import React from "react";
import { FaRegBookmark, FaAngleDown, FaAngleUp, FaRegTrashCan } from "react-icons/fa6";

/**
 * Real icons for the Dropdown's instance-swappable Font Awesome glyphs.
 * Sized via the shared <Icon> wrapper at each call site (see
 * dropdownTokens.js's doc comment on why -- no bespoke icon-container
 * sizing CSS in Dropdown.css, unlike the older Button/TextInput icon
 * files which pre-date the shared <Icon> system).
 *
 * Project convention (see components/Components/Icon/ "About" section):
 * default to Font Awesome's REGULAR (outline) style, falling back to
 * SOLID only when Font Awesome Free doesn't ship a Regular cut.
 * - `FaRegBookmark` -- stands in for Figma's "wysiwyg icons > align-left"
 *   row icon (a generic swappable vector, not enumerated further, same
 *   as Button's/Text Input's own icon slots) -- has a real Regular cut.
 * - `FaAngleDown` / `FaAngleUp` -- the field's open/closed chevron
 *   (Figma's real "angle-down"/"angle-up" instance swap on the right
 *   slot). Chevron/angle glyphs have no Regular cut in Font Awesome
 *   Free -- Solid out of necessity, not choice.
 * - `FaRegTrashCan` -- Figma's own real left-slot example content
 *   ("trash"), reused here for the same example.
 */

export function RowIcon() {
	return <FaRegBookmark aria-hidden="true" focusable="false" />;
}

export function ChevronDownIcon() {
	return <FaAngleDown aria-hidden="true" focusable="false" />;
}

export function ChevronUpIcon() {
	return <FaAngleUp aria-hidden="true" focusable="false" />;
}

export function TrashIcon() {
	return <FaRegTrashCan aria-hidden="true" focusable="false" />;
}
