import React from "react";
import { FaXmark } from "react-icons/fa6";
import { Button } from "../Button/Button.jsx";
import { modalVar } from "./modalTokens.js";
import "./Modal.css";

/**
 * Tier 3 Modal. Structure mirrors the real Figma component (Storybook
 * Planning file, "Modal" frame, node 38:3371 -- header/body/footer
 * sections each with their own instance in Figma, joined by 1px divider
 * lines): a header (title + optional close button), an optional body
 * (free-form content -- use <ModalBanner> inside it for the "Add to
 * Section" warning-banner variant seen in Figma), and an optional footer
 * (a right-aligned action slot -- pass real <Button> elements, same as
 * Figma's footer button container).
 *
 * Colors/padding/radius/shadow/typography all come from the real
 * "--ap-modal-*" custom properties build-tokens.js generates from
 * tokens.json's "tier_3/modal" set -- nothing here is a hand-typed value
 * (see modalTokens.js for how each Figma value was mapped onto the
 * existing design-token scale).
 *
 * This component renders just the dialog card itself, matching how
 * Figma's "Modal" frame documents the card in isolation. Figma also
 * documents a separate "Dark Overlay" usage (the card centered over a
 * full-viewport scrim) -- pass `overlay` to wrap the card in that scrim
 * for a real product placement; omit it (the default) when embedding the
 * card directly in a page for documentation/preview purposes, same as
 * every swatch on this page.
 *
 * forwardRef so a parent (e.g. ModalVariations.jsx's swatch wrapper) can
 * read the real, live-resolved custom property values straight off this
 * exact DOM node for a token readout -- see TokenReadout.jsx (same
 * technique as Button.jsx).
 */
export const Modal = React.forwardRef(function Modal(
	{ title, onClose, children, footer, overlay = false, className = "", ...rest },
	ref,
) {
	const dialog = (
		<div
			ref={ref}
			className={["ap-modal", className].filter(Boolean).join(" ")}
			role="dialog"
			aria-modal="true"
			aria-label={title}
			style={{
				background: `var(${modalVar.color("background")})`,
				borderRadius: `var(${modalVar.borderRadius()})`,
				boxShadow: `var(${modalVar.boxShadow()})`,
				width: `var(${modalVar.width()})`,
			}}
			{...rest}
		>
			{/* modal_header_section from Figma -- title + close button, with a
			    1px divider along the bottom edge shared with modal_footer_
			    section's own top-edge divider (Figma draws these as separate
			    "divider line" nodes; one shared divider color/width token pair
			    covers both here). */}
			<div
				className="ap-modal-header-section"
				style={{
					color: `var(${modalVar.header("color-text")})`,
					borderBottomColor: `var(${modalVar.header("color-divider")})`,
					borderBottomWidth: `var(${modalVar.header("divider-width")})`,
					paddingInline: `var(${modalVar.header("padding-horizontal")})`,
					paddingBlock: `var(${modalVar.header("padding-vertical")})`,
				}}
			>
				<span className="ap-modal-header-title" style={{ font: `var(${modalVar.header("text")})` }}>
					{title}
				</span>
				{onClose && (
					<Button
						priority="ghost"
						size="small"
						showRightIcon
						showText={false}
						rightIcon={<FaXmark aria-hidden="true" focusable="false" />}
						onClick={onClose}
						aria-label="Close"
					/>
				)}
			</div>

			{/* modal_body_section from Figma -- free-form content. Drop a
			    <ModalBanner> in here to match the "Add to Section" warning
			    example. */}
			{children != null && (
				<div
					className="ap-modal-body-section"
					style={{
						color: `var(${modalVar.body("color-text")})`,
						paddingInline: `var(${modalVar.body("padding-horizontal")})`,
						paddingBlock: `var(${modalVar.body("padding-vertical")})`,
						gap: `var(${modalVar.body("gap")})`,
						font: `var(${modalVar.body("text")})`,
					}}
				>
					{children}
				</div>
			)}

			{/* modal_footer_section from Figma -- right-aligned action slot
			    (modal_footer_section_button_container: primaryAxisAlignItems
			    MAX). Pass real <Button>s, e.g. <Button priority="secondary"
			    size="small">Close</Button>. */}
			{footer && (
				<div
					className="ap-modal-footer-section"
					style={{
						borderTopColor: `var(${modalVar.header("color-divider")})`,
						borderTopWidth: `var(${modalVar.header("divider-width")})`,
						paddingInline: `var(${modalVar.footer("padding-horizontal")})`,
						paddingBlock: `var(${modalVar.footer("padding-vertical")})`,
						gap: `var(${modalVar.footer("gap")})`,
					}}
				>
					{footer}
				</div>
			)}
		</div>
	);

	if (!overlay) return dialog;

	return <div className="ap-modal-overlay">{dialog}</div>;
});

/**
 * modal_banner from Figma -- the yellow "All columns are filled..."
 * alert box seen inside modal_body_section in both the "Add to Section"
 * example and the standalone "emailer_section_settings_modal_content"
 * instance. A separate exported piece (not baked into <Modal> itself)
 * since Figma treats it as optional content dropped into the body slot,
 * not a fixed part of every modal.
 */
export function ModalBanner({ children, className = "", ...rest }) {
	return (
		<div
			className={["ap-modal-banner", className].filter(Boolean).join(" ")}
			style={{
				background: `var(${modalVar.banner("color-background")})`,
				borderColor: `var(${modalVar.banner("color-border")})`,
				color: `var(${modalVar.banner("color-text")})`,
				borderWidth: `var(${modalVar.banner("border-width")})`,
				borderRadius: `var(${modalVar.banner("border-radius")})`,
				padding: `var(${modalVar.banner("padding")})`,
				font: `var(${modalVar.banner("text")})`,
			}}
			{...rest}
		>
			{children}
		</div>
	);
}
