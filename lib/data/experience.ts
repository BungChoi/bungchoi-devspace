/**
 * ===========================================
 * EXPERIENCE DATA
 * ===========================================
 * Work history - UPDATE THIS!
 */

import type { Experience, Education } from '../types';

export const experiences: Experience[] = [
    {
        id: 'work-1',
        company: 'Freelance',
        position: 'Mobile Developer',
        startDate: 'Jan 2024',
        endDate: undefined, // Current position
        description: 'Building cross-platform mobile applications using Flutter for various clients.',
        achievements: [
            'Developed 5+ mobile applications from concept to deployment',
            'Implemented clean architecture patterns for scalable codebases',
            'Integrated various APIs including payment gateways and social logins',
            'Maintained 4.5+ star ratings on app stores',
        ],
        technologies: ['Flutter', 'Dart', 'Firebase', 'GetX', 'REST API'],
    },
    {
        id: 'work-2',
        company: 'Tech Startup',
        position: 'Junior Developer',
        startDate: 'Jun 2023',
        endDate: 'Dec 2023',
        description: 'Contributed to mobile and web development projects in a startup environment.',
        achievements: [
            'Built UI components following design specifications',
            'Collaborated with senior developers on feature implementation',
            'Participated in code reviews and agile sprints',
        ],
        technologies: ['Flutter', 'React', 'Node.js'],
    },
    {
        id: 'work-2',
        company: 'Tech Startup',
        position: 'Junior Developer',
        startDate: 'Jun 2023',
        endDate: 'Dec 2023',
        description: 'Contributed to mobile and web development projects in a startup environment.',
        achievements: [
            'Built UI components following design specifications',
            'Collaborated with senior developers on feature implementation',
            'Participated in code reviews and agile sprints',
        ],
        technologies: ['Flutter', 'React', 'Node.js'],
    },
];

export const educations: Education[] = [
    {
        id: 'edu-1',
        institution: 'University Name',
        degree: 'Bachelor',
        field: 'Informatics Engineering',
        startDate: '2020',
        endDate: '2024',
        description: 'Focused on software engineering and mobile application development.',
        gpa: '3.8',
    },
];

// Get current position
export const getCurrentPosition = () =>
    experiences.find((e) => !e.endDate);
