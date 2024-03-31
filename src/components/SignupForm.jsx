import React, { useState } from "react";
import Input from "./Input.jsx";
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
    }
    setErrors(newErrors);
  };

  return (
    <div className="sm:w-[30rem] w-96 h-[30rem]">
      <h1 className="text-center text-2xl font-semibold py-4">Signup</h1>
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="text-center py-4">
        Already have an Account?{" "}
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
