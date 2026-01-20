/**
 * ===========================================
 * PROJECT DETAIL PAGE
 * ===========================================
 * Dynamic page showing full project details.
 */

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { locales } from '@/lib/i18n/config';

// ============================================
// METADATA
// ============================================

interface PageProps {
    params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    return {
        title: project.title,
        description: project.description,
    };
}

export async function generateStaticParams() {
    return locales.flatMap((locale) =>
        projects.map((project) => ({
            locale,
            id: project.id,
        }))
    );
}

// ============================================
// PAGE COMPONENT
// ============================================

export default async function ProjectDetailPage({ params }: PageProps) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <main className="relative pt-32 pb-20">
            <div className="container max-w-4xl mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] mb-8">
                    <Link href="/" className="hover:text-[var(--primary)] transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/projects" className="hover:text-[var(--primary)] transition-colors">
                        Projects
                    </Link>
                    <span>/</span>
                    <span className="text-[var(--foreground)]">{project.title}</span>
                </nav>

                {/* Header */}
                <header className="mb-12">
                    {/* Featured Badge */}
                    {project.featured && (
                        <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary)] text-white text-xs font-bold mb-4">
                            Featured Project
                        </span>
                    )}

                    <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-4">
                        {project.title}
                    </h1>

                    <p className="text-lg text-[var(--foreground-secondary)] mb-6">
                        {project.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        {project.year && (
                            <span className="px-3 py-1 rounded-full bg-[var(--foreground)]/5 text-[var(--foreground-muted)]">
                                📅 {project.year}
                            </span>
                        )}
                    </div>
                </header>

                {/* Project Image */}
                <div className="aspect-video rounded-2xl overflow-hidden bg-[var(--background-tertiary)] mb-12 relative border border-[var(--primary)]/20">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 896px"
                            priority
                        />
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20">
                                📱
                            </div>
                        </>
                    )}
                </div>

                {/* Long Description */}
                {project.longDescription && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                            About This Project
                        </h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-[var(--foreground-secondary)] leading-relaxed whitespace-pre-line">
                                {project.longDescription}
                            </p>
                        </div>
                    </section>
                )}

                {/* Tech Stack */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                        Tech Stack
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className={cn(
                                    'px-4 py-2 rounded-full text-sm font-medium',
                                    'bg-[var(--primary)]/10 text-[var(--primary)]',
                                    'border border-[var(--primary)]/20'
                                )}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Action Buttons */}
                <section className="flex flex-wrap gap-4">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                'inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium',
                                'bg-[var(--foreground)]/10 text-[var(--foreground)]',
                                'hover:bg-[var(--foreground)]/20 transition-colors'
                            )}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            View Source Code
                        </a>
                    )}
                    {(project.liveUrl || project.playStoreUrl) && (
                        <a
                            href={project.liveUrl || project.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                'inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium',
                                'bg-[var(--primary)] text-white',
                                'hover:bg-[var(--primary)]/90 transition-colors',
                                'shadow-lg shadow-[var(--primary)]/25'
                            )}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            {project.playStoreUrl ? 'View on Play Store' : 'Live Demo'}
                        </a>
                    )}
                </section>

                {/* Back Link */}
                <div className="mt-16 pt-8 border-t border-[var(--foreground)]/10">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to All Projects
                    </Link>
                </div>
            </div>
        </main>
    );
}
