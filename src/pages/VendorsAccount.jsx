import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/src/assets/Logo 1.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendorsAccount = () => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    business_name: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [currentStep, setCurrentStep] = useState(1);

  const isStep1Complete = () => {
    return formdata.business_name.trim() !== "";
  };

  const isStep2Complete = () => {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      password,
      confirm_password,
    } = formdata;
    return (
      first_name.trim() &&
      last_name.trim() &&
      email.trim() &&
      phone_number.trim() &&
      password.trim() &&
      confirm_password.trim() &&
      password === confirm_password
    );
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const submitVendor = async () => {
    if (!isStep2Complete()) return;

    try {
      const response = await axios.post(
        `https://mb.marketprime.io/api/account/register/?type=vendor`,
        formdata
      );

      const token = response.data.token;
      localStorage.setItem("vendorToken", token);

      toast.success(
        response.data.message ||
          "Registration Successful! Check your email to confirm your account.",
        {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          style: { backgroundColor: "green" },
        }
      );

      if (response.data.statusCode === 201) {
        localStorage.setItem("name", response.data.business_name);
      }

      setTimeout(() => {
        navigate("/success-signup");
      }, 500);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  const renderStep1 = () => (
    <fieldset className="space-y-6">
      <legend className="text-lg font-semibold text-gray-700 mb-4">
        Business Information
      </legend>
      <div>
        <label
          htmlFor="business_name"
          className="block text-gray-700 font-medium"
        >
          Business Name
        </label>
        <input
          type="text"
          name="business_name"
          id="business_name"
          value={formdata.business_name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Enter your business name"
        />
      </div>
      <button
        type="button"
        onClick={() => setCurrentStep(2)}
        disabled={!isStep1Complete()}
        className={`w-full py-3 text-white rounded-lg shadow-lg transform transition-transform duration-300 ${
          isStep1Complete()
            ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-2 focus:ring-blue-600"
            : "bg-gray-300 cursor-not-allowed opacity-50"
        }`}
      >
        Next
      </button>
    </fieldset>
  );

  const renderStep2 = () => (
    <fieldset className="space-y-6">
      <legend className="text-lg font-semibold text-gray-700 mb-4">
        Account & Personal Information
      </legend>
      <div className="space-y-4">
        {[
          {
            name: "first_name",
            label: "First Name",
            type: "text",
          },
          { name: "last_name", label: "Last Name", type: "text" },
          {
            name: "phone_number",
            label: "Phone Number",
            type: "text",
          },
          {
            name: "email",
            label: "Email Address",
            type: "email",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
          },
          {
            name: "confirm_password",
            label: "Confirm Password",
            type: "password",
          },
        ].map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-gray-700 font-medium"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              value={formdata[field.name]}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Back
        </button>
        <button
          type="button"
          onClick={submitVendor}
          disabled={!isStep2Complete()}
          className={`px-6 py-2 text-white rounded-lg shadow-lg transition ${
            isStep2Complete()
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed opacity-50"
          }`}
        >
          Submit
        </button>
      </div>
    </fieldset>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4">
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
            Create your account step by step.
          </p>
        </div>
        <form className="space-y-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
        </form>
      </div>
    </div>
  );
};

export default VendorsAccount;
