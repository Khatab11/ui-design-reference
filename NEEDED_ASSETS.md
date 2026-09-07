# 📦 Linear Tasks: Course Reference Diagrams & Visual Assets

> **Linear Epic:** UI Design Reference — Production Diagrams & Visual Assets  
> **Status:** Ready for Design & Production  
> **Total Missing Deliverables:** 68 Assets (20 Chapters)  
> **Canvas Spec:** `1600 × 900 px` (16:9), Export `@2x` PNG (3200 × 1800 px)  
> **Color System:** Warm neutrals (`#1C1917`, `#44403C`, `#78716C`, `#D6D3D1`, `#FAFAF9`) + Primary Action (`#1F5AE0`) / Highlight (`#B45309`)  
> **Typography:** `Inter` (Headings: 24px Medium / SemiBold | Annotations & Dimensions: 16–18px Regular | Token/Math Code: JetBrains Mono 14px)  
> **Storage Path:** `public/assets/<chapter-id>/<filename>.png`

---

## 🎨 Global Design System Prompt (Copy into Figma / Claude Design / Midjourney)

```text
You are designing vector instructional diagrams and UI component breakdowns for the "UI Design Reference" course site.
Every image in this 68-asset library must strictly adhere to one cohesive, ultra-crisp design system:

1. Canvas & Frame:
   - 1600 × 900 px (16:9 aspect ratio).
   - Generous breathing margins (min 64px on desktop edges).
   - Background: #FAFAF9 (Light warm stone) or pure transparent where appropriate.

2. Visual Aesthetic:
   - Modern, clean vector aesthetic (Swiss design influenced by Stripe, Linear, Apple Developer guides).
   - Crisp 1px strokes (#D6D3D1 for containers, #1C1917 for active boundaries).
   - Subtle, realistic shadows only (0 4px 12px rgba(0,0,0,0.06)) — NO heavy muddy drop shadows.
   - For comparisons (Before vs After / Good vs Bad): Clearly badge 'Recommended' in emerald green and 'Avoid' in muted coral.

3. Palette:
   - Surface / Canvas: #FAFAF9, #FFFFFF
   - Borders & Guides: #E7E5E4, #D6D3D1
   - Text & Lines: #1C1917 (Primary), #78716C (Secondary/Muted)
   - Accent / Leader Callouts: #1F5AE0 (Electric Cobalt) or #B45309 (Amber)
   - Accents: #10B981 (Success/Pass), #EF4444 (Error/Fail)

4. Typography:
   - Typeface: Inter.
   - Hierarchy: Headings 24px SemiBold, Subheads 18px Medium, Annotations/Badges 14–16px Regular.
   - Code & Mathematical Formulas: Monospace (JetBrains Mono or SF Mono) 14px.
   - Leader lines: Sharp, clean 1px straight or right-angled orthogonal lines with small 4px circular endpoint anchors.
```

---

## 📋 Quick Linear Checklist (Batch Copy & Paste into Linear)

```markdown
### Chapter 02: Grid and Layout (`grid-layout`)
- [ ] `grid-anatomy.png` → `public/assets/grid-layout/grid-anatomy.png` (Grid anatomy)
- [ ] `fluid-grid.png` → `public/assets/grid-layout/fluid-grid.png` (Fluid grid)
- [ ] `fixed-vs-fluid-form.png` → `public/assets/grid-layout/fixed-vs-fluid-form.png` (Fixed grid)
- [ ] `column-grid-math.png` → `public/assets/grid-layout/column-grid-math.png` (How to build a column grid)
- [ ] `8pt-spacing.png` → `public/assets/grid-layout/8pt-spacing.png` (The 8pt grid)
- [ ] `spacing-scale.png` → `public/assets/grid-layout/spacing-scale.png` (Creating a soft grid)
- [ ] `mobile-margins.png` → `public/assets/grid-layout/mobile-margins.png` (Grids on mobile devices)

### Chapter 03: Typography (`typography`)
- [ ] `type-anatomy.png` → `public/assets/typography/type-anatomy.png` (The anatomy of type)
- [ ] `typeface-categories.png` → `public/assets/typography/typeface-categories.png` (Know your selection)
- [ ] `typeface-selection.png` → `public/assets/typography/typeface-selection.png` (Pick a readable, scalable typeface)
- [ ] `ratio-scale-gaps.png` → `public/assets/typography/ratio-scale-gaps.png` (Type scales: the problem with ratios)
- [ ] `manual-type-scale.png` → `public/assets/typography/manual-type-scale.png` (Build a type scale by hand)
- [ ] `line-height.png` → `public/assets/typography/line-height.png` (Line height)
- [ ] `rags.png` → `public/assets/typography/rags.png` (Avoid rags)
- [ ] `baseline-alignment.png` → `public/assets/typography/baseline-alignment.png` (Align different text sizes to the baseline)
- [ ] `pairing.png` → `public/assets/typography/pairing.png` (Pairing weights and typefaces)

### Chapter 04: Colors (`colors`)
- [ ] `wireframe-first.png` → `public/assets/colors/wireframe-first.png` (Start in Greyscale)
- [ ] `color-wheel-schemes.png` → `public/assets/colors/color-wheel-schemes.png` (Color Wheel Schemes)
- [ ] `palette-architecture.png` → `public/assets/colors/palette-architecture.png` (Building a Complete Palette in 8 Steps)
- [ ] `wcag-contrast-ratios.png` → `public/assets/colors/wcag-contrast-ratios.png` (Accessibility and Contrast (WCAG))

### Chapter 05: Gradients (`gradients`)
- [ ] `gradient-types.png` → `public/assets/gradients/gradient-types.png` (Types of Gradients)
- [ ] `smooth-vs-muddy-gradients.png` → `public/assets/gradients/smooth-vs-muddy-gradients.png` (Crafting Smooth, Natural Gradients)
- [ ] `gradient-restraint.png` → `public/assets/gradients/gradient-restraint.png` (Restraint & Cognitive Overload)

### Chapter 06: Shadows (`shadows`)
- [ ] `elevation-levels.png` → `public/assets/shadows/elevation-levels.png` (Why Shadows Matter: Elevation & Affordance)
- [ ] `shadow-values.png` → `public/assets/shadows/shadow-values.png` (Anatomy of a Shadow)
- [ ] `shadows-in-dark-mode.png` → `public/assets/shadows/shadows-in-dark-mode.png` (Shadows in Dark Mode)
- [ ] `avoid-inner-shadows.png` → `public/assets/shadows/avoid-inner-shadows.png` (Avoid Inner Shadows)

### Chapter 07: Buttons (`buttons`)
- [ ] `button-styles.png` → `public/assets/buttons/button-styles.png` (Buttons Classified by Visual Style)
- [ ] `touch-targets.png` → `public/assets/buttons/touch-targets.png` (Touch Targets & Mobile Usability)
- [ ] `button-states.png` → `public/assets/buttons/button-states.png` (The Four Interactive Button States)
- [ ] `button-pairing-and-rtl.png` → `public/assets/buttons/button-pairing-and-rtl.png` (Button Pair Ordering & RTL Nuances)

### Chapter 08: Forms (`forms`)
- [ ] `form-controls.png` → `public/assets/forms/form-controls.png` (Core Form Elements & Selection Controls)
- [ ] `field-label-placement.png` → `public/assets/forms/field-label-placement.png` (Principles of Great Field Design)
- [ ] `single-column-flow.png` → `public/assets/forms/single-column-flow.png` (Single-Column Flow & Progressive Disclosure)
- [ ] `form-validation-states.png` → `public/assets/forms/form-validation-states.png` (Real-Time Validation & Input States)

### Chapter 09: Icons (`icons`)
- [ ] `clarifying-vs-interactive-icons.png` → `public/assets/icons/clarifying-vs-interactive-icons.png` (Clarifying vs. Interactive Icons)
- [ ] `icon-styles.png` → `public/assets/icons/icon-styles.png` (Icon Styles & Visual Cohesion)
- [ ] `icon-bounding-box.png` → `public/assets/icons/icon-bounding-box.png` (Uniform Bounding Boxes & Stroke Weights)
- [ ] `icon-labels-and-clarity.png` → `public/assets/icons/icon-labels-and-clarity.png` (Pairing Icons with Text Labels)

### Chapter 10: Photos (`photos`)
- [ ] `photo-text-overlays.png` → `public/assets/photos/photo-text-overlays.png` (Overlays & Text Readability)
- [ ] `directional-gaze.png` → `public/assets/photos/directional-gaze.png` (Single Focal Point & Directional Gaze)
- [ ] `responsive-aspect-ratios.png` → `public/assets/photos/responsive-aspect-ratios.png` (Storytelling & Responsive Aspect Ratios)

### Chapter 11: Illustrations (`illustrations`)
- [ ] `illustration-empty-state.png` → `public/assets/illustrations/illustration-empty-state.png` (Where Illustrations Excel)
- [ ] `where-to-avoid-illustrations.png` → `public/assets/illustrations/where-to-avoid-illustrations.png` (Where to Avoid Illustrations)
- [ ] `illustration-style-consistency.png` → `public/assets/illustrations/illustration-style-consistency.png` (Scale, 3D, and Style Consistency)

### Chapter 12: Cards (`cards`)
- [ ] `card-content-prioritization.png` → `public/assets/cards/card-content-prioritization.png` (Content Prioritization: Less is More)
- [ ] `card-anatomy.png` → `public/assets/cards/card-anatomy.png` (Anatomy of a Card)
- [ ] `card-click-affordance.png` → `public/assets/cards/card-click-affordance.png` (Click Affordance & Elevation Styles)

### Chapter 13: White Space (`white-space`)
- [ ] `active-negative-space.png` → `public/assets/white-space/active-negative-space.png` (The Active Power of Negative Space)
- [ ] `start-wide-tighten.png` → `public/assets/white-space/start-wide-tighten.png` (Start Wide and Tighten Progressively)
- [ ] `unboxing-technique.png` → `public/assets/white-space/unboxing-technique.png` (The Unboxing Technique & Screen Margins)

### Chapter 14: Personality (`personality`)
- [ ] `three-personality-archetypes.png` → `public/assets/personality/three-personality-archetypes.png` (Three Core Personality Archetypes)
- [ ] `visual-consistency-cheatsheet.png` → `public/assets/personality/visual-consistency-cheatsheet.png` (The Consistency Rule & Visual Cheatsheet)

### Chapter 15: Language & Copy (`language`)
- [ ] `button-copy-specificity.png` → `public/assets/language/button-copy-specificity.png` (Button Copy: Specificity Over Ambiguity)
- [ ] `destructive-modal-dialog.png` → `public/assets/language/destructive-modal-dialog.png` (Destructive Dialogs: Eliminate Double Negatives)
- [ ] `conversational-error-states.png` → `public/assets/language/conversational-error-states.png` (Speak Like a Human & Suggest Solutions)

### Chapter 16: Navigation (`navigation`)
- [ ] `three-navigation-paradigms.png` → `public/assets/navigation/three-navigation-paradigms.png` (The Three Navigation Paradigms)
- [ ] `tab-bar-anatomy.png` → `public/assets/navigation/tab-bar-anatomy.png` (Mobile Tab Bar Architecture)
- [ ] `rtl-navigation-flipping.png` → `public/assets/navigation/rtl-navigation-flipping.png` (RTL Navigation & Arabic Alignment)

### Chapter 17: Microinteractions (`microinteractions`)
- [ ] `microinteraction-feedback.png` → `public/assets/microinteractions/microinteraction-feedback.png` (Instant Tactile Feedback)
- [ ] `easing-curves.png` → `public/assets/microinteractions/easing-curves.png` (Easing Curves: Linear vs. Natural Acceleration)
- [ ] `dribbble-vs-production-motion.png` → `public/assets/microinteractions/dribbble-vs-production-motion.png` (Avoiding the Dribbble Animation Trap)

### Chapter 18: What's Next? (`whats-next`)
- [ ] `assembled-primitives.png` → `public/assets/whats-next/assembled-primitives.png` (UI Design as Assembled Primitives)

### Chapter 19: My UI Design Process (`design-process`)
- [ ] `paper-sketching-ideation.png` → `public/assets/design-process/paper-sketching-ideation.png` (Step 2: Rapid Ugly Paper Sketches)
- [ ] `wireframe-to-ui.png` → `public/assets/design-process/wireframe-to-ui.png` (Step 3: Structural Wireframing)
- [ ] `design-system-handover.png` → `public/assets/design-process/design-system-handover.png` (Step 5 & 6: Assembly & The Art of Client Presentation)

### Chapter 20: Attracting Clients (`attracting-clients`)
- [ ] `portfolio-case-study-anatomy.png` → `public/assets/attracting-clients/portfolio-case-study-anatomy.png` (Designing for Your Desired Client Tier)

### Chapter 21: Ending & Looking Forward (`ending`)
- [ ] `theory-into-daily-craft.png` → `public/assets/ending/theory-into-daily-craft.png` (Theory vs. Daily Craft)

```

---

## 🎫 Detailed Linear Tickets (Ready to Copy into Linear Issues)

### TICKET-01: Chapter 02 — Grid and Layout (7 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/grid-layout/`  
**Chapter Scope:** Chapter 2 — *Grid and Layout (الجريد والتخطيط)*  

#### Deliverables & Visual Specs:

1. **`grid-anatomy.png`** (16:9)
   - **Target Section:** Grid anatomy (تشريح الجريد)
   - **Target File Path:** `public/assets/grid-layout/grid-anatomy.png`
   - **Alt Text (EN):** A grid diagram labelling columns, rows, gutters, margins and modules
   - **Alt Text (AR):** رسم للجريد معلّم عليه الأعمدة والصفوف والفواصل والهوامش والوحدات
   - **Production Brief:**
     > A desktop screen frame containing a 12-column grid with visible rows. Label with leader lines: one column, one row, a gutter between two columns, the left margin, and one module where a column and row intersect. Columns filled in a translucent accent tint, gutters left empty.

2. **`fluid-grid.png`** (16:9)
   - **Target Section:** Fluid grid (الجريد المرن (Fluid))
   - **Target File Path:** `public/assets/grid-layout/fluid-grid.png`
   - **Alt Text (EN):** The same content on a fluid grid at two screen widths
   - **Alt Text (AR):** نفس المحتوى على جريد مرن بعرضين شاشة مختلفين
   - **Production Brief:**
     > Two screen frames side by side, one wide and one narrow. Both show the same grid overlay and a card labelled 'Hello'. The card is visibly wider in the wide frame and narrower in the narrow frame, but the margin from each screen edge is dimensioned and identical in both. Annotate 'margins fixed, columns flex'.

3. **`fixed-vs-fluid-form.png`** (16:9)
   - **Target Section:** Fixed grid (الجريد الثابت (Fixed))
   - **Target File Path:** `public/assets/grid-layout/fixed-vs-fluid-form.png`
   - **Alt Text (EN):** A login form on a fixed grid versus a fluid grid at desktop width
   - **Alt Text (AR):** فورم تسجيل دخول على جريد ثابت مقابل جريد مرن بعرض ديسك توب
   - **Production Brief:**
     > Two wide desktop frames stacked or side by side, both containing the same login form: heading 'Log in', a Username field with 'tom_smith', a Password field with dots, and a 'Next step' button. Top/left version on a fixed grid — the form is a comfortable narrow column, centred, with large empty margins. Bottom/right version on a fluid grid — the same form stretched edge to edge, fields absurdly wide. Label 'Fixed' and 'Fluid'.

4. **`column-grid-math.png`** (16:9)
   - **Target Section:** How to build a column grid (إزاي تبني column grid)
   - **Target File Path:** `public/assets/grid-layout/column-grid-math.png`
   - **Alt Text (EN):** A 1440pt screen broken down into margins, gutters and 12 columns
   - **Alt Text (AR):** شاشة 1440pt مقسومة لهوامش وفواصل و12 عمود
   - **Production Brief:**
     > A wide screen frame labelled 1440 pt across the top with a dimension line. Inside: two margin bands labelled 160 pt each, 12 columns labelled 75 pt, and gutters labelled 20 pt. Below the diagram, print the equation as two lines of monospace text: '1440 − (11 × 20) − (2 × 160) = 900' and '900 ÷ 12 = 75'. Margins in a light grey tint, columns in the accent tint.

5. **`8pt-spacing.png`** (16:9)
   - **Target Section:** The 8pt grid (جريد الـ 8pt)
   - **Target File Path:** `public/assets/grid-layout/8pt-spacing.png`
   - **Alt Text (EN):** A card with its internal padding annotated in 8pt multiples
   - **Alt Text (AR):** كارد معلّم عليه الـ padding الداخلي بمضاعفات الـ 8pt
   - **Production Brief:**
     > A single card component, drawn large: heading 'Learn anything from home', a line of body text, and a 'Get started' button. Annotate the internal spacing with dimension lines reading 16 pt between elements and 16 pt padding, and the card's total height as 88 pt. Thin accent-coloured dimension lines, values in small labels.

6. **`spacing-scale.png`** (16:9)
   - **Target Section:** Creating a soft grid (إنشاء soft grid)
   - **Target File Path:** `public/assets/grid-layout/spacing-scale.png`
   - **Alt Text (EN):** A visual spacing scale from 4pt to 48pt
   - **Alt Text (AR):** سلّم مسافات مرئي من 4pt لـ 48pt
   - **Production Brief:**
     > A row of vertical bars of increasing height, each labelled with its value. Show two scales stacked: the 8pt scale (8, 16, 24, 32, 40, 48) labelled 'Desktop — base 8' and the 4pt scale (4, 8, 12, 16, 20, 24, 28, 32) labelled 'Mobile — base 4'. Bars in the accent colour, values in small labels underneath. Bar heights must be proportional to their actual values.

7. **`mobile-margins.png`** (16:9)
   - **Target Section:** Grids on mobile devices (الجريد على الموبايل)
   - **Target File Path:** `public/assets/grid-layout/mobile-margins.png`
   - **Alt Text (EN):** Two phone screens showing 20pt and 24pt margins as safe space
   - **Alt Text (AR):** شاشتين موبايل بيوضّحوا هوامش 20pt و 24pt كمساحة آمنة
   - **Production Brief:**
     > Two phone frames side by side with placeholder content inside (a heading, a card, a button). On each, shade the left and right margin bands in a translucent accent tint and dimension them: 'Margins: 20pt' on the left phone, 'Margins: 24pt' on the right. Label the shaded bands 'safe space'.

---

### TICKET-02: Chapter 03 — Typography (9 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/typography/`  
**Chapter Scope:** Chapter 3 — *Typography (التايبوجرافي)*  

#### Deliverables & Visual Specs:

1. **`type-anatomy.png`** (16:9)
   - **Target Section:** The anatomy of type (تشريح الحرف)
   - **Target File Path:** `public/assets/typography/type-anatomy.png`
   - **Alt Text (EN):** The word Typography annotated with baseline, cap height, x-height, ascender and descender
   - **Alt Text (AR):** كلمة Typography معلّم عليها الـ baseline و cap height و x-height و ascender و descender
   - **Production Brief:**
     > The word 'Typography' set very large in a clean sans-serif, with horizontal guide lines drawn across it marking Cap height, x-height, Baseline and the descender line. Leader lines from each guide to a label on the right. Also mark the ascender on the 'h' and the descender on the 'y' and 'p' with short labels. Guides in the accent colour, letterform in near-black.

2. **`typeface-categories.png`** (16:9)
   - **Target Section:** Know your selection (اعرف اختياراتك)
   - **Target File Path:** `public/assets/typography/typeface-categories.png`
   - **Alt Text (EN):** Sans Serif, Serif and Script samples compared
   - **Alt Text (AR):** عينات Sans Serif و Serif و Script للمقارنة
   - **Production Brief:**
     > Three stacked rows. Each row: a large specimen word on the left ('Sans Serif', 'Serif', 'Script' set in a typeface of that category) and two lines of small explanatory text on the right. Mark the Script row with a subtle warning treatment — a muted red dot or strikethrough accent — to signal 'avoid as primary'.

3. **`typeface-selection.png`** (16:9)
   - **Target Section:** Pick a readable, scalable typeface (اختار خط مقروء وقابل للتحجيم)
   - **Target File Path:** `public/assets/typography/typeface-selection.png`
   - **Alt Text (EN):** Decorative versus simple typeface, and small-size legibility test
   - **Alt Text (AR):** خط مزخرف مقابل خط بسيط، واختبار وضوح في الأحجام الصغيرة
   - **Production Brief:**
     > Two panels. Left panel 'Readable': the phrase 'Paprika is too fancy and hard to read' set in a decorative display face, above 'Inter is simple and easy to read' set in Inter. Right panel 'Scalable': the phrase 'This is readable' repeated four times at 8pt, 12pt, 24pt and 48pt in a clean sans, then the same phrase at 8pt in an over-decorated face labelled 'This is hard to read'.

4. **`ratio-scale-gaps.png`** (16:9)
   - **Target Section:** Type scales: the problem with ratios (سلالم الخطوط: مشكلة النِسَب)
   - **Target File Path:** `public/assets/typography/ratio-scale-gaps.png`
   - **Alt Text (EN):** A golden-ratio type scale showing large gaps between sizes
   - **Alt Text (AR):** سلّم خطوط بالنسبة الذهبية بيوضّح الفجوات الكبيرة بين الأحجام
   - **Production Brief:**
     > A vertical stack of the sentence 'This text has a size of X' set at 6pt, 10pt, 16pt, 26pt and 42pt, each labelled. To the right of the stack, a bracket spanning the 16pt-to-26pt gap labelled 'no sizes available here' in the accent colour. The visual point is the emptiness between steps.

5. **`manual-type-scale.png`** (16:9)
   - **Target Section:** Build a type scale by hand (ابني type scale بإيدك)
   - **Target File Path:** `public/assets/typography/manual-type-scale.png`
   - **Alt Text (EN):** A hand-built type scale from 10pt to 32pt
   - **Alt Text (AR):** type scale مبني بالإيد من 10pt لـ 32pt
   - **Production Brief:**
     > A vertical list of the sentence 'This text has a size of Xpt' rendered at each of these sizes in order: 10, 12, 14, 16, 18, 20, 24, 28, 32. Sizes must be accurate relative to each other. To the left, a thin bracket marking 10–20 labelled '+2pt steps' and a second bracket marking 20–32 labelled '+4pt steps', both in the accent colour.

6. **`line-height.png`** (16:9)
   - **Target Section:** Line height (ارتفاع السطر (Line height))
   - **Target File Path:** `public/assets/typography/line-height.png`
   - **Alt Text (EN):** Line height comparison for body text and headers, plus line length
   - **Alt Text (AR):** مقارنة ارتفاع السطر لنص المتن والعناوين، وطول السطر
   - **Production Brief:**
     > Three labelled comparisons. (1) The same 12pt paragraph twice: left with 15pt line height labelled 'too tight', right with 20pt labelled '12 × 1.6 = 20'. (2) The same two-line header twice: left at ratio 1.6 labelled 'too loose', right at 1.3 labelled 'correct'. (3) Two paragraphs: one at ~70 characters per line, one at ~50, labelled with their character counts. Render the line heights accurately — the comparison is the lesson.

7. **`rags.png`** (16:9)
   - **Target Section:** Avoid rags (تجنّب الـ Rags)
   - **Target File Path:** `public/assets/typography/rags.png`
   - **Alt Text (EN):** A paragraph with a large rag versus an even one, and a centered example
   - **Alt Text (AR):** فقرة برَاج كبير مقابل فقرة متساوية، ومثال موسّط
   - **Production Brief:**
     > Three paragraphs of the same text. (1) Left-aligned with a very uneven right edge — draw a jagged accent-coloured line tracing the ragged edge. (2) Left-aligned in a narrower box so lines end evenly — trace a much straighter line. (3) Centered — trace jagged lines down BOTH edges. Label them 'Large rag', 'Even', 'Rags on both sides'.

8. **`baseline-alignment.png`** (16:9)
   - **Target Section:** Align different text sizes to the baseline (حاذي أحجام النص المختلفة على الـ baseline)
   - **Target File Path:** `public/assets/typography/baseline-alignment.png`
   - **Alt Text (EN):** Two text sizes aligned by centre versus aligned by baseline
   - **Alt Text (AR):** حجمين نص محاذيين بالمنتصف مقابل محاذيين بالـ baseline
   - **Production Brief:**
     > Two rows, each containing a large heading 'Your products' on the left and a smaller link 'Add a product' on the right. Row 1: centre-aligned, with two separate baselines drawn as accent-coloured lines that clearly do not match. Row 2: baseline-aligned, with a single shared baseline running through both. Label 'Centre-aligned' and 'Baseline-aligned'.

9. **`pairing.png`** (16:9)
   - **Target Section:** Pairing weights and typefaces (إقران الأوزان والخطوط)
   - **Target File Path:** `public/assets/typography/pairing.png`
   - **Alt Text (EN):** Weight pairing and typeface pairing compared
   - **Alt Text (AR):** مقارنة إقران الأوزان وإقران الخطوط
   - **Production Brief:**
     > Two labelled panels, each with two examples of the same content — a header reading 'Header' and three lines of body text. Panel 1 'Weights': left shows Medium header + Regular body labelled 'not enough contrast', right shows Bold header + Regular body labelled 'works'. Panel 2 'Typefaces': left shows two very similar geometric sans faces labelled 'too similar', right shows a clean sans paired with a serif labelled 'clear contrast'.

---

### TICKET-03: Chapter 04 — Colors (4 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/colors/`  
**Chapter Scope:** Chapter 4 — *Colors (الألوان)*  

#### Deliverables & Visual Specs:

1. **`wireframe-first.png`** (16:9)
   - **Target Section:** Start in Greyscale (ابدأ بالأسود والأبيض أولاً)
   - **Target File Path:** `public/assets/colors/wireframe-first.png`
   - **Alt Text (EN):** Comparison of UI designed in greyscale first versus color added purposefully
   - **Alt Text (AR):** مقارنة بين تصميم الواجهة بالرمادي أولاً ثم إضافة الألوان بشكل وظيفي
   - **Production Brief:**
     > Side-by-side comparison of the same card interface: Left in pure greyscale hierarchy establishing spacing, typography, and contrast without distraction; Right showing the single intentional brand blue accent applied to the primary CTA and active indicator.

2. **`color-wheel-schemes.png`** (16:9)
   - **Target Section:** Color Wheel Schemes (أنظمة دمج الألوان)
   - **Target File Path:** `public/assets/colors/color-wheel-schemes.png`
   - **Alt Text (EN):** Diagram of monochromatic, complementary, and analogous color schemes
   - **Alt Text (AR):** مخطط توضيحي لأنظمة دمج الألوان: الأحادي والتكاملي والمتجاور
   - **Production Brief:**
     > Visual color wheel showing three schemes side-by-side: Monochromatic ramp on the left, Complementary opposite hues in the center, and Analogous adjacent color palette on the right.

3. **`palette-architecture.png`** (16:9)
   - **Target Section:** Building a Complete Palette in 8 Steps (بناء لوحة ألوان متكاملة في ٨ خطوات)
   - **Target File Path:** `public/assets/colors/palette-architecture.png`
   - **Alt Text (EN):** Systematic UI color palette architecture showing brand, neutrals, and semantic colors
   - **Alt Text (AR):** بنية متكاملة للوحة ألوان الواجهة تشمل ألوان العلامة، المحايدة، والدلالية
   - **Production Brief:**
     > Horizontal swatch board demonstrating a production color system: Brand action primary hue with 5 tints/shades, warm neutral ramp (9 steps from ground #FAF9F7 to ink #1A1A17), and semantic alert trios (success green, warning amber, error red) with their tint backgrounds.

4. **`wcag-contrast-ratios.png`** (16:9)
   - **Target Section:** Accessibility and Contrast (WCAG) (إمكانية الوصول والتباين (WCAG))
   - **Target File Path:** `public/assets/colors/wcag-contrast-ratios.png`
   - **Alt Text (EN):** WCAG contrast ratio comparison showing passing versus failing text combinations
   - **Alt Text (AR):** مقارنة نسب التباين وفق معايير WCAG توضح النماذج الناجحة والراسبة
   - **Production Brief:**
     > Grid of 4 text-on-surface cards with prominent contrast badges: (1) Low contrast gray text on white (2.1:1 FAIL), (2) Accessible body text (5.5:1 PASS AA), (3) Large headline on tinted fill (4.8:1 PASS AAA), and (4) Red error text on white accompanied by warning icon (4.6:1 PASS).

---

### TICKET-04: Chapter 05 — Gradients (3 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/gradients/`  
**Chapter Scope:** Chapter 5 — *Gradients (التدرجات اللونية)*  

#### Deliverables & Visual Specs:

1. **`gradient-types.png`** (16:9)
   - **Target Section:** Types of Gradients (أنواع التدرجات)
   - **Target File Path:** `public/assets/gradients/gradient-types.png`
   - **Alt Text (EN):** Comparison of Linear, Radial, Angular, and Mesh gradients
   - **Alt Text (AR):** مقارنة بصرية بين التدرج الخطي، الدائري، المخروطي، والشبكي
   - **Production Brief:**
     > Four rounded cards displaying sample gradients side-by-side: Linear (top-left), Radial (top-right), Angular (bottom-left), and Mesh (bottom-right), cleanly labeled.

2. **`smooth-vs-muddy-gradients.png`** (16:9)
   - **Target Section:** Crafting Smooth, Natural Gradients (إزاي تختار ألوان لتدرج ناعم؟)
   - **Target File Path:** `public/assets/gradients/smooth-vs-muddy-gradients.png`
   - **Alt Text (EN):** Comparison of muddy direct gradients versus smooth hue-shifted gradients
   - **Alt Text (AR):** مقارنة بين التدرج العشوائي الباهت والتدرج المتناسق المدروس
   - **Production Brief:**
     > Two gradient bars side-by-side: Top showing a muddy, dull transition between complementary hues (blue to orange through grayish brown); Bottom showing a vibrant 3-stop hue-shifted gradient passing through natural warm bridge tones.

3. **`gradient-restraint.png`** (16:9)
   - **Target Section:** Restraint & Cognitive Overload (تجنب الحمل الذهني الزائد)
   - **Target File Path:** `public/assets/gradients/gradient-restraint.png`
   - **Alt Text (EN):** Tasteful gradient accent usage versus overpowering full-screen gradient
   - **Alt Text (AR):** الاستخدام المتزن للتدرجات كعنصر تركيز مقابل التدرج الصارخ المشتت
   - **Production Brief:**
     > Two mobile screen mockups: Left shows a sleek dark dashboard using subtle gradient rim light on an active chart line and button; Right shows an overwhelming rainbow gradient background that destroys card contrast and text readability.

---

### TICKET-05: Chapter 06 — Shadows (4 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/shadows/`  
**Chapter Scope:** Chapter 6 — *Shadows (الظلال)*  

#### Deliverables & Visual Specs:

1. **`elevation-levels.png`** (16:9)
   - **Target Section:** Why Shadows Matter: Elevation & Affordance (ليه بنستخدم الظلال؟)
   - **Target File Path:** `public/assets/shadows/elevation-levels.png`
   - **Alt Text (EN):** Three-tier UI elevation scale demonstrating ground, raised, and overlay shadows
   - **Alt Text (AR):** مقياس الارتفاع ثلاثي المستويات يوضح ظل السطح والبطاقات والنوافذ العائمة
   - **Production Brief:**
     > Isometric stack of three UI surfaces: Flat ground (0 elevation), Raised card (Y: 2px, Blur: 6px, Opacity: 7%), and Modal overlay (Y: 16px, Blur: 32px, Opacity: 14%), showing how light source and blur create natural spatial hierarchy.

2. **`shadow-values.png`** (16:9)
   - **Target Section:** Anatomy of a Shadow (تشريح الظل)
   - **Target File Path:** `public/assets/shadows/shadow-values.png`
   - **Alt Text (EN):** Diagram breaking down shadow X, Y, blur, and opacity parameters
   - **Alt Text (AR):** رسم توضيحي لخصائص الظل: الإزاحة الأفقية والرأسية والتمويه والشفافية
   - **Production Brief:**
     > A card floating with annotated callout lines indicating X offset, Y vertical drop, spread, and softness blur.

3. **`shadows-in-dark-mode.png`** (16:9)
   - **Target Section:** Shadows in Dark Mode (الظلال في الوضع الداكن)
   - **Target File Path:** `public/assets/shadows/shadows-in-dark-mode.png`
   - **Alt Text (EN):** Dark mode elevation achieved through surface lightening and subtle borders
   - **Alt Text (AR):** التعبير عن الارتفاع في الوضع الداكن عبر تفتيح الأسطح والحدود الخفيفة
   - **Production Brief:**
     > Two dark mode UI frames: Left shows an ineffective black drop shadow that completely disappears against #121212 ground; Right shows correct dark elevation where the modal uses a lighter slate surface (#242424), a crisp 1px border (#383838), and soft black diffusion.

4. **`avoid-inner-shadows.png`** (16:9)
   - **Target Section:** Avoid Inner Shadows (تجنب الظلال الداخلية)
   - **Target File Path:** `public/assets/shadows/avoid-inner-shadows.png`
   - **Alt Text (EN):** Modern flat input with crisp border versus outdated heavy inner shadow
   - **Alt Text (AR):** مقارنة بين حقل إدخال مسطح حديث وحقل كلاسيكي بظل داخلي مزعج
   - **Production Brief:**
     > Side-by-side comparison of input fields: Left shows an outdated 2000s skeuomorphic input with heavy inset inner shadow looking dirty; Right shows a modern clean input on white surface with 1px border and 2px focus ring.

---

### TICKET-06: Chapter 07 — Buttons (4 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/buttons/`  
**Chapter Scope:** Chapter 7 — *Buttons (الأزرار)*  

#### Deliverables & Visual Specs:

1. **`button-styles.png`** (16:9)
   - **Target Section:** Buttons Classified by Visual Style (تصنيف الأزرار حسب الشكل)
   - **Target File Path:** `public/assets/buttons/button-styles.png`
   - **Alt Text (EN):** Filled, Outline, Ghost, and Icon button styles displayed side by side
   - **Alt Text (AR):** أنماط الأزرار المختلفة: مملوء، محدد، شفاف، وأيقونات
   - **Production Brief:**
     > A row showing a solid Primary button, an Outlined Secondary button, a Ghost Tertiary button, and a circular Icon button with clean labels.

2. **`touch-targets.png`** (16:9)
   - **Target Section:** Touch Targets & Mobile Usability (مساحة اللمس واستخدام الموبايل)
   - **Target File Path:** `public/assets/buttons/touch-targets.png`
   - **Alt Text (EN):** Mobile 44px minimum hit target bounding box and thumb reach zones
   - **Alt Text (AR):** مساحة اللمس الدنيا 44 بكسل ومناطق وصول الإبهام على شاشات الموبايل
   - **Production Brief:**
     > Annotated mobile screen showing: (1) A small 32px visual button surrounded by a translucent 44×44pt green hit boundary, and (2) An ergonomic thumb reach heat map showing the natural bottom-arc zone versus the hard-to-reach top corners.

3. **`button-states.png`** (16:9)
   - **Target Section:** The Four Interactive Button States (حالات الزرار التفاعلية)
   - **Target File Path:** `public/assets/buttons/button-states.png`
   - **Alt Text (EN):** Interactive button states: default, hover, active, focus, disabled, and loading
   - **Alt Text (AR):** حالات الأزرار التفاعلية: الافتراضية، التحويم، الضغط، التركيز، التعطيل، والتحميل
   - **Production Brief:**
     > Matrix displaying primary and secondary buttons across 6 interactive states: Default, Hover (subtle darken), Pressed (scale 0.98 + darker fill), Focus Visible (2px offset ring), Disabled (sunken grey fill), and Loading (retaining label with spinner).

4. **`button-pairing-and-rtl.png`** (16:9)
   - **Target Section:** Button Pair Ordering & RTL Nuances (ترتيب أزواج الأزرار في الـ RTL)
   - **Target File Path:** `public/assets/buttons/button-pairing-and-rtl.png`
   - **Alt Text (EN):** Button pair ordering in LTR versus RTL layouts with visual hierarchy
   - **Alt Text (AR):** ترتيب أزواج الأزرار في الواجهات الإنجليزية والعربية مع الحفاظ على الهرمية
   - **Production Brief:**
     > Two modal dialog footers: Top shows LTR layout with Secondary Cancel on the left and Primary Confirm on the right; Bottom shows RTL Arabic layout with Secondary Cancel on the right and Primary Confirm on the left, respecting reading direction.

---

### TICKET-07: Chapter 08 — Forms (4 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/forms/`  
**Chapter Scope:** Chapter 8 — *Forms (النماذج)*  

#### Deliverables & Visual Specs:

1. **`form-controls.png`** (16:9)
   - **Target Section:** Core Form Elements & Selection Controls (عناصر النماذج وأدوات الاختيار)
   - **Target File Path:** `public/assets/forms/form-controls.png`
   - **Alt Text (EN):** Comparison of text fields, dropdowns, radio buttons, and checkboxes
   - **Alt Text (AR):** مقارنة بين حقول النص والقوائم المنسدلة وأزرار الراديو وصناديق التأشير
   - **Production Brief:**
     > Visual comparison showcasing clean form components: a text field, an open vs closed dropdown, a radio button group, and a checkbox group.

2. **`field-label-placement.png`** (16:9)
   - **Target Section:** Principles of Great Field Design (مبادئ تصميم الحقول الاحترافية)
   - **Target File Path:** `public/assets/forms/field-label-placement.png`
   - **Alt Text (EN):** Comparison of field label placements: top-aligned, floating, and placeholder-only
   - **Alt Text (AR):** مقارنة مواضع تسميات الحقول: بالأعلى، العائمة، وداخل الحقل
   - **Production Brief:**
     > Three form input designs evaluated: (1) Top-aligned permanent label with helper text (Recommended: fastest eye tracking), (2) Floating animated label, and (3) Placeholder-as-label marked with red cross (disappears upon typing).

3. **`single-column-flow.png`** (16:9)
   - **Target Section:** Single-Column Flow & Progressive Disclosure (التدفق في عمود واحد والتقسيم لخطوات)
   - **Target File Path:** `public/assets/forms/single-column-flow.png`
   - **Alt Text (EN):** Single-column form layout flow versus confusing multi-column form
   - **Alt Text (AR):** تدفق النموذج أحادي العمود مقابل النماذج متعددة الأعمدة المشتتة
   - **Production Brief:**
     > Two form layouts with eye-tracking path overlays: Left multi-column form showing erratic Z-pattern eye jumps causing friction; Right single-column vertical stack showing a smooth, effortless straight downward eye tracking path.

4. **`form-validation-states.png`** (16:9)
   - **Target Section:** Real-Time Validation & Input States (التحقق الفوري وحالات الإدخال)
   - **Target File Path:** `public/assets/forms/form-validation-states.png`
   - **Alt Text (EN):** Form field validation lifecycle: empty, active, success, and inline error
   - **Alt Text (AR):** دورة حياة التحقق من حقول الإدخال: فارغ، نشط، نجاح، وخطأ توضيحي
   - **Production Brief:**
     > Four-step input progression: (1) Empty default with example placeholder, (2) Active typing with 2px blue focus ring, (3) Validated state with green checkmark, and (4) Error state with red border, warning icon, and clear inline instructions.

---

### TICKET-08: Chapter 09 — Icons (4 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/icons/`  
**Chapter Scope:** Chapter 9 — *Icons (الأيقونات)*  

#### Deliverables & Visual Specs:

1. **`clarifying-vs-interactive-icons.png`** (16:9)
   - **Target Section:** Clarifying vs. Interactive Icons (الأيقونات التوضيحية مقابل التفاعلية)
   - **Target File Path:** `public/assets/icons/clarifying-vs-interactive-icons.png`
   - **Alt Text (EN):** Distinction between decorative clarifying icons and interactive icon buttons
   - **Alt Text (AR):** الفرق بين الأيقونات التوضيحية البصرية وأزرار الأيقونات التفاعلية
   - **Production Brief:**
     > Side-by-side comparison: Left shows clarifying bullet icons beside benefit list items (passive, no hover); Right shows an interactive icon toolbar (Search, Filter, Bookmark) with 44px hit bounds and hover state pill backgrounds.

2. **`icon-styles.png`** (16:9)
   - **Target Section:** Icon Styles & Visual Cohesion (أساليب الأيقونات والاتساق البصري)
   - **Target File Path:** `public/assets/icons/icon-styles.png`
   - **Alt Text (EN):** Comparison of Line, Filled, and Duotone icon styles
   - **Alt Text (AR):** مقارنة بين أساليب الأيقونات: الخطية والمصمتة وثنائية اللون
   - **Production Brief:**
     > A matrix displaying four standard icons (Home, Search, Bell, Settings) drawn in Line style, Filled style, and Duotone style side-by-side.

3. **`icon-bounding-box.png`** (16:9)
   - **Target Section:** Uniform Bounding Boxes & Stroke Weights (صندوق الحدود وسماكة الخط الموحدة)
   - **Target File Path:** `public/assets/icons/icon-bounding-box.png`
   - **Alt Text (EN):** Uniform 24px icon bounding boxes with optical centering and consistent stroke weight
   - **Alt Text (AR):** مربعات الاحتواء الموحدة 24 بكسل مع الموازنة البصرية وسُمك الخط المتناسق
   - **Production Brief:**
     > Three distinct icon shapes (Play triangle, Heart, Arrow) aligned within dashed 24×24px bounding boxes, showing optical weight balance (triangle nudged slightly right) and uniform 2px stroke thickness across all three.

4. **`icon-labels-and-clarity.png`** (16:9)
   - **Target Section:** Pairing Icons with Text Labels (إقران الأيقونات بنصوص توضيحية)
   - **Target File Path:** `public/assets/icons/icon-labels-and-clarity.png`
   - **Alt Text (EN):** Ambiguous unlabeled icon navigation versus clear icon paired with text label
   - **Alt Text (AR):** التنقل الغامض بالأيقونات وحدها مقابل الأيقونات المقترنة بنصوص واضحة
   - **Production Brief:**
     > Before/after navigation bar: Top shows mystery-meat unlabeled abstract icons forcing user guesswork; Bottom shows high-conversion navigation bar with icons paired directly with clear 13px text labels underneath.

---

### TICKET-09: Chapter 10 — Photos (3 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/photos/`  
**Chapter Scope:** Chapter 10 — *Photos (الصور)*  

#### Deliverables & Visual Specs:

1. **`photo-text-overlays.png`** (16:9)
   - **Target Section:** Overlays & Text Readability (الطبقات الشفافة ووضوح النص)
   - **Target File Path:** `public/assets/photos/photo-text-overlays.png`
   - **Alt Text (EN):** Techniques for readable text over photography: bare text, gradient scrim, and frosted glass
   - **Alt Text (AR):** طرق ضمان قراءة النصوص فوق الصور: النص المجرد، التدرج المظلل، والبطاقة الزجاجية
   - **Production Brief:**
     > Three hero banner panels over a bright detailed photo: (1) Bare white text (illegible FAIL), (2) Smooth black-to-transparent gradient scrim overlay (crisp readability PASS), and (3) Floating frosted glass card with 20px blur (premium finish PASS).

2. **`directional-gaze.png`** (16:9)
   - **Target Section:** Single Focal Point & Directional Gaze (نقطة التركيز البؤرية واتجاه النظر)
   - **Target File Path:** `public/assets/photos/directional-gaze.png`
   - **Alt Text (EN):** Using human directional gaze in photography to direct user attention toward the CTA
   - **Alt Text (AR):** استخدام اتجاه نظرة الشخص في الصورة لتوجيه انتباه المستخدم نحو زر الإجراء
   - **Production Brief:**
     > Two landing page hero mockups: Left shows a model looking away out of the screen (pulling attention off-page); Right shows the model looking and subtly pointing directly toward the headline and primary "Get Started" CTA.

3. **`responsive-aspect-ratios.png`** (16:9)
   - **Target Section:** Storytelling & Responsive Aspect Ratios (القصة البصرية ونسب الأبعاد المتجاوبة)
   - **Target File Path:** `public/assets/photos/responsive-aspect-ratios.png`
   - **Alt Text (EN):** Responsive aspect ratio cropping across desktop, tablet, and mobile cards
   - **Alt Text (AR):** قص الصور حسب النسب المتجاوبة عبر الشاشات المختلفة مع حماية نقطة التركيز
   - **Production Brief:**
     > The same portrait image displayed across three UI components: 16:9 wide desktop header, 4:3 tablet card, and 1:1 mobile square, demonstrating smart focal-point anchoring (keeping the subject centered) vs naive center cropping.

---

### TICKET-10: Chapter 11 — Illustrations (3 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/illustrations/`  
**Chapter Scope:** Chapter 11 — *Illustrations (الرسوم التوضيحية)*  

#### Deliverables & Visual Specs:

1. **`illustration-empty-state.png`** (16:9)
   - **Target Section:** Where Illustrations Excel (أين تبدع الرسوم التوضيحية؟)
   - **Target File Path:** `public/assets/illustrations/illustration-empty-state.png`
   - **Alt Text (EN):** Friendly illustration used in an empty state with action button
   - **Alt Text (AR):** رسمة توضيحية ودودة في حالة فارغة مع زرار اتخاذ إجراء
   - **Production Brief:**
     > A card illustrating an empty inbox state: a minimalist character looking into an open box with a gentle smile, accompanied by headline, helper text, and a primary action button.

2. **`where-to-avoid-illustrations.png`** (16:9)
   - **Target Section:** Where to Avoid Illustrations (أماكن يُمنع فيها استخدام الرسوم)
   - **Target File Path:** `public/assets/illustrations/where-to-avoid-illustrations.png`
   - **Alt Text (EN):** High-friction checkout with distracting illustrations versus clean utilitarian flow
   - **Alt Text (AR):** مقارنة بين مسار دفع معقد برسومات مشتتة ومسار دفع وظيفي مركز
   - **Production Brief:**
     > Side-by-side checkout screens: Left shows checkout cluttered with decorative cartoon characters that distract from payment fields; Right shows a laser-focused, distraction-free utilitarian checkout screen optimized for speed.

3. **`illustration-style-consistency.png`** (16:9)
   - **Target Section:** Scale, 3D, and Style Consistency (الحجم، الرسوم ثلاثية الأبعاد، والاتساق)
   - **Target File Path:** `public/assets/illustrations/illustration-style-consistency.png`
   - **Alt Text (EN):** Clashing mixed illustration styles versus unified cohesive illustration language
   - **Alt Text (AR):** تضارب أساليب الرسم المختلفة مقابل لغة بصرية ورسومية متناغمة
   - **Production Brief:**
     > Two sets of feature cards: Left shows a messy clash of styles (flat outline icon, 3D glossy character, hand-drawn sketch); Right shows a harmonious illustration system with identical stroke weight, perspective, and brand palette.

---

### TICKET-11: Chapter 12 — Cards (3 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/cards/`  
**Chapter Scope:** Chapter 12 — *Cards (البطاقات)*  

#### Deliverables & Visual Specs:

1. **`card-content-prioritization.png`** (16:9)
   - **Target Section:** Content Prioritization: Less is More (طريقة اختيار المحتوى وترتيب الأولويات)
   - **Target File Path:** `public/assets/cards/card-content-prioritization.png`
   - **Alt Text (EN):** Overcrowded card before editing versus clean prioritized card with strong hierarchy
   - **Alt Text (AR):** بطاقة محتوى مزدحمة وغير منظمة مقابل بطاقة نقية بهرمية واضحة
   - **Production Brief:**
     > Before/after card design: Left card is cluttered with 9 competing elements, badges, duplicate buttons, and full paragraphs; Right card curates only the vital information: image thumbnail, category tag, strong title, price, and clean primary action.

2. **`card-anatomy.png`** (16:9)
   - **Target Section:** Anatomy of a Card (تشريح البطاقة وعناصرها)
   - **Target File Path:** `public/assets/cards/card-anatomy.png`
   - **Alt Text (EN):** Diagram showing card anatomy: header image, badge, title, metadata, and button
   - **Alt Text (AR):** رسم توضيحي لعناصر البطاقة: الصورة، الشارة، العنوان، البيانات، والزرار
   - **Production Brief:**
     > An annotated card layout broken down with labels pointing to image container, status badge, typography block, metadata pills, and CTA button.

3. **`card-click-affordance.png`** (16:9)
   - **Target Section:** Click Affordance & Elevation Styles (إيحاء النقر وأساليب الارتفاع)
   - **Target File Path:** `public/assets/cards/card-click-affordance.png`
   - **Alt Text (EN):** Click affordance indicators on cards including hover elevation and chevron prompts
   - **Alt Text (AR):** مؤشرات قابلية النقر على البطاقات تشمل الارتفاع عند التحويم والسهم التوجيهي
   - **Production Brief:**
     > Comparison of interactive card affordances: Left shows a completely flat card that looks like a static banner; Right shows an interactive card with a subtle border, hover lift shadow, pointer cursor, and subtle right-aligned chevron icon.

---

### TICKET-12: Chapter 13 — White Space (3 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/white-space/`  
**Chapter Scope:** Chapter 13 — *White Space (المساحة البيضاء)*  

#### Deliverables & Visual Specs:

1. **`active-negative-space.png`** (16:9)
   - **Target Section:** The Active Power of Negative Space (القوة الفعالة للمساحة السلبية)
   - **Target File Path:** `public/assets/white-space/active-negative-space.png`
   - **Alt Text (EN):** Separation using heavy borders versus elegant grouping with whitespace
   - **Alt Text (AR):** الفصل بين العناصر بالخطوط الثقيلة مقابل التجميع الأنيق بالمساحات البيضاء
   - **Production Brief:**
     > Two identical profile cards: Left divides every label and stat with dark 1px lines creating visual noise; Right removes all internal dividers and relies solely on 16pt and 24pt spacing gaps to establish natural, clean visual groups.

2. **`start-wide-tighten.png`** (16:9)
   - **Target Section:** Start Wide and Tighten Progressively (ابدأ بفراغ واسع وقلّل تدريجياً)
   - **Target File Path:** `public/assets/white-space/start-wide-tighten.png`
   - **Alt Text (EN):** Three-stage layout spacing progression: exaggerated, production balanced, and cramped
   - **Alt Text (AR):** تطور تباعد الواجهة عبر ثلاث مراحل: رحبة جداً، متزنة للإنتاج، ومزدحمة ضيقة
   - **Production Brief:**
     > Three-stage UI progression for a dashboard widget: (1) Exaggerated 48px padding (airy, easy to critique), (2) Production balanced 24px padding (optimal density and comfort), and (3) Cramped 8px padding showing how claustrophobic layouts suffocate text.

3. **`unboxing-technique.png`** (16:9)
   - **Target Section:** The Unboxing Technique & Screen Margins (تقنية فك الصندوق وحواف الشاشة)
   - **Target File Path:** `public/assets/white-space/unboxing-technique.png`
   - **Alt Text (EN):** Comparison of a boxed product photo vs a free-floating unboxed product silhouette
   - **Alt Text (AR):** مقارنة بين صورة منتج داخل إطار مغلق مقابل منتج حر بتقنية فك الصندوق
   - **Production Brief:**
     > Before and after cards showing a sneaker trapped inside an outlined container on the left, compared to the same sneaker seamlessly floating on clean white space with subtle drop shadow on the right.

---

### TICKET-13: Chapter 14 — Personality (2 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/personality/`  
**Chapter Scope:** Chapter 14 — *Personality (الشخصية)*  

#### Deliverables & Visual Specs:

1. **`three-personality-archetypes.png`** (16:9)
   - **Target Section:** Three Core Personality Archetypes (أنماط الشخصية: المرحة، الجدية، والمحايدة)
   - **Target File Path:** `public/assets/personality/three-personality-archetypes.png`
   - **Alt Text (EN):** Three UI personality archetypes applied to the same banking card: Playful, Serious, and Neutral
   - **Alt Text (AR):** ثلاث شخصيات بصرية لنفس بطاقة الحساب المصرفي: مرحة، رسمية، وحيادية وظيفية
   - **Production Brief:**
     > Three versions of a finance balance widget: (1) Playful: candy pastel tones, 20px rounded pill corners, conversational greeting, and cartoon avatar; (2) Serious / Enterprise: deep navy/charcoal, 6px tight radius, crisp serif numerals, tabular font; (3) Modern Utility: high contrast monochrome, 10px radius, clean Swiss typography.

2. **`visual-consistency-cheatsheet.png`** (16:9)
   - **Target Section:** The Consistency Rule & Visual Cheatsheet (قاعدة الاتساق وجدول المقارنة البصرية)
   - **Target File Path:** `public/assets/personality/visual-consistency-cheatsheet.png`
   - **Alt Text (EN):** Visual consistency matrix showing aligned radii, typography, and color weights
   - **Alt Text (AR):** مصفوفة التناسق البصري توضح انسجام زوايا الانحناء والخطوط والألوان
   - **Production Brief:**
     > Side-by-side screen audit: Left shows a "Frankenstein" UI with mismatched corner radii (sharp, 8px, and 24px on the same card) and clashing colors; Right shows systematic consistency where every card uses 12px radius, controls use 8px, and colors follow unified token roles.

---

### TICKET-14: Chapter 15 — Language & Copy (3 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/language/`  
**Chapter Scope:** Chapter 15 — *Language & Copy (اللغة والنصوص في التصميم)*  

#### Deliverables & Visual Specs:

1. **`button-copy-specificity.png`** (16:9)
   - **Target Section:** Button Copy: Specificity Over Ambiguity (نصوص الأزرار: كن محدداً بلا إطالة)
   - **Target File Path:** `public/assets/language/button-copy-specificity.png`
   - **Alt Text (EN):** Specific action-oriented button copy versus ambiguous generic labels
   - **Alt Text (AR):** نصوص الأزرار المحددة الموجهة للنتيجة مقابل النصوص العامة المبهمة
   - **Production Brief:**
     > Comparison of modal dialog buttons: Left dialog uses vague buttons "OK" and "Cancel" leaving the user uncertain of what happens; Right dialog uses explicit outcome labels "Save Draft" and "Discard Changes", eliminating all ambiguity.

2. **`destructive-modal-dialog.png`** (16:9)
   - **Target Section:** Destructive Dialogs: Eliminate Double Negatives (نوافذ التأكيد: تجنب النفي المزدوج)
   - **Target File Path:** `public/assets/language/destructive-modal-dialog.png`
   - **Alt Text (EN):** Eliminating double-negatives in destructive confirmation dialogs
   - **Alt Text (AR):** إلغاء أسلوب النفي المزدوج في النوافذ التأكيدية للإجراءات الحساسة
   - **Production Brief:**
     > Before/after confirmation dialog: Left shows confusing prompt "Do you want to cancel the deletion? [Yes] [No]" causing cognitive paralysis; Right shows clear prompt "Delete this invoice permanently? [Keep Invoice] [Delete Invoice]" with destructive red primary styling.

3. **`conversational-error-states.png`** (16:9)
   - **Target Section:** Speak Like a Human & Suggest Solutions (التحدث بلغة بشرية واقتراح الحلول)
   - **Target File Path:** `public/assets/language/conversational-error-states.png`
   - **Alt Text (EN):** Human conversational error messages with solutions versus cryptic system error codes
   - **Alt Text (AR):** رسائل الخطأ الإنسانية المصحوبة بالحلول مقابل الأكواد التقنية الصماء
   - **Production Brief:**
     > Side-by-side error toasts: Left displays robotic message "Error 504: Gateway Timeout / Operation Aborted"; Right displays human, actionable copy "We couldn’t reach the payment server. Your card was not charged. [Try Again in 2 mins]".

---

### TICKET-15: Chapter 16 — Navigation (3 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/navigation/`  
**Chapter Scope:** Chapter 16 — *Navigation (التنقل)*  

#### Deliverables & Visual Specs:

1. **`three-navigation-paradigms.png`** (16:9)
   - **Target Section:** The Three Navigation Paradigms (الأنواع الثلاثة للتنقل)
   - **Target File Path:** `public/assets/navigation/three-navigation-paradigms.png`
   - **Alt Text (EN):** The three digital navigation paradigms: bottom tab bar, desktop top bar, and drawer sidebar
   - **Alt Text (AR):** الأنماط الثلاثة للتنقل الرقمي: شريط التبويبات السفلي، الشريط العلوي، والقائمة الجانبية
   - **Production Brief:**
     > Architectural breakdown of three navigation patterns: (1) Mobile persistent 4-tab bottom bar for core destinations, (2) Desktop horizontal header with categorized dropdown menus, and (3) Collapsible sidebar drawer for deep, multi-tier utility tools.

2. **`tab-bar-anatomy.png`** (16:9)
   - **Target Section:** Mobile Tab Bar Architecture (تصميم شريط التابات للموبايل)
   - **Target File Path:** `public/assets/navigation/tab-bar-anatomy.png`
   - **Alt Text (EN):** Mobile tab bar layout with home indicator safe area and active states
   - **Alt Text (AR):** تخطيط شريط التابات السفلي للموبايل مع مسافة الأمان وحالة التفعيل
   - **Production Brief:**
     > A mobile screen bottom frame showing 4 navigation tabs with the home tab highlighted in brand accent, clear inactive icons, and safe area margin above the home bar.

3. **`rtl-navigation-flipping.png`** (16:9)
   - **Target Section:** RTL Navigation & Arabic Alignment (قواعد التنقل في الواجهات العربية)
   - **Target File Path:** `public/assets/navigation/rtl-navigation-flipping.png`
   - **Alt Text (EN):** RTL navigation horizontal flipping rules for Arabic interface design
   - **Alt Text (AR):** قواعد عكس اتجاه التنقل للواجهات العربية من اليمين إلى اليسار
   - **Production Brief:**
     > Two mobile app headers and tab bars comparing LTR vs RTL: Annotations highlight what flips (Back arrow points right, tab order starts from right, chevron disclosure indicators flip) versus what never flips (media scrubbers, phone numbers, Western brand logos).

---

### TICKET-16: Chapter 17 — Microinteractions (3 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/microinteractions/`  
**Chapter Scope:** Chapter 17 — *Microinteractions (التفاعلات الدقيقة)*  

#### Deliverables & Visual Specs:

1. **`microinteraction-feedback.png`** (16:9)
   - **Target Section:** Instant Tactile Feedback (التغذية الراجعة الفورية)
   - **Target File Path:** `public/assets/microinteractions/microinteraction-feedback.png`
   - **Alt Text (EN):** Three-stage microinteraction feedback cycle: resting, pressed, and confirmed state
   - **Alt Text (AR):** دورة استجابة التفاعل الدقيق في ثلاث مراحل: السكون، الضغط، والتأكيد
   - **Production Brief:**
     > Sequential 3-frame animation storyboard for a "Save to Bookmark" button: Frame 1 resting outline icon; Frame 2 finger press causing scale(0.96) compression and blue radial highlight; Frame 3 smooth transition to filled bookmark icon with tiny particle burst confirming success.

2. **`easing-curves.png`** (16:9)
   - **Target Section:** Easing Curves: Linear vs. Natural Acceleration (منحنيات الحركة: الخطي مقابل الطبيعي)
   - **Target File Path:** `public/assets/microinteractions/easing-curves.png`
   - **Alt Text (EN):** Comparison graph of Linear, Ease-In, Ease-Out, and Cubic-Bezier easing curves
   - **Alt Text (AR):** مقارنة بيانية لمنحنيات الحركة: الخطي، التسارع، التباطؤ، ومنحنى بيزييه
   - **Production Brief:**
     > A graph comparing four velocity curves: flat Linear slope, upward curving Ease-In, cushioned Ease-Out curve, and organic Spring curve.

3. **`dribbble-vs-production-motion.png`** (16:9)
   - **Target Section:** Avoiding the Dribbble Animation Trap (فخ استعراضات Dribbble غير العملية)
   - **Target File Path:** `public/assets/microinteractions/dribbble-vs-production-motion.png`
   - **Alt Text (EN):** Production-ready 180ms ease-out motion versus flashy slow Dribbble concept animation
   - **Alt Text (AR):** الحركة الإنتاجية السريعة 180ms مقابل حركات الاستعراض البطيئة المزعجة للمستخدم
   - **Production Brief:**
     > Timeline comparison: Top shows a 2.5-second flashy social media concept animation with spinning icons and excessive bounce (slow, nauseating); Bottom shows a production-grade 140ms ease-out dropdown menu opening (instant, snappy, purposeful).

---

### TICKET-17: Chapter 18 — What's Next? (1 Deliverable)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/whats-next/`  
**Chapter Scope:** Chapter 18 — *What's Next? (إيه اللي بعد كده؟)*  

#### Deliverables & Visual Specs:

1. **`assembled-primitives.png`** (16:9)
   - **Target Section:** UI Design as Assembled Primitives (تصميم الواجهات: تجميع عناصر بسيطة)
   - **Target File Path:** `public/assets/whats-next/assembled-primitives.png`
   - **Alt Text (EN):** Exploded UI diagram showing complex interface built from simple geometric primitives
   - **Alt Text (AR):** مخطط تفكيكي يوضح بناء واجهة متقدمة من أشكال هندسية بدائية بسيطة
   - **Production Brief:**
     > Exploded view of a modern crypto/banking analytics card showing its atomic decomposition: 3 rounded rectangles for surfaces, 2 circular avatar masks, 4 typographic text layers, and 1 vector icon curve, proving that all UI is assembled from simple primitives.

---

### TICKET-18: Chapter 19 — My UI Design Process (3 Deliverables)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/design-process/`  
**Chapter Scope:** Chapter 19 — *My UI Design Process (عملية التصميم)*  

#### Deliverables & Visual Specs:

1. **`paper-sketching-ideation.png`** (16:9)
   - **Target Section:** Step 2: Rapid Ugly Paper Sketches (الخطوة ٢: الاسكتشات السريعة)
   - **Target File Path:** `public/assets/design-process/paper-sketching-ideation.png`
   - **Alt Text (EN):** Rapid paper sketches exploring multiple mobile screen layout ideas in low fidelity
   - **Alt Text (AR):** اسكتشات ورقية سريعة لاستكشاف أفكار تخطيط شاشات الموبايل بكفاءة
   - **Production Brief:**
     > Overhead view of a designer sketchbook showing 6 rapid thumbnail sketches of an e-commerce product screen, exploring different hero image sizes, tab placements, and checkout bar positions with handwritten notes and arrows.

2. **`wireframe-to-ui.png`** (16:9)
   - **Target Section:** Step 3: Structural Wireframing (الخطوة ٣: الهيكل التخطيطي (Wireframes))
   - **Target File Path:** `public/assets/design-process/wireframe-to-ui.png`
   - **Alt Text (EN):** Progression from rough sketch to wireframe to high fidelity UI
   - **Alt Text (AR):** مراحل تطور التصميم: من اسكتش ورقي إلى وايرفريم ثم واجهة نهائية
   - **Production Brief:**
     > Three frames side-by-side: a hand-drawn napkin sketch on the left, a clean greyscale wireframe in the center, and the finished high-fidelity colored UI on the right.

3. **`design-system-handover.png`** (16:9)
   - **Target Section:** Step 5 & 6: Assembly & The Art of Client Presentation (الخطوة ٥ و٦: التجميع وفن عرض التصميم)
   - **Target File Path:** `public/assets/design-process/design-system-handover.png`
   - **Alt Text (EN):** Professional design system handoff board showing design tokens, states, and responsive views
   - **Alt Text (AR):** لوحة تسليم احترافية لمنظومة التصميم تشمل الرموز البرمجية والحالات والتجاوب
   - **Production Brief:**
     > A structured Figma presentation canvas: Top row displays design tokens (color swatches with hex, typography scale, 8pt spacing ladder); Middle row shows component state matrix (buttons, inputs, cards); Bottom row shows mobile and desktop responsive views.

---

### TICKET-19: Chapter 20 — Attracting Clients (1 Deliverable)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/attracting-clients/`  
**Chapter Scope:** Chapter 20 — *Attracting Clients (جذب العملاء والمتابعين)*  

#### Deliverables & Visual Specs:

1. **`portfolio-case-study-anatomy.png`** (16:9)
   - **Target Section:** Designing for Your Desired Client Tier (صمم للمجال اللي عايز تجذب عملاؤه)
   - **Target File Path:** `public/assets/attracting-clients/portfolio-case-study-anatomy.png`
   - **Alt Text (EN):** Anatomy of a high-converting UI/UX case study presentation
   - **Alt Text (AR):** تشريح دراسة حالة احترافية لتصميم الواجهات تجذب العملاء رفيعي المستوى
   - **Production Brief:**
     > Vertical infographic breakdown of an effective portfolio case study: (1) Hero screen in clean device frame, (2) The Business Problem & Constraint, (3) User Journey Wireframe sketch, (4) High-Fidelity UI Screen Gallery with annotations, and (5) Client Outcome / Key Metric.

---

### TICKET-20: Chapter 21 — Ending & Looking Forward (1 Deliverable)
**Project:** UI Design Reference  
**Category:** `Assets / Production`  
**Target Directory:** `public/assets/ending/`  
**Chapter Scope:** Chapter 21 — *Ending & Looking Forward (الخاتمة والانطلاق)*  

#### Deliverables & Visual Specs:

1. **`theory-into-daily-craft.png`** (16:9)
   - **Target Section:** Theory vs. Daily Craft (النظرية مقابل الممارسة اليومية)
   - **Target File Path:** `public/assets/ending/theory-into-daily-craft.png`
   - **Alt Text (EN):** The continuous UI design mastery loop: observe, deconstruct, recreate, and ship
   - **Alt Text (AR):** حلقة إتقان التصميم المستمرة: الملاحظة، التفكيك والتحليل، إعادة البناء، ثم الإطلاق
   - **Production Brief:**
     > Circular flywheel diagram showing the 4-step daily design habit: (1) Observe real top-tier apps (Mobbin/App Store) → (2) Deconstruct mathematical rules (grid, typography scale, tokens) → (3) Rebuild pixel-for-pixel in Figma → (4) Ship production code.

---
