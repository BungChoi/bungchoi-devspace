---
title: "SIAPSADI (Sistem Aplikasi Pemilahan Sampah Digital)"
subtitle: "UI Slicing project: menerjemahkan desain aplikasi pengelolaan sampah menjadi antarmuka Flutter yang rapi, konsisten, dan reusable (frontend only)."
role: "Flutter Developer (UI Slicing)"
platform: "Mobile (Flutter)"
status: "Frontend Only / UI Prototype"
tech_stack: ["Flutter", "Dart", "Figma", "UI/UX Implementation"]
links:
  source: "[isi jika ada]"
  demo: "[isi jika ada]"
---

# SIAPSADI — UI Slicing (Frontend Only)

SIAPSADI adalah proyek **UI slicing** yang berfokus pada penerjemahan desain aplikasi pengelolaan sampah digital ke dalam Flutter. Output utama project ini adalah **tampilan UI yang pixel-neat**, konsisten, dan disusun dengan **komponen reusable**.  
> Catatan: project ini **tidak mencakup backend**—data yang tampil menggunakan **dummy/mock data** untuk kebutuhan prototipe.

---

## 1. Project Overview

### 1.1 Summary
Aplikasi SIAPSADI menampilkan konsep layanan pengelolaan sampah berbasis digital: onboarding, login, dan dashboard yang menonjolkan **poin/koin**, informasi penjemputan, promo/banner, serta menu layanan dalam bentuk grid.

### 1.2 Goals
- Mengimplementasikan desain UI ke Flutter dengan hasil yang rapi dan konsisten.
- Menyusun komponen UI yang bisa dipakai ulang (buttons, cards, menu items, banner).
- Membuat struktur halaman yang jelas agar mudah dikembangkan jika suatu saat ditambah backend.

### 1.3 Scope
✅ UI Slicing (Frontend)  
✅ Navigation antar screen (UI-level)  
✅ Reusable UI components  
❌ Backend/API & database  
❌ Auth real / transaksi real

---

## 2. Challenges

### 2.1 Main Challenges
- Menjaga **konsistensi spacing, typography, dan radius** di banyak layar.
- Membuat dashboard yang cukup padat informasi tetap terasa rapi (card + banner + grid menu).
- Menghindari duplikasi widget dengan memecah UI menjadi komponen reusable.
- Membuat layout tetap nyaman di berbagai ukuran layar (responsiveness dasar).

---

## 3. Solution (How I Built It)

### 3.1 Approach
Saya memecah UI menjadi beberapa screen utama lalu menyusun **design system mini** (style teks, padding, komponen card/button) agar tampilan konsisten. Data yang tampil menggunakan **dummy/mock** supaya fokus tetap pada kualitas UI.

### 3.2 Key Decisions
- **Reusable Components** untuk elemen berulang:
  - Profile header card
  - Coin/point card
  - Primary button (mis. “Login”, “Tukar Koin”)
  - Menu grid item
  - Promo/banner card
- **State UI dasar** (visual):
  - loading placeholder/skeleton sederhana (opsional)
  - empty state untuk section list (opsional)

---

## 4. My Contributions
- Implementasi UI dari desain menjadi Flutter (pixel-neat).
- Membuat komponen reusable agar UI konsisten dan mudah dirawat.
- Menyusun layout dashboard (card + banner + grid menu) supaya informasinya tetap terstruktur.
- Menyusun navigasi UI-level antar halaman (onboarding → login → home).

---

## 5. Key Screens (Based on UI)

### 5.1 Splash Screen
- Menampilkan branding SIAPSADI sebagai screen pembuka aplikasi.

### 5.2 Onboarding
- Slide onboarding dengan headline seperti “Jaga Lingkungan Bersama”.
- Navigasi onboarding (indikator halaman + tombol lanjut/lewati).

### 5.3 Login Screen
- Form **Email & Password**
- Aksi “Lupa Password?”
- Tombol login utama
- Opsi login sosial (UI only)

### 5.4 Home / Dashboard
- Header user profile card
- Ringkasan **Koin SIAPsampah** (contoh: “100 Koin”)
- Informasi penjemputan (contoh: “Sampah dijemput 5 Kg / 5 pcs”)
- CTA “Tukar Koin”
- Banner edukasi/marketing
- Grid menu layanan (contoh: Jemput, Antar, Perusahaan, Promo, dll)
- Section informasi “Mengenal SIAPSADI”

### 5.5 Info / Promo Page (UI Card)
- Halaman edukasi seperti “Tabung Pakai Sampah Koin” (UI content page)

---

## 6. User Flow (UI Level)
1. Splash Screen
2. Onboarding (skip/next)
3. Login
4. Home / Dashboard
5. Akses menu layanan melalui grid (UI only)

---

## 7. Tech Stack & Notes

### 7.1 Tech Stack
- **Flutter + Dart** — implementasi UI
- **Figma** — referensi desain & layout
- **UI/UX Implementation** — konsistensi komponen, spacing, hierarchy

### 7.2 Architecture Notes (Frontend)
- Struktur per screen + folder komponen:
  - `/screens` (onboarding, login, home, promo)
  - `/widgets` (cards, buttons, menu items, banner)
  - `/theme` (text styles, spacing, radius)
- Dummy/mock data untuk tampilan dashboard (koin, status penjemputan, banner).

---

## 8. Results
- UI utama berhasil tersusun: onboarding, login, dashboard, promo/info page.
- Tampilan konsisten melalui komponen reusable (lebih mudah dikembangkan).
- Struktur project siap dikembangkan ke tahap integrasi backend jika dibutuhkan.

---

## 9. Lessons Learned
- Konsistensi kecil (spacing/typography) sangat menentukan UI terlihat “produk”.
- Reusable component mempercepat pembuatan layar baru dan mengurangi bug visual.
- Dashboard perlu hierarchy yang jelas agar informasi padat tetap nyaman dibaca.

---

## 10. Next Improvements (Optional)
- Menambahkan tema light/dark berbasis style guide.
- Skeleton loading & empty state yang lebih polished.
- Micro-interaction sederhana (button feedback / page transition).
- Persiapan integrasi API (contract & state management) jika project dilanjutkan.
