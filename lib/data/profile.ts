/**
 * ===========================================
 * PERSONAL PROFILE DATA
 * ===========================================
 * Your personal information - UPDATE THIS!
 */

import type { PersonalInfo } from '../types';

export const personalInfo: PersonalInfo = {
    name: 'BungChoi',
    title: 'Mobile Developer',
    subtitle: 'Flutter Developer',
    bio: `Passionate mobile developer with experience in building 
        beautiful and performant mobile applications. 
        I love turning ideas into reality through code.`,
    email: 'bungchoi.dev@gmail.com',
    phone: '+62 821 4256 8403',
    location: 'Indonesia',
    avatar: '/images/avatar.jpg',
    resumeUrl: '/resume.pdf',
    socialLinks: [
        {
            name: 'GitHub',
            url: 'https://github.com/BungChoi',
            icon: 'github',
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/ahmad-choirul-umam-ali-rozaqi-1b3196271/',
            icon: 'linkedin',
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/bung_choi/',
            icon: 'instagram',
        },
    ],
};
