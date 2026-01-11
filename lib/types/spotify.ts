/**
 * ===========================================
 * SPOTIFY TYPES
 * ===========================================
 * TypeScript interfaces for Spotify API responses
 */

// Spotify Track object (simplified)
export interface SpotifyTrack {
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    external_urls: {
        spotify: string;
    };
    duration_ms: number;
}

export interface SpotifyArtist {
    name: string;
    external_urls: {
        spotify: string;
    };
}

export interface SpotifyAlbum {
    name: string;
    images: SpotifyImage[];
    external_urls: {
        spotify: string;
    };
}

export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

// Currently Playing response
export interface SpotifyCurrentlyPlaying {
    is_playing: boolean;
    item: SpotifyTrack | null;
    progress_ms: number | null;
    currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown';
}

// Recently Played response
export interface SpotifyRecentlyPlayed {
    items: {
        track: SpotifyTrack;
        played_at: string;
    }[];
}

// Normalized response for our app
export interface NowPlayingResponse {
    isPlaying: boolean;
    title: string;
    artist: string;
    album: string;
    albumArt: string;
    songUrl: string;
    progress?: number;
    duration?: number;
}

// Token response
export interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    scope: string;
}
