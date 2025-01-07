import React, { useState } from "react";
import { FaPen, FaStore, FaUser, FaInfoCircle, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const store = {
    name: "Awesome Store",
    profilePic: "https://via.placeholder.com/150",
    niches: ["Fashion", "Accessories", "Beauty"],
    description:
      "We offer the best fashion and accessories for every occasion.",
    profileCompletion: 80,
    vendors: [
      {
        id: 1,
        name: "Vendor 1",
        profilePic: "https://via.placeholder.com/100",
        rating: 4.5,
        reviews: 120,
      },
      {
        id: 2,
        name: "Vendor 2",
        profilePic: "https://via.placeholder.com/100",
        rating: 3.8,
        reviews: 80,
      },
      {
        id: 3,
        name: "Vendor 3",
        profilePic: "https://via.placeholder.com/100",
        rating: 4.7,
        reviews: 200,
      },
      {
        id: 4,
        name: "Vendor 4",
        profilePic: "https://via.placeholder.com/100",
        rating: 4.1,
        reviews: 150,
      },
      {
        id: 5,
        name: "Vendor 5",
        profilePic: "https://via.placeholder.com/100",
        rating: 4.9,
        reviews: 250,
      },
      {
        id: 6,
        name: "Vendor 6",
        profilePic: "https://via.placeholder.com/100",
        rating: 4.2,
        reviews: 90,
      },
      {
        id: 7,
        name: "Vendor 7",
        profilePic: "https://via.placeholder.com/100",
        rating: 3.6,
        reviews: 60,
      },
      {
        id: 8,
        name: "Vendor 8",
        profilePic: "https://via.placeholder.com/100",
        rating: 4.8,
        reviews: 180,
      },
      {
        id: 9,
        name: "Vendor 9",
        profilePic: "https://via.placeholder.com/100",
        rating: 4.4,
        reviews: 110,
      },
      {
        id: 10,
        name: "Vendor 10",
        profilePic: "https://via.placeholder.com/100",
        rating: 4.0,
        reviews: 95,
      },
    ],
  };

  const handleModalOpen = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTooltipToggle = () => {
    setTooltipVisible(!tooltipVisible);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-8">
      {/* Sticky Profile Header */}
      <div className="flex items-center justify-between sticky top-0 bg-white text-gray-900 py-4 px-6 border-b border-gray-300 z-10">
        <h2 className="text-4xl font-semibold">Store Profile</h2>
        <Link to="#profile">
          <button className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-lg flex items-center space-x-2 transform hover:scale-105 transition-all">
            <FaPen />
            <span>Edit Profile</span>
          </button>
        </Link>
      </div>

      {/* Store Profile */}
      <div className="bg-white rounded-xl border-2 border-gray-300 p-6 shadow-md flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 ">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600">
          <img
            src={store.profilePic}
            alt="Store Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-800">{store.name}</h3>
          <p className="text-gray-600 mt-2">{store.description}</p>
          <div className="flex space-x-3 mt-4">
            {store.niches.map((niche, index) => (
              <span
                key={index}
                className="text-xs font-medium bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
              >
                {niche}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Completion Progress */}
      <div className="flex items-center space-x-4 mt-6">
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${store.profileCompletion}%` }}
          />
        </div>
        <span className="text-sm text-gray-500">
          {store.profileCompletion}% Complete
        </span>
        <button
          className="text-blue-500"
          onClick={() => handleModalOpen("Profile Completion Details")}
        >
          More Info
        </button>
      </div>

      {/* Vendor Carousel - Improved Design */}
      <div>
        <h3 className="text-3xl font-semibold text-gray-900 mt-8">Vendors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {store.vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img
                    src={vendor.profilePic}
                    alt={`${vendor.name}'s Profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {vendor.name}
                </h4>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">
                    {"★".repeat(Math.round(vendor.rating))}
                    {"☆".repeat(5 - Math.round(vendor.rating))}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ({vendor.reviews} reviews)
                  </span>
                </div>
                <button
                  className="text-blue-500 mt-4"
                  onClick={() =>
                    handleModalOpen(`More info about ${vendor.name}`)
                  }
                >
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manage Store Profile */}
      <div className="text-center mt-8">
        <Link to="#profile">
          <button className="bg-green-500 text-white hover:bg-green-600 py-3 px-6 rounded-lg flex items-center space-x-2 transform hover:scale-105 transition-all duration-200 ease-in-out">
            <FaStore />
            <span>Manage Store</span>
          </button>
        </Link>
      </div>

      {/* Tooltip */}
      {tooltipVisible && (
        <div className="absolute top-0 right-0 m-4 p-2 bg-gray-800 text-white rounded-lg shadow-md opacity-90">
          <FaInfoCircle className="inline-block mr-2" />
          <span className="text-sm">
            Click on vendor profiles for more details
          </span>
        </div>
      )}
      <button
        onClick={handleTooltipToggle}
        className="absolute top-0 right-0 m-6 text-blue-500"
      >
        {tooltipVisible ? "Hide Tooltip" : "Show Tooltip"}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-2xl font-semibold">{modalContent}</h4>
              <button onClick={handleModalClose}>
                <FaTimes className="text-gray-500 hover:text-gray-800" />
              </button>
            </div>
            <p className="text-gray-600">
              Here you can see more information about the{" "}
              {modalContent.toLowerCase()}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
