import{R as e}from"./iframe-ZXh55nCV.js";import"./preload-helper-Dp1pzeXC.js";function t({title:n,children:a}){return e.createElement("section",{className:"ap-intro-section"},e.createElement("h3",{className:"ap-intro-section-title"},n),e.createElement("div",{className:"ap-intro-section-body"},a))}function o({term:n,children:a}){return e.createElement("div",{className:"ap-intro-find-row"},e.createElement("div",{className:"ap-intro-find-term"},n),e.createElement("div",{className:"ap-intro-find-desc"},a))}function c(){return e.createElement("div",{className:"ap-intro","data-theme":"storybook_ds","data-viewport":"desktop"},e.createElement("h3",{className:"ap-section__title"},"AP Design System"),e.createElement("p",{className:"ap-intro-lede"},"Welcome to the boilerplate for AP Design System! This storybook documents this project's design tokens and the components built on top of them — from raw values in Figma down to what actually ships in code. If you're new, this is a good page to start."),e.createElement(t,{title:"How this storybook is organized"},e.createElement("p",null,"Everything here follows a three-tier model, and the sidebar mirrors it exactly:"),e.createElement("ul",null,e.createElement("li",null,e.createElement("strong",null,"Tier 1: Global Tokens")," — the raw values: color, typography, and border scales. Each theme — Core, Basil, Molasses — has its own complete set."),e.createElement("li",null,e.createElement("strong",null,"Tier 2: Semantic Tokens")," — Tier 1 values given a purpose: content color, background, border, and composite type styles like Title or Body. Components should reference this layer, not Tier 1 directly."),e.createElement("li",null,e.createElement("strong",null,"Tier 3: Components")," — real, usable components (Button, Checkbox, Dropdown, Icon, Modal, Segment Group, Table, Text Input, Tooltip), each with a Variations page covering its states and options.")),e.createElement("p",{className:"ap-intro-note"},"Font Size and Line Height have their own Desktop / Tablet / Mobile toggle on the page itself, since viewport only ever affects those two token types.")),e.createElement(t,{title:"Core vs. theme folders"},e.createElement("p",null,"Tiers 1 and 2 share the same folder layout. ",e.createElement("strong",null,"Core")," holds the complete base set; each theme (Basil, Molasses) sits under ",e.createElement("strong",null,"Themes")," with its own pages. An abridged example:"),e.createElement("pre",{className:"ap-intro-tree"},`Tier 1: Global Tokens
├── Tier 1 - Core
│   ├── Color - Default
│   ├── Color - Dark
│   ├── Typography
│   └── Border
└── Themes
    ├── Tier 1 - Basil_Theme
    │   ├── Color - Default
    │   ├── Color - Dark
    │   └── Typography
    └── Tier 1 - Molasses_Theme
        └── …

Tier 2: Semantic Tokens
├── Tier 2 - Core
│   ├── Color - Default
│   ├── Color - Dark
│   └── Typography
└── Themes
    ├── Tier 2 - Basil_Theme
    │   └── …
    └── Tier 2 - Molasses_Theme
        └── …`)),e.createElement(t,{title:"Where to find things"},e.createElement(o,{term:"A raw token value"},"Tier 1: Global Tokens, under the relevant theme."),e.createElement(o,{term:"How a token is used in context"},"Tier 2: Semantic Tokens."),e.createElement(o,{term:"A component"},"Tier 3: Components, in the sidebar."),e.createElement(o,{term:"The CSS variable behind something on screen"},"Every swatch and component example has a small readout underneath it — label, variable name, and live value.")),e.createElement(t,{title:"Resources"},e.createElement("p",null,"These resources can give you more context on how this design system was built."),e.createElement("ul",null,e.createElement("li",null,e.createElement("a",{href:"https://medium.com/@andrewjypark",target:"_blank",rel:"noreferrer"},"My Blog")),e.createElement("li",null,e.createElement("a",{href:"https://www.figma.com/design/Shl6BS7R7y9HqvjLAsPQlQ/AP-Design-System?node-id=64-91",target:"_blank",rel:"noreferrer"},"AP Design System Figma file")),e.createElement("li",null,e.createElement("a",{href:"https://www.andrewjypark.com/",target:"_blank",rel:"noreferrer"},"My Portfolio")))))}c.__docgenInfo={description:`The storybook's landing page. Title is deliberately a bare, single-segment
story title ("Getting Started", see GettingStarted.stories.jsx) -- per
.storybook/preview.jsx's own storySort comment, a bare title becomes a
root that Storybook always renders above every storySort-ordered group,
regardless of sort order -- so this lands above Tier 1/2/3 with no
storySort changes needed, and is the first story Storybook auto-selects
when the site loads with no path.

All docs text is pinned to the internal-only storybook_ds theme on the
root wrapper (inherited by every child below, no need to repeat it) --
same convention every other page's headings/docs-copy already uses
(PageTitle.jsx, Icon's ap-icon-section-copy, Color's ColorScaleSection),
since there's no token-driven "live specimen" content here that needs to
track the ambient Core/Basil/Molasses theme.`,methods:[],displayName:"Intro"};const h={title:"Getting Started",tags:["!autodocs"],parameters:{docs:{description:{component:`Bare, single-segment title ("Getting Started", no "/") -- deliberately
NOT nested under a longer path. Per .storybook/preview.jsx's own
storySort comment (see the "Tier 3: Components" note there), a bare
title becomes a root that Storybook always renders above every
storySort-ordered group, regardless of sort order -- so this needs no
storySort entry to land above Tier 1/2/3, and it's the first story
Storybook auto-selects when the site loads with no path, which is the
whole point of a landing page. tags: ["!autodocs"] cancels the
project-wide autodocs tag (set in preview.jsx) so there's no separate
auto-generated "Docs" entry alongside this one page -- same reasoning
Tier 3 components use.`}}}},r={render:()=>e.createElement(c,null)},p=["Overview"];var s,l,i;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <Intro />
}`,...(i=(l=r.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};export{r as Overview,p as __namedExportsOrder,h as default};
