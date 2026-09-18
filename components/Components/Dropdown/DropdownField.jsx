import React, { forwardRef } from "react";
import { Icon } from "../Icon/Icon.jsx";
import { FaCircleInfo } from "react-icons/fa6";

/**
 * The real Tier 3 Dropdown Field -- the trigger/display element that
 * shows the current value and opens the menu. Props map onto the real
 * Figma component's own properties (see the project doc's Dropdown
 * audit):
 *   showFieldTitleSection / fieldTitleText  -> "Show Field Title Section" / (Field Title Row's own text)
 *   showFieldTitleRightSlot / fieldTitleRightSlot -> the Field Title Row's own "Right Slot"
 *   showLeftSlot / leftSlotIcon             -> "Show Slot Container - Left"
 *   showRightSlot / rightSlotIcon           -> "Show Slot Container - Right"
 *   showDescriptionBelowInput / descriptionText -> the description text under the field
 *   active                                  -> State ("Default" / "Active")
 *
 * Unlike Text Input's Active (real :focus-within) or Filled (a real
 * value present), this field's Active state is genuinely external --
 * whether the dropdown is open is state a parent has to own to also
 * decide whether to render the menu at all. So `active` is a real,
 * consumer-supplied prop here rather than something this component
 * derives on its own; see Dropdown.jsx for the composed component that
 * owns that state and wires this field + <DropdownMenu> together into a
 * real, working combobox.
 *
 * The field title's info icon has no boolean toggle on the real Figma
 * component (unlike Text Input's own "Show Field Title Left Icon") --
 * it's structurally always present whenever the title section is shown,
 * so it's not exposed as a prop here either. It renders at the shared
 * <Icon>'s "xs" size (12px, ../Icon/Icon.jsx + iconTokens.js) -- that
 * step was added to the shared scale specifically for this icon (it
 * started as a one-off 14px token here, then got folded into Icon's own
 * scale once "smaller than small" turned out to be a general need, not
 * a Dropdown-only one).
 *
 * `forceState` is a docs-only escape hatch (same pattern as every other
 * Tier 3 component) so the Variations page can render a static Active
 * swatch without a real open dropdown -- never pass it in real usage.
 *
 * forwardRef targets the clickable field element itself (not the whole
 * wrapper), so TokenReadout can read live-resolved custom properties off
 * exactly the node they're set on, same as Button/Text Input.
 */
export const DropdownField = forwardRef(function DropdownField(
	{
		valueText = "Text",
		active = false,
		showFieldTitleSection = true,
		fieldTitleText = "Field Title",
		showFieldTitleRightSlot = false,
		fieldTitleRightSlot,
		showDescriptionBelowInput = false,
		descriptionText = "Description Text",
		showLeftSlot = false,
		leftSlotIcon,
		showRightSlot = true,
		rightSlotIcon,
		onClick,
		forceState,
		...rest
	},
	ref,
) {
	const isActive = forceState ? forceState === "active" : active;

	return (
		<div className="ap-dropdown-field-wrapper" data-force-state={forceState}>
			{showFieldTitleSection && (
				<div className="ap-dropdown-field-title-row">
					<span className="ap-dropdown-field-title">
						{fieldTitleText}
						<span className="ap-dropdown-field-title-icon">
							<Icon icon={FaCircleInfo} size="xs" />
						</span>
					</span>
					{showFieldTitleRightSlot && <span className="ap-dropdown-field-title-slot">{fieldTitleRightSlot}</span>}
				</div>
			)}

			<div
				ref={ref}
				className="ap-dropdown-field"
				role="button"
				tabIndex={0}
				aria-haspopup="listbox"
				aria-expanded={isActive}
				data-active={isActive ? "" : undefined}
				data-force-state={forceState}
				onClick={onClick}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onClick?.(e);
					}
				}}
				{...rest}
			>
				{showLeftSlot && <span className="ap-dropdown-field-slot-icon">{leftSlotIcon}</span>}
				<span className="ap-dropdown-field-value">{valueText}</span>
				{showRightSlot && <span className="ap-dropdown-field-slot-icon">{rightSlotIcon}</span>}
			</div>

			{showDescriptionBelowInput && <div className="ap-dropdown-field-description">{descriptionText}</div>}
		</div>
	);
});
