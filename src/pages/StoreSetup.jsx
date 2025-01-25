import React, { useState, useEffect } from "react";
import logo from "/src/assets/logo.png";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ApiClient from "../api";

const SetupStore = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        bank_name: "",
        account_number: "",
        account_holder_name: "",
        bank_code: "",
        business_address: "",
        business_description: "",
        store_logo: null,
        store_splash_image: null,
        niches: "",
    });

    const [banks, setBanks] = useState([]);
    const [step, setStep] = useState(1);

    useEffect(() => {
        axios.get("https://ps.marketprime.io/v1/banks").then((res) => {
            setBanks(res.data.data);
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBankChange = (e) => {
        const selectedBank = banks.find((bank) => bank.name === e.target.value);
        setFormData((prev) => ({
            ...prev,
            bank_name: e.target.value,
            bank_code: selectedBank?.code || "",
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };

    const handleNext = () => {
        if (
            !formData.bank_name ||
            !formData.account_number ||
            !formData.account_holder_name
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const submitStoreData = (e) => {
        e.preventDefault();

        ApiClient.store(formData)
            .then(() => {
                toast.success("Store details submitted successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
                setTimeout(() => {
                    navigate("/");
                }, 500);
            })
            .catch((err) => {
                toast.error(
                    err.response?.data?.message || "An error occurred.",
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                    }
                );
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <ToastContainer />
            <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transform transition-transform duration-300">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Logo" className="h-12" />
                </div>
                <form onSubmit={submitStoreData}>
                    {step === 1 && (
                        <>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">
                                    Bank Name
                                </label>
                                <select
                                    name="bank_name"
                                    value={formData.bank_name}
                                    onChange={handleBankChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                >
                                    <option value="">Select a bank</option>
                                    {banks.map((bank) => (
                                        <option
                                            key={bank.code}
                                            value={bank.name}
                                        >
                                            {bank.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    name="account_number"
                                    value={formData.account_number}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">
                                    Account Holder Name
                                </label>
                                <input
                                    type="text"
                                    name="account_holder_name"
                                    value={formData.account_holder_name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Next
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">
                                    Business Address
                                </label>
                                <input
                                    type="text"
                                    name="business_address"
                                    value={formData.business_address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">
                                    Business Description
                                </label>
                                <textarea
                                    name="business_description"
                                    value={formData.business_description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">
                                    Store Logo
                                </label>
                                <input
                                    type="file"
                                    name="store_logo"
                                    onChange={handleFileChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    accept="image/*"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">
                                    Store Splash Image
                                </label>
                                <input
                                    type="file"
                                    name="store_splash_image"
                                    onChange={handleFileChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    accept="image/*"
                                />
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SetupStore;
