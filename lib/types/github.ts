/**
 * ===========================================
 * GITHUB TYPES
 * ===========================================
 * TypeScript interfaces for GitHub API responses
 */

export interface GitHubContributionDay {
    contributionCount: number;
    date: string;
    color: string;
}

export interface GitHubWeek {
    contributionDays: GitHubContributionDay[];
}

export interface GitHubCalendar {
    totalContributions: number;
    weeks: GitHubWeek[];
}

export interface GitHubUserResponse {
    data: {
        user: {
            name: string;
            login: string;
            avatarUrl: string;
            url: string;
            contributionsCollection: {
                totalCommitContributions: number;
                contributionCalendar: GitHubCalendar;
            };
        };
    };
}

// Normalized stats for our app
export interface GitHubStats {
    username: string;
    profileUrl: string;
    avatarUrl: string;
    totalContributions: number;
    lastCommitDate: string;
    longestStreak: number;
    currentStreak: number;
    contributionCalendar: number[][]; // 7xN grid for rendering
    monthLabels: { month: string; position: number }[]; // Month label positions
    isConfigured: boolean;
}
