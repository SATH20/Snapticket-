# TMDB API Setup Guide

## Get Your TMDB API Access

TMDB (The Movie Database) provides two types of authentication:
1. **API Key (v3)** - Legacy format
2. **Read Access Token (v4)** - Recommended for new apps

## Option 1: Get Read Access Token (Recommended)

1. **Sign up at TMDB**
   - Go to https://www.themoviedb.org/signup
   - Create a free account

2. **Request API Access**
   - Go to https://www.themoviedb.org/settings/api
   - Click "Request an API Key"
   - Choose "Developer"
   - Fill in the application details:
     - Application Name: "Movie Booking App"
     - Application URL: "http://localhost:5173"
     - Application Summary: "A movie ticket booking application"

3. **Get Your Read Access Token**
   - After approval, go back to https://www.themoviedb.org/settings/api
   - Copy the "API Read Access Token (v4 auth)" - it's a long token starting with "eyJ..."
   - This is your Bearer token

4. **Update Your .env File**
   ```env
   TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ...your_long_token_here
   ```

## Option 2: Use API Key (v3)

If you already have an API key (shorter, like `b023cbc7d6b41b9f3a50434891c37aaf`):

1. Go to https://www.themoviedb.org/settings/api
2. Copy the "API Key (v3 auth)"
3. Update your `.env` file:
   ```env
   TMDB_API_KEY=your_api_key_here
   ```

The script will automatically detect which format you're using.

## Fetch Latest Movies

Once you have your TMDB API key/token set up:

```bash
cd server
node fetchLatestMovies.js
```

This will:
- Fetch the latest "Now Playing" movies from TMDB
- Add them to your database (skips duplicates)
- Create show times for the next 7 days
- Update your app with fresh movie data

## Automatic Updates (Optional)

You can set up a cron job or scheduled task to automatically fetch new movies:

### Windows (Task Scheduler)
1. Open Task Scheduler
2. Create Basic Task
3. Set trigger (e.g., daily at 3 AM)
4. Action: Start a program
5. Program: `node`
6. Arguments: `fetchLatestMovies.js`
7. Start in: `C:\path\to\your\server`

### Linux/Mac (Cron)
```bash
# Edit crontab
crontab -e

# Add this line to run daily at 3 AM
0 3 * * * cd /path/to/your/server && node fetchLatestMovies.js
```

## API Endpoints Available

The script uses these TMDB endpoints:
- `/movie/now_playing` - Currently in theaters
- `/movie/popular` - Popular movies
- `/movie/upcoming` - Coming soon
- `/movie/{id}` - Movie details
- `/movie/{id}/credits` - Cast and crew

You can modify `fetchLatestMovies.js` to use different endpoints.

## Rate Limits

TMDB API limits:
- **Free tier**: 40 requests per 10 seconds
- The script includes delays to respect rate limits
- No daily request limit for free tier

## Troubleshooting

### "401 Unauthorized"
→ Your API key/token is invalid or expired
→ Get a new one from https://www.themoviedb.org/settings/api

### "404 Not Found"
→ Check the endpoint URL
→ Verify the movie ID exists

### "429 Too Many Requests"
→ You're hitting rate limits
→ The script will automatically slow down

### Movies not showing in app
→ Check that MongoDB is connected
→ Verify movies were added: Check server logs
→ Refresh your browser

## Testing Your API Key

Quick test to verify your TMDB API key works:

```bash
# If using Bearer token (v4)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://api.themoviedb.org/3/movie/now_playing"

# If using API key (v3)
curl "https://api.themoviedb.org/3/movie/now_playing?api_key=YOUR_API_KEY"
```

If you get JSON data back, your key is working!

## Additional Resources

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [TMDB API Status](https://status.themoviedb.org/)
- [TMDB Support](https://www.themoviedb.org/talk/category/5047958519c29526b50017d6)
