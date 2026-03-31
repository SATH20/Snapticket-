import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const { axios, getToken, user } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-bookings", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setBookings(data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      getAllBookings();
    }
  }, [user]);

  return !isLoading ? (
    <>
      <Title text1="List" text2="Bookings" />
      <div className="max-w-4xl mt-8 overflow-x-auto rounded-2xl border border-accent/15">
        <table className="w-full border-collapse text-nowrap">
          <thead>
            <tr className="bg-gradient-to-r from-primary/10 to-accent/10 text-left">
              <th className="p-3 font-semibold pl-6 text-sm text-gray-300">User Name</th>
              <th className="p-3 font-semibold text-sm text-gray-300">Movie Name</th>
              <th className="p-3 font-semibold text-sm text-gray-300">Show Time</th>
              <th className="p-3 font-semibold text-sm text-gray-300">Seats</th>
              <th className="p-3 font-semibold text-sm text-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="border-b border-accent/10 bg-surface/30 even:bg-accent/5 hover:bg-primary/5 transition-colors duration-200"
              >
                <td className="p-3 min-w-45 pl-6 text-gray-200">{item.user.name}</td>
                <td className="p-3 text-gray-300">{item.show.movie.title}</td>
                <td className="p-3 text-gray-400">{dateFormat(item.show.showDateTime)}</td>
                <td className="p-3 text-primary">
                  {Object.keys(item.bookedSeats)
                    .map((seat) => item.bookedSeats[seat])
                    .join(", ")}
                </td>
                <td className="p-3">
                  <span className="text-accent font-semibold">
                    {currency} {item.amount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListBookings;
