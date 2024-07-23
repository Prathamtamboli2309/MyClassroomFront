import React, { useState, useEffect } from "react";
import ClassroomCard from "../components/ClassroomCard/ClassroomCard";
import { FaSearch, FaUndo } from "react-icons/fa"; // Import FaUndo for the reset button
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader/Loader";

const AllClassrooms = () => {
  const { classes } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // Set loading to false after 5 seconds

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []);

  useEffect(() => {
    setFilteredClasses(handleSearch());
  }, [searchTerm, selectedSemester, selectedYear]); // Update filteredClasses when search parameters change

  const handleSearch = () => {
    return classes.filter((classItem) => {
      return (
        (selectedSemester === "" || classItem.semester === selectedSemester) &&
        (selectedYear === "" || classItem.year.toString() === selectedYear) && // Compare class year with selected year
        (searchTerm === "" ||
          classItem.className.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedSemester("");
    setSelectedYear("");
    setFilteredClasses(classes);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        {" "}
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 md:p-4 w-full md:h-screen sm:h-auto">
      <h1 className="text-3xl font-bold mb-8">All Classrooms</h1>

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
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option value="">Select Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
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
          <FaUndo className="mr-2" />
          Reset
        </button>
      </div>

      {filteredClasses.length === 0 ? (
        <p className="text-center text-gray-500">No classes available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredClasses.map((classItem) => (
            <div key={classItem._id} className="flex justify-center">
              <ClassroomCard classItem={classItem} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllClassrooms;
