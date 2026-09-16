import React, { useEffect, useState } from "react";
import { useTokenPreview } from "../../TokenPreviewContext.jsx";

/**
 * Same pattern as Button/TokenReadout.jsx (see that file's doc comment
 * for the full rationale) -- reads live custom-property values off an
 * externally supplied ref rather than off its own wrapper, since the
 * "--ap-text-input-*" vars a swatch cares about are set on the real
 * .ap-text-input DOM node itself (see TextInput.jsx), not on this readout.
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
 * visual language as Button's readout and Typography's composite-style-
 * card readout row. */
export function TokenReadout({ targetRef, rows }) {
	const cssVars = rows.map((r) => r.cssVar);
	const values = useLiveCssValuesFromRef(targetRef, cssVars);

	return (
		<div className="ap-text-input-readout">
			{rows.map((row) => (
				<div className="ap-text-input-readout-row" key={row.cssVar}>
					<span className="ap-text-input-readout-label">{row.label}</span>
					<div className="ap-text-input-readout-row-info">
						<span className="ap-text-input-readout-var">{row.cssVar}</span>
						<span className="ap-text-input-readout-sep">|</span>
						<span className="ap-text-input-readout-value">{values[row.cssVar] || "…"}</span>
					</div>
				</div>
			))}
		</div>
	);
}
