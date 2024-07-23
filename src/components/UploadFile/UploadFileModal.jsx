import React, { useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader"; // Adjust the path as necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faFilePdf,
  faFilePowerpoint,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";

const UploadFileModal = ({
  isOpen,
  onClose,
  classId,
  onSuccess,
  fetchMaterials,
}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("classId", classId);

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://myclassroomback.onrender.com/api/material/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSuccess(response.data);
      fetchMaterials();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Toast disappears after 3 seconds
      onClose();
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop();
    switch (extension) {
      case "pdf":
        return faFilePdf;
      case "doc":
      case "docx":
        return faFileWord;
      case "ppt":
      case "pptx":
        return faFilePowerpoint;
      default:
        return faFileAlt;
    }
  };

  return (
    <>
      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {isLoading ? (
                <Loader />
              ) : (
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <i className="fas fa-upload text-blue-500"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Upload File
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit}>
                        <div className="flex items-center justify-center">
                          <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-400 rounded-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white">
                            <svg
                              className="w-8 h-8"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              stroke="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 6a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2h-2.586l-1.707-1.707A1 1 0 018.707 11L10 9.707l2.293 2.293a1 1 0 01-1.414 1.414L10 12.414l-3.293 3.293a1 1 0 01-1.414-1.414L7.414 11 6.707 10.293A1 1 0 016.293 9.88L4.586 8.172H2a2 2 0 01-2-2V6zm7 2a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                            <span className="mt-2 text-sm">Select a file</span>
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleFileChange}
                              required
                            />
                          </label>
                        </div>
                        {fileName && (
                          <div className="mt-4 flex items-center justify-center text-blue-500">
                            <FontAwesomeIcon
                              icon={getFileIcon(fileName)}
                              className="mr-2"
                            />
                            <span>{fileName}</span>
                          </div>
                        )}
                        <p className="text-gray-500 text-xs italic mt-2">
                          File size must not exceed 10MB.
                        </p>
                        <p className="text-gray-500 text-xs italic mt-2">
                          Allowed file types : pdf.
                        </p>
                        <div className="mt-4 flex justify-center">
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={isLoading}
                          >
                            {isLoading ? "Uploading..." : "Upload"}
                          </button>
                          <button
                            type="button"
                            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={onClose}
                            disabled={isLoading}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded">
          File uploaded successfully!
        </div>
      )}
    </>
  );
};

export default UploadFileModal;
