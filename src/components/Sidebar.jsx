import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaChartBar,
  FaUsers,
  FaUserAlt,
  FaCog,
  FaBars,
  FaCreditCard,
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Automatically toggle collapse on smaller screens
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    handleResize(); // Set initial collapse state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine active link styles
  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
      isActive
        ? "text-white bg-blue-600 shadow-md"
        : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
    }`;
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-gray-50 h-[90%] bottom-0 fixed  left-0 border-r border-gray-200 shadow-lg flex flex-col transition-all duration-300`}
    >
      {/* Toggle Button */}
      <button
        className="md:hidden flex items-center justify-center w-full p-4 border-b border-gray-200"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle Sidebar"
      >
        <FaBars className="text-gray-600" size={20} />
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4 mt-6 flex-grow px-3">
        <Link to="/dashboard" className={getLinkClasses("/")}>
          <FaHome size={18} /> {!isCollapsed && <span>Dashboard</span>}
        </Link>
        <Link to="/orders" className={getLinkClasses("/orders")}>
          <FaShoppingCart size={18} /> {!isCollapsed && <span>Orders</span>}
        </Link>
        <Link to="/products" className={getLinkClasses("/products")}>
          <FaShoppingCart size={18} /> {!isCollapsed && <span>Products</span>}
        </Link>
        <Link to="/payment" className={getLinkClasses("/payment")}>
          <FaCreditCard size={18} /> {!isCollapsed && <span>Payment</span>}
        </Link>
      </nav>

      {/* Profile and Settings */}
      <div className="mt-auto px-3 mb-6">
        <Link to="/profile" className={getLinkClasses("/profile")}>
          <FaUserAlt size={18} /> {!isCollapsed && <span>Profile</span>}
        </Link>
        <Link to="/settings" className={getLinkClasses("/Settings")}>
          <FaCog size={18} /> {!isCollapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
