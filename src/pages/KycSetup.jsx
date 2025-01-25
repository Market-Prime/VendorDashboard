import React, { useState } from "react";
import ApiClient from "../api";

const SetupKyc = () => {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file1 || !file2) {
            setUploadStatus("Please upload both files to proceed.");
            return;
        }

        setUploading(true);
        setUploadStatus("");

        const payload = {
            cac_file: file1,
            nin_file: file2,
        };

        ApiClient.kyc(payload)
            .then((data) => {
                console.log(data);
                window.location.href = "/setup/store";
            })
            .catch((err) => {
                console.log(err);
                setUploadStatus(err);
            })
            .finally(() => {
                setUploading(false);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-4">
            <div className="bg-white shadow-lg rounded-2xl px-8 py-10 w-full max-w-md">
                <h2 className="text-blue-900 text-2xl font-bold mb-4 text-center">
                    Congratulations! 🎉
                </h2>
                <p className="text-blue-800 mb-6 text-center">
                    Please upload your NIN and CAC documents below to complete
                    your registration.
                </p>

                {/* File Upload for NIN */}
                <div className="mb-6">
                    <label
                        htmlFor="nin-upload"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Upload NIN Document:
                    </label>
                    <div
                        className="border-2 border-dashed border-blue-500 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50 transition"
                        onClick={() =>
                            document.getElementById("nin-upload").click()
                        }
                    >
                        {file1 ? (
                            <p className="text-blue-800 font-semibold">
                                {file1.name}
                            </p>
                        ) : (
                            <p className="text-gray-500">
                                Click to upload or drag and drop
                            </p>
                        )}
                        <input
                            id="nin-upload"
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, setFile1)}
                            accept=".pdf,.jpeg,.png"
                        />
                    </div>
                </div>

                {/* File Upload for CAC */}
                <div className="mb-6">
                    <label
                        htmlFor="cac-upload"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Upload CAC Document:
                    </label>
                    <div
                        className="border-2 border-dashed border-blue-500 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50 transition"
                        onClick={() =>
                            document.getElementById("cac-upload").click()
                        }
                    >
                        {file2 ? (
                            <p className="text-blue-800 font-semibold">
                                {file2.name}
                            </p>
                        ) : (
                            <p className="text-gray-500">
                                Click to upload or drag and drop
                            </p>
                        )}
                        <input
                            id="cac-upload"
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, setFile2)}
                            accept=".pdf,.jpeg,.png"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={uploading}
                    className={`w-full bg-blue-900 text-white py-3 rounded-lg font-medium ${
                        uploading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-700"
                    } transition`}
                >
                    {uploading ? "Uploading..." : "Submit"}
                </button>

                {/* Feedback Message */}
                {uploadStatus && (
                    <p
                        className={`mt-4 text-sm text-center ${
                            uploadStatus.includes("success")
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {uploadStatus}
                    </p>
                )}

                {/* Footer Links */}
                <div className="flex justify-between text-xs text-gray-500 mt-8">
                    <a href="/terms" className="hover:underline">
                        Terms of Use
                    </a>
                    <a href="/privacy" className="hover:underline">
                        Privacy Policy
                    </a>
                    <a href="/support" className="hover:underline">
                        Customer Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SetupKyc;
