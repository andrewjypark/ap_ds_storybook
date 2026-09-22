import React, { useRef } from "react";
import {
	FaCirclePlus,
	FaCircleInfo,
	FaRegTrashCan,
	FaRegPenToSquare,
	FaRegCopy,
	FaCode,
	FaMagnifyingGlass,
	FaHouse,
	FaRegUser,
	FaGear,
	FaCheck,
	FaXmark,
	FaChevronDown,
	FaChevronUp,
	FaChevronLeft,
	FaChevronRight,
	FaRegBell,
	FaRegCalendar,
	FaRegEnvelope,
	FaDownload,
	FaUpload,
	FaLink,
	FaRegEye,
	FaRegEyeSlash,
	FaLock,
	FaUnlock,
	FaRegCircleCheck,
	FaCircleExclamation,
	FaTriangleExclamation,
	FaRegCircleXmark,
	FaPlus,
	FaMinus,
	FaEllipsis,
	FaEllipsisVertical,
	FaArrowRight,
	FaArrowLeft,
	FaFilter,
	FaSort,
	FaStar,
	FaRegStar,
	FaRegHeart,
	FaRegClock,
	FaRegFolder,
	FaRegFile,
	FaRegImage,
	FaGripVertical,
	FaBars,
} from "react-icons/fa6";
import { Icon } from "./Icon.jsx";
import { TokenReadout } from "./TokenReadout.jsx";
import { CodeBlock } from "../CodeBlock.jsx";
import { SIZES, iconVar } from "./iconTokens.js";
import "./Icon.css";

/** One example icon + its live token readout, same pattern as
 * Button/TextInput's own *Swatch components. */
function IconSwatch({ swatchLabel, rows, ...iconProps }) {
	const ref = useRef(null);
	return (
		<div className="ap-icon-swatch">
			<div className="ap-icon-swatch-example" data-theme="core" data-viewport="desktop">
				<Icon ref={ref} {...iconProps} />
			</div>
			{swatchLabel && <div className="ap-icon-swatch-label">{swatchLabel}</div>}
			{rows && <TokenReadout targetRef={ref} rows={rows} />}
		</div>
	);
}

function Section({ title, children }) {
	return (
		<section className="ap-icon-section">
			<h3 className="ap-icon-section-title" data-theme="storybook_ds" data-viewport="desktop">
				{title}
			</h3>
			<div className="ap-icon-section-body">{children}</div>
		</section>
	);
}

/**
 * Curated cross-section of react-icons/fa6 grouped by common use -- NOT
 * the full ~2000-icon library (importing all of it here would defeat
 * tree-shaking and make this one page enormous). This is meant as a
 * quick-reference starting point and a demonstration that every icon
 * here renders at the exact same visual size regardless of its own
 * glyph proportions -- browse the full set at
 * https://react-icons.github.io/react-icons/icons/fa6/ and import
 * whatever else you need the same way.
 *
 * Regular (outline) is used by default wherever Font Awesome Free ships
 * one; entries marked "(solid)" have no Regular cut in the free set and
 * fall back to Solid out of necessity -- see the "Style" section below
 * and Icon.jsx's own doc comment for the full explanation.
 */
const GALLERY = [
	{
		group: "Actions",
		icons: [
			{ Component: FaPlus, name: "FaPlus", solid: true },
			{ Component: FaMinus, name: "FaMinus", solid: true },
			{ Component: FaCheck, name: "FaCheck", solid: true },
			{ Component: FaXmark, name: "FaXmark", solid: true },
			{ Component: FaRegPenToSquare, name: "FaRegPenToSquare" },
			{ Component: FaRegTrashCan, name: "FaRegTrashCan" },
			{ Component: FaRegCopy, name: "FaRegCopy" },
			{ Component: FaDownload, name: "FaDownload", solid: true },
			{ Component: FaUpload, name: "FaUpload", solid: true },
			{ Component: FaFilter, name: "FaFilter", solid: true },
			{ Component: FaSort, name: "FaSort", solid: true },
			{ Component: FaMagnifyingGlass, name: "FaMagnifyingGlass", solid: true },
		],
	},
	{
		group: "Navigation",
		icons: [
			{ Component: FaHouse, name: "FaHouse", solid: true },
			{ Component: FaBars, name: "FaBars", solid: true },
			{ Component: FaChevronUp, name: "FaChevronUp", solid: true },
			{ Component: FaChevronDown, name: "FaChevronDown", solid: true },
			{ Component: FaChevronLeft, name: "FaChevronLeft", solid: true },
			{ Component: FaChevronRight, name: "FaChevronRight", solid: true },
			{ Component: FaArrowLeft, name: "FaArrowLeft", solid: true },
			{ Component: FaArrowRight, name: "FaArrowRight", solid: true },
			{ Component: FaEllipsis, name: "FaEllipsis", solid: true },
			{ Component: FaEllipsisVertical, name: "FaEllipsisVertical", solid: true },
			{ Component: FaGripVertical, name: "FaGripVertical", solid: true },
		],
	},
	{
		group: "Status",
		icons: [
			{ Component: FaRegCircleCheck, name: "FaRegCircleCheck" },
			{ Component: FaCircleInfo, name: "FaCircleInfo", solid: true },
			{ Component: FaCircleExclamation, name: "FaCircleExclamation", solid: true },
			{ Component: FaTriangleExclamation, name: "FaTriangleExclamation", solid: true },
			{ Component: FaRegCircleXmark, name: "FaRegCircleXmark" },
			{ Component: FaCirclePlus, name: "FaCirclePlus", solid: true },
		],
	},
	{
		group: "Communication & account",
		icons: [
			{ Component: FaRegEnvelope, name: "FaRegEnvelope" },
			{ Component: FaRegBell, name: "FaRegBell" },
			{ Component: FaRegUser, name: "FaRegUser" },
			{ Component: FaGear, name: "FaGear", solid: true },
			{ Component: FaLock, name: "FaLock", solid: true },
			{ Component: FaUnlock, name: "FaUnlock", solid: true },
			{ Component: FaRegEye, name: "FaRegEye" },
			{ Component: FaRegEyeSlash, name: "FaRegEyeSlash" },
			{ Component: FaLink, name: "FaLink", solid: true },
			{ Component: FaRegCalendar, name: "FaRegCalendar" },
			{ Component: FaRegClock, name: "FaRegClock" },
		],
	},
	{
		group: "Files & content",
		icons: [
			{ Component: FaRegFolder, name: "FaRegFolder" },
			{ Component: FaRegFile, name: "FaRegFile" },
			{ Component: FaRegImage, name: "FaRegImage" },
			{ Component: FaRegStar, name: "FaRegStar" },
			{ Component: FaRegHeart, name: "FaRegHeart" },
		],
	},
];

/**
 * The Icon system's "Variations" page -- same documentation-first,
 * property-by-property format as Button's and Text Input's own
 * Variations pages. Covers the one real prop (`size`), the Regular/Solid
 * style convention, shows where the icon system is already wired into
 * other Tier 3 components today, then a curated gallery to browse/copy
 * from.
 */
export function IconVariations() {
	return (
		<div>
			<h3 className="ap-section__title" data-theme="storybook_ds" data-viewport="desktop">
				Icon
			</h3>
			<Section title="About">
				<div className="ap-icon-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Icons come from <a href="https://react-icons.github.io/react-icons/icons/fa6/">react-icons</a>'s
						Font Awesome 6 set (<code>react-icons/fa6</code>) — the only icon library this project uses, so
						every icon here shares the same design grid and renders at a consistent size. Mixing in icons
						from a different library would break that consistency (different libraries use very different
						internal proportions).
					</p>
					<p>
						Use the shared <code>&lt;Icon&gt;</code> component rather than importing an icon straight into
						your markup — it sizes the icon off the token scale below and normalizes it to fill its box
						exactly, regardless of that icon's own glyph proportions.
					</p>
				</div>
				<div className="ap-icon-section-example">
					<div className="ap-icon-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<IconSwatch icon={FaRegCircleCheck} size="medium" />
					</div>
					<CodeBlock
						code={[
							'import { FaRegCircleCheck } from "react-icons/fa6";',
							'import { Icon } from "components/Components/Icon/Icon.jsx";',
							"",
							'<Icon icon={FaRegCircleCheck} size="medium" />',
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Style: Regular vs. Solid">
				<div className="ap-icon-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Font Awesome ships several styles, but the free tier this project uses only includes two:{" "}
						<strong>Solid</strong> (filled — every icon has one, imported as plain <code>Fa&lt;Name&gt;</code>)
						and <strong>Regular</strong> (outline — only about 164 icons have one, imported as{" "}
						<code>FaReg&lt;Name&gt;</code>). Light, Thin, and Duotone are Font Awesome Pro styles and aren't
						available in this package at all.
					</p>
					<p>
						<strong>Default to Regular</strong> whenever it exists — it reads lighter and matches most
						modern UI conventions. Regular's coverage skews toward "content" glyphs (star, heart, user,
						envelope, calendar, file...); most interface-chrome icons (chevrons, arrows, plus/minus, a
						gear, a magnifying glass) have no Regular cut at all and stay Solid out of necessity, not
						choice — those are marked <em>(solid)</em> in the gallery below.
					</p>
					<p className="ap-icon-note">
						There's no single prop that switches this — Solid and Regular are different react-icons
						components. Check whether <code>FaReg&lt;Name&gt;</code> exists before importing a new icon,
						and prefer it.
					</p>
				</div>
				<div className="ap-icon-section-example">
					<div className="ap-icon-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<IconSwatch swatchLabel="Regular (default)" icon={FaRegStar} size="large" />
						<IconSwatch swatchLabel="Solid (fallback only)" icon={FaStar} size="large" />
					</div>
					<CodeBlock
						code={[
							'// Has a Regular cut -- use it',
							'<Icon icon={FaRegStar} />',
							"",
							"// Solid only used when no FaReg<Name> exists",
							'<Icon icon={FaGear} />  // no FaRegGear',
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Size">
				<div className="ap-icon-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						Control icon size with the <code>size</code> prop.
					</p>
					<ul>
						<li>
							<code>large</code> — a standalone icon acting as the main visual in its context (an empty-state
							illustration stand-in, a large status indicator).
						</li>
						<li>
							<code>medium</code> — the default; matches Button's own medium icon size, so it sits naturally
							next to body text and buttons.
						</li>
						<li>
							<code>small</code> — dense UI: table rows, inline with small text, compact toolbars.
						</li>
						<li>
							<code>xs</code> — smaller than small: a compact inline glyph sitting next to a label or caption
							(e.g. Dropdown's field-title info icon).
						</li>
					</ul>
					<p className="ap-icon-note">
						This scale is separate from Button's and Text Input's own icon tokens, which stay bound to
						their specific fixed slots — this one is for any other place an icon appears on its own.
						Every step has 2px of padding around the glyph (see Icon.css), so it never fills its
						container edge-to-edge.
					</p>
				</div>
				<div className="ap-icon-section-example">
					<div className="ap-icon-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						{SIZES.map((size) => (
							<IconSwatch
								key={size.key}
								swatchLabel={size.label}
								icon={FaRegCircleCheck}
								size={size.key}
								rows={[{ label: "size", cssVar: iconVar.size(size.key) }]}
							/>
						))}
					</div>
					<CodeBlock
						code={[
							'<Icon icon={FaRegCircleCheck} size="large" />',
							'<Icon icon={FaRegCircleCheck} size="medium" />',
							'<Icon icon={FaRegCircleCheck} size="small" />',
							'<Icon icon={FaRegCircleCheck} size="xs" />',
						].join("\n")}
					/>
				</div>
			</Section>

			<Section title="Already in use">
				<div className="ap-icon-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>Real Font Awesome 6 icons already back other Tier 3 components' icon slots:</p>
					<ul>
						<li>
							<strong>Button</strong> — its default left/right icon slot renders <code>FaPlus</code>, a
							bare plus mark. The real Figma component's icon slot was originally documented as
							circle-plus, but Font Awesome Free has no Regular cut of circle-plus or square-plus, so we
							moved to the bare plus mark instead -- it has no background shape to fill or outline, so it
							reads as outline-weight without needing a <code>FaReg</code> variant at all
							(see <a href="?path=/docs/tier-3-components-button-variations--docs">Button → Variations</a>).
						</li>
						<li>
							<strong>Text Input</strong> — the field-title hint icon is <code>FaCircleInfo</code> (Solid,
							same reason); the example left/right slot content is <code>FaRegTrashCan</code> /{" "}
							<code>FaRegPenToSquare</code> (both Regular) (see Text Input → Variations).
						</li>
						<li>
							<strong>CodeBlock</strong>'s Copy/Show-code buttons use <code>FaRegCopy</code> (Regular) and{" "}
							<code>FaCode</code> (Solid — no Regular cut for the code-brackets glyph).
						</li>
					</ul>
				</div>
				<div className="ap-icon-section-example">
					<div className="ap-icon-swatch-group" data-theme="storybook_ds" data-viewport="desktop">
						<IconSwatch swatchLabel="Button (default)" icon={FaPlus} size="medium" />
						<IconSwatch swatchLabel="Text Input (title)" icon={FaCircleInfo} size="small" />
						<IconSwatch swatchLabel="Text Input (left slot)" icon={FaRegTrashCan} size="small" />
						<IconSwatch swatchLabel="Text Input (right slot)" icon={FaRegPenToSquare} size="small" />
						<IconSwatch swatchLabel="CodeBlock (copy)" icon={FaRegCopy} size="small" />
						<IconSwatch swatchLabel="CodeBlock (code)" icon={FaCode} size="small" />
					</div>
				</div>
			</Section>

			<Section title="Gallery">
				<div className="ap-icon-section-copy" data-theme="storybook_ds" data-viewport="desktop">
					<p>
						A curated starting set, not the full library — <code>react-icons/fa6</code> ships several
						thousand icons. Find the one you need in the{" "}
						<a href="https://react-icons.github.io/react-icons/icons/fa6/">full fa6 gallery</a>, check
						whether a <code>FaReg&lt;Name&gt;</code> version exists and prefer it, then import it the same
						way. Cells marked <em>(solid)</em> below have no Regular cut.
					</p>
				</div>
				<div className="ap-icon-section-example ap-icon-gallery">
					{GALLERY.map((group) => (
						<div key={group.group} className="ap-icon-gallery-group">
							<div className="ap-icon-gallery-group-title" data-theme="storybook_ds" data-viewport="desktop">
								{group.group}
							</div>
							<div className="ap-icon-gallery-grid">
								{group.icons.map(({ Component, name, solid }) => (
									<div className="ap-icon-gallery-cell" key={name} title={name}>
										<Icon icon={Component} size="medium" />
										<span className="ap-icon-gallery-cell-name">
											{name}
											{solid && <em className="ap-icon-gallery-cell-solid"> (solid)</em>}
										</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</Section>
		</div>
	);
}
