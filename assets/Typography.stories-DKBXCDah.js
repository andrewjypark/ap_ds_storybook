import{R as e}from"./iframe-DHsBNxy7.js";import{T as B,F as O,a as H,b as I,L as M}from"./Tier1CompositeStyles-PdGe0Rz9.js";import{P as W,m as V}from"./CompositeStyleGroup-BVkx29VV.js";import{u as A}from"./useLiveCssValue-CUDy_hzz.js";import"./preload-helper-Dp1pzeXC.js";const D=["ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz","0123456789"],P="--ap-font-families-font1",R="16px";function N({label:t,cssVar:c}){const[C,x]=A(c);return e.createElement("div",{className:"ap-type-token-swatch",ref:C},e.createElement("div",{className:"ap-token-key","data-theme":"storybook_ds","data-viewport":"desktop"},t),e.createElement("div",{className:"ap-token-value","data-theme":"storybook_ds","data-viewport":"desktop"},x||"…"),e.createElement("div",{className:"ap-type-token-var","data-theme":"storybook_ds","data-viewport":"desktop"},c),e.createElement("div",{className:"ap-type-token-sample",style:{fontFamily:`var(${P}), sans-serif`,fontSize:R,letterSpacing:`var(${c})`}},D.map(l=>e.createElement("div",{key:l},l))))}N.__docgenInfo={description:`One Letter Spacing card, styled to match Foundations/Border's cards
(BorderToken.jsx / Border.css): bold key on top, live-computed value
below it, CSS var name below that -- stacked, not paired side by side.
The key/value rows use the shared .ap-token-key/.ap-token-value
classes (Typography.css) -- a generalized copy of Border's own
.ap-border-token-key/-value, kept out of Border.css so this component
doesn't have to import Border's stylesheet for a border-named class.
The var name keeps the existing .ap-type-token-var class, unchanged.
Below all three: an alphabet-triplet sample at a fixed font/size with
that letter-spacing applied -- unchanged in placement/class from
before.`,methods:[],displayName:"LetterSpacingCard"};function z(){return e.createElement(e.Fragment,null,e.createElement(W,null,"Letter Spacing"),e.createElement("div",{className:"ap-type-token-group"},V.letterSpacing.map(t=>e.createElement(N,{key:t.cssVar,label:t.key,cssVar:t.cssVar}))))}z.__docgenInfo={description:`Letter Spacing page -- a single flat list, NOT grouped by font the way
FontSizeScale/LineHeightScale are. Two reasons: the underlying token
(tier_1_core.letterSpacing) is itself flat and shared across every
font/heading level already (see tokens.json), so per-font grouping
would be showing a distinction that doesn't exist in the data; and
ap_ds_storybook's own letter-spacing page -- the reference this was
modeled on -- is deliberately flat too, demonstrated on one
representative font/size rather than three.`,methods:[],displayName:"LetterSpacingScale"};const q={title:"Tier 1: Global Tokens/Tier 1 - Core/Typography",parameters:{docs:{description:{component:"Font Size and Line Height are responsive: their values change per breakpoint. Each of those two pages has its own Mobile / Tablet / Desktop toggle to preview them for this theme. Letter Spacing, Font Weight, and Font Family are not affected by viewport at all. Composite Styles bundles font family, weight, size, and line height into one `font` shorthand per style -- pick a font and a weight to browse every heading and body style that Tier 2's composite styles are chosen from."}}}},a={render:()=>e.createElement(H,null)},r={render:()=>e.createElement(M,null)},o={render:()=>e.createElement(z,null)},n={render:()=>e.createElement(I,null)},s={render:()=>e.createElement(O,null)},i={render:()=>e.createElement(B,null)},J=["FontSize","LineHeight","LetterSpacing","FontWeight","FontFamily","CompositeStyles"];var p,d,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <FontSizeScale />
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var h,g,y;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <LineHeightScale />
}`,...(y=(g=r.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var u,S,f;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <LetterSpacingScale />
}`,...(f=(S=o.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var k,v,F;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <FontWeightScale />
}`,...(F=(v=n.parameters)==null?void 0:v.docs)==null?void 0:F.source}}};var b,w,E;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <FontFamilyScale />
}`,...(E=(w=s.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};var L,T,_;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <Tier1CompositeStyles />
}`,...(_=(T=i.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};export{i as CompositeStyles,s as FontFamily,a as FontSize,n as FontWeight,o as LetterSpacing,r as LineHeight,J as __namedExportsOrder,q as default};
