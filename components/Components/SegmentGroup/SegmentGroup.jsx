import React, { forwardRef, Children, cloneElement, isValidElement } from "react";
import "./SegmentGroup.css";

/**
 * The real Tier 3 Segment Group -- forwardRef so TokenReadout can read
 * live-resolved CSS custom properties off the real DOM node (same
 * reasoning as Button/Text Input).
 *
 * A real controlled component: `value` + `onChange` decide which child
 * <Segment> is selected -- the way a real tab list or segmented filter
 * actually works -- rather than a `selected` prop set directly on each
 * Segment (see Segment.jsx's own doc comment). Each child is cloned with
 * `selected`/`onSelect` injected based on comparing its own `value` prop
 * against this group's `value`.
 *
 * `fieldTitle` folds in what Figma keeps as a separate "Segment Group
 * with Field Title" component -- just an optional label rendered above
 * the group, not a real behavioral difference, so it's one prop here
 * rather than a second, near-duplicate component (same reasoning Text
 * Input already used for its own optional field-title row).
 */
export const SegmentGroup = forwardRef(function SegmentGroup(
	{ fieldTitle, value, onChange, children, ...rest },
	ref,
) {
	return (
		<div className="ap-segment-group-wrapper">
			{fieldTitle && <div className="ap-segment-group-field-title">{fieldTitle}</div>}
			<div className="ap-segment-group" ref={ref} role="tablist" {...rest}>
				{Children.map(children, (child) =>
					isValidElement(child)
						? cloneElement(child, {
								selected: child.props.value === value,
								onSelect: onChange,
							})
						: child,
				)}
			</div>
		</div>
	);
});
