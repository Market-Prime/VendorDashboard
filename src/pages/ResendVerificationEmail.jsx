import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResendVerification = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!email) {
            toast.error("Email parameter is missing.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: { backgroundColor: "#800080" },
            });
        }
    }, [email]);

    const handleResendEmail = async () => {
        if (!email) return;
        setLoading(true);

        try {
            await axios.post(
                "https://mb.marketprime.io/api/account/resend-confirmation-email/",
                { email }
            );
            toast.success("Verification email resent successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: { backgroundColor: "green" },
            });
            setTimeout(()=>{
                navigate("/auth/login")
            },1000)
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.response?.data?.details ||
                error.message;
            toast.error(
                errorMessage,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    style: { backgroundColor: "red" },
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer />
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold mb-4">
                    Resend Verification Email
                </h2>
                <p className="text-gray-600 mb-4">
                    Click the button below to resend your verification email.
                </p>
                <button
                    onClick={handleResendEmail}
                    className="w-full bg-blue-900 text-white p-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200"
                    disabled={loading || !email}
                >
                    {loading ? "Resending..." : "Resend Email"}
                </button>
            </div>
        </div>
    );
};

export default ResendVerification;
