/**
 * Button component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content of the button.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @param {string} [props.className] - Additional CSS class names for the button.
 * @param {function} [props.onClick] - The click event handler for the button.
 * @param {boolean} [props.loading] - Whether the button is in a loading state.
 * @param {string} [props.btnType] - The type of the button.
 * @param {string} [props.role] - The role attribute for the button.
 * @param {boolean} [props.color=true] - Whether to apply color styles to the button.
 * @returns {JSX.Element} The rendered Button component.
 */
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
        <i className={`fa-solid text-inherit fa-circle-notch  animate-spin`}></i>
      )}
    </button>
  );
}
