import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-accent/15 bg-surface/80 backdrop-blur-xl">
      <Link to="/">
        <img src={assets.logo} alt="SnapTicket" className="w-36 h-auto" />
      </Link>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
        <span className="text-xs text-gray-500 tracking-widest uppercase">Admin Panel</span>
      </div>
    </div>
  );
};

export default AdminNavbar;
