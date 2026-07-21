'use client';

/**
 * ===========================================
 * PROJECTS GRID SECTION
 * ===========================================
 * Grid of all project cards → dedicated /projects/[id]
 */

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/types';
import { t } from '@/lib/utils/localization';
import { Locale } from '@/lib/i18n/config';

interface ProjectsGridSectionProps {
    className?: string;
    projects: Project[];
}

export function ProjectsGridSection({ className, projects }: ProjectsGridSectionProps) {
    const locale = useLocale() as Locale;

    return (
        <section className={cn('py-12', className)}>
            <div className="container mx-auto max-w-6xl px-4">
                <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} locale={locale} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface ProjectCardProps {
    project: Project;
    locale: Locale;
}

function ProjectCard({ project, locale }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.id}`} className="block">
            <article
                className={cn(
                    'group relative rounded-2xl p-6',
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
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
                            📱
                        </div>
                    )}
                </div>

                <div>
                    <span className="mb-3 inline-block rounded bg-[var(--foreground)]/5 px-2 py-1 text-xs text-[var(--foreground-muted)]">
                        {project.year}
                    </span>

                    <h3 className="mb-2 text-xl font-bold text-[var(--foreground)]">
                        {project.title}
                    </h3>

                    <p className="mb-4 line-clamp-2 text-sm text-[var(--foreground-secondary)]">
                        {t(project.description, locale)}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-[var(--border)] px-2 py-1 text-xs text-[var(--foreground-muted)]"
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
        </Link>
    );
}

export type { ProjectsGridSectionProps };
