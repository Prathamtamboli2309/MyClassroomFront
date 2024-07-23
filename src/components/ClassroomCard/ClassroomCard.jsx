import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLink, faPlus } from "@fortawesome/free-solid-svg-icons";
import UploadFileModal from "../UploadFile/UploadFileModal";

const ClassroomCard = ({ classItem }) => {
  const { user } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const openModal = (classId) => {
    setSelectedClassId(classId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-[300px] w-full">
      <Link
        to={`/classroom-detail/${classItem._id}`}
        className="cursor-pointer"
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-2xl">
          <div className="relative">
            <img
              className=" w-full  h-32 object-cover"
              src={classItem.imageUrl}
              alt={classItem.className}
            />
            <div className="absolute top-0 left-0 bg-blue-600 text-white px-2 py-1 rounded-tr-lg">
              SEM {classItem.semester}
            </div>

            {classItem.creator === user._id && (
              <div className="absolute -bottom-8 right-2">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-[1.5rem] hover:bg-yellow-500  rounded-3xl bg-gray-100 p-4 py-3 transition-all duration-200"
                  onClick={() => openModal(classItem._id)}
                />
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              {classItem.className}
            </h2>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  Created On{" "}
                  {new Date(classItem.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ClassroomCard;
