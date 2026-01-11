# Portfolio Layout Documentation

## Site Structure Overview

```
Landing Page (/)
├── Hero Section + Tech Marquee
├── Hobi Section (Spotify, GitHub embeds)
├── Showcase Projects (4 cards grid + "See All")
├── Blog Preview (4 cards vertical + "See All")
└── Footer

/about     → Full About Page (bio, skills, experience)
/projects  → All Projects Page (filterable)
/blog      → All Blog Posts Page (paginated)
```

---

## Navbar Navigation

| Link     | Target              | Type       |
|----------|---------------------|------------|
| Home     | `/` or `#home`      | Scroll/Nav |
| About    | `/about`            | Page       |
| Projects | `/projects`         | Page       |
| Blog     | `/blog`             | Page       |

---

## Landing Page Sections

### 1. Hero Section
- Existing hero with "Portfolio" title
- Name and title
- Tech stack marquee

### 2. Hobi Section
Personal interests/activities:
- **Spotify**: Currently playing / favorite playlist embed
- **GitHub**: Activity graph or pinned repositories
- *Future*: Gaming stats, Books reading, etc.

### 3. Showcase Projects
- 4 project cards in 2x2 grid (latest/featured)
- Card content: thumbnail, title, description, tech tags
- "See All Projects" CTA → `/projects`

### 4. Blog Preview
- 4 latest blog posts in vertical list
- Card content: title, date, excerpt
- "Read More" CTA → `/blog`

### 5. Footer
- Copyright notice
- Social media links
- Quick navigation

---

## Separate Pages

### About Page (`/about`)
- Detailed personal bio
- Skills & expertise with levels
- Experience timeline
- Education background
- Download CV button

### Projects Page (`/projects`)
- All project cards
- Filter by category/technology
- Search functionality (optional)

### Blog Page (`/blog`)
- All blog posts list
- Categories/tags filter
- Pagination

---

## Data Models

### Project
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}
```

### Blog Post
```typescript
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  featured: boolean;
}
```

---

## Design Notes
- Global animated background applies to all pages
- Consistent dark theme across sections
- Responsive grid layouts for cards
- Hover effects on interactive elements
