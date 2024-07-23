import React, { useState, useEffect } from "react";
import ClassroomCard from "../components/ClassroomCard/ClassroomCard";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader/Loader"; // Import Loader component

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const { user, classes, fetchClasses, likedClasses, fetchLikedClasses } =
    useAppContext();
  const [likedClassData, setLikedClassData] = useState([]);

  useEffect(() => {
    // Simulate a loading delay of 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    fetchClasses();
    fetchLikedClasses();
    // Clear the timer if the component unmounts before 3 seconds
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    // Map liked classes to corresponding class data
    const mappedLikedClasses = likedClasses.map((likedClass) => {
      if (likedClass.classId != null) {
        // console.log(likedClasses);
        // console.log(classes);
        const classData = classes.find(
          (classItem) => classItem._id === likedClass.classId._id
        );
        return classData;
      }
      // console.log(classes);
    });
    setLikedClassData(mappedLikedClasses);
  }, [likedClasses, classes]);

  // Get the first letter of the user's email ID
  const firstLetter = user.email.charAt(0).toUpperCase();

  if (isLoading) {
    return (
      <div className="flex justify-center w-full items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 md:p-4 h-auto lg:h-screen mb-[4rem]  w-full">
      <div className="flex items-center mb-4 md:flex-row flex-col gap-y-4">
        <div
          className="rounded-full h-12 w-12 flex items-center justify-center text-white bg-[#FFB6C1] font-bold text-2xl relative top-2 pb-4"
          // Set background color from state
        >
          <span className="flex justify-center items-center mt-4 text-[2rem]">
            {" "}
            {firstLetter}
          </span>
        </div>
        <div className="ml-4">
          <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
          <p className="text-gray-500">Role: {user.role}</p>
          <p className="text-gray-500">Created Date: {user.createdAt}</p>
          <p className="text-gray-500">Email: {user.email}</p>
          {user.role === "student" && (
            <p className="text-gray-500">
              Admission Year: {user.admissionYear}
            </p>
          )}
        </div>
      </div>
      <hr />
      {user.role !== "student" && (
        <div className="mt-2 pb-6 flex flex-col justify-center items-center sm:items-start">
          <h2 className="text-2xl font-bold mb-4">My Classrooms</h2>
          {classes.filter((classItem) => classItem.creator === user._id)
            .length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {classes
                .filter((classItem) => classItem.creator === user._id)
                .map((filteredClassItem) => (
                  <ClassroomCard
                    key={filteredClassItem._id}
                    classItem={filteredClassItem}
                  />
                ))}
            </div>
          ) : (
            <div className="w-full h-[20%] text-2xl flex justify-center items-center">
              No classes created by the user.
            </div>
          )}
        </div>
      )}
      <hr />
      <div className="mt-2 pb-6 flex flex-col justify-center items-center sm:items-start">
        <h2 className="text-2xl font-bold mt-4">Liked Classrooms</h2>
        {likedClassData[0] != undefined && likedClassData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
            {likedClassData.map((classItem) => (
              // console.log(likedClassData)
              <ClassroomCard key={classItem._id} classItem={classItem} />
            ))}
          </div>
        ) : (
          <div className="w-full h-[20%] text-2xl flex justify-center items-center">
            No Liked Class!
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
