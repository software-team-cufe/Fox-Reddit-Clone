import React, { useState } from "react";
import "tailwindcss/tailwind.css";

function Tooltip({ title, status }) {


  return (
    <div
      className={` z-0 flex-col    absolute ${status ? "opacity-100  " : "opacity-0  "
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
