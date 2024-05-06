import { Link, Outlet, Route, Routes, useLocation, useNavigate, useParams, } from "react-router-dom";
import ProfileOverview from "./pages/profileoverview";
import ProfilePosts from "./pages/Profileposts";
import ProfileComments from "./pages/profilecomments";
import Sortmenu from "@/GeneralComponents/sortmenu/sortmenu";
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import ViewerCard from "@/GeneralComponents/viewercard/viewerCard.jsx";
import { useState, useEffect, useContext, createContext } from "react";
import React from "react";
import BackToTop from "@/GeneralComponents/backToTop/backToTop";
import { userAxios } from "@/Utils/UserAxios";
import { useQuery } from "react-query";

/**
 * @file ViewerProfileRoutes.jsx
 * @desc This file contains the routing and layout components for the viewer profile pages.
 * It imports various components from react-router-dom and other custom components to render the profile pages.
 * The ViewerProfilePage component is the main component that handles the nested routing and renders the layout and profile pages based on the current route.
 * The ViewerProvider component is a context provider that holds the state for the viewer profile pages.
 * The Layout component is the main layout component that renders the profile header, sections bar, sorting components, and the viewer card.
 * The ProfileOverview, ProfilePosts, and ProfileComments components are the individual profile pages that are rendered based on the current route.
 * The axios library is used to fetch user information from an API.
 */

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


// Create a provider component that holds the state
export function ViewerProvider({ children }) {
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
  const { selected } = useContext(ViewerContext);
  const [avatar, setAvatar] = useState("");  // fetching user avatar from redux store
  const [loading, setLoading] = useState(true); // loading state for fetching user info
  const { viewer } = useParams();  // getting the user from the url
 const navigator = useNavigate();
  const fetchViewerAbout =() => {
    // Fetch user info
    userAxios.get(`user/${viewer}/about`) // fetching user info
      .then(response => {
        setAvatar(response.data.avatar);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        navigator('/404');
        setLoading(false);
      })
  };

  const {isError} = useQuery('ViewerProfileAbout', fetchViewerAbout);

  // loading spinner to wait for fetch then load body of apge
  if (loading) {
    return (
      <div role="ViewerPage" className="w-100 h-100 flex flex-col items-center justify-center">
            <img src={'/logo.png'} className="h-20 w-20 mt-24 mx-auto animate-ping" alt="Logo" />
      </div>
    )
  }

  //main body of page
  return (
    <div role="ViewerPage" className="flex gap-10 mt-10 w-[80%] mx-auto">
      <div className="relative flex-grow md:w-[55%]">
        <BackToTop />
        <div role="avatarHeader" className='relative flex mb-8'>
          <img src={avatar} className='p-1 w-20 h-24 rounded-full z-0' alt=""></img>
          <span className='text-black font-bold text-2xl absolute top-10 left-24'>{viewer}</span>
          <span className='text-gray-500 font-semibold absolute top-3/4 left-24'>u/{viewer}</span>
        </div>

        {/* selection of user activity: posts,comments...etc*/}
        <ul role="sectionsBar" className='flex gap-3 overflow-x-auto mb-3 p-1'>
          {
            buttons.map((btn, index) => <li key={index}>
              <Link id={`${btn.text}ViewerTab`} role={`${btn.text}Button`} to={`/viewer/${viewer}/${btn.path}`}>
                <button className={`rounded-3xl w-fit px-3 h-10 hover:underline hover:bg-gray-300 ${path.pathname == `/viewer/${viewer}/${btn.path}` ? "bg-gray-300" : "bg-white"}`} >{btn.text}</button>
              </Link>
            </li>)
          }
        </ul>

        {/* sorting lists and period select components and create post in case of overview*/}
        <div className="flex gap-1">

          {/* sorting lists and period select components */}
          <div role="sortmenu"><Sortmenu context={ViewerContext} /></div>
          <PeriodSelect appearance={selected} context={ViewerContext} />

        </div>
        <hr />
        <Outlet />
      </div>

      {/* profile user card */}
      <div role="card" className="flex-grow md:w-[35%] max-w-[380px]"><ViewerCard /></div>
    </div>
  )
}


export default function ViewerProfilePage() {
  const { viewer } = useParams();

  return (
    // nested routing for the profile pages renders layout then feed according to route
    <ViewerProvider>
      <Routes>
        <Route element={<Layout />} >
          <Route key={'/viewer'} path={`/`} />
          <Route key={'/comments'} path="/comments" element={<ProfileComments context={ViewerContext} using={viewer} />} />
          <Route key={'/posts'} path="posts" element={<ProfilePosts context={ViewerContext} using={viewer} />} />
          <Route key={'/overview'} path="/overview" element={<ProfileOverview context={ViewerContext} using={viewer} />} />
        </Route>
      </Routes>
    </ViewerProvider>
  )
}