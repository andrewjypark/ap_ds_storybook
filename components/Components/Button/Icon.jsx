import React from "react";

/**
 * Generic placeholder icon -- the real Figma component uses an
 * instance-swappable Font Awesome "circle-plus" slot (per Andrew: these
 * are just swappable vectors, not worth enumerating every icon option).
 * This stands in for "an icon is present" without depending on any icon
 * library or asset; swap for the real icon component/library once one is
 * wired into the codebase.
 */
export function Icon({ size = 16 }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
			focusable="false"
			style={{ flexShrink: 0 }}
		>
			<circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
			<path d="M8 4.5v7M4.5 8h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
		</svg>
	);
}
