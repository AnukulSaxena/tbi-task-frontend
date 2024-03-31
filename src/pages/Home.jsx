import React from "react";
const Home = () => {
  const username = "something";
  const handleLogOut = () => {
    console.log("logout");
  };
  return (
    <div className=" w-full flex justify-center items-center h-full">
      <div className="">
        <h1 className="font-bold text-4xl text-center">
          Welcome {` ${username}`}
        </h1>
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
