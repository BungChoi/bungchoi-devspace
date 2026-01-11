/**
 * ===========================================
 * SPOTIFY OAUTH CALLBACK API ROUTE
 * ===========================================
 * Handles OAuth callback and exchanges code for tokens.
 * This is a one-time use endpoint to get refresh token.
 * 
 * GET /api/spotify/callback?code=xxx
 */

import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '@/lib/services/spotify';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
        return NextResponse.json(
            { error: `Authorization failed: ${error}` },
            { status: 400 }
        );
    }

    if (!code) {
        // No code provided - show authorization instructions
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const redirectUri = `${request.nextUrl.origin}/api/spotify/callback`;

        if (!clientId) {
            return NextResponse.json(
                {
                    error: 'SPOTIFY_CLIENT_ID not configured',
                    instructions: 'Add SPOTIFY_CLIENT_ID to your .env.local file'
                },
                { status: 500 }
            );
        }

        const scopes = 'user-read-currently-playing user-read-recently-played';
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

        return new NextResponse(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Spotify Authorization</title>
                <style>
                    body { font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px; }
                    code { background: #1a1a1a; color: #1DB954; padding: 2px 6px; border-radius: 4px; }
                    pre { background: #1a1a1a; color: #fff; padding: 15px; border-radius: 8px; overflow-x: auto; }
                    a { color: #1DB954; }
                    .btn { display: inline-block; background: #1DB954; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 24px; font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>🎵 Spotify Authorization</h1>
                <p>Click the button below to authorize your Spotify account:</p>
                <p><a href="${authUrl}" class="btn">Authorize with Spotify</a></p>
                <p>After authorization, you'll be redirected back here with your tokens.</p>
                <hr>
                <h3>Manual Authorization URL:</h3>
                <pre>${authUrl}</pre>
            </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html' },
        });
    }

    try {
        const redirectUri = `${request.nextUrl.origin}/api/spotify/callback`;
        const tokens = await exchangeCodeForTokens(code, redirectUri);

        return new NextResponse(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Spotify Authorization Success</title>
                <style>
                    body { font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px; }
                    code { background: #1a1a1a; color: #1DB954; padding: 2px 6px; border-radius: 4px; }
                    pre { background: #1a1a1a; color: #fff; padding: 15px; border-radius: 8px; overflow-x: auto; word-break: break-all; }
                    .success { color: #1DB954; }
                    .warning { color: #ffaa00; background: #332200; padding: 10px; border-radius: 8px; }
                </style>
            </head>
            <body>
                <h1 class="success">✅ Authorization Successful!</h1>
                <p class="warning">⚠️ <strong>Important:</strong> Copy the refresh token below and add it to your <code>.env.local</code> file. This page will not show again!</p>
                
                <h3>Add to .env.local:</h3>
                <pre>SPOTIFY_REFRESH_TOKEN=${tokens.refresh_token}</pre>
                
                <h3>All Tokens (for reference):</h3>
                <pre>${JSON.stringify(tokens, null, 2)}</pre>
                
                <p>After adding the refresh token, restart your development server.</p>
            </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html' },
        });
    } catch (error) {
        console.error('Token exchange error:', error);
        return NextResponse.json(
            { error: 'Failed to exchange code for tokens' },
            { status: 500 }
        );
    }
}
