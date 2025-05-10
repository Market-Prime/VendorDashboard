import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
    const { confirmation_token } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(
                `https://backend-server-0ddt.onrender.com/api/account/reset-password/${confirmation_token}/`,
                {
                    new_password: newPassword,
                }
            );
            toast.success("Password reset successful!", {
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
            }, 1000);
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
                <h2 className="text-center text-2xl font-semibold mb-4">
                    Reset Password
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Enter your new password below
                </p>

                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="new-password"
                        >
                            New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="new-password"
                            type="password"
                            placeholder="Enter new password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white p-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
