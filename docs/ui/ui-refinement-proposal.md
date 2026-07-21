# UI Refinement Proposal — Portfolio Craft Upgrade

> **Status:** Proposal — **keputusan inti disetujui** (siap F1 setelah sign-off sisa opsional)  
> **Tanggal:** 2026-07-14 · **Update keputusan:** 2026-07-14  
> **Branch target:** `development`  
> **Prinsip:** *Inspired by references, owned by Bungchoi* — naikkan craft layout/motion; persona engineering tetap; **palette diganti ke monochrome R1-inspired (dark reading)**.

Dokumen ini merangkum arah redesign UI portofolio terbaru, sumber referensi (termasuk kurasi resource eksternal), keputusan adaptasi, scope per prioritas, dan fase implementasi. Keputusan D1–D3 & D6 sudah di-lock (lihat §10).

---

## 1. Ringkasan eksekutif

Portofolio saat ini sudah fungsional (Next.js + Tailwind, dark teal/cyan, multi-section Home, modal project, i18n). Kualitas **konten & struktur data** relatif matang; yang ingin dinaikkan adalah **visual craft, hierarchy, motion, dan sistem warna** agar setara portfolio modern 2025–26 tanpa jadi “demo component library”.

**Keputusan arah (disetujui): Opsi B + recolor monochrome (dark reading of R1)**

| Opsi | Deskripsi | Verdict |
|------|-----------|---------|
| **A. Polish only** | Hero type, card hover, CTA — tanpa ubah IA | Terlalu kecil vs goal |
| **B. Adapt layout + motion + case study** | IA work-first, project detail page, signature motion | **Disetujui** |
| **Recolor** | Tinggalkan teal/cyan; palette monochrome ala R1, diadaptasi **dark** | **Disetujui (D1)** |
| **C. Full clone referensi** | Light cloud shell + 4 section saja + potong Hobi | **Ditolak** — IA engineering & Hobi tetap |

---

## 2. Goals & non-goals

### 2.1 Goals

1. **Work-first hierarchy** — setelah hero, bukti kerja langsung terbaca (recruiter 20–30 detik).
2. **Typography-driven hero** — nama/role besar, pitch pendek, CTA jelas.
3. **Case study yang shareable** — detail project terasa “halaman”, bukan sekadar modal generik (keputusan route vs modal: lihat §10).
4. **Satu–dua signature motion** yang memorable, bukan animasi di setiap elemen.
5. **Tetap engineering identity** — Flutter/mobile, impact, tech stack, maintainability.
6. **i18n (id/en) & a11y** — `prefers-reduced-motion`, contrast, keyboard/focus.

### 2.2 Non-goals

- Clone 1:1 Dribbble shot Dymas Alfin (monochrome, cloud background, persona UI/UX designer).
- Rebuild total menjadi etalase [Skiper UI](https://skiper-ui.com/) (library komponen, bukan portfolio identity).
- Membuang sinyal hire: education, achievements, GitHub/Spotify (**Hobi tetap tampil** — D6; tidak di-hide).
- Langganan/stack berbayar wajib; library motion JS di P0 (CSS dulu — D3).

---

## 3. Referensi keseluruhan

Semua link di bawah adalah **sumber inspirasi / toolbox**. Yang diadopsi adalah **prinsip & pola**, bukan skin pixel-perfect.

### 3.1 Referensi utama (arah layout & motion)

| # | Sumber | URL | Peran dalam proposal |
|---|--------|-----|----------------------|
| R1 | **Personal Portfolio Website — Animations** (Dymas Alfin, Dribbble) | https://dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations | **Primary layout & motion language** |
| R1a | Video demo lokal (download user) | `~/Downloads/cffee89fe064aafdc89a239e3484a6cd.mp4` (~21.5s, 1566×1080) | Analisis frame-by-frame; frame extract di `.tmp/dribbble-ref/` (dev only) |
| R2 | **Skiper UI** | https://skiper-ui.com/ | Standar **craft interaction** (bukan full visual identity) |
| R3 | **Kurasi resource Ahmad Fikril** | https://www.fikril.dev/resources | Toolbox design-engineering & motion patterns |

#### Breakdown R1 (video Dymas) — flow yang dianalisis

| Detik (approx) | Section | Karakter visual |
|----------------|---------|-----------------|
| 0–4s | Hero | Card putih di atas sky/cloud; nav minimal + pill “Available”; nama large-type (outline + solid); foto portrait center; pitch kiri + social kanan; CTA “Let’s collaborate” |
| 4–8s | Work | Grid 2×2; thumbnail project kuat; title + chip tag; hover arrow |
| 8–12s | Service | List large type; watermark `/SERVICE`; row + arrow |
| 12–16s | Experience | Panel gelap; list role/company/tanggal; **hover → mockup phone melayang** (signature) |
| 16–20s | Project detail | Case study header: tags, title, deskripsi, tools, timeline, Live Preview / Contact, screenshot |
| 20–22s | CTA | Banner “HAVE A PROJECT IN MIND?” + availability pill |

**Tag / bahasa desain R1:** animation, brutalism-lite, clean, large type, minimalist, monochrome, personal portfolio.

**Yang diambil dari R1:** IA work-first, large type, grid work, experience hover preview, case study header, soft page/section transitions, CTA band.

**Yang tidak ditelan mentah:** light cloud wallpaper wajib sebagai shell satu-satunya, potong site jadi 4 section, hide Hobi, label Service freelancers-only, social Dribbble/Behance sebagai primer.

**Yang diadaptasi untuk warna (D1):** bahasa monochrome R1 (netral hitam/putih/abu, aksen status hijau hemat) dibaca sebagai **dark theme** — surface gelap, text terang, border soft; **bukan** mempertahankan primary teal/cyan saat ini.

#### Breakdown R2 (Skiper UI)

- Library **uncommon components** untuk shadcn/ui + Next.js + Tailwind + Motion.
- Aesthetic craft tinggi (dynamic island, image trail, drag-scroll, dsb.) — cocok sebagai **referensi kualitas micro-interaction**, berbahaya jika dipakai sebagai “wajah portfolio”.
- Pricing pro ada; **bukan dependency wajib** untuk proposal ini.
- Inspirasi filosofis: Devouring Details / Rauno-level polish.

**Yang diambil dari R2:** standar detail hover/focus/transition; ide 1 momen premium (bukan 10).

**Yang ditolak:** full stack shadcn+Skiper sebagai rebrand; animasi “showroom” yang mengalahkan case study.

#### Breakdown R3 (fikril.dev/resources)

Kurasi tools & references untuk developer / design engineer. **Bukan satu look** — dipakai sebagai menu toolbox per kebutuhan fase.

| Resource | URL | Kegunaan potensial di project ini |
|----------|-----|-----------------------------------|
| **beUI** | https://beui.dev/ | Motion toolkit React/Next, shadcn-compatible — alternatif pola animasi section/card |
| **Cuelume** | https://cuelume-site.pages.dev/ | Interaction sounds (opsional, low priority) |
| **Skiper UI** | https://skiper-ui.com/ | Lihat R2 |
| **Amicro** | https://amicro.vercel.app/ | Micro-transitions product UI — polish hover/press |
| **Aside** | https://aside.com/ | Referensi produk AI browser (bukan UI portfolio) |
| **Athas** | https://athas.dev/ | Editor; di luar scope UI site |
| **compact-landing** | https://compact-skill.dev/ | Skill agent untuk landing compact — ide density copy |
| **Create UI** | https://createui.co/ | Design system Figma↔React (opsional long-term) |
| **Design Systems Surf** | https://designsystems.surf/ | Gallery design system — token/hierarchy reference |
| **Dither Kit** | https://www.tripwire.sh/dither-kit | Efek image retro (opsional accent, jangan overuse) |
| **EffectSoup** | https://www.effectsoup.com/ | Image effects browser (eksperimen visual) |
| **Fluid Functionalism** | https://www.fluidfunctionalism.com/ | Komponen open-source systems-minded |
| **Flutter Pro Design** | https://flutterpro.design/ | **Relevan brand:** craft detail mobile/Flutter |
| **glimm** | https://glimm.dev/ | Shader page transitions (hati-hati perf; opsional P2) |
| **Kapso** | https://kapso.com/ | WhatsApp API — di luar scope UI |
| **NameThat** | https://namethatui.com/ | Kamus UI + prompt agent — bantu naming komponen |
| **Paper Shaders** | https://shaders.paper.design/ | Shader React/GLSL (background subtle P2) |
| **React Card Components** | https://v0-react-card-components.vercel.app/ | Pola card minimal |
| **React Doctor** | https://www.react.doctor/ | Static analysis React — quality, bukan visual |
| **Recent Design** | https://recent.design/ | Inspirasi desain umum |
| **Reverse UI** | https://reverseui.com/ | Animated components premium (bandingkan dengan Skiper) |
| **slot-text** | https://textmotion.dev/ | Text roll labels — hero microcopy P1/P2 |
| **Taste Skill** | https://www.tasteskill.dev/ | Skill AI coding agent agar UI kurang generic |
| **The Design System Guide** | https://thedesignsystem.guide/ | Checklist design system |
| **Transitions.dev** | https://transitions.dev/ | **Copy-paste CSS/motion patterns** — sangat relevan P0 motion |
| **Transitions.dev Refine** | https://transitions.dev/refine | Tuning timing motion dengan agent |
| **UI Skills** | https://www.ui-skills.com/ | A11y, motion, frontend craft skills |
| **userinterface.wiki** | https://www.userinterface.wiki/ | Prinsip design, type, motion |
| **Vault (Arlan)** | https://www.arlan.me/vault | Pattern interaction di-breakdown |

**Prioritas toolbox untuk implementasi nanti:**

| Prioritas | Resource | Alasan |
|-----------|----------|--------|
| P0 | Transitions.dev, Amicro, userinterface.wiki | Pattern motion & prinsip tanpa lock-in |
| P1 | beUI, slot-text, React Card Components, Flutter Pro Design | Pola section/card + text motion + craft mobile |
| P2 | Paper Shaders, glimm, Dither/EffectSoup, Skiper/Reverse UI select | Efek premium opsional |
| Agent DX | Taste Skill, UI Skills, NameThat, React Doctor | Kualitas implementasi & naming saat coding dengan AI |

### 3.2 Referensi internal (sumber kebenaran brand & layout saat ini)

| Dokumen | Path | Peran |
|---------|------|--------|
| Brand kit | `docs/brand/portfolio-brand-kit.md` | Voice, audience, messaging, CTA |
| Layout current | `docs/brand/portfolio-layout.md` | Struktur site aktual |
| Single-page plan | `docs/ui/single-page-portfolio-plan.md` | State + roadmap SPA |
| Design system | `docs/technical/DESIGN_SYSTEM.md` | Token warna/type/spacing |
| Components arch | `docs/technical/components-architecture.md` | Struktur komponen |
| About arch | `docs/ui/about-page-architecture.md` | Halaman about |
| Architecture | `docs/technical/ARCHITECTURE.md` | Stack & boundaries |

### 3.3 Referensi inspirasi sekunder (disebut di diskusi, bukan wajib)

| Sumber | Catatan |
|--------|---------|
| Devouring Details / Rauno | Filosofi detail interaction (via Skiper) |
| Portfolio design-engineer monochrome trend 2025–26 | Hindari generic “semua site sama” |

---

## 4. Baseline: kondisi UI saat ini

Ringkas dari implementasi + docs layout (bukan inventaris penuh).

### 4.1 Stack UI

- Next.js 16, React 19, Tailwind 4, next-intl
- **Tanpa** shadcn / Framer Motion (saat proposal ditulis)
- Design tokens: CSS variables di `app/globals.css` (dark default, primary teal, accent cyan)

### 4.2 Home section order (current)

```text
HeroSection
TechMarqueeSection
AboutSummarySection      (#about)
HobiSection              (#hobi — Spotify + GitHub)
EducationSection         (#experience)
WorkExperienceSection    (#work-experience)
ShowcaseProjectsSection  (#projects)
AchievementsSection
Footer
```

### 4.3 Project detail (current)

- `ProjectModal` popup — belum shareable URL dedicated (route detail ada folder `[id]` di tree; perilaku utama masih modal — verifikasi saat implementasi)

### 4.4 Gap vs referensi R1

| Aspek | Current | Target (proposal) |
|-------|---------|-------------------|
| Hierarchy | Banyak section setara, work di bawah | Work segera setelah hero |
| Hero | Kolom + rotating statements | Large type, pitch pendek, calm |
| Projects | Card + modal | Grid heroik + case study layout |
| Experience | List/timeline biasa | List + hover preview media |
| Motion | Minimal / ad-hoc | Section enter + 1–2 signature |
| CTA band | Footer generik | CTA tegas pre-footer |
| Visual shell | Full-bleed dark sections | Opsional: surface/card rhythm lebih jelas (tanpa wajib cloud) |

---

## 5. Arah desain (Design direction)

### 5.1 Positioning visual

> **Engineering portfolio dengan craft setara designer portfolio modern** — tenang, large type, work-first, motion selektif (CSS dulu). **Palette: monochrome dark ala R1** (bukan teal/cyan lama). Voice copy tetap evidence-based / engineering.

### 5.2 Mood board verbal

| Dimensi | Ya | Tidak |
|---------|----|-------|
| Type | Besar, tegas, sedikit kata | Paragraph hero panjang |
| Color | Dark monochrome (zinc/neutral) + aksen status hijau hemat | Teal/cyan sebagai primary lama; rainbow badges |
| Motion | CSS 200–400ms ease; stagger ringan | Motion library di P0; cursor trail; shader di setiap scroll |
| Density | Breathing room di hero & work | 8 section setara-weight di atas fold |
| Proof | Screenshot app, impact metrics | Dekorasi tanpa data |
| Hobi | Spotify + GitHub **tetap ada** di Home | Hide total |

### 5.3 Color (D1 — disetujui)

R1 aslinya **light** (card putih di atas sky/cloud) dengan panel Experience **dark**. Untuk site ini kita ambil **dark reading** bahasa yang sama:

| Token arah | Arah nilai (draft — difinalisasi di F1) | Catatan |
|------------|----------------------------------------|---------|
| Background | Near-black / zinc-950 | Bukan `#0a0a0b` + teal wash |
| Surface / card | Zinc-900 elevasi soft | Card “mengambang” seperti R1, mode gelap |
| Text primary | Near-white | Large type solid |
| Text muted | Zinc-400/500 | Hierarchy |
| Border | Zinc-800 | Hairline |
| Inverse panel | Putih / off-white opsional | Untuk contrast block (mirip R1 light card di dark page) **atau** surface elevated saja |
| Accent | Hijau soft **hanya** status available / success | Seperti pill R1 |
| Primary CTA | Solid light-on-dark atau dark-on-light inverse | Bukan tombol teal |
| **Deprecated** | `--color-primary-*` teal, `--color-accent-*` cyan sebagai brand utama | Di-retire di F1; semantic tokens diganti |

**Bukan:** clone cloud wallpaper light full-page (boleh jadi P2 texture subtle).  
**Ya:** monochrome craft, contrast tajam, hemat aksen warna.

Dokumen terkait yang perlu di-update **saat F1 ship:** `docs/technical/DESIGN_SYSTEM.md`, `app/globals.css`, brand kit § visual identity.

### 5.4 Typography

- Scale naik untuk H1 nama / section watermark (`/WORK`, `/EXPERIENCE` style opsional).
- Body tetap readable (Inter / system UI-safe).
- Outline-letter hero opsional; fallback weight contrast solid jika contrast bermasalah.

### 5.5 Motion principles (D3 — CSS dulu)

1. **One hero entrance** per page load (CSS).
2. **Section reveal** on scroll (once) — fade/slide 16–24px (CSS + IntersectionObserver ringan jika perlu).
3. **List stagger** max ~50–80ms antar item (CSS `animation-delay` dulu).
4. **Signature (F3):** experience row hover → floating preview.
5. **Respect** `prefers-reduced-motion: reduce`.
6. **P0:** CSS (+ sedikit JS). **Library `motion` menyusul** hanya jika terbukti perlu (pasca-F3 atau P1) — **tidak di P0**.

Toolbox P0: [Transitions.dev](https://transitions.dev/), [Amicro](https://amicro.vercel.app/). beUI / Motion JS = belakangan.

---

## 6. Information architecture target

### 6.1 Home (proposed order)

```text
1. Hero                    — nama, foto, pitch, CTA, social, availability (opsional)
2. Featured Work           — 4–6 project, grid 2 kolom (desktop)
3. Capabilities            — “what I do” engineering (bukan Service branding murni)
4. Experience              — work history + hover preview
5. Hobi / activity         — Spotify + GitHub (**tetap tampil**, D6 — tidak di-hide)
6. About compact           — bio ringkas + education (lebih padat)
7. Achievements            — secondary weight, tetap ada
8. CTA band                — open to roles / collab
9. Footer
```

**Tech marquee:** pindah ke dalam Capabilities atau About compact — **tidak** langsung di bawah hero.  
**Hobi (D6):** tetap di Home. Urutan di atas boleh disetel di F5 (mis. setelah About), asalkan section tidak dihapus/disembunyikan.

### 6.2 Mapping label

| R1 (referensi) | Bungchoi (target) |
|----------------|-------------------|
| Work | Featured Work / Projects |
| Service | Capabilities (Mobile · Flutter · API · Performance & polish) |
| Experience | Experience (existing data) |
| Contact / Let’s Talk | Contact + mailto / form belakangan |
| Let’s collaborate | Primary: Lihat case studies · Secondary: Hubungi saya |
| Dribbble/Behance | GitHub, LinkedIn, Email, Play Store (relevan) |

### 6.3 Routes

| Route | Peran target |
|-------|----------------|
| `/[locale]` | Landing work-first di atas |
| `/[locale]/projects` | Full grid semua project |
| `/[locale]/projects/[id]` | **Case study dedicated page** (D2) — layout ala R1 project detail |
| `/[locale]/about` | Deep dive bio/edu/experience/awards (tetap) |

**D2 disetujui:** dedicated page, bukan modal sebagai primary. `ProjectModal` boleh di-deprecate atau diarahkan ke route.

### 6.4 Navbar target (usulan)

| Item | Target |
|------|--------|
| Home | `/#` hero |
| Work | `/#work` atau `/projects` |
| Experience | `/#experience` |
| About | `/#about` atau `/about` |
| CTA | Hire / Contact (`mailto` dulu) |

Counts di nav ala R1 (`Work [4]`) — **opsional P1**, bagus untuk signal volume.

---

## 7. Scope redesign per area

### 7.1 P0 — Must ship (inti refinement)

| ID | Area | Perubahan | Referensi |
|----|------|-----------|-----------|
| P0-1 | **IA Home** | Reorder work-first; **Hobi tetap** (D6); secondary di bawah | R1 · D6 |
| P0-2 | **Hero** | Large type name; pitch 1–2 kalimat; CTA dual; social; kurangi/rotator optional | R1 |
| P0-3 | **Featured Work grid** | 2-col, thumbnail lebih besar, tags minimal, hover lift/arrow | R1, React Card |
| P0-4 | **Case study page** | `/projects/[id]` — header meta (timeline, tools, role), CTAs, media; link dari grid | R1 detail · **D2** |
| P0-5 | **Experience list** | Clean rows + **hover preview** media | R1 signature |
| P0-6 | **CTA band** | Pre-footer statement + availability | R1 |
| P0-7 | **Motion base (CSS)** | Section enter + reduced-motion; **tanpa** motion lib | Transitions.dev, Amicro · **D3** |
| P0-8 | **Recolor monochrome dark** | Retire teal/cyan primary; token netral + CTA inverse + accent status | R1 · **D1** · DESIGN_SYSTEM |

### 7.2 P1 — Should ship (polish craft)

| ID | Area | Perubahan | Toolbox |
|----|------|-----------|---------|
| P1-1 | Capabilities section | Large-type list rows + link/expand | R1 Service pattern |
| P1-2 | Nav counts / active states | `Work [n]` style optional | R1 |
| P1-3 | Text micro-motion | Subtle label/role (slot-text style, hemat) | slot-text |
| P1-4 | Project card media quality | Consistent aspect ratio, better crop | — |
| P1-5 | About compact | Merge education ringkas tanpa full page clone | brand kit |
| P1-6 | Agent skills | Taste Skill / UI Skills di workflow coding | R3 |
| P1-7 | Focus trap & dialog a11y | Jika tetap modal | UI Skills, a11y |

### 7.3 P2 — Nice to have

| ID | Area | Catatan | Toolbox |
|----|------|---------|---------|
| P2-1 | Light theme R1-inspired | Shell card + soft bg | R1 |
| P2-2 | Shader/bg subtle | Jangan ganggu text | Paper Shaders, glimm |
| P2-3 | Interaction sound | Sangat opsional | Cuelume |
| P2-4 | Select Skiper/beUI component | Hanya 1 momen jika ROI jelas | Skiper, beUI |
| P2-5 | Dither/print accent | Eksperimen brand, hati-hati | Dither Kit |
| P2-6 | Contact form | Beyond mailto | — |

### 7.4 Explicitly out of scope (proposal ini)

- Blog production
- Full shadcn migration
- Membeli Skiper Pro sebagai dependency inti
- 3D/WebGL hero wajib
- Menghapus i18n atau data achievements/education

---

## 8. Konten & komponen (impact codebase)

### 8.1 Section components (perkiraan sentuhan)

| Komponen | Aksi |
|----------|------|
| `HeroSection` | Redesign layout/type/CTA |
| `ShowcaseProjectsSection` / grid | Visual + hierarchy P0 |
| `WorkExperienceSection` | + hover preview |
| `TechMarqueeSection` | Relocate |
| `AboutSummarySection` | Compact / merge |
| `HobiSection` | **Tetap tampil (D6)**; boleh di-reorder di F5, tidak di-hide |
| `EducationSection` | Compact di about cluster |
| `AchievementsSection` | Secondary |
| `ProjectModal` | Deprecate / redirect → `/projects/[id]` |
| Project detail page | **Baru/complete** case study layout R1 |
| `Navbar` / `Footer` | Nav targets + CTA band |
| **Baru:** `CapabilitiesSection`, `CtaBandSection` | P0/P1 |
| **Baru (opsional):** motion utilities / `usePrefersReducedMotion` | P0 |

### 8.2 Data

- Projects: pastikan cover image berkualitas grid 2-col.
- Experience: field opsional `previewImage` / `previewProjectId` untuk hover.
- Capabilities: data baru di `lib/data` atau constants (i18n keys).
- Availability: flag di profile/constants untuk pill status.

### 8.3 i18n

- Semua string section baru di `lib/messages/id.json` & `en.json`.
- Copy mengikuti brand kit: jelas, evidence-based, tanpa klaim kosong.

### 8.4 Dependencies (usulan)

| Dependency | P0? | Catatan |
|------------|-----|---------|
| CSS only motion | **Ya (wajib preferensi D3)** | Section enter, hover, stagger delay |
| `motion` (Framer Motion) | **Tidak di P0** — menyusul | Evaluasi pasca-F3 / P1 |
| shadcn | Tidak wajib | Hanya jika fondasi jangka panjang terpisah |
| Skiper / Reverse UI paid | Tidak | Evaluasi ulang di P2 |

---

## 9. Fase implementasi (setelah approval)

| Fase | Fokus | Deliverable | Exit criteria |
|------|-------|-------------|---------------|
| **F0** | Lock decisions (done: D1–D3, D6) | Proposal updated | D4/D5/D7/D8 optional confirm |
| **F1** | Foundation | **Recolor monochrome dark** + type/spacing tokens + CSS motion util + reduced-motion | `globals.css` + DESIGN_SYSTEM updated; teal/cyan retired |
| **F2** | Hero + Work grid | Home top half craft R1 (dark mono) | i18n ok; grid → link ke detail page |
| **F3** | Experience hover + Capabilities + CTA | Signature CSS hover + IA | Preview desktop; mobile fallback |
| **F4** | Case study **page** | `/projects/[id]` full layout; deprecate modal primary | Shareable URL works |
| **F5** | Secondary cleanup | Marquee relocate; **Hobi tetap**; awards weight | Home hierarchy jelas |
| **F6** | P1 polish | Nav counts, text motion, media | Optional |
| **F7** | P2 / motion lib | Light variant, shader, **baru pertimbangkan `motion`** | Feature-flagged |

Estimasi kasar (1 engineer, part-time sense): **F1–F4 ≈ 1–2 minggu** equivalent effort; P1/P2 menyusul.

---

## 10. Keputusan (sign-off)

### 10.1 Locked (user — 2026-07-14)

| # | Pertanyaan | Keputusan final | Implikasi |
|---|------------|-----------------|-----------|
| **D1** | Mood / color | **Light-first (Phase 0)** — palette dari panel hero R1 (`#eef0f2` page / `#f5f5f6` card / black CTA). Dark opsional belakangan. | Tokens di `globals.css`; teal/cyan retired |
| **D2** | Case study | **Dedicated `/projects/[id]` only** (primary) | F4 page; modal bukan jalur utama |
| **D3** | Motion | **CSS dulu**; motion library **menyusul** | Tidak add `motion` di P0 |
| **D6** | Hobi (Spotify/GitHub) | **Biarkan / jangan di-hide** | Tetap di Home; reorder OK di F5 |

#### Catatan D1 (klarifikasi)

Referensi Dymas **asli light** (white card + cloud). Keputusan user: **mode gelap dengan bahasa visual yang sama** (mono, large type, surface contrast, aksen status hijau) — **dark reading**, plus **penggantian color system** (retire teal/cyan sebagai brand primary).

Ini **bukan** “tetap dark teal lama”, dan **bukan** wajib full light-cloud clone.

### 10.2 Masih default (belum ditolak user — anggap approved kecuali diubah)

| # | Pertanyaan | Default berlaku | Boleh ubah kapan |
|---|------------|-----------------|------------------|
| D4 | Availability pill | **Ya** jika status real | Sebelum F2 hero |
| D5 | Capabilities copy | Mobile · Flutter architecture · API integration · UI polish & performance | F3 |
| D7 | Nav counts `Work [n]` | **P1** | F6 |
| D8 | Light theme full R1 | **P2 only** | Setelah dark mono stabil |

---

## 11. Success metrics

| Metrik | Cara nilai |
|--------|------------|
| Time-to-work | Work grid terlihat tanpa scroll berlebih di desktop (ideal: within 1 viewport setelah hero singkat) |
| Clarity | Orang asing paham role + 1 proof project dalam 30 detik |
| Motion quality | Terasa polished, tidak menghalangi baca; reduced-motion OK |
| Identity | Masih terbaca engineering/Flutter; palette mono dark R1, bukan teal lama / bukan light clone wajib |
| Hobi | Spotify + GitHub masih accessible di Home |
| Tech health | Build/lint pass; no major a11y regression; i18n id/en lengkap untuk string baru |
| Maintainability | Komponen section tetap modular; tokens di CSS variables |

---

## 12. Risiko & mitigasi

| Risiko | Mitigasi |
|--------|----------|
| Terlalu mirip template Dribbble | Keep color, copy engineering, metrics/impact di cards |
| Scope creep Skiper/shaders | Lock P0; P2 feature-flag |
| Hover preview mobile | Tap alternate / disable hover preview, static thumb |
| Modal a11y debt | F4 wajib dialog pattern atau pindah ke page |
| Home terlalu panjang tetap | Ruthless secondary placement; jangan semua section “hero weight” |
| Video/asset besar | Optimize images; lazy load previews |

---

## 13. Acceptance criteria (P0 done)

- [x] Proposal di-review; D1–D3, D6 locked
- [ ] Home order sesuai §6.1 (Hobi tetap)
- [ ] **Recolor monochrome dark** live di globals + components kritis
- [ ] Hero large-type + dual CTA + social
- [ ] Featured work grid 2-col → link `/projects/[id]`
- [ ] Experience hover preview (desktop) + fallback mobile
- [ ] CTA band pre-footer
- [ ] **Case study page** meta layout R1 (tools, timeline, media, CTA)
- [ ] CSS section motion + `prefers-reduced-motion` (tanpa motion lib P0)
- [ ] Hobi section masih ada di Home
- [ ] i18n id/en untuk string baru
- [ ] DESIGN_SYSTEM + brand visual + layout docs di-update selaras ship

---

## 14. Lampiran

### 14.1 Prinsip satu kalimat

> **Naikkan craft seperti portfolio Dymas; jaga jiwa engineering Bungchoi; pakai resource Fikril sebagai toolbox, bukan sebagai identitas.**

### 14.2 Quick link index

- Dribbble R1: https://dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations  
- Skiper: https://skiper-ui.com/  
- Resources Fikril: https://www.fikril.dev/resources  
- Transitions.dev: https://transitions.dev/  
- beUI: https://beui.dev/  
- Amicro: https://amicro.vercel.app/  
- Taste Skill: https://www.tasteskill.dev/  
- UI Skills: https://www.ui-skills.com/  
- Flutter Pro Design: https://flutterpro.design/  
- userinterface.wiki: https://www.userinterface.wiki/  

### 14.3 Related project docs

- `docs/brand/portfolio-brand-kit.md`
- `docs/brand/portfolio-layout.md`
- `docs/ui/single-page-portfolio-plan.md`
- `docs/technical/DESIGN_SYSTEM.md`

### 14.4 Dev-only assets

Frame extract dari video R1 (opsional, gitignore jika besar):

```text
.tmp/dribbble-ref/frame_*.jpg
.tmp/dribbble-ref/detail_*.jpg
```

Video sumber user (di luar repo):

```text
~/Downloads/cffee89fe064aafdc89a239e3484a6cd.mp4
```

---

## 15. Changelog dokumen

| Tanggal | Perubahan |
|---------|-----------|
| 2026-07-14 | Draft awal proposal: Opsi B, R1/R2/R3 full index, P0–P2, fase, open decisions |
| 2026-07-14 | **Lock D1** dark mono R1 + recolor (retire teal/cyan); **D2** dedicated page; **D3** CSS motion only P0; **D6** Hobi keep |
| 2026-07-14 | **Shipped F1+F2:** monochrome tokens + motion utils; Hero large-type; Work grid → `/projects/[id]`; Home work-first; Hobi kept |
| 2026-07-14 | **Phase 0 light-first:** default tokens light (panel palette); navbar/footer/bg light; temp `foto-transparent.png` cutout |

---

**Next step:** **F3** Experience hover + Capabilities + CTA band · **F4** deepen case study page craft.
