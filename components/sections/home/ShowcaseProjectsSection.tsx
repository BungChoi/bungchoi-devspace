'use client';

/**
 * ===========================================
 * SHOWCASE PROJECTS SECTION
 * ===========================================
 * Displays 4 featured projects in a grid layout
 * with a "See All" button linking to /projects page.
 */

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

interface ShowcaseProjectsSectionProps {
    className?: string;
}

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
    featured?: boolean;
}

// ============================================
// MOCK DATA - TODO: Replace with CMS/API
// ============================================

const featuredProjects: Project[] = [
    {
        id: '1',
        title: 'Flutter E-Commerce App',
        description: 'A full-stack mobile e-commerce application with payment integration, real-time inventory, and beautiful UI.',
        image: '/projects/ecommerce.png',
        tags: ['Flutter', 'Firebase', 'Stripe'],
        link: '/projects/ecommerce',
        featured: true,
    },
    {
        id: '2',
        title: 'Task Management Dashboard',
        description: 'Cross-platform task management app with team collaboration features and analytics dashboard.',
        image: '/projects/taskmanager.png',
        tags: ['Flutter', 'GetX', 'REST API'],
        link: '/projects/taskmanager',
    },
    {
        id: '3',
        title: 'Social Media Clone',
        description: 'Instagram-inspired social app with stories, reels, and real-time messaging capabilities.',
        image: '/projects/social.png',
        tags: ['Flutter', 'Firebase', 'WebSocket'],
        link: '/projects/social',
    },
    {
        id: '4',
        title: 'Crypto Portfolio Tracker',
        description: 'Real-time cryptocurrency portfolio tracker with price alerts and market analysis tools.',
        image: '/projects/crypto.png',
        tags: ['Flutter', 'Bloc', 'CoinGecko API'],
        link: '/projects/crypto',
    },
];

// ============================================
// COMPONENT
// ============================================

export function ShowcaseProjectsSection({ className }: ShowcaseProjectsSectionProps) {
    return (
        <section
            id="projects"
            className={cn(
                'relative py-20 sm:py-28',
                className
            )}
        >
            <div className="container max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                        My Work
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="mt-4 text-[var(--foreground-secondary)] max-w-2xl mx-auto">
                        A showcase of my best work, from mobile apps to full-stack solutions
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mb-12">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* See All Button */}
                <div className="text-center">
                    <Link
                        href="/projects"
                        className={cn(
                            'inline-flex items-center gap-2',
                            'px-8 py-3 rounded-full',
                            'bg-[var(--primary)] text-white font-medium',
                            'hover:bg-[var(--primary)]/90 transition-colors',
                            'shadow-lg shadow-[var(--primary)]/25'
                        )}
                    >
                        See All Projects
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ============================================
// PROJECT CARD
// ============================================

interface ProjectCardProps {
    project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link
            href={project.link}
            className={cn(
                'group block',
                'rounded-xl overflow-hidden',
                'bg-[var(--background)]/40 backdrop-blur-xl',
                'border border-[var(--primary)]/30',
                'shadow-xl',
                'hover:border-[var(--primary)]/60 transition-all duration-300',
                'hover:shadow-2xl hover:shadow-[var(--primary)]/10'
            )}
        >
            {/* Image */}
            <div className="relative aspect-video bg-[var(--background-tertiary)] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                    📱
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-60" />
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className={cn(
                                'text-xs px-2 py-1 rounded-full',
                                'bg-[var(--primary)]/10 text-[var(--primary)]',
                                'border border-[var(--primary)]/20'
                            )}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-[var(--foreground-secondary)] line-clamp-2">
                    {project.description}
                </p>

                {/* View Project Link */}
                <div className="mt-4 flex items-center gap-2 text-sm text-[var(--primary)] font-medium">
                    View Project
                    <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { ShowcaseProjectsSectionProps, Project };
