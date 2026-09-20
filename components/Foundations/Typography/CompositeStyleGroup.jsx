import React, { useState } from "react";
import { CompositeStyleCard } from "./CompositeStyleCard.jsx";

const ChevronDownIcon = () => (
	<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

// Tokens Studio's own group names aren't capitalized ("display",
// "headline", ...) -- title-case just this one label for display,
// same idea as FontWeightScale's raw-group-name handling, without
// touching the underlying key used to build the cssVar.
function titleCase(name) {
	return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Collapsible section for one composite style family (Display, Headline,
 * Title, Label, Body, Meta) -- same collapsible pattern as
 * FontSizeFontGroup.jsx, one card per size variant. Expanded by default.
 */
export function CompositeStyleGroup({ groupName, title, items, withCompanions = true }) {
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
				<span className="ap-type-font-group-title">{title || titleCase(groupName)}</span>
				<span
					className={`ap-type-font-group-chevron${expanded ? "" : " ap-type-font-group-chevron--collapsed"}`}
				>
					<ChevronDownIcon />
				</span>
			</button>
			{expanded && (
				<div className="ap-type-composite-group">
					{items.map((item) => (
						<CompositeStyleCard
							key={item.cssVar}
							itemKey={item.key}
							cssVar={item.cssVar}
							withCompanions={withCompanions}
						/>
					))}
				</div>
			)}
		</div>
	);
}
