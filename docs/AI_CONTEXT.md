# 🤖 AI Context Guide

> This document provides essential context for AI assistants working with this codebase. It contains patterns, conventions, and important information to help AI understand and work effectively with this project.

---

## Project Overview

**Project Name:** BungChoi DevSpace  
**Type:** Personal Portfolio Website  
**Framework:** Next.js 16 (App Router)  
**Language:** TypeScript  
**Styling:** Tailwind CSS v4 + CSS Custom Properties  

---

## Architecture Pattern

This project follows a **Layer-Based Clean Architecture** pattern:

```
┌────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│   app/           → Routes & pages (Next.js App Router)     │
│   components/    → React components (ui, sections, layout) │
├────────────────────────────────────────────────────────────┤
│                      DATA LAYER                             │
│   lib/data/      → Static data (profile, projects, skills) │
├────────────────────────────────────────────────────────────┤
│                      CORE LAYER                             │
│   lib/types/     → TypeScript type definitions             │
│   lib/constants/ → Application constants                   │
│   lib/utils/     → Utility functions                       │
│   hooks/         → Custom React hooks                      │
└────────────────────────────────────────────────────────────┘
```

---

## Key Files & Their Purposes

### Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript config with `@/` path alias |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `postcss.config.mjs` | PostCSS configuration |
| `eslint.config.mjs` | ESLint rules |

### Core Application Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with metadata, fonts, global providers |
| `app/page.tsx` | Home page component |
| `app/globals.css` | Design System (CSS variables, utility classes) |

### Library Files

| Path | Purpose | Key Exports |
|------|---------|-------------|
| `lib/types/index.ts` | TypeScript interfaces | `Project`, `Skill`, `PersonalInfo`, `Experience`, etc. |
| `lib/constants/index.ts` | App constants | `SITE_CONFIG`, `NAV_ITEMS`, `SOCIAL_LINKS`, `ANIMATION`, `BREAKPOINTS` |
| `lib/utils/index.ts` | Utilities | `cn()`, `formatDate()`, `isClient`, `generateId()` |
| `lib/data/index.ts` | Data barrel export | `personalInfo`, `projects`, `skills` |

### Component Directories

| Directory | Purpose | Example Files |
|-----------|---------|---------------|
| `components/ui/` | Reusable UI primitives | `Button.tsx`, `Card.tsx`, `Badge.tsx`, `Input.tsx` |
| `components/sections/` | Page sections | `Hero.tsx`, `About.tsx`, `Projects.tsx`, `Contact.tsx` |
| `components/layout/` | Layout components | `Navbar.tsx`, `Footer.tsx` |

---

## Code Patterns & Conventions

### Component Pattern

```typescript
/**
 * @component ComponentName
 * @description Brief description
 */

import { cn } from '@/lib/utils';

interface ComponentNameProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function ComponentName({ 
  children, 
  variant = 'primary',
  className,
  ...props 
}: ComponentNameProps) {
  return (
    <div className={cn('base-styles', className)} {...props}>
      {children}
    </div>
  );
}
```

### Import Order Convention

```typescript
// 1. React/Next.js
import { useState, useEffect } from 'react';
import Image from 'next/image';

// 2. External libraries
import { motion } from 'framer-motion';

// 3. Internal - lib
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';
import type { Project } from '@/lib/types';

// 4. Internal - components
import { Button, Card } from '@/components/ui';

// 5. Internal - hooks
import { useMediaQuery } from '@/hooks';

// 6. Internal - data
import { projects } from '@/lib/data';
```

### Styling Pattern

```typescript
// Use cn() utility for conditional classes
import { cn } from '@/lib/utils';

// Combine base classes with conditional and custom classes
<div className={cn(
  'base-class another-base',
  isActive && 'active-class',
  variant === 'primary' && 'primary-variant',
  className // Allow override via props
)}>
```

### CSS Variables Usage

```typescript
// In components, use Tailwind classes that reference CSS variables
<div className="bg-background text-foreground">
<div className="bg-primary text-primary-foreground">
<div className="border border-border rounded-lg shadow-md">

// Or use CSS variables directly
<div style={{ color: 'var(--foreground)' }}>
```

---

## Type Definitions Reference

### Core Types

```typescript
// Navigation
interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

// Projects
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  featured?: boolean;
  year: number;
}

// Skills
interface Skill {
  name: string;
  icon?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: SkillCategory;
}

type SkillCategory = 'mobile' | 'frontend' | 'backend' | 'database' | 'tools' | 'other';

// Personal Info
interface PersonalInfo {
  name: string;
  title: string;
  subtitle?: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  avatar?: string;
  resumeUrl?: string;
  socialLinks: SocialLink[];
}

// Component Props Base
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

interface SectionProps extends BaseComponentProps {
  id?: string;
  title?: string;
  subtitle?: string;
}
```

---

## Design System Quick Reference

### Color Tokens

```css
/* Semantic colors (auto switch light/dark) */
--background          /* Page background */
--foreground          /* Primary text */
--primary             /* Primary actions */
--accent              /* Secondary actions */
--border              /* Borders */
--card                /* Card backgrounds */

/* Status colors */
--color-success       /* #22c55e */
--color-warning       /* #f59e0b */
--color-error         /* #ef4444 */
--color-info          /* #3b82f6 */
```

### Spacing Scale

```
space-1: 4px    space-4: 16px    space-8: 32px    space-16: 64px
space-2: 8px    space-5: 20px    space-10: 40px   space-20: 80px
space-3: 12px   space-6: 24px    space-12: 48px   space-24: 96px
```

### Typography Scale

```
text-xs: 12px    text-xl: 20px    text-4xl: 36px
text-sm: 14px    text-2xl: 24px   text-5xl: 48px
text-base: 16px  text-3xl: 30px   text-6xl: 60px
text-lg: 18px                     text-7xl: 72px
```

### Border Radius

```
radius-sm: 4px     radius-lg: 16px
radius-base: 8px   radius-xl: 24px
radius-md: 12px    radius-full: 9999px
```

### Custom Utility Classes

```css
.container        /* Max-width wrapper with padding */
.section-padding  /* Responsive vertical padding */
.text-gradient    /* Primary-to-accent gradient text */
.hover-card       /* Card hover animation */
.glass            /* Glassmorphism effect */
```

---

## Common Tasks

### Adding a New UI Component

1. Create file in `components/ui/ComponentName.tsx`
2. Follow the component pattern above
3. Export from `components/ui/index.ts`
4. Use types from `@/lib/types` if applicable

### Adding a New Section

1. Create file in `components/sections/SectionName.tsx`
2. Use `SectionProps` interface
3. Include `id` for navigation anchor
4. Use `.section-padding` and `.container` classes
5. Export from `components/sections/index.ts`

### Adding a New Data Type

1. Add interface to `lib/types/index.ts`
2. Create data file in `lib/data/typename.ts`
3. Export from `lib/data/index.ts`

### Adding a New Hook

1. Create file in `hooks/useHookName.ts`
2. Follow hook naming convention (`use` prefix)
3. Export from `hooks/index.ts`

### Modifying Design Tokens

1. Update CSS variables in `app/globals.css`
2. Update both light and dark mode sections if applicable
3. Update `@theme inline` block for Tailwind integration

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button.tsx`, `ProjectCard.tsx` |
| Hooks | camelCase with `use` | `useMediaQuery.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Data files | camelCase | `projects.ts` |
| Type files | camelCase | `index.ts` |
| CSS files | kebab-case | `globals.css` |

---

## Important Notes for AI

### DO ✅

- Use TypeScript for all new files
- Follow existing import patterns
- Use `cn()` utility for className merging
- Use CSS variables from Design System
- Use path alias `@/` for imports
- Follow component structure pattern
- Add proper TypeScript types
- Use semantic HTML elements
- Keep components single-responsibility

### DON'T ❌

- Don't use inline styles (use Tailwind)
- Don't create new CSS files (use globals.css)
- Don't skip TypeScript types
- Don't use relative imports for lib/components
- Don't put business logic in UI components
- Don't use hardcoded colors (use CSS variables)
- Don't create components without proper props interface

### Common Imports

```typescript
// Utils
import { cn, formatDate } from '@/lib/utils';

// Types
import type { Project, Skill, PersonalInfo } from '@/lib/types';

// Constants
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants';

// Data
import { projects, skills, personalInfo } from '@/lib/data';

// Components
import { Button, Card, Badge } from '@/components/ui';
import { Hero, About, Projects } from '@/components/sections';
import { Navbar, Footer } from '@/components/layout';
```

---

## Project-Specific Context

This is a **personal portfolio website** for a **mobile developer** (Flutter & React Native). Key content sections:

1. **Hero** - Introduction with name, title, and CTA
2. **About** - Bio, background, experience timeline
3. **Skills** - Technical skills organized by category
4. **Projects** - Portfolio of mobile apps and projects
5. **Contact** - Contact information and social links

The target audience is potential employers and clients looking to hire a mobile developer.

---

*This document should be updated when significant architectural changes are made.*
