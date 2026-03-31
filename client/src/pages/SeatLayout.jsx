import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon, ZapIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  const navigate = useNavigate();

  const { axios, getToken, user } = useAppContext();

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

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can only select 5 seats");
    }
    if (occupiedSeats.includes(seatId)) {
      return toast("This seat is already booked");
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          const isSelected = selectedSeats.includes(seatId);
          const isOccupied = occupiedSeats.includes(seatId);
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-9 w-9 rounded-lg text-xs font-medium cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "bg-gradient-to-br from-primary to-accent text-[#0B0914] font-bold shadow-[0_0_12px_rgba(0,229,255,0.5)]"
                  : isOccupied
                  ? "bg-surface-light/50 border border-gray-700/30 opacity-30 cursor-not-allowed text-gray-600"
                  : "border border-accent/30 bg-accent/5 hover:border-primary/50 hover:bg-primary/10 text-gray-400 hover:text-primary"
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(
        `/api/booking/seats/${selectedTime.showId}`
      );
      if (data.success) {
        setOccupiedSeats(data.occupiedSeats);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookTickets = async () => {
    try {
      if (!user) return toast.error("Please login to proceed");

      if (!selectedTime || !selectedSeats.length)
        return toast.error("Please select a time and seats");

      const { data } = await axios.post(
        "/api/booking/create",
        { showId: selectedTime.showId, selectedSeats },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getShow();
  }, []);

  useEffect(() => {
    if (selectedTime) {
      getOccupiedSeats();
    }
  }, [selectedTime]);

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 gap-8">
      {/* Available Timings */}
      <div className="w-64 glass-card rounded-2xl py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6 text-gray-200 flex items-center gap-2">
          <div className="h-5 w-1 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          Timings
        </p>
        <div className="mt-5 space-y-1">
          {show.dateTime[date].map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all duration-300 ${
                selectedTime?.time === item.time
                  ? "bg-gradient-to-r from-primary/20 to-accent/10 text-primary border-l-2 border-primary glow-text-cyan"
                  : "text-gray-400 hover:bg-accent/5 hover:text-gray-200 border-l-2 border-transparent"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm font-medium">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats Layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-10">
        <BlurCircle top="-100px" left="-100px" color="cyan" />
        <BlurCircle bottom="0" right="0" color="violet" />
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Select your seat
        </h1>

        {/* Screen indicator */}
        <div className="relative w-full max-w-md mb-8">
          <img src={assets.screenImage} alt="screen" className="w-full opacity-60" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
        </div>
        <p className="text-primary/40 text-xs tracking-[0.4em] uppercase mb-10">Screen Side</p>

        <div className="flex flex-col items-center text-xs text-gray-400">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-12 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-accent/30 bg-accent/5"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-primary to-accent"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-surface-light/50 border border-gray-700/30 opacity-30"></div>
            <span>Booked</span>
          </div>
        </div>

        <button
          onClick={bookTickets}
          className="btn-neon flex items-center gap-2 mt-16 px-12 py-3.5 text-sm rounded-full font-semibold cursor-pointer"
        >
          <ZapIcon className="w-4 h-4" />
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={2.5} className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
