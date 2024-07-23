import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateClassPage = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    subjectName: "",
    classYear: "",
    classSemester: "",
    classDesc: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("className", formData.subjectName);
    form.append("semester", formData.classSemester);
    form.append("year", formData.classYear);
    form.append("classDesc", formData.classDesc);
    form.append("creator", user._id);

    if (image) {
      form.append("imagefile", image);
    }

    try {
      // Create the class
      const classResponse = await axios.post(
        "https://myclassroomback.onrender.com/api/class/createclass",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        {
          timeout: 10000, // Set a timeout of 10 seconds (adjust as needed)
        }
      );

      // Create the announcement
      const announcementResponse = await axios.post(
        "https://myclassroomback.onrender.com/api/announcement/add",
        {
          classId: classResponse.data.class._id,
          creator: user._id,
          message: `Class created by ${user.username}: ${formData.subjectName} ${formData.classYear}`,
        },
        {
          timeout: 10000, // Set a timeout of 10 seconds (adjust as needed)
        }
      );

      navigate("/");
      toast.success("Class created successfully");
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error("Failed to create class");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Create Class</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="classImage"
          >
            Upload Class Image:
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="upload"
              className="cursor-pointer flex items-center justify-center border border-gray-400 rounded-lg p-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Upload Image
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              required
            />
          </div>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="mt-4 mx-auto max-w-md"
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subjectName"
          >
            Subject Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subjectName"
            type="text"
            placeholder="Subject Name"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="classYear"
          >
            Class Year:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="classYear"
            type="text"
            placeholder="Class Year"
            name="classYear"
            value={formData.classYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="classSemester"
          >
            Class Semester:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="classSemester"
            type="text"
            placeholder="Class Semester"
            name="classSemester"
            value={formData.classSemester}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="classDesc"
          >
            Class Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="classDesc"
            placeholder="Class Description"
            name="classDesc"
            value={formData.classDesc}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLoading ? "Creating..." : "Create Class"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateClassPage;
