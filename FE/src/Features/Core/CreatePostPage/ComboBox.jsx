import React, { useState } from 'react';
import { ChevronDown } from "lucide-react"
const Dropdown = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const options = [1, 2, 3, 4, 5, 6, 7];

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative inline-block w-24 h-2 mt-2 text-left">
            <div>
                <button type="button" onClick={toggleDropdown} className="inline-flex text-xs justify-center
                 w-full rounded-md border border-gray-300 shadow-sm   pt-2  bg-white  
                  font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu"
                    aria-haspopup="true" aria-expanded="true">
                    {props.SelectedOption} Day
                    <ChevronDown />
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-24 h-12 rounded-md shadow-lg
                 bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1 rounded-md bg-white shadow-xs" role="menu"
                        aria-orientation="vertical" aria-labelledby="options-menu">
                        {options.map((option) => (
                            <button key={option} className="block w-full rounded  py-2 px-4 text-xs
                            text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem" onClick={() => {
                                    props.SetSelectedOption(option);
                                    toggleDropdown();
                                }}
                            > {option} Day</button>

                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;

