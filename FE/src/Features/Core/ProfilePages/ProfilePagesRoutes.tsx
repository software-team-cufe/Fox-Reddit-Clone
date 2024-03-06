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
import Postdisplaymenu from "@/GeneralComponents/postdisplaymenu/postdisplaymenu";

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

  return (
    <div>
      <div className='relative flex mb-8'>
        <img src={'/mySnoo.png'} className='p-1 w-20 h-24 rounded-full z-0' alt=""></img>
        <span className='text-black font-bold text-2xl absolute top-10 left-24'>username</span>
        <span className='text-gray-500 font-semibold absolute top-3/4 left-24'>u/username</span>
      </div>
      <ul className='flex gap-3 overflow-x-auto mb-3'>
        {
          buttons.map((btn, index) => <li key={index}>
            <Link to={`/user/${btn.path}`}>
              <button className={`rounded-3xl w-fit px-3 h-10 hover:underline hover:bg-gray-300 ${path.pathname == `/user/${btn.path}` ? "bg-gray-300" : "bg-white"}`} >{btn.text}</button>
            </Link>
          </li>)
        }
      </ul>
      <div className="flex gap-1">
      <Link to={'/create-post'} className='flex gap-3'>
        <div className={`rounded-full flex gap-1 justify-center border border-gray-600 w-[140px] h-10 items-center hover:border-black ${path.pathname == '/user/overview' ? "" : "hidden"}`} >
          <Plus className="w-4 h-4"/>
          <span className='inline font-semibold text-sm'>Create a post</span>
        </div>
      </Link>
      <Sortmenu />
      <Postdisplaymenu />
      </div>
      <hr/>
      <Outlet />
    </div>
  )
}


export default function ProfilePagesLayout() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route key={'/user'} path="/" element={<></>} />
        <Route key={'/hidden'} path="hidden" element={<ProfileHidden />} />
        <Route key={'/saved'} path="saved" element={<ProfileSaved />} />
        <Route key={'/comments'} path="comments" element={<ProfileComments />} />
        <Route key={'/posts'} path="posts" element={<ProfilePosts />} />
        <Route key={'/overview'} path="overview" element={<ProfileOverview />} />
        <Route key={'/upvoted'} path="upvoted" element={<ProfileUpvoted />} />
        <Route key={'/downvoted'} path="downvoted" element={<ProfileDownvoted />} />
      </Route>
    </Routes>
  )
}
