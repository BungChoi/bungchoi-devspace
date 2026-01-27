/**
 * ===========================================
 * EXPERIENCE DATA
 * ===========================================
 * Work & Education history with i18n support
 */

import type { Experience, Education } from '../types';

export const experiences: Experience[] = [
    {
        id: 'work-1',
        company: 'SIESTA',
        position: {
            id: 'Mobile Developer (Full-time)',
            en: 'Mobile Developer (Full-time)'
        },
        startDate: {
            id: 'Agustus 2025',
            en: 'August 2025'
        },
        endDate: {
            id: 'Sekarang',
            en: 'Present'
        },
        description: {
            id: 'Bertanggung jawab mengembangkan dan menjaga kualitas beberapa aplikasi mobile untuk mendukung proses bisnis harian. Mengutamakan pengalaman pengguna yang halus, integrasi API yang andal, dan struktur kode yang siap berkembang.',
            en: 'Responsible for developing and maintaining multiple mobile applications to support daily business processes. Prioritizing smooth user experience, reliable API integration, and scalable code structure.'
        },
        achievements: [
            {
                id: 'Mengembangkan fitur-fitur aplikasi sesuai kebutuhan bisnis, mencakup modul transaksi, pengelolaan data, alur operasional end-to-end dst.',
                en: 'Developed application features according to business needs, including transaction modules, data management, end-to-end operational flows.'
            },
            {
                id: 'Mengintegrasikan REST API end-to-end (request/response handling, error handling, dan validasi data) serta memastikan experience pengguna tetap konsisten',
                en: 'Integrated REST API end-to-end (request/response handling, error handling, and data validation) while ensuring consistent user experience.'
            },
            {
                id: 'Menerapkan clean architecture dan menyusun struktur project yang clean code agar pengembangan fitur lebih cepat dan maintainable',
                en: 'Applied clean architecture and organized project structure with clean code for faster and more maintainable feature development.'
            },
            {
                id: 'Melakukan debugging dan troubleshooting issue integrasi (contoh: payload mismatch, 404/endpoint, dan kontrak data) bersama tim backend',
                en: 'Performed debugging and troubleshooting integration issues (e.g., payload mismatch, 404/endpoint, data contracts) with the backend team.'
            },
            {
                id: 'Menyiapkan kebutuhan rilis aplikasi seperti versioning, signing, serta proses distribusi/testing (mis. internal testing) agar delivery lebih terkontrol',
                en: 'Prepared app release requirements such as versioning, signing, and distribution/testing processes (e.g., internal testing) for controlled delivery.'
            },
            {
                id: 'Meningkatkan kualitas UI melalui komponen reusable, layout responsif, dan penerapan pola implementasi yang konsisten',
                en: 'Improved UI quality through reusable components, responsive layouts, and consistent implementation patterns.'
            },
        ],
        technologies: [
            'Flutter',
            'Dart',
            'GetX',
            'Android',
            'Clean Architecture'
        ],
    },
    {
        id: 'work-2',
        company: 'Nodewave',
        position: {
            id: 'Mobile Developer (Magang)',
            en: 'Mobile Developer (Internship)'
        },
        startDate: {
            id: 'Agustus 2024',
            en: 'August 2024'
        },
        endDate: {
            id: 'Desember 2024',
            en: 'December 2024'
        },
        description: {
            id: 'Mengembangkan aplikasi ERP Mobile untuk perusahaan Jepang dengan fokus fitur absensi, izin kerja, rincian gaji, dan shift management.',
            en: 'Developed ERP Mobile application for a Japanese company focusing on attendance, leave requests, salary details, and shift management features.'
        },
        achievements: [
            {
                id: 'Mengembangkan aplikasi ERP Mobile menggunakan Flutter dan GetX untuk state management',
                en: 'Developed ERP Mobile application using Flutter and GetX for state management'
            },
            {
                id: 'Melakukan slicing design sesuai dokumentasi kode dan menerapkan Clean Architecture',
                en: 'Performed design slicing according to code documentation and implemented Clean Architecture'
            },
            {
                id: 'Mengimplementasikan fitur izin kerja dan rincian gaji dengan integrasi REST API',
                en: 'Implemented leave request and salary details features with REST API integration'
            },
            {
                id: 'Mengimplementasikan localization untuk pengguna multibahasa',
                en: 'Implemented localization for multilingual users'
            },
            {
                id: 'Berhasil menyelesaikan aplikasi dalam 3 bulan sesuai ketentuan proyek',
                en: 'Successfully completed the application within 3 months as per project requirements'
            },
        ],
        technologies: ['Flutter', 'Dart', 'GetX', 'REST API', 'Clean Architecture'],
    },
];

export const educations: Education[] = [
    {
        id: 'edu-1',
        institution: 'Politeknik Negeri Jember',
        degree: {
            id: 'Sarjana Terapan (S.Tr.)',
            en: 'Bachelor of Applied Science (B.A.Sc.)'
        },
        field: {
            id: 'Teknik Informatika',
            en: 'Information Technology'
        },
        startDate: {
            id: '2021',
            en: '2021'
        },
        endDate: {
            id: 'Sekarang',
            en: 'Present'
        },
        description: {
            id: 'Mata Kuliah Relevan: Interaksi Manusia dan Komputer, Algoritma, Struktur Data, Workshop Mobile Applications, Workshop Mobile Applications Framework.',
            en: 'Relevant Courses: Human-Computer Interaction, Algorithms, Data Structures, Mobile Applications Workshop, Mobile Applications Framework Workshop.'
        },
        gpa: '3.82',
    },
    {
        id: 'edu-2',
        institution: 'MSIB Studi Independen Batch 6 - Infinite Learning',
        degree: {
            id: 'Sertifikasi',
            en: 'Certification'
        },
        field: {
            id: 'Android Mobile Development & UI/UX Design',
            en: 'Android Mobile Development & UI/UX Design'
        },
        startDate: {
            id: 'Feb 2024',
            en: 'Feb 2024'
        },
        endDate: {
            id: 'Juli 2024',
            en: 'July 2024'
        },
        description: {
            id: 'Materi pembelajaran: UI/UX Design, Kotlin - Jetpack Compose, Project Management. Capstone Project: Savor Craft & Nusa Guide.',
            en: 'Learning materials: UI/UX Design, Kotlin - Jetpack Compose, Project Management. Capstone Projects: Savor Craft & Nusa Guide.'
        },
        gpa: '89.3',
    },
];

// Get current position
export const getCurrentPosition = () =>
    experiences.find((e) => !e.endDate);
