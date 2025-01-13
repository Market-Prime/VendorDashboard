import React, { useState } from 'react';
import ApiClient from "../api";
// import ApiController from '../api/index'; // Adjust the path as needed

const FinalSection = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };
  

  const handleSubmit = async () => {
    if (!file1 || !file2) {
      setUploadStatus('Please upload both files to proceed.');
      return;
    }

    setUploading(true);
    setUploadStatus('');

    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);



    ApiClient.kyc()
    .then((data) => {
      setUploading(data);
    })
    .catch((err) => {
      console.log(err)
    })
    // try {
    //   const api = ApiController();
    //   const response = await api.kyc(formData);
    //   setUploadStatus('Files uploaded successfully!');
    // } catch (error) {
    //   console.error('Upload failed:', error);
    //   setUploadStatus('File upload failed. Please try again.');
    // } finally {
    //   setUploading(false);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg px-10 py-8 max-w-lg w-full text-center">
        <h2 className="text-blue-900 text-xl font-semibold mb-4">
          Congratulations! 🎉
        </h2>
        <p className="text-blue-800 mb-6">
          You have successfully verified your email. Kindly upload your NIN and CAC documents below to complete your registration.
        </p>

        <div className="mb-4">
          <label className="block text-gray-700">Upload NIN Document:</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setFile1)}
            className="mt-2"
            accept=".pdf,.jpeg,.png"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Upload CAC Document:</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setFile2)}
            className="mt-2"
            accept=".pdf,.jpeg,.png"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={uploading}
          className={`bg-blue-900 text-white rounded-lg px-6 py-2 font-medium ${
            uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          } transition`}
        >
          {uploading ? 'Uploading...' : 'Submit'}
        </button>

        {uploadStatus && (
          <p className={`mt-4 ${uploadStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {uploadStatus}
          </p>
        )}

        <div className="flex justify-between text-xs text-gray-500 mt-10">
          <a href="/terms" className="hover:underline">Terms of use</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/support" className="hover:underline">Customer Service</a>
        </div>
      </div>
    </div>
  );
};

export default FinalSection;
