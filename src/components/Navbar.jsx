import { useState } from "react";
import PropTypes from "prop-types";
import { FaBell, FaCaretDown } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./logoutBtn";
import { MdMenu } from "react-icons/md";

const Navbar = ({ profileData, onToggleSidebar, isCollapsed }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      console.log("Search query:", searchQuery);
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
      <div className="flex items-center space-x-3 md:hidden">
        <button
          onClick={onToggleSidebar}
          className="text-blue-900 hover:bg-blue-100 rounded-lg p-2 transition-colors"
        >
          <MdMenu className="h-6 w-6 " />
        </button>
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
              src={profileData?.store_logo || logo} // Replace with user's avatar
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <span className="text-white font-medium text-sm hidden md:inline">
              {profileData?.business_name || "Loading..."}
            </span>
            <FaCaretDown className="text-white" />
          </div>

          {/* Dropdown Menu */}

          <div
            className={`absolute ${
              dropdownOpen ? "flex-col" : "hidden"
            } py-4 px-4 items-center right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10`}
          >
            <button
              className="block w-full text-sm my-2 p-1 text-gray-800 hover:bg-gray-100"
              onClick={() => navigate("/profile")}
            >
              Profile Settings
            </button>
            <LogoutBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  profileData: PropTypes.any,
  onToggleSidebar: PropTypes.any,
  isCollapsed: PropTypes.any,
};

export default Navbar;
