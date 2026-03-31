import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import { requireAuth } from "@clerk/express"; // Updated import for v1.7.37
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

const app = express();
const port = 3000;

console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);

await connectDB();

// Stripe Webhooks
app.use(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

app.use(express.json());
app.use(cors());

// Make Clerk authentication optional (allows public access to movie data)
// Individual routes can still require authentication using their own middleware
// app.use(requireAuth()); // Commented out to allow public access

app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`✅ Server listening at http://localhost:${port}`);
});