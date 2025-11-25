import React from "react";
import { ChevronDown } from "lucide-react";
import LogoSvg from "../../../assets/Logo.svg"; // adjust path if needed
//import UserImg from "../../../assets/images/user-avatar.jpg"; // placeholder, replace with real path

const Navbar: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <img src={LogoSvg} alt="Alento" width={120} height={24} className="block" />
        </div>

        {/* Right: User + optional actions */}
        <div className="flex items-center gap-4">
          {/* optional area for buttons/notifications if needed */}
          <div className="flex items-center gap-3">
            <button
              className="text-sm text-gray-600 hover:text-gray-800 transition hidden md:inline"
              aria-label="Help"
            >
              {/* placeholder if you want a help icon */}
            </button>
          </div>

          {/* User area */}
          <div
            className="flex items-center gap-3 px-3 py-1 rounded-md hover:bg-gray-50 cursor-pointer select-none"
            role="button"
            tabIndex={0}
          >
            {/* <img
              src={UserImg}
              alt="User avatar"
              className="w-9 h-9 rounded-full object-cover"
            /> */}
            <span className="text-sm text-gray-800 hidden sm:inline">Steve Rogers</span>
            <ChevronDown size={16} className="text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
