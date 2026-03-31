import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { CheckIcon, DeleteIcon, StarIcon, ZapIcon } from "lucide-react";
import { kConverter } from "../../lib/kConverter";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddShows = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [addingShow, setAddingShow] = useState(false);

  const fetchNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get("/api/show/now-playing", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setNowPlayingMovies(data.movies);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      setAddingShow(true);

      if (
        !selectedMovie ||
        Object.keys(dateTimeSelection).length === 0 ||
        !showPrice
      ) {
        return toast("Missing required fields");
      }

      const showsInput = Object.entries(dateTimeSelection).map(
        ([date, time]) => ({ date, time })
      );

      const payload = {
        movieId: selectedMovie,
        showsInput,
        showPrice: Number(showPrice),
      };

      const { data } = await axios.post("/api/show/add", payload, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        toast.success(data.message);
        setSelectedMovie(null);
        setDateTimeSelection({});
        setShowPrice("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
    }

    setAddingShow(false);
  };

  useEffect(() => {
    if (user) {
      fetchNowPlayingMovies();
    }
  }, [user]);

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />

      <div className="flex items-center gap-3 mt-12">
        <div className="h-5 w-1 bg-gradient-to-b from-primary to-accent rounded-full"></div>
        <p className="text-lg font-semibold text-gray-200">Now Playing Movies</p>
      </div>
      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-2 transition-all duration-400`}
              onClick={() => setSelectedMovie(movie.id)}
            >
              <div className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedMovie === movie.id
                  ? "border-primary glow-cyan"
                  : "border-transparent hover:border-accent/30"
              }`}>
                <img
                  src={image_base_url + movie.poster_path}
                  alt="movie_poster"
                  className="w-full object-cover brightness-85"
                />
                <div className="text-xs flex items-center justify-between p-2 bg-surface/80 backdrop-blur-sm w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-3.5 h-3.5 text-primary fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-500">
                    {kConverter(movie.vote_count)} Votes
                  </p>
                </div>
              </div>
              {selectedMovie === movie.id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-gradient-to-br from-primary to-accent h-6 w-6 rounded-lg shadow-[0_0_8px_rgba(0,229,255,0.5)]">
                  <CheckIcon className="w-4 h-4 text-[#0B0914]" strokeWidth={3} />
                </div>
              )}
              <p className="font-medium truncate mt-2 text-gray-200 text-sm">{movie.title}</p>
              <p className="text-gray-500 text-xs">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Show Price Input */}
      <div className="mt-10">
        <label className="block text-xs font-semibold mb-3 text-gray-400 uppercase tracking-wider">Show Price</label>
        <div className="inline-flex items-center gap-2 glass-card px-4 py-3 rounded-xl">
          <p className="text-primary text-sm font-bold">{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="outline-none bg-transparent text-gray-200 placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="mt-8">
        <label className="block text-xs font-semibold mb-3 text-gray-400 uppercase tracking-wider">
          Select Date and Time
        </label>
        <div className="inline-flex gap-4 glass-card p-2 pl-4 rounded-xl">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none bg-transparent text-gray-200 rounded-md"
          />
          <button
            onClick={handleDateTimeAdd}
            className="btn-neon px-4 py-2 text-sm rounded-xl cursor-pointer flex items-center gap-1"
          >
            <ZapIcon className="w-3 h-3" />
            Add Time
          </button>
        </div>
      </div>

      {/* Display Selected Times */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-gray-300 font-medium">Selected Date-Time</h2>
          <ul className="space-y-4">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date}>
                <div className="font-semibold text-primary text-sm">{date}</div>
                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="border border-accent/30 bg-accent/5 px-3 py-1.5 flex items-center rounded-lg text-gray-300"
                    >
                      <span>{time}</span>
                      <DeleteIcon
                        onClick={() => handleRemoveTime(date, time)}
                        width={15}
                        className="ml-2 text-red-400 hover:text-red-300 cursor-pointer transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={addingShow}
        className="btn-neon px-10 py-3 mt-8 rounded-full cursor-pointer transition-all flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ZapIcon className="w-4 h-4" />
        Add Show
      </button>
    </>
  ) : (
    <Loading />
  );
};

export default AddShows;
