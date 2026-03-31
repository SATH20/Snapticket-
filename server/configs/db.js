import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("⚠️  MongoDB URI not configured. Running without database.");
      return;
    }
    
    mongoose.connection.on("connected", () =>
      console.log("✅ Database connected")
    );
    
    mongoose.connection.on("error", (err) => {
      console.log("❌ Database connection error:", err.message);
    });
    
    await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
  } catch (error) {
    console.log("❌ Database connection failed:", error.message);
    console.log("⚠️  Server will continue without database connection.");
  }
};

export default connectDB;
