'use client';

/**
 * ===========================================
 * SHOWCASE PROJECTS SECTION — Featured Work
 * ===========================================
 * Grid: 1 col (mobile) → 2 (sm) → 3 (lg desktop)
 * Cards link to dedicated /projects/[id]
 */

import Image from 'next/image';
import { useRef, useState, type CSSProperties } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import { projects } from '@/lib/data';
import type { Project } from '@/lib/types';
import { t as tl } from '@/lib/utils/localization';
import { Locale } from '@/lib/i18n/config';
import { useInViewOnce } from '@/hooks';
import { ProjectModal } from '@/components/ui';

interface ShowcaseProjectsSectionProps {
    className?: string;
}

const SHOWCASE_LIMIT = 6;

export function ShowcaseProjectsSection({ className }: ShowcaseProjectsSectionProps) {
    const t = useTranslations('sections');
    const tCommon = useTranslations('common');
    const locale = useLocale() as Locale;
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useInViewOnce(sectionRef);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const sorted = [...projects].sort((a, b) => (b.year || 0) - (a.year || 0));
    const featured = sorted.filter((p) => p.featured);
    const rest = sorted.filter((p) => !p.featured);
    const latestProjects = [...featured, ...rest].slice(0, SHOWCASE_LIMIT);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className={cn(
                'relative py-16 sm:py-20 lg:py-24',
                'scroll-mt-24',
                isVisible && 'is-visible',
                className
            )}
        >
            <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <div
                    className="motion-reveal mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
                    style={{ '--motion-delay': '40ms' } as CSSProperties}
                >
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                            /{t('myWork')}
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
                            {t('featuredProjects')}
                        </h2>
                        <p className="mt-3 max-w-xl text-[var(--foreground-secondary)]">
                            {t('featuredProjectsDesc')}
                        </p>
                    </div>
                    <Link
                        href="/projects"
                        className={cn(
                            'inline-flex shrink-0 items-center gap-2 self-start sm:self-auto',
                            'text-sm font-medium text-[var(--foreground-secondary)]',
                            'transition-colors hover:text-[var(--foreground)]'
                        )}
                    >
                        {tCommon('viewAllProjects')}
                        <span aria-hidden>→</span>
                    </Link>
                </div>

                {/* 1 col mobile · 2 col tablet · 3 col desktop */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
                    {latestProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="motion-reveal"
                            style={{ '--motion-delay': `${100 + index * 70}ms` } as CSSProperties}
                        >
                            <ProjectCard
                                project={project}
                                locale={locale}
                                onSelect={setSelectedProject}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Popup Dialog Modal */}
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
            className={cn(
                'group flex h-full flex-col overflow-hidden rounded-2xl cursor-pointer text-left',
                'border border-[var(--border)] bg-[var(--card)]',
                'transition-all duration-[var(--transition-slow)] select-none',
                'hover:-translate-y-1 hover:border-[var(--border-hover)] hover:shadow-lg',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]'
            )}
            aria-label={`${project.title} - ${locale === 'id' ? 'Buka detail' : 'View details'}`}
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--background-tertiary)]">
                {project.image && !imageError ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/70 via-transparent to-transparent opacity-70 pointer-events-none" />

                <div
                    className={cn(
                        'absolute right-3 top-3 flex h-9 w-9 items-center justify-center',
                        'rounded-full border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur',
                        'text-[var(--foreground)] opacity-0 transition-all duration-300',
                        'translate-y-1 group-hover:translate-y-0 group-hover:opacity-100'
                    )}
                    aria-hidden
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                </div>

                {project.year && (
                    <div className="absolute bottom-3 left-3 rounded-md border border-[var(--border)] bg-[var(--card)]/90 px-2 py-0.5 text-xs text-[var(--foreground-secondary)] backdrop-blur">
                        {project.year}
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-5 lg:p-6">
                <div className="mb-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className={cn(
                                'rounded-md border border-[var(--border)] bg-[var(--background-secondary)]/40 px-2 py-0.5',
                                'text-[11px] font-medium text-[var(--foreground-muted)]'
                            )}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-lg font-bold tracking-tight text-[var(--foreground)] sm:text-xl">
                    {project.title}
                    {project.subtitle && (
                        <span className="mt-0.5 block text-sm font-normal text-[var(--foreground-muted)]">
                            {tl(project.subtitle, locale)}
                        </span>
                    )}
                </h3>

                <p className="mt-2 line-clamp-2 flex-1 text-sm text-[var(--foreground-secondary)]">
                    {tl(project.description, locale)}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                    {locale === 'id' ? 'Lihat detail' : 'View details'}
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
        </div>
    );
}

export type { ShowcaseProjectsSectionProps };
