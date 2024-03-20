import React from "react";
import Navofsetting from "./navofsetting";
import { list } from "postcss";

export default function ChatMessaging() {
    
    function listOfOptions () {
        var dropdown = document.getElementById("dropdown");
        if (dropdown.style.display === "none") {
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
        document.addEventListener("click", closeDropdownOutside);
    }

    function closeDropdownOutside(event) {
        var dropdown = document.getElementById("dropdown");
        var dropdownButton = document.getElementById("dropdownDefaultButton");
        if (!dropdown.contains(event.target) && event.target !== dropdownButton) {
            dropdown.classList.add("hidden");
            document.removeEventListener("click", closeDropdownOutside);
        }
    }

    return (
        <div>
            <Navofsetting />
            <br></br><br></br>
            <h1>Chat & Messaging</h1>
            <br></br><br></br>

            <div className="flex gap-[10em] ">
                <div className="mr-[14em]">Who can send you chat requests?</div>
                <div className="w-auto">
                    <button id="dropdownDefaultButton" onClick={listOfOptions} data-dropdown-toggle="dropdown" 
                    className="text-white w-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                    inline-flex gap-5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Dropdown button 
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>

                    <div id="dropdown" className="z-10 w-auto hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                Everyone
                            </li>
                            <li>
                                Accounts Older Than 30 Days
                            </li>
                            <li>
                                Nobody
                            </li>
                        </ul>
                    </div>    
                </div>
            </div>

            <br></br><br></br>

            <div className="flex gap-[10em] ">
                <div>
                    <div>Who can send you chat requests?</div>
                    <h4 className="text-gray-400">kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</h4>
                </div>
                <div className="w-auto">
                    <button id="dropdownDefaultButton" onClick={listOfOptions} data-dropdown-toggle="dropdown" 
                    className="text-white w-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                    inline-flex gap-5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Dropdown button 
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>

                    <div id="dropdown" className="z-10 w-auto hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                Everyone
                            </li>
                            <li>
                                Accounts Older Than 30 Days
                            </li>
                        </ul>
                    </div>    
                </div>
            </div>

            <br></br><br></br>

            <div className="flex gap-[10em] ">
                <div>
                    <div>Who can send you chat requests?</div>
                    <h4 className="text-gray-400">kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</h4>
                </div>
                <div className="w-auto">
                    <button id="dropdownDefaultButton" onClick={listOfOptions} data-dropdown-toggle="dropdown" 
                    className="text-white w-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                    inline-flex gap-5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Dropdown button 
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>

                    <div id="dropdown" className="z-10 w-auto hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                Everyone
                            </li>
                            <li>
                                Accounts Older Than 30 Days
                            </li>
                        </ul>
                    </div>    
                </div>
            </div>
        </div>
    );
}