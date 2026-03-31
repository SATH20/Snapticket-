import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon, ZapIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const {
    shows,
    axios,
    getToken,
    user,
    fetchFavoriteMovies,
    favoriteMovies,
    image_base_url,
  } = useAppContext();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async () => {
    try {
      if (!user) return toast.error("Please login to proceed");

      const { data } = await axios.post(
        "/api/user/update-favorite",
        { movieId: id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        await fetchFavoriteMovies();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto">
        {/* Poster with glow border */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-primary/40 to-accent/40 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <img
            src={image_base_url + show.movie.poster_path}
            alt="poster"
            className="relative max-md:mx-auto rounded-2xl h-104 max-w-70 object-cover border border-accent/20"
          />
        </div>

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" color="violet" />
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-semibold">English</p>
          <h1 className="text-4xl font-bold max-w-96 text-balance bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400">
            <StarIcon className="w-5 h-5 text-primary fill-primary drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]" />
            <span className="text-primary font-semibold">{show.movie.vote_average.toFixed(1)}</span>
            <span className="text-gray-500">User Rating</span>
          </div>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-xl">
            {show.movie.overview}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-400">
            <span className="px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
              {timeFormat(show.movie.runtime)}
            </span>
            {show.movie.genres.map((genre) => (
              <span key={genre.id} className="px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
                {genre.name}
              </span>
            ))}
            <span className="px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
              {show.movie.release_date.split("-")[0]}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-4 mt-6">
            <button className="flex items-center gap-2 px-7 py-3 text-sm bg-surface-light hover:bg-surface border border-accent/20 hover:border-primary/40 transition-all duration-300 rounded-full font-medium cursor-pointer active:scale-95 text-gray-300">
              <PlayCircleIcon className="w-5 h-5 text-primary" />
              Watch Trailer
            </button>
            <a
              href="#dateSelect"
              className="btn-neon px-10 py-3 text-sm rounded-full font-medium cursor-pointer active:scale-95 flex items-center gap-2"
            >
              <ZapIcon className="w-4 h-4" />
              Buy Tickets
            </a>
            <button
              onClick={handleFavorite}
              className="bg-surface-light border border-accent/20 hover:border-primary/40 p-3 rounded-full transition-all duration-300 cursor-pointer active:scale-95 group/fav"
            >
              <Heart
                className={`w-5 h-5 transition-all duration-300 ${
                  favoriteMovies.find((movie) => movie._id === id)
                    ? "fill-accent text-accent drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]"
                    : "text-gray-500 group-hover/fav:text-primary"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-24">
        <div className="h-5 w-1 bg-gradient-to-b from-primary to-accent rounded-full"></div>
        <p className="text-lg font-semibold text-gray-200">Your Favorite Cast</p>
      </div>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-6 w-max px-4">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-sm"></div>
                <img
                  src={image_base_url + cast.profile_path}
                  alt="profile"
                  className="relative rounded-full h-20 aspect-square object-cover border-2 border-surface-light group-hover:border-primary/40 transition-all duration-400"
                />
              </div>
              <p className="font-medium text-xs mt-3 text-gray-400 group-hover:text-primary transition-colors duration-300">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <div className="flex items-center gap-3 mt-24 mb-8">
        <div className="h-5 w-1 bg-gradient-to-b from-accent to-primary rounded-full"></div>
        <p className="text-lg font-semibold text-gray-200">You May Also Like</p>
      </div>

      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {shows.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="group flex items-center gap-2 px-10 py-3 text-sm border border-accent/30 bg-accent/5 hover:bg-accent/15 transition-all duration-300 rounded-full font-medium cursor-pointer text-gray-300 hover:text-white hover:border-primary/50"
        >
          <ZapIcon className="w-4 h-4 text-primary" />
          Show more
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
