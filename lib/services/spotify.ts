/**
 * ===========================================
 * SPOTIFY SERVICE
 * ===========================================
 * Service layer for Spotify API interactions.
 * Handles token refresh and data fetching.
 */

import type {
    SpotifyCurrentlyPlaying,
    SpotifyRecentlyPlayed,
    SpotifyTokenResponse,
    NowPlayingResponse,
} from '@/lib/types/spotify';

// ============================================
// CONSTANTS
// ============================================

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

// ============================================
// HELPERS
// ============================================

/**
 * Get base64 encoded client credentials
 */
function getBasicAuth(): string {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('Missing Spotify credentials');
    }

    return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}

// ============================================
// TOKEN MANAGEMENT
// ============================================

/**
 * Get new access token using refresh token
 */
export async function getAccessToken(): Promise<string> {
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!refreshToken) {
        throw new Error('Missing Spotify refresh token');
    }

    const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${getBasicAuth()}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to refresh access token');
    }

    const data: SpotifyTokenResponse = await response.json();
    return data.access_token;
}

/**
 * Exchange authorization code for tokens (one-time use)
 */
export async function exchangeCodeForTokens(code: string, redirectUri: string): Promise<SpotifyTokenResponse> {
    const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${getBasicAuth()}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to exchange code: ${error}`);
    }

    return response.json();
}

// ============================================
// DATA FETCHING
// ============================================

/**
 * Get currently playing track
 */
export async function getCurrentlyPlaying(accessToken: string): Promise<SpotifyCurrentlyPlaying | null> {
    const response = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    });

    // 204 means no content (nothing playing)
    if (response.status === 204) {
        return null;
    }

    if (!response.ok) {
        throw new Error('Failed to fetch currently playing');
    }

    return response.json();
}

/**
 * Get recently played tracks
 */
export async function getRecentlyPlayed(accessToken: string): Promise<SpotifyRecentlyPlayed> {
    const response = await fetch(SPOTIFY_RECENTLY_PLAYED_ENDPOINT, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch recently played');
    }

    return response.json();
}

// ============================================
// NORMALIZED DATA
// ============================================

/**
 * Get now playing data in normalized format
 * Falls back to recently played if nothing is currently playing
 */
export async function getNowPlaying(): Promise<NowPlayingResponse | null> {
    try {
        const accessToken = await getAccessToken();

        // Try to get currently playing
        const currentlyPlaying = await getCurrentlyPlaying(accessToken);

        if (currentlyPlaying?.item && currentlyPlaying.currently_playing_type === 'track') {
            const track = currentlyPlaying.item;
            return {
                isPlaying: currentlyPlaying.is_playing,
                title: track.name,
                artist: track.artists.map(a => a.name).join(', '),
                album: track.album.name,
                albumArt: track.album.images[0]?.url || '',
                songUrl: track.external_urls.spotify,
                progress: currentlyPlaying.progress_ms || undefined,
                duration: track.duration_ms,
            };
        }

        // Fall back to recently played
        const recentlyPlayed = await getRecentlyPlayed(accessToken);

        if (recentlyPlayed.items.length > 0) {
            const track = recentlyPlayed.items[0].track;
            return {
                isPlaying: false,
                title: track.name,
                artist: track.artists.map(a => a.name).join(', '),
                album: track.album.name,
                albumArt: track.album.images[0]?.url || '',
                songUrl: track.external_urls.spotify,
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching now playing:', error);
        return null;
    }
}
