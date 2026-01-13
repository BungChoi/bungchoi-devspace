/**
 * ===========================================
 * EXPERIENCE DATA
 * ===========================================
 * Work & Education history - REAL DATA
 */

import type { Experience, Education } from '../types';

export const experiences: Experience[] = [
    {
        id: 'work-1',
        company: 'Nodewave',
        position: 'Mobile Developer (Internship)',
        startDate: 'Agustus 2024',
        endDate: 'Desember 2024',
        description: 'Mengembangkan aplikasi ERP Mobile untuk perusahaan Jepang dengan fokus fitur absensi, izin kerja, rincian gaji, dan shift management.',
        achievements: [
            'Mengembangkan aplikasi ERP Mobile menggunakan Flutter dan GetX untuk state management',
            'Melakukan slicing design sesuai dokumentasi kode dan menerapkan Clean Architecture',
            'Mengimplementasikan fitur izin kerja dan rincian gaji dengan integrasi REST API',
            'Mengimplementasikan localization untuk pengguna multibahasa',
            'Berhasil menyelesaikan aplikasi dalam 3 bulan sesuai ketentuan proyek',
        ],
        technologies: ['Flutter', 'Dart', 'GetX', 'REST API', 'Clean Architecture'],
    },
];

export const educations: Education[] = [
    {
        id: 'edu-1',
        institution: 'Politeknik Negeri Jember',
        degree: 'Sarjana Terapan (S.Tr.)',
        field: 'Teknik Informatika',
        startDate: '2021',
        endDate: 'Sekarang',
        description: 'Mata Kuliah Relevan: Interaksi Manusia dan Komputer, Algoritma, Struktur Data, Workshop Mobile Applications, Workshop Mobile Applications Framework.',
        gpa: '3.82',
    },
    {
        id: 'edu-2',
        institution: 'MSIB Studi Independen Batch 6 - Infinite Learning',
        degree: 'Sertifikasi',
        field: 'Android Mobile Development & UI/UX Design',
        startDate: 'Feb 2024',
        endDate: 'Juli 2024',
        description: 'Materi pembelajaran: UI/UX Design, Kotlin - Jetpack Compose, Project Management. Capstone Project: Savor Craft & Nusa Guide.',
        gpa: '89.3',
    },
];

// Get current position
export const getCurrentPosition = () =>
    experiences.find((e) => !e.endDate);
