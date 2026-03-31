import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight, CalendarIcon, ClockIcon, ZapIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className='relative flex flex-col items-start justify-center gap-5 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen overflow-hidden'>
      {/* Cyberpunk overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914] via-[#0B0914]/60 to-transparent z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0914]/80 to-transparent z-0"></div>

      {/* Scan line decorative */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-5">
        <div className="w-full h-full" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.03) 2px, rgba(0,229,255,0.03) 4px)'}}></div>
      </div>

      <div className="relative z-10">
        <img
          src={assets.marvelLogo}
          alt="Studio Logo"
          className="max-h-11 lg:h-11 mt-20 opacity-80"
        />

        <h1 className="text-5xl md:text-[72px] md:leading-[1.1] font-bold mt-4 tracking-tight">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Guardians
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent glow-text-cyan">
            of the Galaxy
          </span>
        </h1>

        <div className="flex items-center gap-4 text-gray-400 mt-4 text-sm">
          <span className="px-3 py-1 rounded-full border border-accent/30 bg-accent/5">Action</span>
          <span className="px-3 py-1 rounded-full border border-accent/30 bg-accent/5">Adventure</span>
          <span className="px-3 py-1 rounded-full border border-accent/30 bg-accent/5">Sci-Fi</span>
          <div className="flex items-center gap-1 text-gray-500">
            <CalendarIcon className="w-4 h-4 text-primary/60" /> 2018
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <ClockIcon className="w-4 h-4 text-primary/60" /> 2h 8m
          </div>
        </div>

        <p className="max-w-lg text-gray-400 mt-4 leading-relaxed">
          In a post-apocalyptic world where cities ride on wheels and consume each
          other to survive, two people meet in London and try to stop a
          conspiracy.
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="btn-neon flex items-center gap-2 px-8 py-3.5 mt-6 text-sm rounded-full cursor-pointer"
        >
          <ZapIcon className="w-4 h-4" />
          Explore Movies
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
