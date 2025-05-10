import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "/src/assets/logo.png";
import axios from "axios";
import { Circles } from "react-loader-spinner";

const EmailConfirmation = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState({
        message: "Please wait while we verify your account.",
        success: false,
    });

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await axios.post(
                    `https://backend-server-0ddt.onrender.com/api/account/confirm/`,
                    { token }
                );

                setFeedback({
                    message:
                        response.data.message ||
                        "Your account has been successfully verified! You can now access all features.",
                    success: true,
                });

                // Redirect to the final section after 5 seconds
                setTimeout(() => {
                    navigate("/auth/login");
                }, 5000);
            } catch (error) {
                const errorMessage =
                    error.response &&
                    error.response.data &&
                    error.response.data.error
                        ? error.response.data.error
                        : "We couldn't verify your account. Please try again later or contact support.";

                setFeedback({
                    message: errorMessage,
                    success: false,
                });
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            confirmEmail();
        } else {
            setFeedback({
                message:
                    "Invalid or missing confirmation token. Please check your email link.",
                success: false,
            });
            setLoading(false);
        }
    }, [token, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 sm:p-10 text-center">
                <img
                    src={logo}
                    alt="MarketPrime Logo"
                    className="w-16 h-16 mx-auto mb-6 rounded-full shadow-md"
                />
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">
                    {loading
                        ? "Verifying Your Account"
                        : feedback.success
                        ? "Success!"
                        : "Verification Failed"}
                </h1>
                <p className={`text-gray-600 ${loading ? "mb-6" : ""}`}>
                    {feedback.message}
                </p>
                {loading && (
                    <div className="flex justify-center items-center">
                        <Circles
                            height="80"
                            width="80"
                            color="#4A90E2"
                            ariaLabel="circles-loading"
                            visible={true}
                        />
                    </div>
                )}
                {!loading && feedback.success && (
                    <p className="text-green-600 font-semibold mt-4">
                        Redirecting to the next step...
                    </p>
                )}
                {!loading && !feedback.success && (
                    <p className="text-red-600 font-semibold mt-4">
                        Please try again or contact support.
                    </p>
                )}
            </div>
        </div>
    );
};

export default EmailConfirmation;
