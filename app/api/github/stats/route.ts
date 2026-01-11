/**
 * ===========================================
 * GITHUB STATS API ROUTE
 * ===========================================
 * Returns GitHub contribution stats for the portfolio
 * 
 * GET /api/github/stats
 */

import { NextResponse } from 'next/server';
import { getGitHubStats } from '@/lib/services/github';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
    try {
        const stats = await getGitHubStats();

        if (!stats) {
            return NextResponse.json(
                {
                    isConfigured: false,
                    error: 'Failed to fetch GitHub stats or token missing'
                },
                { status: 200 } // Return 200 even on error to handle gracefully in UI
            );
        }

        return NextResponse.json({
            ...stats,
            isConfigured: true,
        });
    } catch (error) {
        console.error('Error in github stats route:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
