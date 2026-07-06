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
│   │   ├── AboutSummarySection.tsx
│   │   ├── HobiSection.tsx
│   │   ├── EducationSection.tsx      # also used on /about
│   │   ├── WorkExperienceSection.tsx # also used on /about
│   │   ├── ShowcaseProjectsSection.tsx
│   │   ├── BlogPreviewSection.tsx    # exists, not used on Home
│   │   └── index.ts
│   │
│   ├── about/               # About page sections
│   │   ├── BioSection.tsx
│   │   ├── SkillsSection.tsx         # exists, not used on /about
│   │   ├── AchievementsSection.tsx
│   │   ├── EducationSection.tsx      # re-exported from about/
│   │   ├── WorkExperienceSection.tsx
│   │   ├── ExperienceSection.tsx     # legacy combined section
│   │   └── index.ts
│   │
│   ├── projects/            # Projects page sections
│   │   ├── ProjectsHeaderSection.tsx
│   │   ├── ProjectsGridSection.tsx
│   │   ├── data/                     # markdown case study drafts (not wired)
│   │   └── index.ts
│   │
│   └── index.ts             # Main barrel export
│
└── ui/                      # Reusable UI primitives
    ├── Button.tsx
    ├── Card.tsx
    ├── Badge.tsx
    ├── LanguageSwitcher.tsx
    ├── ProjectModal.tsx     # Project detail popup
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
export { ShowcaseProjectsSection } from './ShowcaseProjectsSection';
// ...
```

### 3. Component Categories

| Category | Location | Purpose | Example |
|----------|----------|---------|---------|
| Layout | `components/layout/` | Global, appears on all pages | Navbar, Footer, BackgroundEffects |
| Sections | `components/sections/{page}/` | Page-specific containers | HeroSection, ProjectsGridSection |
| UI | `components/ui/` | Reusable primitives & overlays | Button, Badge, ProjectModal |

### 4. Naming Conventions

- **Sections**: `{Name}Section.tsx` (e.g., `HeroSection.tsx`)
- **UI Components**: `{Name}.tsx` (e.g., `Button.tsx`, `ProjectModal.tsx`)
- **Layout**: Descriptive name (e.g., `Navbar.tsx`, `Footer.tsx`)
- **Props Interface**: `{ComponentName}Props`
- **Local sub-components**: Defined in same file (e.g., `ProjectCard` inside `ProjectsGridSection.tsx`)

---

## Import Patterns

### From App Pages

```tsx
// app/[locale]/page.tsx (Home)
import {
    HeroSection,
    TechMarqueeSection,
    AboutSummarySection,
    HobiSection,
    EducationSection,
    WorkExperienceSection,
    ShowcaseProjectsSection,
    AchievementsSection,
} from '@/components/sections';

// app/[locale]/about/page.tsx
import { BioSection, EducationSection, WorkExperienceSection, AchievementsSection } from '@/components/sections/about';

// app/[locale]/projects/page.tsx
import { ProjectsHeaderSection, ProjectsGridSection } from '@/components/sections/projects';
```

### Direct Feature Import (Alternative)

```tsx
// When you need specific types or internal access
import { HeroSection, HeroSectionProps } from '@/components/sections/home';
import { ProjectModal } from '@/components/ui';
```

---

## Project Detail Pattern

Project cards do **not** navigate to a detail route. They open a modal:

```tsx
// Pattern used in ShowcaseProjectsSection & ProjectsGridSection
const [selectedProject, setSelectedProject] = useState<Project | null>(null);

<ProjectCard onClick={() => setSelectedProject(project)} />

<ProjectModal
    project={selectedProject}
    isOpen={selectedProject !== null}
    onClose={() => setSelectedProject(null)}
    locale={locale}
/>
```

`ProjectModal` is a client component (`'use client'`) with:
- Body scroll lock
- Escape key handler
- Backdrop click to close
- Scroll progress indicator

---

## Client vs Server Components

| Component | `'use client'` | Reason |
|-----------|----------------|--------|
| `HeroSection` | Yes | Animations, rotating statements |
| `ShowcaseProjectsSection` | Yes | Modal state, IntersectionObserver |
| `ProjectsGridSection` | Yes | Modal state, keyboard handler on cards |
| `ProjectModal` | Yes | Scroll lock, keyboard, onClick |
| `Navbar` | Yes | Scroll spy, mobile menu |
| `BioSection` | Yes | Uses `useTranslations` |
| `ProjectsHeaderSection` | No | Static server component |

**Rule:** Add `'use client'` only when the component needs browser APIs, hooks, or event handlers.

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
5. Create page: `app/[locale]/{newpage}/page.tsx`

---

## Best Practices

### ✅ Do

- Keep sections focused on one responsibility
- Use TypeScript interfaces for all props
- Export types alongside components
- Add JSDoc comments for complex components
- Use `'use client'` only when necessary
- Put content data in `lib/data/`, not hardcoded in sections

### ❌ Don't

- Mix components from different pages in one folder
- Create deeply nested component hierarchies
- Duplicate code across sections (extract to `ui/`)
- Use generic names like `Component1.tsx`
- Assume markdown files in `sections/projects/data/` are loaded by the app

---

## Data Separation

Components should not contain hardcoded content. Data lives in:

```
lib/
└── data/
    ├── profile.ts      # Personal info
    ├── skills.ts       # Skills data
    ├── experience.ts   # Work/education history
    ├── projects.ts     # Project data (runtime source of truth)
    ├── achievements.ts # Awards & certifications
    └── index.ts        # Barrel export
```

Localized content uses `LocalizedString` (`{ id, en }`) with helpers from `lib/utils/localization.ts`:
- `t(str, locale)` — single string
- `tArray(arr, locale)` — array of strings
- `ls(id, en)` — create inline in data files

Markdown drafts at `components/sections/projects/data/*.md` are **reference only** until wired to the app.

---

*Terakhir diselaraskan dengan codebase: Juli 2026*