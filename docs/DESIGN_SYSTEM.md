# 🎨 Design System Documentation

> Complete reference for the design tokens, CSS variables, and styling conventions used in this project.

## Table of Contents

1. [Overview](#overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Border Radius](#border-radius)
6. [Shadows](#shadows)
7. [Transitions](#transitions)
8. [Z-Index Layers](#z-index-layers)
9. [Utility Classes](#utility-classes)
10. [Dark Mode](#dark-mode)
11. [Responsive Design](#responsive-design)

---

## Overview

The Design System is implemented using **CSS Custom Properties** (CSS Variables) in `app/globals.css`. This approach provides:

- 🎯 **Consistency** - Single source of truth for design tokens
- 🌙 **Theme Support** - Easy dark mode switching
- ⚡ **Performance** - No JavaScript runtime for theming
- 🔧 **Maintainability** - Change once, update everywhere

### Usage in Components

```tsx
// Using Tailwind with CSS variables
<div className="bg-[var(--background)] text-[var(--foreground)]">

// Or with the @theme configuration in globals.css
<div className="bg-background text-foreground">
```

---

## Color System

### Color Palette

The palette uses a **50-950 scale** for maximum flexibility:

#### Primary Colors (Blue)

| Token | Hex | Preview | Usage |
|-------|-----|---------|-------|
| `--color-primary-50` | `#eff6ff` | ![#eff6ff](https://via.placeholder.com/20/eff6ff/eff6ff) | Lightest backgrounds |
| `--color-primary-100` | `#dbeafe` | ![#dbeafe](https://via.placeholder.com/20/dbeafe/dbeafe) | Light backgrounds |
| `--color-primary-200` | `#bfdbfe` | ![#bfdbfe](https://via.placeholder.com/20/bfdbfe/bfdbfe) | Hover states (light) |
| `--color-primary-300` | `#93c5fd` | ![#93c5fd](https://via.placeholder.com/20/93c5fd/93c5fd) | Borders |
| `--color-primary-400` | `#60a5fa` | ![#60a5fa](https://via.placeholder.com/20/60a5fa/60a5fa) | Icons, hover (dark) |
| `--color-primary-500` | `#3b82f6` | ![#3b82f6](https://via.placeholder.com/20/3b82f6/3b82f6) | Primary (dark mode) |
| `--color-primary-600` | `#2563eb` | ![#2563eb](https://via.placeholder.com/20/2563eb/2563eb) | **Primary (light mode)** |
| `--color-primary-700` | `#1d4ed8` | ![#1d4ed8](https://via.placeholder.com/20/1d4ed8/1d4ed8) | Primary hover |
| `--color-primary-800` | `#1e40af` | ![#1e40af](https://via.placeholder.com/20/1e40af/1e40af) | Dark accent |
| `--color-primary-900` | `#1e3a8a` | ![#1e3a8a](https://via.placeholder.com/20/1e3a8a/1e3a8a) | Very dark |
| `--color-primary-950` | `#172554` | ![#172554](https://via.placeholder.com/20/172554/172554) | Darkest |

#### Accent Colors (Cyan)

| Token | Hex | Preview | Usage |
|-------|-----|---------|-------|
| `--color-accent-400` | `#22d3ee` | ![#22d3ee](https://via.placeholder.com/20/22d3ee/22d3ee) | Light accent |
| `--color-accent-500` | `#06b6d4` | ![#06b6d4](https://via.placeholder.com/20/06b6d4/06b6d4) | **Default accent** |
| `--color-accent-600` | `#0891b2` | ![#0891b2](https://via.placeholder.com/20/0891b2/0891b2) | Accent hover |

#### Neutral Colors (Zinc)

| Token | Hex | Preview | Usage |
|-------|-----|---------|-------|
| `--color-neutral-50` | `#fafafa` | ![#fafafa](https://via.placeholder.com/20/fafafa/fafafa) | **Light background** |
| `--color-neutral-100` | `#f4f4f5` | ![#f4f4f5](https://via.placeholder.com/20/f4f4f5/f4f4f5) | Alt background |
| `--color-neutral-200` | `#e4e4e7` | ![#e4e4e7](https://via.placeholder.com/20/e4e4e7/e4e4e7) | **Borders (light)** |
| `--color-neutral-300` | `#d4d4d8` | ![#d4d4d8](https://via.placeholder.com/20/d4d4d8/d4d4d8) | Border hover |
| `--color-neutral-400` | `#a1a1aa` | ![#a1a1aa](https://via.placeholder.com/20/a1a1aa/a1a1aa) | Muted text |
| `--color-neutral-500` | `#71717a` | ![#71717a](https://via.placeholder.com/20/71717a/71717a) | Placeholder |
| `--color-neutral-600` | `#52525b` | ![#52525b](https://via.placeholder.com/20/52525b/52525b) | **Secondary text** |
| `--color-neutral-700` | `#3f3f46` | ![#3f3f46](https://via.placeholder.com/20/3f3f46/3f3f46) | Dark border |
| `--color-neutral-800` | `#27272a` | ![#27272a](https://via.placeholder.com/20/27272a/27272a) | Dark surface |
| `--color-neutral-900` | `#18181b` | ![#18181b](https://via.placeholder.com/20/18181b/18181b) | **Primary text** |
| `--color-neutral-950` | `#09090b` | ![#09090b](https://via.placeholder.com/20/09090b/09090b) | **Dark background** |

#### Semantic Colors

| Token | Hex | Preview | Usage |
|-------|-----|---------|-------|
| `--color-success` | `#22c55e` | ![#22c55e](https://via.placeholder.com/20/22c55e/22c55e) | Success states |
| `--color-warning` | `#f59e0b` | ![#f59e0b](https://via.placeholder.com/20/f59e0b/f59e0b) | Warning states |
| `--color-error` | `#ef4444` | ![#ef4444](https://via.placeholder.com/20/ef4444/ef4444) | Error states |
| `--color-info` | `#3b82f6` | ![#3b82f6](https://via.placeholder.com/20/3b82f6/3b82f6) | Info states |

### Theme Variables

These semantic variables automatically switch between light/dark modes:

```css
/* Background */
--background              /* Main page background */
--background-secondary    /* Card, elevated surfaces */
--background-tertiary     /* Subtle backgrounds */

/* Text */
--foreground              /* Primary text */
--foreground-secondary    /* Secondary text */
--foreground-muted        /* Placeholder, hints */

/* Interactive */
--primary                 /* Primary actions */
--primary-hover           /* Primary hover state */
--primary-foreground      /* Text on primary */

--accent                  /* Secondary actions */
--accent-hover            /* Accent hover state */

/* Borders */
--border                  /* Default borders */
--border-hover            /* Border hover state */

/* Cards */
--card                    /* Card background */
--card-hover              /* Card hover background */
--card-foreground         /* Card text */

/* Inputs */
--input                   /* Input background */
--input-border            /* Input border */
--input-focus             /* Input focus ring */

/* Focus */
--ring                    /* Focus ring color */
--ring-offset             /* Focus ring offset bg */
```

---

## Typography

### Font Families

```css
--font-sans: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
--font-mono: var(--font-geist-mono), ui-monospace, monospace;
```

### Font Sizes

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-xs` | 0.75rem (12px) | 1rem | Captions, labels, footnotes |
| `--text-sm` | 0.875rem (14px) | 1.25rem | Small text, metadata |
| `--text-base` | 1rem (16px) | 1.5rem | Body text (default) |
| `--text-lg` | 1.125rem (18px) | 1.75rem | Large body text |
| `--text-xl` | 1.25rem (20px) | 1.75rem | Small headings |
| `--text-2xl` | 1.5rem (24px) | 2rem | Section subtitles |
| `--text-3xl` | 1.875rem (30px) | 2.25rem | Section titles |
| `--text-4xl` | 2.25rem (36px) | 2.5rem | Page titles |
| `--text-5xl` | 3rem (48px) | 1 | Hero subtitle |
| `--text-6xl` | 3.75rem (60px) | 1 | Hero title (mobile) |
| `--text-7xl` | 4.5rem (72px) | 1 | Hero title (desktop) |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-tight` | 1.1 | Large headings |
| `--leading-snug` | 1.25 | Small headings |
| `--leading-normal` | 1.5 | Body text (default) |
| `--leading-relaxed` | 1.625 | Long paragraphs |

### Font Weights

Use Tailwind classes:
- `font-normal` (400) - Body text
- `font-medium` (500) - Emphasis
- `font-semibold` (600) - Subtitles, buttons
- `font-bold` (700) - Headings

### Typography Examples

```tsx
// Hero title
<h1 className="text-5xl md:text-7xl font-bold leading-tight">
  Hello World
</h1>

// Section title
<h2 className="text-3xl font-bold">
  About Me
</h2>

// Body text
<p className="text-base text-foreground-secondary leading-relaxed">
  Lorem ipsum dolor sit amet...
</p>

// Caption
<span className="text-xs text-foreground-muted">
  Last updated: Dec 2024
</span>
```

---

## Spacing

Based on a **4px (0.25rem) unit** system:

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--space-1` | 0.25rem | 4px | Inline icon gaps |
| `--space-2` | 0.5rem | 8px | Tight spacing |
| `--space-3` | 0.75rem | 12px | Small gaps |
| `--space-4` | 1rem | 16px | **Default gap** |
| `--space-5` | 1.25rem | 20px | Medium gap |
| `--space-6` | 1.5rem | 24px | **Component padding** |
| `--space-8` | 2rem | 32px | Large gap |
| `--space-10` | 2.5rem | 40px | Section gap |
| `--space-12` | 3rem | 48px | Large section gap |
| `--space-16` | 4rem | 64px | **Section padding** |
| `--space-20` | 5rem | 80px | Large section padding |
| `--space-24` | 6rem | 96px | XL section padding |

### Spacing Guidelines

```tsx
// Icon + Text gap
<button className="flex items-center gap-2">
  <Icon /> Label
</button>

// Card internal padding
<div className="p-6">

// Section padding
<section className="py-16 md:py-24">

// Between elements
<div className="space-y-4">
```

---

## Border Radius

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--radius-sm` | 0.25rem | 4px | Subtle rounding |
| `--radius-base` | 0.5rem | 8px | **Buttons, inputs** |
| `--radius-md` | 0.75rem | 12px | **Cards** |
| `--radius-lg` | 1rem | 16px | Large cards |
| `--radius-xl` | 1.5rem | 24px | Featured items |
| `--radius-2xl` | 2rem | 32px | Hero elements |
| `--radius-full` | 9999px | ∞ | Pills, avatars |

### Border Radius Examples

```tsx
// Button
<button className="rounded-lg"> // 8px

// Card
<div className="rounded-xl"> // 12-16px

// Avatar
<img className="rounded-full">

// Tag/Badge
<span className="rounded-full px-3 py-1">
```

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle elevation |
| `--shadow-base` | `0 1px 3px 0 rgb(0 0 0 / 0.1)...` | Default shadow |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1)...` | Cards |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1)...` | Dropdowns, modals |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1)...` | Large modals |
| `--shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | Hero elements |

### Shadow Examples

```tsx
// Card with shadow
<div className="shadow-md hover:shadow-lg transition-shadow">

// Elevated button
<button className="shadow-sm hover:shadow-md">

// Modal
<div className="shadow-xl">
```

---

## Transitions

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-fast` | 150ms | Micro interactions |
| `--transition-base` | 200ms | **Default** |
| `--transition-slow` | 300ms | Page transitions |
| `--transition-slower` | 500ms | Complex animations |

### Easings

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General purpose |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Entering elements |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Exiting elements |

### Transition Examples

```tsx
// Default transition
<button className="transition-colors duration-200">

// Hover card
<div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

// Custom with CSS variable
<div style={{ transition: `all var(--transition-base) var(--ease-default)` }}>
```

---

## Z-Index Layers

| Token | Value | Usage |
|-------|-------|-------|
| `--z-dropdown` | 10 | Dropdown menus |
| `--z-sticky` | 20 | Sticky headers |
| `--z-fixed` | 30 | Fixed elements |
| `--z-modal-backdrop` | 40 | Modal overlay |
| `--z-modal` | 50 | Modal content |
| `--z-popover` | 60 | Popovers, tooltips |
| `--z-tooltip` | 70 | Tooltip (highest) |

### Z-Index Usage

```tsx
// Sticky navbar
<nav className="sticky top-0 z-20">

// Modal backdrop
<div className="fixed inset-0 z-40 bg-black/50">

// Modal content
<div className="fixed z-50">
```

---

## Utility Classes

Custom utility classes defined in `globals.css`:

### Container

```css
.container {
  width: 100%;
  max-width: var(--container-max); /* 1280px */
  margin-inline: auto;
  padding-inline: var(--container-padding); /* 1.5rem */
}
```

```tsx
<div className="container">
  {/* Content centered with max-width */}
</div>
```

### Section Padding

```css
.section-padding {
  padding-block: var(--space-16); /* 64px mobile */
}

@media (min-width: 768px) {
  .section-padding {
    padding-block: var(--space-24); /* 96px desktop */
  }
}
```

```tsx
<section className="section-padding">
  <div className="container">
    {/* Section content */}
  </div>
</section>
```

### Text Gradient

```css
.text-gradient {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

```tsx
<h1 className="text-gradient text-5xl font-bold">
  Gradient Text
</h1>
```

### Hover Card

```css
.hover-card {
  transition: transform var(--transition-base) var(--ease-default),
              box-shadow var(--transition-base) var(--ease-default);
}

.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

```tsx
<div className="hover-card rounded-xl bg-card p-6">
  {/* Card content */}
</div>
```

### Glass Effect

```css
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.dark .glass {
  background: rgba(24, 24, 27, 0.8);
}
```

```tsx
<nav className="glass sticky top-0">
  {/* Navbar with glass effect */}
</nav>
```

---

## Dark Mode

### How It Works

Dark mode is implemented using:

1. **CSS class** (`.dark`) - For manual toggle
2. **data attribute** (`[data-theme="dark"]`) - Alternative
3. **System preference** (`prefers-color-scheme`) - Auto detection

### Theme Variables Change

| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--background` | `#fafafa` | `#09090b` |
| `--foreground` | `#18181b` | `#fafafa` |
| `--primary` | `#2563eb` | `#3b82f6` |
| `--card` | `#ffffff` | `#18181b` |
| `--border` | `#e4e4e7` | `#3f3f46` |

### Implementing Theme Toggle

```tsx
// hooks/useTheme.ts
export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
```

---

## Responsive Design

### Breakpoints

| Breakpoint | Min Width | CSS Variable |
|------------|-----------|--------------|
| `sm` | 640px | Small devices |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Extra large |

### Mobile-First Approach

Always write mobile styles first, then add responsive modifiers:

```tsx
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Mobile: Stack, Desktop: Side by side
<div className="flex flex-col md:flex-row">

// Mobile: Smaller text, Desktop: Larger
<h1 className="text-3xl md:text-5xl lg:text-7xl">

// Mobile: Full padding, Desktop: More padding
<section className="py-12 md:py-16 lg:py-24">
```

### Container Width

```css
--container-max: 1280px;
--container-padding: 1.5rem; /* 24px */
```

---

## Quick Reference Card

```
╔══════════════════════════════════════════════════════╗
║                    DESIGN TOKENS                      ║
╠══════════════════════════════════════════════════════╣
║  COLORS                                               ║
║  Primary: var(--primary)     Accent: var(--accent)   ║
║  Background: var(--background)                        ║
║  Foreground: var(--foreground)                        ║
║  Border: var(--border)       Card: var(--card)       ║
╠══════════════════════════════════════════════════════╣
║  SPACING (4px base)                                   ║
║  4: 16px | 6: 24px | 8: 32px | 16: 64px | 24: 96px   ║
╠══════════════════════════════════════════════════════╣
║  TYPOGRAPHY                                           ║
║  sm: 14px | base: 16px | lg: 18px | xl: 20px         ║
║  2xl: 24px | 3xl: 30px | 4xl: 36px | 5xl: 48px       ║
╠══════════════════════════════════════════════════════╣
║  BORDER RADIUS                                        ║
║  sm: 4px | base: 8px | md: 12px | lg: 16px | full    ║
╠══════════════════════════════════════════════════════╣
║  SHADOWS                                              ║
║  sm | base | md | lg | xl | 2xl                      ║
╠══════════════════════════════════════════════════════╣
║  TRANSITIONS                                          ║
║  fast: 150ms | base: 200ms | slow: 300ms             ║
╚══════════════════════════════════════════════════════╝
```

---

*Last updated: December 2024*
