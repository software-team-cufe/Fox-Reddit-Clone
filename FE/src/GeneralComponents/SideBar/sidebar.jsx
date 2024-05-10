/**
 * @file Sidebar component for the Fox Reddit Clone application.
 * @module Sidebar
 */
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Home, Flame, Globe, Plus, ChevronDown, BookLock, Handshake, Siren, LayoutGrid, Sparkles, Mail, Table } from 'lucide-react';
import CreateCommunity from "../CreateCommunity/CreateCommunity";
import { Link, useLocation } from "react-router-dom";
import { key } from 'localforage';
import { userAxios } from "../../Utils/UserAxios";
import { useSelector } from 'react-redux';
import { userStore } from "../../hooks/UserRedux/UserStore"; 
const icons = [
   {
      icon: Home,
      title: "Home",
      link: "/",
   },
   {
      icon: Flame,
      title: "Popular",
      link: "/r/Popular",
   },
   {
      icon: Globe,
      title: "All",
      link: "/r/All",
   },
];



function Sidebar({ className, IsOpen, RecentCommunities }) {
   // const toggleSidebar = () => {
   //    setOpen(!open);
   // };
   // useEffect(() => {
   //    axios.get("http://localhost:3002/users").then(response=> {

   //    })
   // },[])

   /**
    * this function open resources , community , and Recents dropdown list
    * 
    * @param {Event} event - the event of clicking any button
    * @returns {void} - this function does not return anything
    */

   const [temp, settemp] = useState(false);
   const [isModerators, setIsModerators] = useState(false);//gata of user to test if moderator or not
   const [creatorForSubredit, setCreatorForSubreddit] = useState([]);//the creator in the subreddit
   const [userMemberInSubreddits, setUserMemberInSubreddits] = useState([]);//follower for subreddit
   const [moderatorInSubreddits, setModeratorInSubreddits] = useState([]);//moderator in the subreddit
   function functionToExecute(event) {
      // Get the dropdown list associated with the clicked button
      const dropdownList = event.target.nextElementSibling;

      // Toggle the visibility of the dropdown list
      if (
         dropdownList.style.display === "none") {
         dropdownList.style.display = "block";
      } else {
         dropdownList.style.display = "none";
      }
   }

   //check if user is moderator
   // const fetchUserData = async () => {
   //    try {
   //       const response = await userAxios.get(`/user/annas_alaa/about`);
   //       const isModerator = response.data.isMod;
   //       setIsModerators(response.data.isMod);
   //       //console.log(response.data);
   //       //console.log(isModerator);
   //    } catch (error) {
   //       console.error('Error fetching user info:', error);
   //    }
   // }
if(userStore.getState().user.user != null){
   //get subreddits where user is moderator
   useEffect(() => {
      const fetchSubreddits = async () => {
         try {
            const response = await userAxios.get(`subreddits/mine/moderator`);
            const subreddits = response.data;
            setModeratorInSubreddits(subreddits.communities);
            //console.log(response.data.communities);
            if (subreddits.communities.length > 0) {
               settemp(true);
            } else {
               settemp(false);
            }
            //console.log(subreddits);
            //console.log(response.data);
         } catch (error) {
            console.error('Error fetching user info:', error);
         }
      }

      fetchSubreddits();

   }, [])

   //get subreddits where user is member
   useEffect(() => {
      const fetchSubredditsUserMemberAt = async () => {
         try {
            const response = await userAxios.get(`subreddits/mine/member`);
            const subreddits = response.data.communities;
            setUserMemberInSubreddits(response.data.communities);
            //console.log(subreddits);
         } catch (error) {
            console.error('Error fetching user info:', error);
         }
      }

      fetchSubredditsUserMemberAt();
   }, [])


   //get subreddits where user is creator
   useEffect(() => {
      const fetchSubredditsUserCreated = async () => {
         try {
            const response = await userAxios.get(`subreddits/mine/creator`);
            const subreddits = response.data.communities;
            setCreatorForSubreddit(response.data.communities);
            //            console.log(subreddits);
         } catch (error) {
            console.error('Error fetching user info:', error);
         }
      }

      fetchSubredditsUserCreated();
   }, [])
}
   
   //handle youCommunitiesList known that it contains both moderator and creator subreddits
   const modComList = [...creatorForSubredit, ...moderatorInSubreddits];
   const yourCommunitiesList = [...creatorForSubredit, ...userMemberInSubreddits];

   let tempForClear = [];

   for (let i = 0; i < modComList.length; i++) {
      if (moderatorInSubreddits.includes(modComList[i]) && !tempForClear.includes(modComList[i])) {
         tempForClear.push(modComList[i]);
      }
   }

   tempForClear = [...new Set(tempForClear)];

   let tempForYourCom = [];

   for (let i = 0; i < yourCommunitiesList.length; i++) {
      if (userMemberInSubreddits.includes(yourCommunitiesList[i]) && !tempForYourCom.includes(yourCommunitiesList[i])) {
         tempForYourCom.push(yourCommunitiesList[i]);
      }
   }
   //console.log(tempForYourCom);

   tempForYourCom = [...new Set(tempForYourCom)];
   //console.log(yourCommunitiesList);
   //console.log(userMemberInSubreddits);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [yourCommunities, setYourCommunities] = useState([]);

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
            className={`${className} ${IsOpen ? "md:w-80 md:relative w-2/3 md:display-block z-30 absolute" : "w-[0rem]"} ${path.pathname.includes('setting') || path.pathname.includes('message') ? "hidden" : ""} ${path.pathname.includes('submit') ? "hidden" : ""}
            lg:w-80  overflow-y-auto  bg-white transition-width duration-300 ease-in-out bg-white-300 border-r-2 border-gray-400 h-screen`}
            aria-label="Sidebar"
         >


            <div
               className={` ${path.pathname.includes('submit') || path.pathname.includes('message') ? "hidden" : ""} h-full px-3 py-15 overflow-y-auto ${!IsOpen && "invisible"
                  }  lg:visible`}
            >
               <ul className="space-y-2 font-light">
                  {icons?.map((e, idx) => (
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



                  {temp ?
                     <>
                        <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>
                        <button
                           id="dropdownDefaultButtonForModerator"
                           onClick={functionToExecute}
                           data-dropdown-toggle="dropdown"
                           className="text-gray w-full bg-white-700 hover:bg-gray-200 txt-large focus:outline-none justify-between font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 "
                           type="buttonn"
                        >
                           MODERATOR
                           <ChevronDown className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" />
                        </button>
                        <div>
                           <ul>
                              <li className="flex items-center px-1 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400" id="modMail">
                                 <Link to={"/modmail"} className="flex items-center" id="linkToModMail">
                                    <Mail className="ml-2 w-4 h-4" />
                                    <span className=" px-2 py-2 text-gray-800" id="textToModMail">Mod mail</span>
                                 </Link>
                              </li>
                              <li className="flex items-center px-1 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400" id="rMod">
                                 <Link to={"/r/mod"} className="flex items-center" id="linkToRMod">
                                    <Table className="ml-2 w-4 h-4" />
                                    <span className=" px-2 py-2 text-gray-800" id="textToRMod">r/mod</span>
                                 </Link>
                              </li>
                              {tempForClear?.map((subreddit, index) => {
                                
                                 return (
                                    <a
                                       href={`/r/${subreddit.name}`}
                                       className="px-3 rounded-lg py-2 flex gap-2 w-full h-10 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                                       key={index}
                                       id={`subreddit.name${index}`}>
                                       <img src={subreddit.icon} className="rounded-full w-7 my-auto h-7" />

                                       {subreddit.name}

                                    </a>
                                 );
                              })}
                           </ul>
                        </div>
                     </>
                     : <></>}

                  <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

                  <li>
                     <button
                        id="dropdownDefaultButtonForRecentComunnities"
                        onClick={functionToExecute}
                        data-dropdown-toggle="dropdown"
                        className="text-gray w-full bg-white-700 hover:bg-gray-200  focus:outline-none justify-between font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 "
                        type="buttonn"
                     >
                        RECENTS
                        <ChevronDown className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" />
                     </button>

                     <div id="dropdownForRecentcommunities" className="">
                        <ul className="" aria-labelledby="dropdownDefaultButton">
                           {/*here is where the ui print the subreddits i just entered */}
                           <li>
                              {RecentCommunities?.map((subreddit, index) => (
                                 <a
                                    href={`/r/${subreddit}`}
                                    className="px-3 rounded-lg py-2 flex gap-2 w-full h-10 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                                    key={index}
                                    id={`subreddit.name${index}`}>
                                    <img src={"https://res.cloudinary.com/dvnf8yvsg/image/upload/v1714594934/vjhqqv4imw26krszm7hr.png"} className="rounded-full w-7 my-auto h-7" />

                                    {subreddit}

                                 </a>
                              ))}
                           </li>
                        </ul>
                     </div>
                  </li>

                  <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

                  <li>
                     <button
                        id="dropdownDefaultButtonForMyCommunities"
                        onClick={functionToExecute}
                        data-dropdown-toggle="dropdown"
                        className="text-gray w-full bg-white-700 hover:bg-gray-200 justify-between focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 "
                        type="button"
                        role="button1212"
                     >
                        YOUR COMMUNITIES
                        <ChevronDown
                           className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" />
                     </button>

                     <div id="dropdown1" className="">
                        <ul className="" aria-labelledby="dropdownDefaultButton">
                           <li>
                              <button id="toCreateCommunity"
                                 onClick={openCreateCommunity}
                                 className="relative rounded-full flex justify-between gap-2 p-3 h-12 w-44 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                              >
                                 <Plus className="w-8 h-8 absolute top-2 left-2" />
                                 <span className="text-sm absolute top-3 left-12">
                                    Create Community
                                 </span>
                              </button>
                              {isModalOpen && (
                                 <CreateCommunity commList={yourCommunities} setCommList={setYourCommunities} onClose={closeCreateCommunity} />
                              )}
                           </li>
                           <li>
                              {
                                 tempForYourCom?.map((commun, index) => (
                                    <a
                                       href={`/r/${commun.name}`}
                                       className="px-3 rounded-lg py-2 flex gap-2 w-full h-10 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                                       key={index}
                                       id="subreddit.name">
                                       <img src={commun.icon} className="rounded-full w-7 my-auto h-7" />
                                       {commun.name}
                                    </a>
                                 ))
                              }
                           </li>
                        </ul>
                     </div>
                  </li>
                  <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>
                  <a href={"/submit"} className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400 rounded-lg" >
                     <Plus className="ml-2 w-5 h-5" />
                     <span className=" px-2 py-2 text-gray-800">create post</span>
                  </a>
                  <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

                  <li>
                     <button
                        id="dropdownDefaultButton2"
                        onClick={functionToExecute}
                        data-dropdown-toggle="dropdown"
                        className="text-gray w-full bg-white-700 hover:bg-gray-200 justify-between focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 "
                        type="button"
                     >
                        RESOURCES
                        <ChevronDown className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" />
                     </button>

                     <div id="dropdown2" className="">
                        <ul
                           className="py-2 bg-white text-sm text-white-700 dark:text-white-200"
                           aria-labelledby="dropdownDefaultButton"
                        >
                           <li>
                              <a
                                 href="https://www.redditinc.com/"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                                 id="aboutReddit"
                              >
                                 About Reddit
                              </a>
                           </li>
                           <li>
                              <a
                                 href="https://accounts.reddit.com/adsregister?dest=https%3A%2F%2Fads.reddit.com%2F&referrer=https%3A%2F%2Fwww.reddit.com%2F&utm_source=web3x_consumer&utm_name=left_nav_cta"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                                 id="advertise"
                              >
                                 Advertise
                              </a>
                           </li>
                           <li>
                              <a
                                 href="https://support.reddithelp.com/hc/en-us"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                                 id="help"
                              >
                                 Help
                              </a>
                           </li>
                           <li>
                              <a
                                 href="https://www.redditinc.com/blog"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                                 id="blog"
                              >
                                 Blog
                              </a>
                           </li>
                           <li>
                              <a
                                 href="https://www.redditinc.com/careers"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                                 id="career"
                              >
                                 career
                              </a>
                           </li>
                           <li>
                              <a
                                 href="https://www.redditinc.com/press"
                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray"
                                 id="press"
                              >
                                 Press
                              </a>
                           </li>
                           <li>

                              <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

                              <Link
                                 to="./community"
                                 className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400"
                                 id="communities"
                              >
                                 <i className="fa-solid fa-users-between-lines w-5 h-5"></i>
                                 <span className="px-2 py-2 text-gray-800" >Communities</span>

                              </Link>
                           </li>

                           <li>
                              <a
                                 href="https://www.reddit.com/posts/2024/global/"
                                 className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400"
                                 id="bestOfReddit"
                              >
                                 <Sparkles className="w-5 h-5" />
                                 <span className=" px-2 py-2 text-gray-800">Best of Reddit</span>
                              </a>
                           </li>

                           <li>
                              <a
                                 href="https://www.reddit.com/topics/a-1/"
                                 className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400"
                                 id="topics"
                              >
                                 <LayoutGrid strokeWidth={1.5} className="w-5 h-5" />
                                 <span className="px-2 py-2 text-gray-800">Topics</span>
                              </a>
                           </li>

                           <hr className="border-t-1 border-gray-400 dark:border-gray-600 w-full"></hr>

                           <li>
                              <a
                                 href="https://www.redditinc.com/policies/content-policy"
                                 className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400"
                                 id="contentPolicy"
                              >
                                 <Siren className="w-5 h-5" />
                                 <span className=" px-2 py-2 text-gray-800">content policy</span>
                              </a>
                           </li>
                           <li>
                              <a
                                 href="https://www.reddit.com/policies/privacy-policy"
                                 className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400"
                                 id="privacyPolicy"
                              >
                                 <BookLock className="w-5 h-5" />
                                 <span className="px-2 py-2 text-gray-800">Privacy policy</span>
                              </a>
                           </li>

                           <li>
                              <a
                                 href="https://www.redditinc.com/policies/user-agreement"
                                 className="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-800 text-gray-400"
                                 id="userAgreement"
                              >
                                 <Handshake className="w-5 h-5" />
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

