import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import clsx from "clsx";
import ApiClient from "../../api";
import appRoutes from "../../res/appRoutes";
import FullLoader from "../FullLoader";
import SidebarSkeleton from "../SideBarSkeleton";

const Layout = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [profileDetails, setProfileDetails] = useState({});
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

    const sidebarWidth = isSidebarCollapsed ? "w-16" : "w-64";

    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar */}
                <div
                    className={`fixed top-0 left-0 z-30 h-full bg-white shadow-md transition-all duration-300 ${sidebarWidth}`}
                >
                    {isLoading ? (
                        <SidebarSkeleton />
                    ) : (
                        <Sidebar
                            isCollapsed={isSidebarCollapsed}
                            toggleCollapse={() =>
                                setIsSidebarCollapsed(!isSidebarCollapsed)
                            }
                        />
                    )}
                </div>

                {/* Main Content Area */}
                <div
                    className={clsx(
                        "flex-1 flex  flex-col transition-all duration-300",
                        {
                            "ml-[50px]": isSidebarCollapsed, // when collapsed
                            "ml-64": !isSidebarCollapsed, // when expanded
                        }
                    )}
                >
                    {/* Navbar */}
                    <div className="fixed top-0 left-0 right-0 z-40 ">
                        <Navbar profileData={profileDetails} />
                    </div>

                    {/* Main Content */}
                    <main className="bg-gray-50  mt-16 overflow-y-auto h-full ">
                        {isLoading ? <FullLoader /> : children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default Layout;
