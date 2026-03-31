# Stripe Payment Integration Setup Guide

## Quick Setup Steps

### 1. Get Your Stripe API Keys

1. Go to https://stripe.com and create a free account
2. Navigate to **Developers** → **API keys**
3. Copy these two keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)

### 2. Update Environment Files

#### Server (.env)
```env
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

#### Client (.env)
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

### 3. Set Up Webhooks (for payment confirmations)

#### Option A: Using Stripe CLI (Recommended for local development)

1. **Install Stripe CLI**:
   ```bash
   # Windows (using winget)
   winget install stripe
   
   # Or download from: https://github.com/stripe/stripe-cli/releases/latest
   ```

2. **Login to Stripe**:
   ```bash
   stripe login
   ```

3. **Forward webhooks to your local server**:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   
   This will output a webhook secret like: `whsec_xxxxxxxxxxxxx`

4. **Copy the webhook secret** to `server/.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

#### Option B: Using Stripe Dashboard (for production)

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your webhook URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `payment_intent.succeeded`
5. Copy the **Signing secret** to your `.env` file

### 4. Restart Your Servers

After updating the `.env` files, restart both servers:

```bash
# Stop current servers (Ctrl+C in each terminal)

# Restart backend
cd server
npm start

# Restart frontend (in another terminal)
cd client
npm run dev
```

## How It Works

### Payment Flow:

1. **User selects seats** → Frontend sends booking request
2. **Backend creates booking** → Generates Stripe checkout session
3. **User redirected to Stripe** → Secure payment page
4. **Payment completed** → Stripe sends webhook to your server
5. **Webhook confirms payment** → Booking marked as paid
6. **Confirmation email sent** → User receives booking details

### Test Cards

Use these test card numbers in Stripe's test mode:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, and any ZIP code.

## Troubleshooting

### "No such API key"
- Make sure you copied the correct secret key from Stripe
- Check that there are no extra spaces in your `.env` file

### "Webhook signature verification failed"
- Ensure Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Copy the webhook secret from the CLI output to your `.env` file
- Restart your backend server

### Payment succeeds but booking not confirmed
- Check that webhook endpoint is accessible
- Verify `STRIPE_WEBHOOK_SECRET` is set correctly
- Check server logs for webhook errors

## Testing the Integration

1. Start your app and navigate to a movie
2. Select seats and click "Book Now"
3. You'll be redirected to Stripe checkout
4. Use test card: `4242 4242 4242 4242`
5. Complete the payment
6. You should be redirected back to your app
7. Check "My Bookings" to see the confirmed booking

## Production Deployment

When deploying to production:

1. Switch to **live mode** in Stripe Dashboard
2. Get your **live API keys** (start with `pk_live_` and `sk_live_`)
3. Update production environment variables
4. Set up webhook endpoint in Stripe Dashboard (not CLI)
5. Update webhook URL to your production domain

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Webhook Best Practices](https://stripe.com/docs/webhooks/best-practices)
