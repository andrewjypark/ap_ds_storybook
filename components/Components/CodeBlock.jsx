import React, { useRef, useState } from "react";
import { FaRegCopy, FaCode } from "react-icons/fa6";
import { Button } from "./Button/Button.jsx";
import "./CodeBlock.css";

/**
 * Shared "Show code" / copy-to-clipboard block for a Variations page
 * section -- matches the Wix Design System reference Andrew pointed at
 * (each property section ends with a Copy button and a Show code/Hide
 * code toggle that reveals the exact usage snippet for what's rendered
 * above it).
 *
 * Deliberately generic (no Button/Text-Input-specific logic) and lives
 * at components/Components/ rather than inside Button/, since it's meant
 * to be reused by every future Tier 3 component's Variations page, not
 * duplicated per component the way TokenReadout.jsx is (TokenReadout
 * needs per-component var lists; this doesn't need anything
 * component-specific at all).
 *
 * The Copy and Show-code controls are real <Button>s from this design
 * system (small / ghost / sm radius, per Andrew), not one-off styled
 * <button> elements -- this page is dogfooding its own component. That
 * needed Button.jsx to grow a `leftIcon` override prop (it only ever
 * rendered one fixed placeholder icon before); see Button.jsx's doc
 * comment for why that's a real, reusable addition and not something
 * CodeBlock-only.
 *
 * The expand/collapse itself animates smoothly via CSS only (see
 * CodeBlock.css's `.ap-code-block-collapse`) -- a grid row transitioning
 * `grid-template-rows` between `0fr` and `1fr`, not a JS-measured height
 * or an added animation library. Andrew asked how the Wix reference gets
 * its own smooth version: it turned out to be `react-collapse`, which
 * measures the content's real height and animates it as an inline style
 * via JS, frame by frame -- a fine approach, but it exists specifically
 * to work around older browsers where the `0fr`/`1fr` grid trick isn't
 * available. It is now (this is a plain, well-supported CSS technique),
 * so that's what's used here instead of adding a new dependency. This is
 * also why the code panel is now always rendered in the DOM (with
 * `aria-hidden` toggling for screen readers) rather than conditionally
 * mounted on `expanded` -- the grid trick needs the collapsed content to
 * still be present (just clipped to 0 height), not removed.
 *
 * `code` is a plain string -- the exact snippet to copy AND to display.
 * It's syntax-highlighted for display via a small self-contained
 * tokenizer (see highlightJsx below) rather than a library, since these
 * are short, hand-authored "usage example" strings the project fully
 * controls -- not arbitrary code that would need a real parser.
 */

const KNOWN_ATTRS = [
	"priority",
	"size",
	"radius",
	"showLeftIcon",
	"showRightIcon",
	"showText",
	"disabled",
	"type",
	"placeholder",
	"error",
	"showFieldTitleSection",
	"showFieldTitleLeftIcon",
	"showFieldTitleRightSlot",
	"showDescriptionBelowInput",
	"showLeftSlot",
	"showRightSlot",
];

const TOKEN_RE = new RegExp(
	[
		"(//[^\\n]*)", // 1: line comment
		'("(?:[^"\\\\]|\\\\.)*")', // 2: string literal
		"(\\{[^}]*\\})", // 3: brace expression, e.g. {false}
		"(</?[A-Za-z][\\w.]*)", // 4: JSX tag name (open or close)
		"(/?>)", // 5: closing bracket(s)
		`\\b(${KNOWN_ATTRS.join("|")})\\b`, // 6: a known prop name
	].join("|"),
	"g",
);

/** Splits `code` into {text, cls} runs for syntax-highlighted display. */
function highlightJsx(code) {
	const nodes = [];
	let lastIndex = 0;
	for (const m of code.matchAll(TOKEN_RE)) {
		if (m.index > lastIndex) {
			nodes.push({ text: code.slice(lastIndex, m.index) });
		}
		const [full, comment, string, brace, tag, bracket, attr] = m;
		let cls;
		if (comment) cls = "cm";
		else if (string || brace) cls = "str";
		else if (tag) cls = "tag";
		else if (bracket) cls = "punct";
		else if (attr) cls = "attr";
		nodes.push({ text: full, cls });
		lastIndex = m.index + full.length;
	}
	if (lastIndex < code.length) nodes.push({ text: code.slice(lastIndex) });
	return nodes;
}

// Real react-icons/fa6 icons now (see components/Components/Icon/ for
// the project's general-purpose token-sized <Icon> wrapper) -- these two
// stay as tiny local wrappers rather than switching CodeBlock to
// <Icon icon={...}> directly, since Button's own icon-container CSS
// already owns their sizing (see Button.css/.ap-button-icon-container),
// same reasoning as Button/Icon.jsx's and TextInput/Icon.jsx's own
// real-icon wrappers.
// Project convention: default to Font Awesome's Regular (outline)
// style, falling back to Solid only when Font Awesome Free doesn't
// ship a Regular cut. Copy has one (`FaRegCopy`); the code-brackets
// glyph doesn't (no `FaRegCode`) -- Solid out of necessity, not choice.
function CopyIcon() {
	return <FaRegCopy aria-hidden="true" focusable="false" />;
}

function CodeIcon() {
	return <FaCode aria-hidden="true" focusable="false" />;
}

export function CodeBlock({ code }) {
	const [expanded, setExpanded] = useState(false);
	const [copyState, setCopyState] = useState("idle"); // idle | copied | failed
	const resetTimer = useRef(null);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopyState("copied");
		} catch {
			setCopyState("failed");
		}
		clearTimeout(resetTimer.current);
		resetTimer.current = setTimeout(() => setCopyState("idle"), 2000);
	};

	const tokens = highlightJsx(code);

	return (
		<div className="ap-code-block">
			<div className={`ap-code-block-collapse${expanded ? " is-expanded" : ""}`} aria-hidden={!expanded}>
				<div className="ap-code-block-collapse-inner">
					<pre className="ap-code-block-pre">
						<code>
							{tokens.map((t, i) =>
								t.cls ? (
									<span key={i} className={`ap-code-tok-${t.cls}`}>
										{t.text}
									</span>
								) : (
									<React.Fragment key={i}>{t.text}</React.Fragment>
								),
							)}
						</code>
					</pre>
				</div>
			</div>
			<div className="ap-code-block-actions">
				<Button size="small" priority="ghost" radius="sm" showLeftIcon leftIcon={<CopyIcon />} onClick={handleCopy}>
					{copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy"}
				</Button>
				<Button
					size="small"
					priority="ghost"
					radius="sm"
					showLeftIcon
					leftIcon={<CodeIcon />}
					onClick={() => setExpanded((e) => !e)}
				>
					{expanded ? "Hide code" : "Show code"}
				</Button>
			</div>
		</div>
	);
}
