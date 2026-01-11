# Spotify API Integration

## Environment Variables Required

Add these to your `.env.local` file:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

## How to Get These Values

### 1. Create Spotify App
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in app name and description
4. Set Redirect URI: `http://localhost:3000/api/spotify/callback`
5. Copy **Client ID** and **Client Secret**

### 2. Get Refresh Token
1. Visit this URL in browser (replace CLIENT_ID):
```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/api/spotify/callback&scope=user-read-currently-playing%20user-read-recently-played
```

2. After authorizing, you'll be redirected with a `code` parameter
3. Use the callback API route to exchange for tokens
4. Copy the `refresh_token` from the response

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/spotify/now-playing` | Returns currently playing or last played track |
| `GET /api/spotify/callback` | OAuth callback handler (one-time use for getting refresh token) |

## Architecture

```
lib/
  services/
    spotify.ts       # Spotify API service functions
  types/
    spotify.ts       # TypeScript interfaces
app/
  api/
    spotify/
      now-playing/
        route.ts     # Now playing API endpoint
      callback/
        route.ts     # OAuth callback handler
```
