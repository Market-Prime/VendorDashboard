import React, { useState } from "react";
import { FaSave, FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaCreditCard, FaMoneyCheckAlt } from "react-icons/fa";

const SettingsPage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    password: "",
    verifyPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [storeData, setStoreData] = useState({
    storeName: "",
    storeDescription: "",
    storeLogo: "",
    storeBackImage: "",
    storePhone: "",
    storeAddress: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    autoPay: false,
  });

  const [isModified, setIsModified] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
    setIsModified(true);
  };

  const handleToggleAutoPay = () => {
    setPaymentInfo((prev) => ({ ...prev, autoPay: !prev.autoPay }));
    setIsModified(true);
  };

  const saveChanges = () => {
    // Logic to save changes goes here
    alert("Payment information saved!");
    setIsModified(false);
  };
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleStoreChange = (e) => {
    const { name, value } = e.target;
    setStoreData({ ...storeData, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStoreData({ ...storeData, storeLogo: URL.createObjectURL(file) });
    }
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStoreData({ ...storeData, storeBackImage: URL.createObjectURL(file) });
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleVerifyPasswordVisibility = () => {
    setShowVerifyPassword(!showVerifyPassword);
  };

  const isPasswordMatching =
    profileData.password === profileData.verifyPassword;

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-2xl shadow-lg space-y-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        Profile Settings
      </h2>

      {/* Profile Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Name */}
        <div className="space-y-4">
          <label htmlFor="name" className="text-xl font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
            className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="John Doe"
          />
        </div>

        {/* Password */}
        <div className="space-y-4">
          <label
            htmlFor="password"
            className="text-xl font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={profileData.password}
              onChange={handleProfileChange}
              className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              placeholder="Enter Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Verify Password */}
        <div className="space-y-4">
          <label
            htmlFor="verifyPassword"
            className="text-xl font-medium text-gray-700"
          >
            Verify Password
          </label>
          <div className="relative">
            <input
              id="verifyPassword"
              type={showVerifyPassword ? "text" : "password"}
              name="verifyPassword"
              value={profileData.verifyPassword}
              onChange={handleProfileChange}
              className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              placeholder="Re-enter Password"
            />
            <button
              type="button"
              onClick={toggleVerifyPasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showVerifyPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {!isPasswordMatching && profileData.verifyPassword && (
            <p className="text-red-500 text-sm mt-2">Passwords do not match</p>
          )}
        </div>
      </div>

      {/* Store Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold text-gray-800">
          Store Information
        </h3>

        {/* Store Name */}
        <div className="space-y-4">
          <label
            htmlFor="storeName"
            className="text-xl font-medium text-gray-700"
          >
            Store Name
          </label>
          <input
            id="storeName"
            type="text"
            name="storeName"
            value={storeData.storeName}
            onChange={handleStoreChange}
            className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="My Awesome Store"
          />
        </div>

        {/* Store Description */}
        <div className="space-y-4">
          <label
            htmlFor="storeDescription"
            className="text-xl font-medium text-gray-700"
          >
            Store Description
          </label>
          <textarea
            id="storeDescription"
            name="storeDescription"
            value={storeData.storeDescription}
            onChange={handleStoreChange}
            rows="4"
            className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Describe your store"
          />
        </div>

        {/* Store Logo Upload */}
        <div className="space-y-4">
          <label
            htmlFor="storeLogo"
            className="text-xl font-medium text-gray-700"
          >
            Store Logo
          </label>
          <div className="w-full h-40 flex justify-center items-center border-2 border-dashed border-gray-300 rounded-xl">
            <input
              type="file"
              id="storeLogo"
              onChange={handleLogoChange}
              className="hidden"
            />
            <label
              htmlFor="storeLogo"
              className="flex flex-col items-center cursor-pointer"
            >
              <FaCamera className="text-gray-600 text-3xl mb-4" />
              <span className="text-gray-600">
                Drag & drop or click to upload
              </span>
            </label>
            {storeData.storeLogo && (
              <img
                src={storeData.storeLogo}
                alt="Store Logo"
                className="w-16 h-16 mt-4 rounded-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Store Background Image Upload */}
        <div className="space-y-4">
          <label
            htmlFor="storeBackImage"
            className="text-xl font-medium text-gray-700"
          >
            Store Background Image
          </label>
          <div className="w-full h-40 flex justify-center items-center border-2 border-dashed border-gray-300 rounded-xl">
            <input
              type="file"
              id="storeBackImage"
              onChange={handleBackgroundChange}
              className="hidden"
            />
            <label
              htmlFor="storeBackImage"
              className="flex flex-col items-center cursor-pointer"
            >
              <FaCamera className="text-gray-600 text-3xl mb-4" />
              <span className="text-gray-600">
                Drag & drop or click to upload
              </span>
            </label>
            {storeData.storeBackImage && (
              <img
                src={storeData.storeBackImage}
                alt="Store Background"
                className="w-full h-full mt-4 object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </div>

      {/* Payment Information Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold text-gray-800">
          Payment Details
        </h3>

        {/* Credit Card Information */}
        <div className="space-y-4">
          <label
            htmlFor="cardNumber"
            className="text-xl font-medium text-gray-700"
          >
            Credit Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
            className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
        </div>

        {/* Expiry Date */}
        <div className="space-y-4">
          <label
            htmlFor="expiryDate"
            className="text-xl font-medium text-gray-700"
          >
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={handlePaymentChange}
            className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="MM/YY"
          />
        </div>

        {/* CVV */}
        <div className="space-y-4">
          <label htmlFor="cvv" className="text-xl font-medium text-gray-700">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
            className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="CVV"
          />
        </div>

        {/* AutoPay Option */}
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="autoPay"
            name="autoPay"
            checked={paymentInfo.autoPay}
            onChange={handleToggleAutoPay}
            className="h-6 w-6"
          />
          <label
            htmlFor="autoPay"
            className="text-xl font-medium text-gray-700"
          >
            Auto-Pay Subscription
          </label>
        </div>

        <button
          onClick={saveChanges}
          disabled={!isModified}
          className={`flex items-center justify-center p-4 bg-blue-500 text-white text-xl font-medium rounded-xl transition duration-300 ease-in-out hover:bg-blue-600 ${
            !isModified ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <FaSave className="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
