import { Link, Outlet, Route, Routes, useLocation, useParams, } from "react-router-dom";
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
import { useState,useEffect } from "react";
import { userStore } from "@/hooks/UserRedux/UserStore";
import React from "react";

// for mapping the list of buttons
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
]


function Layout() {

  const path = useLocation();
  const [selected,setselected] = useState("New");   // for the sort select component
  const [period,setperiod] = useState('All time');  // for the period select component
  const user = userStore.getState().user.user;    // fetching user info from redux store
  const avatar = userStore.getState().user.avatar;  // fetching user avatar from redux store

  return (
    <div className="w-full">
      {/* main header with avatar and username */}
      <div className="flex gap-10">
      <div className="flex-1 w-full">
      <div role="avatarHeader" className='relative w-full flex mb-8'>
        <img src={avatar} className='p-1 w-20 h-24 rounded-full z-0' alt=""></img>
        <span className='text-black font-bold text-2xl absolute top-10 left-24'>u/{user}</span>
        <span className='text-gray-500 font-semibold absolute top-3/4 left-24'>u/{user}</span>
      </div>

      {/* selection of user activity: posts,comments...etc*/}
      <ul role ="sectionsBar" className='flex gap-3 overflow-x-auto mb-3 p-1'>
        {
          buttons.map((btn, index) => <li key={index}>
            <Link role={`${btn.text}Button`} to={`/user/${user}/${btn.path}`}>
              <button  className={`rounded-3xl w-fit px-3 h-10 hover:underline hover:bg-gray-300 ${path.pathname == `/user/${btn.path}` ? "bg-gray-300" : "bg-white"}`} >{btn.text}</button>
            </Link>
          </li>)
        }
      </ul>


      {/* sorting lists and period select components and create post in case of overview*/}
      <div className="flex gap-1">
        {/* create post button in case of overview */}
        <button role="createPostButton" className={`rounded-full flex gap-1 justify-center border border-gray-600 w-fit px-4 h-10 items-center hover:border-black ${path.pathname == '/user/overview' ? "" : "hidden"}`} >
          <Plus className="w-4 h-4"/>
          <span className='inline font-semibold text-sm'>Create a post</span>
        </button>

          {/* sorting lists and period select components */}
          <div role="sortmenu"><Sortmenu setselected={setselected}/></div>
          <PeriodSelect appearance={selected} setperiod={setperiod}/>

        </div>
        <hr/>
          <Outlet />
      </div>

      {/* profile user card */}
      <div role="card"><Card/></div>
      </div>
    </div>
  )
}

export default function ProfilePagesLayout() {
  const { user } = useParams();  // fetching user from url
  return (
    // nested routing for the profile pages renders layout then feed according to route
    <Routes>
        <Route element={<Layout />} >
        <Route key={'/user'} path='/' element={<></>} />
        <Route key={'/hidden'} path="/hidden" element={<ProfileHidden using={user}/>} />
        <Route key={'/saved'} path="/saved" element={<ProfileSaved using={user}/>} />
        <Route key={'/comments'} path="/comments" element={<ProfileComments using={user}/>} />
        <Route key={'/posts'} path="posts" element={<ProfilePosts using={user}/>} />
        <Route key={'/overview'} path="/overview" element={<ProfileOverview using={user} />} />
        <Route key={'/upvoted'} path="upvoted" element={<ProfileUpvoted using={user}/>} />
        <Route key={'/downvoted'} path="downvoted" element={<ProfileDownvoted using={user}/>} />
      </Route>
    </Routes>
  )
}
