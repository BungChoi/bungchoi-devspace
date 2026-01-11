/**
 * ===========================================
 * GITHUB SERVICE
 * ===========================================
 * Service to fetch user contribution data via GraphQL
 */

import { GitHubStats, GitHubUserResponse, GitHubWeek, GitHubContributionDay } from '@/lib/types/github';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

/**
 * Fetch GitHub contribution stats using GraphQL
 */
export async function getGitHubStats(): Promise<GitHubStats | null> {
    const token = process.env.GITHUB_TOKEN;
    // Username is hardcoded for now as per requirement "BungChoi", 
    // but good to keep it flexible or env var based in future.
    // Using the username from the previous mock data or context.
    // User mentioned "BungChoi" in mock data.
    const username = 'BungChoi';

    if (!token) {
        console.warn('GITHUB_TOKEN is missing');
        return null;
    }

    const query = `
    query($username: String!) {
      user(login: $username) {
        name
        login
        avatarUrl
        url
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
    `;

    try {
        const response = await fetch(GITHUB_GRAPHQL_API, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { username },
            }),
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            console.error('GitHub API error:', response.status, await response.text());
            return null;
        }

        const json: GitHubUserResponse = await response.json();

        if (!json.data || !json.data.user) {
            console.error('Invalid GitHub response format', json);
            return null;
        }

        const user = json.data.user;
        const calendar = user.contributionsCollection.contributionCalendar;

        // Process calendar data
        const { lastCommitDate, longestStreak, currentStreak, grid, monthLabels } = processContributionData(calendar.weeks);

        return {
            username: user.login,
            profileUrl: user.url,
            avatarUrl: user.avatarUrl,
            totalContributions: calendar.totalContributions,
            lastCommitDate,
            longestStreak,
            currentStreak,
            contributionCalendar: grid,
            monthLabels,
            isConfigured: true,
        };

    } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        return null;
    }
}

/**
 * Helper to process the raw calendar weeks into stats and grid
 */
function processContributionData(weeks: GitHubWeek[]) {
    // Flatten days
    const allDays: GitHubContributionDay[] = weeks.flatMap(w => w.contributionDays);

    // 1. Calculate Grid (7 rows x 52+ cols for full year)
    // Use ALL weeks for full year view
    const grid: number[][] = Array(7).fill(0).map(() => []);

    // Track month positions for labels
    const monthLabels: { month: string; position: number }[] = [];
    let currentMonth = '';
    let weekIndex = 0;

    weeks.forEach(week => {
        week.contributionDays.forEach(day => {
            const dateObj = new Date(day.date);
            const dayIndex = dateObj.getDay(); // 0 (Sunday) to 6 (Saturday)

            // Track month changes for labels
            const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
            if (monthName !== currentMonth) {
                monthLabels.push({ month: monthName, position: weekIndex });
                currentMonth = monthName;
            }

            // Map contribution count to level 0-4
            let level = 0;
            if (day.contributionCount === 0) level = 0;
            else if (day.contributionCount <= 2) level = 1;
            else if (day.contributionCount <= 5) level = 2;
            else if (day.contributionCount <= 10) level = 3;
            else level = 4;

            if (grid[dayIndex]) {
                grid[dayIndex].push(level);
            }
        });
        weekIndex++;
    });

    // 2. Last Commit Date
    const committedDays = allDays.filter(d => d.contributionCount > 0);
    const lastCommit = committedDays.length > 0
        ? committedDays[committedDays.length - 1].date
        : 'No recent';

    // Format date nicely (e.g., "January 11")
    const formattedLastCommit = formatDate(lastCommit);

    // 3. Longest Streak
    let currentStreak = 0;
    let maxStreak = 0;

    // Sort days by date just in case
    const sortedDays = [...allDays].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    sortedDays.forEach(day => {
        if (day.contributionCount > 0) {
            currentStreak++;
        } else {
            maxStreak = Math.max(maxStreak, currentStreak);
            currentStreak = 0;
        }
    });
    // Check final streak
    maxStreak = Math.max(maxStreak, currentStreak);

    return {
        lastCommitDate: formattedLastCommit,
        longestStreak: maxStreak,
        currentStreak,
        grid,
        monthLabels
    };
}

function formatDate(dateStr: string): string {
    if (dateStr === 'No recent') return dateStr;
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date);
}
