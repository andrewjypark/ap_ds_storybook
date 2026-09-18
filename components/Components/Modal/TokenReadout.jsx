import React, { useEffect, useState } from "react";
import { useTokenPreview } from "../../TokenPreviewContext.jsx";

/**
 * Same technique as Button/TokenReadout.jsx: reads the resolved custom-
 * property values straight off an externally supplied ref (the real
 * <Modal> DOM node -- see Modal.jsx, which sets --ap-modal-* directly on
 * that node's own inline style) rather than off a separate wrapper.
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

/** `rows`: [{ label, cssVar }] -- same shape/visual language as Button's. */
export function TokenReadout({ targetRef, rows }) {
	const cssVars = rows.map((r) => r.cssVar);
	const values = useLiveCssValuesFromRef(targetRef, cssVars);

	return (
		<div className="ap-modal-readout">
			{rows.map((row) => (
				<div className="ap-modal-readout-row" key={row.cssVar}>
					<span className="ap-modal-readout-label">{row.label}</span>
					<div className="ap-modal-readout-row-info">
						<span className="ap-modal-readout-var">{row.cssVar}</span>
						<span className="ap-modal-readout-sep">|</span>
						<span className="ap-modal-readout-value">{values[row.cssVar] || "…"}</span>
					</div>
				</div>
			))}
		</div>
	);
}
