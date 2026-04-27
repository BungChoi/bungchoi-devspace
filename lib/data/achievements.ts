/**
 * ===========================================
 * ACHIEVEMENTS DATA
 * ===========================================
 * Awards, certifications, and achievements with i18n support
 */

import type { Achievement } from '../types';

export const achievements: Achievement[] = [
    {
        id: '1',
        title: {
            id: 'PKM-KC 2023 - Pendanaan Kemendikbudristek',
            en: 'PKM-KC 2023 - Ministry of Education Funding'
        },
        issuer: {
            id: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
            en: 'Ministry of Education, Culture, Research, and Technology'
        },
        date: {
            id: '15 Desember 2023',
            en: 'December 15, 2023'
        },
        description: {
            id: 'LoFo (Leftover Food): Inovasi Pengurangan Food Waste untuk SDGs 2030. Sertifikat No: 220/D3/KM/2287.',
            en: 'LoFo (Leftover Food): Food Waste Reduction Innovation for SDGs 2030. Certificate No: 220/D3/KM/2287.'
        },
        certificateUrl: '/certificates/pkm-kc-2023.pdf',
    },
    {
        id: '2',
        title: {
            id: 'E-PKK - Best Poster',
            en: 'E-PKK - Best Poster Award'
        },
        issuer: {
            id: 'Expo Pekan Ilmiah Mahasiswa 2023',
            en: 'Student Scientific Week Expo 2023'
        },
        date: {
            id: '2023',
            en: '2023'
        },
        description: {
            id: 'Penghargaan poster terbaik untuk proyek E-PKK Kabupaten Nganjuk. No: 008/SERTIF/HMJ TI/VII/2023.',
            en: 'Best poster award for E-PKK Nganjuk Regency project. No: 008/SERTIF/HMJ TI/VII/2023.'
        },
        certificateUrl: '/certificates/epkk-best-poster.pdf',
    },
    {
        id: '3',
        title: {
            id: 'E-PKK - Juara 2 Aplikasi Terbaik',
            en: 'E-PKK - 2nd Place Best Application'
        },
        issuer: {
            id: 'TIF Exhibition PSDKU Nganjuk',
            en: 'TIF Exhibition PSDKU Nganjuk'
        },
        date: {
            id: '14 Agustus 2023',
            en: 'August 14, 2023'
        },
        description: {
            id: 'Juara 2 aplikasi terbaik dari Program Studi Teknik Informatika Kampus 3 Kabupaten Nganjuk.',
            en: '2nd place best application from Information Technology Study Program Campus 3 Nganjuk Regency.'
        },
        certificateUrl: '/certificates/epkk-juara2.pdf',
    },
    {
        id: '4',
        title: {
            id: 'Hak Cipta - Prototype Aplikasi LoFo',
            en: 'Copyright - LoFo Application Prototype'
        },
        issuer: {
            id: 'Kementerian Hukum dan HAM',
            en: 'Ministry of Law and Human Rights'
        },
        date: {
            id: '9 Oktober 2023',
            en: 'October 9, 2023'
        },
        description: {
            id: 'Surat Pencatatan Ciptaan EC00202390619. No Pencatatan: 0005253574.',
            en: 'Copyright Registration Letter EC00202390619. Registration No: 0005253574.'
        },
        certificateUrl: '/certificates/haki-lofo.pdf',
    },
    {
        id: '5',
        title: {
            id: 'Memulai Pemrograman dengan Dart',
            en: 'Getting Started with Dart Programming'
        },
        issuer: {
            id: 'Dicoding Indonesia',
            en: 'Dicoding Indonesia'
        },
        date: {
            id: '22 November 2023',
            en: 'November 22, 2023'
        },
        description: {
            id: 'Sertifikasi Dicoding. ID: 55XE42MKYZRN.',
            en: 'Dicoding Certification. ID: 55XE42MKYZRN.'
        },
        certificateUrl: '/certificates/dicoding-dart.pdf',
    },
    {
        id: '6',
        title: {
            id: 'Belajar Membuat Aplikasi Flutter untuk Pemula',
            en: 'Learn to Build Flutter Apps for Beginners'
        },
        issuer: {
            id: 'Dicoding Indonesia',
            en: 'Dicoding Indonesia'
        },
        date: {
            id: '26 Desember 2023',
            en: 'December 26, 2023'
        },
        description: {
            id: 'Sertifikasi Dicoding. ID: 0726W86DY2QR.',
            en: 'Dicoding Certification. ID: 0726W86DY2QR.'
        },
        certificateUrl: '/certificates/dicoding-flutter.pdf',
    },
    {
        id: '7',
        title: {
            id: 'Belajar Prinsip Pemrograman SOLID',
            en: 'Learn SOLID Programming Principles'
        },
        issuer: {
            id: 'Dicoding Indonesia',
            en: 'Dicoding Indonesia'
        },
        date: {
            id: '08 Januari 2024',
            en: 'January 8, 2024'
        },
        description: {
            id: 'Sertifikasi Dicoding. ID: NVP77Q36OPRO.',
            en: 'Dicoding Certification. ID: NVP77Q36OPRO.'
        },
        certificateUrl: '/certificates/dicoding-solid.pdf',
    },
    {
        id: '8',
        title: {
            id: 'Dasar-dasar Desain Pengalaman Pengguna (UX)',
            en: 'Foundations of User Experience (UX) Design'
        },
        issuer: {
            id: 'Google / Coursera',
            en: 'Google / Coursera'
        },
        date: {
            id: '26 Desember 2023',
            en: 'December 26, 2023'
        },
        description: {
            id: 'Sertifikasi Google UX Design. Verify: coursera.org/verify/HXM2VN7V62R3.',
            en: 'Google UX Design Certification. Verify: coursera.org/verify/HXM2VN7V62R3.'
        },
        certificateUrl: '/certificates/google-ux.pdf',
    },
];
