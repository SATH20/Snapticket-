import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ZapIcon } from "lucide-react";
import BlurCircle from "./BlurCircle";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);

  const onBookHandler = () => {
    if (!selected) {
      return toast("Please select a date");
    }
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="pt-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 glass-card rounded-2xl">
        <BlurCircle top="-100px" left="-100px" color="violet" />
        <BlurCircle top="100px" right="0" color="cyan" />
        <div>
          <p className="text-lg font-semibold text-gray-200 flex items-center gap-2">
            <div className="h-5 w-1 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            Choose Date
          </p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} className="text-gray-500 hover:text-primary transition-colors cursor-pointer" />
            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {Object.keys(dateTime).map((date) => (
                <button
                  onClick={() => setSelected(date)}
                  key={date}
                  className={`flex flex-col items-center justify-center h-16 w-16 aspect-square rounded-xl cursor-pointer transition-all duration-300 ${
                    selected === date
                      ? "bg-gradient-to-br from-primary to-accent text-[#0B0914] font-bold glow-cyan"
                      : "border border-accent/30 bg-accent/5 hover:border-primary/50 hover:bg-primary/10 text-gray-300"
                  }`}
                >
                  <span className="text-lg font-bold">{new Date(date).getDate()}</span>
                  <span className="text-[10px] uppercase tracking-wider">
                    {new Date(date).toLocaleString("en-US", { month: "short" })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28} className="text-gray-500 hover:text-primary transition-colors cursor-pointer" />
          </div>
        </div>
        <button
          onClick={onBookHandler}
          className="btn-neon px-10 py-3 mt-6 rounded-full cursor-pointer flex items-center gap-2 text-sm"
        >
          <ZapIcon className="w-4 h-4" />
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
