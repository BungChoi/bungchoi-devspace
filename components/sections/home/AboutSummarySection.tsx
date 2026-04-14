'use client';

/**
 * ===========================================
 * ABOUT SUMMARY SECTION
 * ===========================================
 * Compact about content for the single-page Home flow.
 */

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/types';

interface AboutSummarySectionProps {
    className?: string;
}

export function AboutSummarySection({ className }: AboutSummarySectionProps) {
    const locale = useLocale() as Locale;
    const tCommon = useTranslations('common');
    const { bio, resumeUrl, stats } = personalInfo;

    const focusItems = locale === 'id'
        ? [
            'Membangun aplikasi mobile dari UI sampai integrasi API.',
            'Menjaga struktur folder, state management, dan komponen tetap rapi.',
            'Membuat pengalaman pengguna yang jelas melalui loading, empty, error, dan success state.',
        ]
        : [
            'Building mobile apps from UI implementation to API integration.',
            'Keeping folder structure, state management, and components organized.',
            'Creating clear user experiences through loading, empty, error, and success states.',
        ];

    return (
        <section id="about" className={cn('scroll-mt-24 py-20 sm:py-28', className)}>
            <div className="container max-w-6xl mx-auto px-4">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div>
                        <span className="text-sm font-medium uppercase tracking-widest text-[var(--primary)]">
                            {locale === 'id' ? 'Tentang Saya' : 'About Me'}
                        </span>
                        <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl">
                            {locale === 'id'
                                ? 'Mobile developer yang fokus pada produk yang rapi dan mudah dirawat.'
                                : 'A mobile developer focused on clean, maintainable products.'}
                        </h2>
                    </div>

                    <div>
                        <p className="whitespace-pre-line text-base leading-relaxed text-[var(--foreground-secondary)]">
                            {bio[locale]}
                        </p>

                        <ul className="mt-8 space-y-3">
                            {focusItems.map((item) => (
                                <li key={item} className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-3 text-[var(--foreground-secondary)]">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--primary)]" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {resumeUrl && (
                                <Link
                                    href={resumeUrl}
                                    className="inline-flex items-center justify-center rounded-lg border border-[var(--primary)] bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
                                >
                                    {tCommon('downloadCV')}
                                </Link>
                            )}
                            <Link
                                href="/#projects"
                                className="inline-flex items-center justify-center rounded-lg border border-[var(--foreground)]/15 px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
                            >
                                {tCommon('viewProject')}
                            </Link>
                        </div>
                    </div>
                </div>

                {stats && stats.length > 0 && (
                    <dl className="mt-12 grid gap-4 sm:grid-cols-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label[locale]}
                                className="rounded-lg border border-[var(--primary)]/20 bg-[var(--background)]/40 p-5 text-center"
                            >
                                <dt className="text-sm text-[var(--foreground-muted)]">{stat.label[locale]}</dt>
                                <dd className="mt-2 text-3xl font-bold text-[var(--primary)]">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                )}
            </div>
        </section>
    );
}

export type { AboutSummarySectionProps };
