import React, { useId } from "react";
import { InfoIcon, PenIcon, TrashIcon } from "./Icon.jsx";
import "./TextInput.css";

/**
 * Tier 3 Text Input. Props map directly onto the real Figma component's
 * variant/boolean properties (see the project doc's Text Input audit):
 *   type                                           -> Type ("Default" / "Text Area" / "URL")
 *   showFieldTitleSection / fieldTitleText         -> "Show Field Title Section" / "Field Title Text"
 *   showFieldTitleLeftIcon                         -> "Show Field Title Left Icon"
 *   showFieldTitleRightSlot / fieldTitleRightSlot  -> "Show Right Slot" (the field title row's own slot)
 *   showDescriptionBelowInput / descriptionText    -> "Show description below input"
 *   showLeftSlot / leftSlotIcon                    -> "Show Slot Container - Left"
 *   showRightSlot / rightSlotIcon                  -> "Show Slot Container - Right"
 *   error                                          -> real prop, drives the Error state
 *   forceState                                     -> DOCS-ONLY escape hatch (see Button.jsx's own
 *                                                      forceState) to pin Default/Active/Filled/Error
 *                                                      without real focus or a real value -- never pass
 *                                                      this in real product usage.
 *
 * Real state, no JS needed: Active = real :focus-within, Filled = a real
 * value is present (:not(:placeholder-shown)), Error = the `error` prop
 * (kept separate from Filled/Active since a field can be both focused/
 * filled AND invalid at once -- see TextInput.css for the precedence:
 * error always wins visually, even while focused, so a validation
 * message doesn't disappear the moment someone clicks back in to fix it).
 *
 * Figma's component has no Disabled/Read-only booleans yet (flagged as a
 * gap vs. the Wix reference in the project doc's suggestions) --
 * `disabled`/`readOnly` still work here since they're real, native
 * <input>/<textarea> attributes passed through `...rest`, just not
 * swatched on the Variations page below.
 *
 * forwardRef so a parent (e.g. TextInputVariations.jsx's swatch wrapper)
 * can read the real, live-resolved custom property values straight off
 * this exact DOM node for a token readout -- see TokenReadout.jsx.
 */
export const TextInput = React.forwardRef(function TextInput(
	{
		type = "text",
		id,
		name,
		value,
		defaultValue,
		placeholder = "Text",
		onChange,
		error = false,
		showFieldTitleSection = true,
		fieldTitleText = "Field Title",
		showFieldTitleLeftIcon = false,
		showFieldTitleRightSlot = false,
		fieldTitleRightSlot,
		showDescriptionBelowInput = false,
		descriptionText = "Description below input",
		showLeftSlot = false,
		showRightSlot = false,
		leftSlotIcon,
		rightSlotIcon,
		onLeftSlotClick,
		onRightSlotClick,
		forceState,
		...rest
	},
	ref,
) {
	// useId, not Math.random() -- stable across server/client renders and
	// guaranteed unique even when several TextInputs mount at once (e.g.
	// every swatch on the Variations page below).
	const autoId = useId();
	const inputId = id || autoId;
	const descriptionId = `${inputId}-description`;

	const fieldProps = {
		id: inputId,
		name,
		value,
		defaultValue,
		placeholder,
		onChange,
		className: "ap-text-input-field",
		"aria-invalid": error || undefined,
		"aria-describedby": showDescriptionBelowInput ? descriptionId : undefined,
		...rest,
	};

	return (
		<div className="ap-text-input" data-error={error || undefined} data-force-state={forceState}>
			{showFieldTitleSection && (
				<div className="ap-text-input-title-row">
					<span className="ap-text-input-title">
						{fieldTitleText}
						{showFieldTitleLeftIcon && (
							<span className="ap-text-input-title-icon">
								<InfoIcon />
							</span>
						)}
					</span>
					{showFieldTitleRightSlot && <span className="ap-text-input-title-slot">{fieldTitleRightSlot}</span>}
				</div>
			)}

			<div className="ap-text-input-form-field">
				{showLeftSlot && (
					<button type="button" className="ap-text-input-slot-icon" onClick={onLeftSlotClick} aria-label="Clear">
						{leftSlotIcon || <TrashIcon />}
					</button>
				)}

				{type === "url" && <span className="ap-text-input-prefix">https://</span>}

				{type === "textarea" ? (
					<textarea ref={ref} rows={3} {...fieldProps} />
				) : (
					<input ref={ref} type={type === "url" ? "url" : "text"} {...fieldProps} />
				)}

				{showRightSlot && (
					<button type="button" className="ap-text-input-slot-icon" onClick={onRightSlotClick} aria-label="Edit">
						{rightSlotIcon || <PenIcon />}
					</button>
				)}
			</div>

			{showDescriptionBelowInput && (
				<div className="ap-text-input-description" id={descriptionId}>
					{descriptionText}
				</div>
			)}
		</div>
	);
});
