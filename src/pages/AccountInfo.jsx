import React from "react";
import logo from "/src/assets/Logo 1.png";
import { Navigate, useNavigate } from "react-router-dom";
const AccountInfo = () =>{

    const name = localStorage.getItem("name");

    const navigate = useNavigate();
    const proceed = () =>{
        navigate("/")
    }
    return(
    <div>
        <div className="2xl:w-1/3 xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-2/3 bg-white rounded-3xl shadow-2xl m-auto my-56 py-10">
            <img
            src={logo}
            alt="MarketPrime Logo"
            className="text-center mx-auto rounded-xl"
            />
            <h5 className="text-3xl text-center mt-5">Welcome on Board, Dear {name}</h5>
            <p className="mt-3 text-center w-2/3 mx-auto">
                An email has been sent to your email, follow the procedures to confirm your account
            </p>
            <button
                onClick={proceed}
                className="2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 mx-auto bg-gradient-to-r from-blue-500 to-blue-700 block py-5 rounded-lg text-white uppercase text-center font-bold mt-10"
            >
                Proceed
            </button>
        </div>
    </div>
    )
}
export default AccountInfo;