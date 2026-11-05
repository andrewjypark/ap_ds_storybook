import React, { useEffect, useState } from "react";
import { useTokenPreview } from "../../TokenPreviewContext.jsx";

/**
 * Same pattern as Button's TokenReadout.jsx -- reads the resolved
 * "--ap-link-color-*" custom property values straight off the real <a>
 * DOM node they're set on (see Link.jsx), not a separate wrapper.
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

/** Same visual language as Button's TokenReadout -- label / var name / live value. */
export function TokenReadout({ targetRef, rows }) {
	const cssVars = rows.map((r) => r.cssVar);
	const values = useLiveCssValuesFromRef(targetRef, cssVars);

	return (
		<div className="ap-link-readout">
			{rows.map((row) => (
				<div className="ap-link-readout-row" key={row.cssVar}>
					<span className="ap-link-readout-label">{row.label}</span>
					<div className="ap-link-readout-row-info">
						<span className="ap-link-readout-var">{row.cssVar}</span>
						<span className="ap-link-readout-sep">|</span>
						<span className="ap-link-readout-value">{values[row.cssVar] || "…"}</span>
					</div>
				</div>
			))}
		</div>
	);
}
