import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";

const ListShows = () => {
  const { axios, getToken, user } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShow = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-shows", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setShows(data.shows);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllShow();
    }
  }, [user]);

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />
      <div className="max-w-4xl mt-8 overflow-x-auto rounded-2xl border border-accent/15">
        <table className="w-full border-collapse text-nowrap">
          <thead>
            <tr className="bg-gradient-to-r from-primary/10 to-accent/10 text-left">
              <th className="p-3 font-semibold pl-6 text-sm text-gray-300">Movie Name</th>
              <th className="p-3 font-semibold text-sm text-gray-300">Show Time</th>
              <th className="p-3 font-semibold text-sm text-gray-300">Total Bookings</th>
              <th className="p-3 font-semibold text-sm text-gray-300">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show, index) => (
              <tr
                key={index}
                className="border-b border-accent/10 bg-surface/30 even:bg-accent/5 hover:bg-primary/5 transition-colors duration-200"
              >
                <td className="p-3 min-w-45 pl-6 text-gray-200">{show.movie.title}</td>
                <td className="p-3 text-gray-400">{dateFormat(show.showDateTime)}</td>
                <td className="p-3">
                  <span className="text-primary font-semibold">
                    {Object.keys(show.occupiedSeats).length}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-accent font-semibold">
                    {currency}{" "}
                    {Object.keys(show.occupiedSeats).length * show.showPrice}
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

export default ListShows;
