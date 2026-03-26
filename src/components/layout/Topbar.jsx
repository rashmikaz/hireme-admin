import { useLocation } from "react-router-dom";
import { Bell, Search, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";

const pageTitles = {
  "/": "Dashboard",
  "/artists": "Artists",
  "/verification": "Verification",
  "/customers": "Users",
  "/bookings": "Bookings",
  "/settings": "Settings",
};

export default function Topbar({ onMenuClick }) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Dashboard";
  const verificationCount = useSelector((s) => s.verification.list.length);
  const [search, setSearch] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-[280px] h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 lg:px-8 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search — hidden on small, visible md+ */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2 w-48 lg:w-72">
          <Search size={15} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400 w-full"
          />
        </div>

        {/* Bell */}
        <button className="relative w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Bell size={17} className="text-gray-600" />
          {verificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full text-white text-[10px] font-bold flex items-center justify-center">
              {verificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
