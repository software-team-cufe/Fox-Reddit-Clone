import { Component } from "lucide-react";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

function Tooltip({ title }) {
  const [IsHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`  flex-col mt-10  absolute ${
        IsHovered ? "opacity-0  " : "opacity-100  "
      }`}
      onMouseEnter={() => setIsHovered(false)}
      onMouseLeave={() => setIsHovered(true)}
    >
      <svg
        className="absolute text-black h-4 left-0 ml-3  "
        x="0px"
        y="0px"
        viewBox="0 0 300 300"
        xmlSpace="preserve"
      >
        <polygon className="fill-current" points="200,10 250,150 150,190" />
      </svg>
      <div
        className="bg-black text-white text-xs rounded py-1 px-4 mt-2  bottom-full"

        //   IsHovered ? "hidden" : "visible"
        // }`
      >
        {title}
      </div>
    </div>
  );
}

export default Tooltip;
