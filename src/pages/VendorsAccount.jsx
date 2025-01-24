
import { useState } from "react";
import logo from "/src/assets/Logo 1.png";
import { Link } from "react-router-dom";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const VendorsAccount = () => {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    business_name: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const handleInputChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const submitVendor = async () => {
    try {
      const response = await axios.post(
        `https://mb.marketprime.io/api/account/register/?type=vendor`,
        formdata
      )

      const token = response.data.token;

      toast.success(
        response.data.message ||
          "Registration Successful, check your email to confirm your account",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: { backgroundColor: "green" },
        }
      );
      setTimeout(() => {
        navigate("/vendor-email-confirmation/:token");
      }, 5000);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : error.message;

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
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <ToastContainer />
      <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transform transition-transform duration-300">
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="Market Prime Logo"
            className="w-16 mx-auto mb-4 rounded-full shadow-md"
          />
          <h2 className="text-3xl font-bold text-blue-800">Vendor Account</h2>
          <p className="text-gray-600 mt-2">
            Enter your business details to create a Vendor's account.
          </p>
        </div>
        <form className="space-y-6">
          {[
            { name: "business_name", label: "Business Name", type: "text" },
            { name: "first_name", label: "First Name", type: "text" },
            { name: "last_name", label: "Last Name", type: "text" },
            { name: "email", label: "Email Address", type: "email" },
            { name: "phone_number", label: "Phone Number", type: "text" },
            { name: "password", label: "Password", type: "password" },
            {
              name: "confirm_password",
              label: "Confirm Password",
              type: "password",
            },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-gray-700 font-semibold"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder={`Enter ${field.label.toLowerCase()}`}
                onChange={handleInputChange}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={submitVendor}
            className="w-full py-3 mt-6 text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            Create Account
          </button>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/">
              <span className="text-blue-600 font-semibold hover:underline">
                Sign in
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VendorsAccount;
