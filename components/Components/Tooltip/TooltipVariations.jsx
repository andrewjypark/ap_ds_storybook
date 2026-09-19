import React, { useRef, useState } from "react";
import { Tooltip } from "./Tooltip.jsx";
import { TokenReadout } from "./TokenReadout.jsx";
import { COLORS, POSITIONS, tooltipVar } from "./tooltipTokens.js";
import { CodeBlock } from "../CodeBlock.jsx";
import { Icon } from "../Icon/Icon.jsx";
import { FaRegSquare } from "react-icons/fa6";
import "./Tooltip.css";

function Section({ title, children }) {
	return (
		<section className="ap-tooltip-section">
			<h3 className="ap-tooltip-section-title" data-theme="storybook_ds" data-viewport="desktop">
				{title}
			</h3>
			<div className="ap-tooltip-section-body">{children}</div>
		</section>
	);
}

function HoverDemo({ position, label }) {
	const [hovered, setHovered] = useState(false);
	return (
		<div className="ap-tooltip-swatch">
			<div
				className="ap-tooltip-demo-anchor"
				data-theme="core"
				data-viewport="desktop"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<Icon icon={FaRegSquare} size="medium" />
				{hovered && (
					<div className={`ap-tooltip-demo-popup ap-tooltip-demo-popup--${position}`}>
						<Tooltip color="dark" position={position} text="Tooltip Text" />
					</div>
				)}
			</div>
			<div className="ap-tooltip-swatch-label">{label}</div>
		</div>
	);
}

/**
 * The Tooltip's "Variations" page -- documentation-first, same format as
 * every other Tier 3 component's own Variations page. No Playground
 * page, matching Text Input's/Segment Group's/Dropdown's/Checkbox's
 * precedent.
 *
 * Sourced from the real "Tooltip" Figma COMPONENT_SET (Storybook
 * Planning file, "Components from GT" page) -- see tooltipTokens.js for
 * the full audit.
 */
export function TooltipVariations() {
	const darkRef = useRef(null);
	const lightRef = useRef(null);

	return (
		<div>
			<h3 className="ap-color-section__title" data-theme="storybook_ds" data-viewport="desktop">
				Tooltip
			</h3>

			<Section title="Content">
				<div className="ap-tooltip-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Figma's real "Tooltip" component has exactly two variant axes plus one text property, mapped
						onto <code>&lt;Tooltip&gt;</code>:
					</p>
					<ul>
						<li>
							<code>color</code> -- <code>"dark"</code> (default) or <code>"light"</code>.
						</li>
						<li>
							<code>position</code> -- <code>"bottom"</code> (default) / <code>"top"</code> /{" "}
							<code>"left"</code> / <code>"right"</code>. This is where the tooltip sits relative to
							whatever it's attached to, so the arrow always points back toward that target.
						</li>
						<li>
							<code>text</code> -- the bubble's label (Figma's own <code>Tooltip Text</code> property).
						</li>
					</ul>
					<p>
						This is just the bubble itself, same as Figma's own component -- there's no built-in
						trigger/positioning system. See "Interactive" below for a real hover-driven example built
						entirely from this component.
					</p>
				</div>
				<div className="ap-tooltip-section-example">
					<div className="ap-tooltip-swatch-group ap-tooltip-swatch-group--stacked" data-theme="storybook_ds" data-viewport="desktop">
						{COLORS.map((c) => (
							<div className="ap-tooltip-color-group" key={c.key}>
								{POSITIONS.map((p) => (
									<div className="ap-tooltip-swatch" key={`${c.key}-${p.key}`}>
										<div data-theme="core" data-viewport="desktop">
											<div
												className={`ap-tooltip_container${c.key === "light" ? " ap-tooltip_container--light" : ""}`}
											>
												<Tooltip
													ref={c.key === "dark" && p.key === "bottom" ? darkRef : c.key === "light" && p.key === "bottom" ? lightRef : undefined}
													color={c.key}
													position={p.key}
												/>
											</div>
										</div>
										<div className="ap-tooltip-swatch-label">
											{c.label} / {p.label}
										</div>
									</div>
								))}
							</div>
						))}
					</div>
					<div className="ap-tooltip-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<TokenReadout
							targetRef={darkRef}
							rows={[
								{ label: "bg", cssVar: tooltipVar.background("dark") },
								{ label: "text", cssVar: tooltipVar.textColor("dark") },
							]}
						/>
						<TokenReadout
							targetRef={lightRef}
							rows={[
								{ label: "bg", cssVar: tooltipVar.background("light") },
								{ label: "text", cssVar: tooltipVar.textColor("light") },
							]}
						/>
					</div>
					<CodeBlock
						code={['<Tooltip color="dark" position="bottom" text="Tooltip Text" />', '<Tooltip color="light" position="top" text="Tooltip Text" />'].join(
							"\n",
						)}
					/>
				</div>
			</Section>

			<Section title="Interactive">
				<div className="ap-tooltip-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Hover each square -- the real <code>&lt;Tooltip&gt;</code> is conditionally rendered on
						<code>mouseEnter</code>/<code>mouseLeave</code> and positioned with plain CSS relative to its
						trigger. This demo wrapper (<code>.ap-tooltip-demo-anchor</code>/
						<code>.ap-tooltip-demo-popup</code>) is Storybook-only scaffolding, not a shipped component --
						Figma's own "Tooltip" doesn't define a trigger/anchor system either, so none was invented here.
					</p>
				</div>
				<div className="ap-tooltip-section-example">
					<div className="ap-tooltip-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						{POSITIONS.map((p) => (
							<HoverDemo key={p.key} position={p.key} label={p.label} />
						))}
					</div>
					<CodeBlock
						code={[
							"const [hovered, setHovered] = useState(false);",
							"",
							'<div style={{ position: "relative" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>',
							"  {trigger}",
							"  {hovered && (",
							'    <div style={{ position: "absolute", /* offset per position */ }}>',
							'      <Tooltip color="dark" position="bottom" text="Tooltip Text" />',
							"    </div>",
							"  )}",
							"</div>",
						].join("\n")}
					/>
				</div>
			</Section>
		</div>
	);
}
