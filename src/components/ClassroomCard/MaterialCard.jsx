import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Loader = () => (
  <div className="flex justify-center items-center ">
    <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-600"></div>
  </div>
);

const MaterialCard = ({ material, fetchMaterials, creator }) => {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `https://myclassroomback.onrender.com/api/material/${material._id}`
      );
      fetchMaterials(); // Refresh materials list after deletion
    } catch (error) {
      console.error("Error deleting material:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if the current user is the creator of the class associated with the material
  let isCreator = user._id == creator;

  return (
    <div className="p-4 border-b border-gray-200 flex justify-between sm:flex-row flex-col gap-5">
      <div>
        <a
          href={material.cloudinaryLink}
          target="_blank"
          className="flex items-center gap-4"
        >
          <FontAwesomeIcon
            icon={faFilePdf}
            className="text-[1.5rem] hover:bg-yellow-500  rounded-3xl bg-gray-100 p-4 py-3 transition-all duration-200"
          />
          <h3 className="text-lg font-semibold">{material.fileName}</h3>
        </a>
      </div>
      <div className="mt-2 flex gap-4 items-center">
        <a
          href={material.cloudinaryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Material
        </a>
        {/* Show delete button only if the user is the creator of the associated class */}
        {isCreator && (
          <>
            {loading ? (
              <Loader />
            ) : (
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="text-red-500 cursor-pointer"
                onClick={handleDelete}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MaterialCard;
