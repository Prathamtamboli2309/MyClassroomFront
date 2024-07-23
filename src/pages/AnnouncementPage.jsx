import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaFileAlt } from "react-icons/fa"; // Import icons
import { SiGoogleclassroom } from "react-icons/si";
const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "https://myclassroomback.onrender.com/api/announcement"
        );
        setAnnouncements(response.data.announcements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="container p-2 md:p-4 h-screen w-full">
        <h1 className="text-3xl font-bold mb-8">Announcements</h1>
        {announcements.length === 0 ? (
          <div className="text-gray-700">No announcements available</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {announcements
              .slice()
              .reverse()
              .map((announcement) => (
                <div
                  key={announcement._id}
                  className="p-4 bg-white shadow rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-xl text-blue-500 mr-2">
                      <SiGoogleclassroom />
                    </span>
                    <h2 className="text-lg font-semibold">
                      {announcement.message}
                    </h2>
                  </div>
                  <p className="text-gray-700">{announcement.description}</p>
                  <p>{announcement.createdAt}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementPage;
