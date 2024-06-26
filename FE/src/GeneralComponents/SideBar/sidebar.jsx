import { useState, useContext } from "react";
import { Home, Flame, Globe, Plus, ChevronDown, BookLock, Handshake, Siren, LayoutGrid, Sparkles } from 'lucide-react';
import CreateCommunity from "../CreateCommunity/CreateCommunity";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import Popular from "./Popular";
import About from "./About";



const icons = [
   {
      icon: Home,
      title: "Home",
      link: "/",
   },
   {
      icon: Flame,
      title: "Popular",
      link: "/Popular",
   },
   {
      icon: Globe,
      title: "All",
      link: "/All",
   },
];

function Sidebar({className,IsOpen}) {
   const [open, setOpen] = useState(true);

   // const toggleSidebar = () => {
   //    setOpen(!open);
   // };


   function functionToExecute(event) {
      // Get the dropdown list associated with the clicked button
      const dropdownList = event.target.nextElementSibling;

      // Toggle the visibility of the dropdown list
      if (
         dropdownList.style.display === "none" ||
         dropdownList.style.display === ""
      ) {
         dropdownList.style.display = "block";
      } else {
         dropdownList.style.display = "none";
      }
   }

   const [isModalOpen, setIsModalOpen] = useState(false);

   const openCreateCommunity = () => {
      setIsModalOpen(true); // Open the modal
      setIsModalOpen(true); // Open the modal
   };


   const closeCreateCommunity = () => {
      setIsModalOpen(false); // Close the modal
      setIsModalOpen(false); // Close the modal
   };

   const path = useLocation();
   
   return (
      <>
         <aside
            id="sidebar-multi-level-sidebar"
            role="sidebarr"
            data-testid="sidebar"
            className={`${className} ${IsOpen ? "w-80" : "w-[0rem]"} ${path.pathname.includes('setting') ? "hidden" : ""}
            md:w-80  overflow-y-auto  bg-white transition-width duration-300 ease-in-out bg-white-300 border-r-2 border-gray-400`}
            aria-label="Sidebar"
         >


            <div
               className={`h-full px-3 py-15 overflow-y-auto ${!IsOpen && "invisible"
                  } md:visible`}
            >
               <ul className="space-y-2 font-light">
                  {icons.map((e, idx) => (
                     <li key={idx}>
                        <Link
                           to={e.link}
                           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group"
                        >
                           <e.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" />
                           <span className="ms-3 text-gray-800">{e.title}</span>
                        </Link>
                     </li>
                  ))}
                  <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

                  <li>
                     <button
                        id="dropdownDefaultButton"
                        onClick={functionToExecute}
                        data-dropdown-toggle="dropdown"
                        className="text-gray w-full bg-white-700 hover:bg-gray-200  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 "
                        type="buttonn"
                     >
                        RECENTS
                     <ChevronDown className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"/>
                     </button>

                     <div id="dropdown" className="">
                        <ul className="" aria-labelledby="dropdownDefaultButton">
                           <li>
                              <a
                                 href="#"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                              >
                                 must be created
                              </a>
                           </li>
                        </ul>
                     </div>
                  </li>

               <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

                  <li>
                     <button
                        id="dropdownDefaultButton1"
                        onClick={functionToExecute}
                        data-dropdown-toggle="dropdown"
                        className="text-gray w-full bg-white-700 hover:bg-gray-200  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 "
                        type="button"
                        role="button1212"
                     >
                        YOUR COMMUNITIES
                        <ChevronDown 
                        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"/>
                     </button>

                     <div id="dropdown1" className="">
                        <ul className="" aria-labelledby="dropdownDefaultButton">
                           <li>
                              <button
                                 onClick={openCreateCommunity}
                                 className="relative rounded-full flex justify-between gap-2 p-3 h-12 w-44 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                              >
                                 <Plus className="w-8 h-8 absolute top-2 left-2" />
                                 <span className="text-sm absolute top-3 left-12">
                                    Create Community
                                 </span>
                              </button>
                              {isModalOpen && (
                                 <CreateCommunity onClose={closeCreateCommunity} />
                              )}
                           </li>
                        </ul>
                     </div>
                  </li>

               <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

                  <li>
                     <button
                        id="dropdownDefaultButton2"
                        onClick={functionToExecute}
                        data-dropdown-toggle="dropdown"
                        className="text-gray w-full bg-white-700 hover:bg-gray-200  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 "
                        type="button"
                     >
                        RESOURCES
                        <ChevronDown className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"/>
                     </button>

                     <div id="dropdown2" className="">
                        <ul
                           className="py-2 bg-white text-sm text-white-700 dark:text-white-200"
                           aria-labelledby="dropdownDefaultButton"
                        >
                           <li>
                              <a
                                 href="/About"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                              >
                                 About Reddit
                              </a>
                           </li>
                           <li>
                              <a
                                 href="/Advertise"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                              >
                                 Advertise
                              </a>
                           </li>
                           <li>
                              <a
                                 href="/Help"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                              >
                                 Help
                              </a>
                           </li>
                           <li>
                              <a
                                 href="/Blog"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                              >
                                 Blog
                              </a>
                           </li>
                           <li>
                              <a
                                 href="/Career"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                              >
                                 career
                              </a>
                           </li>
                           <li>
                              <a
                                 href="/Press"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                              >
                                 Press
                              </a>
                           </li>
                           <li>

                              <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

                              <a
                                 href="/Communities"
                                 className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400"
                              >
                                 <i className="fa-solid fa-users-between-lines w-5 h-5"></i>
                                 <span className="px-2 py-2 text-gray-800" >Communities</span>
                                 
                              </a>
                           </li>

                           <li>
                              <a
                                 href="/BestofReddit"
                                 className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400"
                              >
                                 <Sparkles className="w-5 h-5" />
                                 <span className=" px-2 py-2 text-gray-800">Best of Reddit</span>
                              </a>
                           </li>

                           <li>
                              <a
                                 href="/Topics"
                                 className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400"
                              >
                                 <LayoutGrid strokeWidth={1.5} className="w-5 h-5" />
                                 <span className="px-2 py-2 text-gray-800">Topics</span>
                              </a>
                           </li>

                        <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

                           <li>
                              <a
                                 href="/Contentpolicy"
                                 className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400"
                              >
                                 <Siren className="w-5 h-5"/>
                                 <span className=" px-2 py-2 text-gray-800">content policy</span>
                              </a>
                           </li>
                           <li>
                              <a
                                 href="/PrivacyPolicy"
                                 className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400"
                              >
                                 <BookLock className="w-5 h-5"/>
                                 <span className="px-2 py-2 text-gray-800">Privacy policy</span>
                              </a>
                           </li>

                           <li>
                              <a
                                 href="/Useragreement"
                                 className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400"
                              >
                                 <Handshake className="w-5 h-5"/>
                                 <span className=" px-2 py-2 text-gray-800">User agreement</span>
                              </a>
                           </li>
                        </ul>
                     </div>
                  </li>
               </ul>
            </div>
            
         </aside>
      </>
   );
}
export default Sidebar;
