import { Link, Outlet, Route, Routes, redirect, useLocation, useParams, } from "react-router-dom";
import ProfileOverview from "./pages/profileoverview";
import ProfilePosts from "./pages/Profileposts";
import ProfileComments from "./pages/profilecomments";
import Sortmenu from "@/GeneralComponents/sortmenu/sortmenu";
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import ViewerCard from "@/GeneralComponents/viewercard/viewerCard.jsx";
import { useState, useEffect, useContext, createContext, useRef } from "react";
import React from "react";
import axios from 'axios';
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { userAxios } from "@/Utils/UserAxios";
import { ChevronsUp } from "lucide-react";

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
  const [showGoUp, setShowGoUp] = useState(false);
  const headerRef = useRef(null); // create a ref for the header
  const scrollableRef = useRef(null); // create a ref for the scrollable content

  useEffect(() => {
    // Fetch user info
    axios.get(`https://virtserver.swaggerhub.com/BOUDIE2003AHMED/fox/1/user/t2_AhmedLotfy02/about`) // fetching user info
      .then(res => {
        setAvatar(res.data.data[0].avatar);
        setLoading(false);

        // Set up IntersectionObserver after user info is fetched and headerRef is defined
        const observer = new IntersectionObserver(
          ([entry]) => {
            // entry.isIntersecting will be true when the header is in the viewport
            setShowGoUp(!entry.isIntersecting);
          },
          {
            root: null,
            rootMargin: '0px',
            threshold: 0.1, // adjust this value to control when the callback is called
          }
        );

        if (headerRef.current) {
          observer.observe(headerRef.current);
        }

        // cleanup function
        return () => {
          if (headerRef.current) {
            observer.unobserve(headerRef.current);
          }
        };
      })
      .catch(err => {
        setLoading(false);
      })
  }, []); // empty dependency array means this effect runs once on mount and cleanup on unmount

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
    <div className="flex gap-10">
      <div className="relative w-full flex-1 ">
        <div className="absolute -top-24" ref={scrollableRef}>llll</div>
        {showGoUp && <button onClick={() => scrollableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="fixed flex gap-1 bottom-5 right-5 shadow-inner ring-2 ring-gray-300 hover:opacity-100 opacity-50 mx-auto py-2 px-3 text-sm z-50 bg-gray-200 rounded-full min-w-fit min-h-fit">
          <ChevronsUp className="h-4 my-auto w-4" /> back to top
        </button>}
        <div role="avatarHeader" className='relative flex mb-8'>
          <img src={avatar} className='p-1 w-20 h-24 rounded-full z-0' alt=""></img>
          <span className='text-black font-bold text-2xl absolute top-10 left-24'>u/{viewer}</span>
          <span className='text-gray-500 font-semibold absolute top-3/4 left-24'>u/{viewer}</span>
        </div>

        {/* selection of user activity: posts,comments...etc*/}
        <ul role="sectionsBar" className='flex gap-3 overflow-x-auto mb-3 p-1' ref={headerRef}>
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
          <div role="sortmenu"><Sortmenu context={ViewerContext} /></div>
          <PeriodSelect appearance={selected} context={ViewerContext} />

        </div>
        <hr />
        <Outlet />
      </div>

      {/* profile user card */}
      <div role="card"><ViewerCard /></div>
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
          <Route key={'/overview'} path="/overview" element={<ProfileOverview using={viewer} />} />
        </Route>
      </Routes>
    </ViewerProvider>
  )
}