import React from "react";
import logo from "/src/assets/Logo 1.png";
import { useNavigate } from "react-router-dom";

const AccountInfo = () => {
    const name = localStorage.getItem("name");
    const navigate = useNavigate();

    const handleProceed = () => {
        navigate("/auth/login");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 sm:p-10 text-center">
                <img
                    src={logo}
                    alt="MarketPrime Logo"
                    className="w-16 h-16 mx-auto mb-6 rounded-full shadow-md"
                />
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-800">
                    Welcome Aboard, {name}!
                </h1>
                <p className="mt-4 text-gray-600">
                    We’ve sent a confirmation email to your inbox. Please follow
                    the instructions in the email to verify your account and
                    complete your registration process.
                </p>
                <button
                    onClick={handleProceed}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold uppercase py-3 rounded-lg mt-8 transition duration-300"
                >
                    Proceed
                </button>
            </div>
        </div>
    );
};

export default AccountInfo;
