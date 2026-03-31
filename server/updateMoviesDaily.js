#!/usr/bin/env node
/**
 * Daily Movie Update Script
 * 
 * This script fetches the latest movies from TMDB and updates the database.
 * Can be run manually or scheduled as a cron job/task scheduler.
 * 
 * Usage:
 *   node updateMoviesDaily.js
 * 
 * Options:
 *   --clear    Clear all existing movies before adding new ones
 *   --count=N  Number of movies to fetch (default: 10)
 */

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import axios from "axios";
import Movie from "./models/Movie.js";
import Show from "./models/Show.js";

const args = process.argv.slice(2);
const shouldClear = args.includes("--clear");
const countArg = args.find((arg) => arg.startsWith("--count="));
const movieCount = countArg ? parseInt(countArg.split("=")[1]) : 10;

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`);
    console.log("✅ Database connected");
  } catch (error) {
    console.log("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

const updateMovies = async () => {
  try {
    await connectDB();

    console.log(`\n🎬 Fetching latest ${movieCount} movies from TMDB...`);
    console.log(`📅 ${new Date().toLocaleString()}\n`);

    if (shouldClear) {
      await Movie.deleteMany({});
      await Show.deleteMany({});
      console.log("🗑️  Cleared existing data\n");
    }

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
    } catch (error) {
      if (error.response?.status === 401) {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
          { timeout: 10000 }
        );
        moviesData = data;
      } else {
        throw error;
      }
    }

    const movieIds = moviesData.results.slice(0, movieCount).map((m) => m.id);
    let addedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < movieIds.length; i++) {
      const movieId = movieIds[i];
      try {
        // Check if movie already exists
        const existingMovie = await Movie.findById(movieId);
        if (existingMovie && !shouldClear) {
          skippedCount++;
          continue;
        }

        // Fetch movie details
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

        await Movie.create(movieDetails);
        console.log(`✅ [${i + 1}/${movieIds.length}] ${movieApiData.title}`);

        // Create shows for the next 7 days
        const showsToCreate = [];
        const today = new Date();
        const showTimes = ["10:00", "13:30", "17:00", "20:30"];

        for (let day = 0; day < 7; day++) {
          const showDate = new Date(today);
          showDate.setDate(today.getDate() + day);
          const dateString = showDate.toISOString().split("T")[0];

          showTimes.forEach((time) => {
            showsToCreate.push({
              movie: movieId,
              showDateTime: new Date(`${dateString}T${time}`),
              showPrice: Math.floor(Math.random() * 6) + 10,
              occupiedSeats: {},
            });
          });
        }

        await Show.insertMany(showsToCreate);
        addedCount++;

        // Rate limiting delay
        if (i < movieIds.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.log(`❌ [${i + 1}/${movieIds.length}] Error: ${error.message}`);
        errorCount++;
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log("📊 Summary:");
    console.log(`   ✅ Added: ${addedCount} movies`);
    console.log(`   ⏭️  Skipped: ${skippedCount} (already exist)`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log("=".repeat(50) + "\n");

    if (addedCount > 0) {
      console.log("🎉 Database updated successfully!");
      console.log("🌐 New movies are now available in your app");
    } else {
      console.log("ℹ️  No new movies added");
    }

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Fatal error:", error.message);
    process.exit(1);
  }
};

updateMovies();
