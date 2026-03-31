import { ArrowRight, ZapIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { useAppContext } from "../context/AppContext";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { shows } = useAppContext();

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <div className="relative flex items-center justify-between pt-24 pb-10">
        <BlurCircle top="0" right="-80px" color="violet" />
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <p className="text-gray-200 font-semibold text-lg tracking-wide">Now Showing</p>
        </div>
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="group flex items-center gap-2 text-sm text-gray-400 hover:text-primary cursor-pointer transition-colors duration-300"
        >
          View All
          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap max-sm:justify-center gap-8 mt-8">
        {shows.slice(0, 4).map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="group flex items-center gap-2 px-10 py-3 text-sm border border-accent/30 bg-accent/5 hover:bg-accent/15 transition-all duration-300 rounded-full font-medium cursor-pointer text-gray-300 hover:text-white hover:border-primary/50 hover:glow-cyan"
        >
          <ZapIcon className="w-4 h-4 text-primary" />
          Show more
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
