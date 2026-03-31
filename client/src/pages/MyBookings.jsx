import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import { dateFormat } from "../lib/dateFormat";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { TicketIcon, ZapIcon } from "lucide-react";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const { axios, getToken, user, image_base_url } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/user/bookings", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      getMyBookings();
    }
  }, [user]);

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" color="violet" />
      <div>
        <BlurCircle bottom="0px" left="600px" color="cyan" />
      </div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-6 w-1 bg-gradient-to-b from-primary to-accent rounded-full"></div>
        <h1 className="text-lg font-semibold text-gray-200">My Bookings</h1>
      </div>

      {bookings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <TicketIcon className="w-16 h-16 text-accent/20" />
          <p className="text-gray-500">No bookings yet. Start exploring movies!</p>
        </div>
      )}

      {bookings.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between glass-card rounded-2xl mt-4 p-3 max-w-3xl hover:border-primary/30"
        >
          <div className="flex flex-col md:flex-row">
            <img
              src={image_base_url + item.show.movie.poster_path}
              alt="poster"
              className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded-xl"
            />
            <div className="flex flex-col p-4">
              <p className="text-lg font-semibold text-gray-100">{item.show.movie.title}</p>
              <p className="text-gray-500 text-sm">
                {timeFormat(item.show.movie.runtime)}
              </p>
              <p className="text-gray-500 text-sm mt-auto">
                {dateFormat(item.show.showDateTime)}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:items-end md:text-right justify-between p-4">
            <div className="flex items-center gap-4">
              <p className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {currency}
                {item.amount}
              </p>
              {!item.isPaid && (
                <Link
                  to={item.paymentLink}
                  className="btn-neon px-5 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer flex items-center gap-1"
                >
                  <ZapIcon className="w-3 h-3" />
                  Pay Now
                </Link>
              )}
            </div>
            <div className="text-sm">
              <p>
                <span className="text-gray-500">Total Tickets:</span>{" "}
                <span className="text-primary">{item.bookedSeats.length}</span>
              </p>
              <p>
                <span className="text-gray-500">Seat Number:</span>{" "}
                <span className="text-gray-300">{item.bookedSeats.join(", ")}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;
