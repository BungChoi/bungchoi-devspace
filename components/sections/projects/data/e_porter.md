---
title: "E-Porter (Flight Ticket & Porter Service)"
subtitle: "Aplikasi pemesanan tiket pesawat yang terintegrasi layanan porter dengan dua role (Passenger & Porter) dan antrian porter berbasis FIFO."
role: "Flutter Mobile Developer"
platform: "Mobile (Flutter)"
status: "Prototype / Portfolio Project"
tech_stack: ["Flutter", "Dart", "GetX", "Firebase", "UI/UX Design"]
links:
  source: "[isi jika ada]"
  demo: "[isi jika ada]"
---

# E-Porter (Flight Ticket & Porter Service)

Aplikasi mobile yang menggabungkan **pemesanan tiket pesawat** dan **layanan porter** dalam satu pengalaman yang rapi. Project ini dirancang dengan **dua hak akses** (Passenger & Porter) serta mekanisme **antrian porter FIFO** untuk menjaga urutan layanan tetap adil dan terkontrol.

## Quick Info
- **Role:** Flutter Mobile Developer (End-to-End)
- **Scope:** UI slicing, state management, integrasi Firebase, role-based flow, QR scan, queue FIFO
- **Tech Stack:** Flutter, GetX, Firebase
- **Key Feature:** Ticket booking + Porter queue (FIFO) + History transaksi

---

## 1. Project Overview

### 1.1 Summary
E-Porter membantu pengguna melakukan pemesanan tiket pesawat dan, bila dibutuhkan, memanggil porter secara terintegrasi. Di sisi porter, aplikasi menyediakan alur kerja berbasis antrian (FIFO) serta verifikasi layanan menggunakan QR untuk memastikan proses lebih aman dan transparan.

### 1.2 Context & Goal
**Context:** Proses pemesanan tiket dan layanan porter sering berjalan terpisah sehingga status transaksi dan alur layanan kurang terstruktur.  
**Goals:**
- Menyediakan pengalaman booking tiket yang jelas dari awal sampai riwayat transaksi.
- Menyediakan alur porter yang terarah: masuk antrian → verifikasi QR → selesai → tercatat.
- Memastikan fairness layanan porter melalui **FIFO queue**.
- Membuat UI yang rapi dan mudah dipahami untuk dua jenis pengguna.

### 1.3 Target Users
- **Passenger:** pengguna yang ingin memesan tiket dan (opsional) meminta bantuan porter.
- **Porter:** petugas yang menerima order layanan sesuai urutan antrian dan melakukan verifikasi QR.

---

## 2. Challenges

### 2.1 Main Pain Points
- **Dua role, dua pengalaman:** Passenger dan Porter butuh fitur berbeda, namun tetap dalam satu aplikasi yang konsisten.
- **Queue fairness (FIFO):** antrian harus benar-benar mengikuti urutan dan tidak boleh “diserobot”.
- **Verifikasi layanan:** perlu cara cepat dan aman untuk memastikan order yang dilayani benar (QR scan).
- **State & data real-time:** status transaksi dan antrian perlu update tanpa membingungkan pengguna.

### 2.2 Constraints
- Mengutamakan implementasi yang sederhana namun rapi untuk MVP: fokus ke flow inti + reliability.
- Menghindari UI yang terlalu panjang/berisik: informasi dibuat ringkas tapi tetap informatif.

---

## 3. Solution

### 3.1 Approach
Saya membangun aplikasi berbasis **role-based access**: setelah login, user masuk ke flow sesuai perannya. Seluruh data transaksi dan antrian disusun agar mudah dipantau lewat **history** dan status yang jelas.

### 3.2 Key Decisions
- **Role-based Flow (Passenger vs Porter)**  
  Agar UI tidak bercampur dan user tidak melihat fitur yang bukan haknya.
- **FIFO Queue untuk porter**  
  Untuk menjaga fairness: order dilayani berdasarkan urutan masuk.
- **QR Scan untuk verifikasi**  
  Untuk mempercepat validasi dan meminimalkan risiko salah order/penyalahgunaan.
- **Firebase sebagai database**  
  Memanfaatkan penyimpanan terpusat dan pembaruan data yang responsif untuk MVP.

### 3.3 Implementation Highlights
- Menggunakan **GetX** untuk:
  - State management (loading, success, empty, error)
  - Navigasi halaman dan pengelolaan controller per fitur
- Menyusun UI agar tetap rapi dengan:
  - Komponen reusable (button, card, list item, badge status)
  - Empty state & error state yang konsisten
- Membuat status transaksi terstruktur (contoh):
  - ticket: `created → confirmed → completed`
  - porter: `waiting → serving → done`

---

## 4. My Contributions

- Menyusun layout UI/UX dan mengimplementasikannya di Flutter secara pixel-neat.
- Membangun flow terpisah untuk **Passenger** dan **Porter** (role-based access).
- Mengimplementasikan fitur inti:
  - Booking tiket pesawat dan riwayat transaksi tiket
  - Layanan porter: QR scan, antrian FIFO, riwayat transaksi porter
- Integrasi Firebase untuk penyimpanan data transaksi + sinkronisasi status.
- Menjaga kualitas implementasi:
  - struktur kode rapi, komponen reusable, serta state handling yang konsisten.

---

## 5. Key Features

### 5.1 Core Features
- **Pemesanan Tiket Pesawat**  
  Passenger dapat membuat transaksi pemesanan tiket dengan alur yang jelas.  
  *Tech note:* Flutter UI + state GetX.

- **Riwayat Transaksi Tiket**  
  Menampilkan histori pemesanan agar pengguna bisa mengecek status dan detail transaksi.  
  *Tech note:* data list + empty/loading state yang konsisten.

- **Scan QR Porter**  
  Porter melakukan verifikasi order menggunakan QR untuk memastikan order valid.  
  *Tech note:* integrasi QR scanner + validasi data.

- **Antrian Porter (FIFO)**  
  Order porter diproses berdasarkan urutan masuk, sehingga layanan lebih fair.  
  *Tech note:* pengurutan berdasarkan waktu/sequence + status order.

- **Riwayat Transaksi Porter**  
  Porter memiliki histori pekerjaan untuk tracking layanan yang sudah dilakukan.  
  *Tech note:* filtering berdasarkan role + status.

### 5.2 Role-Based Features
**Passenger**
- Membuat pemesanan tiket
- Melihat riwayat transaksi tiket
- (Opsional) Memanggil layanan porter & melihat statusnya

**Porter**
- Melihat daftar antrian (FIFO)
- Verifikasi layanan melalui QR
- Update status layanan & melihat histori pekerjaan

---

## 6. User Flow

### 6.1 Passenger Flow
1. Login sebagai Passenger  
2. Pilih/isi kebutuhan pemesanan tiket  
3. Konfirmasi pemesanan → transaksi tercatat  
4. Cek status & detail pada **Riwayat Transaksi Tiket**  
5. (Jika menggunakan porter) buat request porter → pantau status layanan

### 6.2 Porter Flow
1. Login sebagai Porter  
2. Lihat **Antrian Porter (FIFO)**  
3. Ambil order sesuai urutan  
4. Verifikasi order via **Scan QR**  
5. Selesaikan layanan → order masuk ke **Riwayat Transaksi Porter**

---

## 7. Tech Stack & Architecture

### 7.1 Tech Stack
- **Flutter + Dart**: pengembangan aplikasi mobile
- **GetX**: state management & routing
- **Firebase**: penyimpanan data transaksi & status
- **UI/UX Design**: fokus ke layout rapi dan pengalaman pengguna yang halus

### 7.2 Architecture Notes
- Memisahkan bagian UI, state/controller, dan data handling agar codebase lebih mudah dirawat.
- Setiap fitur memiliki state yang konsisten: `loading / success / empty / error`.
- Reusable UI components untuk menjaga konsistensi desain dan mempercepat development.

---

## 8. Results

### 8.1 Outcome
- MVP berjalan dengan dua role yang jelas (Passenger & Porter).
- Fitur inti selesai dan tersambung dalam satu alur:
  - Ticket booking + history
  - Porter queue FIFO + QR verification + history
- UX lebih rapi karena setiap flow punya konteks dan status yang mudah dipahami.

### 8.2 Impact (Narrative)
- Pengguna lebih mudah memahami status transaksi karena ada history dan status yang konsisten.
- Porter memiliki alur kerja yang lebih terstruktur dan fair melalui sistem FIFO.

---

## 9. Lessons Learned
- Mendesain flow multi-role perlu boundary yang tegas agar UI tidak “campur aduk”.
- FIFO queue perlu definisi status yang rapi agar tidak terjadi double-claim atau kebingungan urutan.
- Konsistensi state handling (empty/loading/error) sangat mempengaruhi kesan “produk jadi”.

---

## 10. Next Improvements (Roadmap)
- Push notification untuk update status transaksi/antrian.
- Dashboard admin (opsional) untuk memonitor transaksi dan layanan porter.
- Peningkatan reliability: retry strategy, offline tolerance, dan logging yang lebih baik.
- Unit test untuk logic antrian dan validasi QR.

---

## 11. Screenshots / Demo (Opsional)
- **Home** — Tampilan utama sesuai role (Passenger/Porter)
- **Boarding Pass / Ticket Detail** — Detail transaksi & status
- **Queue & QR Scan** — Alur porter: antrian FIFO dan verifikasi QR
- **History** — Riwayat transaksi untuk ticket dan porter
