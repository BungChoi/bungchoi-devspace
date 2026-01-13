'use client';

/**
 * ===========================================
 * PROJECTS HEADER SECTION
 * ===========================================
 * Page header with title and optional filters.
 */

import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

interface ProjectsHeaderSectionProps {
    className?: string;
    totalProjects: number;
}

// ============================================
// COMPONENT
// ============================================

export function ProjectsHeaderSection({ className, totalProjects }: ProjectsHeaderSectionProps) {
    return (
        <section className={cn('pt-32 pb-12', className)}>
            <div className="container max-w-6xl mx-auto px-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] mb-6">
                    <a href="/" className="hover:text-[var(--primary)] transition-colors">Home</a>
                    <span>/</span>
                    <span className="text-[var(--foreground)]">Projects</span>
                </div>

                {/* Title */}
                <div className="max-w-3xl">
                    <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                        My Work
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-3">
                        Featured <span className="text-gradient">Projects</span>
                    </h1>
                    <p className="mt-4 text-lg text-[var(--foreground-secondary)]">
                        A collection of {totalProjects} projects I've worked on, from mobile apps to web applications.
                    </p>
                </div>
            </div>
        </section>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { ProjectsHeaderSectionProps };
