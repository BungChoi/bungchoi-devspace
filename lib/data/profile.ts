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
    subtitle: 'Flutter & React Native Enthusiast',
    bio: `Passionate mobile developer with experience in building 
        beautiful and performant mobile applications. 
        I love turning ideas into reality through code.`,
    email: 'hello@bungchoi.dev',
    phone: '+62 812 3456 7890',
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
            url: 'https://linkedin.com/in/bungchoi',
            icon: 'linkedin',
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com/bungchoi',
            icon: 'twitter',
        },
    ],
};
