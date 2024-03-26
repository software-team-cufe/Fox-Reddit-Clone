import React from "react";
import Navofsetting from "./navofsetting";
import { ChevronDown } from "lucide-react";

export default function ChatMessaging() {

    const listOfOptions = (event) => {
        // Stop propagation to prevent the document's click event from hiding the dropdown
        event.stopPropagation();
        const dropdownList = event.target.nextElementSibling;
    
        // Toggle the visibility of the dropdown list
        if (dropdownList.style.display === "none" || dropdownList.style.display === "") {
            dropdownList.style.display = "block";
    
            // Add a click event listener to the document to hide the dropdown
            document.addEventListener('click', function hideDropdown(event) {
                dropdownList.style.display = "none";
                // Remove the event listener after it's executed
                document.removeEventListener('click', hideDropdown);
            });
        } else {
            dropdownList.style.display = "none";
        }
    }
    
    const DoReadToAll = () =>{
        //this function should Mark all massages as read
    }
    

    return (
        <div>
            <Navofsetting />
            <br></br><br></br>
            <h1 className="text-2xl">Chat & Messaging</h1>
            <br></br><br></br>
            <div className="grid-rows-3 justify-between mt-7 w-1/2">
                <div className="flex justify-between flex-wrap ">
                    <div>Who can send you chat requests</div>
                    <div className="w-auto">
                        <button id="dropdownDefaultButton" onClick={listOfOptions} data-dropdown-toggle="dropdown" 
                        className="text-white w-auto bg-blue-700 hover:bg-blue-800
                        font-medium rounded-lg text-sm px-3 py-2.5 text-center
                        inline-flex gap-5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                            Dropdown button <ChevronDown />
                        </button>

                        <div id="dropdown" className="z-10 w-auto hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-black-700 dark:text-gray-200 w-auto" aria-labelledby="dropdownDefaultButton">
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

                <div className="flex justify-between">
                    <div className="flex flex-wrap">
                        <div className="">Who can send you private message</div>
                        <h6 className="text-gray-400 text-wrap ">Heads up—Reddit admins and moderators of communities you have joined can message you even if they are not approved.</h6>
                    </div>
                    
                    <div className="w-auto">
                        <button id="dropdownDefaultButton" onClick={listOfOptions} data-dropdown-toggle="dropdown" 
                        className="text-white w-auto bg-blue-700 hover:bg-blue-800
                        font-medium rounded-lg text-sm px-3 py-1 text-center
                        inline-flex gap-5 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                            Dropdown button <ChevronDown />
                        </button>

                        <div id="dropdown" className="z-10 w-auto hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    Everyone
                                </li>
                                <li>
                                    Nobody                                
                                </li>
                            </ul>
                        </div>    
                    </div>
                </div>
        
                <br></br><br></br>

                <div className="flex justify-between flex-wrap">
                    <div>
                        <div>Mark all as read</div>
                        <h4 className="text-gray-400">Mark all conversations and invites as read.</h4>
                    </div>
                    <div className="w-auto">
                        <button id="dropdownDefaultButton" onClick={DoReadToAll} data-dropdown-toggle="dropdown" 
                        className="text-black dark:text-blue-500 w-auto focus:ring-blue-300 font-medium border-solid border-2 border-sky-500 rounded-lg text-sm px-5 py-2.5 text-center 
                        inline-flex gap-5 items-center bg-transparent dark:bg-transparent dark:hover:bg-blue-200 dark:focus:ring-blue-800 rounded-3xl" type="button">
                            Mark as Read 
                        </button>
                    </div>
                </div>        
            </div>
        </div>
    );
}