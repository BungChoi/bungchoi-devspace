/**
 * ===========================================
 * PROJECT DETAIL PAGE (D2 — dedicated case study)
 * ===========================================
 * Shareable /projects/[id] — F2 minimal case study shell.
 * Deeper case-study layout continues in F4.
 */

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { projects } from '@/lib/data';
import { personalInfo } from '@/lib/data';
import { t as tl } from '@/lib/utils/localization';
import type { Locale } from '@/lib/types';

interface PageProps {
    params: Promise<{ locale: string; id: string }>;
}

export function generateStaticParams() {
    return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: PageProps) {
    const { id, locale } = await params;
    const project = projects.find((p) => p.id === id);
    if (!project) {
        return { title: 'Project' };
    }
    return {
        title: project.title,
        description: tl(project.description, locale as Locale),
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    const project = projects.find((p) => p.id === id);
    if (!project) {
        notFound();
    }

    const t = await getTranslations('common');
    const tHero = await getTranslations('hero');
    const loc = locale as Locale;
    const description = project.longDescription
        ? tl(project.longDescription, loc)
        : tl(project.description, loc);

    return (
        <main className="relative min-h-screen pb-24 pt-28 sm:pt-32">
            <div className="container mx-auto max-w-5xl px-4 sm:px-5 lg:px-6">
                {/* Top bar */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-sm text-[var(--foreground-secondary)] transition-colors hover:text-[var(--foreground)]"
                    >
                        <span aria-hidden>←</span>
                        {t('backToProjects')}
                    </Link>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--foreground-secondary)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        {tHero('available')}
                    </div>
                </div>

                <article className="overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)]">
                    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
                        <div>
                            <div className="mb-4 flex flex-wrap gap-2">
                                {project.tags.slice(0, 4).map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--foreground-muted)]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                                {project.title}
                                {project.subtitle && (
                                    <span className="mt-1 block text-base font-normal text-[var(--foreground-muted)] sm:text-lg">
                                        {tl(project.subtitle, loc)}
                                    </span>
                                )}
                            </h1>

                            <p className="mt-4 max-w-xl text-[var(--foreground-secondary)] leading-relaxed">
                                {description}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                {project.playStoreUrl && (
                                    <a
                                        href={project.playStoreUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
                                    >
                                        {t('liveDemo')}
                                        <span aria-hidden>↗</span>
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
                                    >
                                        {t('liveDemo')}
                                        <span aria-hidden>↗</span>
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--background-tertiary)]"
                                    >
                                        {t('viewSourceCode')}
                                    </a>
                                )}
                                <a
                                    href={`mailto:${personalInfo.email}?subject=Re: ${project.title}`}
                                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--background-tertiary)]"
                                >
                                    {t('hireMe')}
                                </a>
                            </div>
                        </div>

                        <aside className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--background)]/50 p-5 text-sm">
                            {project.timeline && (
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[var(--foreground-muted)]">
                                        Timeline
                                    </p>
                                    <p className="mt-1 font-medium text-[var(--foreground)]">
                                        {tl(project.timeline, loc)}
                                    </p>
                                </div>
                            )}
                            {project.year && (
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[var(--foreground-muted)]">
                                        Year
                                    </p>
                                    <p className="mt-1 font-medium text-[var(--foreground)]">{project.year}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-xs uppercase tracking-wider text-[var(--foreground-muted)]">
                                    Stack
                                </p>
                                <p className="mt-1 font-medium text-[var(--foreground)]">
                                    {project.tags.join(' · ')}
                                </p>
                            </div>
                        </aside>
                    </div>

                    {/* Media */}
                    <div className="border-t border-[var(--border)] bg-[var(--background)]/40 p-6 sm:p-8">
                        <div className="relative mx-auto aspect-video max-w-3xl overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background-tertiary)]">
                            {project.image ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 768px"
                                    priority
                                />
                            ) : null}
                        </div>

                        {project.features && project.features.length > 0 && (
                            <div className="mx-auto mt-10 max-w-3xl">
                                <h2 className="text-lg font-semibold text-[var(--foreground)]">
                                    {loc === 'id' ? 'Fitur utama' : 'Key features'}
                                </h2>
                                <ul className="mt-4 space-y-3">
                                    {project.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3"
                                        >
                                            <p className="font-medium text-[var(--foreground)]">
                                                {tl(feature.name, loc)}
                                            </p>
                                            <p className="mt-1 text-sm text-[var(--foreground-secondary)]">
                                                {tl(feature.benefit, loc)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </main>
    );
}
