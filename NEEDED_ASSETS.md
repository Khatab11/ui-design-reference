# 📦 Linear Tasks: Course Reference Diagrams & Visual Assets

> **Linear Epic:** UI Design Reference — Production Diagrams & Assets  
> **Status:** Ready for Design  
> **Total Deliverables:** 27 Vector Diagrams / PNGs  
> **Canvas Spec:** `1600 × 900 px` (16:9), Export `@2x` PNG  
> **Color System:** Warm neutrals (`#1C1917`, `#78716C`, `#D6D3D1`, `#FAFAF9`) + Accent (`#B45309`)  
> **Font:** `Inter` (Title: 24px Medium | Annotations: 18px Regular)  

---

## 🎨 Global Design System Prompt (Copy into Figma / Claude Design)

```text
You are creating explanatory diagrams for a UI design course reference site.
Every image in this set must share one visual language:

- 1600 × 900 px canvas (16:9), transparent or #FAFAF9 background.
- Flat vector aesthetic. No 3D, no photorealism, no drop shadows (unless the topic is literally about shadows).
- Palette: neutral warm greys (#1C1917, #78716C, #D6D3D1, #F5F5F4) + ONE accent color used sparingly for focus (#B45309).
- Typeface: Inter. Labels 24px medium, annotations 18px regular, sentence case.
- Annotation guide lines: 1px straight or right-angled, never curved.
- Generous breathing room: minimum 64px canvas margin.
- High legibility down to 400px mobile viewport widths.
```

---

## 📋 Quick Linear Checklist (Batch Copy & Paste)

```markdown
### 📐 Chapter 02: Grid & Layout
- [ ] `grid-anatomy.png` → `public/assets/grid-layout/grid-anatomy.png` (12-column grid anatomy with leader lines)
- [ ] `fluid-grid.png` → `public/assets/grid-layout/fluid-grid.png` (Wide vs narrow comparison: fixed margins, flex columns)
- [ ] `fixed-vs-fluid-form.png` → `public/assets/grid-layout/fixed-vs-fluid-form.png` (Fixed comfortable column vs stretched edge-to-edge inputs)
- [ ] `column-grid-math.png` → `public/assets/grid-layout/column-grid-math.png` (1440pt frame, 160pt margins, 12×75pt columns, 20pt gutters + formula)
- [ ] `8pt-spacing.png` → `public/assets/grid-layout/8pt-spacing.png` (Card component annotated with 16pt padding, 16pt spacing, 88pt height)
- [ ] `spacing-scale.png` → `public/assets/grid-layout/spacing-scale.png` (Stacked bars: Desktop Base 8 vs Mobile Base 4 proportional scales)
- [ ] `mobile-margins.png` → `public/assets/grid-layout/mobile-margins.png` (Two mobile frames showing 20pt vs 24pt margin safe space)

### 🔤 Chapter 03: Typography
- [ ] `type-anatomy.png` → `public/assets/typography/type-anatomy.png` ("Typography" text with Cap height, x-height, Baseline, Descender guides)
- [ ] `typeface-categories.png` → `public/assets/typography/typeface-categories.png` (Sans Serif, Serif, Script comparison with warning on Script)
- [ ] `typeface-selection.png` → `public/assets/typography/typeface-selection.png` (Readable: display vs Inter | Scalable: clean sans vs decorative at 8pt)
- [ ] `ratio-scale-gaps.png` → `public/assets/typography/ratio-scale-gaps.png` (Stack 6pt to 42pt showing the empty gap between 16pt and 26pt)
- [ ] `manual-type-scale.png` → `public/assets/typography/manual-type-scale.png` (10, 12, 14, 16, 18, 20, 24, 28, 32 with +2pt and +4pt brackets)
- [ ] `line-height.png` → `public/assets/typography/line-height.png` (Three comparisons: body line height, header line height, character length)
- [ ] `rags.png` → `public/assets/typography/rags.png` (Three paragraphs: large ragged edge, even edge, centered rags on both sides)
- [ ] `baseline-alignment.png` → `public/assets/typography/baseline-alignment.png` (Heading + link: Center-aligned mismatch vs Baseline-aligned)
- [ ] `pairing.png` → `public/assets/typography/pairing.png` (Weight contrast: Medium vs Bold | Typeface contrast: similar sans vs sans+serif)

### 🎨 Chapters 04 to 21: Components & Workflow
- [ ] `color-wheel-schemes.png` → `public/assets/colors/color-wheel-schemes.png` (Monochromatic, Complementary, and Analogous color schemes)
- [ ] `gradient-types.png` → `public/assets/gradients/gradient-types.png` (4 cards: Linear, Radial, Angular, and Mesh gradients)
- [ ] `button-styles.png` → `public/assets/buttons/button-styles.png` (Row showing Filled, Outlined, Ghost, and Icon button styles)
- [ ] `form-controls.png` → `public/assets/forms/form-controls.png` (Comparison: text field, open/closed dropdown, radio buttons, checkboxes)
- [ ] `icon-styles.png` → `public/assets/icons/icon-styles.png` (Matrix of 4 icons in Line, Filled, and Duotone styles)
- [ ] `illustration-empty-state.png` → `public/assets/illustrations/illustration-empty-state.png` (Friendly empty inbox state card with button)
- [ ] `card-anatomy.png` → `public/assets/cards/card-anatomy.png` (Annotated card: media, badge, title, metadata pills, CTA)
- [ ] `unboxing-technique.png` → `public/assets/white-space/unboxing-technique.png` (Sneaker in boxed container vs free-floating silhouette)
- [ ] `tab-bar-anatomy.png` → `public/assets/navigation/tab-bar-anatomy.png` (Mobile bottom bar with 4 tabs, active highlight, safe area)
- [ ] `easing-curves.png` → `public/assets/microinteractions/easing-curves.png` (Velocity curves: Linear, Ease-In, Ease-Out, Spring)
- [ ] `wireframe-to-ui.png` → `public/assets/design-process/wireframe-to-ui.png` (Progression: napkin sketch → wireframe → final UI)
```

---

## 🎫 Detailed Linear Issues (Copy-Paste Individual Tickets)

### TICKET-01: Grid System Diagrams (7 Assets)
**Project:** UI Design Reference  
**Labels:** `Design`, `Assets`, `Grid`  
**Drop Directory:** `public/assets/grid-layout/`  

#### Deliverables:
1. **`grid-anatomy.png`** (16:9)
   * *Brief:* A desktop screen frame containing a 12-column grid with visible rows. Leader lines pointing to: one column, one row, gutter between two columns, left margin, and one module where a column and row intersect. Columns filled in a translucent accent tint (`#B45309`), gutters left empty.
2. **`fluid-grid.png`** (16:9)
   * *Brief:* Two screen frames side-by-side, one wide and one narrow. Both show the same grid overlay and a card labelled 'Hello'. The card is visibly wider in the wide frame and narrower in the narrow frame, but margins from screen edges are identical. Label: *"margins fixed, columns flex"*.
3. **`fixed-vs-fluid-form.png`** (16:9)
   * *Brief:* Two wide desktop frames with a login form (Heading, Username field 'tom_smith', Password field, 'Next step' button). Top/Left: Fixed grid with a comfortable, narrow centered column. Bottom/Right: Fluid grid with fields stretched edge-to-edge. Labels: *"Fixed"* and *"Fluid"*.
4. **`column-grid-math.png`** (16:9)
   * *Brief:* 1440pt screen frame labelled across top. Inside: two margin bands (160pt each), 12 columns (75pt each), 20pt gutters. Monospace formula below: `1440 − (11 × 20) − (2 × 160) = 900` and `900 ÷ 12 = 75`.
5. **`8pt-spacing.png`** (16:9)
   * *Brief:* Large card component (Heading 'Learn anything from home', body text, 'Get started' button). Dimension lines showing 16pt internal spacing, 16pt padding, and 88pt total card height.
6. **`spacing-scale.png`** (16:9)
   * *Brief:* Two stacked proportional scales: Desktop Base 8 (8, 16, 24, 32, 40, 48) and Mobile Base 4 (4, 8, 12, 16, 20, 24, 28, 32). Bar heights proportional to values.
7. **`mobile-margins.png`** (16:9)
   * *Brief:* Two mobile phone frames side-by-side with placeholder content. Left phone: shaded 20pt margin bands. Right phone: shaded 24pt margin bands. Label: *"safe space"*.

---

### TICKET-02: Typography System Diagrams (9 Assets)
**Project:** UI Design Reference  
**Labels:** `Design`, `Assets`, `Typography`  
**Drop Directory:** `public/assets/typography/`  

#### Deliverables:
1. **`type-anatomy.png`** (16:9)
   * *Brief:* The word *"Typography"* set large in clean sans-serif. Horizontal guidelines marking Cap height, x-height, Baseline, and Descender line. Ascender on 'h' and descenders on 'y' and 'p' marked with labels.
2. **`typeface-categories.png`** (16:9)
   * *Brief:* Three stacked rows: large specimen word on the left (*"Sans Serif"*, *"Serif"*, *"Script"*) with explanatory text on the right. Subtle warning tag on Script row: *"avoid as primary"*.
3. **`typeface-selection.png`** (16:9)
   * *Brief:* Two panels. Left (Readable): decorative display face vs clean Inter. Right (Scalable): clean sans at 8pt, 12pt, 24pt, 48pt vs illegible 8pt decorative text.
4. **`ratio-scale-gaps.png`** (16:9)
   * *Brief:* Vertical stack of sentence *"This text has a size of X"* at 6pt, 10pt, 16pt, 26pt, and 42pt. Bracket spanning the 16pt-to-26pt gap labelled *"no sizes available here"*.
5. **`manual-type-scale.png`** (16:9)
   * *Brief:* Proportional list of type sizes: 10, 12, 14, 16, 18, 20, 24, 28, 32. Brackets on left showing +2pt steps (10–20) and +4pt steps (20–32).
6. **`line-height.png`** (16:9)
   * *Brief:* Three comparisons: (1) 12pt paragraph with 15pt tight vs 20pt proportional line-height; (2) two-line header at 1.6 loose vs 1.3 correct ratio; (3) paragraphs with ~70 vs ~50 characters per line.
7. **`rags.png`** (16:9)
   * *Brief:* Three paragraph alignment boxes: (1) left-aligned with jagged rag line; (2) left-aligned with clean even boundary; (3) centered text showing jagged rags on both edges.
8. **`baseline-alignment.png`** (16:9)
   * *Brief:* Two rows of heading + link. Row 1: centre-aligned (showing mismatched baseline heights). Row 2: baseline-aligned (single shared baseline line running across both).
9. **`pairing.png`** (16:9)
   * *Brief:* Two panels. Panel 1 (Weights): Medium header + Regular body vs Bold header + Regular body. Panel 2 (Typefaces): two identical sans faces vs clean sans paired with serif.

---

### TICKET-03: Color & Gradient Visuals (2 Assets)
**Project:** UI Design Reference  
**Labels:** `Design`, `Assets`, `Color`  
**Drop Directories:** `public/assets/colors/`, `public/assets/gradients/`  

#### Deliverables:
1. **`public/assets/colors/color-wheel-schemes.png`** (16:9)
   * *Brief:* Color wheel diagram showcasing three distinct palettes side-by-side: Monochromatic ramp on the left, Complementary opposite hues in the center, and Analogous adjacent colors on the right.
2. **`public/assets/gradients/gradient-types.png`** (16:9)
   * *Brief:* Four rounded cards presenting gradient styles: Linear (top-left), Radial (top-right), Angular (bottom-left), and Mesh (bottom-right), cleanly labeled.

---

### TICKET-04: UI Component Specs: Buttons, Forms, Icons, Cards (4 Assets)
**Project:** UI Design Reference  
**Labels:** `Design`, `Assets`, `Components`  

#### Deliverables:
1. **`public/assets/buttons/button-styles.png`** (16:9)
   * *Brief:* Clean horizontal row showing: solid Filled Primary button, Outlined Secondary button, subtle Ghost Tertiary button, and a circular Icon button.
2. **`public/assets/forms/form-controls.png`** (16:9)
   * *Brief:* Comparison of foundational form elements: text input field, open vs closed dropdown, radio button group, and multi-select checkbox group.
3. **`public/assets/icons/icon-styles.png`** (16:9)
   * *Brief:* Matrix displaying 4 universal icons (Home, Search, Bell, Settings) rendered in Line style, Filled style, and Duotone style.
4. **`public/assets/cards/card-anatomy.png`** (16:9)
   * *Brief:* Card component breakdown: media header container, category badge, title, concise description, metadata pills, and primary action button.

---

### TICKET-05: Layout, Motion & Process Concepts (5 Assets)
**Project:** UI Design Reference  
**Labels:** `Design`, `Assets`, `UX`  

#### Deliverables:
1. **`public/assets/illustrations/illustration-empty-state.png`** (16:9)
   * *Brief:* Empty state card: friendly minimalist vector character peering into an empty box with a gentle smile, supportive headline, helper text, and a primary action button.
2. **`public/assets/white-space/unboxing-technique.png`** (16:9)
   * *Brief:* Before/after comparison: a product (e.g. sneaker) trapped inside an enclosed outlined container on the left, compared to the same sneaker floating freely on clean negative space with soft drop shadow on the right.
3. **`public/assets/navigation/tab-bar-anatomy.png`** (16:9)
   * *Brief:* Mobile bottom navigation bar frame with 4 tabs, highlighted active tab, inactive tabs at ~35% opacity, and safe area margin above the home indicator.
4. **`public/assets/microinteractions/easing-curves.png`** (16:9)
   * *Brief:* Graph comparing 4 velocity curves: flat Linear slope, upward curving Ease-In, cushioned Ease-Out curve, and organic Spring inertia curve.
5. **`public/assets/design-process/wireframe-to-ui.png`** (16:9)
   * *Brief:* Three progression steps side-by-side: rough hand-drawn napkin sketch on the left, clean greyscale wireframe in the center, and polished high-fidelity UI on the right.
