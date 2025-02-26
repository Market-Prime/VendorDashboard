import { useState } from "react";
import logo from "../assets/Logo 1.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(
                "https://mb.marketprime.io/api/account/forgot-password/",
                { email }
            );
            toast.success("Password reset link sent!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: { backgroundColor: "green" },
            });
            setTimeout(() => {
                navigate("/auth/login");
            }, 3000);
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.response?.data?.details ||
                error.message;

            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: { backgroundColor: "red" },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer />
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Market Prime" className="h-10" />
                </div>
                <h2 className="text-center text-2xl font-semibold mb-4">
                    Forgot Password
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Enter your email to receive a reset link
                </p>

                <form onSubmit={handleForgotPassword}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white p-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Submit"}
                    </button>

                    <p className="mt-4 text-center text-sm">
                        Remember your password?{" "}
                        <a
                            href="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
