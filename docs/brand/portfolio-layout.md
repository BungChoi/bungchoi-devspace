# Portfolio Layout Documentation

> Dokumentasi layout dan navigasi portfolio **sesuai implementasi saat ini**.

## Site Structure Overview

```
Home (/id, /en)
├── HeroSection              (#home)
├── TechMarqueeSection
├── AboutSummarySection      (#about)
├── HobiSection              (#hobi — Spotify + GitHub)
├── EducationSection         (#experience)
├── WorkExperienceSection    (#work-experience)
├── ShowcaseProjectsSection  (#projects — 6 cards + modal)
├── AchievementsSection
└── Footer

/about     → Halaman About lengkap (Bio, Education, Work Experience, Achievements)
/projects  → Daftar semua project (grid + modal)
```

**Catatan:** Route `/blog` belum diimplementasi. `BlogPreviewSection` ada di codebase tetapi tidak dipakai di Home.

---

## Internationalization

Semua halaman menggunakan prefix locale:

| Locale | Contoh |
|--------|--------|
| `id` (default) | `/id`, `/id/about`, `/id/projects` |
| `en` | `/en`, `/en/about`, `/en/projects` |

Root `/` diarahkan ke `/id`.

---

## Navbar Navigation

Navbar utama mengarah ke **anchor section di Home**, bukan ke halaman terpisah.

| Menu (ID/EN) | Target | Behavior |
|--------------|--------|----------|
| Home / Beranda | `/` | Scroll ke `#home` saat di Home |
| About / Tentang | `/#about` | Scroll ke `AboutSummarySection` |
| Experience / Pengalaman | `/#experience` | Scroll ke `EducationSection` |
| Projects / Proyek | `/#projects` | Scroll ke `ShowcaseProjectsSection` |

**CTA Hire Me:** `mailto:` ke email dari `personalInfo`.

**Active state:** Saat berada di `/projects`, menu Projects ditandai aktif.

Konfigurasi: `lib/constants/index.ts` → `NAV_ITEMS`

---

## Landing Page Sections

### 1. HeroSection (`#home`)
- Layout dua kolom: intro kiri, foto profil kanan
- Nama, role (Mobile Developer), rotating value statements
- CTA: Lihat Project (`/#projects`), Hire Me (`mailto:`)
- Social links + email

### 2. TechMarqueeSection
- Marquee teknologi/stack di bawah hero

### 3. AboutSummarySection (`#about`)
- Ringkasan bio singkat di Home
- Link ke halaman About lengkap (`/about`)

### 4. HobiSection (`#hobi`)
- Spotify now-playing (API integration)
- GitHub stats (API integration)

### 5. EducationSection (`#experience`)
- Riwayat pendidikan
- Memakai `id="experience"` untuk anchor navbar

### 6. WorkExperienceSection (`#work-experience`)
- Pengalaman kerja

### 7. ShowcaseProjectsSection (`#projects`)
- Grid 6 project terbaru (sort by year)
- Klik card → **`ProjectModal`** (popup detail)
- CTA "See All" → `/projects`

### 8. AchievementsSection
- Sertifikat dan penghargaan

### 9. Footer
- Copyright, social links, navigasi cepat

---

## Separate Pages

### About Page (`/about`)
| Section | Komponen |
|---------|----------|
| Bio | `BioSection` |
| Education | `EducationSection` |
| Work Experience | `WorkExperienceSection` |
| Achievements | `AchievementsSection` |

`SkillsSection` tersedia di codebase tetapi belum dipakai di halaman About.

### Projects Page (`/projects`)
| Section | Komponen |
|---------|----------|
| Header | `ProjectsHeaderSection` |
| Grid | `ProjectsGridSection` |

- Menampilkan semua project dari `lib/data/projects.ts`
- Klik card → **`ProjectModal`**
- Filter/search: belum diimplementasi (hanya komentar di header)

---

## Project Detail — Modal Pattern

Project detail **bukan halaman terpisah**. Detail ditampilkan lewat modal popup.

```
Klik ProjectCard
  → useState(selectedProject)
  → <ProjectModal project={...} isOpen onClose locale />
```

**Komponen:** `components/ui/ProjectModal.tsx`

**Dipakai di:**
- `ShowcaseProjectsSection` (Home)
- `ProjectsGridSection` (Projects page)

**Konten modal:**
- Hero image
- Badges (timeline, platform)
- Title & subtitle
- About, Key Features, Contributions, Tech Stack
- External links (GitHub, Live, Play Store, App Store)

**Sumber data:** `lib/data/projects.ts` (bukan markdown)

---

## Data Models

### Project (runtime — `lib/types/index.ts`)

```typescript
interface Project {
  id: string;
  title: string;
  subtitle?: LocalizedString;
  description: LocalizedString;
  longDescription?: LocalizedString;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  featured?: boolean;
  year: number;
  role?: LocalizedString;
  platform?: LocalizedString;
  status?: LocalizedString;
  timeline?: LocalizedString | string;
  team?: LocalizedString;
  features?: ProjectFeature[];
  contributions?: LocalizedString[];
  // Extended fields (overview, challenges, solution, etc.) — tersedia di type, belum di-render di UI
}
```

### Case Study Markdown (draft — belum terhubung)

File di `components/sections/projects/data/*.md` adalah **draft/template** penulisan case study. Belum di-parse atau di-render oleh aplikasi.

Template penulisan: `docs/technical/structure_projects.md`

---

## Design Notes

- Global animated background (`BackgroundEffects`) di semua halaman
- Dark theme default dengan CSS variables di `app/globals.css`
- Glassmorphism pada card dan modal
- Responsive grid layouts
- Scroll spy di navbar (IntersectionObserver pada Home)
- `scroll-mt-24` pada section dengan anchor id

---

## Planned / Not Yet Implemented

| Fitur | Status |
|-------|--------|
| `/projects/[id]` halaman detail terpisah | Belum |
| `ContactSection` di Home | Belum |
| Navbar item Contact / `#contact` | Belum |
| Blog page & `BlogPreviewSection` di Home | Belum |
| Filter/search di Projects page | Belum |
| Wire markdown case study ke UI | Belum |

Lihat `docs/ui/single-page-portfolio-plan.md` untuk roadmap lengkap.