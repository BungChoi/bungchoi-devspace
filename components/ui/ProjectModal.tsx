'use client';

/**
 * ===========================================
 * PROJECT MODAL COMPONENT
 * ===========================================
 * Project detail dialog — shadcn/ui-inspired layout:
 * Single full-modal scroll — image, header, and content scroll together.
 */

import { useEffect, useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { Badge } from './Badge';
import { Button } from './Button';
import { PlayStoreButton } from './PlayStoreButton';
import {
    GitHubIcon,
    ExternalLinkIcon,
    AppStoreIcon,
    CheckIcon,
} from '@/components/icons/ProjectLinkIcons';
import { cn } from '@/lib/utils';
import { t } from '@/lib/utils/localization';
import type { Project, Locale } from '@/lib/types';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    locale: Locale;
}

type LinkType = 'playStore' | 'appStore' | 'live' | 'github';

interface ProjectLink {
    type: LinkType;
    url: string;
    label: string;
    icon?: ReactNode;
}

function openExternal(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

function hasUrl(url?: string): url is string {
    return Boolean(url?.trim());
}

function getPlatformLabel(project: Project, locale: Locale): string | null {
    const fromField = t(project.platform, locale);
    if (fromField) return fromField;
    if (project.tags.includes('Android')) return 'Android';
    if (project.tags.includes('Flutter')) return 'Flutter';
    return null;
}

function buildProjectLinks(project: Project, labels: Record<string, string>): ProjectLink[] {
    const links: ProjectLink[] = [];
    if (hasUrl(project.playStoreUrl)) {
        links.push({ type: 'playStore', url: project.playStoreUrl.trim(), label: labels.playStore, icon: null });
    }
    if (hasUrl(project.appStoreUrl)) {
        links.push({ type: 'appStore', url: project.appStoreUrl.trim(), label: labels.appStore, icon: <AppStoreIcon /> });
    }
    if (hasUrl(project.liveUrl)) {
        links.push({ type: 'live', url: project.liveUrl.trim(), label: labels.visitSite, icon: <ExternalLinkIcon /> });
    }
    if (hasUrl(project.githubUrl)) {
        links.push({ type: 'github', url: project.githubUrl.trim(), label: labels.github, icon: <GitHubIcon /> });
    }
    return links;
}

function getPrimaryLink(links: ProjectLink[]): ProjectLink | null {
    for (const type of ['playStore', 'appStore', 'live', 'github'] as LinkType[]) {
        const match = links.find((link) => link.type === type);
        if (match) return match;
    }
    return null;
}

function DialogSeparator({ className }: { className?: string }) {
    return <div role="separator" className={cn('h-px w-full bg-[var(--border)]', className)} />;
}

function ProjectLinkButton({
    link,
    size = 'sm',
}: {
    link: ProjectLink;
    size?: 'sm' | 'default';
}) {
    if (link.type === 'playStore') {
        return (
            <PlayStoreButton
                label={link.label}
                size={size}
                onClick={() => openExternal(link.url)}
            />
        );
    }

    return (
        <Button
            variant="secondary"
            size="sm"
            leftIcon={link.icon}
            onClick={() => openExternal(link.url)}
            className="w-auto border border-[var(--border)] bg-transparent hover:bg-[var(--background-tertiary)]"
        >
            {link.label}
        </Button>
    );
}

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <h3 className="text-sm font-medium leading-none text-[var(--foreground)]">
            {children}
        </h3>
    );
}

function DialogFooter({ links }: { links: ProjectLink[] }) {
    if (links.length === 0) return null;

    const primary = getPrimaryLink(links);
    const secondary = links.filter((link) => link !== primary);

    return (
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-2">
            {secondary.map((link) => (
                <ProjectLinkButton key={link.type} link={link} />
            ))}
            {primary && <ProjectLinkButton link={primary} />}
        </div>
    );
}

export function ProjectModal({ project, isOpen, onClose, locale }: ProjectModalProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 });
    }, [project, isOpen]);

    if (!isOpen || !project) return null;

    const labels = {
        about: locale === 'id' ? 'Tentang proyek' : 'About',
        keyFeatures: locale === 'id' ? 'Fitur utama' : 'Key features',
        contributions: locale === 'id' ? 'Kontribusi saya' : 'My contribution',
        techStack: locale === 'id' ? 'Teknologi' : 'Tech stack',
        visitSite: locale === 'id' ? 'Kunjungi situs' : 'Visit site',
        github: 'GitHub',
        playStore: locale === 'id' ? 'Buka di Google Play' : 'Get it on Google Play',
        appStore: 'App Store',
        close: locale === 'id' ? 'Tutup' : 'Close',
        liveOnPlayStore: locale === 'id' ? 'Tersedia di Play Store' : 'Live on Play Store',
        liveOnAppStore: locale === 'id' ? 'Tersedia di App Store' : 'Live on App Store',
        liveOnBothStores:
            locale === 'id' ? 'Tersedia di App Store & Play Store' : 'Live on App Store & Play Store',
        featured: 'Featured',
    };

    const projectTimeline = t(project.timeline, locale);
    const projectSubtitle = t(project.subtitle, locale);
    const projectDescription = t(project.longDescription || project.description, locale);
    const platformLabel = getPlatformLabel(project, locale);
    const statusLabel = t(project.status, locale);
    const links = buildProjectLinks(project, labels);
    const playStoreLink = links.find((link) => link.type === 'playStore');
    const isPublished = hasUrl(project.playStoreUrl) || hasUrl(project.appStoreUrl);
    const primaryLink = getPrimaryLink(links);
    const fallbackHeaderLink =
        !playStoreLink && primaryLink ? primaryLink : null;

    const publishedChipLabel =
        project.playStoreUrl && project.appStoreUrl
            ? labels.liveOnBothStores
            : project.playStoreUrl
                ? labels.liveOnPlayStore
                : labels.liveOnAppStore;

    const metaItems = [
        projectTimeline || String(project.year),
        platformLabel,
        statusLabel,
    ].filter(Boolean) as string[];

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6">
            {/* Overlay — shadcn: bg-black/80 */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px] animate-[fadeIn_0.15s_ease-out]"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* DialogContent — shadcn: border, shadow-lg, rounded-lg, max-h */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                aria-describedby={projectSubtitle ? 'project-modal-desc' : undefined}
                className={cn(
                    'relative z-10 flex w-full flex-col overflow-hidden',
                    'bg-[var(--card)] text-[var(--card-foreground)]',
                    'border border-[var(--border)] shadow-lg',
                    'h-[92vh] sm:h-auto sm:max-h-[88vh] sm:max-w-2xl',
                    'rounded-t-xl sm:rounded-xl',
                    'animate-[slideUp_0.2s_ease-out]'
                )}
            >
                {/* Close — fixed above scroll */}
                <button
                    type="button"
                    onClick={onClose}
                    className={cn(
                        'absolute right-3 top-3 z-20 rounded-sm p-1.5',
                        'bg-[var(--card)]/80 backdrop-blur-sm',
                        'text-[var(--foreground-muted)] opacity-70',
                        'transition-opacity hover:opacity-100',
                        'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--ring-offset)]'
                    )}
                    aria-label={labels.close}
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Full modal scroll — image, header, body, footer in one flow */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto overscroll-contain"
                >
                    {/* Cover image */}
                    <div className="relative h-44 sm:h-52 overflow-hidden bg-[var(--background-tertiary)]">
                        {project.image ? (
                            <Image
                                src={project.image}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 672px"
                                priority
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-5xl opacity-20">📱</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent" />

                        {isPublished && (
                            <div className="absolute bottom-3 left-4">
                                <Badge variant="success" size="sm" dot>
                                    {publishedChipLabel}
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* DialogHeader */}
                    <div className="space-y-1.5 p-4 pt-3">
                        <h2
                            id="project-modal-title"
                            className="text-lg font-semibold leading-none tracking-tight text-[var(--foreground)]"
                        >
                            {project.title}
                        </h2>

                        {/* Subtitle + Play Store — satu baris */}
                        {(projectSubtitle || playStoreLink) && (
                            <div className="flex items-center justify-between gap-3 -mt-0.5">
                                {projectSubtitle ? (
                                    <p
                                        id="project-modal-desc"
                                        className="min-w-0 flex-1 text-sm text-[var(--foreground-muted)]"
                                    >
                                        {projectSubtitle}
                                    </p>
                                ) : (
                                    (metaItems.length > 0 || project.featured) && (
                                        <p className="min-w-0 flex-1 text-xs text-[var(--foreground-muted)]">
                                            {[...metaItems, project.featured ? labels.featured : null]
                                                .filter(Boolean)
                                                .join(' · ')}
                                        </p>
                                    )
                                )}
                                {playStoreLink && (
                                    <ProjectLinkButton link={playStoreLink} size="sm" />
                                )}
                            </div>
                        )}

                        {projectSubtitle && (metaItems.length > 0 || project.featured) && (
                            <p className="text-xs text-[var(--foreground-muted)]">
                                {[...metaItems, project.featured ? labels.featured : null]
                                    .filter(Boolean)
                                    .join(' · ')}
                            </p>
                        )}

                        {fallbackHeaderLink && (
                            <div className="flex justify-end">
                                <ProjectLinkButton link={fallbackHeaderLink} size="sm" />
                            </div>
                        )}
                    </div>

                    <DialogSeparator />

                    <div className="px-6 py-5 space-y-6">
                        <section className="space-y-2">
                            <SectionLabel>{labels.about}</SectionLabel>
                            <p className="text-sm leading-relaxed text-[var(--foreground-secondary)] whitespace-pre-line">
                                {projectDescription}
                            </p>
                        </section>

                        {project.features && project.features.length > 0 && (
                            <section className="space-y-3">
                                <SectionLabel>{labels.keyFeatures}</SectionLabel>
                                <ul className="space-y-2">
                                    {project.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="rounded-lg border border-[var(--border)] bg-[var(--background)]/50 px-3.5 py-3 text-sm"
                                        >
                                            <div className="flex items-start gap-2.5">
                                                <span className="mt-0.5 text-[var(--primary)]">
                                                    <CheckIcon className="h-3.5 w-3.5" />
                                                </span>
                                                <div className="space-y-0.5">
                                                    <p className="font-medium leading-none text-[var(--foreground)]">
                                                        {t(feature.name, locale)}
                                                    </p>
                                                    <p className="text-[var(--foreground-muted)] leading-relaxed">
                                                        {t(feature.benefit, locale)}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {project.contributions && project.contributions.length > 0 && (
                            <section className="space-y-3">
                                <SectionLabel>{labels.contributions}</SectionLabel>
                                <ul className="space-y-2 text-sm text-[var(--foreground-secondary)]">
                                    {project.contributions.map((contribution, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--foreground-muted)]" />
                                            <span className="leading-relaxed">{t(contribution, locale)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        <section className="space-y-3">
                            <SectionLabel>{labels.techStack}</SectionLabel>
                            <div className="flex flex-wrap gap-1.5">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" size="sm">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </section>

                        {/* Extra links at end of scroll (when multiple sources) */}
                        {links.length > 1 && (
                            <div className="pt-2 pb-6">
                                <DialogSeparator className="mb-4" />
                                <DialogFooter links={links} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}