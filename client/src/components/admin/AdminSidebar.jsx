import { assets } from "../../assets/assets";
import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
    { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
    {
      name: "List Bookings",
      path: "/admin/list-bookings",
      icon: ListCollapseIcon,
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-accent/15 bg-surface/50 text-sm">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-sm"></div>
        <img
          className="relative h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto border-2 border-accent/20"
          src={user.imageUrl}
          alt="admin"
        />
      </div>
      <p className="mt-3 text-base max-md:hidden text-gray-300 font-medium">
        {user.firstName} {user.lastName}
      </p>
      <div className="w-full mt-2">
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-3 w-full py-3 min-md:pl-10 first:mt-6 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-primary/10 to-accent/5 text-primary border-l-2 border-primary"
                  : "text-gray-500 hover:text-gray-300 hover:bg-accent/5 border-l-2 border-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_6px_rgba(0,229,255,0.5)]" : ""}`} />
                <p className="max-md:hidden">{link.name}</p>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
