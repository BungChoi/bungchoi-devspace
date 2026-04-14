# Single Page Portfolio Plan

## Ringkasnya
Portfolio akan diarahkan menjadi **single-page landing portfolio**. Halaman Home menjadi pusat informasi utama: profil, skill, experience, project, achievement, dan kontak. Navigasi utama tidak lagi mendorong user berpindah halaman untuk membaca About atau daftar Project.

Halaman detail yang tetap dipertahankan sebagai halaman terpisah adalah **Project Detail**, karena project membutuhkan penjelasan studi kasus yang panjang.

---

## 1. Tujuan Perubahan

### Kondisi Saat Ini
- Home berisi hero, activity/hobi, showcase project, dan blog preview.
- About dan Projects punya halaman terpisah.
- Navbar mengarahkan user ke route halaman, misalnya `/about` dan `/projects`.
- Untuk memahami portfolio, user perlu berpindah-pindah halaman.

### Target Baru
- Home menjadi halaman utama yang lengkap dan mudah dibaca.
- Navbar mengarah ke anchor section di Home.
- Project card tetap bisa membuka halaman detail project.
- About dan Projects route boleh tetap ada sebagai fallback, tetapi tidak menjadi jalur utama navigasi.

---

## 2. Prinsip Layout

### Simple First
Konten harus langsung menunjukkan siapa pemilik portfolio, role, skill utama, pengalaman, dan project. Hindari section yang terlalu dekoratif jika tidak membantu pembaca memahami value.

### Single Reading Flow
User membaca dari atas ke bawah:
1. Siapa saya.
2. Apa fokus saya.
3. Experience dan achievement.
4. Project yang bisa dibuka detailnya.
5. Cara menghubungi saya.

### Project Detail Tetap Terpisah
Project detail tetap berada di route:
- `/id/projects/[id]`
- `/en/projects/[id]`

Alasannya, project detail perlu format dokumentasi/case study yang lebih panjang.

---

## 3. Struktur Home Baru

Urutan section yang direncanakan:

```text
Hero
About
Experience
Projects
Achievements
Contact
```

### 3.1 Hero
Hero akan dibuat lebih umum seperti portfolio modern:

```text
Kiri  : nama, role, CTA, metadata singkat
Kanan : foto profil
```

Konten yang ditampilkan:
- Foto profil dari `public/images/about/foto.jpeg`
- Nama
- Role: Mobile Developer
- CTA:
  - Lihat Project
  - Hubungi Saya / Hire Me
- Metadata singkat:
  - lokasi
  - email
  - social links

Catatan desain:
- Hero tidak perlu judul besar "Portfolio".
- Foto menjadi elemen visual utama di kanan.
- Copy hero dibuat singkat tanpa paragraf deskripsi panjang.

### 3.2 About
About menjadi ringkasan singkat, bukan halaman panjang.

Isi:
- Bio pendek
- Fokus kerja
- Prinsip implementasi
- Link download CV jika tersedia

Komponen yang bisa direuse:
- `BioSection`, tetapi kemungkinan perlu versi compact atau dibuat ulang agar cocok di Home.

### 3.3 Experience
Menampilkan pengalaman dan pendidikan secara ringkas.

Komponen yang bisa direuse:
- `ExperienceSection`

Jika terlalu panjang, buat mode compact.

### 3.4 Projects
Projects menjadi section utama di Home.

Isi:
- Project featured atau semua project penting.
- Card project tetap menuju detail project.
- Link detail tetap:
  - `/projects/e-porter`
  - `/projects/e-pkk`
  - dan seterusnya

Komponen yang bisa direuse:
- `ShowcaseProjectsSection`
- `ProjectsGridSection` jika ingin menampilkan semua project.

### 3.5 Achievements
Menampilkan sertifikat atau penghargaan yang paling relevan.

Komponen yang bisa direuse:
- `AchievementsSection`

### 3.6 Contact
Section baru yang menjadi tujuan CTA.

Isi:
- Email
- LinkedIn
- GitHub
- Instagram
- CTA hire me

Jika belum ada komponen contact, buat `ContactSection`.

---

## 4. Navbar Baru

Navbar diarahkan ke anchor Home.

### Label ID
```text
Beranda
Tentang
Pengalaman
Proyek
Kontak
```

### Label EN
```text
Home
About
Experience
Projects
Contact
```

### Target Link
```text
/id
/id#about
/id#experience
/id#projects
/id#contact
```

Untuk English:

```text
/en
/en#about
/en#experience
/en#projects
/en#contact
```

### Behavior
- Jika user sedang di Home, klik menu melakukan smooth scroll ke section.
- Jika user sedang di halaman detail project, klik menu mengarah kembali ke Home dengan hash.
- CTA `Hire Me` mengarah ke `#contact` atau `mailto:`.

---

## 5. Route Strategy

### Tetap Dipakai
- `/id`
- `/en`
- `/id/projects/[id]`
- `/en/projects/[id]`

### Secondary / Fallback
Route berikut boleh tetap ada dulu, tetapi tidak jadi menu utama:
- `/id/about`
- `/en/about`
- `/id/projects`
- `/en/projects`

Setelah single-page Home stabil, bisa diputuskan:
1. route tetap dipertahankan untuk SEO/fallback, atau
2. route diarahkan ke anchor Home.

Rekomendasi awal: **jangan redirect dulu**. Pertahankan route lama sampai Home baru sudah final.

---

## 6. Komponen yang Perlu Disesuaikan

### `app/[locale]/page.tsx`
Home perlu menggabungkan section utama.

Rencana awal:

```tsx
<HeroSection />
<AboutSection />
<ExperienceSection />
<ShowcaseProjectsSection />
<AchievementsSection />
<ContactSection />
```

### `components/sections/home/HeroSection.tsx`
Ubah hero dari typography besar "Portfolio" menjadi:
- layout dua kolom
- foto kiri
- intro kanan
- CTA ke projects/contact

### `components/layout/Navbar.tsx`
Ubah link page menjadi anchor link ke Home.

### `lib/constants/index.ts`
Kemungkinan perlu update `NAV_ITEMS` supaya sesuai anchor section.

### `components/sections/about/*`
Evaluasi apakah komponen About bisa langsung dipakai di Home atau perlu mode compact.

### `components/sections/projects/*`
Pastikan card project tetap menuju detail project.

---

## 7. Tahap Implementasi

### Tahap 1 - Struktur Navigasi
- Update `NAV_ITEMS` menjadi anchor single-page.
- Update `Navbar` supaya active state bisa membaca hash/section.
- CTA `Hire Me` diarahkan ke `#contact`.

### Tahap 2 - Home Composition
- Update `app/[locale]/page.tsx`.
- Masukkan section About, Experience, Projects, Achievements.
- Buat placeholder ContactSection jika belum ada.

### Tahap 3 - Hero Baru
- Ubah `HeroSection` menjadi layout foto kiri dan intro kanan.
- Gunakan foto dari `personalInfo.avatar`.
- Tambahkan CTA ke `#projects` dan `#contact`.

### Tahap 4 - Section Polish
- Tambahkan `id` pada setiap section: `about`, `experience`, `projects`, `achievements`, `contact`.
- Pastikan anchor tidak tertutup navbar dengan `scroll-mt-*`.
- Rapikan spacing agar Home tidak terasa terlalu panjang.

### Tahap 5 - Verification
- Cek desktop dan mobile.
- Cek link navbar dari Home.
- Cek link navbar dari Project Detail.
- Cek project card tetap membuka detail.
- Jalankan:
  - `npx eslint` untuk file yang berubah
  - `npm run build`

---

## 8. Keputusan Awal

- Home menjadi pusat portfolio.
- Project detail tetap menjadi halaman detail terpisah.
- About dan Projects route tidak dihapus dulu.
- Hero baru menggunakan foto profil di sisi kiri.
- Navbar tidak lagi memprioritaskan route About/Projects, tetapi anchor Home.
- Blog tidak menjadi prioritas untuk fase awal single-page portfolio.

---

## 9. Status Implementasi

### Selesai
- Navbar utama diarahkan ke anchor Home:
  - `/#about`
  - `/#experience`
  - `/#projects`
  - `/#contact`
- Home sudah menjadi single-page portfolio dengan susunan:
  - Hero
  - About
  - Experience
  - Projects
  - Achievements
  - Contact
- Hero sudah diganti dari teks besar "Portfolio" menjadi layout intro kiri dan foto kanan.
- Section `ContactSection` sudah ditambahkan.
- Section `AboutSummarySection` sudah ditambahkan.
- Project detail tetap dipertahankan sebagai halaman terpisah.
- Blog preview dan Hobi section tidak lagi menjadi bagian utama Home.

### Catatan Berikutnya
- Review visual spacing tiap section di desktop dan mobile.
- Putuskan apakah halaman `/about` dan `/projects` akan tetap ada sebagai fallback atau diarahkan ke anchor Home.
- Evaluasi apakah section Achievements terlalu panjang untuk Home; jika iya, buat mode compact.
