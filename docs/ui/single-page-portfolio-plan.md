# Single Page Portfolio — Current State & Roadmap

> Dokumen ini mencatat **kondisi implementasi saat ini** dan **rencana ke depan**. Bagian "Current State" mencerminkan codebase aktual; bagian "Roadmap" adalah target yang belum dikerjakan.

---

## Ringkasan

Portfolio menggunakan pendekatan **single-page landing** di Home sebagai pusat informasi utama. Navbar mengarah ke anchor section di Home. Halaman `/about` dan `/projects` tetap ada sebagai halaman sekunder.

**Project detail saat ini:** modal popup (`ProjectModal`), bukan halaman `/projects/[id]`.

---

## Current State (Implementasi Saat Ini)

### Routes Aktif

| Route | Halaman | File |
|-------|---------|------|
| `/id`, `/en` | Home | `app/[locale]/page.tsx` |
| `/id/about`, `/en/about` | About | `app/[locale]/about/page.tsx` |
| `/id/projects`, `/en/projects` | Projects listing | `app/[locale]/projects/page.tsx` |

### Home — Urutan Section

```text
HeroSection
TechMarqueeSection
AboutSummarySection      (#about)
HobiSection              (#hobi)
EducationSection         (#experience)
WorkExperienceSection    (#work-experience)
ShowcaseProjectsSection  (#projects)
AchievementsSection
```

**Tidak ada di Home:** `BlogPreviewSection`, `ContactSection`

### Navbar (`lib/constants/index.ts`)

```text
Home        → /
About       → /#about
Experience  → /#experience
Projects    → /#projects
```

- Scroll spy aktif di Home via `IntersectionObserver`
- Di `/projects`, menu Projects ditandai aktif
- CTA Hire Me → `mailto:`

### Hero

- Layout dua kolom: intro kiri, foto kanan
- Foto dari `personalInfo.avatar`
- Rotating value statements (ID/EN)
- CTA ke `/#projects` dan `mailto:`
- Tanpa judul besar "Portfolio"

### Project Detail — Modal

Klik project card (di Home atau `/projects`) membuka **`ProjectModal`**:

```
ProjectCard onClick → setSelectedProject(project)
                  → <ProjectModal isOpen onClose locale />
```

- Komponen: `components/ui/ProjectModal.tsx`
- Data: `lib/data/projects.ts`
- Fitur: scroll progress bar, backdrop blur, Escape to close, body scroll lock
- **Belum ada:** `role="dialog"`, focus trap, shareable URL

### Halaman Sekunder

**About** (`/about`): BioSection, EducationSection, WorkExperienceSection, AchievementsSection

**Projects** (`/projects`): ProjectsHeaderSection, ProjectsGridSection + ProjectModal

### Data Project

- Runtime: `lib/data/projects.ts` dengan dukungan `LocalizedString` (ID/EN)
- Draft markdown: `components/sections/projects/data/*.md` — **belum terhubung ke UI**
- Template penulisan: `docs/technical/structure_projects.md`

---

## Roadmap (Belum Diimplementasi)

### Project Detail Page

Rencana awal: halaman terpisah untuk case study panjang.

```
/id/projects/[id]
/en/projects/[id]
```

**Status:** Belum ada. Saat ini modal menampung semua konten detail.

### Contact Section

Rencana: section `#contact` di Home dengan email, social links, CTA hire me.

**Status:** Belum ada `ContactSection`. Navbar belum punya item Contact.

### Blog

- `BlogPreviewSection` ada di codebase, tidak dipakai di Home
- Route `/blog` belum ada

### Projects Page Enhancements

- Filter by tag/technology
- Search
- (Saat ini hanya grid semua project)

### Rich Case Study Content

Type `Project` sudah mendukung `overview`, `challenges`, `solution`, `screenshots`, dll. — belum di-render di modal maupun halaman detail.

### Navbar dari Project Detail Page

Saat `/projects/[id]` ada, klik menu navbar harus kembali ke Home + hash. Behavior ini sudah disiapkan sebagian di `Navbar.tsx` (komentar), tetapi halaman detail belum dibuat.

---

## Prinsip Layout (Tetap Berlaku)

### Simple First
Konten langsung menunjukkan siapa pemilik portfolio, role, pengalaman, dan project.

### Single Reading Flow (Target)
1. Siapa saya
2. Apa fokus saya
3. Experience dan achievement
4. Project yang bisa dibuka detailnya
5. Cara menghubungi saya ← **belum ada Contact section**

---

## Komponen Kunci

| Komponen | Lokasi | Dipakai di |
|----------|--------|------------|
| `HeroSection` | `sections/home/` | Home |
| `AboutSummarySection` | `sections/home/` | Home |
| `ShowcaseProjectsSection` | `sections/home/` | Home |
| `ProjectsGridSection` | `sections/projects/` | `/projects` |
| `ProjectModal` | `components/ui/` | Home, `/projects` |
| `BioSection` | `sections/about/` | `/about` |

---

## Verifikasi

Setelah perubahan pada Home atau project flow:

```bash
npm run build
npx eslint [file-yang-berubah]
```

Checklist manual:
- [ ] Navbar anchor scroll di Home (desktop + mobile)
- [ ] Project card membuka modal di Home dan `/projects`
- [ ] Modal tutup via backdrop, tombol X, dan Escape
- [ ] Locale switcher (`id` ↔ `en`) pada semua halaman
- [ ] `/about` dan `/projects` tetap accessible

---

## Keputusan Arsitektur Saat Ini

| Keputusan | Pilihan |
|-----------|---------|
| Home sebagai pusat portfolio | Ya |
| Navbar anchor-based | Ya |
| Project detail via modal | Ya (sementara) |
| `/about` dan `/projects` sebagai halaman sekunder | Ya |
| `/projects/[id]` halaman terpisah | Belum |
| Blog di Home | Tidak (belum prioritas) |
| Contact section di Home | Belum |

---

*Terakhir diselaraskan dengan codebase: Juli 2026*