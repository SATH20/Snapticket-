import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
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

const sampleMovies = [
  {
    _id: 912649,
    title: "Venom: The Last Dance",
    overview: "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
    poster_path: "/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
    backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" }
    ],
    casts: [
      { name: "Tom Hardy", character: "Eddie Brock / Venom" },
      { name: "Chiwetel Ejiofor", character: "Rex Strickland" },
      { name: "Juno Temple", character: "Dr. Teddy Payne" }
    ],
    release_date: "2024-10-22",
    original_language: "en",
    tagline: "Til death do they part.",
    vote_average: 6.8,
    runtime: 109
  },
  {
    _id: 558449,
    title: "Gladiator II",
    overview: "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist.",
    poster_path: "/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    backdrop_path: "/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" }
    ],
    casts: [
      { name: "Paul Mescal", character: "Lucius" },
      { name: "Pedro Pascal", character: "Marcus Acacius" },
      { name: "Denzel Washington", character: "Macrinus" }
    ],
    release_date: "2024-11-13",
    original_language: "en",
    tagline: "What we do in life echoes in eternity.",
    vote_average: 7.2,
    runtime: 148
  },
  {
    _id: 1184918,
    title: "The Wild Robot",
    overview: "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
    poster_path: "/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
    backdrop_path: "/4zlOPT9CrtIX05bBIkYxNZsm5zN.jpg",
    genres: [
      { id: 16, name: "Animation" },
      { id: 878, name: "Science Fiction" },
      { id: 10751, name: "Family" }
    ],
    casts: [
      { name: "Lupita Nyong'o", character: "Roz (voice)" },
      { name: "Pedro Pascal", character: "Fink (voice)" },
      { name: "Kit Connor", character: "Brightbill (voice)" }
    ],
    release_date: "2024-09-12",
    original_language: "en",
    tagline: "Discover your true nature.",
    vote_average: 8.5,
    runtime: 102
  },
  {
    _id: 1034062,
    title: "Moana 2",
    overview: "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
    poster_path: "/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg",
    backdrop_path: "/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg",
    genres: [
      { id: 16, name: "Animation" },
      { id: 12, name: "Adventure" },
      { id: 10751, name: "Family" }
    ],
    casts: [
      { name: "Auli'i Cravalho", character: "Moana (voice)" },
      { name: "Dwayne Johnson", character: "Maui (voice)" },
      { name: "Temuera Morrison", character: "Chief Tui (voice)" }
    ],
    release_date: "2024-11-27",
    original_language: "en",
    tagline: "The ocean is calling them back.",
    vote_average: 7.4,
    runtime: 100
  },
  {
    _id: 933260,
    title: "The Substance",
    overview: "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
    poster_path: "/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
    backdrop_path: "/7h6TqPB3ESmjuVbxCxAeB1c9OB1.jpg",
    genres: [
      { id: 27, name: "Horror" },
      { id: 878, name: "Science Fiction" },
      { id: 53, name: "Thriller" }
    ],
    casts: [
      { name: "Demi Moore", character: "Elisabeth Sparkle" },
      { name: "Margaret Qualley", character: "Sue" },
      { name: "Dennis Quaid", character: "Harvey" }
    ],
    release_date: "2024-09-07",
    original_language: "en",
    tagline: "If you follow the instructions, what could go wrong?",
    vote_average: 7.3,
    runtime: 140
  },
  {
    _id: 1159311,
    title: "My Hero Academia: You're Next",
    overview: "In a society where heroes and villains continuously battle in the name of peace and chaos, Deku, a U.A. High School student who aspires to be the best hero he can be, confronts the villain who imitates the hero he once admired.",
    poster_path: "/8rdB1I7vGqmVAkjcGpOTNdT5GZu.jpg",
    backdrop_path: "/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg",
    genres: [
      { id: 16, name: "Animation" },
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" }
    ],
    casts: [
      { name: "Daiki Yamashita", character: "Izuku Midoriya (voice)" },
      { name: "Nobuhiko Okamoto", character: "Katsuki Bakugo (voice)" },
      { name: "Kenta Miyake", character: "All Might (voice)" }
    ],
    release_date: "2024-08-02",
    original_language: "ja",
    tagline: "Plus Ultra!",
    vote_average: 6.9,
    runtime: 110
  }
];

const seedMovies = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Movie.deleteMany({});
    await Show.deleteMany({});
    console.log("🗑️  Cleared existing data\n");

    // Add movies and shows
    for (const movieData of sampleMovies) {
      try {
        // Add movie to database
        await Movie.create(movieData);
        console.log(`✅ Added movie: ${movieData.title}`);

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
              movie: movieData._id,
              showDateTime: new Date(dateTimeString),
              showPrice: Math.floor(Math.random() * 6) + 10, // Random price between $10-$15
              occupiedSeats: {},
            });
          });
        }

        await Show.insertMany(showsToCreate);
        console.log(`   📅 Added ${showsToCreate.length} shows\n`);
      } catch (error) {
        console.log(`❌ Error adding movie ${movieData.title}:`, error.message);
      }
    }

    console.log("🎉 Database seeded successfully!");
    console.log("🌐 Refresh http://localhost:5173 to see the movies");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedMovies();
