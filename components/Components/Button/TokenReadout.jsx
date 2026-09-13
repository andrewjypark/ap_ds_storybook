import React, { useEffect, useState } from "react";
import { useTokenPreview } from "../../TokenPreviewContext.jsx";

/**
 * Like Foundations/Color/useLiveCssValue.js's useLiveCssValues, but reads
 * off an EXTERNALLY supplied ref instead of creating its own. Needed here
 * because the vars a button swatch cares about (--ap-button-color-*,
 * --ap-button-padding-*, etc.) are set directly on the real <button> DOM
 * node itself (see Button.jsx) -- the readout has to read off THAT exact
 * node, not a separate wrapper element, or the values would just be
 * whatever (nothing) happens to be set on the wrapper.
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

/**
 * Answers Andrew's "how should devs see which variables drive this"
 * question -- same visual language as Typography's composite-style-card
 * readout row (label / var name / "|" / live value), just able to show
 * several rows at once since one button swatch is driven by more than one
 * custom property. `rows`: [{ label, cssVar }].
 */
export function TokenReadout({ targetRef, rows }) {
	const cssVars = rows.map((r) => r.cssVar);
	const values = useLiveCssValuesFromRef(targetRef, cssVars);

	return (
		<div className="ap-button-readout">
			{rows.map((row) => (
				<div className="ap-button-readout-row" key={row.cssVar}>
					<span className="ap-button-readout-label">{row.label}</span>
					<span className="ap-button-readout-var">{row.cssVar}</span>
					<span className="ap-button-readout-sep">|</span>
					<span className="ap-button-readout-value">{values[row.cssVar] || "…"}</span>
				</div>
			))}
		</div>
	);
}
