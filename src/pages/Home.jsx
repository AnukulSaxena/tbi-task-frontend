import React, { useState } from "react";
import authService from "../vercel/authConfig";
import { useMyContext } from "../components/MyContext";
import { useNavigate } from "react-router-dom";
import ChangePasswordForm from "../components/ChangePasswordForm.jsx";

const Home = () => {
  const { status, setStatus, userData, setUserData } = useMyContext();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleLogOut = () => {
    if (status) {
      authService
        .logoutAccount()
        .then((res) => {
          setUserData(null);
          setStatus(false);
        })
        .catch((err) => console.error(err));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className=" w-full flex justify-center items-center relative h-full">
      {isFormOpen && <ChangePasswordForm setIsFormOpen={setIsFormOpen} />}
      <div className="">
        <h1 className="font-bold text-4xl py-5 text-center">
          Welcome {` ${userData?.username || ""}`}
        </h1>
        {status && (
          <div className="w-96">
            <button
              onClick={() => {
                setIsFormOpen(true);
              }}
              className="w-full h-10 bg-blue-300 rounded-md"
            >
              Change Password
            </button>
          </div>
        )}
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleLogOut}
          >
            {status ? "Log Out" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
