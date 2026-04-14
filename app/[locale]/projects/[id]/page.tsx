/**
 * ===========================================
 * PROJECT DETAIL PAGE - Documentation Style
 * ===========================================
 * Case-study layout inspired by technical documentation.
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
    const quickSummary = t(project.overview?.summary, loc) || t(project.longDescription, loc) || t(project.description, loc);
    const solutionBullets = getSolutionBullets(project, loc);
    const sectionNumbers = getSectionNumbers(project);
    const hasLinks = Boolean(project.githubUrl || project.liveUrl || project.playStoreUrl || project.appStoreUrl);
    const technicalNotes = [
        ...tArray(project.architecture?.notes, loc),
        ...tArray(project.challenges?.constraints, loc),
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
                        <DocCallout id="ringkasnya" title={label.summary}>
                            <p className="text-base leading-relaxed text-[var(--foreground-secondary)]">
                                {quickSummary}
                            </p>

                            {solutionBullets.length > 0 && (
                                <div className="mt-6">
                                    <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">
                                        {label.solutionUsed}
                                    </p>
                                    <OrderedList items={solutionBullets} />
                                </div>
                            )}
                        </DocCallout>

                        {(project.overview || project.challenges) && (
                            <DocSection id="konteks-dan-masalah" number={sectionNumbers.contextProblem} title={label.contextProblem}>
                                {project.overview?.context && (
                                    <DocBlock title={label.initialCondition}>
                                        <Paragraph>{t(project.overview.context, loc)}</Paragraph>
                                    </DocBlock>
                                )}

                                {project.challenges?.painPoints && project.challenges.painPoints.length > 0 && (
                                    <DocBlock title={label.foundProblems}>
                                        <BulletList items={tArray(project.challenges.painPoints, loc)} variant="problem" />
                                    </DocBlock>
                                )}

                                {project.results?.impact && project.results.impact.length > 0 && (
                                    <DocBlock title={label.impact}>
                                        <BulletList items={tArray(project.results.impact, loc)} />
                                    </DocBlock>
                                )}
                            </DocSection>
                        )}

                        {project.overview?.goals && project.overview.goals.length > 0 && (
                            <DocSection id="target-project" number={sectionNumbers.projectTarget} title={label.projectTarget}>
                                <Paragraph>{label.targetIntro}</Paragraph>
                                <BulletList items={tArray(project.overview.goals, loc)} />

                                {project.overview.targetUsers && (
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
                        )}

                        {(project.role || project.contributions) && (
                            <DocSection id="role-dan-scope" number={sectionNumbers.roleScope} title={label.roleScope}>
                                <DefinitionList
                                    items={[
                                        {
                                            label: label.role,
                                            value: t(project.role, loc) || '-',
                                        },
                                        {
                                            label: label.team,
                                            value: t(project.team, loc) || '-',
                                        },
                                        {
                                            label: label.platform,
                                            value: t(project.platform, loc) || '-',
                                        },
                                        {
                                            label: label.status,
                                            value: t(project.status, loc) || '-',
                                        },
                                    ]}
                                />

                                {project.contributions && project.contributions.length > 0 && (
                                    <DocBlock title={label.scopeWork}>
                                        <BulletList items={tArray(project.contributions, loc)} />
                                    </DocBlock>
                                )}
                            </DocSection>
                        )}

                        {(project.solution || project.features || project.roleBasedFeatures || project.userFlows) && (
                            <DocSection id="desain-solusi" number={sectionNumbers.solutionDesign} title={label.solutionDesign}>
                                {project.solution?.approach && (
                                    <DocBlock title={label.approach}>
                                        <Paragraph>{t(project.solution.approach, loc)}</Paragraph>
                                    </DocBlock>
                                )}

                                {project.solution?.keyDecisions && project.solution.keyDecisions.length > 0 && (
                                    <DocBlock title={label.keyDecisions}>
                                        <DecisionList
                                            items={project.solution.keyDecisions.map((item) => ({
                                                title: t(item.decision, loc),
                                                description: t(item.reason, loc),
                                            }))}
                                        />
                                    </DocBlock>
                                )}

                                {project.userFlows && project.userFlows.length > 0 && (
                                    <DocBlock title={label.userFlow}>
                                        <FlowList
                                            flows={project.userFlows.map((flow) => ({
                                                title: t(flow.title, loc),
                                                steps: tArray(flow.steps, loc),
                                            }))}
                                        />
                                    </DocBlock>
                                )}

                                {project.roleBasedFeatures && Object.keys(project.roleBasedFeatures).length > 0 && (
                                    <DocBlock title={label.roleFeatures}>
                                        <RoleFeatureGrid roleBasedFeatures={project.roleBasedFeatures} loc={loc} />
                                    </DocBlock>
                                )}

                                {project.features && project.features.length > 0 && (
                                    <DocBlock title={label.mainFeatures}>
                                        <FeatureList
                                            features={project.features.map((feature) => ({
                                                title: t(feature.name, loc),
                                                description: t(feature.benefit, loc),
                                                note: feature.techNote,
                                            }))}
                                        />
                                    </DocBlock>
                                )}
                            </DocSection>
                        )}

                        {(project.architecture || project.tags.length > 0 || technicalNotes.length > 0) && (
                            <DocSection id="arsitektur-implementasi" number={sectionNumbers.architectureImplementation} title={label.architectureImplementation}>
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

                                {project.solution?.highlights && project.solution.highlights.length > 0 && (
                                    <DocBlock title={label.implementationHighlights}>
                                        <BulletList items={tArray(project.solution.highlights, loc)} />
                                    </DocBlock>
                                )}

                                {project.tags.length > 0 && (
                                    <DocBlock title={label.technologyUsed}>
                                        <TagList tags={project.tags} />
                                    </DocBlock>
                                )}
                            </DocSection>
                        )}

                        {technicalNotes.length > 0 && (
                            <DocSection id="trade-off-catatan-teknis" number={sectionNumbers.tradeOffNotes} title={label.tradeOffNotes}>
                                <Paragraph>{label.tradeOffIntro}</Paragraph>
                                <BulletList items={technicalNotes} />
                            </DocSection>
                        )}

                        {(project.results || project.lessonsLearned || project.nextImprovements) && (
                            <DocSection id="hasil-evaluasi" number={sectionNumbers.resultsEvaluation} title={label.resultsEvaluation}>
                                {project.results?.outcomes && project.results.outcomes.length > 0 && (
                                    <DocBlock title={label.outcomes}>
                                        <BulletList items={tArray(project.results.outcomes, loc)} variant="success" />
                                    </DocBlock>
                                )}

                                {project.lessonsLearned && project.lessonsLearned.length > 0 && (
                                    <DocBlock title={label.lessons}>
                                        <BulletList items={tArray(project.lessonsLearned, loc)} />
                                    </DocBlock>
                                )}

                                {project.nextImprovements && project.nextImprovements.length > 0 && (
                                    <DocBlock title={label.nextImprovements}>
                                        <BulletList items={tArray(project.nextImprovements, loc)} />
                                    </DocBlock>
                                )}
                            </DocSection>
                        )}

                        <DocSection id="lampiran" eyebrow={label.appendixEyebrow} title={label.appendix}>
                            {hasLinks ? (
                                <ProjectLinks project={project} loc={loc} label={label} />
                            ) : (
                                <Paragraph>{label.noPublicLinks}</Paragraph>
                            )}
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

function DocCallout({ id, eyebrow, title, children }: { id: string; eyebrow?: string; title: string; children: ReactNode }) {
    return (
        <section
            id={id}
            className="scroll-mt-28 rounded-lg border border-[var(--primary)]/20 bg-[var(--primary)]/5 p-5 sm:p-6"
        >
            <SectionHeading eyebrow={eyebrow} title={title} />
            <div className="mt-5">{children}</div>
        </section>
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

function OrderedList({ items }: { items: string[] }) {
    return (
        <ol className="space-y-3">
            {items.map((item, index) => (
                <li key={`${item}-${index}`} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--primary)] text-sm font-bold text-[var(--primary-foreground)]">
                        {index + 1}
                    </span>
                    <span className="leading-relaxed text-[var(--foreground-secondary)]">{item}</span>
                </li>
            ))}
        </ol>
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

function FlowList({ flows }: { flows: { title: string; steps: string[] }[] }) {
    return (
        <div className="space-y-7">
            {flows.map((flow, flowIndex) => (
                <section key={`${flow.title}-${flowIndex}`}>
                    <h4 className="mb-4 font-semibold text-[var(--foreground)]">{flow.title}</h4>
                    <ol className="space-y-3 border-l border-[var(--primary)]/30 pl-5">
                        {flow.steps.map((step, stepIndex) => (
                            <li key={`${step}-${stepIndex}`} className="relative text-sm leading-relaxed text-[var(--foreground-secondary)]">
                                <span className="absolute -left-[2.05rem] flex h-6 w-6 items-center justify-center rounded-md border border-[var(--primary)]/30 bg-[var(--background)] font-mono text-xs text-[var(--primary)]">
                                    {stepIndex + 1}
                                </span>
                                {step}
                            </li>
                        ))}
                    </ol>
                </section>
            ))}
        </div>
    );
}

function RoleFeatureGrid({ roleBasedFeatures, loc }: { roleBasedFeatures: NonNullable<Project['roleBasedFeatures']>; loc: Locale }) {
    return (
        <div className="grid gap-5 md:grid-cols-2">
            {Object.entries(roleBasedFeatures).map(([role, features]) => (
                <section key={role} className="border-l border-[var(--primary)]/30 pl-4">
                    <h4 className="font-semibold text-[var(--foreground)]">{role}</h4>
                    <ul className="mt-3 space-y-2">
                        {tArray(features, loc).map((feature, index) => (
                            <li key={`${feature}-${index}`} className="text-sm leading-relaxed text-[var(--foreground-secondary)]">
                                {feature}
                            </li>
                        ))}
                    </ul>
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
    return (
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

// ============================================
// HELPERS
// ============================================

function getSolutionBullets(project: Project, loc: Locale) {
    if (project.solution?.keyDecisions && project.solution.keyDecisions.length > 0) {
        return project.solution.keyDecisions.slice(0, 4).map((item) => t(item.decision, loc));
    }

    if (project.features && project.features.length > 0) {
        return project.features.slice(0, 4).map((feature) => t(feature.name, loc));
    }

    return tArray(project.overview?.goals, loc).slice(0, 4);
}

function getSectionNumbers(project: Project) {
    const technicalNotes = Boolean(project.architecture?.notes?.length || project.challenges?.constraints?.length);
    const sections = [
        { key: 'contextProblem', show: Boolean(project.overview || project.challenges) },
        { key: 'projectTarget', show: Boolean(project.overview?.goals?.length) },
        { key: 'roleScope', show: Boolean(project.role || project.contributions?.length) },
        { key: 'solutionDesign', show: Boolean(project.solution || project.features?.length || project.roleBasedFeatures || project.userFlows?.length) },
        { key: 'architectureImplementation', show: Boolean(project.architecture || project.tags.length > 0 || technicalNotes) },
        { key: 'tradeOffNotes', show: technicalNotes },
        { key: 'resultsEvaluation', show: Boolean(project.results || project.lessonsLearned?.length || project.nextImprovements?.length) },
    ];

    return sections.reduce<Record<string, string | undefined>>((acc, section) => {
        if (section.show) {
            acc[section.key] = String(Object.values(acc).filter(Boolean).length + 1);
        }

        return acc;
    }, {});
}

function getLabels(loc: Locale) {
    return {
        back: loc === 'id' ? '<- Kembali ke Proyek' : '<- Back to Projects',
        summary: loc === 'id' ? 'Ringkasnya' : 'In Short',
        solutionUsed: loc === 'id' ? 'Solusi yang digunakan:' : 'Solution used:',
        contextProblem: loc === 'id' ? 'Konteks dan Masalah' : 'Context and Problem',
        initialCondition: loc === 'id' ? 'Kondisi Awal' : 'Initial Condition',
        foundProblems: loc === 'id' ? 'Masalah yang Ditemukan' : 'Problems Found',
        impact: loc === 'id' ? 'Dampak' : 'Impact',
        projectTarget: loc === 'id' ? 'Target Project' : 'Project Target',
        targetIntro: loc === 'id'
            ? 'Project ini diarahkan untuk menyelesaikan kebutuhan berikut:'
            : 'This project was directed to solve the following needs:',
        targetUsers: loc === 'id' ? 'Sasaran Pengguna' : 'Target Users',
        primaryUser: loc === 'id' ? 'Pengguna utama' : 'Primary user',
        secondaryUser: loc === 'id' ? 'Pengguna pendukung' : 'Secondary user',
        useCase: loc === 'id' ? 'Use case' : 'Use case',
        roleScope: loc === 'id' ? 'Role dan Scope Saya' : 'My Role and Scope',
        role: loc === 'id' ? 'Role' : 'Role',
        team: loc === 'id' ? 'Tim' : 'Team',
        platform: loc === 'id' ? 'Platform' : 'Platform',
        status: loc === 'id' ? 'Status' : 'Status',
        timeline: loc === 'id' ? 'Periode' : 'Timeline',
        scopeWork: loc === 'id' ? 'Scope Pekerjaan' : 'Work Scope',
        solutionDesign: loc === 'id' ? 'Desain Solusi' : 'Solution Design',
        approach: loc === 'id' ? 'Pendekatan' : 'Approach',
        keyDecisions: loc === 'id' ? 'Keputusan Kunci' : 'Key Decisions',
        userFlow: loc === 'id' ? 'Alur Pengguna' : 'User Flow',
        roleFeatures: loc === 'id' ? 'Fitur Berdasarkan Role' : 'Role-Based Features',
        mainFeatures: loc === 'id' ? 'Fitur Utama dan Alasan' : 'Main Features and Rationale',
        architectureImplementation: loc === 'id' ? 'Arsitektur dan Implementasi Teknis' : 'Architecture and Technical Implementation',
        techStack: loc === 'id' ? 'Tech Stack' : 'Tech Stack',
        implementationHighlights: loc === 'id' ? 'Highlight Implementasi' : 'Implementation Highlights',
        technologyUsed: loc === 'id' ? 'Teknologi yang Digunakan' : 'Technologies Used',
        tradeOffNotes: loc === 'id' ? 'Trade-off dan Catatan Teknis' : 'Trade-offs and Technical Notes',
        tradeOffIntro: loc === 'id'
            ? 'Beberapa catatan berikut membantu menjelaskan batasan, keputusan teknis, dan area yang perlu diperhatikan jika project dikembangkan lebih lanjut.'
            : 'The following notes explain constraints, technical decisions, and areas to consider if the project is developed further.',
        resultsEvaluation: loc === 'id' ? 'Hasil dan Evaluasi' : 'Results and Evaluation',
        outcomes: loc === 'id' ? 'Hasil Project' : 'Project Outcomes',
        lessons: loc === 'id' ? 'Pembelajaran' : 'Lessons Learned',
        nextImprovements: loc === 'id' ? 'Pengembangan Selanjutnya' : 'Next Improvements',
        appendixEyebrow: loc === 'id' ? 'Lampiran' : 'Appendix',
        appendix: loc === 'id' ? 'Lampiran' : 'Appendix',
        noPublicLinks: loc === 'id'
            ? 'Tautan publik belum tersedia untuk project ini.'
            : 'Public links are not available for this project yet.',
        sourceCode: loc === 'id' ? 'Source Code' : 'Source Code',
        previewCaption: loc === 'id'
            ? 'Preview visual project {project}.'
            : 'Visual preview of {project}.',
    };
}
