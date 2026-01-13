/**
 * ===========================================
 * PROJECTS DATA
 * ===========================================
 * Portfolio projects - REAL DATA
 */

import type { Project } from '../types';

export const projects: Project[] = [
    {
        id: 'e-porter',
        title: 'E-Porter',
        description: 'Aplikasi mobile pemesanan tiket pesawat dan layanan porter dengan dua hak akses: penumpang dan jasa porter. Proyek Skripsi.',
        longDescription: `Aplikasi mobile pemesanan tiket pesawat dan layanan porter dengan dua hak akses: penumpang dan jasa porter.

Fitur utama:
• Pemesanan tiket pesawat
• Riwayat transaksi tiket
• Scan QR porter
• Antrian porter (sistem FIFO)
• Riwayat transaksi porter

Dikembangkan menggunakan Flutter dengan GetX untuk state management dan Firebase sebagai database.`,
        image: '/images/projects/e-porter.png',
        tags: ['Flutter', 'Dart', 'GetX', 'Firebase', 'UI/UX Design'],
        githubUrl: 'https://github.com/orangdeso/e-porter',
        featured: true,
        year: 2025,
    },
    {
        id: 'orymu',
        title: 'Orymu',
        description: 'Aplikasi pendamping membaca (reading companion) untuk mengubah kutipan & ide dari buku menjadi pengetahuan yang bertahan lama.',
        longDescription: `Aplikasi pendamping membaca (reading companion) untuk mengubah kutipan & ide dari buku menjadi pengetahuan yang bertahan lama.

Dikembangkan dengan:
• Slicing desain UI yang responsif & intuitif
• Pola Clean Architecture
• State management menggunakan BLoC
• Integrasi dengan layanan backend melalui konsumsi API`,
        image: '/images/projects/orymu.png',
        tags: ['Flutter', 'Dart', 'BLoC', 'Clean Architecture'],
        featured: true,
        year: 2024,
    },
    {
        id: 'e-pkk',
        title: 'E-PKK Kabupaten Nganjuk',
        description: 'Aplikasi mobile terintegrasi dengan website untuk membantu pengelolaan data kegiatan PKK. Kerjasama dengan Diskominfo & PKK Nganjuk.',
        longDescription: `Aplikasi mobile terintegrasi dengan website untuk membantu pengelolaan data kegiatan PKK. Proyek bekerja sama dengan Diskominfo Nganjuk dan PKK Nganjuk.

Kontribusi:
• Riset dengan Diskominfo & PKK untuk identifikasi permasalahan utama
• Mendesain antarmuka berdasarkan solusi & kebutuhan pengguna PKK Nganjuk
• Mengembangkan aplikasi menggunakan Flutter & Dart
• Fitur upload laporan dan galeri terintegrasi dengan website melalui REST API

Penghargaan: Juara 2 TIF Exhibition & Best Poster Expo Pekan Ilmiah Mahasiswa 2023.`,
        image: '/images/projects/e-pkk.png',
        tags: ['Flutter', 'Dart', 'REST API', 'MySQL', 'UI/UX Design'],
        featured: true,
        year: 2023,
    },
    {
        id: 'tomatify',
        title: 'Tomatify (Tomato Identify)',
        description: 'Aplikasi mobile untuk memonitoring penyortiran tomat otomatis yang terintegrasi dengan IoT dan sistem klasifikasi tomat matang/mentah.',
        longDescription: `Aplikasi mobile untuk memonitoring penyortiran tomat otomatis yang terintegrasi dengan IoT dan sistem cerdas untuk klasifikasi tomat matang/mentah.

Kontribusi:
• Mengumpulkan kebutuhan pengguna melalui wawancara & observasi
• Membuat desain antarmuka sesuai data kebutuhan pengguna
• Mengembangkan aplikasi menggunakan Flutter & Dart
• Integrasi dengan IoT pada sistem penyortiran tomat melalui REST API (PHP) dan MySQL`,
        image: '/images/projects/tomatify.png',
        tags: ['Flutter', 'Dart', 'REST API', 'MySQL', 'IoT', 'UI/UX Design'],
        featured: false,
        year: 2023,
    },
    {
        id: 'cemilku',
        title: 'Cemilku',
        description: 'Aplikasi mobile terintegrasi dengan website untuk UMKM penjual kripik di Kabupaten Nganjuk. Mobile sebagai hak akses penjual/admin.',
        longDescription: `Aplikasi mobile yang terintegrasi dengan website, di mana mobile berperan sebagai hak akses penjual/admin untuk UMKM penjual kripik di Kabupaten Nganjuk.

        Kontribusi:
        • Mengumpulkan kebutuhan pengguna dari mitra UMKM melalui wawancara
        • Membuat desain & prototipe aplikasi berdasarkan kebutuhan pengguna
        • Mengembangkan aplikasi menggunakan Java
        • Fitur hak akses penjual: Tambah Produk dan Riwayat Transaksi yang terintegrasi melalui REST API`,
        image: '/images/projects/cemilku.png',
        tags: ['Android', 'Java', 'REST API', 'MySQL', 'UI/UX Design'],
        featured: false,
        year: 2022,
    },
    {
        id: 'siapsadi',
        title: 'SIAPSADI',
        description: 'Sistem Aplikasi Pemilihan Sampah Digital. Implementasi desain prototipe aplikasi sebagai syarat kelulusan kursus Dicoding.',
        longDescription: `SIAPSADI (Sistem Aplikasi Pemilihan Sampah Digital)

        Implementasi desain prototipe aplikasi menggunakan Flutter sebagai syarat kelulusan kursus Dicoding (Belajar Membuat Aplikasi Flutter untuk Pemula).

        Kontribusi:
        • Membuat desain antarmuka sesuai ketentuan Dicoding menggunakan Figma
        • Mengimplementasikan desain ke dalam aplikasi menggunakan Flutter`,
        image: '/images/projects/siapsadi.png',
        tags: ['Flutter', 'Dart', 'Figma', 'UI/UX Design'],
        featured: false,
        year: 2023,
    },
];

// Get featured projects only
export const featuredProjects = projects.filter((p) => p.featured);

// Get projects by year
export const getProjectsByYear = (year: number) =>
    projects.filter((p) => p.year === year);
