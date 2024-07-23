import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavigationBar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import HomePage from "./pages/Home";
import AllClassrooms from "./pages/AllClassrooms";
import LoginSignup from "./pages/LoginSignuppage";
import ClassroomDetail from "./components/ClassroomCard/ClassroomDetailCard";
import CreateClassPage from "./pages/CreateClassPage";
import AnnouncementPage from "./pages/AnnouncementPage";
import QuestionPaperPage from "./pages/QuestionPaperPage";
import AddQuestionPaper from "./components/AddQuestionPaper/AddQuestionPaper";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isOpen, setIsOpen] = useState(false);

  // Check for token in localStorage on component mount
  useEffect(() => {
    if (token) {
      // setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };
  // Scroll to top when navigating to a new route
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location.pathname]);

  return (
    <div>
      {(isLoggedIn || token) && (
        <NavigationBar
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          setIsLoggedIn={setIsLoggedIn}
          handleLogout={handleLogout}
        />
      )}
      <div className="">
        <main className="flex-grow flex relative sm:flex-row gap-y-8 sm:gap-y-0 flex-col top-[9rem] sm:top-0 h-full">
          {(isLoggedIn || token) && <Sidebar isOpen={isOpen} />}
          <div className="h-full w-full flex justify-center items-center md:ml-4 p-4">
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn || token ? (
                    <HomePage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  isLoggedIn || token ? (
                    <Navigate to="/" replace />
                  ) : (
                    <LoginSignup
                      setIsLoggedIn={setIsLoggedIn}
                      setToken={setToken}
                    />
                  )
                }
              />
              <Route
                path="/announcement"
                element={
                  isLoggedIn || token ? (
                    <AnnouncementPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/questionpaper"
                element={
                  isLoggedIn || token ? (
                    <QuestionPaperPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/classroom-detail/:classId"
                element={
                  isLoggedIn || token ? (
                    <ClassroomDetail />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/allclassroom"
                element={
                  isLoggedIn || token ? (
                    <AllClassrooms />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/addquestionpaper"
                element={
                  isLoggedIn || token ? (
                    <AddQuestionPaper />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/createclass"
                element={
                  isLoggedIn || token ? (
                    <CreateClassPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
