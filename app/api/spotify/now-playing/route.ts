/**
 * ===========================================
 * SPOTIFY NOW PLAYING API ROUTE
 * ===========================================
 * Returns currently playing or last played track
 * 
 * GET /api/spotify/now-playing
 */

import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/services/spotify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        // Check if credentials are configured
        if (!process.env.SPOTIFY_CLIENT_ID ||
            !process.env.SPOTIFY_CLIENT_SECRET ||
            !process.env.SPOTIFY_REFRESH_TOKEN) {
            return NextResponse.json(
                {
                    error: 'Spotify not configured',
                    isConfigured: false
                },
                { status: 503 }
            );
        }

        const nowPlaying = await getNowPlaying();

        if (!nowPlaying) {
            return NextResponse.json(
                {
                    isPlaying: false,
                    isConfigured: true,
                    message: 'No track data available'
                },
                { status: 200 }
            );
        }

        return NextResponse.json({
            ...nowPlaying,
            isConfigured: true,
        });
    } catch (error) {
        console.error('Error in now-playing route:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch now playing',
                isConfigured: true
            },
            { status: 500 }
        );
    }
}
