import React, { useState } from "react";
import authService from "../vercel/authConfig";
import { useMyContext } from "../components/MyContext";
import { useNavigate } from "react-router-dom";
import ChangePasswordForm from "../components/ChangePasswordForm.jsx";

const Home = () => {
  const { status, setStatus, userData, setUserData } = useMyContext();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Function to handle logout
  const handleLogOut = () => {
    // If user is logged in, log them out
    if (status) {
      authService
        .logoutAccount()
        .then((res) => {
          setUserData(null);
          setStatus(false);
        })
        .catch((err) => console.error(err));
    } else {
      navigate("/login"); // If user is not logged in, navigate to login page
    }
  };

  return (
    <div className="w-full flex justify-center items-center relative h-full">
      {isFormOpen && <ChangePasswordForm setIsFormOpen={setIsFormOpen} />}{" "}
      {/* Render change password form if open */}
      <div className="">
        <h1 className="font-bold text-4xl py-5 text-center">
          Welcome {` ${userData?.username || ""}`}{" "}
          {/* Display welcome message with username */}
        </h1>
        {/* Render change password button if user is logged in */}
        {status && (
          <div className="w-96">
            <button
              onClick={() => {
                setIsFormOpen(true); // Open change password form on button click
              }}
              className="w-full h-10 bg-blue-300 rounded-md"
            >
              Change Password
            </button>
          </div>
        )}
        {/* Render login/logout button */}
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleLogOut} // Call logout function on button click
          >
            {status ? "Log Out" : "Log In"}{" "}
            {/* Display "Log Out" if user is logged in, "Log In" otherwise */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
