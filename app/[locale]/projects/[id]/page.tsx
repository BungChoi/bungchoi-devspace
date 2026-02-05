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
// PAGE COMPONENT
// ============================================

export default async function ProjectDetailPage({ params }: PageProps) {
    const { locale, id } = await params;
    setRequestLocale(locale);
    const loc = locale as Locale;

    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <main className="relative pt-32 pb-20">
            <div className="container max-w-4xl mx-auto px-4">
                {/* Back Link */}
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors mb-8"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {loc === 'id' ? 'Kembali ke Proyek' : 'Back to Projects'}
                </Link>

                {/* Header */}
                <header className="mb-12">
                    {/* Category & Year Inline */}
                    <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                        <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-medium border border-[var(--primary)]/20">
                            {t(project.platform, loc) || 'Mobile App'}
                        </span>
                        {project.year && (
                            <>
                                <span className="text-[var(--foreground-muted)]">·</span>
                                <span className="text-[var(--foreground-muted)]">{project.year}</span>
                            </>
                        )}
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-2">
                        {project.title}
                    </h1>

                    {project.subtitle && (
                        <p className="text-xl text-[var(--primary)] font-medium mb-4">
                            {t(project.subtitle, loc)}
                        </p>
                    )}

                    <p className="text-lg text-[var(--foreground-secondary)] mb-6">
                        {t(project.description, loc)}
                    </p>

                    {/* Quick Info - Improved with Icons */}
                    <div className="flex flex-wrap gap-4">
                        {project.role && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--background-tertiary)] border border-[var(--foreground)]/10">
                                <svg className="w-4 h-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-sm text-[var(--foreground)]">{t(project.role, loc)}</span>
                            </div>
                        )}
                        {project.team && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--background-tertiary)] border border-[var(--foreground)]/10">
                                <svg className="w-4 h-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="text-sm text-[var(--foreground)]">{t(project.team, loc)}</span>
                            </div>
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

                {/* 1. Overview Section */}
                {project.overview && (
                    <section className="mb-12">
                        <SectionTitle number={1}>{loc === 'id' ? 'Ringkasan' : 'Overview'}</SectionTitle>
                        <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">
                            {t(project.overview.summary, loc)}
                        </p>

                        {project.overview.context && (
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-2">
                                    {loc === 'id' ? 'Konteks' : 'Context'}
                                </h4>
                                <p className="text-[var(--foreground-secondary)]">{t(project.overview.context, loc)}</p>
                            </div>
                        )}

                        {project.overview.goals && project.overview.goals.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-2">
                                    {loc === 'id' ? 'Tujuan' : 'Goals'}
                                </h4>
                                <ul className="space-y-2">
                                    {tArray(project.overview.goals, loc).map((goal, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                                            <span className="text-[var(--primary)] mt-1">✓</span>
                                            {goal}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                )}

                {/* 2. Challenges Section */}
                {project.challenges && (
                    <section className="mb-12">
                        <SectionTitle number={2}>{loc === 'id' ? 'Tantangan' : 'Challenges'}</SectionTitle>

                        {project.challenges.painPoints && project.challenges.painPoints.length > 0 && (
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-3">
                                    {loc === 'id' ? 'Pain Points' : 'Pain Points'}
                                </h4>
                                <div className="space-y-3">
                                    {tArray(project.challenges.painPoints, loc).map((point, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)]/50 border border-[var(--foreground)]/5">
                                            <span className="text-amber-500">⚠</span>
                                            <span className="text-[var(--foreground-secondary)]">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.challenges.constraints && project.challenges.constraints.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-3">
                                    {loc === 'id' ? 'Batasan' : 'Constraints'}
                                </h4>
                                <ul className="space-y-2">
                                    {tArray(project.challenges.constraints, loc).map((constraint, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                                            <span className="text-[var(--foreground-muted)]">•</span>
                                            {constraint}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                )}

                {/* 3. Solution Section */}
                {project.solution && (
                    <section className="mb-12">
                        <SectionTitle number={3}>{loc === 'id' ? 'Solusi' : 'Solution'}</SectionTitle>

                        {project.solution.approach && (
                            <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">
                                {t(project.solution.approach, loc)}
                            </p>
                        )}

                        {project.solution.keyDecisions && project.solution.keyDecisions.length > 0 && (
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-3">
                                    {loc === 'id' ? 'Keputusan Kunci' : 'Key Decisions'}
                                </h4>
                                <div className="space-y-3">
                                    {project.solution.keyDecisions.map((item, idx) => (
                                        <div key={idx} className="p-4 rounded-lg bg-[var(--primary)]/5 border border-[var(--primary)]/10">
                                            <div className="font-medium text-[var(--foreground)] mb-1">{t(item.decision, loc)}</div>
                                            <div className="text-sm text-[var(--foreground-secondary)]">{t(item.reason, loc)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.solution.highlights && project.solution.highlights.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-3">
                                    {loc === 'id' ? 'Highlight Implementasi' : 'Implementation Highlights'}
                                </h4>
                                <ul className="space-y-2">
                                    {tArray(project.solution.highlights, loc).map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                                            <span className="text-[var(--primary)]">→</span>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                )}

                {/* 4. My Contributions Section */}
                {project.contributions && project.contributions.length > 0 && (
                    <section className="mb-12">
                        <SectionTitle number={4}>{loc === 'id' ? 'Kontribusi Saya' : 'My Contributions'}</SectionTitle>
                        <ul className="space-y-3">
                            {tArray(project.contributions, loc).map((contribution, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-[var(--foreground-secondary)]">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-xs font-bold">
                                        {idx + 1}
                                    </span>
                                    {contribution}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* 5. Features Section */}
                {project.features && project.features.length > 0 && (
                    <section className="mb-12">
                        <SectionTitle number={5}>{loc === 'id' ? 'Fitur Utama' : 'Key Features'}</SectionTitle>
                        <div className="grid gap-4">
                            {project.features.map((feature, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-[var(--background)]/50 border border-[var(--foreground)]/5">
                                    <h4 className="font-semibold text-[var(--foreground)] mb-2">{t(feature.name, loc)}</h4>
                                    <p className="text-sm text-[var(--foreground-secondary)] mb-2">{t(feature.benefit, loc)}</p>
                                    {feature.techNote && (
                                        <span className="inline-block text-xs px-2 py-1 rounded bg-[var(--primary)]/10 text-[var(--primary)]">
                                            {feature.techNote}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 6. Role-based Features */}
                {project.roleBasedFeatures && Object.keys(project.roleBasedFeatures).length > 0 && (
                    <section className="mb-12">
                        <SectionTitle number={6}>{loc === 'id' ? 'Fitur Berdasarkan Role' : 'Role-Based Features'}</SectionTitle>
                        <div className="grid md:grid-cols-2 gap-6">
                            {Object.entries(project.roleBasedFeatures).map(([role, features]) => (
                                <div key={role} className="p-4 rounded-xl bg-[var(--background)]/50 border border-[var(--foreground)]/5">
                                    <h4 className="font-semibold text-[var(--primary)] mb-3">{role}</h4>
                                    <ul className="space-y-2">
                                        {tArray(features, loc).map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-[var(--foreground-secondary)]">
                                                <span className="text-[var(--primary)]">•</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 7. User Flows Section */}
                {project.userFlows && project.userFlows.length > 0 && (
                    <section className="mb-12">
                        <SectionTitle number={7}>{loc === 'id' ? 'Alur Pengguna' : 'User Flows'}</SectionTitle>
                        <div className="space-y-6">
                            {project.userFlows.map((flow, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-[var(--background)]/50 border border-[var(--foreground)]/5">
                                    <h4 className="font-semibold text-[var(--foreground)] mb-4">{t(flow.title, loc)}</h4>
                                    <div className="space-y-3">
                                        {tArray(flow.steps, loc).map((step, stepIdx) => (
                                            <div key={stepIdx} className="flex items-start gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold">
                                                    {stepIdx + 1}
                                                </span>
                                                <span className="text-[var(--foreground-secondary)] pt-0.5">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 8. Tech Stack & Architecture */}
                {project.architecture && (
                    <section className="mb-12">
                        <SectionTitle number={8}>{loc === 'id' ? 'Tech Stack & Arsitektur' : 'Tech Stack & Architecture'}</SectionTitle>

                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            {project.architecture.stack.frontend && (
                                <div className="p-3 rounded-lg bg-[var(--background)]/50 border border-[var(--foreground)]/5">
                                    <span className="text-xs text-[var(--foreground-muted)] uppercase">Frontend</span>
                                    <p className="font-medium text-[var(--foreground)]">{project.architecture.stack.frontend}</p>
                                </div>
                            )}
                            {project.architecture.stack.stateManagement && (
                                <div className="p-3 rounded-lg bg-[var(--background)]/50 border border-[var(--foreground)]/5">
                                    <span className="text-xs text-[var(--foreground-muted)] uppercase">State Management</span>
                                    <p className="font-medium text-[var(--foreground)]">{project.architecture.stack.stateManagement}</p>
                                </div>
                            )}
                            {project.architecture.stack.backend && (
                                <div className="p-3 rounded-lg bg-[var(--background)]/50 border border-[var(--foreground)]/5">
                                    <span className="text-xs text-[var(--foreground-muted)] uppercase">Backend</span>
                                    <p className="font-medium text-[var(--foreground)]">{project.architecture.stack.backend}</p>
                                </div>
                            )}
                            {project.architecture.stack.tools && project.architecture.stack.tools.length > 0 && (
                                <div className="p-3 rounded-lg bg-[var(--background)]/50 border border-[var(--foreground)]/5">
                                    <span className="text-xs text-[var(--foreground-muted)] uppercase">Tools</span>
                                    <p className="font-medium text-[var(--foreground)]">{project.architecture.stack.tools.join(', ')}</p>
                                </div>
                            )}
                        </div>

                        {project.architecture.notes && project.architecture.notes.length > 0 && (
                            <ul className="space-y-2">
                                {tArray(project.architecture.notes, loc).map((note, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                                        <span className="text-[var(--foreground-muted)]">•</span>
                                        {note}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                )}

                {/* 9. Results Section */}
                {project.results && (
                    <section className="mb-12">
                        <SectionTitle number={9}>{loc === 'id' ? 'Hasil' : 'Results'}</SectionTitle>

                        {project.results.outcomes && project.results.outcomes.length > 0 && (
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-3">
                                    {loc === 'id' ? 'Capaian' : 'Outcomes'}
                                </h4>
                                <ul className="space-y-2">
                                    {tArray(project.results.outcomes, loc).map((outcome, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                                            <span className="text-green-500">✓</span>
                                            {outcome}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {project.results.impact && project.results.impact.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-3">
                                    {loc === 'id' ? 'Dampak' : 'Impact'}
                                </h4>
                                <ul className="space-y-2">
                                    {tArray(project.results.impact, loc).map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                                            <span className="text-[var(--primary)]">→</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                )}

                {/* 10. Lessons Learned */}
                {project.lessonsLearned && project.lessonsLearned.length > 0 && (
                    <section className="mb-12">
                        <SectionTitle number={10}>{loc === 'id' ? 'Pelajaran yang Dipetik' : 'Lessons Learned'}</SectionTitle>
                        <div className="space-y-3">
                            {tArray(project.lessonsLearned, loc).map((lesson, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)]/50 border border-[var(--foreground)]/5">
                                    <span className="text-lg">💡</span>
                                    <span className="text-[var(--foreground-secondary)]">{lesson}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 11. Next Improvements */}
                {project.nextImprovements && project.nextImprovements.length > 0 && (
                    <section className="mb-12">
                        <SectionTitle number={11}>{loc === 'id' ? 'Pengembangan Selanjutnya' : 'Next Improvements'}</SectionTitle>
                        <ul className="space-y-2">
                            {tArray(project.nextImprovements, loc).map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                                    <span className="text-[var(--primary)]">○</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Tech Stack */}
                <section className="mb-8">
                    <h3 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--foreground)]/5 backdrop-blur-xl text-[var(--foreground)] border border-[var(--foreground)]/10 hover:border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/10 transition-all"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Links */}
                {(project.githubUrl || project.liveUrl || project.playStoreUrl) && (
                    <section className="mb-12">
                        <h3 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-4">Links</h3>
                        <div className="flex flex-wrap gap-3">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        'inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium',
                                        'bg-[var(--foreground)]/5 backdrop-blur-xl text-[var(--foreground)]',
                                        'border border-[var(--foreground)]/10',
                                        'hover:border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/10 transition-all'
                                    )}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    {loc === 'id' ? 'Lihat Source Code' : 'View Source Code'}
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
                        </div>
                    </section>
                )}

                {/* Back Link */}
                <div className="pt-8 border-t border-[var(--foreground)]/10">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {loc === 'id' ? 'Kembali ke Semua Proyek' : 'Back to All Projects'}
                    </Link>
                </div>
            </div>
        </main>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function SectionTitle({ number, children }: { number?: number; children: React.ReactNode }) {
    return (
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 pb-2 border-b border-[var(--foreground)]/10 flex items-center gap-3">
            {number && (
                <span className="text-[var(--primary)] font-mono">{number}.</span>
            )}
            {children}
        </h2>
    );
}
