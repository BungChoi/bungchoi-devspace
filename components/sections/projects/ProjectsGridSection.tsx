'use client';

/**
 * ===========================================
 * PROJECTS GRID SECTION
 * ===========================================
 * Grid of all project cards.
 */

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/types';

// ============================================
// TYPES
// ============================================

interface ProjectsGridSectionProps {
    className?: string;
    projects: Project[];
}

// ============================================
// COMPONENT
// ============================================

export function ProjectsGridSection({ className, projects }: ProjectsGridSectionProps) {
    return (
        <section className={cn('py-12', className)}>
            <div className="container max-w-6xl mx-auto px-4">
                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
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
        <Link href={`/projects/${project.id}`} className="block">
            <article
                className={cn(
                    'group relative p-6 rounded-xl cursor-pointer',
                    'bg-[var(--background)]/40 backdrop-blur-sm',
                    'border border-[var(--primary)]/20',
                    'hover:border-[var(--primary)]/50 transition-all duration-300'
                )}
            >
                {/* Featured Badge */}
                {project.featured && (
                    <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-[var(--primary)] text-white text-xs font-bold shadow-lg">
                        Featured
                    </div>
                )}

                {/* Project Image */}
                <div className="aspect-video rounded-lg overflow-hidden bg-[var(--background-tertiary)] mb-5 relative border border-[var(--primary)]/10 group-hover:border-[var(--primary)]/30 transition-colors">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                                📱
                            </div>
                        </>
                    )}
                </div>

                {/* Content */}
                <div>
                    {/* Year Badge */}
                    <span className="text-xs text-[var(--foreground-muted)] bg-[var(--foreground)]/5 px-2 py-1 rounded mb-3 inline-block">
                        {project.year}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--foreground-secondary)] line-clamp-2 mb-4">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* View Details Prompt */}
                    <div className="flex items-center gap-2 text-sm text-[var(--primary)] font-medium">
                        <span>View Details</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </article>
        </Link>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { ProjectsGridSectionProps };
