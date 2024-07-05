import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import ProfileOverview from "./pages/profileoverview";
import { Plus } from "lucide-react";
import ProfileUpvoted from "./pages/profileupvoted";
import ProfileDownvoted from "./pages/ProfileDownvoted";
import ProfilePosts from "./pages/Profileposts";
import ProfileComments from "./pages/profilecomments";
import ProfileSaved from "./pages/profileSaved";
import ProfileHidden from "./pages/profilehidden";
import Sortmenu from "@/GeneralComponents/sortmenu/sortmenu";
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import Card from "@/GeneralComponents/profileCard/Card.jsx";
import React, { useState} from "react";
import { useContext, createContext } from "react";
import BackToTop from "@/GeneralComponents/backToTop/backToTop";
import { useSelector } from 'react-redux';

// for mapping the list of buttons
/**
 * Array of buttons representing different profile page options.
 *
 * @type {Array<{text: string, path: string}>}
 */
const buttons = [
  {
    text: "overview",
    path: "overview",
  },
  {
    text: "posts",
    path: "posts",
  },
  {
    text: "comments",
    path: "comments",
  },
  {
    text: "saved",
    path: "saved",
  },
  {
    text: "hidden",
    path: "hidden",
  },
  {
    text: "upvoted",
    path: "upvoted",
  },
  {
    text: "downvoted",
    path: "downvoted",
  },
];

export const ProfileContext = createContext({
  selected: "New",
  setselected: (selected) => { },
  period: "All time",
  setperiod: (period) => { },
});

// Create a provider component that holds the state
export function ProfileProvider({ children }) {
  const [selected, setselected] = useState("New");
  const [period, setperiod] = useState("All time");

  return (
    <ProfileContext.Provider
      value={{ selected, setselected, period, setperiod }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

function Layout() {

  const path = useLocation();
  const { selected } = useContext(ProfileContext);
  const user = useSelector(state => state.user.user.username);  // fetching user from redux store (username
  const avatar = useSelector(state => state.user.user.avatar);  // fetching user avatar from redux store

  return (
    <div className="relative w-[90%] mx-auto overflow-auto" > {/* attach the ref to your scrollable element */}
      <BackToTop />
      {/* main header with avatar and username */}
      <div className="flex gap-10 ">
        <div className="flex-grow w-[90%] md:w-[55%] max-w-[90%]">
          <div role="avatarHeader" className='relative w-full flex mb-8'>
            <img src={avatar} className='p-1 w-24 h-24 rounded-full z-0' alt=""></img>
            <span className='text-black font-bold text-2xl absolute top-10 left-24'>{user}</span>
            <span className='text-gray-500 font-semibold absolute top-3/4 left-24'>u/{user}</span>
          </div>

          {/* selection of user activity: posts,comments...etc*/}
          <ul role="sectionsBar" className='flex gap-3 overflow-x-auto mb-3 p-1'>
            {
              buttons.map((btn, index) => <li key={index}>
                <Link id={`${btn.text}Tab`} role={`${btn.text}Button`} to={`/user/${user}/${btn.path}`}>
                  <button className={`rounded-3xl w-fit px-3 h-10 hover:underline hover:bg-gray-300 ${path.pathname == `/user/${user}/${btn.path}` ? "bg-gray-300" : "bg-white"}`} >{btn.text}</button>
                </Link>
              </li>)
            }
          </ul>


          {/* sorting lists and period select components and create post in case of overview*/}
          <div className="flex gap-1">
            {/* create post button in case of overview */}
            <Link id="profileCreatePost" to='/submit' role="createPostButton" className={`rounded-full flex gap-1 justify-center border border-gray-600 w-fit px-4 h-10 items-center hover:border-black ${path.pathname == `/user/${user}/overview` ? "" : "hidden"}`} >
              <Plus className="w-4 h-4" />
              <span className='inline font-semibold text-sm'>Create a post</span>
            </Link>

            {/* sorting lists and period select components */}
            <div role="sortmenu"><Sortmenu context={ProfileContext} /></div>
            <PeriodSelect appearance={selected} context={ProfileContext} />

          </div>
          <hr />
          <Outlet />
        </div>

        {/* profile user card */}
        <div role="card" className="flex-grow w-[35%] max-w-[337px]"><Card /></div>
      </div>
    </div>
  );
}

export default function ProfilePagesLayout() {
  const { user } = useParams(); // fetching user from url
  return (
    // nested routing for the profile pages renders layout then feed according to route
    <ProfileProvider>
      <Routes>
        <Route element={<Layout />} >
          <Route key={'/user'} path='/' element={<></>} />
          <Route key={'/hidden'} path="/hidden" element={<ProfileHidden using={user} />} />
          <Route key={'/saved'} path="/saved" element={<ProfileSaved using={user} />} />
          <Route key={'/comments'} path="/comments" element={<ProfileComments context={ProfileContext} using={user} />} />
          <Route key={'/posts'} path="/posts" element={<ProfilePosts context={ProfileContext} using={user} />} />
          <Route key={'/overview'} path="/overview" element={<ProfileOverview context={ProfileContext} using={user} />} />
          <Route key={'/upvoted'} path="/upvoted" element={<ProfileUpvoted using={user} />} />
          <Route key={'/downvoted'} path="/downvoted" element={<ProfileDownvoted using={user} />} />
        </Route>
      </Routes>
    </ProfileProvider>
  );
}
