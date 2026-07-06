# 🏗️ Clean Architecture Documentation

> This document provides a comprehensive guide to the architecture patterns, folder structure, and coding conventions used in this Next.js portfolio project.

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Architecture Layers](#architecture-layers)
4. [Design System](#design-system)
5. [Component Guidelines](#component-guidelines)
6. [SOLID Principles](#solid-principles)
7. [Naming Conventions](#naming-conventions)
8. [Import Guidelines](#import-guidelines)
9. [File Templates](#file-templates)

---

## Overview

This project follows a **Layer-Based Clean Architecture** pattern optimized for Next.js App Router. The architecture separates concerns into distinct layers, making the codebase:

- ✅ **Maintainable** - Easy to find and modify code
- ✅ **Scalable** - Can grow without becoming messy
- ✅ **Testable** - Each layer can be tested independently
- ✅ **Reusable** - Components and utilities can be shared

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | React Framework (App Router) |
| React | 19.x | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Styling |

---

## Folder Structure

```
bungchoi-devspace/
│
├── app/                          # Next.js App Router
│   ├── globals.css               # Global styles & Design System
│   ├── layout.tsx                # Root layout
│   ├── [locale]/                 # i18n dynamic segment (id, en)
│   │   ├── layout.tsx            # Locale layout (Navbar, Footer, IntlProvider)
│   │   ├── page.tsx              # Home (single-page landing)
│   │   ├── about/page.tsx        # About page
│   │   └── projects/page.tsx     # Projects listing
│   └── api/                      # API routes (Spotify, GitHub stats)
│
├── components/                   # React Components
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ProjectModal.tsx      # Project detail popup
│   │   └── index.ts
│   │
│   ├── sections/                 # Page-specific sections
│   │   ├── home/                 # Landing page sections
│   │   ├── about/                # About page sections
│   │   ├── projects/             # Projects page sections
│   │   └── index.ts
│   │
│   └── layout/                   # Layout components
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── BackgroundEffects.tsx
│       └── index.ts
│
├── lib/                          # Core library code
│   ├── constants/                # SITE_CONFIG, NAV_ITEMS, etc.
│   ├── data/                     # Static data (profile, projects, skills, ...)
│   ├── i18n/                     # next-intl config, navigation, messages
│   ├── types/                    # TypeScript interfaces
│   └── utils/                    # cn(), localization helpers
│
├── hooks/                        # Custom React hooks
│
├── public/                       # Static assets
│   └── images/
│       ├── projects/             # Project screenshots
│       └── about/                # Profile photos
│
└── docs/                         # Documentation
    ├── technical/                # Architecture, design system, i18n
    ├── ui/                       # UI plans & page architecture
    └── brand/                    # Brand kit, layout, CV data
```

---

## Architecture Layers

### Layer 1: Presentation Layer (`app/`, `components/`)

**Purpose:** UI rendering and user interaction

```
┌─────────────────────────────────────────────────────┐
│                 PRESENTATION LAYER                   │
├─────────────────────────────────────────────────────┤
│  app/           → Pages, layouts, routing           │
│  components/ui  → Generic UI (Button, Card, etc.)   │
│  components/sections → Page sections                │
│  components/layout   → Navbar, Footer               │
└─────────────────────────────────────────────────────┘
```

**Rules:**
- Components should be as "dumb" as possible
- Business logic should NOT live here
- Use props for data, callbacks for actions

---

### Layer 2: Data Layer (`lib/data/`)

**Purpose:** Data sources and data transformation

```
┌─────────────────────────────────────────────────────┐
│                    DATA LAYER                        │
├─────────────────────────────────────────────────────┤
│  lib/data/      → Static data files                 │
│  - profile.ts   → Personal information              │
│  - projects.ts  → Portfolio projects                │
│  - skills.ts    → Technical skills                  │
└─────────────────────────────────────────────────────┘
```

**Rules:**
- Data should be typed with TypeScript interfaces
- Export helper functions for data filtering/transformation
- Keep data separate from presentation

---

### Layer 3: Core Layer (`lib/types/`, `lib/constants/`, `lib/utils/`)

**Purpose:** Shared types, constants, and utilities

```
┌─────────────────────────────────────────────────────┐
│                    CORE LAYER                        │
├─────────────────────────────────────────────────────┤
│  lib/types/     → TypeScript interfaces/types       │
│  lib/constants/ → App-wide constants                │
│  lib/utils/     → Helper functions                  │
└─────────────────────────────────────────────────────┘
```

**Rules:**
- Types should be domain-specific and reusable
- Constants should use `as const` for type inference
- Utils should be pure functions (no side effects)

---

### Layer 4: Hooks Layer (`hooks/`)

**Purpose:** Custom React hooks for reusable stateful logic

```
┌─────────────────────────────────────────────────────┐
│                   HOOKS LAYER                        │
├─────────────────────────────────────────────────────┤
│  hooks/         → Custom React hooks                │
│  - useMediaQuery.ts                                 │
│  - useScrollPosition.ts                             │
│  - useTheme.ts                                      │
└─────────────────────────────────────────────────────┘
```

**Rules:**
- Hook names must start with `use`
- One hook per file
- Hooks should be composable

---

## Design System

The Design System is defined in `app/globals.css` using CSS Custom Properties.

### Color Tokens

```css
/* Primary Colors (Modern Blue) */
--color-primary-500: #3b82f6;
--color-primary-600: #2563eb;
--color-primary-700: #1d4ed8;

/* Accent Colors (Cyan) */
--color-accent-500: #06b6d4;

/* Neutral Colors (Zinc) */
--color-neutral-50: #fafafa;   /* Light background */
--color-neutral-900: #18181b;  /* Dark text */
--color-neutral-950: #09090b;  /* Dark background */

/* Semantic Colors */
--color-success: #22c55e;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

### Theme Variables

```css
/* Light Mode */
--background: var(--color-neutral-50);
--foreground: var(--color-neutral-900);
--primary: var(--color-primary-600);
--card: #ffffff;
--border: var(--color-neutral-200);

/* Dark Mode (auto-applied) */
--background: var(--color-neutral-950);
--foreground: var(--color-neutral-50);
--primary: var(--color-primary-500);
--card: var(--color-neutral-900);
--border: var(--color-neutral-800);
```

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Inline gaps |
| `--space-2` | 8px | Tight spacing |
| `--space-4` | 16px | Default gap |
| `--space-6` | 24px | Component padding |
| `--space-8` | 32px | Section gaps |
| `--space-16` | 64px | Section padding |
| `--space-24` | 96px | Large sections |

### Typography Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--text-xs` | 12px | Captions, labels |
| `--text-sm` | 14px | Secondary text |
| `--text-base` | 16px | Body text |
| `--text-lg` | 18px | Large body |
| `--text-xl` | 20px | Small headings |
| `--text-2xl` | 24px | Section subtitles |
| `--text-3xl` | 30px | Section titles |
| `--text-4xl` | 36px | Page titles |
| `--text-5xl` | 48px | Hero subtitle |
| `--text-6xl` | 60px | Hero title |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Subtle rounding |
| `--radius-base` | 8px | Buttons, inputs |
| `--radius-md` | 12px | Cards |
| `--radius-lg` | 16px | Large cards |
| `--radius-full` | 9999px | Pills, avatars |

### Utility Classes

```css
.container      /* Max-width wrapper with padding */
.section-padding /* Responsive section spacing */
.text-gradient  /* Primary-to-accent gradient text */
.hover-card     /* Card hover animation */
.glass          /* Glassmorphism effect */
```

---

## Component Guidelines

### Component Structure

```typescript
// 1. Imports (external → internal → types → styles)
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ButtonProps } from './types';

// 2. Types/Interfaces (if not in separate file)
interface Props {
  // ...
}

// 3. Constants (if component-specific)
const VARIANTS = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-foreground',
} as const;

// 4. Component
export function Button({ 
  children, 
  variant = 'primary',
  className,
  ...props 
}: Props) {
  // 4a. Hooks
  const [isLoading, setIsLoading] = useState(false);
  
  // 4b. Derived state / computations
  const variantClass = VARIANTS[variant];
  
  // 4c. Event handlers
  const handleClick = () => {
    // ...
  };
  
  // 4d. Early returns
  if (!children) return null;
  
  // 4e. Render
  return (
    <button
      className={cn(variantClass, className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

// 5. Helper functions (private, not exported)
function formatLabel(text: string) {
  return text.toUpperCase();
}
```

### Component Categories

| Category | Location | Description | Example |
|----------|----------|-------------|---------|
| **UI Components** | `components/ui/` | Generic, reusable, no business logic | Button, Card, Badge, Input |
| **Section Components** | `components/sections/` | Page-specific sections | Hero, About, Projects |
| **Layout Components** | `components/layout/` | Structural components | Navbar, Footer, Container |

### Props Guidelines

```typescript
// ✅ GOOD: Use interface with proper typing
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

// ✅ GOOD: Destructure props with defaults
function Button({ 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  children,
  className,
  ...props 
}: ButtonProps) {
  // ...
}

// ❌ BAD: Using props object directly
function Button(props: ButtonProps) {
  return <button>{props.children}</button>;
}
```

---

## SOLID Principles

### S - Single Responsibility Principle

> Each component/function should have ONE job.

```typescript
// ✅ GOOD: Separated responsibilities
function UserAvatar({ src, alt }: AvatarProps) {
  return <img src={src} alt={alt} className="rounded-full" />;
}

function UserInfo({ name, title }: InfoProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{title}</p>
    </div>
  );
}

function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      <UserAvatar src={user.avatar} alt={user.name} />
      <UserInfo name={user.name} title={user.title} />
    </Card>
  );
}

// ❌ BAD: Component doing too much
function UserCard({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  // Fetching 3 different things, rendering everything...
}
```

### O - Open/Closed Principle

> Open for extension, closed for modification.

```typescript
// ✅ GOOD: Extensible through variants map
const BUTTON_VARIANTS = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-foreground',
  outline: 'border-2 border-primary text-primary',
  ghost: 'bg-transparent hover:bg-primary/10',
} as const;

// Add new variant without modifying component
BUTTON_VARIANTS.danger = 'bg-error text-white';
```

### L - Liskov Substitution Principle

> Extended components should be interchangeable with base.

```typescript
// Base component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Card({ children, className, ...props }: CardProps) {
  return <div className={cn('rounded-lg border', className)} {...props}>{children}</div>;
}

// Extended component (still works as Card)
interface ProjectCardProps extends CardProps {
  project: Project;
}

function ProjectCard({ project, className, ...props }: ProjectCardProps) {
  return (
    <Card className={cn('hover:shadow-lg', className)} {...props}>
      <img src={project.image} alt={project.title} />
      <h3>{project.title}</h3>
    </Card>
  );
}
```

### I - Interface Segregation Principle

> Don't force components to depend on props they don't use.

```typescript
// ✅ GOOD: Minimal, focused interfaces
interface Clickable {
  onClick: () => void;
}

interface Loadable {
  isLoading: boolean;
}

interface WithIcon {
  icon: React.ReactNode;
}

// Compose as needed
type IconButtonProps = BaseButtonProps & WithIcon;
type LoadingButtonProps = BaseButtonProps & Loadable;

// ❌ BAD: One big interface with optional everything
interface ButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  icon?: React.ReactNode;
  badge?: number;
  tooltip?: string;
  // 20 more optional props...
}
```

### D - Dependency Inversion Principle

> Depend on abstractions, not concrete implementations.

```typescript
// ✅ GOOD: Interface-based design
// lib/types/index.ts
interface DataFetcher<T> {
  fetch(): Promise<T>;
}

// Implementation can be swapped
class ApiProjectService implements DataFetcher<Project[]> {
  async fetch() { return fetch('/api/projects').then(r => r.json()); }
}

class MockProjectService implements DataFetcher<Project[]> {
  async fetch() { return mockProjects; }
}

// Component depends on interface, not implementation
function useProjects(fetcher: DataFetcher<Project[]>) {
  // Works with any implementation
}
```

---

## Naming Conventions

### Files & Folders

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button.tsx`, `ProjectCard.tsx` |
| Hooks | camelCase with `use` prefix | `useMediaQuery.ts` |
| Utilities | camelCase | `formatDate.ts`, `cn.ts` |
| Types | camelCase or PascalCase | `types.ts`, `Button.types.ts` |
| Constants | camelCase file, UPPER_CASE vars | `constants.ts` → `MAX_ITEMS` |
| Data files | camelCase | `projects.ts`, `skills.ts` |

### Variables & Functions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `function Button()` |
| Functions | camelCase | `function formatDate()` |
| Variables | camelCase | `const userName = ...` |
| Constants | UPPER_SNAKE_CASE | `const MAX_ITEMS = 10` |
| Interfaces | PascalCase + Props suffix | `interface ButtonProps` |
| Types | PascalCase | `type SkillCategory` |
| Enums | PascalCase | `enum Status { Active }` |

### CSS Classes

| Type | Convention | Example |
|------|------------|---------|
| Utility classes | Tailwind conventions | `bg-primary`, `text-lg` |
| Custom classes | kebab-case | `.section-padding` |
| CSS Variables | kebab-case with prefix | `--color-primary-500` |

---

## Import Guidelines

### Import Order

```typescript
// 1. React/Next.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. External libraries
import { motion } from 'framer-motion';

// 3. Internal - lib (utils, constants, types)
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';
import type { Project } from '@/lib/types';

// 4. Internal - components
import { Button, Card } from '@/components/ui';

// 5. Internal - hooks
import { useMediaQuery } from '@/hooks';

// 6. Internal - data
import { projects } from '@/lib/data';

// 7. Styles (if CSS modules)
import styles from './Component.module.css';
```

### Path Aliases

Use the `@/` alias for cleaner imports:

```typescript
// ✅ GOOD: Using alias
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

// ❌ BAD: Relative paths
import { Button } from '../../../components/ui';
import { cn } from '../../lib/utils';
```

### Barrel Exports

Each folder should have an `index.ts` for clean exports:

```typescript
// components/ui/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Badge } from './Badge';

// Usage
import { Button, Card, Badge } from '@/components/ui';
```

---

## File Templates

### UI Component Template

```typescript
/**
 * @component ComponentName
 * @description Brief description of the component
 */

import { cn } from '@/lib/utils';

// Types
interface ComponentNameProps {
  children: React.ReactNode;
  className?: string;
}

// Component
export function ComponentName({ 
  children, 
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

### Section Component Template

```typescript
/**
 * @section SectionName
 * @description Page section for [purpose]
 */

import { cn } from '@/lib/utils';

interface SectionNameProps {
  className?: string;
}

export function SectionName({ className }: SectionNameProps) {
  return (
    <section 
      id="section-id" 
      className={cn('section-padding', className)}
    >
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Section Title</h2>
        {/* Section content */}
      </div>
    </section>
  );
}
```

### Custom Hook Template

```typescript
/**
 * @hook useHookName
 * @description Brief description of what the hook does
 */

import { useState, useEffect } from 'react';

export function useHookName(param: ParamType) {
  const [state, setState] = useState<StateType>(initialValue);

  useEffect(() => {
    // Effect logic
  }, [param]);

  return { state, /* other return values */ };
}
```

### Data File Template

```typescript
/**
 * @data DataName
 * @description Data source for [purpose]
 */

import type { TypeName } from '@/lib/types';

export const dataName: TypeName[] = [
  {
    id: '1',
    // ... properties
  },
];

// Helper functions
export const getDataById = (id: string) => 
  dataName.find(item => item.id === id);
```

---

## Quick Reference

### Common Import Paths

```typescript
// Types
import type { Project, Skill, PersonalInfo } from '@/lib/types';

// Constants
import { SITE_CONFIG, NAV_ITEMS, SOCIAL_LINKS } from '@/lib/constants';

// Utils
import { cn, formatDate } from '@/lib/utils';

// Data
import { projects, skills, personalInfo } from '@/lib/data';

// Components
import { Button, Card, Badge, ProjectModal } from '@/components/ui';
import { HeroSection, ShowcaseProjectsSection } from '@/components/sections';
import { ProjectsGridSection } from '@/components/sections/projects';
import { Navbar, Footer } from '@/components/layout';

// i18n navigation (locale-aware)
import { Link, usePathname } from '@/lib/i18n/navigation';
```

### CSS Variables Quick Reference

```css
/* Colors */
var(--primary)
var(--foreground)
var(--background)
var(--border)
var(--card)

/* Spacing */
var(--space-4)  /* 16px */
var(--space-8)  /* 32px */

/* Typography */
var(--text-base)  /* 16px */
var(--text-xl)    /* 20px */

/* Border Radius */
var(--radius-md)  /* 12px */
var(--radius-lg)  /* 16px */

/* Shadows */
var(--shadow-md)
var(--shadow-lg)
```

---

## Contributing

When adding new code to this project:

1. ✅ Follow the folder structure
2. ✅ Use TypeScript with proper types
3. ✅ Follow naming conventions
4. ✅ Use Design System tokens (CSS variables)
5. ✅ Create barrel exports in `index.ts`
6. ✅ Keep components single-responsibility
7. ✅ Document complex logic with comments

---

*Last updated: December 2024*
