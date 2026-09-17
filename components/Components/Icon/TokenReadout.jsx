import React, { useEffect, useState } from "react";
import { useTokenPreview } from "../../TokenPreviewContext.jsx";

/**
 * Same shape as Button/TokenReadout.jsx and TextInput/TokenReadout.jsx --
 * reads live-resolved CSS custom property values off an externally
 * supplied ref, re-reading whenever the Theme/Viewport toolbar globals
 * change. Kept as its own copy rather than shared, matching this
 * codebase's one-CSS-file(and-friends)-per-component convention.
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

export function TokenReadout({ targetRef, rows }) {
	const cssVars = rows.map((r) => r.cssVar);
	const values = useLiveCssValuesFromRef(targetRef, cssVars);

	return (
		<div className="ap-icon-readout">
			{rows.map((row) => (
				<div className="ap-icon-readout-row" key={row.cssVar}>
					<span className="ap-icon-readout-label">{row.label}</span>
					<div className="ap-icon-readout-row-info">
						<span className="ap-icon-readout-var">{row.cssVar}</span>
						<span className="ap-icon-readout-sep">|</span>
						<span className="ap-icon-readout-value">{values[row.cssVar] || "…"}</span>
					</div>
				</div>
			))}
		</div>
	);
}
