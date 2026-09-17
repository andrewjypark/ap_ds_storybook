import React, { useEffect, useState } from "react";
import { useTokenPreview } from "../../TokenPreviewContext.jsx";

/**
 * Same pattern as Button/TokenReadout.jsx and TextInput/TokenReadout.jsx
 * (see either's doc comment for the full rationale) -- reads live
 * custom-property values off an externally supplied ref rather than off
 * its own wrapper, since the "--ap-segment-group-*"/"--ap-segment-*" vars
 * a swatch cares about are set on the real DOM node itself (see
 * SegmentGroup.jsx/Segment.jsx), not on this readout.
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
 * visual language as Button's/Text Input's readout. */
export function TokenReadout({ targetRef, rows }) {
	const cssVars = rows.map((r) => r.cssVar);
	const values = useLiveCssValuesFromRef(targetRef, cssVars);

	return (
		<div className="ap-segment-group-readout">
			{rows.map((row) => (
				<div className="ap-segment-group-readout-row" key={row.cssVar}>
					<span className="ap-segment-group-readout-label">{row.label}</span>
					<div className="ap-segment-group-readout-row-info">
						<span className="ap-segment-group-readout-var">{row.cssVar}</span>
						<span className="ap-segment-group-readout-sep">|</span>
						<span className="ap-segment-group-readout-value">{values[row.cssVar] || "…"}</span>
					</div>
				</div>
			))}
		</div>
	);
}
