import { Link, Outlet, Route, Routes, redirect, useLocation, useParams, } from "react-router-dom";
import ProfileOverview from "./pages/profileoverview";
import { Plus, View } from "lucide-react";
import ProfileUpvoted from "./pages/profileupvoted";
import ProfileDownvoted from "./pages/ProfileDownvoted";
import ProfilePosts from "./pages/Profileposts";
import ProfileComments from "./pages/profilecomments";
import ProfileSaved from "./pages/profileSaved";
import ProfileHidden from "./pages/profilehidden";
import Sortmenu from "@/GeneralComponents/sortmenu/sortmenu";
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import ViewerCard from "@/GeneralComponents/viewercard/viewerCard.jsx";
import { useState, useEffect, useContext, createContext } from "react";
import { userStore } from "@/hooks/UserRedux/UserStore";
import React from "react";
import axios from 'axios';
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { userAxios } from "@/Utils/UserAxios";
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

export const ViewerContext = createContext();

interface ViewerProviderProps {
  children: React.ReactNode;
}
// Create a provider component that holds the state
export function ViewerProvider({ children }: ViewerProviderProps) {
  const [selected, setselected] = useState("New");
  const [period, setperiod] = useState("All time");

  return (
    <ViewerContext.Provider value={{ selected, setselected, period, setperiod }}>
      {children}
    </ViewerContext.Provider>
  );
}


function Layout() {

  const path = useLocation();
  const { selected }: any = useContext(ViewerContext);
  const [avatar, setAvatar] = useState("");  // fetching user avatar from redux store
  const [loading, setLoading] = useState(true); // loading state for fetching user info
  const { viewer } = useParams();  // getting the user from the url

  useEffect(() => {

    axios.get(`https://virtserver.swaggerhub.com/BOUDIE2003AHMED/fox/1/user/t2_AhmedLotfy02/about`) // fetching user info
      .then(res => {
        setAvatar(res.data.data[0].avatar);
        setLoading(false);
      }).catch(err => {
        console.log(err);
        setLoading(false);
      })
  }, []);


  // loading spinner to wait for fetch then load body of apge
  if (loading) {
    return (
      <div role='poststab' className="w-100 h-100 flex flex-col items-center justify-center">
        <Spinner className="h-24 w-24" />
      </div>
    )
  }

  //main body of page
  return (

    <div>
      {/* main header with avatar and username */}
      <div className="flex gap-10">
        <div className="w-full flex-1 ">
          <div role="avatarHeader" className='relative flex mb-8'>
            <img src={avatar} className='p-1 w-20 h-24 rounded-full z-0' alt=""></img>
            <span className='text-black font-bold text-2xl absolute top-10 left-24'>u/{viewer}</span>
            <span className='text-gray-500 font-semibold absolute top-3/4 left-24'>u/{viewer}</span>
          </div>

          {/* selection of user activity: posts,comments...etc*/}
          <ul role="sectionsBar" className='flex gap-3 overflow-x-auto mb-3 p-1'>
            {
              buttons.map((btn, index) => <li key={index}>
                <Link role={`${btn.text}Button`} to={`/viewer/${viewer}/${btn.path}`}>
                  <button className={`rounded-3xl w-fit px-3 h-10 hover:underline hover:bg-gray-300 ${path.pathname == `/viewer/${viewer}/${btn.path}` ? "bg-gray-300" : "bg-white"}`} >{btn.text}</button>
                </Link>
              </li>)
            }
          </ul>

          {/* sorting lists and period select components and create post in case of overview*/}
          <div className="flex gap-1">

            {/* sorting lists and period select components */}
            <div role="sortmenu"><Sortmenu context={ViewerContext}/></div>
            <PeriodSelect appearance={selected} context={ViewerContext}/>

          </div>
          <hr />
          <Outlet />
        </div>

        {/* profile user card */}
        <div role="card"><ViewerCard /></div>
      </div>
    </div>
  )
}


export default function ViewerProfilePage() {
  const {viewer} = useParams();

  return (
    // nested routing for the profile pages renders layout then feed according to route
    <ViewerProvider>
      <Routes>
        <Route element={<Layout />} >
          <Route key={'/viewer'} path={`/`} />
          <Route key={'/comments'} path="/comments" element={<ProfileComments context={ViewerContext} using={viewer} />} />
          <Route key={'/posts'} path="posts" element={<ProfilePosts context={ViewerContext} using={viewer} />} />
          <Route key={'/overview'} path="/overview" element={<ProfileOverview using={viewer} />} />
        </Route>
      </Routes>
    </ViewerProvider>
  )
}