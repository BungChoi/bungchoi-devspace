---
title: "Cemilku"
subtitle: "Aplikasi Android terintegrasi website untuk membantu UMKM penjual kripik di Kabupaten Nganjuk mengelola produk dan memantau transaksi melalui hak akses penjual/admin."
role: "Android Developer & UI/UX"
platform: "Mobile (Android)"
status: "Mobile Apps (Terintegrasi Website)"
tech_stack: ["Android", "Java", "REST API (PHP)", "MySQL", "UI/UX Design"]
links:
  demo: "[isi jika ada]"
  source: "[isi jika ada]"
---

# Cemilku — Mobile Apps

Cemilku adalah aplikasi Android yang terintegrasi dengan website, di mana aplikasi mobile berperan sebagai **hak akses penjual/admin** untuk UMKM penjual kripik di Kabupaten Nganjuk. Fokus utama aplikasi adalah membantu operasional harian penjual melalui mobile—mulai dari **menambahkan produk** hingga **melihat riwayat transaksi**—dengan data yang tersinkron ke sistem website melalui REST API.

## Quick Info
- **Role:** Android Developer & UI/UX
- **Scope:** user interview (kebutuhan), desain/prototipe, implementasi Android (Java), integrasi REST API
- **Key Features:** Tambah produk, Riwayat transaksi
- **Integration:** Mobile ↔ Website via REST API (PHP) + MySQL

---

## 1. Project Overview

### 1.1 Summary
Cemilku dirancang sebagai antarmuka mobile untuk penjual/admin agar pengelolaan data usaha lebih praktis. Dengan aplikasi ini, penjual dapat memperbarui produk dan memantau transaksi tanpa harus selalu mengakses website, karena seluruh data terhubung dalam satu sistem terpusat.

### 1.2 Context & Goals
**Context:** UMKM membutuhkan cara yang lebih cepat dan sederhana untuk mengelola data produk dan transaksi, terutama ketika aktivitas operasional dilakukan di lapangan.  
**Goals:**
- Menyediakan akses mobile untuk penjual/admin yang tetap terhubung dengan website.
- Memudahkan pengelolaan produk melalui fitur tambah produk.
- Memudahkan pemantauan transaksi melalui fitur riwayat transaksi.
- Membangun UI yang mudah dipahami untuk kebutuhan pengguna UMKM.

### 1.3 Target Users
- **Penjual UMKM:** mengelola produk dan memantau transaksi dari mobile.
- **Admin:** memantau/menangani data sesuai kebutuhan operasional (sesuai hak akses).

---

## 2. Challenges

### 2.1 Main Pain Points
- **Kebutuhan user lapangan:** flow harus sederhana dan cepat dipahami oleh pengguna UMKM.
- **Integrasi mobile ↔ website:** data produk/transaksi harus konsisten agar tidak terjadi perbedaan antara aplikasi dan website.
- **Pengalaman input data:** proses tambah produk membutuhkan validasi dan feedback yang jelas agar user percaya data tersimpan.

### 2.2 Constraints
- Bergantung pada kontrak **REST API (PHP)** dan struktur database **MySQL** yang digunakan website.
- Aplikasi perlu tetap nyaman digunakan pada kondisi jaringan yang tidak selalu stabil.

---

## 3. Solution

### 3.1 Approach
Saya memulai dengan **wawancara** mitra UMKM untuk memahami kebutuhan dan kebiasaan kerja mereka. Dari hasil itu, saya menyusun **desain dan prototipe** sebagai acuan UI/UX. Setelah desain disepakati, saya mengembangkan aplikasi menggunakan **Android (Java)** dan menghubungkannya ke website melalui **REST API**.

### 3.2 Key Decisions
- **User-centered design:** desain dibuat berbasis kebutuhan nyata dari hasil wawancara, agar flow tidak membingungkan.
- **API-driven integration:** seluruh data penting (produk & transaksi) diambil/dikirim lewat REST API agar sinkron dengan website.
- **State & feedback yang jelas:** setiap aksi penting (submit produk, load riwayat) memiliki indikator loading/success/error.

### 3.3 Implementation Highlights
- Implementasi UI Android sesuai prototipe agar konsisten dan mudah digunakan.
- Integrasi endpoint REST API untuk:
  - **Tambah produk** (kirim data produk ke server)
  - **Riwayat transaksi** (ambil data transaksi dari server)
- Penanganan state dasar untuk UX:
  - loading saat fetch data,
  - empty state saat data belum ada,
  - error state + opsi retry bila request gagal.

---

## 4. My Contributions
- Mengumpulkan kebutuhan pengguna melalui **wawancara** dengan mitra UMKM penjual kripik.
- Menyusun **desain dan prototipe** aplikasi berdasarkan kebutuhan yang ditemukan.
- Mengembangkan aplikasi Android menggunakan **Java**.
- Membangun fitur hak akses penjual/admin, termasuk:
  - **Tambah produk**
  - **Riwayat transaksi**
- Mengintegrasikan aplikasi dengan website melalui **REST API (PHP)** dan **MySQL**.

---

## 5. Key Features

### 5.1 Tambah Produk (Seller Access)
Memungkinkan penjual menambahkan produk baru melalui mobile sehingga update katalog lebih cepat dan tidak bergantung pada akses website.

**Catatan implementasi (opsional ditampilkan di web):**
- Form input + validasi field penting
- Feedback submit: loading → success/error

### 5.2 Riwayat Transaksi
Menampilkan daftar transaksi agar penjual/admin bisa memantau aktivitas penjualan dan status transaksi secara terpusat.

**Catatan implementasi (opsional):**
- List view dengan empty/loading/error state
- Sinkron data via REST API

---

## 6. User Flow (High Level)

### 6.1 Flow Tambah Produk
1. Login sebagai penjual/admin
2. Buka menu **Tambah Produk**
3. Isi data produk → submit
4. Aplikasi mengirim data ke server via REST API
5. Tampilkan status berhasil/gagal

### 6.2 Flow Riwayat Transaksi
1. Login sebagai penjual/admin
2. Buka menu **Riwayat Transaksi**
3. Aplikasi mengambil data transaksi via REST API
4. Tampilkan daftar transaksi (dengan state handling yang jelas)

---

## 7. Tech Stack & Architecture

### 7.1 Tech Stack
- **Android (Java):** pengembangan aplikasi mobile
- **REST API (PHP):** integrasi dengan website
- **MySQL:** database backend
- **UI/UX Design:** desain & prototipe berbasis kebutuhan user

### 7.2 Architecture Notes (Ringkas)
- Pemisahan logic request API dari UI untuk memudahkan maintenance.
- Mapping response API ke model data agar tampilan konsisten.
- Handling state (loading/empty/error) agar pengalaman pengguna terasa “produk”.

---

## 8. Results

### 8.1 Outcome
- Aplikasi mobile Cemilku berhasil dibangun sebagai hak akses penjual/admin yang terintegrasi website.
- Fitur inti berjalan dan tersinkron melalui REST API:
  - Tambah produk
  - Riwayat transaksi

### 8.2 Impact (Narrative)
- Penjual dapat mengelola produk dan memantau transaksi lebih praktis via mobile.
- Proses operasional lebih cepat karena update data tidak bergantung pada akses website.

---

## 9. Lessons Learned
- Wawancara pengguna membantu menentukan prioritas fitur yang benar-benar dipakai.
- Integrasi mobile–website membutuhkan kontrak API yang jelas dan konsisten.
- UX form (tambah produk) harus punya feedback yang tegas agar user percaya prosesnya.

---

## 10. Next Improvements (Roadmap)
- Edit/hapus produk + manajemen stok (jika dibutuhkan)
- Filter/pencarian pada riwayat transaksi
- Notifikasi status transaksi (opsional)
- Peningkatan reliability: retry, timeout handling, dan caching data terakhir 
