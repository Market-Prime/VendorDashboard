import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import clsx from "clsx";
import ApiClient from "../../api";
import appRoutes from "../../res/appRoutes";
import FullLoader from "../FullLoader";
import PropTypes from "prop-types";
import SidebarSkeleton from "../SideBarSkeleton";

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Adjust sidebar collapse based on screen size
  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      ApiClient.loadProfile()
        .then(async (data) => {
          if (!data?.kyc_uploaded) {
            window.location.href = appRoutes.kycSetup;
            return;
          }
          if (!data?.setup_complete) {
            window.location.href = appRoutes.storeSetup;
            return;
          }
          setProfileDetails({
            first_name: data?.user?.first_name || "",
            last_name: data?.user?.last_name || "",
            business_name: data?.business_name || "",
            store_logo: data?.store_logo || null,
          });
          sessionStorage.setItem("mp_v_id", data.store_id);
          const _evnt = new CustomEvent("u_ath_st");
          document.dispatchEvent(_evnt);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Unable to load profile", err);
        });
    };
    getProfile();

    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 768); // Collapse sidebar for smaller screens
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div>
          {isLoading ? (
            <SidebarSkeleton />
          ) : (
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              setIsCollapsed={setIsSidebarCollapsed}
            />
          )}
        </div>

        {/* Main Content Area */}
        <div
          className={`flex flex-col flex-1 transition-all duration-300 overflow-hidden ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          {/* Navbar */}

          <Navbar
            profileData={profileDetails}
            onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isCollapsed={isSidebarCollapsed}
          />

          {/* Main Content */}
          <main className="bg-gray-50  mt-8 overflow-y-auto h-full ">
            {isLoading ? <FullLoader /> : children}
          </main>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
