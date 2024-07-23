import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  faDownload,
  faTrash,
  faPlus,
  faUndo,
} from "@fortawesome/free-solid-svg-icons"; // Import necessary icons
import { useAppContext } from "../context/AppContext";

const QuestionPaperPage = () => {
  // Question papers state
  const [questionPapers, setQuestionPapers] = useState([]);
  const [filteredQuestionPapers, setFilteredQuestionPapers] = useState([]);
  const { user } = useAppContext();

  // Fetch question papers from API
  useEffect(() => {
    fetchQuestionPapers();
  }, []);

  const fetchQuestionPapers = async () => {
    try {
      const response = await axios.get(
        "https://myclassroomback.onrender.com/api/questionpapers"
      );
      setQuestionPapers(response.data);
      setFilteredQuestionPapers(response.data);
    } catch (error) {
      console.error("Error fetching question papers:", error);
    }
  };

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    setFilteredQuestionPapers(handleFilter());
  }, [searchTerm, selectedExamType, selectedYear]); // Update filteredQuestionPapers when filter parameters change

  const handleFilter = () => {
    return questionPapers.filter((questionPaper) => {
      return (
        (selectedExamType === "" ||
          questionPaper.examType === selectedExamType) &&
        (selectedYear === "" ||
          questionPaper.year.toString() === selectedYear) && // Compare question paper year with selected year
        (searchTerm === "" ||
          questionPaper.subjectName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
      );
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedExamType("");
    setSelectedYear("");
    setFilteredQuestionPapers(questionPapers);
  };

  // Dummy function to handle deletion (does nothing)
  const handleDeleteQuestionPaper = async (id) => {
    try {
      const response = await axios.delete(
        `https://myclassroomback.onrender.com/api/questionpapers/${id}`
      );
      // Assuming the API returns a message upon successful deletion
      fetchQuestionPapers(); // Fetch question papers again to reflect the updated list
    } catch (error) {
      console.error("Error deleting question paper:", error);
    }
  };

  return (
    <div className="container mx-auto p-2 md:p-4 w-full md:h-screen sm:h-auto">
      <h1 className="text-3xl font-bold mb-8">Question Papers</h1>

      <div className="flex flex-col lg:flex-row flex-wrap justify-between items-center mb-8 space-y-4 lg:space-y-0 lg:space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full lg:w-[50%] border border-gray-300 rounded-lg px-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2"
          value={selectedExamType}
          onChange={(e) => setSelectedExamType(e.target.value)}
        >
          <option value="">Select Exam Type</option>
          <option value="Internal">Internal</option>
          <option value="External">External</option>
        </select>
        <select
          className="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Year</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>

        {/* Replace search button with reset button */}
        <button
          className="w-full lg:w-auto bg-red-500 text-white rounded-lg px-4 py-2 flex items-center justify-center lg:justify-start"
          onClick={handleReset}
        >
          <FontAwesomeIcon icon={faUndo} className="mr-2" />
          Reset
        </button>

        {/* AddQuestionPaper component */}
        <Link to="/addquestionpaper">
          <button className="w-full lg:w-auto bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center justify-center lg:justify-start">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add
          </button>
        </Link>
      </div>

      {filteredQuestionPapers.length === 0 ? (
        <p className="text-center text-gray-500">
          No question papers available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {filteredQuestionPapers.map((questionPaper) => (
            <div key={questionPaper.id} className="flex justify-center">
              {/* Render question paper item */}
              <div className="bg-white rounded shadow p-8 border-2 w-full gap-y-4 flex flex-col justify-between">
                <div className="flex  gap-y-2 flex-col">
                  <h3 className="text-xl font-semibold mb-2">
                    {questionPaper.examName}
                  </h3>
                  <div className="flex justify-between">
                    <p>
                      <span className="font-semibold">Subject:</span>{" "}
                      {questionPaper.subjectName}
                    </p>
                    <p>
                      <span className="font-semibold">Exam Type:</span>{" "}
                      {questionPaper.examType}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>
                      <span className="font-semibold">Year:</span>{" "}
                      {questionPaper.year}
                    </p>
                    <p>
                      <span className="font-semibold">Semester:</span>{" "}
                      {questionPaper.sem}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>
                      <span className="font-semibold">Creator:</span>{" "}
                      {questionPaper.creator}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <a
                    href={questionPaper.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    <FontAwesomeIcon icon={faDownload} className="mr-1" />{" "}
                    Download
                  </a>
                  {user._id === questionPaper.creator && (
                    <button
                      onClick={() =>
                        handleDeleteQuestionPaper(questionPaper._id)
                      }
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionPaperPage;
