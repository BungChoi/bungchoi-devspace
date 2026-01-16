/**
 * ===========================================
 * PROFILE DATA
 * ===========================================
 * Personal information - REAL DATA
 */

import type { PersonalInfo } from '../types';

export const personalInfo: PersonalInfo = {
    name: 'Ahmad Choirul Umam Ali Rozaqi',
    title: 'Mobile Developer',
    bio: `Mahasiswa semester 8 D-IV Teknik Informatika Politeknik Negeri Jember dengan fokus pada Android Development (Flutter) dan UI/UX Design. Telah menyelesaikan MSIB Studi Independen Batch 6 (Android Mobile & UI/UX Design), dan mengembangkan beberapa proyek inovatif. Saya berdedikasi untuk terus mendorong inovasi teknologi, dengan tujuan memberikan kontribusi nyata di bidang mobile development dan UI/UX design yang berpusat pada pengguna.`,
    email: 'ahmadzaqi98mmm@gmail.com',
    phone: '+62 821 4256 8403',
    location: 'Kediri, Indonesia',
    avatar: '/images/avatar.jpg',
    resumeUrl: '/resume.pdf',
    stats: [
        { label: 'Proyek', value: '6+', icon: 'folder' },
        { label: 'Tahun Exp', value: '1+', icon: 'calendar' },
        { label: 'Sertifikat', value: '7+', icon: 'award' },
    ],
    socialLinks: [
        {
            name: 'GitHub',
            url: 'https://github.com/orangdeso',
            icon: 'github',
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/ahmad-choirul-umam-ali-rozaqi',
            icon: 'linkedin',
        },
        {
            name: 'Instagram',
            url: 'https://instagram.com/bungchoi',
            icon: 'instagram',
        },
    ],
};
