import React, { useId } from "react";

const Input = ({
  error,
  label,
  type = "text",
  labelClass = "text-lg ps-4 py-2",
  inputClass = "px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full",
  className = "w-full",
  ...props
}) => {
  const id = useId();
  return (
    <div className={`${className}`}>
      {label && (
        <label className={`${labelClass} inline-block`} htmlFor={id}>
          {label}
        </label>
      )}
      <input type={type} className={` ${inputClass}`} {...props} id={id} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
