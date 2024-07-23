// UserModal.jsx
import React from "react";

const UserModal = ({ user, onClose, handleLogout }) => {
  if (!user) return null;

  return (
    <div className="fixed top-0 md:right-20 right-2 w-auto z-[9] border-2 rounded-lg max-w-full h-auto mt-[57px] mr-[4px] overflow-hidden">
      <div
        className="absolute inset-0 bg-gray-800 bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative bg-white rounded-lg shadow-lg p-4 border-2 overflow-hidden"
        style={{ maxHeight: "calc(-61px + 100dvh)", minHeight: "210px" }}
      >
        {/* <iframe
          role="presentation"
          name="account"
          src="about:blank"
          style={{ height: "100%", width: "100%", visibility: "hidden" }}
        /> */}
        <div className="relative ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">User Details</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-[2rem]"
            >
              &times;
            </button>
          </div>
          <div>
            <p>
              <strong>Name:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={handleLogout}
              className="flex items-center gap-x-4 border-2 justify-center w-full mt-4 py-1 rounded-full bg-yellow-500 block md:hidden"
            >
              <span className="">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
