import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faBars,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import UserModal from "../UserProfile/UserModal"; // Import the UserModal component

const NavigationBar = ({ setIsOpen, isOpen, handleLogout }) => {
  const { user } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="text-black p-4 border-b w-full fixed top-0 left-0 sm:relative sm:flex-none z-[6] bg-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <div
            className="p-4 py-3 hover:rounded-3xl transition-all duration-500 hover:bg-gray-200 cursor-pointer flex justify-center md:block hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={faBars} className="text-[1.5rem]" />
          </div>
          <FontAwesomeIcon icon={faUserGraduate} className="text-[1.5rem]" />
          <h1 className="text-xl">My Classroom</h1>
        </div>
        <div className="flex items-center md:gap-x-4">
          {user != null && user.role === "faculty" && (
            <Link to="/createclass">
              <FontAwesomeIcon
                icon={faPlus}
                className="text-[1.5rem] hover:rounded-3xl hover:bg-gray-100 p-4 py-3 transition-all duration-200"
              />
            </Link>
          )}
          <FontAwesomeIcon
            icon={faUser}
            className="text-[1.5rem] hover:rounded-3xl hover:bg-gray-100 p-4 py-3 transition-all duration-200 "
            onClick={handleProfileClick} // Add click handler for profile icon
          />
          <button onClick={handleLogout} className="flex items-center gap-x-4">
            <span className="sm:block hidden">Logout</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <UserModal
          user={user}
          onClose={handleCloseModal}
          handleLogout={handleLogout}
        />
      )}{" "}
      {/* Render the modal */}
    </nav>
  );
};

export default NavigationBar;
