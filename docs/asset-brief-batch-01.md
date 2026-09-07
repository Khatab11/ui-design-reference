# Asset Brief — Batch 01

16 images. Design them in Claude Design, export PNG at 2x, drop into:

```
assets/introduction/
assets/basics/
```

Filenames must match exactly — the site looks them up by name.

---

## Shared style prompt

Paste this **first** in Claude Design, then paste an image prompt after it. It keeps all 16 images consistent.

```
You are creating explanatory diagrams for a UI design course reference site.
Every image in this set must share one visual language:

- 1600 × 900 px canvas unless stated otherwise, transparent or #FAFAF9 background
- Flat vector. No 3D, no photorealism, no drop shadows except where the diagram
  is literally about shadows.
- Palette: neutral warm greys (#1C1917, #78716C, #D6D3D1, #F5F5F4) plus ONE
  accent used sparingly for the thing being pointed at: #B45309
- Typeface: Inter. Labels 24px medium, annotations 18px regular, all sentence case.
- Annotation lines are 1px, straight or right-angled, never curved.
- Generous white space. Nothing touches the canvas edge — minimum 64px margin.
- No emoji, no icons unless the diagram is about icons, no decorative flourishes.
- The diagram must be readable at 400px wide on a phone.

Confirm you have this, then wait for the specific image brief.
```

---

## Chapter: Introduction → `assets/introduction/`

### 1. `ui-inside-ux.png`
```
Two concentric circles on a plain background. A large outer circle labelled "UX"
and a smaller circle nested inside it labelled "UI". The outer circle is an
outline in neutral grey; the inner circle is filled in the accent colour with
white label text. Nothing else in the frame. 16:9.
```

### 2. `brand-to-ui-flow.png`
```
A left-to-right three-step flow diagram. Three rounded rectangles connected by
solid arrows: "Research" → "Brand Design" → "UI Design". Below them, a dashed
arrow curves from "Research" directly to "UI Design", labelled "limited budget"
in smaller text. The solid path is the recommended one — render it in the accent
colour, the dashed shortcut in neutral grey. 16:9.
```

### 3. `pretty-vs-usable.png`
```
Two mobile phone screens side by side, same content in both, labelled "Pretty"
and "Usable" underneath.

Left screen (Pretty): a food app home screen that is over-designed — a heavy
purple-to-pink gradient background, a glowing pill button, thin light-grey text
on a light background, decorative sparkles, three competing accent colours.

Right screen (Usable): identical content and layout structure — same headline,
same list of three items, same button position — but restrained: near-white
background, near-black text at strong contrast, one solid accent button, clear
size difference between headline and body.

The point is that the content is identical and only the treatment differs. 16:9.
```

### 4. `delivery-screen-comparison.png`
```
Two versions of the same website hero section, side by side, each inside a
desktop browser frame outline.

Both contain the headline "We can deliver food everywhere", one line of body
text, and one button.

Left version: headline in a light grey that is hard to read against the
background, body text nearly the same size as the headline so there is no
hierarchy, and a thin outlined button with tiny text that does not look
clickable.

Right version: headline in near-black at a clearly larger size, body text
noticeably smaller in mid-grey, and a solid accent-filled button with generous
padding.

No labels needed — the difference should be self-evident. 16:9.
```

---

## Chapter: The Basics → `assets/basics/`

### 5. `px-vs-pt.png`
```
A two-column comparison with an arrow between the columns.

Left column, stacked: an iPhone outline labelled "1125 × 2436 px" and a MacBook
outline labelled "1600 × 2560 px". Draw these larger.

Right column, stacked: the same two device outlines drawn noticeably smaller,
labelled "375 × 812 pt" and "900 × 1440 pt".

A single horizontal arrow between the columns, labelled "we design here" pointing
right. Outlines only — the devices are empty frames with no screen content. 16:9.
```

### 6. `size-position.png`
```
A technical-drawing style diagram. A screen frame (portrait phone proportion,
positioned left of centre) containing two shapes:

- a square labelled "W: 64 pt / H: 64 pt"
- a wide rectangle labelled "W: 128 pt / H: 64 pt"

Add dimension lines with arrowheads on the width and height of each shape.

Then add dashed measurement lines from the screen's left edge to each shape,
labelled "X: 56 pt" and "X: 282 pt", and from the screen's top edge, labelled
"Y: 56 pt" and "Y: 142 pt".

Thin 1px lines throughout. Shapes filled flat neutral grey, all annotation lines
and labels in the accent colour. 16:9.
```

### 7. `rotation-fill.png`
```
Two labelled rows.

Top row, "Rotation": the same square shown three times, at 0°, 45° and 60°.
Label each with its value underneath.

Bottom row, "Fill": four squares of the same size showing four fill types —
(1) solid colour, (2) linear gradient, (3) a photographic image, (4) the same
photographic image with a dark gradient overlay on top. Label each underneath:
"Colour", "Gradient", "Image", "Image + gradient overlay". 16:9.
```

### 8. `stroke-types.png`
```
Two labelled groups.

Top group: three identical squares labelled "Inner stroke", "Centered stroke",
"Outer stroke". In each, draw a faint dashed guide outline showing where the
shape's true bounds are, and a thick solid stroke positioned inside / straddling /
outside that guide so the difference is unmistakable.

Bottom group: two squares side by side with dimension lines above them, labelled
"No stroke: 64 × 64 pt" and "Outer stroke: 68 × 68 pt". The second square must be
visibly larger. 16:9.
```

### 9. `border-radius.png`
```
Two rows of three squares, drawn large — at least 240px each — so the corners
are clearly readable.

Top row, "Border radius": squares with radius 0 pt, 10 pt, 20 pt. Label each.

Bottom row, "Corner smoothing": three squares all with the same 20 pt radius but
corner smoothing at 0%, 60% and 100%, so the squircle effect is visible. Label
each. If the difference is subtle, zoom in on one corner of each as an inset
detail. 16:9.
```

### 10. `shadow-values.png`
```
Two rows of three rounded squares on a light neutral background (#F5F5F4 —
shadows must be clearly visible). Each square is white with a rounded corner.
Print the four shadow values under each square in small monospace-style text.

Row 1 — varying X:
  X 0, Y 4, Blur 4, Opacity 25%
  X -4, Y 4, Blur 4, Opacity 25%
  X 4, Y 4, Blur 4, Opacity 25%

Row 2 — varying Y and blur:
  X 0, Y 30, Blur 15, Opacity 25%
  X 0, Y 35, Blur 60, Opacity 25%
  X 0, Y 0, Blur 30, Opacity 25%

Render the shadows accurately to these values — this diagram is the lesson. 16:9.
```

### 11. `blur-types.png`
```
Two labelled sections.

Top, "Layer blur": the same image-filled square three times, labelled "0", "20",
"40", with progressively stronger blur applied to the whole square.

Bottom, "Background blur": a colourful photographic background filling the width,
with a semi-transparent white rounded rectangle sitting on top of it. Everything
visible behind the rectangle is blurred; everything outside it is sharp. Inside
the rectangle, small text reading "Background blur: 12". 16:9.
```

### 12. `hierarchy-size.png`
```
Two lines of text, left-aligned, stacked with generous spacing on an otherwise
completely empty background.

Line 1, large and bold, near-black: "You will read this first"
Line 2, roughly one third the size, regular weight, mid-grey: "And you will read
this text second"

Nothing else in the frame at all. The emptiness is the point. 16:9.
```

### 13. `hierarchy-color.png`
```
Two versions of the same card layout side by side, labelled "No hierarchy" and
"Clear hierarchy".

Both cards contain: a heading, two lines of body text, a small tag, and two
buttons.

Left card: every single element is a different saturated colour — red heading,
green body, blue tag, orange button, purple second button. Visually noisy with
no focal point.

Right card: near-black heading, mid-grey body, muted grey tag, one solid accent
primary button, one plain text secondary button. One obvious focal point.

Same layout, same copy, same spacing in both. 16:9.
```

### 14. `proximity-alignment.png`
```
A two-panel diagram split by a thin vertical divider.

Left panel, "Proximity": a field of identical small circles. Two tight clusters
of five circles each sit close together; one single circle sits well away from
both. The lone circle is in the accent colour, the rest neutral grey.

Right panel, "Alignment": a horizontal row of eight identical circles sitting on
a shared invisible baseline, except one circle pushed noticeably above the line.
The off-line circle is in the accent colour. Draw a faint dashed baseline through
the aligned ones. 16:9.
```

### 15. `common-region.png`
```
Two versions of the same content side by side.

Both contain the heading "Healthy lifestyle:" and beneath it, in smaller lighter
text, "The Basics".

Left version: the two lines float on the plain background with nothing around
them.

Right version: the identical two lines sit inside a rounded rectangle with a
1px border and generous internal padding.

Identical type, size, spacing and position in both — the only difference is the
box. 16:9.
```

### 16. `figure-ground.png`
```
Two mobile phone screens side by side, labelled "Clear" and "Confusing".

Left screen: a soft light-grey background with a white rounded card floating on
it, containing a small image placeholder, a heading and a button. The card
unmistakably reads as foreground.

Right screen: the identical white card, but the background is now a busy,
high-contrast, saturated photograph with no overlay. The card's edges compete
with the background detail and the hierarchy collapses. 16:9.
```

---

## After you export

1. Put files in `assets/introduction/` and `assets/basics/`.
2. Reload the site — placeholders swap for real images automatically.
3. Anything still showing a dashed box means the filename doesn't match.
