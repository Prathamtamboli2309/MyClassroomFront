import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTasks, faBullhorn } from "@fortawesome/free-solid-svg-icons"; // Example icons
import { Link } from "react-router-dom";
import { IoNewspaper } from "react-icons/io5";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`transition-all duration-500 fixed top-[5rem] sm:top-0 left-0 sm:relative sm:flex-none z-[5] ${
        isOpen ? "md:w-64" : "w-full sm:w-20"
      } bg-gray-800 text-white sm:h-auto p-4 pl-7 h-[4rem] `}
    >
      <ul className="sm:space-y-4 flex sm:flex-col flex-row gap-y-5 gap-x-8 justify-evenly">
        {/* Home */}
        <Link to="/">
          <li className="flex items-center gap-x-4">
            <FontAwesomeIcon
              icon={faHome}
              className="text-[2rem] sm:text-[1.5rem]"
            />
            {isOpen && <span className="hidden sm:block">Home</span>}
          </li>
        </Link>
        {/* All Classrooms */}
        <Link to="/allclassroom" className="">
          <li className="flex items-center gap-x-4">
            <FontAwesomeIcon
              icon={faTasks}
              className="text-[2rem] sm:text-[1.5rem]"
            />
            {isOpen && <span className="hidden sm:block">Classrooms</span>}
          </li>
        </Link>
        {/* Class */}
        <Link to="/announcement" className="">
          <li className="flex items-center gap-x-4">
            <FontAwesomeIcon
              icon={faBullhorn}
              className="text-[2rem] sm:text-[1.5rem]"
            />
            {isOpen && <span className="hidden sm:block">Announcements</span>}
          </li>
        </Link>
        <Link to="/questionpaper" className="">
          <li className="flex items-center gap-x-4">
            <IoNewspaper className="text-[2rem] sm:text-[1.5rem]" />
            {isOpen && <span className="hidden sm:block">QuestionPapers</span>}
          </li>
        </Link>
        {/* Profile */}
      </ul>
    </div>
  );
};

export default Sidebar;
