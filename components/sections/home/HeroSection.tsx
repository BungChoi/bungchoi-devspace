'use client';

/**
 * ===========================================
 * HERO SECTION COMPONENT - WITH i18n
 * ===========================================
 * Intro section with profile photo, short value statement, and CTA.
 */

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/types';

const TYPE_SPEED_MS = 22;
const STATEMENT_HOLD_MS = 1900;
const STATEMENT_EXIT_MS = 260;

// ============================================
// TYPES
// ============================================

interface HeroSectionProps {
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export function HeroSection({ className }: HeroSectionProps) {
    const t = useTranslations('hero');
    const tCommon = useTranslations('common');
    const locale = useLocale() as Locale;
    const { name, title, avatar, email, socialLinks } = personalInfo;
    const heroDisplayName = name.replace(/\s+Rozaqi$/, ' R');
    const [activeStatementIndex, setActiveStatementIndex] = useState(0);
    const [visibleStatement, setVisibleStatement] = useState('');
    const [isStatementLeaving, setIsStatementLeaving] = useState(false);
    const contactLinks = [
        { name: 'Email', url: `mailto:${email}`, icon: 'mail' },
        ...socialLinks,
    ];
    const rotatingStatements = locale === 'id'
        ? [
            {
                text: 'Membangun aplikasi mobile yang rapi, intuitif, dan mudah dirawat dari sisi UI sampai integrasi API.',
            },
            {
                text: 'Mengubah desain UI menjadi aplikasi Flutter yang polished dengan struktur kode yang konsisten.',
            },
            {
                text: 'Merancang flow mobile yang jelas agar setiap state pengguna mudah dipahami dan tidak membingungkan.',
            },
            {
                text: 'Menjaga implementasi tetap clean melalui komponen reusable, state handling, dan folder structure yang tertata.',
            },
            {
                text: 'Membuat pengalaman mobile yang terasa selesai lewat detail loading, empty, error, dan success state.',
            },
        ]
        : [
            {
                text: 'Building clean, intuitive, and maintainable mobile apps from UI implementation to API integration.',
            },
            {
                text: 'Turning UI designs into polished Flutter applications with consistent code structure.',
            },
            {
                text: 'Designing clear mobile flows so every user state feels understandable and predictable.',
            },
            {
                text: 'Keeping implementation clean through reusable components, state handling, and organized folder structure.',
            },
            {
                text: 'Creating finished-feeling mobile experiences through careful loading, empty, error, and success states.',
            },
        ];
    const activeStatement = rotatingStatements[activeStatementIndex] ?? rotatingStatements[0];

    useEffect(() => {
        const timeouts: number[] = [];

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            timeouts.push(window.setTimeout(() => {
                setVisibleStatement(activeStatement.text);
                setIsStatementLeaving(false);
            }, 0));

            return () => {
                timeouts.forEach((timeout) => window.clearTimeout(timeout));
            };
        }

        timeouts.push(window.setTimeout(() => {
            setVisibleStatement('');
            setIsStatementLeaving(false);

            for (let characterIndex = 1; characterIndex <= activeStatement.text.length; characterIndex += 1) {
                timeouts.push(window.setTimeout(() => {
                    setVisibleStatement(activeStatement.text.slice(0, characterIndex));
                }, characterIndex * TYPE_SPEED_MS));
            }

            const typingDuration = activeStatement.text.length * TYPE_SPEED_MS;

            timeouts.push(window.setTimeout(() => {
                setIsStatementLeaving(true);
            }, typingDuration + STATEMENT_HOLD_MS));

            timeouts.push(window.setTimeout(() => {
                setActiveStatementIndex((current) => (current + 1) % rotatingStatements.length);
            }, typingDuration + STATEMENT_HOLD_MS + STATEMENT_EXIT_MS));
        }, 0));

        return () => {
            timeouts.forEach((timeout) => window.clearTimeout(timeout));
        };
    }, [activeStatement.text, rotatingStatements.length]);

    return (
        <section
            id="home"
            className={cn(
                'relative min-h-[calc(100vh-5rem)] overflow-hidden scroll-mt-24',
                'flex items-center pt-28 pb-16 sm:pt-32 sm:pb-20',
                className
            )}
        >
            <HeroBackground />

            <div className="container max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
                <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
                    <div className="text-center lg:text-left">
                        <p className="hero-copy-eyebrow text-sm font-semibold uppercase tracking-widest text-[var(--primary)]">
                            {t('available')}
                        </p>

                        <h1 className="hero-copy-heading mt-5 text-4xl font-bold leading-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                            <span className="block">{t('greeting')}</span>
                            <span className="block text-gradient lg:whitespace-nowrap">{heroDisplayName}</span>
                        </h1>

                        <p className="hero-copy-title mt-4 text-xl font-medium text-[var(--foreground)]">
                            {title[locale]}
                        </p>

                        <div
                            className="hero-copy-slogan mt-5 h-[6rem] max-w-xl overflow-hidden pt-1 text-base leading-relaxed text-[var(--foreground-secondary)] sm:h-[6.25rem] sm:text-lg"
                            aria-live="polite"
                        >
                            <p
                                className={cn(
                                    'hero-typewriter-statement',
                                    isStatementLeaving && 'hero-typewriter-leaving'
                                )}
                                aria-label={activeStatement.text}
                            >
                                {visibleStatement}
                                <span className="hero-typewriter-cursor" aria-hidden="true" />
                            </p>
                        </div>

                        <div className="hero-copy-cta mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                            <Link
                                href="/#projects"
                                className="inline-flex items-center justify-center rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
                            >
                                {tCommon('viewProject')}
                            </Link>
                            <a
                                href={`mailto:${email}`}
                                className="inline-flex items-center justify-center rounded-lg border border-[var(--foreground)]/15 px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
                            >
                                {tCommon('hireMe')}
                            </a>
                        </div>

                        <div className="hero-copy-socials mt-8 flex justify-center gap-3 lg:justify-start">
                            {contactLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--foreground)]/10 text-[var(--foreground-secondary)] transition-colors hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
                                    aria-label={link.name}
                                >
                                    <SocialIcon name={link.icon} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="hero-profile-card mx-auto w-full max-w-[320px] lg:mx-0 lg:justify-self-center">
                        <div className="relative overflow-hidden rounded-lg border border-[var(--primary)]/25 bg-[var(--background)]/55 shadow-2xl shadow-[var(--primary)]/10">
                            <div className="px-4 pt-4">
                                <div className="hero-profile-photo relative aspect-[4/5] overflow-hidden rounded-md border border-[var(--foreground)]/10 bg-[var(--background-tertiary)]">
                                    {avatar ? (
                                        <Image
                                            src={avatar}
                                            alt={name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 280px, 320px"
                                            priority
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-6xl text-[var(--foreground-muted)]">
                                            AH
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="hero-profile-caption p-5">
                                <div className="mb-4 h-px bg-[var(--foreground)]/10" />
                                <p className="text-lg font-bold text-[var(--foreground)]">{name}</p>
                                <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1.5 text-sm font-semibold text-[var(--primary)]">
                                    <FlutterLogoIcon />
                                    Flutter Developer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hero-copy-eyebrow,
                .hero-copy-heading,
                .hero-copy-title,
                .hero-copy-slogan,
                .hero-copy-cta,
                .hero-copy-socials {
                    animation: hero-copy-enter 720ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
                }

                .hero-copy-eyebrow {
                    animation-delay: 80ms;
                }

                .hero-copy-heading {
                    animation-delay: 180ms;
                }

                .hero-copy-title {
                    animation-delay: 280ms;
                }

                .hero-copy-slogan {
                    animation-delay: 380ms;
                }

                .hero-copy-cta {
                    animation-delay: 500ms;
                }

                .hero-copy-socials {
                    animation-delay: 620ms;
                }

                .hero-typewriter-statement {
                    display: -webkit-box;
                    width: fit-content;
                    max-width: 100%;
                    margin-inline: auto;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    border: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
                    border-radius: 8px;
                    background: color-mix(in srgb, var(--background-secondary) 48%, transparent);
                    padding: 0.35rem 0.65rem;
                    overflow: hidden;
                    backdrop-filter: blur(8px);
                    transition:
                        opacity 260ms ease,
                        transform 260ms ease,
                        filter 260ms ease;
                }

                .hero-typewriter-leaving {
                    opacity: 0;
                    transform: translateY(-8px);
                    filter: blur(4px);
                }

                .hero-typewriter-cursor {
                    display: inline-block;
                    width: 2px;
                    height: 1em;
                    margin-left: 4px;
                    transform: translateY(2px);
                    background: var(--primary);
                    animation: hero-cursor-blink 900ms steps(2, start) infinite;
                }

                @media (min-width: 1024px) {
                    .hero-typewriter-statement {
                        margin-inline: 0;
                    }
                }

                .hero-profile-card {
                    animation: profile-card-enter 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
                    transform-origin: top center;
                }

                .hero-profile-photo {
                    animation: profile-photo-enter 700ms cubic-bezier(0.2, 0.8, 0.2, 1) 180ms both;
                }

                .hero-profile-caption {
                    animation: profile-caption-enter 620ms cubic-bezier(0.2, 0.8, 0.2, 1) 320ms both;
                }

                @keyframes hero-copy-enter {
                    from {
                        opacity: 0;
                        transform: translateY(18px);
                        filter: blur(6px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                        filter: blur(0);
                    }
                }

                @keyframes hero-cursor-blink {
                    0%,
                    45% {
                        opacity: 1;
                    }
                    46%,
                    100% {
                        opacity: 0;
                    }
                }

                @keyframes profile-card-enter {
                    from {
                        opacity: 0;
                        transform: translateY(28px) rotate(1.5deg) scale(0.96);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) rotate(0deg) scale(1);
                    }
                }

                @keyframes profile-photo-enter {
                    from {
                        opacity: 0;
                        transform: translateY(14px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes profile-caption-enter {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .hero-copy-eyebrow,
                    .hero-copy-heading,
                    .hero-copy-title,
                    .hero-copy-slogan,
                    .hero-copy-cta,
                    .hero-copy-socials,
                    .hero-profile-card,
                    .hero-profile-photo,
                    .hero-profile-caption,
                    .hero-typewriter-cursor {
                        animation: none;
                    }

                    .hero-typewriter-statement {
                        transition: none;
                    }
                }
            `}</style>
        </section>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function SocialIcon({ name }: { name: string }) {
    switch (name.toLowerCase()) {
        case 'mail':
            return (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                </svg>
            );
        case 'github':
            return (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
            );
        case 'linkedin':
            return (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                </svg>
            );
        case 'instagram':
            return (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.879 1.44 1.44 0 0 0 0-2.879z" />
                </svg>
            );
        default:
            return <span className="text-sm font-semibold">{name[0]}</span>;
    }
}

function FlutterLogoIcon() {
    return (
        <svg className="h-4 w-4" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M18.7 3 5 16.7l4.2 4.2L27.1 3h-8.4z" fill="#54C5F8" />
            <path d="m18.8 15.6-7.5 7.5 4.2 4.2 4.2-4.2 7.4-7.5h-8.3z" fill="#54C5F8" />
            <path d="m15.5 27.3 3.2 3.2h8.4l-7.4-7.4-4.2 4.2z" fill="#01579B" />
            <path d="m11.3 23.1 4.2-4.2 4.2 4.2-4.2 4.2-4.2-4.2z" fill="#29B6F6" />
        </svg>
    );
}

function HeroBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                                      linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { HeroSectionProps };
