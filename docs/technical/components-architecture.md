# Components Architecture

This document outlines the clean architecture patterns used for organizing components in the portfolio project.

## Directory Structure

```
components/
├── layout/                  # Global layout components
│   ├── BackgroundEffects.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── index.ts
│
├── sections/                # Page-specific sections
│   ├── home/                # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── TechMarqueeSection.tsx
│   │   ├── HobiSection.tsx
│   │   ├── ShowcaseProjectsSection.tsx
│   │   ├── BlogPreviewSection.tsx
│   │   └── index.ts
│   │
│   ├── about/               # About page sections
│   │   ├── BioSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   └── index.ts
│   │
│   ├── projects/            # Projects page sections (future)
│   ├── blog/                # Blog page sections (future)
│   └── index.ts             # Main barrel export
│
└── ui/                      # Reusable UI primitives
    ├── Button.tsx
    ├── Card.tsx
    └── index.ts
```

---

## Design Principles

### 1. Feature-Based Organization

Components are organized by **feature/page** rather than by type (e.g., "buttons", "forms").

**Why?**
- Co-location: Related components live together
- Scalability: Easy to add new pages without cluttering folders
- Discoverability: Find all components for a feature in one place

```
✅ Good: sections/about/BioSection.tsx
❌ Bad:  sections/BioSection.tsx (mixed with other pages)
```

### 2. Barrel Exports

Each folder has an `index.ts` that re-exports all public components.

**Why?**
- Clean imports: `import { HeroSection } from '@/components/sections'`
- Encapsulation: Internal components can be hidden
- Refactoring: Move files without changing import paths

```typescript
// components/sections/home/index.ts
export { HeroSection } from './HeroSection';
export { HobiSection } from './HobiSection';
// ...
```

### 3. Component Categories

| Category | Location | Purpose | Example |
|----------|----------|---------|---------|
| Layout | `components/layout/` | Global, appears on all pages | Navbar, Footer |
| Sections | `components/sections/{page}/` | Page-specific containers | HeroSection, BioSection |
| UI | `components/ui/` | Reusable primitives | Button, Card, Input |

### 4. Naming Conventions

- **Sections**: `{Name}Section.tsx` (e.g., `HeroSection.tsx`)
- **UI Components**: `{Name}.tsx` (e.g., `Button.tsx`, `Card.tsx`)
- **Layout**: Descriptive name (e.g., `Navbar.tsx`, `Footer.tsx`)
- **Props Interface**: `{ComponentName}Props`

---

## Import Patterns

### From App Pages

```tsx
// app/page.tsx (Home)
import { HeroSection, HobiSection } from '@/components/sections';

// app/about/page.tsx
import { BioSection, ExperienceSection } from '@/components/sections/about';
```

### Direct Feature Import (Alternative)

```tsx
// When you need specific types or internal access
import { HeroSection, HeroSectionProps } from '@/components/sections/home';
```

---

## Adding New Components

### Adding a New Section

1. Create file in appropriate folder:
   ```
   components/sections/{page}/{Name}Section.tsx
   ```

2. Export from folder's `index.ts`:
   ```typescript
   export { NewSection } from './NewSection';
   ```

3. Export from main `sections/index.ts`:
   ```typescript
   export { NewSection } from './{page}';
   ```

### Adding a New Page

1. Create folder: `components/sections/{newpage}/`
2. Add sections: `{Name}Section.tsx`
3. Create barrel: `index.ts`
4. Export from `sections/index.ts`
5. Create page: `app/{newpage}/page.tsx`

---

## Best Practices

### ✅ Do

- Keep sections focused on one responsibility
- Use TypeScript interfaces for all props
- Export types alongside components
- Add JSDoc comments for complex components
- Use `'use client'` only when necessary

### ❌ Don't

- Mix components from different pages in one folder
- Create deeply nested component hierarchies
- Duplicate code across sections (extract to `ui/`)
- Use generic names like `Component1.tsx`

---

## Data Separation

Components should not contain hardcoded content. Data lives in:

```
lib/
└── data/
    ├── profile.ts      # Personal info
    ├── skills.ts       # Skills data
    ├── experience.ts   # Work/education history
    ├── projects.ts     # Project data
    └── index.ts        # Barrel export
```

This enables:
- Easy content updates without code changes
- Future CMS integration
- Type-safe data access
