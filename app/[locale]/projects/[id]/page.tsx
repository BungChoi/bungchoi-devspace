/**
 * ===========================================
 * PROJECT DETAIL PAGE — Article Style
 * ===========================================
 * Renders project detail like a clean blog article.
 * Typography-focused, minimal chrome, generous whitespace.
 */

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { projects } from '@/lib/data';
import { locales, Locale } from '@/lib/i18n/config';
import { t, tArray } from '@/lib/utils/localization';

// ============================================
// METADATA
// ============================================

interface PageProps {
    params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, id } = await params;
    const project = projects.find((p) => p.id === id);
    if (!project) return { title: 'Project Not Found' };
    return {
        title: project.title,
        description: t(project.description, locale as Locale),
    };
}

export async function generateStaticParams() {
    return locales.flatMap((locale) =>
        projects.map((project) => ({ locale, id: project.id }))
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
    if (!project) notFound();

    const label = {
        back: loc === 'id' ? '← Kembali ke Proyek' : '← Back to Projects',
        overview: loc === 'id' ? 'Ringkasan Proyek' : 'Project Overview',
        context: loc === 'id' ? 'Konteks' : 'Context',
        goals: loc === 'id' ? 'Tujuan' : 'Goals',
        challenges: loc === 'id' ? 'Tantangan' : 'Challenges',
        constraints: loc === 'id' ? 'Batasan' : 'Constraints',
        solution: loc === 'id' ? 'Solusi' : 'Solution',
        keyDecisions: loc === 'id' ? 'Keputusan Kunci' : 'Key Decisions',
        highlights: loc === 'id' ? 'Highlight Implementasi' : 'Implementation Highlights',
        contributions: loc === 'id' ? 'Kontribusi Saya' : 'My Contributions',
        features: loc === 'id' ? 'Fitur Utama' : 'Key Features',
        roleFeatures: loc === 'id' ? 'Fitur Berdasarkan Role' : 'Role-Based Features',
        userFlows: loc === 'id' ? 'Alur Pengguna' : 'User Flows',
        techArch: loc === 'id' ? 'Tech Stack & Arsitektur' : 'Tech Stack & Architecture',
        results: loc === 'id' ? 'Hasil' : 'Results',
        outcomes: loc === 'id' ? 'Capaian' : 'Outcomes',
        impact: loc === 'id' ? 'Dampak' : 'Impact',
        lessons: loc === 'id' ? 'Pelajaran yang Dipetik' : 'Lessons Learned',
        nextImprovements: loc === 'id' ? 'Pengembangan Selanjutnya' : 'Next Improvements',
        viewSource: loc === 'id' ? 'Lihat Source Code' : 'View Source Code',
        backAll: loc === 'id' ? '← Kembali ke Semua Proyek' : '← Back to All Projects',
    };

    // Dynamic section numbering — only count sections that exist
    const sectionNames = [
        project.overview ? 'overview' : null,
        project.challenges ? 'challenges' : null,
        project.solution ? 'solution' : null,
        project.contributions && project.contributions.length > 0 ? 'contributions' : null,
        project.features && project.features.length > 0 ? 'features' : null,
        project.roleBasedFeatures && Object.keys(project.roleBasedFeatures).length > 0 ? 'roleFeatures' : null,
        project.userFlows && project.userFlows.length > 0 ? 'userFlows' : null,
        project.architecture ? 'techArch' : null,
        project.results ? 'results' : null,
        project.lessonsLearned && project.lessonsLearned.length > 0 ? 'lessons' : null,
        project.nextImprovements && project.nextImprovements.length > 0 ? 'nextImprovements' : null,
    ].filter(Boolean) as string[];

    const sn = (name: string) => sectionNames.indexOf(name) + 1;

    return (
        <main className="relative pt-32 pb-20">
            <article className="container max-w-3xl mx-auto px-4">

                {/* Back link */}
                <Link
                    href="/projects"
                    className="inline-block text-sm text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors mb-10"
                >
                    {label.back}
                </Link>

                {/* ── Header ── */}
                <header className="mb-10">
                    <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] leading-tight mb-4">
                        {project.title}
                        {project.subtitle && (
                            <span className="block text-lg sm:text-xl font-medium text-[var(--primary)] mt-2">
                                {t(project.subtitle, loc)}
                            </span>
                        )}
                    </h1>

                    <p className="text-lg text-[var(--foreground-secondary)] leading-relaxed mb-6">
                        {t(project.description, loc)}
                    </p>

                    {/* Quick meta — inline, subtle */}
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--foreground-muted)]">
                        {project.role && <span>{t(project.role, loc)}</span>}
                        {project.year && <span>{project.year}</span>}
                        {project.platform && <span>{t(project.platform, loc)}</span>}
                        {project.team && <span>{t(project.team, loc)}</span>}
                    </div>
                </header>

                {/* ── Hero image ── */}
                {project.image && (
                    <div className="aspect-video rounded-2xl overflow-hidden bg-[var(--background-tertiary)] mb-14 relative border border-[var(--foreground)]/10">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 768px"
                            priority
                        />
                    </div>
                )}

                {/* ── Overview ── */}
                {project.overview && (
                    <>
                        <Heading n={sn('overview')}>{label.overview}</Heading>
                        <Prose>{t(project.overview.summary, loc)}</Prose>

                        {project.overview.context && (
                            <>
                                <SubHeading>{label.context}</SubHeading>
                                <Prose>{t(project.overview.context, loc)}</Prose>
                            </>
                        )}

                        {project.overview.goals && project.overview.goals.length > 0 && (
                            <>
                                <SubHeading>{label.goals}</SubHeading>
                                <BulletList items={tArray(project.overview.goals, loc)} />
                            </>
                        )}
                        <Divider />
                    </>
                )}

                {/* ── Challenges ── */}
                {project.challenges && (
                    <>
                        <Heading n={sn('challenges')}>{label.challenges}</Heading>

                        {project.challenges.painPoints && project.challenges.painPoints.length > 0 && (
                            <BulletList items={tArray(project.challenges.painPoints, loc)} />
                        )}

                        {project.challenges.constraints && project.challenges.constraints.length > 0 && (
                            <>
                                <SubHeading>{label.constraints}</SubHeading>
                                <BulletList items={tArray(project.challenges.constraints, loc)} />
                            </>
                        )}
                        <Divider />
                    </>
                )}

                {/* ── Solution ── */}
                {project.solution && (
                    <>
                        <Heading n={sn('solution')}>{label.solution}</Heading>

                        {project.solution.approach && (
                            <Prose>{t(project.solution.approach, loc)}</Prose>
                        )}

                        {project.solution.keyDecisions && project.solution.keyDecisions.length > 0 && (
                            <>
                                <SubHeading>{label.keyDecisions}</SubHeading>
                                <ul className="space-y-4 mb-6">
                                    {project.solution.keyDecisions.map((item, idx) => (
                                        <li key={idx}>
                                            <strong className="text-[var(--foreground)]">{t(item.decision, loc)}</strong>
                                            <br />
                                            <span className="text-[var(--foreground-secondary)]">{t(item.reason, loc)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {project.solution.highlights && project.solution.highlights.length > 0 && (
                            <>
                                <SubHeading>{label.highlights}</SubHeading>
                                <BulletList items={tArray(project.solution.highlights, loc)} />
                            </>
                        )}
                        <Divider />
                    </>
                )}

                {/* ── Contributions ── */}
                {project.contributions && project.contributions.length > 0 && (
                    <>
                        <Heading n={sn('contributions')}>{label.contributions}</Heading>
                        <BulletList items={tArray(project.contributions, loc)} />
                        <Divider />
                    </>
                )}

                {/* ── Features ── */}
                {project.features && project.features.length > 0 && (
                    <>
                        <Heading n={sn('features')}>{label.features}</Heading>
                        <ul className="space-y-4 mb-6">
                            {project.features.map((feature, idx) => (
                                <li key={idx}>
                                    <strong className="text-[var(--foreground)]">{t(feature.name, loc)}</strong>
                                    <br />
                                    <span className="text-[var(--foreground-secondary)]">{t(feature.benefit, loc)}</span>
                                    {feature.techNote && (
                                        <span className="text-[var(--foreground-muted)] text-sm italic"> — {feature.techNote}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <Divider />
                    </>
                )}

                {/* ── Role-based Features ── */}
                {project.roleBasedFeatures && Object.keys(project.roleBasedFeatures).length > 0 && (
                    <>
                        <Heading n={sn('roleFeatures')}>{label.roleFeatures}</Heading>
                        {Object.entries(project.roleBasedFeatures).map(([role, features]) => (
                            <div key={role} className="mb-6">
                                <SubHeading>{role}</SubHeading>
                                <BulletList items={tArray(features, loc)} />
                            </div>
                        ))}
                        <Divider />
                    </>
                )}

                {/* ── User Flows ── */}
                {project.userFlows && project.userFlows.length > 0 && (
                    <>
                        <Heading n={sn('userFlows')}>{label.userFlows}</Heading>
                        {project.userFlows.map((flow, idx) => (
                            <div key={idx} className="mb-8">
                                <SubHeading>{t(flow.title, loc)}</SubHeading>
                                <ol className="list-decimal list-inside space-y-2 text-[var(--foreground-secondary)] leading-relaxed">
                                    {tArray(flow.steps, loc).map((step, stepIdx) => (
                                        <li key={stepIdx}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        ))}
                        <Divider />
                    </>
                )}

                {/* ── Tech Stack & Architecture ── */}
                {project.architecture && (
                    <>
                        <Heading n={sn('techArch')}>{label.techArch}</Heading>
                        <div className="space-y-1 mb-6 text-[var(--foreground-secondary)]">
                            {project.architecture.stack.frontend && (
                                <p><strong className="text-[var(--foreground)]">Frontend:</strong> {project.architecture.stack.frontend}</p>
                            )}
                            {project.architecture.stack.stateManagement && (
                                <p><strong className="text-[var(--foreground)]">State Management:</strong> {project.architecture.stack.stateManagement}</p>
                            )}
                            {project.architecture.stack.backend && (
                                <p><strong className="text-[var(--foreground)]">Backend:</strong> {project.architecture.stack.backend}</p>
                            )}
                            {project.architecture.stack.tools && project.architecture.stack.tools.length > 0 && (
                                <p><strong className="text-[var(--foreground)]">Tools:</strong> {project.architecture.stack.tools.join(', ')}</p>
                            )}
                        </div>

                        {project.architecture.notes && project.architecture.notes.length > 0 && (
                            <BulletList items={tArray(project.architecture.notes, loc)} />
                        )}
                        <Divider />
                    </>
                )}

                {/* ── Results ── */}
                {project.results && (
                    <>
                        <Heading n={sn('results')}>{label.results}</Heading>

                        {project.results.outcomes && project.results.outcomes.length > 0 && (
                            <>
                                <SubHeading>{label.outcomes}</SubHeading>
                                <BulletList items={tArray(project.results.outcomes, loc)} />
                            </>
                        )}

                        {project.results.impact && project.results.impact.length > 0 && (
                            <>
                                <SubHeading>{label.impact}</SubHeading>
                                <BulletList items={tArray(project.results.impact, loc)} />
                            </>
                        )}
                        <Divider />
                    </>
                )}

                {/* ── Lessons Learned ── */}
                {project.lessonsLearned && project.lessonsLearned.length > 0 && (
                    <>
                        <Heading n={sn('lessons')}>{label.lessons}</Heading>
                        <BulletList items={tArray(project.lessonsLearned, loc)} />
                        <Divider />
                    </>
                )}

                {/* ── Next Improvements ── */}
                {project.nextImprovements && project.nextImprovements.length > 0 && (
                    <>
                        <Heading n={sn('nextImprovements')}>{label.nextImprovements}</Heading>
                        <BulletList items={tArray(project.nextImprovements, loc)} />
                        <Divider />
                    </>
                )}

                {/* ── Tags ── */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-sm px-3 py-1 rounded-full bg-[var(--foreground)]/5 text-[var(--foreground-muted)] border border-[var(--foreground)]/10"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* ── Links ── */}
                {(project.githubUrl || project.liveUrl || project.playStoreUrl) && (
                    <div className="flex flex-wrap gap-4 mb-14">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-[var(--primary)] hover:underline"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                {label.viewSource}
                            </a>
                        )}
                        {(project.liveUrl || project.playStoreUrl) && (
                            <a
                                href={project.liveUrl || project.playStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-[var(--primary)] hover:underline"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                {project.playStoreUrl ? 'Play Store' : 'Live Demo'}
                            </a>
                        )}
                    </div>
                )}

                {/* ── Footer back link ── */}
                <div className="pt-8 border-t border-[var(--foreground)]/10">
                    <Link
                        href="/projects"
                        className="text-sm text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors"
                    >
                        {label.backAll}
                    </Link>
                </div>
            </article>
        </main>
    );
}

// ============================================
// PRIMITIVES — tiny, article-style building blocks
// ============================================

function Heading({ n, children }: { n?: number; children: React.ReactNode }) {
    return (
        <h2 className="text-2xl font-bold text-[var(--foreground)] mt-2 mb-4">
            {n != null && <span className="text-[var(--foreground-muted)] mr-1">{n}.</span>}
            {children}
        </h2>
    );
}

function SubHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-lg font-semibold text-[var(--foreground)] mt-4 mb-2">
            {children}
        </h3>
    );
}

function Prose({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">
            {children}
        </p>
    );
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="list-disc list-inside space-y-2 text-[var(--foreground-secondary)] leading-relaxed mb-6">
            {items.map((item, idx) => (
                <li key={idx}>{item}</li>
            ))}
        </ul>
    );
}

function Divider() {
    return <hr className="border-[var(--foreground)]/10 my-10" />;
}
