<div align="center">

# BMS CLONE🎬🍿🎥

*Seamless Video Discovery. Effortless Entertainment Experience*

![Last Commit](https://img.shields.io/badge/last%20commit-today-brightgreen)
![JavaScript](https://img.shields.io/badge/javascript-98.8%25-yellow)
![Languages](https://img.shields.io/badge/languages-3-blue)

**Built with the tools and technologies:**

![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

<br />



</div>

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
- [Features](#features)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This is a modern, full-stack movie ticket booking application built with the MERN stack. It provides users with a seamless experience to discover movies, book tickets, and manage their bookings while offering administrators powerful tools to manage shows, bookings, and movie listings.

### Key Highlights

- 🎬 **Movie Discovery**: Browse and search through extensive movie catalogs
- 🎟️ **Ticket Booking**: Interactive seat selection and booking system
- 💳 **Secure Payments**: Integrated Stripe payment processing
- 📱 **Responsive Design**: Mobile-first design approach
- 🔐 **User Authentication**: Secure login and registration system
- 👨‍💼 **Admin Dashboard**: Comprehensive admin panel for management
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and production builds

---

## Getting Started

### Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git**

### Installation

1. **Clone the repository**
   ```console
   git clone https://github.com/elyse502/QuickShow.git
   cd QuickShow
   ```

2. **Install server dependencies**
   ```console
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```console
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` files in both `server` and `client` directories:
   
   **Server (.env)**
   ```env
   # 🌐 Database (MongoDB Atlas - Free Tier)
   # Sign up at https://www.mongodb.com/cloud/atlas/register
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=YourApp
    
   # 🔐 Clerk Authentication
   # Get from https://dashboard.clerk.com → Your App → API Keys
   CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
   CLERK_SECRET_KEY=sk_test_your_secret_key
    
   # ⚙️ Inngest Event Scheduling (Optional - for background jobs)
   # Get from https://www.inngest.com
   INNGEST_EVENT_KEY=your-inngest-event-key
   INNGEST_SIGNING_KEY=your-inngest-signing-key
    
   # 🎬 TMDB API (Optional - for fetching additional movie data)
   # Get from https://www.themoviedb.org/settings/api
   TMDB_API_KEY=your-tmdb-api-key
    
   # 💳 Stripe Payment Integration
   # Get from https://dashboard.stripe.com/test/apikeys
   STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
    
   # 📧 Email Notifications (Optional - for booking confirmations)
   SENDER_EMAIL=your-sender@example.com
   SMTP_USER=your-smtp-username
   SMTP_PASS=your-smtp-password
   ```
   
   **Client (.env)**
   ```env
   # 💱 Currency Symbol
   VITE_CURRENCY=$

   # 🔐 Clerk Authentication (Public Key for Frontend)
   # Use the SAME publishable key from Clerk Dashboard
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key

   # 🌐 Base API URL (Proxy to Backend)
   VITE_BASE_URL=http://localhost:3000

   # 🎞️ TMDB Image Base URL
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original

   # 💳 Stripe Payment Integration (Frontend)
   # Use the SAME publishable key from Stripe Dashboard
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   ```

   **Important Notes:**
   - MongoDB Atlas is recommended (free tier available)
   - Clerk authentication is REQUIRED for user login/signup
   - Stripe is REQUIRED for payment processing
   - TMDB API is optional (sample data script provided)
   - Inngest and Email are optional features

### Usage

1. **Seed the database with sample movies** (First time only)
   ```console
   cd server
   node seedDatabaseSimple.js
   ```
   This will populate your database with 6 popular movies and their show times.

2. **Start the development servers**
   
   **Terminal 1 - Server**
   ```console
   cd server
   npm start
   ```
   
   **Terminal 2 - Client**
   ```console
   cd client
   npm run dev
   ```

3. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

4. **Admin Access**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Navigate to Users → Select your user
   - Edit "Private metadata" and add: `{"role": "admin"}`
   - Access admin panel at `http://localhost:5173/admin`

### Database Seeding

**Option 1: Fetch Latest Movies from TMDB (Recommended)**

Automatically fetch the latest "Now Playing" movies:

```bash
cd server
npm run fetch-movies
```

This will fetch 10 latest movies from TMDB with real data, posters, and cast information.

**Option 2: Use Sample Data**

To populate your database with 6 hardcoded sample movies:

```bash
cd server
npm run seed
```

This will add sample movies (Venom, Gladiator II, The Wild Robot, Moana 2, etc.) with show times.

### Automatic Movie Updates

Keep your movie catalog fresh by scheduling automatic updates:

```bash
# Update movies daily
cd server
npm run update-movies

# Clear and refresh all movies
npm run update-movies -- --clear

# Fetch specific number of movies
npm run update-movies -- --count=20
```

See `MOVIE_UPDATES.md` for detailed instructions on scheduling automatic updates.

### Testing Payments

Use Stripe test cards for payment testing:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, and any ZIP code.

---

## Features

### User Features
- **Authentication**: Secure user registration and login
- **Movie Browsing**: Search and filter movies by genre, rating, and release date
- **Movie Details**: View comprehensive movie information, trailers, and reviews
- **Seat Selection**: Interactive theater seat map with real-time availability
- **Booking Management**: View and manage personal bookings
- **Favorites**: Save favorite movies for quick access
- **Payment Processing**: Secure checkout with Stripe integration

### Admin Features
- **Dashboard Analytics**: Comprehensive booking and revenue analytics
- **Show Management**: Add, edit, and remove movie shows
- **Booking Overview**: View and manage all user bookings
- **Movie Management**: Add new movies with details and media
- **Theater Management**: Configure theater layouts and seat arrangements

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live seat availability updates
- **Image Optimization**: Cloudinary integration for media management
- **Background Jobs**: Inngest for handling asynchronous tasks
- **Data Validation**: Comprehensive input validation and sanitization
- **Error Handling**: Robust error handling and user feedback

---

## Project Structure

```groovy
quickshow/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── admin/         # Admin-specific components
│   │   │   └── ...
│   │   ├── pages/             # Page components
│   │   │   ├── admin/         # Admin pages
│   │   │   └── ...
│   │   ├── context/           # React Context providers
│   │   ├── lib/               # Utility functions
│   │   └── assets/            # Static assets
│   ├── public/                # Public assets
│   └── package.json
├── server/                    # Backend Node.js application
│   ├── controllers/           # Route controllers
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   ├── middleware/            # Custom middleware
│   ├── configs/               # Configuration files
│   ├── inngest/               # Background job handlers
│   └── package.json
└── README.md
```

---

## API Documentation

### Authentication Endpoints
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Movie & Show Endpoints
- `GET /api/shows` - Get all shows
- `GET /api/shows/:id` - Get show details
- `POST /api/admin/shows` - Create new show (Admin)
- `PUT /api/admin/shows/:id` - Update show (Admin)
- `DELETE /api/admin/shows/:id` - Delete show (Admin)

### Booking Endpoints
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/admin/bookings` - Get all bookings (Admin)
- `PUT /api/bookings/:id` - Update booking status

### Payment Endpoints
- `POST /api/bookings/create-payment-intent` - Create Stripe payment intent
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

---

## Configuration

### Environment Variables

| Variable                 | Description                                            | Required |
| ------------------------ | ------------------------------------------------------ | -------- |
| `MONGODB_URI`            | MongoDB connection string                              | ✅        |
| `CLERK_PUBLISHABLE_KEY`  | Clerk frontend (public) key for user authentication    | ✅        |
| `CLERK_SECRET_KEY`       | Clerk backend secret key for server‑side auth          | ✅        |
| `INNGEST_EVENT_KEY`      | Inngest event key for scheduling/triggering jobs       | ✅        |
| `INNGEST_SIGNING_KEY`    | Inngest signing key to verify incoming events          | ✅        |
| `TMDB_API_KEY`           | TMDB API key for fetching movie metadata & posters     | ✅        |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable (public) key for frontend payments  | ✅        |
| `STRIPE_SECRET_KEY`      | Stripe secret key for server‑side payment logic        | ✅        |
| `STRIPE_WEBHOOK_SECRET`  | Stripe webhook secret for verifying webhook signatures | ✅        |
| `SENDER_EMAIL`           | “From” email address for transactional emails          | ✅        |
| `SMTP_USER`              | SMTP username (e.g., SendGrid / Mailgun)               | ✅        |
| `SMTP_PASS`              | SMTP password / API token                              | ✅        |



## Quick Start Guide

### Minimum Setup (5 minutes)

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd quickshow
   cd server && npm install
   cd ../client && npm install
   ```

2. **Set up MongoDB Atlas** (Free)
   - Sign up at https://www.mongodb.com/cloud/atlas/register
   - Create a free M0 cluster
   - Get connection string and add to `server/.env`

3. **Set up Clerk** (Free)
   - Sign up at https://clerk.com
   - Create an application
   - Copy keys to both `.env` files

4. **Set up Stripe** (Free test mode)
   - Sign up at https://stripe.com
   - Get test API keys from dashboard
   - Add to both `.env` files

5. **Seed Database**
   ```bash
   cd server
   node seedDatabaseSimple.js
   ```

6. **Start Servers**
   ```bash
   # Terminal 1
   cd server && npm start
   
   # Terminal 2
   cd client && npm run dev
   ```

7. **Visit** http://localhost:5173 🎉

### Troubleshooting

**No movies showing?**
- Run `node seedDatabaseSimple.js` in the server directory
- Check MongoDB connection in server logs

**Can't sign in?**
- Verify Clerk keys in both `.env` files
- Check that keys match in Clerk Dashboard

**Payment not working?**
- Verify Stripe keys in both `.env` files
- For local testing, run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

**Need admin access?**
- Go to Clerk Dashboard → Users → Your User
- Edit Private Metadata: `{"role": "admin"}`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



</div>


