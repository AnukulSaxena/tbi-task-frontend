import React, { useState } from "react";
import Input from "./Input.jsx";
import { useNavigate } from "react-router-dom";
import authService from "../vercel/authConfig.js";
import { useMyContext } from "./MyContext.jsx";
import Spinner from "./Spinner.jsx";

const LoginForm = () => {
  const { setStatus, setUserData } = useMyContext();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Redirect to signup page
  const handleSignInClick = () => {
    navigate("/signup");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate form fields
    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    // If no validation errors and not loading, initiate login
    if (Object.keys(newErrors).length === 0 && !loading) {
      setLoading(true);

      authService
        .loginAccount(formData)
        .then((res) => setUserData(res?.data?.user))
        .then(() => {
          setStatus(true);
          setFormData({
            username: "",
            password: "",
          });
          navigate("/");
        })
        .catch((err) => setServerError(err.message))
        .finally(() => setLoading(false));
    }
    setErrors(newErrors);
    setServerError("");
  };

  return (
    <div className="sm:w-[30rem] w-96 h-[30rem]">
      <h1 className="text-center text-2xl font-semibold py-4">Login</h1>
      <p className="text-red-500 text-sm text-center">{serverError}</p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          autoComplete="username"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />
        <div className="w-full flex justify-center h-fit">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-12 w-28 rounded mt-4 flex justify-center items-center"
          >
            {/* Show spinner while loading */}
            {loading ? <Spinner /> : "Log In"}
          </button>
        </div>
      </form>
      <p className="text-center py-4">
        Don't have an Account? {/* Redirect to signup page */}
        <span
          className=" cursor-pointer underline font-semibold"
          onClick={handleSignInClick}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
