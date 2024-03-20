import { Link, Outlet, Route, Routes, useLocation, useParams, } from "react-router-dom";
import SearchSortMenu from "@/GeneralComponents/SearchSortMenu/SearchSortMenu";
import { useState } from "react"; 
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import PostsSearchPage from "./pages/PostsSearchPage";
import CommunitiesSearchPage from "./pages/CommunitiesSearchPage";
import PeopleSearchPage from "./pages/PeopleSearchPage";
import CommentsSearchPage from "./pages/COmmentsSearchPage";
import React from "react";

// search for list options for mapping
const buttons = [
  {
    text: "Posts",
    path: "Posts",
  },
  {
    text: "Communities",
    path: "Communities",
  },
  {
    text: "Comments",
    path: "Comments",
  },
  {
    text: "People",
    path: "People",
  },
]

function Layout() {

  //consts for collecting sorting by data for request
  const path = useLocation();
  const [selected,setselected] = useState('Relevance');
  const [period,setperiod] = useState('All time');

  return (
    <div className="w-[80%]">

        {/* search by bar header */}
        <div role="searchLabel" className="flex gap-3">
            <span className="mt-[13px] text-xs">SEARCH RESULTS</span>

      {/* search by bar items */}
      <ul role="searchBySelect" className='flex gap-3 overflow-x-auto mb-3'>
        {
          buttons.map((btn, index) => <li key={index}>
            <Link role={`${btn.text}Button`} to={`/search/${btn.path}`}>
              <button className={`rounded-3xl w-fit px-3 h-10 hover:bg-gray-300 ${path.pathname == `/search/${btn.path}` ? "bg-gray-300" : "bg-white"}`} >{btn.text}</button>
            </Link>
          </li>)
        }
      </ul>
        </div>

        {/* sorting search by bar dropdown menus for period and type */}
      <div className="flex gap-1">
        <span className="text-xs text-gray-500 mt-[12px] ml-2">sort by:</span>
      <div role="searchsortmenu"><SearchSortMenu setselected={setselected}/></div>
      <div role="periodselect"><PeriodSelect appearance={selected} setperiod={setperiod}/></div>
      </div>
      <hr/>
      <Outlet />
    </div>
  )
}


export default function SearchPagesLayout() {
  return (
    //routes to whatever selection is made for search by: people.posts...etc
    <Routes>
      <Route element={<Layout />} >
        <Route key={'/search'} path="/" element={<></>} />
        <Route key={'/Posts'} path={`Posts`} element={<PostsSearchPage searched="idk bruh"/>} />
        <Route key={'/Communities'} path={`Communities`} element={<CommunitiesSearchPage searched="idk bruh"/>} />
        <Route key={'/People'} path={`People`} element={<PeopleSearchPage searched="idk bruh"/>} />
        <Route key={'/COmments'} path={`Comments`} element={<CommentsSearchPage searched="idk bruh"/>} />
      </Route>
    </Routes>
  )
}