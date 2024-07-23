import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const AddQuestionPaper = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [formData, setFormData] = useState({
    subjectName: "",
    creator: user._id,
    examType: "",
    year: "",
    examName: "",
    sem: "",
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }
    try {
      const response = await axios.post(
        "https://myclassroomback.onrender.com/api/questionpapers/create",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/questionpaper");
    } catch (error) {
      console.error("Error adding question paper:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Add Question Paper</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subject Name
          </label>
          <input
            type="text"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Exam Type
          </label>
          <input
            type="text"
            name="examType"
            value={formData.examType}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Year
          </label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Exam Name
          </label>
          <input
            type="text"
            name="examName"
            value={formData.examName}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Semester
          </label>
          <input
            type="text"
            name="sem"
            value={formData.sem}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Question Paper
          </label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
          <button
            className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => navigate("/questionpaper")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionPaper;
