import React, { useLayoutEffect } from "react";
import SignupForm from "../components/SignupForm";
import { useMyContext } from "../components/MyContext.jsx";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { status } = useMyContext();

  // Redirect to home page if user is already logged in
  useLayoutEffect(() => {
    if (status) navigate("/");
  });

  return (
    <div className="flex justify-center items-center h-full w-full">
      <SignupForm />
    </div>
  );
};

export default Signup;
