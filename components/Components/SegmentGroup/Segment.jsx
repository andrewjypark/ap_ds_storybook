import React, { forwardRef } from "react";

/**
 * One real, clickable segment inside a <SegmentGroup> (see
 * SegmentGroup.jsx). `selected` and `onSelect` are injected by the parent
 * based on comparing this Segment's own `value` prop against the group's
 * controlled `value` -- a consumer never sets `selected` directly, same
 * real-interaction-over-raw-state-prop convention Button/Text Input
 * already follow for their own states.
 *
 * Content is either a plain text label (`children`) or an icon + short
 * caption stacked vertically (`icon`/`caption`), matching Figma's real
 * "Segment Content" Content=Segment Text / Content=Image Text Wrapper
 * variants. Pass `icon` as an already-sized element -- the shared <Icon>
 * component (see ../Icon/Icon.jsx), e.g. `<Icon icon={FaRegStar}
 * size="medium" />` -- not a raw react-icons component; this component
 * does not size icons itself.
 *
 * `forceState` is a docs-only escape hatch (same pattern as
 * Button.jsx/TextInput.jsx) so the Variations page can render static
 * Hover/Selected swatches without a real mouse or a real controlling
 * parent -- never pass it in real usage.
 */
export const Segment = forwardRef(function Segment(
	{ value, children, icon, caption, selected, onSelect, forceState, ...rest },
	ref,
) {
	const isSelected = forceState ? forceState === "selected" : selected;

	return (
		<button
			ref={ref}
			type="button"
			className="ap-segment"
			role="tab"
			aria-selected={isSelected}
			data-selected={isSelected ? "" : undefined}
			data-force-state={forceState}
			onClick={() => onSelect?.(value)}
			{...rest}
		>
			{icon ? (
				<span className="ap-segment-icon-caption">
					<span className="ap-segment-icon">{icon}</span>
					{caption && <span className="ap-segment-caption">{caption}</span>}
				</span>
			) : (
				<span className="ap-segment-text">{children}</span>
			)}
		</button>
	);
});
