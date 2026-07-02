'use client';

/**
 * ===========================================
 * SHOWCASE PROJECTS SECTION
 * ===========================================
 * Displays 6 latest projects in a grid layout
 * with a "See All" button linking to /projects page.
 * Data imported from lib/data/projects.ts
 */

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import { projects } from '@/lib/data';
import type { Project } from '@/lib/types';
import { t as tl } from '@/lib/utils/localization';
import { Locale } from '@/lib/i18n/config';
import { ProjectModal } from '@/components/ui';

// ============================================
// TYPES
// ============================================

interface ShowcaseProjectsSectionProps {
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export function ShowcaseProjectsSection({ className }: ShowcaseProjectsSectionProps) {
    const t = useTranslations('sections');
    const tCommon = useTranslations('common');
    const locale = useLocale() as Locale;
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Get 6 latest projects sorted by year (descending)
    const latestProjects = [...projects]
        .sort((a, b) => (b.year || 0) - (a.year || 0))
        .slice(0, 6);

    useEffect(() => {
        const element = sectionRef.current;

        if (!element) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const timeout = window.setTimeout(() => setIsVisible(true), 0);

            return () => window.clearTimeout(timeout);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '0px 0px -16% 0px', threshold: 0.18 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className={cn(
                'project-showcase-section relative py-20 sm:py-28',
                'scroll-mt-24',
                isVisible && 'is-visible',
                className
            )}
        >
            <div className="container max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
                {/* Section Header */}
                <div className="project-reveal text-center mb-16" style={{ '--project-delay': '60ms' } as CSSProperties}>
                    <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                        {t('myWork')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                        {t('featuredProjects').split(' ')[0]} <span className="text-gradient">{t('featuredProjects').split(' ').slice(1).join(' ') || 'Projects'}</span>
                    </h2>
                    <p className="mt-4 text-[var(--foreground-secondary)] max-w-2xl mx-auto">
                        {t('featuredProjectsDesc')}
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 mb-12">
                    {latestProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-reveal"
                            style={{ '--project-delay': `${180 + index * 140}ms` } as CSSProperties}
                        >
                            <ProjectCard 
                                project={project} 
                                locale={locale} 
                                onClick={() => setSelectedProject(project)}
                            />
                        </div>
                    ))}
                </div>

                {/* Project Detail Modal */}
                <ProjectModal
                    project={selectedProject}
                    isOpen={selectedProject !== null}
                    onClose={() => setSelectedProject(null)}
                    locale={locale}
                />

                {/* See All Button */}
                <div className="project-reveal text-center" style={{ '--project-delay': `${260 + latestProjects.length * 140}ms` } as CSSProperties}>
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
                        {tCommon('viewAllProjects')}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .project-reveal {
                    opacity: 0;
                    transform: translateY(18px) scale(0.985);
                    filter: blur(6px);
                    transition:
                        opacity 820ms cubic-bezier(0.16, 1, 0.3, 1),
                        transform 820ms cubic-bezier(0.16, 1, 0.3, 1),
                        filter 820ms cubic-bezier(0.16, 1, 0.3, 1);
                    transition-delay: var(--project-delay, 0ms);
                    will-change: opacity, transform, filter;
                }

                .is-visible .project-reveal {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    filter: blur(0);
                }

                @media (prefers-reduced-motion: reduce) {
                    .project-reveal {
                        opacity: 1;
                        transform: none;
                        filter: none;
                        transition: none;
                    }
                }
            `}</style>
        </section>
    );
}

// ============================================
// PROJECT CARD
// ============================================

interface ProjectCardProps {
    project: Project;
    locale: Locale;
    onClick: () => void;
}

function ProjectCard({ project, locale, onClick }: ProjectCardProps) {
    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            className={cn(
                'group block cursor-pointer',
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
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                        📱
                    </div>
                )}
                {/* Year badge */}
                {project.year && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[var(--background)]/80 backdrop-blur text-xs text-[var(--foreground-muted)]">
                        {project.year}
                    </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-60" />
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
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
                    {tl(project.description, locale)}
                </p>

                {/* View Project Link */}
                <div className="mt-4 flex items-center gap-2 text-sm text-[var(--primary)] font-medium">
                    {locale === 'id' ? 'Lihat Detail' : 'View Details'}
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
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { ShowcaseProjectsSectionProps };
