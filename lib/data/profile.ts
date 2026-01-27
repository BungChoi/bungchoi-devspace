/**
 * ===========================================
 * PROFILE DATA
 * ===========================================
 * Personal information with i18n support
 */

import type { PersonalInfo } from '../types';

export const personalInfo: PersonalInfo = {
    name: 'Ahmad Choirul Umam Ali Rozaqi',
    title: {
        id: 'Mobile Developer',
        en: 'Mobile Developer'
    },
    bio: {
        id: `Saya Flutter Mobile Developer (fresh graduate) dengan pengalaman ±1 tahun membangun aplikasi dari sisi UI sampai integrasi API. 
Saya menekankan kualitas implementasi: state management yang tertata, struktur folder yang jelas, serta komponen UI yang reusable. 
Saya percaya aplikasi yang baik bukan cuma jalan, tapi juga mudah dirawat karena itu saya menjaga codebase tetap clean, konsisten, dan siap berkembang.`,
        en: `I am a Flutter Mobile Developer (fresh graduate) with ±1 year of experience building applications from UI to API integration. 
I emphasize implementation quality: organized state management, clear folder structure, and reusable UI components. 
I believe a good application is not just functional, but also maintainable — that's why I keep my codebase clean, consistent, and ready to scale.`
    },
    email: 'bungchoi.dev@gmail.com',
    phone: '+62 821 4256 8403',
    location: {
        id: 'Bandung, Indonesia',
        en: 'Bandung, Indonesia'
    },
    avatar: '/images/avatar.jpg',
    resumeUrl: '/resume.pdf',
    stats: [
        {
            label: { id: 'Proyek', en: 'Projects' },
            value: '6+',
            icon: 'folder'
        },
        {
            label: { id: 'Tahun Exp', en: 'Years Exp' },
            value: '±1',
            icon: 'calendar'
        },
        {
            label: { id: 'Sertifikat', en: 'Certificates' },
            value: '7+',
            icon: 'award'
        },
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
