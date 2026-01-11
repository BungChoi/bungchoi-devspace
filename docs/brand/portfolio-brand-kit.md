# Portfolio Brand Kit (Blog + One-page Portfolio)

> Dokumen ini adalah “brand source of truth” untuk portofolio Anda: positioning, gaya komunikasi, identitas visual, serta aturan konten agar konsisten di Home dan Blog.

---

## 1) Brand Foundation

### 1.1 Brand statement (1 kalimat)
**Saya membantu [target] menyelesaikan [jenis problem] melalui [kapabilitas inti] dengan hasil yang [terukur].**

Contoh (sesuaikan):
- Saya membantu tim produk membangun aplikasi mobile yang **stabil, cepat, dan mudah dirawat** melalui praktik **clean architecture, performance tuning, dan testing** dengan hasil yang **terukur**.

### 1.2 Target audiens utama
- **Recruiter / hiring manager** (mencari sinyal: impact, konsistensi, cara berpikir).
- **Tech lead / engineer** (mencari sinyal: kualitas engineering, trade-off, maintainability).
- **Klien/founder** (mencari sinyal: eksekusi cepat, komunikasi jelas, outcome-driven).

### 1.3 Diferensiasi (pilih 2–3 yang paling kuat)
- **Case-study driven**: fokus pada problem → solusi → hasil → pembelajaran.
- **Maintainability first**: arsitektur jelas, komponen reusable, debt terkendali.
- **Performance & reliability**: optimasi + observability (logging/analytics/crash).
- **Product-minded engineering**: selalu mengaitkan teknis ke impact pengguna/bisnis.

### 1.4 Pilar kompetensi (messaging pillars)
1. **Build** — eksekusi fitur end-to-end, rapi, scalable.
2. **Improve** — refactor, performance, quality, testing.
3. **Measure** — definisi metrik, evaluasi, dan iterasi.

---

## 2) Voice, Tone, dan Aturan Penulisan

### 2.1 Voice (karakter tetap)
- **Jelas, ringkas, evidence-based** (lebih banyak data/observasi daripada opini).
- **Praktis** (pakai struktur, checklist, template).
- **Profesional** (tanpa bahasa berlebihan; “show, don’t tell”).

### 2.2 Tone (menyesuaikan konteks)
- **Home/Portfolio**: tegas, singkat, meyakinkan.
- **Case study**: analitis, transparan soal trade-off & constraint.
- **Notes**: lebih santai, tetap rapi dan actionable.

### 2.3 Do / Don’t
**Do**
- Tulis problem statement yang spesifik.
- Cantumkan constraint dan trade-off.
- Sertakan hasil (angka, sebelum-sesudah, atau proxy metrics).
- Buat pembaca cepat paham dalam 20–30 detik (ringkasan di atas).

**Don’t**
- Klaim “expert” tanpa bukti.
- Paragraph terlalu panjang tanpa struktur.
- Menyembunyikan keterbatasan data (lebih baik transparan).

---

## 3) Messaging System (Copy Framework)

### 3.1 Formula headline Home
**[Role] yang fokus pada [prioritas] untuk menghasilkan [outcome].**

Contoh:
- Flutter Mobile Developer yang fokus pada **clean architecture** dan **performance** untuk menghasilkan aplikasi yang **stabil dan mudah dirawat**.

### 3.2 Elevator pitch (± 60–90 detik)
- Saya [role] dengan fokus [2–3 strength].
- Saya sering menangani [jenis case] dan suka mengubah problem menjadi solusi yang terukur.
- Portofolio ini berisi case study: konteks, keputusan teknis, trade-off, dan hasil.

### 3.3 CTA (call to action) set
- Primary: **“Lihat Case Studies”**
- Secondary: **“Hubungi Saya”**, **“Download CV”**, **“Buka GitHub”**

### 3.4 “Impact-first” microcopy
Gunakan pola:
- **“Menurunkan …”**, **“Mempercepat …”**, **“Mengurangi …”**, **“Meningkatkan …”**
- Sertakan angka bila ada: **-30%**, **+12%**, **1.8s → 0.9s**, dll.

---

## 4) Visual Identity (Prinsip Desain)

> Anda bisa pakai tema minimal dengan 1 warna utama + 1 aksen, sisanya netral. Berikut rekomendasi yang aman untuk portfolio engineering.

### 4.1 Palet warna (rekomendasi)
- **Primary**: #2563EB (blue)
- **Accent**: #22C55E (green) *atau* #F59E0B (amber) untuk highlight
- **Neutral**: #0B1220 (text dark), #111827 (bg dark), #F8FAFC (bg light), #E5E7EB (border)

**Rules**
- Primary untuk CTA & link penting.
- Accent hanya untuk badge hasil/impact (hemat penggunaan).

### 4.2 Tipografi (rekomendasi)
- Sans modern: **Inter** / **System UI**
- Skala ukuran:
  - H1: 36–44px
  - H2: 24–30px
  - Body: 16–18px
  - Caption: 12–14px
- Line-height nyaman: 1.5–1.75

### 4.3 Layout & komposisi
- Grid 12 kolom atau container max-width 960–1140px
- Spacing konsisten (8px system): 8 / 16 / 24 / 32 / 48
- Card: radius 12–16, border tipis, shadow ringan

### 4.4 Dark mode
- Default bisa dark (engineering-friendly), pastikan kontras tinggi:
  - Background: #0B1220
  - Card: #0F172A
  - Text: #E5E7EB
  - Muted: #94A3B8

---

## 5) Information Architecture (Halaman & Section)

### 5.1 One-page Portfolio (Home)
Navbar:
- Home, Case Studies, Skills, About, Contact, Blog

Sections:
1. **Hero** (positioning + CTA)
2. **Highlights** (3–4 kartu “strength/credibility”)
3. **Featured Case Studies** (3–6 kartu)
4. **Skills & Stack**
5. **How I Work** (process)
6. **About**
7. **Contact**
8. **Footer**

### 5.2 Blog
- **/blog**: index + search + filter tags + sort
- **/blog/[slug]**: detail post (case study / notes)

---

## 6) Component Kit (UI yang perlu dibuat)

### 6.1 Komponen utama
- Navbar (sticky, active section highlight, mobile drawer)
- SectionHeader (title + subtitle)
- Button (primary/secondary/ghost)
- CaseStudyCard (judul, ringkasan, tags, impact badge, link)
- TagChip
- MetricBadge (mis. “-30% load time”)
- ContactForm (minimal)
- Footer

### 6.2 Komponen blog
- PostLayout (TOC + content + related posts)
- SearchInput
- TagFilter
- SortDropdown
- Pagination

---

## 7) Content System (Jenis konten & aturan)

### 7.1 Jenis konten
1. **Case Study (utama)**
   - panjang: 6–12 menit baca
   - fokus: problem → keputusan → hasil

2. **Notes**
   - panjang: 2–5 menit baca
   - fokus: pembelajaran singkat, tips, checklist

### 7.2 Template Case Study (heading wajib)
- Context
- Problem
- Goals & Success Metrics
- Constraints
- Solution (Approach + Trade-offs)
- Implementation Highlights
- Results
- Lessons Learned
- Next Steps

### 7.3 Metadata post (disarankan)
Gunakan frontmatter (kalau pakai MD/MDX):
- title
- date
- type: case-study | note
- tags: [flutter, architecture, performance, testing, devops, product]
- featured: true/false
- summary (1–2 kalimat)
- cover (opsional)
- metrics (opsional): list ringkas untuk badge

### 7.4 Taksonomi tag (rekomendasi)
- Domain: edtech, fintech, ecommerce (opsional)
- Tech: flutter, dart, firebase, rest, graphql
- Engineering: architecture, clean-code, performance, testing, ci-cd, security, analytics, offline

**Rule**
- 3–5 tag per post (jangan kebanyakan).

---

## 8) Portfolio “Proof Points” (yang harus terlihat oleh pembaca)

Pastikan pengunjung bisa menemukan ini dalam 1–2 scroll:
- 3 case studies unggulan
- Tech stack inti
- Cara kerja (process)
- Cara kontak + link GitHub/LinkedIn/CV

---

## 9) Copy Blocks (siap pakai; ganti placeholder)

### 9.1 Hero
**Headline:**  
{NAMA} — {ROLE}

**Subheadline:**  
Saya membangun aplikasi mobile yang fokus pada {PRIORITAS_1} dan {PRIORITAS_2}, dengan pendekatan engineering yang rapi dan outcome yang terukur.

**CTA:**  
- Lihat Case Studies
- Hubungi Saya

### 9.2 About (singkat)
Saya {ROLE} dengan fokus pada {2–3 strength}. Portofolio ini berisi studi kasus nyata: konteks, keputusan teknis, trade-off, dan hasil yang saya capai.

### 9.3 Case study card (ringkasan)
**{Judul}**  
Problem: {1 kalimat problem}.  
Solusi: {1 kalimat solusi}.  
Hasil: {angka/impact singkat}.  
Tags: {tag1, tag2, tag3}

### 9.4 Contact
Punya project atau role yang relevan? Kirim pesan melalui form atau email ke {EMAIL}. Saya biasanya membalas dalam {SLA}.

---

## 10) Definition of Done (ceklist kualitas)
- Navbar anchor bekerja + mobile navigation rapi
- Featured case studies link benar ke blog post
- Blog index punya search + tag filter
- Post page punya TOC + related posts
- SEO dasar: title/meta + OG default + sitemap
- Lighthouse performa baik (gambar dioptimasi, lazy-load)

---

## 11) Next: Isi Data Brand Anda
Isi item berikut supaya brand kit ini “final”:
- {NAMA}
- {ROLE}
- {PRIORITAS_1}, {PRIORITAS_2}
- {EMAIL}
- {SLA} (mis. “24–48 jam”)
- 3–6 judul case study unggulan + 1 kalimat impact masing-masing
