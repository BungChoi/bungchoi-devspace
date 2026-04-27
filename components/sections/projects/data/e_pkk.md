---
title: "E-PKK Kabupaten Nganjuk"
subtitle: "Aplikasi mobile terintegrasi website untuk membantu pengelolaan data kegiatan PKK, termasuk upload laporan dan galeri secara terpusat."
role: "Flutter Mobile Developer & UI/UX"
platform: "Mobile (Flutter)"
status: "Project kolaborasi (Diskominfo Nganjuk & PKK Nganjuk)"
tech_stack: ["Flutter", "Dart", "REST API (PHP)", "MySQL", "UI/UX Design"]
links:
  demo: "[isi jika ada]"
  source: "[isi jika ada]"
---

# E-PKK Kabupaten Nganjuk

E-PKK adalah aplikasi mobile yang terintegrasi dengan website, dirancang untuk membantu menyelesaikan masalah **pengelolaan data kegiatan PKK**. Project ini dikerjakan melalui kolaborasi dengan **Diskominfo Nganjuk** dan **PKK Nganjuk**, mulai dari tahap riset kebutuhan hingga implementasi aplikasi sesuai desain yang disepakati. :contentReference[oaicite:0]{index=0}

## Quick Info
- **Role:** Flutter Mobile Developer & UI/UX (end-to-end dari riset → desain → implementasi)
- **Scope:** kebutuhan pengguna, desain UI, implementasi Flutter/Dart, integrasi REST API
- **Integrasi utama:** upload laporan & galeri terhubung ke website E-PKK via REST API
- **Tech Stack:** Flutter, Dart, REST API (PHP), MySQL :contentReference[oaicite:1]{index=1}

---

## 1. Project Overview

### 1.1 Summary
Aplikasi ini berfungsi sebagai kanal input dan pengelolaan data kegiatan PKK melalui perangkat mobile, dengan sinkronisasi ke website agar data tersimpan terpusat, mudah diakses, dan terdokumentasi dengan rapi. :contentReference[oaicite:2]{index=2}

### 1.2 Context & Goal
**Context:** Pengelolaan data kegiatan PKK membutuhkan sistem yang lebih terstruktur dan terdigitalisasi agar pelaporan dan dokumentasi kegiatan tidak tercecer. :contentReference[oaicite:3]{index=3}  
**Goals:**
- Memudahkan pengurus/aktor terkait dalam **mengelola data kegiatan PKK** melalui mobile.
- Menyediakan fitur **upload laporan** dan **galeri** yang langsung terintegrasi dengan website.
- Membangun aplikasi sesuai kebutuhan pengguna dan desain yang telah disetujui stakeholder. :contentReference[oaicite:4]{index=4}

### 1.3 Stakeholders / Target Users
- **Stakeholders:** Diskominfo Nganjuk & PKK Nganjuk (kolaborasi identifikasi kebutuhan dan validasi solusi). :contentReference[oaicite:5]{index=5}  
- **Target users:** Pengguna internal/PKK yang membutuhkan input data kegiatan, laporan, dan dokumentasi secara mobile.

---

## 2. Challenges

### 2.1 Main Pain Points
- **Kebutuhan pengguna spesifik domain:** aktivitas PKK punya alur dan kebutuhan data yang khas, sehingga perlu riset langsung agar solusi tepat sasaran. :contentReference[oaicite:6]{index=6}  
- **Integrasi mobile–website:** data yang diinput dari aplikasi harus konsisten dan tersinkron ke website melalui API.
- **Upload konten (laporan & galeri):** pengelolaan file/media membutuhkan alur yang jelas (form, validasi, status upload, dan feedback ke user). :contentReference[oaicite:7]{index=7}  

### 2.2 Constraints
- Implementasi harus mengikuti desain UI yang telah disetujui stakeholder (Diskominfo/PKK).
- Mengandalkan kontrak REST API dari backend (PHP + MySQL) sebagai sumber data website dan mobile. :contentReference[oaicite:8]{index=8}

---

## 3. Solution

### 3.1 Approach
Saya memulai dengan riset bersama Diskominfo dan PKK untuk mengidentifikasi permasalahan inti, lalu menerjemahkannya menjadi desain UI dan prototipe. Setelah desain disetujui, saya mengembangkan aplikasi menggunakan Flutter & Dart dan menghubungkannya ke website E-PKK melalui REST API. :contentReference[oaicite:9]{index=9}

### 3.2 Key Decisions
- **User-centered design:** desain antarmuka dibuat berdasarkan kebutuhan pengguna PKK, bukan asumsi. :contentReference[oaicite:10]{index=10}  
- **Integrasi REST API:** memastikan mobile menjadi bagian dari ekosistem E-PKK (sinkron dengan website).
- **Fokus fitur inti:** prioritas pada fitur yang paling berdampak untuk operasional—upload laporan dan galeri. :contentReference[oaicite:11]{index=11}  

### 3.3 Implementation Highlights
- Implementasi UI Flutter yang konsisten dengan desain final.
- Integrasi endpoint untuk proses **upload laporan** dan **galeri** agar data masuk ke sistem website E-PKK.
- State handling yang jelas untuk kebutuhan form (loading, success, error) agar user paham progres input. :contentReference[oaicite:12]{index=12}  

---

## 4. My Contributions

- Melakukan riset bersama stakeholder (Diskominfo & PKK) untuk identifikasi masalah utama. :contentReference[oaicite:13]{index=13}  
- Mendesain antarmuka aplikasi berdasarkan solusi dan kebutuhan pengguna.
- Mengembangkan aplikasi menggunakan **Flutter & Dart** sesuai desain yang disetujui. :contentReference[oaicite:14]{index=14}  
- Mengimplementasikan integrasi **upload laporan** dan **galeri** terhubung ke website melalui **REST API**. :contentReference[oaicite:15]{index=15}  

---

## 5. Key Features

- **Manajemen data kegiatan PKK (mobile ↔ website)**  
  Mempermudah pengelolaan dan pendataan aktivitas agar lebih terstruktur. :contentReference[oaicite:16]{index=16}  

- **Upload Laporan**  
  Pengguna dapat mengunggah laporan kegiatan agar terdokumentasi dan terintegrasi dengan sistem website E-PKK. :contentReference[oaicite:17]{index=17}  

- **Upload Galeri**  
  Pengguna dapat mengunggah dokumentasi (galeri) kegiatan yang terhubung ke website E-PKK. :contentReference[oaicite:18]{index=18}  

---

## 6. User Flow (High Level)

### 6.1 Flow Pengelolaan Data
1. Pengguna membuka aplikasi dan masuk ke halaman utama.
2. Pengguna mengakses menu terkait data kegiatan.
3. Pengguna mengisi/submit data → data tersimpan dan tersinkron ke sistem website via API. :contentReference[oaicite:19]{index=19}  

### 6.2 Flow Upload Laporan
1. Buka menu **Upload Laporan**
2. Isi informasi yang dibutuhkan
3. Submit → sistem mengirim data ke server melalui REST API
4. Tampilkan status berhasil/gagal agar user mendapat feedback yang jelas. :contentReference[oaicite:20]{index=20}  

### 6.3 Flow Upload Galeri
1. Buka menu **Galeri**
2. Pilih media/dokumen
3. Upload → terintegrasi ke website E-PKK via REST API
4. Data tampil pada sistem (mobile/website) sesuai sinkronisasi. :contentReference[oaicite:21]{index=21}  

---

## 7. Tech Stack & Architecture

### 7.1 Tech Stack
- **Flutter + Dart:** pengembangan aplikasi mobile
- **REST API (PHP):** integrasi mobile dengan website E-PKK
- **MySQL:** database penyimpanan data pada sistem backend
- **UI/UX Design:** perancangan antarmuka berdasarkan kebutuhan pengguna :contentReference[oaicite:22]{index=22}  

### 7.2 Architecture Notes (Ringkas)
- Pemisahan komponen UI dan logika integrasi API agar pengembangan lebih mudah dirawat.
- Menjaga konsistensi state untuk form upload (loading/success/error) agar UX rapi.

---

## 8. Results

### 8.1 Outcome
- Aplikasi mobile berhasil dibangun sesuai desain yang disepakati.
- Fitur **upload laporan** dan **galeri** terintegrasi dengan website E-PKK melalui REST API. :contentReference[oaicite:23]{index=23}  

### 8.2 Impact (Narrative)
- Proses dokumentasi dan pelaporan kegiatan menjadi lebih terstruktur karena input dapat dilakukan lewat mobile dan tersimpan terpusat.

---

## 9. Lessons Learned
- Riset langsung dengan stakeholder sangat membantu memastikan fitur yang dibangun benar-benar relevan.
- Integrasi mobile–website perlu kontrak API yang jelas agar sinkronisasi data stabil.
- UX upload harus punya feedback yang tegas (progress & error handling) agar user percaya prosesnya.

---

## 10. Next Improvements (Roadmap)
- Peningkatan UX upload: kompresi media, retry upload, dan indikator progres yang lebih detail.
- Pencarian/filter data kegiatan agar akses informasi lebih cepat.
- Role & permission yang lebih granular (jika kebutuhan pengguna bertambah).
