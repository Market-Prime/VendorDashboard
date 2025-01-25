import React, { useState } from "react";
import { MdLogout } from "react-icons/md";

const LogoutBtn = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const exec = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/auth/login";
    };

    return (
        <>
            <button
                className="flex gap-2 items-center text-red-600 text-sm font-medium w-full justify-center"
                onClick={() => {
                    setModalOpen(true);
                }}
            >
                <MdLogout />
                <span>Logout</span>
            </button>
            {modalOpen && (
                <div
                    className="fixed w-full h-full inset-0 top-0 left-0 backdrop-blur-md flex justify-center items-center z-50 overflow-auto"
                    onClick={() => {
                        setModalOpen(false);
                    }}
                >
                    <div
                        className="bg-white w-11/12 max-w-4xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <p className="text-gray-600 my-4">
                                Are you sure you want to logout?
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    onClick={() => {
                                        setModalOpen(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={() => {
                                        exec();
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoutBtn;
