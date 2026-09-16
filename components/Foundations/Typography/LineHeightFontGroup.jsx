import React, { useState } from "react";
import { LineHeightCard } from "./LineHeightCard.jsx";

const ChevronDownIcon = () => (
	<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

/**
 * Collapsible section for one font's Line Height scale -- structurally
 * identical to FontSizeFontGroup.jsx, just swapping in LineHeightCard.
 * Expanded by default.
 */
export function LineHeightFontGroup({ font, items }) {
	const [expanded, setExpanded] = useState(true);

	return (
		<div className="ap-type-font-group">
			{/* One pair of attributes on the button covers both the group
			    title and the chevron -- neither is a font specimen, and
			    the card grid with the real specimens sits as a SIBLING
			    below (inside {expanded && (...)}), not a descendant of
			    this button, so it's untouched. */}
			<button
				type="button"
				className="ap-type-font-group-header"
				data-theme="storybook_ds"
				data-viewport="desktop"
				onClick={() => setExpanded((prev) => !prev)}
				aria-expanded={expanded}
			>
				<span className="ap-type-font-group-title">{font}</span>
				<span
					className={`ap-type-font-group-chevron${expanded ? "" : " ap-type-font-group-chevron--collapsed"}`}
				>
					<ChevronDownIcon />
				</span>
			</button>
			{expanded && (
				<div className="ap-type-token-group">
					{items.map((item) => (
						<LineHeightCard key={item.cssVar} font={font} headingName={item.key} cssVar={item.cssVar} />
					))}
				</div>
			)}
		</div>
	);
}
