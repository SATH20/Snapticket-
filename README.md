# SnapTicket 🎬

A modern, full-stack movie ticket booking platform built with the MERN stack. Book your favorite movies, select your seats, and enjoy a seamless cinema experience.

## What's This About?

SnapTicket is a complete movie booking solution that lets users browse current movies, pick their seats, and pay securely. It automatically fetches the latest movies from TMDB, so your catalog stays fresh without manual updates.

I built this to learn full-stack development and explore real-world integrations like payment processing, authentication, and external APIs. It's been a great learning experience!

## Features

- **Browse Movies**: See what's playing with real posters, ratings, and cast info
- **Smart Seat Selection**: Interactive seat map that shows what's available in real-time
- **Secure Payments**: Stripe integration for safe transactions
- **User Accounts**: Sign up, log in, and manage your bookings
- **Admin Dashboard**: Add shows, manage bookings, and view analytics
- **Auto-Updates**: Fetches latest movies from TMDB automatically
- **Responsive Design**: Works great on phones, tablets, and desktops

## Tech Stack

**Frontend:**
- React 19 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Clerk for authentication
- Axios for API calls

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- Stripe for payments
- TMDB API for movie data
- Clerk for auth management

## Getting Started

### What You'll Need

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier works great)
- Clerk account for authentication
- Stripe account for payments
- TMDB API key for movie data

### Quick Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/SATH20/Snapticket-.git
   cd Snapticket-
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd server
   npm install

   # Frontend
   cd ../client
   npm install
   ```

3. **Set up your environment variables**
   
   Copy the example files and fill in your credentials:
   ```bash
   # In server folder
   cp .env.example .env
   
   # In client folder
   cp .env.example .env
   ```

4. **Get your API keys**
   - MongoDB: [Sign up at MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Clerk: [Get keys from Clerk Dashboard](https://dashboard.clerk.com)
   - Stripe: [Get test keys from Stripe](https://dashboard.stripe.com/test/apikeys)
   - TMDB: [Request API access](https://www.themoviedb.org/settings/api)

5. **Add some movies**
   ```bash
   cd server
   npm run fetch-movies
   ```

6. **Start the servers**
   ```bash
   # Backend (in server folder)
   npm start

   # Frontend (in client folder, new terminal)
   npm run dev
   ```

7. **Open your browser**
   
   Visit `http://localhost:5173` and you're good to go!

## Available Scripts

### Backend (server folder)
- `npm start` - Start the server
- `npm run fetch-movies` - Fetch latest movies from TMDB
- `npm run update-movies` - Update movie catalog (with logging)
- `npm run seed` - Add sample movies for testing

### Frontend (client folder)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## How It Works

### For Users
1. Browse movies on the homepage
2. Click a movie to see details and showtimes
3. Pick a date and time that works for you
4. Select your seats on the interactive map
5. Pay securely with Stripe
6. Get a confirmation and view your booking

### For Admins
1. Sign in with admin credentials
2. Access the admin dashboard
3. Add new shows with dates and times
4. View all bookings and revenue
5. Manage the movie catalog

### Behind the Scenes
The app automatically fetches new movies from TMDB, so you don't have to manually add them. You can schedule this to run daily, weekly, or whenever you want. It's pretty hands-off once you set it up.

## Project Structure

```
snapticket/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context for state
│   │   └── lib/           # Utility functions
│   └── public/            # Static assets
│
├── server/                # Node.js backend
│   ├── controllers/       # Request handlers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── configs/          # Configuration files
│
└── docs/                 # Additional documentation
```

## Testing Payments

Use these Stripe test cards:

- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any future date for expiry, any 3-digit CVC, and any ZIP code.

## Deployment

The app is ready to deploy to platforms like Vercel, Netlify, or Heroku. Both the client and server folders have `vercel.json` files configured.

**Important:** Make sure to set up environment variables in your deployment platform and use production credentials (not test keys).

## Things I Learned

Building this project taught me a lot:
- How to integrate third-party APIs (Stripe, TMDB, Clerk)
- Managing complex state in React
- Building RESTful APIs with Express
- Database design with MongoDB
- Authentication and authorization
- Payment processing and webhooks
- Responsive design with Tailwind

## Known Issues

- Email notifications require Inngest setup (optional feature)
- Admin access requires manual role assignment in Clerk
- Webhook testing needs Stripe CLI for local development

## Future Ideas

Some things I'd like to add:
- Movie reviews and ratings
- Trailer playback
- QR code tickets
- Food and beverage ordering
- Multiple theater locations
- Loyalty points system

## Contributing

Feel free to fork this project and make it your own! If you find bugs or have suggestions, open an issue or submit a pull request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Movie data from [TMDB](https://www.themoviedb.org/)
- Icons from [Lucide React](https://lucide.dev/)
- UI inspiration from modern booking platforms

---

Built with ❤️ by a developer learning full-stack development

**Questions?** Check out `QUICK_START.md` for detailed setup instructions.
