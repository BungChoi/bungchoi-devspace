'use client';

/**
 * ===========================================
 * SHOWCASE PROJECTS SECTION — F2 work grid
 * ===========================================
 * Featured work: 2-col craft cards → dedicated /projects/[id]
 */

import Image from 'next/image';
import { useRef, type CSSProperties } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import { projects } from '@/lib/data';
import type { Project } from '@/lib/types';
import { t as tl } from '@/lib/utils/localization';
import { Locale } from '@/lib/i18n/config';
import { useInViewOnce } from '@/hooks';

interface ShowcaseProjectsSectionProps {
    className?: string;
}

export function ShowcaseProjectsSection({ className }: ShowcaseProjectsSectionProps) {
    const t = useTranslations('sections');
    const tCommon = useTranslations('common');
    const locale = useLocale() as Locale;
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useInViewOnce(sectionRef);

    const featured = projects.filter((p) => p.featured);
    const latestProjects = (featured.length >= 4 ? featured : [...projects])
        .sort((a, b) => (b.year || 0) - (a.year || 0))
        .slice(0, 4);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className={cn(
                'relative py-16 sm:py-24',
                'scroll-mt-24',
                isVisible && 'is-visible',
                className
            )}
        >
            <div className="container mx-auto max-w-6xl px-4 sm:px-5 lg:px-6">
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

                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                    {latestProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="motion-reveal"
                            style={{ '--motion-delay': `${120 + index * 90}ms` } as CSSProperties}
                        >
                            <ProjectCard project={project} locale={locale} />
                        </div>
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
        <Link
            href={`/projects/${project.id}`}
            className={cn(
                'group block overflow-hidden rounded-2xl',
                'border border-[var(--border)] bg-[var(--card)]',
                'transition-all duration-[var(--transition-slow)]',
                'hover:-translate-y-1 hover:border-[var(--border-hover)] hover:shadow-xl'
            )}
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--background-tertiary)]">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-25">
                        📱
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent opacity-80" />

                {/* Hover arrow */}
                <div
                    className={cn(
                        'absolute right-4 top-4 flex h-10 w-10 items-center justify-center',
                        'rounded-full border border-white/15 bg-[var(--background)]/70 backdrop-blur',
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
                    <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-[var(--background)]/70 px-2.5 py-1 text-xs text-[var(--foreground-secondary)] backdrop-blur">
                        {project.year}
                    </div>
                )}
            </div>

            <div className="p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className={cn(
                                'rounded-full border border-[var(--border)] px-2.5 py-0.5',
                                'text-xs text-[var(--foreground-muted)]'
                            )}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-lg font-bold tracking-tight text-[var(--foreground)] transition-colors group-hover:text-[var(--foreground)] sm:text-xl">
                    {project.title}
                    {project.subtitle && (
                        <span className="mt-0.5 block text-sm font-normal text-[var(--foreground-muted)]">
                            {tl(project.subtitle, locale)}
                        </span>
                    )}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-[var(--foreground-secondary)]">
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
        </Link>
    );
}

export type { ShowcaseProjectsSectionProps };
