---
title: "Tomatify (Tomato Identify)"
subtitle: "Aplikasi mobile untuk monitoring proses penyortiran tomat otomatis yang terintegrasi IoT dan sistem cerdas untuk klasifikasi tomat matang vs mentah."
role: "Flutter Mobile Developer & UI/UX"
platform: "Mobile (Android)"
status: "Project Mobile Apps"
tech_stack: ["Flutter", "Dart", "REST API (PHP)", "MySQL", "IoT", "UI/UX Design"]
links:
  demo: "[isi jika ada]"
  source: "[isi jika ada]"
---

# Tomatify (Tomato Identify) — Mobile Apps

Tomatify adalah aplikasi mobile yang membantu proses **monitoring penyortiran tomat otomatis**. Sistem ini terhubung dengan perangkat **IoT** dan komponen **klasifikasi cerdas** untuk membedakan **tomat matang** dan **tomat mentah**. Aplikasi berperan sebagai antarmuka yang menampilkan status proses, hasil klasifikasi, dan informasi yang dibutuhkan operator agar proses sortir lebih terpantau dan terdokumentasi.

## Quick Info
- **Role:** Flutter Mobile Developer & UI/UX
- **Scope:** penggalian kebutuhan, desain UI, implementasi Flutter, integrasi REST API
- **Integrasi:** koneksi ke sistem penyortiran tomat (IoT) melalui REST API (PHP) & database MySQL
- **Tech Stack:** Flutter, Dart, REST API (PHP), MySQL, UI/UX Design

---

## 1. Project Overview

### 1.1 Summary
Aplikasi ini dibuat untuk memonitoring alur penyortiran tomat otomatis yang berjalan di sisi perangkat (IoT). Informasi inti yang disajikan aplikasi berfokus pada **hasil klasifikasi** (matang/mentah) dan **status proses** agar pengguna bisa mengecek kondisi sistem dengan cepat tanpa harus mengakses sistem backend secara langsung.

### 1.2 Context & Goal
**Context:** Proses sortir tomat otomatis membutuhkan tampilan monitoring yang mudah dipahami dan bisa diakses via mobile untuk membantu pengawasan operasional.  
**Goals:**
- Menyediakan tampilan monitoring yang jelas untuk proses sortir tomat otomatis.
- Menyajikan hasil klasifikasi tomat (matang/mentah) agar mudah dipantau.
- Menghubungkan aplikasi mobile dengan sistem IoT melalui REST API dan database terpusat.
- Membuat antarmuka yang sesuai kebutuhan pengguna (berbasis riset).

### 1.3 Target Users
- **Operator / pengguna lapangan:** membutuhkan tampilan monitoring yang ringkas dan cepat dipahami.
- **Tim teknis / admin sistem:** membutuhkan akses informasi proses & data untuk pengecekan.

---

## 2. Challenges

### 2.1 Main Pain Points
- **Integrasi mobile ↔ IoT:** data proses sortir berasal dari perangkat, sehingga perlu mekanisme integrasi yang stabil lewat API.
- **Representasi data agar mudah dipahami:** hasil sortir/klasifikasi harus disajikan dengan UI yang sederhana dan informatif.
- **Reliability & error handling:** koneksi jaringan/perangkat bisa tidak stabil, sehingga aplikasi harus tetap memberi feedback yang jelas (loading, error, retry).
- **Kebutuhan user spesifik operasional:** flow aplikasi harus mengikuti cara kerja pengguna di lapangan (bukan asumsi developer).

### 2.2 Constraints
- Bergantung pada kontrak REST API (PHP) dan struktur data MySQL yang menjadi sumber data.
- Data monitoring bersifat dinamis, sehingga UI perlu menampilkan status/progres tanpa membingungkan pengguna.

---

## 3. Solution

### 3.1 Approach
Saya memulai dari **pengumpulan kebutuhan pengguna** melalui wawancara dan observasi, lalu menyusun **desain antarmuka** sesuai kebutuhan tersebut. Setelah desain final, saya mengembangkan aplikasi dengan **Flutter & Dart** dan mengintegrasikannya ke sistem IoT penyortiran tomat melalui **REST API (PHP)** dan **MySQL**.

### 3.2 Key Decisions
- **User-centered flow:** alur dibuat mengikuti kebiasaan pengguna agar monitoring cepat dan tidak rumit.
- **API-driven monitoring:** aplikasi mengambil data dari REST API agar sinkron dengan sistem utama.
- **UI ringkas & status jelas:** fokus pada informasi inti (hasil & status), serta feedback saat data belum tersedia/terjadi error.

### 3.3 Implementation Highlights
- Implementasi UI Flutter sesuai desain yang dirancang dari kebutuhan user.
- Integrasi endpoint untuk mengambil data monitoring/hasil sortir dari sistem IoT.
- State handling yang konsisten untuk kondisi:
  - loading (mengambil data),
  - empty (belum ada data),
  - error (koneksi/API bermasalah),
  - success (data tampil).

---

## 4. My Contributions
- Mengumpulkan kebutuhan pengguna melalui **wawancara dan observasi**.
- Mendesain **UI/UX** aplikasi sesuai kebutuhan data monitoring di lapangan.
- Mengembangkan aplikasi menggunakan **Flutter & Dart**.
- Mengintegrasikan aplikasi dengan sistem IoT penyortiran tomat melalui **REST API (PHP)** dan **MySQL**.

---

## 5. Key Features

> (Disarankan ditampilkan sebagai “feature cards” di website)

- **Monitoring proses penyortiran**
  Menampilkan ringkasan informasi proses agar operator bisa memantau kondisi sistem dengan cepat.

- **Hasil klasifikasi tomat (matang vs mentah)**
  Menyajikan output klasifikasi dari sistem cerdas dalam format yang mudah dipahami.

- **Data & riwayat monitoring**
  Memudahkan pengguna untuk mengecek data yang sudah tercatat (misal per waktu/per proses).

- **Status koneksi / pembaruan data**
  Memberikan feedback kondisi aplikasi saat mengambil data dari API (loading/error/retry).

---

## 6. User Flow (High Level)

### 6.1 Monitoring Flow
1. User membuka aplikasi
2. Aplikasi memuat data monitoring dari REST API
3. User melihat ringkasan status proses & hasil klasifikasi
4. User membuka detail untuk melihat informasi lebih lengkap (jika diperlukan)

### 6.2 Data Review Flow (Opsional)
1. User membuka menu riwayat/data
2. User memilih rentang/daftar data
3. Aplikasi menampilkan detail data hasil monitoring

---

## 7. Tech Stack & Architecture

### 7.1 Tech Stack
- **Flutter + Dart** — mobile development
- **REST API (PHP)** — komunikasi mobile dengan sistem IoT/backend
- **MySQL** — penyimpanan data di sisi backend
- **IoT System** — sumber data proses sortir
- **UI/UX Design** — perancangan antarmuka berbasis kebutuhan user

### 7.2 Architecture Notes (Ringkas)
- UI dipisah dari logic request data agar mudah dirawat.
- Response API dimapping ke model data untuk memastikan tampilan konsisten.
- State aplikasi menangani kondisi loading/empty/error untuk UX yang lebih “produk”.

---

## 8. Results

### 8.1 Outcome
- Aplikasi mobile berhasil dikembangkan untuk kebutuhan monitoring penyortiran tomat otomatis.
- Integrasi mobile dengan sistem IoT berjalan melalui REST API (PHP) dan MySQL.
- UI dibuat sesuai kebutuhan pengguna hasil wawancara dan observasi.

### 8.2 Impact (Narrative)
- Monitoring proses sortir menjadi lebih mudah diakses dan dipahami melalui perangkat mobile.
- Operator dapat melihat status dan hasil klasifikasi tanpa bergantung pada akses langsung ke sistem backend.

---

## 9. Lessons Learned
- Integrasi sistem IoT menuntut perhatian lebih pada stabilitas data dan penanganan error.
- UI monitoring harus mengutamakan kejelasan status (loading/empty/error) agar user percaya sistemnya.
- Penggalian kebutuhan (wawancara/observasi) sangat membantu menentukan fitur prioritas.

---

## 10. Next Improvements (Roadmap)
- Notifikasi saat terjadi anomali (misal sistem berhenti / data tidak update).
- Grafik/statistik ringkas untuk tren hasil klasifikasi.
- Caching data agar tetap bisa melihat data terakhir saat koneksi tidak stabil.
- Role & akses (misal operator vs admin) bila kebutuhan sistem berkembang.
