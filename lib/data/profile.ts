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
    bio: `Saya Flutter Mobile Developer (fresh graduate) dengan pengalaman ±1 tahun membangun aplikasi dari sisi UI sampai integrasi API. Saya menekankan kualitas implementasi: state management yang tertata, struktur folder yang jelas, serta komponen UI yang reusable. Saya percaya aplikasi yang baik bukan cuma jalan, tapi juga mudah dirawat karena itu saya menjaga codebase tetap clean, konsisten, dan siap berkembang.`,
    email: 'ahmadzaqi98mmm@gmail.com',
    phone: '+62 821 4256 8403',
    location: 'Bandung, Indonesia',
    avatar: '/images/avatar.jpg',
    resumeUrl: '/resume.pdf',
    stats: [
        { label: 'Proyek', value: '6+', icon: 'folder' },
        { label: 'Tahun Exp', value: '±1', icon: 'calendar' },
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
