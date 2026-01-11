/**
 * ===========================================
 * PROJECTS DATA
 * ===========================================
 * Your portfolio projects - UPDATE THIS!
 */

import type { Project } from '../types';

export const projects: Project[] = [
    {
        id: 'project-1',
        title: 'E-Commerce Mobile App',
        description: 'A full-featured e-commerce application with cart, payment, and order tracking.',
        longDescription: `Built a complete e-commerce solution with features including 
                      product catalog, shopping cart, secure payment integration, 
                      order tracking, and push notifications.`,
        image: '/images/projects/ecommerce.png',
        tags: ['Flutter', 'Firebase', 'GetX', 'Stripe'],
        liveUrl: 'https://play.google.com/store/apps/details?id=com.example',
        githubUrl: 'https://github.com/BungChoi/ecommerce-app',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.example',
        featured: true,
        year: 2024,
    },
    {
        id: 'project-2',
        title: 'Task Management App',
        description: 'A productivity app for managing tasks with team collaboration features.',
        longDescription: `Developed a task management application with real-time 
                      collaboration, task assignments, deadline tracking, 
                      and progress analytics.`,
        image: '/images/projects/taskmanager.png',
        tags: ['React Native', 'TypeScript', 'Redux', 'Node.js'],
        githubUrl: 'https://github.com/BungChoi/task-manager',
        featured: true,
        year: 2024,
    },
    {
        id: 'project-3',
        title: 'Fitness Tracker',
        description: 'Health and fitness tracking app with workout plans and progress monitoring.',
        image: '/images/projects/fitness.png',
        tags: ['Flutter', 'Dart', 'SQLite', 'Health API'],
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.fitness',
        featured: false,
        year: 2023,
    },
];

// Get featured projects only
export const featuredProjects = projects.filter((p) => p.featured);

// Get projects by year
export const getProjectsByYear = (year: number) =>
    projects.filter((p) => p.year === year);
