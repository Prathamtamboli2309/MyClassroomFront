import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHeartBroken,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import web from "../../assets/web.jpg";
import UploadFileModal from "../UploadFile/UploadFileModal";
import axios from "axios";
import MaterialCard from "./MaterialCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClassroomDetail = () => {
  const { classId } = useParams();
  const { classes, user, likedClasses, addLike, removeLike } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [liked, setLiked] = useState(false);
  const [deleting, setDeleting] = useState(false); // State for showing loader
  const [loading, setLoading] = useState(true); // State for initial data loading
  const [redirect, setRedirect] = useState(false); // State for redirection

  const classData = classes.find((cls) => cls._id === classId);

  useEffect(() => {
    if (likedClasses) {
      likedClasses.forEach((likeclass) => {
        if (
          likeclass.classId._id === classId &&
          likeclass.userId === user._id
        ) {
          setLiked(true);
        }
      });
    }
  }, [likedClasses, classId, user._id]);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(
        `https://myclassroomback.onrender.com/api/material/${classId}`
      );
      setMaterials(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching materials:", error);
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [classId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLike = () => {
    if (liked) {
      removeLike(classId);
    } else {
      addLike(classId);
    }
    setLiked(!liked);
  };

  const deleteClass = async () => {
    setDeleting(true); // Show loader
    try {
      await axios.delete(`https://myclassroomback.onrender.com/api/class/${classId}`);
      toast.success("Class deleted successfully!"); // Show toast
      setRedirect(true); // Trigger redirect
    } catch (error) {
      console.error("Error deleting class:", error);
      toast.error("Error deleting class!");
    } finally {
      setDeleting(false); // Hide loader
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Class not found.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-2 overflow-x-hidden w-full h-screen">
      <div className="max-w-5xl bg-white rounded-lg overflow-hidden flex-flex-col gap-y-8 w-full">
        {/* Header */}
        <div className="relative border-2 rounded-lg overflow-hidden">
          <img
            src={classData.imageUrl || web}
            alt=""
            className="w-full mt-0 max-h-[200px] rounded-lg object-cover"
          />
          <div className="absolute bottom-0 left-0 text-white py-2 px-4 w-full flex items-center">
            <h1 className="text-xl font-semibold">{classData.className}</h1>
            <div className="ml-auto">SEM {classData.semester}</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 mt-2 border-2 rounded-lg ">
          {/* Class Description */}
          <div className="mb-6 flex justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Class Description</h2>
              <p className="text-gray-700">{classData.classDesc}</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Render the heart icon based on the liked state */}
              {liked ? (
                <FontAwesomeIcon
                  icon={faHeartBroken}
                  className="text-red-500 text-[1.5rem] hover:bg-yellow-500 rounded-3xl p-4 py-3 transition-all duration-200"
                  onClick={handleLike}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-gray-500 text-[1.5rem] hover:bg-yellow-500 rounded-3xl p-4 py-3 transition-all duration-200"
                  onClick={handleLike}
                />
              )}
              {classData.creator === user._id && (
                <>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-[1.5rem] hover:bg-yellow-500 rounded-3xl bg-gray-100 p-4 py-3 transition-all duration-200"
                    onClick={openModal}
                  />
                  {deleting ? (
                    <div className="flex items-center">Deleting...</div>
                  ) : (
                    <FontAwesomeIcon
                      icon={faTrash} // Add the delete icon
                      className="text-[1.5rem] hover:bg-yellow-500 rounded-3xl bg-gray-100 p-4 py-3 transition-all duration-200"
                      onClick={deleteClass} // Attach deleteClass function to onClick event
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Classwork */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Classwork</h2>
            <div className="border-t border-gray-200">
              {/* Render material cards for each material */}
              {materials.map((material) => (
                <MaterialCard
                  key={material._id}
                  material={material}
                  creator={classData.creator}
                  fetchMaterials={fetchMaterials}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <UploadFileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        classId={classId}
        fetchMaterials={fetchMaterials}
        onSuccess={() => {}}
      />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default ClassroomDetail;
