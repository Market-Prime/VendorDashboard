import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import clsx from "clsx";

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Adjust sidebar collapse based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 768); // Collapse sidebar for smaller screens
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isSidebarCollapsed ? "w-16" : "w-64";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-full bg-white shadow-md transition-all duration-300 ${sidebarWidth}`}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={clsx("flex-1 flex  flex-col transition-all duration-300", {
          "ml-[50px]": isSidebarCollapsed, // when collapsed
          "ml-64": !isSidebarCollapsed, // when expanded
        })}
      >
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-40 ">
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="bg-gray-50  mt-16 overflow-y-auto h-full ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
