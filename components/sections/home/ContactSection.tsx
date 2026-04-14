'use client';

/**
 * ===========================================
 * CONTACT SECTION
 * ===========================================
 * Final CTA for the single-page portfolio.
 */

import { useLocale, useTranslations } from 'next-intl';
import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/types';

interface ContactSectionProps {
    className?: string;
}

export function ContactSection({ className }: ContactSectionProps) {
    const locale = useLocale() as Locale;
    const tCommon = useTranslations('common');
    const { email, phone, location, socialLinks } = personalInfo;

    return (
        <section id="contact" className={cn('scroll-mt-24 py-20 sm:py-28', className)}>
            <div className="container max-w-5xl mx-auto px-4">
                <div className="grid gap-10 rounded-lg border border-[var(--primary)]/20 bg-[var(--background)]/40 p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr]">
                    <div>
                        <span className="text-sm font-medium uppercase tracking-widest text-[var(--primary)]">
                            {locale === 'id' ? 'Kontak' : 'Contact'}
                        </span>
                        <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl">
                            {locale === 'id'
                                ? 'Punya peluang kerja atau project mobile?'
                                : 'Have a mobile role or project opportunity?'}
                        </h2>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--foreground-secondary)]">
                            {locale === 'id'
                                ? 'Saya terbuka untuk diskusi project, kolaborasi, atau peluang kerja yang relevan dengan mobile development.'
                                : 'I am open to project discussions, collaborations, or roles related to mobile development.'}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href={`mailto:${email}`}
                                className="inline-flex items-center justify-center rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
                            >
                                {tCommon('hireMe')}
                            </a>
                            <a
                                href={`mailto:${email}`}
                                className="inline-flex items-center justify-center rounded-lg border border-[var(--foreground)]/15 px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
                            >
                                {email}
                            </a>
                        </div>
                    </div>

                    <dl className="space-y-5">
                        <ContactItem label="Email" value={email} href={`mailto:${email}`} />
                        {phone && <ContactItem label={locale === 'id' ? 'Telepon' : 'Phone'} value={phone} href={`tel:${phone.replace(/\s+/g, '')}`} />}
                        <ContactItem label={locale === 'id' ? 'Lokasi' : 'Location'} value={location[locale]} />
                        <div>
                            <dt className="text-xs uppercase text-[var(--foreground-muted)]">Social</dt>
                            <dd className="mt-2 flex flex-wrap gap-2">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-md border border-[var(--foreground)]/10 px-3 py-2 text-sm text-[var(--foreground-secondary)] transition-colors hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    );
}

function ContactItem({ label, value, href }: { label: string; value: string; href?: string }) {
    return (
        <div>
            <dt className="text-xs uppercase text-[var(--foreground-muted)]">{label}</dt>
            <dd className="mt-1 text-sm font-medium text-[var(--foreground)]">
                {href ? (
                    <a href={href} className="transition-colors hover:text-[var(--primary)]">
                        {value}
                    </a>
                ) : (
                    value
                )}
            </dd>
        </div>
    );
}

export type { ContactSectionProps };
