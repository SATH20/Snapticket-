import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon, ZapIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const navigate = useNavigate();

  const { favoriteMovies } = useAppContext();

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-4">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

      <Link to="/" className="max-md:flex-1 flex items-center gap-2">
        <img src={assets.logo} alt="SnapTicket" className="w-40 h-auto" />
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur-xl bg-surface/80 md:bg-surface/60 md:border border-accent/20 overflow-hidden transition-[width] duration-500 ease-in-out ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer text-primary hover:text-accent transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        />

        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/"
          className="relative text-gray-300 hover:text-primary transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-accent hover:after:w-full after:transition-all after:duration-300"
        >
          Home
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/movies"
          className="relative text-gray-300 hover:text-primary transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-accent hover:after:w-full after:transition-all after:duration-300"
        >
          Movies
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/"
          className="relative text-gray-300 hover:text-primary transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-accent hover:after:w-full after:transition-all after:duration-300"
        >
          Theaters
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/"
          className="relative text-gray-300 hover:text-primary transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-accent hover:after:w-full after:transition-all after:duration-300"
        >
          Releases
        </Link>
        {favoriteMovies.length > 0 && (
          <Link
            onClick={() => {
              scrollTo(0, 0);
              setIsOpen(false);
            }}
            to="/favorite"
            className="relative text-gray-300 hover:text-primary transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-accent hover:after:w-full after:transition-all after:duration-300"
          >
            Favorites
          </Link>
        )}
      </div>

      <div className="flex items-center gap-6">
        <SearchIcon className="max-md:hidden w-5 h-5 cursor-pointer text-gray-400 hover:text-primary transition-colors duration-300" />
        {!user ? (
          <button
            onClick={openSignIn}
            className="btn-neon px-5 py-2 sm:px-7 sm:py-2.5 rounded-full text-sm flex items-center gap-2 cursor-pointer"
          >
            <ZapIcon className="w-4 h-4" />
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      <MenuIcon
        onClick={() => setIsOpen(!isOpen)}
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer text-primary"
      />
    </div>
  );
};

export default Navbar;
