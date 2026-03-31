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

const fetchLatestMovies = async () => {
  try {
    await connectDB();

    console.log("🎬 Fetching latest movies from TMDB...\n");

    // TMDB API can use either API Key (v3) or Bearer Token (v4)
    // Try Bearer token first (more common for newer apps)
    const tmdbConfig = {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
      timeout: 10000,
    };

    // Fetch now playing movies
    let moviesData;
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        tmdbConfig
      );
      moviesData = data;
      console.log(`✅ Found ${data.results.length} now playing movies\n`);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("⚠️  Bearer token failed, trying API key format...");
        // Try with API key in query parameter
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
          { timeout: 10000 }
        );
        moviesData = data;
        console.log(`✅ Found ${data.results.length} now playing movies\n`);
      } else {
        throw error;
      }
    }

    const movieIds = moviesData.results.slice(0, 10).map((movie) => movie.id);

    // Fetch detailed info for each movie
    for (let i = 0; i < movieIds.length; i++) {
      const movieId = movieIds[i];
      try {
        console.log(`[${i + 1}/${movieIds.length}] Fetching movie ID: ${movieId}...`);

        // Fetch movie details and credits
        const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            tmdbConfig
          ).catch(() =>
            axios.get(
              `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
            )
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
            tmdbConfig
          ).catch(() =>
            axios.get(
              `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
            )
          ),
        ]);

        const movieApiData = movieDetailsResponse.data;
        const movieCreditsData = movieCreditsResponse.data;

        // Check if movie already exists
        const existingMovie = await Movie.findById(movieId);
        if (existingMovie) {
          console.log(`   ⏭️  Movie already exists: ${movieApiData.title}`);
          continue;
        }

        const movieDetails = {
          _id: movieId,
          title: movieApiData.title,
          overview: movieApiData.overview,
          poster_path: movieApiData.poster_path,
          backdrop_path: movieApiData.backdrop_path,
          genres: movieApiData.genres,
          casts: movieCreditsData.cast.slice(0, 10),
          release_date: movieApiData.release_date,
          original_language: movieApiData.original_language,
          tagline: movieApiData.tagline || "",
          vote_average: movieApiData.vote_average,
          runtime: movieApiData.runtime,
        };

        // Add movie to database
        await Movie.create(movieDetails);
        console.log(`   ✅ Added: ${movieApiData.title}`);

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
              showPrice: Math.floor(Math.random() * 6) + 10,
              occupiedSeats: {},
            });
          });
        }

        await Show.insertMany(showsToCreate);
        console.log(`   📅 Added ${showsToCreate.length} shows\n`);

        // Small delay to avoid rate limiting
        if (i < movieIds.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}\n`);
      }
    }

    console.log("🎉 Latest movies fetched successfully!");
    console.log("🌐 Refresh http://localhost:5173 to see the new movies");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fetching movies:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    process.exit(1);
  }
};

fetchLatestMovies();
