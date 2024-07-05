import React, { useState } from "react";
import "tailwindcss/tailwind.css";

/**
 * @file The Tooltip component is a reusable component 
 * that displays a tooltip with a title when hovered over.
 *  It provides a simple way to add tooltips to various elements in a React application.
 * @module Tooltip
 */

function Tooltip({ title, status }) {
  const [IsHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`  flex-col    absolute ${status ? "opacity-100  " : "opacity-0  "
        }`}
    >
      <svg
        className="absolute text-gray-100 h-4 left-0 ml-3  "
        x="0px"
        y="0px"
        viewBox="0 0 300 300"
        xmlSpace="preserve"
      >
        <polygon className="fill-current" points="200,10 250,150 150,190" />
      </svg>
      <div className="bg-gray-100 text-black text-xs rounded py-1 px-4 mt-2  bottom-full">
        {title}
      </div>
    </div>
  );
}

export default Tooltip;
