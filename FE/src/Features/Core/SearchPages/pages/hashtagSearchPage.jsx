import React from "react";
import {Link} from "react-router-dom";

export default function HashtagSearchPage() {
  return (
    <div className="w-full mx-atuo flex flex-col gap-3">
        <img src={'/comingSoon.png'} className="w-32 mt-32 h-32 mx-auto" alt="coming soon" />
        <div className="text-center text-lg mx-auto font-semibold text-gray-500 mt-4">coming soon to fox...</div>
        <div className="text-center text-lg mx-auto font-semibold text-gray-500 ">maybe go back and discover more of this beautiful NOT site</div>
        <Link to="/" className="bg-orange-500 w-fit mx-auto hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mt-3">back to home</Link>
    </div>
  );
}