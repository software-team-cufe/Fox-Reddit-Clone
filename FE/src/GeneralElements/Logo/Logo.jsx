/**
 * Logo component.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.className - The additional CSS class for the logo container.
 * @param {string} props.link - The link URL for the logo.
 * @returns {JSX.Element} The rendered Logo component.
 */
import { Link } from "react-router-dom";
import React from "react";

export default function Logo({ className = "", link = "/" }) {


    return (
        <Link to={link || "/"} className={`text-xl gap-2 flex items-center select-none `}>
            <img className="w-[40px] h-[40px]" src="/logo.png" />
            <h5 className=" text-[color:var(--primary)] text-2xl font-extrabold ">fox</h5>
        </Link>
    )
}
