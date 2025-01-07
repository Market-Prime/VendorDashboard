import React, { useState } from "react";
import { FaBell, FaCaretDown } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      console.log("Search query:", searchQuery); // Replace with actual search functionality
      setSearchQuery("");
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between bg-blue-600 shadow-md px-4 py-3 w-full md:w-full">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img
          src={logo}
          alt="MarketPrime Logo"
          className="w-8 h-8 sm:w-10 sm:h-10"
        />
        <h1 className="text-lg font-bold text-white hidden lg:block">
          MarketPrime
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent md:text-base"
        />
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        {/* Current Date */}
        <span className="text-white text-sm hidden lg:inline">
          {currentDate}
        </span>

        {/* Notifications Icon */}
        <button className="relative text-white hover:text-blue-300">
          <FaBell size={20} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Avatar and Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src={logo} // Replace with user's avatar
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <span className="text-white font-medium text-sm hidden md:inline">
              Gavano
            </span>
            <FaCaretDown className="text-white" />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                onClick={() => console.log("Profile Settings clicked")}
              >
                Profile Settings
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                onClick={() => console.log("Logout clicked")}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
