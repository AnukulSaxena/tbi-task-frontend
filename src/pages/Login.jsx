import React, { useLayoutEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useMyContext } from "../components/MyContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { status } = useMyContext();
  useLayoutEffect(() => {
    if (status) navigate("/");
  });
  return (
    <div className="flex justify-center items-center h-full w-full">
      <LoginForm />
    </div>
  );
};

export default Login;
