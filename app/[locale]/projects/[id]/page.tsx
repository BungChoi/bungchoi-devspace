/**
 * ===========================================
 * PROJECT DETAIL PAGE - Simple Case Study
 * ===========================================
 * A compact case-study layout focused on the most important project story.
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { locales, Locale } from '@/lib/i18n/config';
import { t, tArray } from '@/lib/utils/localization';
import type { Project } from '@/lib/types';

// ============================================
// METADATA
// ============================================

interface PageProps {
    params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    return {
        title: project.title,
        description: t(project.description, locale as Locale),
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
// PAGE
// ============================================

export default async function ProjectDetailPage({ params }: PageProps) {
    const { locale, id } = await params;
    setRequestLocale(locale);
    const loc = locale as Locale;

    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    const label = getLabels(loc);
    const overviewSummary = t(project.overview?.summary, loc) || t(project.longDescription, loc) || t(project.description, loc);
    const goalItems = tArray(project.overview?.goals, loc);
    const problemItems = [
        ...tArray(project.challenges?.painPoints, loc),
        ...tArray(project.challenges?.constraints, loc),
    ];
    const decisionItems = project.solution?.keyDecisions?.map((item) => ({
        title: t(item.decision, loc),
        description: t(item.reason, loc),
    })) ?? [];
    const featureItems = project.features?.map((feature) => ({
        title: t(feature.name, loc),
        description: t(feature.benefit, loc),
        note: feature.techNote,
    })) ?? [];
    const technicalNotes = [
        ...tArray(project.solution?.highlights, loc),
        ...tArray(project.architecture?.notes, loc),
    ];

    return (
        <main className="relative pt-28 pb-20">
            <div className="container max-w-7xl mx-auto">
                <Link
                    href="/projects"
                    className="mb-8 inline-flex text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--primary)]"
                >
                    {label.back}
                </Link>

                <ProjectHeader project={project} loc={loc} label={label} />

                <div className="mx-auto max-w-4xl">
                    <article>
                        <DocSection id="overview" number="1" title={label.overview}>
                            <DocBlock title={label.summary}>
                                <Paragraph>{overviewSummary}</Paragraph>
                            </DocBlock>

                            {goalItems.length > 0 && (
                                <DocBlock title={label.goals}>
                                    <BulletList items={goalItems} />
                                </DocBlock>
                            )}

                            {project.overview?.targetUsers && (
                                <DocBlock title={label.targetUsers}>
                                    <DefinitionList
                                        items={[
                                            {
                                                label: label.primaryUser,
                                                value: t(project.overview.targetUsers.primary, loc),
                                            },
                                            {
                                                label: label.secondaryUser,
                                                value: t(project.overview.targetUsers.secondary, loc),
                                            },
                                            {
                                                label: label.useCase,
                                                value: t(project.overview.targetUsers.useCase, loc),
                                            },
                                        ]}
                                    />
                                </DocBlock>
                            )}
                        </DocSection>

                        <DocSection id="masalah" number="2" title={label.problem}>
                            {project.overview?.context && (
                                <DocBlock title={label.context}>
                                    <Paragraph>{t(project.overview.context, loc)}</Paragraph>
                                </DocBlock>
                            )}

                            {problemItems.length > 0 ? (
                                <DocBlock title={label.problemPoints}>
                                    <BulletList items={problemItems} variant="problem" />
                                </DocBlock>
                            ) : (
                                <Paragraph>{label.noProblemNotes}</Paragraph>
                            )}
                        </DocSection>

                        <DocSection id="solution" number="3" title={label.solution}>
                            {project.solution?.approach && (
                                <DocBlock title={label.approach}>
                                    <Paragraph>{t(project.solution.approach, loc)}</Paragraph>
                                </DocBlock>
                            )}

                            {decisionItems.length > 0 && (
                                <DocBlock title={label.keyDecisions}>
                                    <DecisionList items={decisionItems} />
                                </DocBlock>
                            )}

                            {featureItems.length > 0 && (
                                <DocBlock title={label.mainFeatures}>
                                    <FeatureList features={featureItems} />
                                </DocBlock>
                            )}
                        </DocSection>

                        <DocSection id="detail-teknis" number="4" title={label.technicalDetails}>
                            {project.architecture && (
                                <DocBlock title={label.techStack}>
                                    <DefinitionList
                                        items={[
                                            {
                                                label: 'Frontend',
                                                value: project.architecture.stack.frontend || '',
                                            },
                                            {
                                                label: 'State Management',
                                                value: project.architecture.stack.stateManagement || '',
                                            },
                                            {
                                                label: 'Backend',
                                                value: project.architecture.stack.backend || '',
                                            },
                                            {
                                                label: 'Tools',
                                                value: project.architecture.stack.tools?.join(', ') || '',
                                            },
                                        ]}
                                    />
                                </DocBlock>
                            )}

                            {project.tags.length > 0 && (
                                <DocBlock title={label.technologyUsed}>
                                    <TagList tags={project.tags} />
                                </DocBlock>
                            )}

                            {technicalNotes.length > 0 && (
                                <DocBlock title={label.technicalNotes}>
                                    <BulletList items={technicalNotes} />
                                </DocBlock>
                            )}

                            <DocBlock title={label.links}>
                                <ProjectLinks project={project} loc={loc} label={label} />
                            </DocBlock>
                        </DocSection>
                    </article>
                </div>
            </div>
        </main>
    );
}

// ============================================
// COMPONENTS
// ============================================

function ProjectHeader({ project, loc, label }: { project: Project; loc: Locale; label: ReturnType<typeof getLabels> }) {
    const timeline = t(project.timeline, loc) || String(project.year);

    return (
        <header className="mb-12 border-b border-[var(--foreground)]/10 pb-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
                <div>
                    <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[var(--foreground)] sm:text-5xl">
                        {project.title}
                    </h1>

                    {project.subtitle && (
                        <p className="mt-3 text-xl font-medium text-[var(--primary)]">
                            {t(project.subtitle, loc)}
                        </p>
                    )}

                    <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--foreground-secondary)]">
                        {t(project.description, loc)}
                    </p>
                </div>

                <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-l border-[var(--primary)]/30 pl-5">
                    <MetaItem label={label.role} value={t(project.role, loc) || '-'} />
                    <MetaItem label={label.timeline} value={timeline} />
                    <MetaItem label={label.platform} value={t(project.platform, loc) || '-'} />
                    <MetaItem label={label.team} value={t(project.team, loc) || '-'} />
                </dl>
            </div>

            {project.image && (
                <figure className="mt-10">
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-[var(--foreground)]/10 bg-[var(--background-tertiary)]">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 1200px"
                            priority
                        />
                    </div>
                    <figcaption className="mt-3 text-sm text-[var(--foreground-muted)]">
                        {label.previewCaption.replace('{project}', project.title)}
                    </figcaption>
                </figure>
            )}
        </header>
    );
}

function DocSection({
    id,
    number,
    eyebrow,
    title,
    children,
}: {
    id: string;
    number?: string;
    eyebrow?: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-28 border-b border-[var(--foreground)]/10 py-10 first:pt-0">
            <SectionHeading eyebrow={eyebrow || (number ? `# ${number}` : undefined)} title={title} />
            <div className="mt-6 space-y-8">{children}</div>
        </section>
    );
}

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
    return (
        <div>
            {eyebrow && (
                <p className="font-mono text-sm font-semibold text-[var(--primary)]">
                    {eyebrow}
                </p>
            )}
            <h2 className="mt-2 text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-3xl">
                {title}
            </h2>
        </div>
    );
}

function DocBlock({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section>
            <h3 className="mb-3 text-lg font-semibold text-[var(--foreground)]">{title}</h3>
            {children}
        </section>
    );
}

function Paragraph({ children }: { children: ReactNode }) {
    return (
        <p className="max-w-3xl text-base leading-relaxed text-[var(--foreground-secondary)]">
            {children}
        </p>
    );
}

function MetaItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="text-xs uppercase text-[var(--foreground-muted)]">{label}</dt>
            <dd className="mt-1 text-sm font-medium leading-relaxed text-[var(--foreground)]">{value}</dd>
        </div>
    );
}

function BulletList({ items, variant = 'default' }: { items: string[]; variant?: 'default' | 'problem' | 'success' }) {
    const markerClass = {
        default: 'bg-[var(--foreground-muted)]',
        problem: 'bg-amber-400',
        success: 'bg-emerald-400',
    }[variant];

    return (
        <ul className="space-y-3">
            {items.map((item, index) => (
                <li key={`${item}-${index}`} className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-3 text-[var(--foreground-secondary)]">
                    <span className={cn('mt-2 h-2 w-2 rounded-full', markerClass)} />
                    <span className="leading-relaxed">{item}</span>
                </li>
            ))}
        </ul>
    );
}

function DefinitionList({ items }: { items: { label: string; value: string }[] }) {
    const visibleItems = items.filter((item) => item.value && item.value !== '-');

    if (visibleItems.length === 0) {
        return null;
    }

    return (
        <dl className="divide-y divide-[var(--foreground)]/10 border-y border-[var(--foreground)]/10">
            {visibleItems.map((item) => (
                <div key={item.label} className="grid gap-2 py-4 sm:grid-cols-[180px_minmax(0,1fr)]">
                    <dt className="text-sm font-semibold text-[var(--foreground)]">{item.label}</dt>
                    <dd className="text-sm leading-relaxed text-[var(--foreground-secondary)]">{item.value}</dd>
                </div>
            ))}
        </dl>
    );
}

function DecisionList({ items }: { items: { title: string; description: string }[] }) {
    return (
        <div className="space-y-5">
            {items.map((item, index) => (
                <section key={`${item.title}-${index}`} className="border-l border-[var(--primary)]/40 pl-4">
                    <h4 className="font-semibold text-[var(--foreground)]">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                        {item.description}
                    </p>
                </section>
            ))}
        </div>
    );
}

function FeatureList({ features }: { features: { title: string; description: string; note?: string }[] }) {
    return (
        <div className="divide-y divide-[var(--foreground)]/10 border-y border-[var(--foreground)]/10">
            {features.map((feature, index) => (
                <section key={`${feature.title}-${index}`} className="grid gap-2 py-5 md:grid-cols-[220px_minmax(0,1fr)]">
                    <div>
                        <h4 className="font-semibold text-[var(--foreground)]">{feature.title}</h4>
                        {feature.note && (
                            <p className="mt-1 text-xs font-medium text-[var(--primary)]">{feature.note}</p>
                        )}
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--foreground-secondary)]">
                        {feature.description}
                    </p>
                </section>
            ))}
        </div>
    );
}

function TagList({ tags }: { tags: string[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <span
                    key={tag}
                    className="rounded-md border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 px-3 py-2 text-sm text-[var(--foreground-secondary)]"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
}

function ProjectLinks({ project, loc, label }: { project: Project; loc: Locale; label: ReturnType<typeof getLabels> }) {
    const hasPublicLinks = Boolean(project.githubUrl || project.liveUrl || project.playStoreUrl || project.appStoreUrl);

    return (
        <div>
            {!hasPublicLinks && (
                <p className="mb-4 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                    {label.noPublicLinks}
                </p>
            )}

            <div className="flex flex-wrap gap-3">
                {project.githubUrl && (
                    <ExternalLink href={project.githubUrl} variant="secondary">
                        {label.sourceCode}
                    </ExternalLink>
                )}
                {project.liveUrl && (
                    <ExternalLink href={project.liveUrl}>
                        Live Demo
                    </ExternalLink>
                )}
                {project.playStoreUrl && (
                    <ExternalLink href={project.playStoreUrl}>
                        Play Store
                    </ExternalLink>
                )}
                {project.appStoreUrl && (
                    <ExternalLink href={project.appStoreUrl}>
                        App Store
                    </ExternalLink>
                )}
                <Link
                    href="/projects"
                    className="inline-flex items-center rounded-lg border border-[var(--foreground)]/10 px-4 py-2 text-sm font-medium text-[var(--foreground-secondary)] transition-colors hover:border-[var(--foreground)]/20 hover:text-[var(--foreground)]"
                >
                    {loc === 'id' ? 'Project lainnya' : 'Other projects'}
                </Link>
            </div>
        </div>
    );
}

function ExternalLink({
    href,
    children,
    variant = 'primary',
}: {
    href: string;
    children: ReactNode;
    variant?: 'primary' | 'secondary';
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                'inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                variant === 'primary'
                    ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]'
                    : 'border-[var(--foreground)]/10 bg-[var(--foreground)]/5 text-[var(--foreground)] hover:border-[var(--foreground)]/20'
            )}
        >
            {children}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </a>
    );
}

function getLabels(loc: Locale) {
    return {
        back: loc === 'id' ? '<- Kembali ke Proyek' : '<- Back to Projects',
        overview: loc === 'id' ? 'Ringkasan / Overview' : 'Overview',
        summary: loc === 'id' ? 'Ringkasan' : 'Summary',
        goals: loc === 'id' ? 'Tujuan' : 'Goals',
        targetUsers: loc === 'id' ? 'Sasaran Pengguna' : 'Target Users',
        primaryUser: loc === 'id' ? 'Pengguna utama' : 'Primary user',
        secondaryUser: loc === 'id' ? 'Pengguna pendukung' : 'Secondary user',
        useCase: loc === 'id' ? 'Use case' : 'Use case',
        problem: loc === 'id' ? 'Masalah' : 'Problem',
        context: loc === 'id' ? 'Konteks' : 'Context',
        problemPoints: loc === 'id' ? 'Poin Masalah' : 'Problem Points',
        noProblemNotes: loc === 'id'
            ? 'Catatan masalah khusus belum tersedia untuk project ini.'
            : 'Specific problem notes are not available for this project yet.',
        solution: loc === 'id' ? 'Solution' : 'Solution',
        approach: loc === 'id' ? 'Pendekatan' : 'Approach',
        keyDecisions: loc === 'id' ? 'Keputusan Kunci' : 'Key Decisions',
        mainFeatures: loc === 'id' ? 'Fitur Utama' : 'Main Features',
        technicalDetails: loc === 'id' ? 'Detail Teknis & Source Code' : 'Technical Details & Source Code',
        techStack: loc === 'id' ? 'Stack yang Digunakan' : 'Tech Stack',
        technologyUsed: loc === 'id' ? 'Teknologi' : 'Technologies',
        technicalNotes: loc === 'id' ? 'Catatan Teknis' : 'Technical Notes',
        links: loc === 'id' ? 'Source Code dan Link' : 'Source Code and Links',
        role: loc === 'id' ? 'Role' : 'Role',
        team: loc === 'id' ? 'Tim' : 'Team',
        platform: loc === 'id' ? 'Platform' : 'Platform',
        timeline: loc === 'id' ? 'Periode' : 'Timeline',
        noPublicLinks: loc === 'id'
            ? 'Tautan publik belum tersedia untuk project ini.'
            : 'Public links are not available for this project yet.',
        sourceCode: loc === 'id' ? 'Source Code' : 'Source Code',
        previewCaption: loc === 'id'
            ? 'Preview visual project {project}.'
            : 'Visual preview of {project}.',
    };
}
