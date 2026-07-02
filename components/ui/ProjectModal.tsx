'use client';

/**
 * ===========================================
 * PROJECT MODAL COMPONENT
 * ===========================================
 * A premium glassmorphic popup modal to show project details.
 */

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Badge, BadgeGroup } from './Badge';
import { Button } from './Button';
import { t } from '@/lib/utils/localization';
import type { Project, Locale } from '@/lib/types';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    locale: Locale;
}

export function ProjectModal({ project, isOpen, onClose, locale }: ProjectModalProps) {
    // Handle body scroll locking when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    // Reset scroll progress when modal opens/changes project
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
        if (progressRef.current) {
            progressRef.current.style.setProperty('--scroll-progress', '0%');
        }
    }, [project, isOpen]);

    const handleScroll = () => {
        const element = scrollRef.current;
        const progressBar = progressRef.current;
        if (!element || !progressBar) return;
        
        const totalScroll = element.scrollHeight - element.clientHeight;
        if (totalScroll <= 0) {
            progressBar.style.setProperty('--scroll-progress', '0%');
            return;
        }
        
        const currentScroll = element.scrollTop;
        const progress = (currentScroll / totalScroll) * 100;
        progressBar.style.setProperty('--scroll-progress', `${progress}%`);
    };

    if (!isOpen || !project) return null;

    // Translation Labels
    const labels = {
        role: locale === 'id' ? 'Peran' : 'Role',
        platform: locale === 'id' ? 'Platform' : 'Platform',
        status: locale === 'id' ? 'Status' : 'Status',
        timeline: locale === 'id' ? 'Linimasa' : 'Timeline',
        team: locale === 'id' ? 'Tim' : 'Team',
        techStack: locale === 'id' ? 'Teknologi' : 'Tech Stack',
        about: locale === 'id' ? 'Tentang Proyek' : 'About Project',
        keyFeatures: locale === 'id' ? 'Fitur Utama' : 'Key Features',
        visitSite: locale === 'id' ? 'Kunjungi Situs' : 'Visit Site',
        github: locale === 'id' ? 'GitHub' : 'GitHub',
        playStore: locale === 'id' ? 'Play Store' : 'Play Store',
        appStore: locale === 'id' ? 'App Store' : 'App Store',
        close: locale === 'id' ? 'Tutup' : 'Close',
        projectYear: locale === 'id' ? 'Tahun' : 'Year',
    };

    const projectRole = t(project.role, locale);
    const projectPlatform = t(project.platform, locale);
    const projectStatus = t(project.status, locale);
    const projectTimeline = t(project.timeline, locale);
    const projectTeam = t(project.team, locale);
    const projectSubtitle = t(project.subtitle, locale);
    const projectDescription = t(project.longDescription || project.description, locale);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop Blur overlay */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-[fadeIn_0.2s_ease-out]"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="relative w-full max-w-3xl bg-[var(--background-secondary)] border border-[var(--primary)]/20 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] md:max-h-[85vh] flex flex-col animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] z-10">
                {/* Scroll Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--border)]/30 rounded-t-2xl overflow-hidden z-30">
                    <div 
                        ref={progressRef}
                        className="h-full bg-[var(--primary)] transition-[width] duration-150 ease-out" 
                        style={{ width: 'var(--scroll-progress, 0%)' }}
                    />
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-colors"
                    aria-label={labels.close}
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Scrollable Contents Wrapper */}
                <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="w-full h-full overflow-y-auto flex flex-col no-scrollbar"
                >
                    {/* Top Side: Project Image */}
                    <div className="w-full aspect-video md:h-[380px] relative bg-[var(--background-tertiary)] flex-shrink-0">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-20">
                            📱
                        </div>
                    )}
                    {/* Shadow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-secondary)] via-transparent to-transparent opacity-40" />
                </div>

                {/* Bottom Side: Details */}
                <div className="w-full p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                        {/* Tags / Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge variant="primary" size="sm">
                                {project.year}
                            </Badge>
                            {project.featured && (
                                <Badge variant="success" size="sm">
                                    Featured
                                </Badge>
                            )}
                        </div>

                        {/* Title & Subtitle */}
                        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
                            {project.title}
                        </h2>
                        {projectSubtitle && (
                            <p className="text-sm font-medium text-[var(--primary)] mt-1.5">
                                {projectSubtitle}
                            </p>
                        )}

                        <hr className="border-[var(--border)] my-5" />

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm mb-6 bg-[var(--background-tertiary)]/50 p-4 rounded-xl border border-[var(--border)]/50">
                            {projectPlatform && (
                                <div>
                                    <span className="block text-[var(--foreground-muted)] text-xs uppercase tracking-wider font-semibold mb-1">{labels.platform}</span>
                                    <span className="text-[var(--foreground)] font-medium">{projectPlatform}</span>
                                </div>
                            )}
                            {projectRole && (
                                <div>
                                    <span className="block text-[var(--foreground-muted)] text-xs uppercase tracking-wider font-semibold mb-1">{labels.role}</span>
                                    <span className="text-[var(--foreground)] font-medium">{projectRole}</span>
                                </div>
                            )}
                            {projectTeam && (
                                <div>
                                    <span className="block text-[var(--foreground-muted)] text-xs uppercase tracking-wider font-semibold mb-1">{labels.team}</span>
                                    <span className="text-[var(--foreground)] font-medium">{projectTeam}</span>
                                </div>
                            )}
                            {projectTimeline && (
                                <div>
                                    <span className="block text-[var(--foreground-muted)] text-xs uppercase tracking-wider font-semibold mb-1">{labels.timeline}</span>
                                    <span className="text-[var(--foreground)] font-medium">{projectTimeline}</span>
                                </div>
                            )}
                            {projectStatus && (
                                <div>
                                    <span className="block text-[var(--foreground-muted)] text-xs uppercase tracking-wider font-semibold mb-1">{labels.status}</span>
                                    <span className="text-[var(--foreground)] font-medium">{projectStatus}</span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="text-xs uppercase tracking-wider font-bold text-[var(--foreground-muted)] mb-2">
                                {labels.about}
                            </h3>
                            <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed whitespace-pre-line">
                                {projectDescription}
                            </p>
                        </div>

                        {/* Key Features */}
                        {project.features && project.features.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-xs uppercase tracking-wider font-bold text-[var(--foreground-muted)] mb-2">
                                    {labels.keyFeatures}
                                </h3>
                                <ul className="space-y-2 text-sm text-[var(--foreground-secondary)]">
                                    {project.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <span className="inline-block text-[var(--primary)] text-base leading-none select-none mt-0.5">•</span>
                                            <div>
                                                <strong className="text-[var(--foreground)] font-medium">{t(feature.name, locale)}:</strong>{' '}
                                                {t(feature.benefit, locale)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Tech Stack Tags */}
                        <div className="mb-8">
                            <h3 className="text-xs uppercase tracking-wider font-bold text-[var(--foreground-muted)] mb-3">
                                {labels.techStack}
                            </h3>
                            <BadgeGroup gap="sm">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" size="sm" pill={false}>
                                        {tag}
                                    </Badge>
                                ))}
                            </BadgeGroup>
                        </div>
                    </div>

                    {/* Footer / Links */}
                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[var(--border)]">
                        {project.githubUrl && (
                            <Button
                                variant="outline"
                                size="sm"
                                leftIcon={
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                }
                                onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                            >
                                {labels.github}
                            </Button>
                        )}
                        {project.liveUrl && (
                            <Button
                                variant="primary"
                                size="sm"
                                leftIcon={
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                }
                                onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                            >
                                {labels.visitSite}
                            </Button>
                        )}
                        {project.playStoreUrl && (
                            <Button
                                variant="outline"
                                size="sm"
                                leftIcon={<span>🤖</span>}
                                onClick={() => window.open(project.playStoreUrl, '_blank', 'noopener,noreferrer')}
                            >
                                {labels.playStore}
                            </Button>
                        )}
                        {project.appStoreUrl && (
                            <Button
                                variant="outline"
                                size="sm"
                                leftIcon={<span>🍎</span>}
                                onClick={() => window.open(project.appStoreUrl, '_blank', 'noopener,noreferrer')}
                            >
                                {labels.appStore}
                            </Button>
                        )}
                    </div>
                </div>
                </div>
            </div>

            {/* Animations defined globally/inline to be fully standalone */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(24px) scale(0.97);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
