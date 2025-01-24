import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import ApiClient from "../api";

const ProfilePage = () => {
    const [profileDetails, setProfileDetails] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            ApiClient.loadProfile()
                .then(async (data) => {
                    setProfileDetails(data);
                })
                .catch((err) => {
                    console.log("Unable to load profile", err);
                });
        };
        getProfile();
    }, []);

    if (!profileDetails) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg animate-pulse overflow-hidden">
                    <div className="relative">
                        <div className="h-40 bg-gray-200"></div>
                        <div className="absolute -bottom-8 left-6">
                            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                    <div className="p-6 pt-10 text-center">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
                    </div>
                    <div className="divide-y">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="p-6">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                                <div className="space-y-2">
                                    {[...Array(3)].map((_, subIndex) => (
                                        <div
                                            key={subIndex}
                                            className="h-4 bg-gray-200 rounded w-3/4"
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div
                    className="h-40 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${profileDetails?.store_splash_image})`,
                    }}
                ></div>
                <div className="p-6">
                    <div className="flex items-center">
                        <img
                            className="w-24 h-24 rounded-full border-4 border-white -mt-12"
                            src={profileDetails?.store_logo}
                            alt="Store Logo"
                        />
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold">
                                {profileDetails?.business_name}
                            </h2>
                            <p className="text-gray-600">
                                {profileDetails?.business_description}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Business Details
                        </h3>
                        <p className="text-gray-600">
                            <strong>Address:</strong>{" "}
                            {profileDetails?.business_address}
                        </p>
                        <p className="text-gray-600">
                            <strong>Store ID:</strong>{" "}
                            {profileDetails?.store_id}
                        </p>
                    </div>
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Vendor Details
                        </h3>
                        <p className="text-gray-600">
                            <strong>Name:</strong>{" "}
                            {profileDetails?.user?.first_name}{" "}
                            {profileDetails?.user?.last_name}
                        </p>
                        <p className="text-gray-600">
                            <strong>Email:</strong>{" "}
                            {profileDetails?.user?.email}
                        </p>
                        <p className="text-gray-600">
                            <strong>Phone Number:</strong>{" "}
                            {profileDetails?.user?.phone_number}
                        </p>
                    </div>
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Bank Details
                        </h3>
                        <p className="text-gray-600">
                            <strong>Bank Name:</strong>{" "}
                            {profileDetails?.bank_name}
                        </p>
                        <p className="text-gray-600">
                            <strong>Account Number:</strong>{" "}
                            {profileDetails?.account_number}
                        </p>
                        <p className="text-gray-600">
                            <strong>Account Holder Name:</strong>{" "}
                            {profileDetails?.account_holder_name}
                        </p>
                    </div>
                    <div className="mt-6 border-t pt-6">
                        <button className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-lg flex items-center space-x-2 transform hover:scale-105 transition-all">
                            <FaPen />
                            <span>Edit Profile</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
