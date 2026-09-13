'use client';

/**
 * ===========================================
 * PROJECTS GRID SECTION
 * ===========================================
 * Grid of all project cards with interactive popup modal
 */

import Image from 'next/image';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/types';
import { t } from '@/lib/utils/localization';
import { Locale } from '@/lib/i18n/config';
import { ProjectModal } from '@/components/ui';

interface ProjectsGridSectionProps {
    className?: string;
    projects: Project[];
}

export function ProjectsGridSection({ className, projects }: ProjectsGridSectionProps) {
    const locale = useLocale() as Locale;
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section className={cn('py-12', className)}>
            <div className="container mx-auto max-w-6xl px-4">
                <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            locale={locale}
                            onSelect={setSelectedProject}
                        />
                    ))}
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={selectedProject !== null}
                onClose={() => setSelectedProject(null)}
                locale={locale}
            />
        </section>
    );
}

interface ProjectCardProps {
    project: Project;
    locale: Locale;
    onSelect: (project: Project) => void;
}

function ProjectCard({ project, locale, onSelect }: ProjectCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onSelect(project)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(project);
                }
            }}
            className="block text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-2xl select-none"
            aria-label={`${project.title} - ${locale === 'id' ? 'Buka detail' : 'View details'}`}
        >
            <article
                className={cn(
                    'group relative h-full rounded-2xl p-6',
                    'border border-[var(--border)] bg-[var(--card)]',
                    'transition-all duration-300',
                    'hover:-translate-y-1 hover:border-[var(--border-hover)] hover:shadow-xl'
                )}
            >
                {project.featured && (
                    <div className="absolute -right-2 -top-2 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-[var(--primary-foreground)] shadow-lg">
                        Featured
                    </div>
                )}

                <div className="relative mb-5 aspect-video overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--background-tertiary)]">
                    {project.image && !imageError ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background-tertiary)] p-4 text-center">
                            <span className="text-4xl opacity-35">📱</span>
                            <span className="mt-2 text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)]">
                                {project.title}
                            </span>
                        </div>
                    )}
                </div>

                <div>
                    <span className="mb-3 inline-block rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-0.5 text-xs text-[var(--foreground-secondary)]">
                        {project.year}
                    </span>

                    <h3 className="mb-2 text-xl font-bold text-[var(--foreground)]">
                        {project.title}
                    </h3>

                    <p className="mb-4 line-clamp-2 text-sm text-[var(--foreground-secondary)]">
                        {t(project.description, locale)}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md border border-[var(--border)] bg-[var(--background-secondary)]/40 px-2 py-0.5 text-[11px] font-medium text-[var(--foreground-muted)]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                        <span>{locale === 'id' ? 'Lihat Detail' : 'View Details'}</span>
                        <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </article>
        </div>
    );
}

export type { ProjectsGridSectionProps };
