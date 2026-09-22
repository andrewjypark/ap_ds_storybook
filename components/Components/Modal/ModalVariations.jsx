import React, { useRef } from "react";
import { Modal, ModalBanner } from "./Modal.jsx";
import { Button } from "../Button/Button.jsx";
import { TokenReadout } from "./TokenReadout.jsx";
import { modalVar } from "./modalTokens.js";
import { CodeBlock } from "../CodeBlock.jsx";
import "./Modal.css";

/**
 * One example modal + its live token readout. Holds its own ref so
 * TokenReadout can read the resolved custom-property values straight off
 * this exact modal DOM node (same reasoning as Button/ButtonVariations.jsx's
 * ButtonSwatch).
 */
function ModalSwatch({ swatchLabel, rows, ...modalProps }) {
	const ref = useRef(null);
	return (
		<div className="ap-modal-swatch">
			<div className="ap-modal-swatch-example">
				<Modal ref={ref} {...modalProps} />
			</div>
			{swatchLabel && <div className="ap-modal-swatch-label">{swatchLabel}</div>}
			<TokenReadout targetRef={ref} rows={rows} />
		</div>
	);
}

function Section({ title, children }) {
	return (
		<section className="ap-modal-section">
			<h3 className="ap-modal-section-title" data-theme="storybook_ds" data-viewport="desktop">
				{title}
			</h3>
			<div className="ap-modal-section-body">{children}</div>
		</section>
	);
}

/**
 * The modal's "Variations" page -- built from the real Figma "Modal"
 * frame (Storybook Planning file, node 38:3371, captured 2026-09-18),
 * which documents three usages: a plain header/body dialog, the "Add to
 * Section" warning-banner dialog (used in Emailer section settings), and
 * a dark-overlay placement. Same documentation-first pattern as Button/
 * ButtonVariations.jsx -- each section's swatch group is followed by a
 * CodeBlock showing the exact usage snippet.
 *
 * Modal has no Core/Green/Gold theming yet (single mode, same as Button/
 * Text Input/Dropdown) -- one page covers every theme.
 */
export function ModalVariations() {
	return (
		<div>
			<h3 className="ap-section__title" data-theme="storybook_ds" data-viewport="desktop">
				Modal
			</h3>
			<Section title="Anatomy">
				<div className="ap-modal-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						A modal has a <code>title</code>, an optional <code>onClose</code> handler (renders the header's
						close button), free-form body <code>children</code>, and an optional right-aligned{" "}
						<code>footer</code> action slot.
					</p>
					<ul>
						<li>
							Body and footer are both optional -- a modal can be header-only, or header + body with no
							footer actions.
						</li>
						<li>
							The footer's divider and the header's divider share the same token pair (Figma draws them as
							two separate "divider line" layers with identical styling).
						</li>
					</ul>
				</div>
				<div className="ap-modal-section-example">
					<div className="ap-modal-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<ModalSwatch
							swatchLabel="Header + body + footer"
							title="Header Text"
							onClose={() => {}}
							footer={
								<Button priority="secondary" size="small">
									Close
								</Button>
							}
							rows={[
								{ label: "bg", cssVar: modalVar.color("background") },
								{ label: "radius", cssVar: modalVar.borderRadius() },
								{ label: "shadow", cssVar: modalVar.boxShadow() },
							]}
						>
							Example body text.
						</ModalSwatch>
					</div>
					<CodeBlock
						code={[
							"<Modal",
							'  title="Header Text"',
							"  onClose={() => setOpen(false)}",
							'  footer={<Button priority="secondary" size="small">Close</Button>}',
							">",
							"  Example body text.",
							"</Modal>",
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Warning banner">
				<div className="ap-modal-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Matches Figma's "Add to Section" example (used in Emailer section settings): a{" "}
						<code>&lt;ModalBanner&gt;</code> dropped inside the body slot for an inline warning message,
						paired with a single "Close" footer action.
					</p>
				</div>
				<div className="ap-modal-section-example">
					<div className="ap-modal-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<ModalSwatch
							swatchLabel="Add to Section"
							title="Add to Section"
							onClose={() => {}}
							footer={
								<Button priority="secondary" size="small">
									Close
								</Button>
							}
							rows={[
								{ label: "bg", cssVar: modalVar.banner("color-background") },
								{ label: "border", cssVar: modalVar.banner("color-border") },
								{ label: "text", cssVar: modalVar.banner("color-text") },
							]}
						>
							<ModalBanner>All columns are filled. Remove items or increase column size to add more.</ModalBanner>
						</ModalSwatch>
					</div>
					<CodeBlock
						code={[
							"<Modal",
							'  title="Add to Section"',
							"  onClose={() => setOpen(false)}",
							'  footer={<Button priority="secondary" size="small">Close</Button>}',
							">",
							"  <ModalBanner>",
							"    All columns are filled. Remove items or increase column size to add more.",
							"  </ModalBanner>",
							"</Modal>",
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Overlay">
				<div className="ap-modal-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Matches Figma's "Dark Overlay" usage example -- pass <code>overlay</code> to center the modal
						over a full-viewport scrim, for a real product placement rather than an in-page preview.
					</p>
					<p className="ap-modal-note">
						Shown here inside a fixed-height frame so the overlay doesn't cover the rest of the page.
					</p>
				</div>
				<div className="ap-modal-section-example">
					<div
						className="ap-modal-swatch-group"
						data-theme="storybook_ds"
						data-viewport="desktop"
						style={{ position: "relative", height: 360, overflow: "hidden" }}
					>
						<Modal
							title="Header Text"
							onClose={() => {}}
							overlay
							footer={
								<Button priority="secondary" size="small">
									Close
								</Button>
							}
						>
							Example body text.
						</Modal>
					</div>
					<CodeBlock
						code={[
							'<Modal title="Header Text" onClose={() => setOpen(false)} overlay',
							'  footer={<Button priority="secondary" size="small">Close</Button>}',
							">",
							"  Example body text.",
							"</Modal>",
						].join("\n")}
					/>
				</div>
			</Section>
		</div>
	);
}
