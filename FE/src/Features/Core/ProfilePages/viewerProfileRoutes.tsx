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
import ViewerCard from "@/GeneralComponents/viewercard/viewerCard.jsx";
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
]


function Layout() {

  const path = useLocation();
  const [selected,setselected] = useState("New");   // for the sort select component
  const [period,setperiod] = useState('All time');  // for the period select component
  const user = userStore.getState().user.user;    // fetching user info from redux store

  return (
    <div>
      {/* main header with avatar and username */}
      <div className="flex gap-10">
        <div className="w-fill flex-1 ">
        <div role="avatarHeader" className='relative flex mb-8'>
        <img src={'/mySnoo.png'} className='p-1 w-20 h-24 rounded-full z-0' alt=""></img>
        <span className='text-black font-bold text-2xl absolute top-10 left-24'>user</span>
        <span className='text-gray-500 font-semibold absolute top-3/4 left-24'>u/user</span>
      </div>

      {/* selection of user activity: posts,comments...etc*/}
      <ul role ="sectionsBar" className='flex gap-3 overflow-x-auto mb-3'>
        {
          buttons.map((btn, index) => <li key={index}>
            <Link role={`${btn.text}Button`} to={`/viewer/${btn.path}`}>
              <button  className={`rounded-3xl w-fit px-3 h-10 hover:underline hover:bg-gray-300 ${path.pathname == `/viewer/${btn.path}` ? "bg-gray-300" : "bg-white"}`} >{btn.text}</button>
            </Link>
          </li>)
        }
      </ul>

      {/* sorting lists and period select components and create post in case of overview*/}
      <div className="flex gap-1">

          {/* sorting lists and period select components */}
          <div role="sortmenu"><Sortmenu setselected={setselected}/></div>
          <PeriodSelect appearance={selected} setperiod={setperiod}/>

        </div>
        <hr/>
          <Outlet />
      </div>

      {/* profile user card */}
      <div role="card"><ViewerCard/></div>
      </div>
    </div>
  )
}


export default function ViewerProfilePage() {
  return (
    
    // nested routing for the profile pages renders layout then feed according to route
    <Routes>
        <Route element={<Layout />} >
        <Route key={'/viewer'} path="/" element={<></>} />
        <Route key={'/comments'} path="/comments" element={<ProfileComments />} />
        <Route key={'/posts'} path="posts" element={<ProfilePosts />} />
        <Route key={'/overview'} path="/overview" element={<ProfileOverview />} />
      </Route>
    </Routes>
  )
}