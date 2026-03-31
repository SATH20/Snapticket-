import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import axios from "axios";
import Movie from "./models/Movie.js";
import Show from "./models/Show.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`);
    console.log("✅ Database connected");
  } catch (error) {
    console.log("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

const seedMovies = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Movie.deleteMany({});
    await Show.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Fetch popular movies from TMDB
    console.log("📥 Fetching movies from TMDB...");
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        timeout: 10000,
      }
    );

    const movieIds = data.results.slice(0, 6).map((movie) => movie.id);
    console.log(`📥 Processing ${movieIds.length} movies...`);

    // Fetch detailed info for each movie with delay
    for (let i = 0; i < movieIds.length; i++) {
      const movieId = movieIds[i];
      try {
        console.log(`\n[${i + 1}/${movieIds.length}] Fetching movie ID: ${movieId}...`);
        
        const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
            timeout: 10000,
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
            timeout: 10000,
          }),
        ]);

        const movieApiData = movieDetailsResponse.data;
        const movieCreditsData = movieCreditsResponse.data;

        const movieDetails = {
          _id: movieId,
          title: movieApiData.title,
          overview: movieApiData.overview,
          poster_path: movieApiData.poster_path,
          backdrop_path: movieApiData.backdrop_path,
          genres: movieApiData.genres,
          casts: movieCreditsData.cast.slice(0, 10), // Top 10 cast members
          release_date: movieApiData.release_date,
          original_language: movieApiData.original_language,
          tagline: movieApiData.tagline || "",
          vote_average: movieApiData.vote_average,
          runtime: movieApiData.runtime,
        };

        // Add movie to database
        await Movie.create(movieDetails);
        console.log(`✅ Added movie: ${movieApiData.title}`);

        // Create shows for the next 7 days
        const showsToCreate = [];
        const today = new Date();
        const showTimes = ["10:00", "13:30", "17:00", "20:30"];

        for (let day = 0; day < 7; day++) {
          const showDate = new Date(today);
          showDate.setDate(today.getDate() + day);
          const dateString = showDate.toISOString().split("T")[0];

          showTimes.forEach((time) => {
            const dateTimeString = `${dateString}T${time}`;
            showsToCreate.push({
              movie: movieId,
              showDateTime: new Date(dateTimeString),
              showPrice: Math.floor(Math.random() * 6) + 10, // Random price between $10-$15
              occupiedSeats: {},
            });
          });
        }

        await Show.insertMany(showsToCreate);
        console.log(`   📅 Added ${showsToCreate.length} shows`);
        
        // Small delay between requests
        if (i < movieIds.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.log(`❌ Error adding movie ${movieId}:`, error.message);
      }
    }

    console.log("\n🎉 Database seeded successfully!");
    console.log("🌐 Visit http://localhost:5173 to see the movies");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedMovies();
