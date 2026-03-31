import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
      color: "primary",
    },
    {
      title: "Total Revenue",
      value: currency + dashboardData.totalRevenue || "0",
      icon: CircleDollarSignIcon,
      color: "accent",
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || "0",
      icon: PlayCircleIcon,
      color: "primary",
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
      color: "accent",
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />
      <div className="relative flex flex-wrap gap-5 mt-8">
        <BlurCircle top="-100px" left="0" color="violet" />
        <div className="flex flex-wrap gap-5 w-full">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="glass-card flex items-center justify-between px-5 py-4 rounded-2xl max-w-56 w-full group hover:border-primary/40"
            >
              <div>
                <h1 className="text-xs text-gray-500 uppercase tracking-wider">{card.title}</h1>
                <p className={`text-2xl font-bold mt-2 ${card.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                  {card.value}
                </p>
              </div>
              <card.icon className={`w-7 h-7 ${card.color === 'primary' ? 'text-primary/40 group-hover:text-primary' : 'text-accent/40 group-hover:text-accent'} transition-colors duration-300`} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-14">
        <div className="h-5 w-1 bg-gradient-to-b from-primary to-accent rounded-full"></div>
        <p className="text-lg font-semibold text-gray-200">Active Shows</p>
      </div>
      <div className="relative flex flex-wrap gap-6 mt-6 max-w-5xl">
        <BlurCircle top="100px" left="-10%" color="cyan" />
        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="glass-card w-55 rounded-2xl overflow-hidden h-full pb-4 group"
          >
            <div className="relative overflow-hidden">
              <img
                src={image_base_url + show.movie.poster_path}
                alt="poster"
                className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60"></div>
            </div>
            <p className="font-semibold p-3 pb-0 truncate text-gray-200">{show.movie.title}</p>
            <div className="flex items-center justify-between px-3 mt-1">
              <p className="text-lg font-bold text-primary">
                {currency} {show.showPrice}
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-400">
                <StarIcon className="w-4 h-4 text-primary fill-primary drop-shadow-[0_0_6px_rgba(0,229,255,0.5)]" />
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className="px-3 pt-2 text-xs text-gray-500">
              {dateFormat(show.showDateTime)}
            </p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
