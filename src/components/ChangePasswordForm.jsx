import React, { useState } from "react";
import Input from "./Input.jsx";
import authService from "../vercel/authConfig.js";
import Spinner from "./Spinner.jsx";

// ChangePasswordForm component
const ChangePasswordForm = ({ setIsFormOpen }) => {
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate form fields
    if (!formData.oldPassword) {
      newErrors.oldPassword = "Old Password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New Password is required";
    }

    // If no validation errors and not loading, initiate password change
    if (Object.keys(newErrors).length === 0 && !loading) {
      setLoading(true);
      authService
        .changePassword(formData)
        .then(() => {
          setFormData({
            oldPassword: "",
            newPassword: "",
          });
        })
        .catch((err) => setServerError(err.message)) // Set server error on failure
        .finally(() => setLoading(false));
    }
    setErrors(newErrors);
    setServerError("");
  };

  return (
    <div className="absolute inset-0 bg-black backdrop-blur-sm bg-opacity-30 flex justify-center items-center">
      <div className="sm:w-[30rem] w-96 h-[30rem] bg-neutral-500 p-5 rounded-md">
        <div
          onClick={() => {
            setIsFormOpen(false);
          }}
          className="h-10 cursor-pointer w-10 flex justify-center border items-center border-black"
        >
          <i className="ri-close-line"></i>
        </div>
        <h1 className="text-center text-2xl font-semibold py-4">
          Change Password
        </h1>
        <p className="text-red-500 text-sm text-center">{serverError}</p>
        <form onSubmit={handleSubmit}>
          <Input
            label="Old Password"
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            error={errors.oldPassword}
          />
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
          />
          <div className="w-full flex justify-center h-fit">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-12 w-28 rounded mt-4 flex justify-center items-center"
            >
              {/* Show spinner while loading */}
              {loading ? <Spinner /> : "Change"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
