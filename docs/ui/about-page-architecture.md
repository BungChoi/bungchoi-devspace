# About Page Architecture

## Overview

The `/about` page follows a **component-based architecture** with data separation, allowing for easy content updates without touching component logic.

## Directory Structure

```
app/
└── about/
    └── page.tsx              # Main page layout

components/
└── sections/
    └── about/                # About-specific sections
        ├── index.ts          # Barrel export
        ├── BioSection.tsx    # Hero/bio section
        ├── SkillsSection.tsx # Skills grid
        └── ExperienceSection.tsx # Timeline

lib/
└── data/
    ├── profile.ts            # Personal info
    ├── skills.ts             # Skills data
    └── experience.ts         # Work/education history
```

## Design Decisions

### 1. Feature-Based Component Organization

**Why?**
- Each page gets its own folder under `components/sections/`
- Components are co-located with their parent feature
- Easy to find and maintain related components
- Scales well as the application grows

**Alternative Considered:**
- Flat structure in `components/` - rejected because it doesn't scale

### 2. Data Separation (`lib/data/`)

**Why?**
- Content is separated from presentation
- Easy to update data without modifying components
- Future-proof for CMS integration
- Type-safe with TypeScript interfaces

### 3. Server Components by Default

**Why?**
- Better SEO (content is pre-rendered)
- Faster initial page load
- Data fetching happens on the server
- Interactive parts use `'use client'` explicitly

### 4. Glassmorphism Card Design

**Why?**
- Consistent with landing page aesthetics
- Creates visual depth and hierarchy
- Modern, premium look
- Uses CSS custom properties for easy theming

## Data Models

### Experience Interface

```typescript
interface Experience {
  id: string;
  type: 'work' | 'education';
  role: string;           // Job title or Degree
  company: string;        // Company or Institution
  location: string;
  period: string;         // e.g., "Jan 2024 - Present"
  description: string;
  achievements: string[]; // Bullet points
  current?: boolean;
}
```

### Skills Grouping

Skills are grouped by category for visual organization:
- Mobile Development
- Frontend
- Backend
- Database
- Tools & Others

Each skill has a `level` (expert/advanced/intermediate/beginner) for progress visualization.

## Responsive Design

- **Desktop (lg+)**: 2-column layout for bio, grid for skills
- **Tablet (md)**: Adjusted spacing, stacked sections
- **Mobile (sm)**: Single column, optimized touch targets

## Accessibility

- Semantic HTML (`<section>`, `<article>`, `<h1>`-`<h3>`)
- Proper heading hierarchy
- ARIA labels for interactive elements
- Color contrast meets WCAG AA standards
