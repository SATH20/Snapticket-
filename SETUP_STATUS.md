# Project Setup Status

## ✅ What's Working

- Frontend running at http://localhost:5173
- Backend running at http://localhost:3000
- Clerk authentication configured
- Stripe payment integration configured
- TMDB API configured

## ❌ What's Missing

### MongoDB Database (REQUIRED for movies to show)

The app needs a database to store movies and shows. You have two options:

#### Option 1: MongoDB Atlas (Cloud - Easiest)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free M0 cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net`)
6. Update `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net
   ```
7. Restart the backend server

#### Option 2: Local MongoDB

1. Install MongoDB:
   ```bash
   winget install MongoDB.Server
   ```
2. Start MongoDB service:
   ```bash
   net start MongoDB
   ```
3. The current `.env` setting should work:
   ```env
   MONGODB_URI=mongodb://localhost:27017/quickshow
   ```
4. Restart the backend server

## 📝 After MongoDB is Set Up

Once MongoDB is connected, you need to add movies:

1. Go to http://localhost:5173/admin
2. Sign in with Clerk (you'll need to create an account)
3. Click "Add Shows"
4. Search for movies from TMDB
5. Add show times and prices
6. Movies will now appear on the homepage!

## 🔧 Current Configuration

### Environment Variables Set:

**Server:**
- ✅ CLERK_PUBLISHABLE_KEY
- ✅ CLERK_SECRET_KEY
- ✅ TMDB_API_KEY
- ✅ STRIPE_PUBLISHABLE_KEY
- ✅ STRIPE_SECRET_KEY
- ✅ INNGEST_EVENT_KEY
- ✅ INNGEST_SIGNING_KEY
- ❌ MONGODB_URI (needs valid connection)
- ⚠️  STRIPE_WEBHOOK_SECRET (needs Stripe CLI)

**Client:**
- ✅ VITE_CLERK_PUBLISHABLE_KEY
- ✅ VITE_BASE_URL
- ✅ VITE_TMDB_IMAGE_BASE_URL
- ✅ VITE_STRIPE_PUBLISHABLE_KEY

## 🚀 Quick Start Commands

### Start Backend:
```bash
cd server
npm start
```

### Start Frontend:
```bash
cd client
npm run dev
```

### Start Stripe Webhooks (for payment testing):
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 📚 Additional Documentation

- `STRIPE_SETUP_GUIDE.md` - Complete Stripe integration guide
- `README.md` - Full project documentation

## 🐛 Troubleshooting

### "No movies showing"
→ MongoDB is not connected or database is empty. Follow MongoDB setup above.

### "Payment not working"
→ Check `STRIPE_SETUP_GUIDE.md` for Stripe configuration

### "Can't sign in"
→ Verify Clerk keys are correct in both `.env` files

### "Server won't start"
→ Check that all required environment variables are set
