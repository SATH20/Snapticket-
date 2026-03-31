import { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon } from "lucide-react";

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-24 overflow-hidden">
      <div className="flex items-center gap-3 max-w-[960px] mx-auto">
        <div className="h-6 w-1 bg-gradient-to-b from-accent to-primary rounded-full"></div>
        <p className="text-gray-200 font-semibold text-lg tracking-wide">
          Trailers
        </p>
      </div>

      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" color="cyan" />
        <BlurCircle bottom="-50px" left="-50px" color="violet" />
        <div className="relative rounded-2xl overflow-hidden border border-accent/15 mx-auto max-w-[960px] glow-violet">
          <ReactPlayer
            url={currentTrailer.videoUrl}
            controls={false}
            className="mx-auto max-w-full"
            width="960px"
            height="540px"
          />
        </div>
      </div>

      <div className="group grid grid-cols-4 gap-4 md:gap-8 mt-10 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            className="relative group/thumb group-hover:not-hover:opacity-40 hover:-translate-y-2 duration-400 transition-all max-md:h-60 md:max-h-60 cursor-pointer rounded-xl overflow-hidden border border-transparent hover:border-primary/40 hover:glow-cyan"
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt="trailer"
              className="w-full h-full object-cover brightness-60 group-hover/thumb:brightness-90 transition-all duration-400"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent"></div>
            <PlayCircleIcon
              strokeWidth={1.2}
              className="absolute top-1/2 left-1/2 w-8 md:w-10 h-8 md:h-10 transform -translate-x-1/2 -translate-y-1/2 text-primary drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailersSection;
