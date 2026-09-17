import React from "react";
import { FaCircleInfo, FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";

/**
 * Real icons for Text Input's instance-swappable Font Awesome glyphs
 * (circle-info on the field title, trash/pen as the example content in
 * the left/right slots -- see the project doc's Text Input audit).
 *
 * Project convention (see components/Components/Icon/ "About" section):
 * default to Font Awesome's REGULAR (outline) style, falling back to
 * SOLID only when Font Awesome Free doesn't ship a Regular cut.
 * - Trash/pen both have real Regular cuts -- `FaRegTrashCan` (the
 *   Regular set only has the "trash-can" glyph, not plain "trash", so
 *   this uses that name rather than `FaTrash`, matching react-icons/
 *   fa6's own naming for the outline version) and `FaRegPenToSquare`
 *   (similarly, Regular only has "pen-to-square", not plain "pen").
 * - `FaCircleInfo` has no Regular counterpart in Font Awesome Free
 *   (no `FaRegCircleInfo`) -- Solid out of necessity, not choice.
 *
 * Each container's own CSS (TextInput.css's .ap-text-input-title-icon
 * svg / .ap-text-input-slot-icon svg) already forces these to their
 * fixed slot size, so no size prop is needed here -- the container owns
 * the sizing contract, same reasoning as Button/Icon.jsx.
 */

export function InfoIcon() {
	return <FaCircleInfo aria-hidden="true" focusable="false" />;
}

export function TrashIcon() {
	return <FaRegTrashCan aria-hidden="true" focusable="false" />;
}

export function PenIcon() {
	return <FaRegPenToSquare aria-hidden="true" focusable="false" />;
}
