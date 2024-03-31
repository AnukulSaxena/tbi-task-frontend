import React from "react";
import authService from "../vercel/authConfig";
import { useMyContext } from "../components/MyContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { status, setStatus, userData, setUserData } = useMyContext();
  const navigate = useNavigate();
  const username = "something";
  const handleLogOut = () => {
    if (status) {
      authService.logoutAccount().then((res) => {
        setUserData(null);
        setStatus(false);
      });
    } else {
      navigate("/login");
    }
  };
  return (
    <div className=" w-full flex justify-center items-center h-full">
      <div className="">
        <h1 className="font-bold text-4xl text-center">
          Welcome {` ${userData?.username || ""}`}
        </h1>
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
