import { useState } from "react";
import { Home, Flame, Globe, Plus } from 'lucide-react';
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

function Sidebar() {
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

   const [community, setCommunity] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const openCreateCommunity = () => {
     setIsModalOpen(true); // Open the modal
   };
 
   const closeCreateCommunity = () => {
     setIsModalOpen(false); // Close the modal
   };
   return (

      <>

         <aside id="sidebar-multi-level-sidebar" className={`${open ? 'w-80' : 'w-[0rem]'} bg-white fixed top-4 h-screen transition-width duration-300 ease-in-out bg-white-300 border-r-2 border-gray-400`} aria-label="Sidebar">
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



                  <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

                  <li>
                     <a
                        href="/"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-50 dark:hover:bg-gray-100 group"
                     >
                        <Home className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" />
                        <span className="ms-3 text-gray-800">HOME</span>
                     </a>
                  </li>
                  
                  <li>
                     <a href="/popular" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-50 dark:hover:bg-gray-100 group">
                     <Flame className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" />
                        <span className="ms-2 text-gray-800">
                           Popular
                        </span>
                        </a>
                  </li>
                  
                  <li>
                     <a
                        href="/all"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-50 dark:hover:bg-gray-100 group"
                     >
                        <Globe className="fa-solid fa-globe w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"/>
                        <span className="ms-3 text-gray-800">ALL</span>
                     </a>
                  </li>
                  
                  <hr className="border-t-2 border-gray-400 dark:border-gray-600 w-full"></hr>
                  
                  <li>
                     <button id="dropdownDefaultButton" onClick={functionToExecute} data-dropdown-toggle="dropdown" className="text-gray w-full bg-white-700 hover:bg-gray-200  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 " type="button">RECENTS<svg onClick={functionToExecute} className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                     </svg>
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
                           {isModalOpen && <CreateCommunity onClose={closeCreateCommunity}/>}
                           </li>
                        </ul>
                     </div>
                  </li>

                  <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

                  <li>

                     <button id="dropdownDefaultButton2" onClick={functionToExecute} data-dropdown-toggle="dropdown" className="text-gray w-full bg-white-700 hover:bg-gray-200  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 " type="button">RESOURCES<svg onClick={functionToExecute} className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                     </svg>
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
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                              >
                                 <svg fill="currentColor" className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" height="20" icon-name="topic-law-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.375 1H18.25V0H17v1h-1.375a.625.625 0 0 0-.625.625V3H5V1.625A.625.625 0 0 0 4.375 1H3.25V0H2v1H.625A.625.625 0 0 0 0 1.625v16.75A.625.625 0 0 0 .625 19H2v1h1.25v-1h1.125A.625.625 0 0 0 5 18.375V17h10v1.375a.624.624 0 0 0 .625.625H17v1h1.25v-1h1.125a.624.624 0 0 0 .625-.625V1.625A.625.625 0 0 0 19.375 1ZM3.75 17.75h-2.5V2.25h2.5v15.5Zm1.25-2V4.25h10v11.5H5Zm13.75 2h-2.5V2.25h2.5v15.5ZM7.782 7.025h4.436v1.25H7.782v-1.25Zm0 4h4.436v1.25H7.782v-1.25Z"></path>
                                 </svg>
                                 <span className=" px-4 py-2">content policy</span>
                              </a>
                           </li>
                           <li>
                              <a
                                 href="/layout"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                              >
                                 <span className="flex shrink-0 items-center justify-center h-xl w-xl text-20 leading-4">
                                    <svg fill="currentColor" className="w-5 h-5 text-gray-500 transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray" height="20" icon-name="topic-law-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M2.3 8.625 3.621 5.31l1.324 3.315h1.346L4.256 3.53a1.37 1.37 0 0 1 1.362-1.28h8.764a1.37 1.37 0 0 1 1.362 1.28l-2.035 5.1h1.346l1.324-3.32L17.7 8.625h1.346l-2.061-5.16A2.62 2.62 0 0 0 14.382 1H5.618a2.62 2.62 0 0 0-2.606 2.465L.951 8.625H2.3Z"></path>
                                       <path d="M6.617 10H.625a.625.625 0 0 0-.625.625 3.62 3.62 0 1 0 7.242 0A.625.625 0 0 0 6.617 10Zm-3 3a2.376 2.376 0 0 1-2.288-1.75h4.58A2.376 2.376 0 0 1 3.621 13h-.004Z"></path>
                                       <path d="M19.375 10h-5.992a.624.624 0 0 0-.625.625 3.622 3.622 0 0 0 6.966 1.386c.182-.44.276-.91.276-1.386a.624.624 0 0 0-.625-.625Zm-3 3a2.376 2.376 0 0 1-2.288-1.75h4.576A2.375 2.375 0 0 1 16.379 13h-.004Z"></path>
                                       <path d="M10.625 5h-1.25v12.7H6.479v1.25h7.042V17.7h-2.896V5Z"></path>
                                    </svg>
                                 </span>
                                 <span className="px-4 py-2">Privacy policy</span>
                              </a>
                           </li>

                           <li>
                              <a
                                 href="/layout"
                                 className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                              >
                                 <svg fill="currentColor" className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" height="20" icon-name="topic-law-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.35 7.333H5.733V6.77h.48V5.23a1.232 1.232 0 0 1-.47.111v-.507c.178.01.353-.05.487-.167h.7v2.1h.419l.003.566Zm-.767 1.92c.164 0 .258.082.258.23 0 .22-.115.276-.516.522-.7.422-.768.806-.768 1.185v.143h1.975v-.564H6.374c.039-.106.149-.236.483-.424.538-.29.659-.581.659-.878 0-.488-.3-.8-.916-.8a1.171 1.171 0 0 0-1.05.633l.479.345a.708.708 0 0 1 .554-.392Zm.536 4.66a.544.544 0 0 0 .383-.545c0-.438-.313-.7-.9-.7a1.435 1.435 0 0 0-1.01.4l.369.427a.824.824 0 0 1 .588-.26c.178 0 .275.081.275.211 0 .156-.1.253-.448.253h-.218v.482h.205c.356 0 .507.086.507.307 0 .162-.1.28-.383.28a.7.7 0 0 1-.566-.334L5.5 14.8a1.22 1.22 0 0 0 1.047.529c.626 0 1.036-.286 1.036-.826a.581.581 0 0 0-.464-.59Zm1.88-3.288h6v-1.25H9v1.25Zm0 4h6v-1.25H9v1.25Zm0-8h6v-1.25H9v1.25Zm9-5.014v17.271A1.123 1.123 0 0 1 16.876 20h-12.7a1.123 1.123 0 0 1-1.125-1.118V4.25h-.875A1.127 1.127 0 0 1 1.05 3.125v-1.5A1.627 1.627 0 0 1 2.675 0h13.7A1.62 1.62 0 0 1 18 1.611ZM2.3 3h.75V1.625a.375.375 0 0 0-.75 0V3Zm14.45-1.389a.369.369 0 0 0-.374-.361H4.252a1.6 1.6 0 0 1 .048.375V18.75h12.45V1.611Z"></path>
                                 </svg>
                                 <span className=" px-4 py-2">User agreement</span>
                              </a>
                           </li>
                        </ul>
                     </div>
                  </li>
               </ul>
            </div>

            {open && (
               <div className="visible py-md grow flex flex-col justify-end">
                  <a className="no-underline text-tone-2 text-10 px-md" href="https://redditinc.com">Reddit, Inc. © 2024. All rights reserved.</a>
               </div>
            )}

         </aside>
      </>
   );
}
export default Sidebar;