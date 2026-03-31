# Automatic Movie Updates Guide

Your app can now automatically fetch the latest movies from TMDB (The Movie Database)!

## 🎬 Available Scripts

### 1. Fetch Latest Movies (Adds New Movies)
```bash
cd server
npm run fetch-movies
```
- Fetches the latest "Now Playing" movies from TMDB
- Skips movies that already exist in your database
- Adds 10 new movies by default
- Creates show times for the next 7 days

### 2. Update Movies Daily (Recommended)
```bash
cd server
npm run update-movies
```
- Same as fetch-movies but with better logging
- Shows summary of added/skipped/errors
- Perfect for scheduled tasks

**Options:**
```bash
# Clear all movies and fetch fresh data
npm run update-movies -- --clear

# Fetch specific number of movies
npm run update-movies -- --count=20
```

### 3. Seed Database (First Time Setup)
```bash
cd server
npm run seed
```
- Clears database and adds 6 hardcoded popular movies
- Use this for initial setup or testing

## 📅 Schedule Automatic Updates

### Windows (Task Scheduler)

1. **Open Task Scheduler**
   - Press `Win + R`, type `taskschd.msc`, press Enter

2. **Create Basic Task**
   - Click "Create Basic Task" in the right panel
   - Name: "Update Movies Daily"
   - Description: "Fetch latest movies from TMDB"

3. **Set Trigger**
   - Choose "Daily"
   - Set time (e.g., 3:00 AM)
   - Start date: Today

4. **Set Action**
   - Choose "Start a program"
   - Program/script: `npm`
   - Add arguments: `run update-movies`
   - Start in: `C:\path\to\your\server` (full path to server folder)

5. **Finish**
   - Check "Open Properties" before clicking Finish
   - In Properties → Settings:
     - ✅ Run task as soon as possible after a scheduled start is missed
     - ✅ If the task fails, restart every: 1 hour

### Linux/Mac (Cron Job)

1. **Edit Crontab**
   ```bash
   crontab -e
   ```

2. **Add Daily Update (3 AM)**
   ```bash
   0 3 * * * cd /path/to/your/server && npm run update-movies >> /path/to/logs/movie-updates.log 2>&1
   ```

3. **Or Weekly Update (Sunday 3 AM)**
   ```bash
   0 3 * * 0 cd /path/to/your/server && npm run update-movies >> /path/to/logs/movie-updates.log 2>&1
   ```

## 🔄 Manual Updates

You can also run updates manually anytime:

```bash
# Quick update (adds new movies)
cd server
npm run fetch-movies

# Full refresh (clears and re-fetches)
cd server
npm run update-movies -- --clear

# Fetch more movies
cd server
npm run update-movies -- --count=20
```

## 🎯 What Gets Updated

When you run the update scripts:

1. **Movies Added:**
   - Title, overview, tagline
   - Poster and backdrop images
   - Genres, cast (top 10)
   - Release date, runtime, rating
   - Original language

2. **Shows Created:**
   - 4 show times per day (10:00, 13:30, 17:00, 20:30)
   - 7 days of shows (today + next 6 days)
   - Random prices between $10-$15
   - Empty seat availability

3. **Duplicates Handled:**
   - Movies already in database are skipped
   - No duplicate entries created

## 📊 Movie Sources

The scripts fetch from TMDB's "Now Playing" category, which includes:
- Movies currently in theaters
- Recent releases
- Popular current films

You can modify the scripts to fetch from other categories:
- `/movie/popular` - Most popular movies
- `/movie/upcoming` - Coming soon
- `/movie/top_rated` - Highest rated

## 🔧 Customization

### Change Show Times

Edit `updateMoviesDaily.js` or `fetchLatestMovies.js`:

```javascript
const showTimes = ["10:00", "13:30", "17:00", "20:30"]; // Modify these
```

### Change Number of Days

```javascript
for (let day = 0; day < 7; day++) { // Change 7 to your desired number
```

### Change Price Range

```javascript
showPrice: Math.floor(Math.random() * 6) + 10, // $10-$15
// Change to:
showPrice: Math.floor(Math.random() * 11) + 15, // $15-$25
```

### Fetch Different Movie Categories

Replace the API endpoint in the script:

```javascript
// Current: Now Playing
"https://api.themoviedb.org/3/movie/now_playing"

// Popular Movies
"https://api.themoviedb.org/3/movie/popular"

// Upcoming Movies
"https://api.themoviedb.org/3/movie/upcoming"

// Top Rated
"https://api.themoviedb.org/3/movie/top_rated"
```

## 🐛 Troubleshooting

### "401 Unauthorized"
→ Your TMDB API key is invalid
→ Get a new one from https://www.themoviedb.org/settings/api
→ See `TMDB_SETUP.md` for detailed instructions

### "No new movies added"
→ All fetched movies already exist in your database
→ Run with `--clear` flag to refresh: `npm run update-movies -- --clear`

### "Connection timeout"
→ Network issue or TMDB API is slow
→ Script will skip failed movies and continue
→ Try running again later

### "Rate limit exceeded"
→ Too many requests to TMDB API
→ Script includes delays, but wait a few minutes and try again

### Movies not showing in app
→ Refresh your browser (Ctrl+R or F5)
→ Check that backend server is running
→ Verify MongoDB connection

## 📈 Monitoring Updates

Check the logs to see what was updated:

```bash
# View last update
cd server
npm run update-movies

# Output shows:
# ✅ Added: X movies
# ⏭️  Skipped: Y (already exist)
# ❌ Errors: Z
```

## 🎉 Best Practices

1. **Daily Updates**: Schedule updates daily at off-peak hours (3-4 AM)
2. **Monitor Logs**: Check logs weekly to ensure updates are working
3. **Backup Database**: Before running `--clear`, backup your database
4. **Test First**: Run manually before setting up automation
5. **Rate Limits**: Don't run updates more than once per hour

## 📚 Additional Resources

- **TMDB Setup**: See `TMDB_SETUP.md`
- **API Documentation**: https://developers.themoviedb.org/3
- **TMDB Status**: https://status.themoviedb.org/

---

**Pro Tip**: Combine with the admin panel to manually add specific movies you want to feature!
