import { useState } from "react";
import { Home, Flame, Globe, Plus, ChevronDown } from 'lucide-react';
import CreateCommunity from "../CreateCommunity/CreateCommunity";
import { Link } from "react-router-dom";
const icons = [
   {
      icon: Home,
      title: "Home",
      link: "/",
   },
   {
      icon: Flame,
      title: "Popular",
      link: "/",
   },
   {
      icon: Globe,
      title: "All",
      link: "/",
   },
];

function Sidebar({ className }) {
   const [open, setOpen] = useState(true);

   const toggleSidebar = () => { setOpen(!open); };

   function functionToExecute(event) {
      // Get the dropdown list associated with the clicked button
      const dropdownList = event.target.nextElementSibling;

      // Toggle the visibility of the dropdown list
      if (dropdownList.style.display === "none" || dropdownList.style.display === "") {
         dropdownList.style.display = "block";
      } else {
         dropdownList.style.display = "none";
      }
   }

   const [isModalOpen, setIsModalOpen] = useState(false);

   const openCreateCommunity = () => {
      setIsModalOpen(true); // Open the modal
   };

   const closeCreateCommunity = () => {
      setIsModalOpen(false); // Close the modal
   };
   return (

      <aside id="sidebar-multi-level-sidebar"
         className={`${className} ${open ? 'w-80' : 'w-[0rem]'}  bg-white  h-full transition-width duration-300 ease-in-out bg-white-300 border-r-2 `} aria-label="Sidebar">
         <div className={`h-full px-3 py-15 overflow-y-auto ${!open && 'invisible'}`}>
            <ul className="space-y-2 font-light">
               {
                  icons.map((e, idx) => <li key={idx}>
                     <Link
                        to={e.link}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group"
                     >
                        <e.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" />
                        <span className="ms-3 text-gray-800">{e.title}</span>
                     </Link>
                  </li>
                  )
               }
               <hr className="border-t-2 border-gray-400 dark:border-gray-600 w-full"></hr>

               <li>
                  <button id="dropdownDefaultButton" onClick={functionToExecute} data-dropdown-toggle="dropdown" className="text-gray w-full bg-white-700 hover:bg-gray-200  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 " type="button">RECENTS
                  </button>

                  <div id="dropdown" className="">
                     <ul className="" aria-labelledby="dropdownDefaultButton">
                        <li>
                           <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray">must be created</a>
                        </li>
                     </ul>
                  </div>
               </li>

               <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

               <li>
                  <button id="dropdownDefaultButton1" onClick={functionToExecute} data-dropdown-toggle="dropdown" className="text-gray w-full bg-white-700 hover:bg-gray-200  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 " type="button">
                     YOUR COMMUNITIES
                     <svg onClick={functionToExecute} className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                     </svg>
                  </button>

                  <div id="dropdown1" className="">
                     <ul className="" aria-labelledby="dropdownDefaultButton">
                        <li>
                           <button onClick={openCreateCommunity} className="relative rounded-full flex justify-between gap-2 p-3 h-12 w-44 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray">
                              <Plus className="w-8 h-8 absolute top-2 left-2" />
                              <span className="text-sm absolute top-3 left-12">Create Community</span>
                           </button>
                           {isModalOpen && <CreateCommunity onClose={closeCreateCommunity} />}
                        </li>
                     </ul>
                  </div>
               </li>

               <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

               <li>

                  <button id="dropdownDefaultButton2" onClick={functionToExecute} data-dropdown-toggle="dropdown" className="text-gray w-full bg-white-700 hover:bg-gray-200  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 " type="button">
                     RESOURCES
                     <ChevronDown />
                  </button>

                  <div id="dropdown2" className="">
                     <ul className="py-2 bg-white text-sm text-white-700 dark:text-white-200" aria-labelledby="dropdownDefaultButton">
                        <li >
                           <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray">About Reddit</a>
                        </li>
                        <li>
                           <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray">Advertise</a>
                        </li>
                        <li>
                           <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray">Help</a>
                        </li>
                        <li>
                           <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray">Blog</a>
                        </li>
                        <li>
                           <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray">career</a>
                        </li>
                        <li>
                           <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray">Press</a>
                        </li>
                        <li>

                           <hr className="border-t-2 border-gray-400 dark:border-gray-600 w-full"></hr>

                           <a
                              href="/layout"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                           >
                              <i className="fa-solid fa-users-between-lines w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"></i>
                              <span className=" px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray">Communities</span>
                           </a>
                        </li>

                        <li>
                           <a
                              href="/layout"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                           >
                              <i className="fa-solid fa-medal w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"></i>
                              <span className=" px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray">Best of Reddit</span>
                           </a>
                        </li>

                        <li>
                           <a
                              href="/layout"
                              className="block flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                           >
                              <svg fill="currentColor" className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" height="20" icon-name="topic-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m19.567 18.683-2.194-2.194a3.508 3.508 0 1 0-.884.885l2.194 2.193.884-.884ZM14.5 16.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM5.5 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM12.125 9h4.75A1.127 1.127 0 0 0 18 7.875v-4.75A1.127 1.127 0 0 0 16.875 2h-4.75A1.127 1.127 0 0 0 11 3.125v4.75A1.127 1.127 0 0 0 12.125 9Zm.125-5.75h4.5v4.5h-4.5v-4.5ZM7.875 11h-4.75A1.127 1.127 0 0 0 2 12.125v4.75A1.127 1.127 0 0 0 3.125 18h4.75A1.127 1.127 0 0 0 9 16.875v-4.75A1.127 1.127 0 0 0 7.875 11Zm-.125 5.75h-4.5v-4.5h4.5v4.5Z"></path></svg>
                              <span className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray">Topics</span>
                           </a>
                        </li>

                        <hr className="border-t-2 border-gray-400 dark:border-gray-600 w-full"></hr>

                        <li>
                           <a
                              href="/layout"
                              className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                           >
                              <ChevronDown />
                              <span className=" px-2 py-2">content policy</span>
                           </a>
                        </li>
                        <li>
                           <a
                              href="/layout"
                              className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                           >
                              <ChevronDown />
                              <span className="px-2 py-2">Privacy policy</span>
                           </a>
                        </li>

                        <li>
                           <a
                              href="/layout"
                              className="flex items-center px-2 py-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                           >
                              <ChevronDown />
                              <span className=" px-2 py-2">User agreement</span>
                           </a>
                        </li>
                     </ul>
                  </div>
               </li>
            </ul>
         </div>

         {/* {open && (
            <div className="visible py-md grow flex flex-col justify-end">
               <a className="no-underline text-tone-2 text-10 px-md" href="https://redditinc.com">Reddit, Inc. © 2024. All rights reserved.</a>
            </div>
         )} */}

      </aside>
   );
}
export default Sidebar;