import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import timeFormat from "../lib/timeFormat";
import { useAppContext } from "../context/AppContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const { image_base_url } = useAppContext();

  return (
    <div className="glass-card flex flex-col justify-between p-3 rounded-2xl w-66 group">
      <div className="relative overflow-hidden rounded-xl">
        <img
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          src={image_base_url + movie.backdrop_path}
          alt="poster"
          className="rounded-xl h-52 w-full object-cover object-right-bottom cursor-pointer transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
      </div>

      <p className="font-semibold mt-3 truncate text-gray-100">{movie.title}</p>

      <p className="text-xs text-gray-500 mt-2 tracking-wide">
        {new Date(movie.release_date).getFullYear()} •{" "}
        {movie.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join(" | ")}{" "}
        • {timeFormat(movie.runtime)}
      </p>

      <div className="flex items-center justify-between mt-4 pb-2">
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className="btn-neon px-5 py-2 text-xs rounded-full cursor-pointer"
        >
          Buy Tickets
        </button>
        <p className="flex items-center gap-1 text-sm text-gray-400">
          <StarIcon className="w-4 h-4 text-primary fill-primary drop-shadow-[0_0_6px_rgba(0,229,255,0.5)]" />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
