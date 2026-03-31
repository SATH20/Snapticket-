import { assets } from "../assets/assets";
import { ZapIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-36 mt-40 w-full text-gray-400 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-accent/15 pb-14 pt-10">
        <div className="md:max-w-96">
          <img className="w-40 h-auto" src={assets.logo} alt="SnapTicket" />
          <p className="mt-6 text-sm text-gray-500 leading-relaxed">
            SnapTicket is your gateway to cinematic experiences. Book tickets
            instantly, discover new releases, and never miss a show. Built for
            movie lovers, by movie lovers.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <img
              src={assets.googlePlay}
              alt="google play"
              className="h-9 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            />
            <img
              src={assets.appStore}
              alt="app store"
              className="h-9 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5 text-gray-200 flex items-center gap-2">
              <ZapIcon className="w-4 h-4 text-primary" />
              Company
            </h2>
            <ul className="text-sm space-y-3 text-gray-500">
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">About us</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">Contact us</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-200 flex items-center gap-2">
              <ZapIcon className="w-4 h-4 text-accent" />
              Get in touch
            </h2>
            <div className="text-sm space-y-3 text-gray-500">
              <p className="hover:text-primary transition-colors duration-300">+250-784-652-570</p>
              <p className="hover:text-primary transition-colors duration-300">hello@snapticket.dev</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-5 text-center text-xs pb-6 text-gray-600">
        © {new Date().getFullYear()} <span className="text-primary/60">SnapTicket</span>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
