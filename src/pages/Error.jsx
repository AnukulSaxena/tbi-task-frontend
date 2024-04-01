import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  // Get route error object
  const err = useRouteError();

  return (
    <div className="flex h-screen bg-neutral-800 text-white w-full justify-center items-center">
      <div>
        <h1>Ooops!!</h1>
        <h2>Something went wrong.</h2>
        {/* Display error status and status text */}
        <h3>{`${err?.status} : ${err?.statusText}`}</h3>
        {/* Display error data */}
        <h3>{err?.data}</h3>
      </div>
    </div>
  );
};

export default Error;
