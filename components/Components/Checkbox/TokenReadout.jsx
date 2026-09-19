import React, { useEffect, useState } from "react";
import { useTokenPreview } from "../../TokenPreviewContext.jsx";

/**
 * Same pattern as every other Tier 3 component's own TokenReadout.jsx
 * (see Button's/Dropdown's for the full rationale) -- reads live
 * custom-property values off an externally supplied ref, since the
 * "--ap-checkbox-*" vars a swatch cares about are set on the real DOM
 * node itself (see Checkbox.jsx), not on this readout.
 */
function useLiveCssValuesFromRef(targetRef, cssVars) {
	const [values, setValues] = useState({});
	const { theme, viewport } = useTokenPreview();
	const cssVarsKey = cssVars.join("|");

	useEffect(() => {
		const node = targetRef.current;
		if (!node) return;
		const computed = getComputedStyle(node);
		const next = {};
		for (const cssVar of cssVarsKey.split("|")) {
			next[cssVar] = computed.getPropertyValue(cssVar).trim();
		}
		setValues(next);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cssVarsKey, theme, viewport, targetRef]);

	return values;
}

/** `rows`: [{ label, cssVar }]. Same label / var name / "|" / live value
 * visual language as every other Tier 3 component's readout. */
export function TokenReadout({ targetRef, rows }) {
	const cssVars = rows.map((r) => r.cssVar);
	const values = useLiveCssValuesFromRef(targetRef, cssVars);

	return (
		<div className="ap-checkbox-readout">
			{rows.map((row) => (
				<div className="ap-checkbox-readout-row" key={row.cssVar}>
					<span className="ap-checkbox-readout-label">{row.label}</span>
					<div className="ap-checkbox-readout-row-info">
						<span className="ap-checkbox-readout-var">{row.cssVar}</span>
						<span className="ap-checkbox-readout-sep">|</span>
						<span className="ap-checkbox-readout-value">{values[row.cssVar] || "…"}</span>
					</div>
				</div>
			))}
		</div>
	);
}
