import React from "react";
export default function Button({
  children,
  disabled,
  className = "",
  onClick,
  loading,
  btnType,
  role = "",
  color = true,
}) {
  return (
    <button
      role={role}
      type={btnType}
      disabled={disabled}
      onClick={onClick}
      className={` justify-center items-center flex text-white transition ${color &&
        "bg-[color:var(--primary)]  hover:bg-[color:var(--primary-select)]"
        } focus:ring-4 font-medium rounded-2xl text-sm px-5 py-2   focus:outline-none  ${className}`}
    >
      {!loading ? (
        children
      ) : (
        <i className={`fa-solid fa-circle-notch  animate-spin`}></i>
      )}
    </button>
  );
}
