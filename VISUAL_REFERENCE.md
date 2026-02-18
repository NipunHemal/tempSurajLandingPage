# 🎨 Hero Album Design System - Visual Reference

## Component Hierarchy

```
HeroAlbum (Container)
│
├── State Management
│   ├── mounted: boolean (hydration safety)
│   ├── selectedImage: BentoItem | null (lightbox control)
│   └── hoveredId: number | null (hover tracking)
│
├── Premium Background Effects
│   ├── Gradient Mesh (primary/5 fade)
│   └── Radial Glow (primary/8 circle)
│
├── Grid Container (12-col, 6-row)
│   │
│   └── BentoCard × 8
│       ├── Background Image (with zoom on hover)
│       ├── Overlay Gradient (black/40 → transparent)
│       ├── Top Content (Status Badge)
│       ├── Bottom Content (Label + Icon)
│       ├── Light Sweep Effect
│       └── Corner Accent Dots
│
└── Lightbox Modal (AnimatePresence wrapper)
    ├── Backdrop (black/95, backdrop-blur)
    ├── Image Viewer
    ├── Close Button
    └── Image Metadata
```

---

## Visual States

### Card State: Default (Unmotored)
```
┌──────────────────────────┐
│                          │
│    [Image Visible]       │
│                          │
│                          │ ← 55% dark overlay
│                          │   Subtle border
│                          │   Soft shadow
└──────────────────────────┘
```

### Card State: Hover
```
┌──────────────────────────┐
│ • • • ↗                  │
│   [Image Zoomed 1.08x]   │
│   Status Badge →         │
│                          │
│    Label ↘              │
│    ━━━━━━              │ ← 30% overlay (lighter)
│    View ◎              │   Bright primary border
│                          │   Enhanced shadow
└──────────────────────────┘
```

### Lightbox State: Open
```
┌─────────────────────────────────────┐
│  [Dark Backdrop + Blur]             │
│                                     │
│      ┌─────────────────────┐        │
│      │   Full-Size Image   │        │
│      │  (Smooth Scaled Up) │  ✕     │
│      └─────────────────────┘        │
│      Label: "Live Teaching Session" │
│                                     │
└─────────────────────────────────────┘
```

---

## Animation Timelines

### Card Entrance (Staggered)
```
0ms      ┌──────────────────────────────────┐
         │ Card 1: Scale 0.92 → 1           │
         │ Opacity 0 → 1, Y: 30 → 0          │
160ms    │        Card 2 starts              │ ← 0.06s delay
320ms    │               Card 3 starts       │
480ms    │                      Card 4 starts│
640ms    │                             Card 5│
800ms    └──────────────────────────────────┘
Duration: 800ms per card
Total to last card: ~830ms
```

### On Hover - Simultaneous Animations
```
TIME    IMAGE ZOOM    BORDER COLOR    STATUS BADGE    LABEL
────────────────────────────────────────────────────────
0ms     scale: 1      white/8         x:-20           y:8
        ↓ 600ms       instantly       ↓ 400ms         ↓ 400ms
600ms   scale: 1.08   primary/50      x: 0            y: 0
        (easeOut)     opacity:1       opacity:1       opacity:1
                      shadow: glow    delay: 100ms    delay: 50ms
```

### Lightbox Open Animation
```
ELEMENT        INITIAL                  FINAL          DURATION
────────────────────────────────────────────────────────────
Backdrop       opacity: 0               opacity: 1     300ms
Image          scale: 0.85, opacity: 0  scale: 1, 1    400ms
Metadata       y: 20, opacity: 0        y: 0, 1        400ms (delay 200ms)
Close Button   opacity: 0               opacity: 1     300ms (delay 150ms)
```

---

## Color Palette

### Primary Brand Colors
```
Primary Color System:
┌─────────────────────┐
│ Primary (Main)      │ ← Used for accent text, icons, bright elements
│ Primary/80          │ ← Slightly darker
│ Primary/50          │ ← Hovered borders, moderate intensity
│ Primary/20          │ ← Light backgrounds, subtle accents
│ Primary/8           │ ← Radial glow background
│ Primary/5           │ ← Mesh gradient background
│ Primary/3           │ ← Fade edge gradient
└─────────────────────┘
```

### Neutral/Overlay Colors
```
Dark Overlays:
┌──────────────────────────┐
│ black/95                 │ ← Lightbox background
│ black/40                 │ ← Card image overlay base
│ black/20                 │ ← Lighter overlay
│ black/0                  │ ← Transparent (fade edge)
└──────────────────────────┘

White/Glass:
┌──────────────────────────┐
│ white/20                 │ ← Light sweep effect
│ white/10                 │ ← Modal metadata background
│ white/8                  │ ← Default border color
│ white/5                  │ ← Glass background
│ white/2                  │ ← Subtle glass tint
└──────────────────────────┘
```

### Shadow Progression
```
No Hover:        shadow-lg              (subtle depth)
Hover Start:     shadow-xl              (slight increase)
Hover End:       shadow-2xl shadow-primary/20  (max depth + color glow)
Lightbox:        shadow-2xl             (maximum depth for image)
```

---

## Spacing & Sizing System

### Responsive Padding
```
Mobile  │ Tablet  │ Desktop
────────┼─────────┼────────
p-3     │  p-5    │  p-5
(0.75rem)(1.25rem)(1.25rem)
```

### Responsive Font Sizes
```
ELEMENT          MOBILE        DESKTOP
────────────────────────────────────
Label            text-[11px]   text-sm (14px)
Status Badge     text-[8px]    text-[10px]
Metadata         text-xs       text-sm
```

### Responsive Border Radius
```
Mobile     │ Desktop
───────────┼──────────
rounded-xl │ rounded-2xl
(0.75rem)  │ (1rem)
```

### Gap System
```
Default gap between cards:
Mobile:  gap-2 (0.5rem)
Desktop: gap-4 (1rem)
```

### Z-Index Stack
```
Layer  │ Z-Index  │ Purpose
───────┼──────────┼─────────────────────
0      │ z-0      │ Background effects
1      │ z-10     │ Image & content
2      │ z-20     │ Overlays & effects
3      │ z-30     │ Light sweep
4      │ z-50     │ Modal & close button
```

---

## Icon Usage

### Status Badges
```
Icon Type: Ping + Solid Dot (dual ring effect)
Size: h-2 w-2 (8px × 8px)
Color: Primary brand color
Animation: Ping expands outward continuously
```

### Priority Icon
```
Icon: Sparkles
Size: h-4 w-4 (16px × 16px)
Color: Primary brand color
Visibility: Always visible, highlighted on hover
Scale: 1 → 1.1 on hover
```

### Label Icons
```
Icon Type: Varies (Monitor, Users, Code2, etc.)
Size Mobile: h-3 w-3 (12px)
Size Desktop: h-4 w-4 (16px)
Color: Primary brand color
Animation: rotate-12 + scale-1.2 on hover
```

### View Icon
```
Icon: Eye
Size: h-4 w-4 (16px × 16px)
Color: Primary brand color
Visibility: Hidden by default, appears on hover
Background: primary/20 with border
Animation: Entrance with y-axis translation
```

---

## Hover Flow Diagram

```
MOUSE ENTERS CARD
      │
      ↓
Set hoveredId = card.id
      │
      ├──→ Border: white/8 → primary/50 (instant)
      ├──→ Shadow: shadow-lg → shadow-2xl + glow (instant)
      │
      ├──→ Image: scale 1 → 1.08 (600ms, easeOut)
      │
      ├──→ Status Badge: slide in from left (400ms, delay 100ms)
      │    └─→ Status icon begins pulsing animation
      │
      ├──→ Label Icon: rotate 0° → 12°, scale 1 → 1.2 (300ms)
      │
      ├──→ Label Text: fade + slide in (400ms, delay 50ms)
      │    └─→ Underline: expand width (500ms)
      │
      ├──→ View Icon: fade + slide in (300ms)
      │
      └──→ Light Sweep: traverse image (1000ms)

MOUSE LEAVES CARD
      │
      ↓
Set hoveredId = null
      │
      └──→ All animations reverse (same durations)
           Elements fade/scale/slide back out
```

---

## Responsive Behavior

### Grid Layout Changes
```
Mobile (< 768px)               Desktop (≥ 768px)
┌─────────────────┐            ┌──────────────────────────────┐
│ 1 (Full width)  │            │    1 (50%)    │ 2 │ 3        │
├─────────────────┤            ├──────────────┼───┼──────────┤
│ 2 (Full width)  │            │    1 (50%)    │ 4 │ 5        │
├─────────────────┤            ├───┬───┬──────┼───┴──────────┤
│ 3 (Full width)  │            │ 6 │ 7 │ 8    │   (cont.)    │
└─────────────────┘            └───┴───┴──────┴──────────────┘
Stacked vertically             Complex grid layout
Single column                  Multi-column responsive
```

### Image Sizes
```
Mobile (max-width: 768px):
  - Image uses: 100vw (full viewport width)
  - Card spans: Full width

Tablet (768px - 1200px):
  - Image uses: 50vw (half viewport width)
  - Card spans: 50% container width

Desktop (> 1200px):
  - Image uses: 33vw (third of viewport)
  - Card spans: Variable (1/12 to 6/12 of grid)
```

---

## Accessibility Features

### Color Contrast
```
Dark Background + White Text:
Black/95 + White = WCAA AA ✓ (contrast ratio > 7:1)

Dark Overlay + White Text:
Black/40 + White = WCAA AA ✓ (contrast ratio > 4.5:1)

Primary Color + Black Background:
Primary + Black = WCAA AA ✓ (good accent color)
```

### Focus & Interaction
```
Interactive Elements:
├── Image Card (click)
│   └── Cursor: pointer
│       Focus: border-primary/50
│       Feedback: immediate
│
├── Lightbox Close (click)
│   └── Scale: 1 → 1.1 on hover
│       Scale: 1.1 → 0.95 on click
│
└── Modal Background (click)
    └── Dismisses lightbox
        Smooth animation out
```

---

## Performance Optimization

### GPU-Accelerated Properties
```
PROPERTY      REASON
──────────────────────────────────
transform     Hardware accelerated
opacity       Doesn't trigger reflow
scale         Transform-based zoom
translate     Transform-based position
rotate        Transform-based rotation

AVOIDED PROPERTIES (cause reflow):
height, width, top, left, padding, margin
```

### Animation Optimization
```
Framer Motion Benefits:
├── GPU acceleration by default
├── Optimized DOM updates
├── Smooth interpolation
├── Memory-efficient cleanup
└── 60fps animation support
```

### Image Optimization
```
Next.js Image Benefits:
├── Auto format selection (WebP, etc.)
├── Responsive srcset generation
├── Lazy loading by default
├── Priority loading for hero image
├── Automatic sizing calculations
└── Blur placeholder support
```

---

## Example: Custom Animation Modification

### Speed Up All Animations
```tsx
// Find these values and decrease durations:

// Entrance speed
transition={{ duration: 0.8, delay: idx * 0.06 }}
// Change to: duration: 0.5, delay: idx * 0.03

// Hover animations
transition={{ duration: 0.6, ease: "easeOut" }}
// Change to: duration: 0.3, ease: "easeOut"

// Content reveal
transition={{ duration: 0.4, delay: 0.05 }}
// Change to: duration: 0.2, delay: 0.02
```

### Make Zoom More Aggressive
```tsx
// Find zoom animation:
animate={{ scale: isHovered ? 1.08 : 1 }}

// Change to:
animate={{ scale: isHovered ? 1.15 : 1 }}  // More aggressive
// Or:
animate={{ scale: isHovered ? 1.04 : 1 }}  // More subtle
```

### Change Primary Color
```tsx
// Tailwind automatically handles:
text-primary          → uses theme primary color
border-primary/50     → uses theme primary with 50% opacity
shadow-primary/20     → uses theme primary with 20% opacity

// Just update your tailwind.config.ts colors!
```

---

## Summary

This visual reference system provides:
- ✅ Complete hierarchy and structure
- ✅ Animation timing and sequencing
- ✅ Color and spacing systems
- ✅ Responsive behavior guide
- ✅ Accessibility standards
- ✅ Performance considerations
- ✅ Customization examples

All elements work together to create a **cohesive, professional, modern experience**. 🎨✨
