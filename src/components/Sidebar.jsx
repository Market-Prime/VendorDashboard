import { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaUserAlt,
  FaCog,
  FaCreditCard,
} from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import logo from "../assets/Logo 1.png";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  // Automatically collapse on mobile when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false);
      } else {
        if (!isCollapsed) setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed]);

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
    <>
      <aside
        className={`fixed md:relative h-full bg-blue-50 border-r border-gray-200 shadow-lg flex flex-col transition-all duration-300 z-20
          ${
            isCollapsed
              ? "-translate-x-full md:translate-x-0 w-16"
              : "translate-x-0 w-72"
          }`}
      >
        {/* Mobile Close Button */}
        <MdCancel
          className="text-2xl cursor-pointer text-blue-500 hover:text-red-600 transition absolute right-4 top-4 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />

        {/* Logo Section */}
        <div className="flex flex-col items-center px-4 py-4 border-b border-black overflow-hidden">
          {!isCollapsed && (
            <>
              <img src={logo} alt="Market Prime Logo" className="w-32 mb-4" />
              <span className="text-2xl font-bold text-center">
                MARKET PRIME
              </span>
            </>
          )}
          {isCollapsed && (
            <img src={logo} alt="Market Prime Logo" className="w-10" />
          )}
        </div>

        {/* Navigation Links */}
        <nav
          className={`flex-1 flex flex-col gap-2 mt-4 px-3 ${
            isCollapsed ? "items-center" : ""
          }`}
        >
          <Link to="/" className={getLinkClasses("/")}>
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
        <div className="mt-auto px-3 mb-6 space-y-2">
          <Link to="/profile" className={getLinkClasses("/profile")}>
            <FaUserAlt size={18} /> {!isCollapsed && <span>Profile</span>}
          </Link>
          <Link to="/settings" className={getLinkClasses("/settings")}>
            <FaCog size={18} /> {!isCollapsed && <span>Settings</span>}
          </Link>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isCollapsed: PropTypes.any.isRequired,
  setIsCollapsed: PropTypes.any.isRequired,
};

export default Sidebar;
