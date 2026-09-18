import React, { forwardRef, useEffect, useRef, useState } from "react";
import { DropdownField } from "./DropdownField.jsx";
import { DropdownMenu } from "./DropdownMenu.jsx";
import { DropdownMenuRow } from "./DropdownMenuRow.jsx";
import { ChevronDownIcon, ChevronUpIcon } from "./Icon.jsx";
import "./Dropdown.css";

/**
 * The composed, real Tier 3 Dropdown -- wires <DropdownField> and
 * <DropdownMenu>/<DropdownMenuRow> together into a genuinely working
 * combobox. Figma nests the menu directly under the field in the same
 * vertical stack (the "Active" State variant's
 * `dropdown_field_and_menu_container`), and this first shipped that way
 * literally, in normal document flow -- meaning the open menu pushed
 * whatever came after it on the page down, which isn't how a real
 * dropdown/select behaves. `.ap-dropdown-menu` is now a floating overlay
 * instead (`position: absolute`, anchored to `.ap-dropdown`'s own
 * `position: relative` -- see Dropdown.css's doc comment), a plain-CSS
 * way to get Figma's "separate layer over the page" effect without a
 * portal/floating-ui dependency this component still doesn't need.
 *
 * `options`: [{ value, label, icon? }]. Clicking the field toggles the
 * menu open; clicking a row selects it, calls `onChange`, and closes the
 * menu (real interaction, same bar as SegmentGroup's click-to-select --
 * not a static mockup). A real outside click also closes it.
 *
 * `forceOpen` is a docs-only escape hatch (true/false) so the Variations
 * page can pin the menu open for a screenshot-stable swatch without
 * relying on a real click -- never pass it in real usage.
 */
export const Dropdown = forwardRef(function Dropdown(
	{
		options = [],
		value,
		onChange,
		placeholder = "Text",
		showFieldTitleSection = true,
		fieldTitleText = "Field Title",
		showDescriptionBelowInput = false,
		descriptionText = "Description Text",
		showLeftSlot = false,
		leftSlotIcon,
		forceOpen,
		...rest
	},
	ref,
) {
	const [openState, setOpenState] = useState(false);
	const rootRef = useRef(null);
	const isControlled = forceOpen !== undefined;
	const open = isControlled ? forceOpen : openState;

	useEffect(() => {
		if (isControlled) return;
		function handleClick(e) {
			if (rootRef.current && !rootRef.current.contains(e.target)) setOpenState(false);
		}
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [isControlled]);

	const selected = options.find((o) => o.value === value);

	return (
		<div
			className="ap-dropdown"
			ref={(node) => {
				rootRef.current = node;
				if (typeof ref === "function") ref(node);
				else if (ref) ref.current = node;
			}}
			{...rest}
		>
			<DropdownField
				valueText={selected ? selected.label : placeholder}
				active={open}
				showFieldTitleSection={showFieldTitleSection}
				fieldTitleText={fieldTitleText}
				showDescriptionBelowInput={showDescriptionBelowInput}
				descriptionText={descriptionText}
				showLeftSlot={showLeftSlot}
				leftSlotIcon={leftSlotIcon}
				showRightSlot
				rightSlotIcon={open ? <ChevronUpIcon /> : <ChevronDownIcon />}
				onClick={() => !isControlled && setOpenState((o) => !o)}
			/>
			{open && (
				<DropdownMenu>
					{options.map((opt) => (
						<DropdownMenuRow
							key={opt.value}
							value={opt.value}
							selected={opt.value === value}
							icon={opt.icon}
							showIcon={!!opt.icon}
							onSelect={(v) => {
								onChange?.(v);
								if (!isControlled) setOpenState(false);
							}}
						>
							{opt.label}
						</DropdownMenuRow>
					))}
				</DropdownMenu>
			)}
		</div>
	);
});
