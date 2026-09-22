import{R as e}from"./iframe-Bw0DDBwf.js";import"./preload-helper-Dp1pzeXC.js";function a({title:n,children:r}){return e.createElement("section",{className:"ap-intro-section"},e.createElement("h3",{className:"ap-intro-section-title"},n),e.createElement("div",{className:"ap-intro-section-body"},r))}function t({term:n,children:r}){return e.createElement("div",{className:"ap-intro-find-row"},e.createElement("div",{className:"ap-intro-find-term"},n),e.createElement("div",{className:"ap-intro-find-desc"},r))}function c(){return e.createElement("div",{className:"ap-intro","data-theme":"storybook_ds","data-viewport":"desktop"},e.createElement("h3",{className:"ap-section__title"},"Getting Started"),e.createElement("p",{className:"ap-intro-lede"},"This storybook documents this project's design tokens and the components built on top of them — from raw values in Figma down to what actually ships in code. Start here if you're new."),e.createElement(a,{title:"How this storybook is organized"},e.createElement("p",null,"Everything here follows a three-tier model, and the sidebar mirrors it exactly:"),e.createElement("ul",null,e.createElement("li",null,e.createElement("strong",null,"Tier 1: Global Tokens")," — the raw values: color, typography, and border scales. Each theme — Core, Green, Gold — has its own complete set."),e.createElement("li",null,e.createElement("strong",null,"Tier 2: Semantic Tokens")," — Tier 1 values given a purpose: content color, background, border, and composite type styles like Title or Body. Components should reference this layer, not Tier 1 directly."),e.createElement("li",null,e.createElement("strong",null,"Tier 3: Components")," — real, usable components (Button, Checkbox, Dropdown, Icon, Modal, Segment Group, Table, Text Input, Tooltip), each with a Variations page covering its states and options.")),e.createElement("p",{className:"ap-intro-note"},"Use the Theme control in the toolbar to preview Core, Green, or Gold anywhere in the storybook. Font Size and Line Height are the one exception — they have their own Desktop / Tablet / Mobile toggle on the page itself, since viewport only ever affects those two token types.")),e.createElement(a,{title:"Where to find things"},e.createElement(t,{term:"A raw token value"},"Tier 1: Global Tokens, under the relevant theme."),e.createElement(t,{term:"How a token is used in context"},"Tier 2: Semantic Tokens."),e.createElement(t,{term:"A component"},"Tier 3: Components, in the sidebar."),e.createElement(t,{term:"The CSS variable behind something on screen"},"Every swatch and component example has a small readout underneath it — label, variable name, and live value.")))}c.__docgenInfo={description:`The storybook's landing page. Title is deliberately a bare, single-segment
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
track the ambient Core/Green/Gold theme.`,methods:[],displayName:"Intro"};const h={title:"Getting Started",tags:["!autodocs"],parameters:{docs:{description:{component:`Bare, single-segment title ("Getting Started", no "/") -- deliberately
NOT nested under a longer path. Per .storybook/preview.jsx's own
storySort comment (see the "Tier 3: Components" note there), a bare
title becomes a root that Storybook always renders above every
storySort-ordered group, regardless of sort order -- so this needs no
storySort entry to land above Tier 1/2/3, and it's the first story
Storybook auto-selects when the site loads with no path, which is the
whole point of a landing page. tags: ["!autodocs"] cancels the
project-wide autodocs tag (set in preview.jsx) so there's no separate
auto-generated "Docs" entry alongside this one page -- same reasoning
Tier 3 components use.`}}}},o={render:()=>e.createElement(c,null)},p=["Overview"];var s,i,l;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <Intro />
}`,...(l=(i=o.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};export{o as Overview,p as __namedExportsOrder,h as default};
