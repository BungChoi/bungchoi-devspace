'use client';

/**
 * ===========================================
 * HOBI SECTION COMPONENT
 * ===========================================
 * Section displaying personal hobbies/interests
 * with Spotify and GitHub activity embeds.
 */

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { NowPlayingResponse } from '@/lib/types/spotify';

// ============================================
// TYPES
// ============================================

interface HobiSectionProps {
    className?: string;
}

interface SpotifyApiResponse extends NowPlayingResponse {
    isConfigured?: boolean;
    error?: string;
    message?: string;
}

// ============================================
// GITHUB MOCK DATA - TODO: Replace with API
// ============================================

const githubData = {
    username: 'BungChoi',
    profileUrl: 'https://github.com/BungChoi',
    totalContributions: 4528,
    lastCommit: 'January 11th',
    longestStreak: 62,
    contributions: generateContributionData(),
};

function generateContributionData(): number[][] {
    const rows = 7;
    const cols = 20;
    const data: number[][] = [];

    for (let i = 0; i < rows; i++) {
        const row: number[] = [];
        for (let j = 0; j < cols; j++) {
            row.push(Math.floor(Math.random() * 5));
        }
        data.push(row);
    }
    return data;
}

// ============================================
// COMPONENT
// ============================================

export function HobiSection({ className }: HobiSectionProps) {
    return (
        <section
            id="hobi"
            className={cn(
                'relative py-20 sm:py-28',
                className
            )}
        >
            <div className="container max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                        What I Do
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                        Beyond <span className="text-gradient">Coding</span>
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    <SpotifyCard />
                    <GitHubCard data={githubData} />
                </div>
            </div>
        </section>
    );
}

// ============================================
// SPOTIFY CARD - Fetches from API
// ============================================

function SpotifyCard() {
    const [data, setData] = useState<SpotifyApiResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchNowPlaying = useCallback(async () => {
        try {
            const response = await fetch('/api/spotify/now-playing');
            const json = await response.json();
            if (response.ok) {
                setData(json);
            }
        } catch {
            // Silently fail
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 30000);
        return () => clearInterval(interval);
    }, [fetchNowPlaying]);

    // Loading state
    if (loading) {
        return (
            <div className={cn(
                'p-6 rounded-xl',
                'bg-[var(--background)]/40 backdrop-blur-xl',
                'border border-[var(--primary)]/30',
                'shadow-xl animate-pulse'
            )}>
                <div className="flex items-center justify-between mb-6">
                    <div className="h-3 w-20 bg-[var(--background-tertiary)] rounded" />
                    <div className="h-5 w-5 bg-[var(--background-tertiary)] rounded-full" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--background-tertiary)]" />
                    <div className="flex-1">
                        <div className="h-4 w-32 bg-[var(--background-tertiary)] rounded mb-2" />
                        <div className="h-3 w-24 bg-[var(--background-tertiary)] rounded" />
                    </div>
                </div>
            </div>
        );
    }

    // Not configured state - Coming Soon
    if (!data?.isConfigured) {
        return (
            <div className={cn(
                'p-6 rounded-xl',
                'bg-[var(--background)]/40 backdrop-blur-xl',
                'border border-[var(--primary)]/30',
                'shadow-xl'
            )}>
                <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-widest">
                        Now Playing
                    </span>
                    <SpotifyIcon className="w-5 h-5 text-[#1DB954]" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--background-tertiary)] flex-shrink-0 border-2 border-[var(--border)] flex items-center justify-center">
                        <span className="text-2xl">🎵</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[var(--foreground)]">Coming Soon</h3>
                        <p className="text-sm text-[var(--foreground-secondary)]">Spotify integration</p>
                    </div>
                </div>
                <p className="mt-6 text-xs text-[var(--foreground-muted)] text-right">
                    Real-time now playing 🎧
                </p>
            </div>
        );
    }

    const isPlaying = data?.isPlaying || false;
    const title = data?.title || 'Not Playing';
    const artist = data?.artist || 'No track';
    const albumArt = data?.albumArt;
    const songUrl = data?.songUrl || 'https://open.spotify.com';

    return (
        <div className={cn(
            'p-6 rounded-xl',
            'bg-[var(--background)]/40 backdrop-blur-xl',
            'border border-[var(--primary)]/30',
            'shadow-xl'
        )}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-widest flex items-center gap-2">
                    {isPlaying && (
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1DB954]"></span>
                        </span>
                    )}
                    {isPlaying ? 'Now Playing' : 'Last Played'}
                </span>
                <SpotifyIcon className="w-5 h-5 text-[#1DB954]" />
            </div>

            {/* Track Info */}
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--background-tertiary)] flex-shrink-0 border-2 border-[var(--border)]">
                    {albumArt ? (
                        <img src={albumArt} alt={title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">🎵</div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--foreground)] truncate">{title}</h3>
                    <p className="text-sm text-[var(--foreground-secondary)] truncate">{artist}</p>
                </div>
            </div>

            {/* Listen Link */}
            <a
                href={songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-end gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
                Listen along
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        </div>
    );
}

// ============================================
// GITHUB CARD
// ============================================

// ============================================
// GITHUB CARD - Fetches from API
// ============================================

interface GitHubApiResponse extends NowPlayingResponse {
    isConfigured?: boolean;
    error?: string;
    // Add GitHub specific fields matching the API response
    username?: string;
    profileUrl?: string;
    totalContributions?: number;
    lastCommitDate?: string;
    longestStreak?: number;
    currentStreak?: number;
    contributionCalendar?: number[][];
    monthLabels?: { month: string; position: number }[];
}

function GitHubCard({ data: initialData }: { data?: any }) {
    const [data, setData] = useState<GitHubApiResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGitHubStats() {
            try {
                const response = await fetch('/api/github/stats');
                const json = await response.json();
                if (response.ok && json.isConfigured) {
                    setData(json);
                    setLoading(false);
                    return;
                }
            } catch (e) {
                console.error(e);
            }
            // Fallback to initial mock data or error state if fetch fails
            setLoading(false);
        }

        fetchGitHubStats();
    }, []);

    const levelColors = [
        'bg-[var(--background-tertiary)]',
        'bg-[var(--primary)]/20',
        'bg-[var(--primary)]/40',
        'bg-[var(--primary)]/60',
        'bg-[var(--primary)]',
    ];

    // Use fetched data or fallback
    // Note: The structure of API response matches what we need
    const displayData = data || initialData;
    const calendar = displayData?.contributionCalendar || displayData?.contributions || [];
    const monthLabels = displayData?.monthLabels || [];
    const totalWeeks = calendar[0]?.length || 0;

    // Check if we have valid data to display
    const hasData = displayData && (displayData.totalContributions !== undefined || displayData.contributions);

    return (
        <div className={cn(
            'p-6 rounded-xl',
            'bg-[var(--background)]/40 backdrop-blur-xl',
            'border border-[var(--primary)]/30',
            'shadow-xl'
        )}>
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-widest">
                    GitHub Activity
                </span>
                <a
                    href={displayData?.profileUrl || "https://github.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--primary)] hover:underline"
                >
                    View Profile
                </a>
            </div>

            {loading ? (
                <div className="animate-pulse space-y-4">
                    <div className="h-24 bg-[var(--background-tertiary)] rounded-md"></div>
                    <div className="h-4 w-1/2 bg-[var(--background-tertiary)] rounded"></div>
                </div>
            ) : (
                <>
                    {/* Month Labels */}
                    <div className="mb-1 overflow-x-auto">
                        <div className="relative" style={{ minWidth: `${totalWeeks * 11}px` }}>
                            <div className="flex text-xs text-[var(--foreground-muted)]">
                                {monthLabels.map((label: { month: string; position: number }, idx: number) => (
                                    <span
                                        key={idx}
                                        className="absolute"
                                        style={{ left: `${label.position * 11}px` }}
                                    >
                                        {label.month}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contribution Graph */}
                    <div className="mb-4 overflow-x-auto pb-2">
                        <div className="flex flex-col gap-[3px]" style={{ minWidth: `${totalWeeks * 15}px` }}>
                            {calendar.map((row: number[], rowIndex: number) => (
                                <div key={rowIndex} className="flex gap-[3px]">
                                    {row.map((level, colIndex) => (
                                        <div
                                            key={colIndex}
                                            className={cn('w-[12px] h-[12px] rounded-[2px]', levelColors[level])}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer: Total + Legend */}
                    <div className="flex items-center justify-between text-xs text-[var(--foreground-muted)] mb-4">
                        <span>
                            {displayData?.totalContributions?.toLocaleString()} contributions in the last year
                        </span>
                        <div className="flex items-center gap-1">
                            <span>Less</span>
                            {levelColors.map((color, idx) => (
                                <div key={idx} className={cn('w-[9px] h-[9px] rounded-sm', color)} />
                            ))}
                            <span>More</span>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-[var(--background)]/60 border border-[var(--border)]/30 text-center">
                            <p className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider mb-1">Last Commit</p>
                            <p className="font-semibold text-[var(--foreground)] text-sm">{displayData?.lastCommitDate || '-'}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-[var(--background)]/60 border border-[var(--border)]/30 text-center">
                            <p className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider mb-1">Longest Streak</p>
                            <p className="font-semibold text-[var(--foreground)]">{displayData?.longestStreak} days</p>
                        </div>
                        <div className="p-3 rounded-xl bg-[var(--background)]/60 border border-[var(--border)]/30 text-center">
                            <p className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider mb-1">Contributions</p>
                            <p className="font-semibold text-[var(--foreground)]">{displayData?.totalContributions?.toLocaleString()}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// ============================================
// ICONS
// ============================================

function SpotifyIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { HobiSectionProps };
