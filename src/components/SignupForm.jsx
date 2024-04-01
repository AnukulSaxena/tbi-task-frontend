import React, { useState } from "react";
import Input from "./Input.jsx";
import { useNavigate } from "react-router-dom";
import authService from "../vercel/authConfig.js";
import Spinner from "./Spinner.jsx";

const SignupForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Redirect to login page
  const handleSignInClick = () => {
    navigate("/login");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate form fields
    if (!formData?.email) {
      newErrors.email = "Email is required";
    }
    if (!formData?.username) {
      newErrors.username = "Username is required";
    }
    if (!formData?.password) {
      newErrors.password = "Password is required";
    }

    // If no validation errors and not loading, create account
    if (Object.keys(newErrors).length === 0 && !loading) {
      setLoading(true);
      setServerError("");
      authService
        .createAccount(formData)
        .then(() => {
          setFormData({
            email: "",
            username: "",
            password: "",
          });
          navigate("/login");
        })
        .catch((err) => setServerError(err.message))
        .finally(() => setLoading(false));
    }
    setErrors(newErrors);
  };

  return (
    <div className="sm:w-[30rem] w-96 h-[30rem]">
      <h1 className="text-center text-2xl font-semibold py-4">Signup</h1>
      <p className="text-red-500 text-sm text-center">{serverError}</p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
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
            {loading ? <Spinner /> : "Sign Up"}
          </button>
        </div>
      </form>
      <p className="text-center py-4">
        Already have an Account? {/* Redirect to login page */}
        <span
          className=" cursor-pointer underline font-semibold"
          onClick={handleSignInClick}
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
