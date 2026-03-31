# Quick Start Guide - Movie Booking App

## 🚀 Get Started in 5 Minutes

### Step 1: Clone and Install

```bash
git clone <repository-url>
cd Book-my-show-clone-main

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Set Up MongoDB (Required)

**Option A: MongoDB Atlas (Recommended - Free)**

1. Sign up at https://www.mongodb.com/cloud/atlas/register
2. Create a free M0 cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Create `server/.env` and add:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=YourApp
   ```

### Step 3: Set Up Clerk Authentication (Required)

1. Sign up at https://clerk.com
2. Create a new application
3. Go to "API Keys" in the dashboard
4. Add to `server/.env`:
   ```env
   CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_key_here
   ```
5. Add to `client/.env`:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

### Step 4: Set Up Stripe Payments (Required)

1. Sign up at https://stripe.com
2. Go to Developers → API keys
3. Copy your test keys
4. Add to `server/.env`:
   ```env
   STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```
5. Add to `client/.env`:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

### Step 5: Complete Environment Files

**server/.env** (complete file):
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=YourApp

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Stripe Payments
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here

# Optional: Inngest (for background jobs)
INNGEST_EVENT_KEY=your_key_here
INNGEST_SIGNING_KEY=your_key_here

# Optional: TMDB (for additional movie data)
TMDB_API_KEY=your_key_here

# Optional: Email notifications
SENDER_EMAIL=your-email@example.com
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
```

**client/.env** (complete file):
```env
# Currency
VITE_CURRENCY=$

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here

# API URL
VITE_BASE_URL=http://localhost:3000

# TMDB Images
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original

# Stripe Payments
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### Step 6: Seed the Database

```bash
cd server
node seedDatabaseSimple.js
```

This will add 6 popular movies with show times to your database.

### Step 7: Start the Servers

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Step 8: Visit the App

Open your browser and go to: **http://localhost:5173** 🎉

---

## 🎬 Using the App

### As a User:
1. Browse movies on the homepage
2. Click on a movie to see details
3. Select a show time
4. Choose your seats
5. Complete payment with Stripe test card: `4242 4242 4242 4242`
6. View your bookings in "My Bookings"

### As an Admin:
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to Users → Select your user
3. Edit "Private metadata" and add:
   ```json
   {"role": "admin"}
   ```
4. Visit http://localhost:5173/admin
5. Add new shows, manage bookings, etc.

---

## 🧪 Testing Payments

Use these Stripe test cards:

| Card Number | Result |
|------------|--------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Decline |
| `4000 0025 0000 3155` | 3D Secure |

Use any future expiry date, any 3-digit CVC, and any ZIP code.

---

## 🐛 Troubleshooting

### "No movies showing"
→ Run `node seedDatabaseSimple.js` in the server directory

### "Can't connect to database"
→ Check your MongoDB connection string in `server/.env`

### "Can't sign in"
→ Verify Clerk keys match in both `.env` files and Clerk Dashboard

### "Payment not working"
→ Check Stripe keys in both `.env` files
→ For webhooks, run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### "Server won't start"
→ Make sure all required environment variables are set
→ Check server logs for specific errors

---

## 📚 Additional Resources

- **Full Documentation**: See `README.md`
- **Stripe Setup**: See `STRIPE_SETUP_GUIDE.md`
- **Setup Status**: See `SETUP_STATUS.md`

---

## 🎯 What's Required vs Optional

### Required (Core Features):
- ✅ MongoDB (database)
- ✅ Clerk (authentication)
- ✅ Stripe (payments)

### Optional (Enhanced Features):
- ⚠️ Inngest (background jobs for email notifications)
- ⚠️ TMDB API (fetch additional movie data)
- ⚠️ SMTP (email notifications)

The app will work without the optional services, but some features will be limited.

---

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Review the full `README.md`
3. Check server/client console logs for errors
4. Verify all environment variables are set correctly

Happy coding! 🎬🍿
