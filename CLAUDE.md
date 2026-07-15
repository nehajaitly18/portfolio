# Neha Jaitly — Portfolio Design System

## Philosophy
Editorial restraint at every level. Every spacing value, type size, and color is a deliberate decision — nothing is approximate. Reference points: Stripe, Linear, Ramp. The portfolio itself is a demonstration of Neha's visual standards.

---

## Color Tokens

All tokens are defined in `app/globals.css` `:root` and consumed via CSS custom properties.

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#FFFFFF` | Base page background (hero, content sections) |
| `--bg-warm` | `#F7F6F2` | Warm alternate sections (projects, about bio) |
| `--bg-warm-deep` | `#EFEDE8` | Deeper warm for tertiary sections |
| `--bg-dark` | `#111110` | Dark sections (footer) |
| `--ink` | `#111110` | Primary text |
| `--ink-2` | `#3D3D3C` | Secondary text |
| `--ink-3` | `#787774` | Tertiary / muted |
| `--ink-4` | `#AEADA9` | Placeholder / disabled |
| `--border` | `#E3E2DE` | Default borders |
| `--border-strong` | `#C8C7C2` | Emphasis borders |

**Prohibitions:** No purple. No multi-stop gradients. No Fraunces, Bebas, or decorative display fonts beyond Playfair. No drop shadows. No colored backgrounds on text other than the approved highlight tokens.

---

## Typography

### Typefaces
| Variable | Font | Role |
|---|---|---|
| `--font-playfair` | Playfair Display | Hero headlines, section display type |
| `--font-instrument-serif` | Instrument Serif | Italic display accents (`.text-display`) |
| `--font-inter` | Inter | All body copy, UI text |
| `--font-geist-mono` | Geist Mono | Labels, metadata, mono callouts |
| `--font-lato` | Lato | About page body paragraphs only |

### Type Scale (8px baseline grid)
All sizes use `clamp()` for fluid scaling. Pick from this list only:

| Name | Value | Usage |
|---|---|---|
| `--text-2xs` | 10px | Mono labels, editorial indexes |
| `--text-xs` | 12px | Captions, timestamps |
| `--text-sm` | 14px | Secondary UI, tags |
| `--text-base` | 15–16px | Body copy |
| `--text-md` | 17–20px | Lead body, project descriptions |
| `--text-lg` | `clamp(17px, 1.75vw, 22px)` | Hero tagline |
| `--text-display-sm` | `clamp(32px, 3.5vw, 48px)` | Section headings |
| `--text-display-md` | `clamp(40px, 4.8vw, 68px)` | Hero headline |
| `--text-display-lg` | `clamp(52px, 7vw, 96px)` | Footer CTA |

### Rules
- Hero display: **Playfair Display, italic, 400 weight**
- Body: Inter, 300–400 weight, never bold
- Labels: Geist Mono, 10–12px, `letter-spacing: 0.18–0.22em`, uppercase
- Line heights: display `1.08–1.12`, body `1.6–1.7`, tight UI `1.3`
- Tracking: display `−0.025em`, body `0`, mono `+0.15–0.22em`

---

## Spacing (8px Grid)

All spacing is a multiple of 8px. Use these values only:

```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 96 · 128 · 160 · 192 · 240
```

CSS variables for semantic use:
- `--space-section-y`: 96px (desktop), 64px (mobile) — vertical section padding
- `--space-section-y-lg`: 160px (desktop) — large feature sections
- `--page-gutter`: 80px (desktop), 48px (tablet), 24px (mobile) — horizontal page padding
- `--max-content`: 1200px — max content container width

---

## Grid & Layout

- **Base unit**: 8px
- **Max content width**: 1200px, centered (`max-w-[1200px] mx-auto`)
- **Hero text container**: `max-w-[1080px] mx-auto` (wider for display type)
- **Body text column**: `max-w-2xl` (672px) or `max-w-3xl` (768px) for prose
- **Project grid**: 2 columns at sm+, 1 column mobile (`grid-cols-1 sm:grid-cols-2`)
- **Horizontal gutters**: `px-6 md:px-12 lg:px-20`

---

## Animation

### Easing (defined as CSS vars in globals.css)
| Variable | Curve | Use |
|---|---|---|
| `--ease-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances, reveals |
| `--ease-smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | State transitions |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful doodle elements |

### Duration Scale
- `150ms` — hover state transitions
- `300–350ms` — UI feedback (expand, collapse)
- `600–700ms` — element transitions
- `900–1000ms` — hero reveals, page-level entrances

### Patterns
- **Line reveal**: `overflow: hidden` wrapper + `motion.div` from `y: "108%"` → `y: "0%"` with `--ease-expo`
- **Fade-up**: `opacity: 0, y: 12` → `opacity: 1, y: 0` with `--ease-smooth`
- **Scale in**: `scale: 0.68` → `scale: 1` with spring `stiffness: 280, damping: 18`
- **Rule draw**: `scaleX: 0` → `scaleX: 1` with `transformOrigin: left`
- Stagger increment: 80–100ms between siblings

---

## Section Architecture

Each section has a distinct surface — never two consecutive sections with identical backgrounds.

| Section | Background | Texture |
|---|---|---|
| Hero | `--bg` (#FFFFFF) | None (clean white) |
| Projects | `--bg-warm` (#F7F6F2) | Noise grain 0.028 opacity |
| About intro | `--bg` (#FFFFFF) | None |
| Experience | `--bg-warm` (#F7F6F2) | Noise grain 0.028 opacity |
| Footer | `--bg-dark` (#111110) | Noise grain 0.035 opacity |

Section separators: 1px `var(--border)` lines. No colored separator bars.

---

## Component Conventions

### Section label pattern
```tsx
<span className="section-label">Selected Work</span>
// Renders as: 11px Geist Mono, uppercase, letter-spacing 0.18em, color var(--ink-4)
```

### Scroll reveal pattern
```tsx
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: "-80px" });
// motion.div: initial={{ opacity: 0, y: 20 }}, animate={inView ? { opacity: 1, y: 0 } : {}}
```

### Page gutter
Every top-level section: `max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20`

---

## Prohibitions
- ❌ Purple in any shade
- ❌ Multi-stop color gradients (text or background)
- ❌ Box shadows (use borders instead)
- ❌ Rounded corners > 4px on cards (use `rounded-[3px]` or `rounded-sm`)
- ❌ Icon libraries (Lucide, Heroicons, etc.) — use inline SVG or Unicode arrows
- ❌ Bouncy spring animations on text or layout elements
- ❌ Hover states that change layout (shift, push, resize)
- ❌ Font weights above 500 for body copy
- ❌ Absolute pixel sizes without `clamp()` for display type
- ❌ Background colors on sections that haven't been approved above
