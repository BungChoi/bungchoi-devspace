/**
 * ===========================================
 * SKILLS DATA
 * ===========================================
 * Your technical skills - UPDATE THIS!
 */

import type { Skill, SkillCategory } from '../types';

export const skills: Skill[] = [
    // Mobile Development
    { name: 'Flutter', category: 'mobile', level: 'expert' },
    { name: 'Dart', category: 'mobile', level: 'expert' },
    { name: 'React Native', category: 'mobile', level: 'advanced' },
    { name: 'Android (Kotlin)', category: 'mobile', level: 'intermediate' },
    { name: 'iOS (Swift)', category: 'mobile', level: 'beginner' },

    // Frontend
    { name: 'React', category: 'frontend', level: 'advanced' },
    { name: 'Next.js', category: 'frontend', level: 'intermediate' },
    { name: 'TypeScript', category: 'frontend', level: 'advanced' },
    { name: 'Tailwind CSS', category: 'frontend', level: 'advanced' },
    { name: 'HTML/CSS', category: 'frontend', level: 'expert' },

    // Backend
    { name: 'Node.js', category: 'backend', level: 'intermediate' },
    { name: 'Express', category: 'backend', level: 'intermediate' },
    { name: 'REST API', category: 'backend', level: 'advanced' },
    { name: 'GraphQL', category: 'backend', level: 'beginner' },

    // Database
    { name: 'Firebase', category: 'database', level: 'expert' },
    { name: 'PostgreSQL', category: 'database', level: 'intermediate' },
    { name: 'MongoDB', category: 'database', level: 'intermediate' },
    { name: 'SQLite', category: 'database', level: 'advanced' },

    // Tools
    { name: 'Git', category: 'tools', level: 'expert' },
    { name: 'VS Code', category: 'tools', level: 'expert' },
    { name: 'Figma', category: 'tools', level: 'intermediate' },
    { name: 'Docker', category: 'tools', level: 'beginner' },
];

// Get skills by category
export const getSkillsByCategory = (category: SkillCategory) =>
    skills.filter((s) => s.category === category);

// Skill category labels (for display)
export const skillCategoryLabels: Record<SkillCategory, string> = {
    mobile: 'Mobile Development',
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    tools: 'Tools & Others',
    other: 'Other',
};
