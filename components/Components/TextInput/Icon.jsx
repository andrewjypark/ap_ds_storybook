import React from "react";

/**
 * Generic placeholder icons standing in for the real Figma component's
 * instance-swappable Font Awesome glyphs (circle-info on the field title,
 * trash/pen as the example content in the left/right slots -- see the
 * project doc's Text Input audit). Same rationale as Button/Icon.jsx:
 * not worth depending on an icon library for a placeholder. Swap for the
 * real icon component/library once one is wired into the codebase.
 */

export function InfoIcon({ size = 14 }) {
	return (
		<svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
			<circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.1" />
			<circle cx="7" cy="4.4" r="0.75" fill="currentColor" />
			<path d="M7 6.5v3.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
		</svg>
	);
}

export function TrashIcon({ size = 16 }) {
	return (
		<svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
			<path d="M3 4.5h10M6 4.5V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
			<path
				d="M4 4.5 4.6 13a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9l.6-8.5"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function PenIcon({ size = 16 }) {
	return (
		<svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
			<path
				d="m10.8 2.7 2.5 2.5-7.6 7.6-3 .5.5-3 7.6-7.6Z"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
