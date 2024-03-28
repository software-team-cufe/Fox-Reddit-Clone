import { Link, Outlet, Route, Routes, useLocation, useParams, } from "react-router-dom";
import SearchSortMenu from "@/GeneralComponents/SearchSortMenu/SearchSortMenu";
import { useState } from "react";
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import PostsSearchPage from "./pages/PostsSearchPage";
import CommunitiesSearchPage from "./pages/CommunitiesSearchPage";
import PeopleSearchPage from "./pages/PeopleSearchPage";
import CommentsSearchPage from "./pages/COmmentsSearchPage";
import React, { useContext, createContext} from "react";
//.
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

export const SearchContext = createContext({
  selected: "Relevance",
  setselected: (selected) => {},
  period: "All time",
  setperiod: (period) => {},
});

// Create a provider component that holds the state
export function SearchProvider({ children }) {
  const [selected, setselected] = useState("Relevance");
  const [period, setperiod] = useState("All time");

  return (
    <SearchContext.Provider value={{ selected, setselected, period, setperiod }}>
      {children}
    </SearchContext.Provider>
  );
}



function Layout() {
  const path = useLocation();     //accessing current path
  const { selected} = useContext(SearchContext);

  return (
    <div className="max-w-[80%] w-screen">

      {/* search by bar header */}
      <div role="searchLabel" className="flex gap-3">
        <span className="mt-[13px] text-xs">SEARCH RESULTS</span>

        {/* search by bar items */}
        <ul role="searchBySelect" className='flex gap-3 overflow-x-auto mb-3'>
          {
            buttons.map((btn, index) => <li key={index}>
              <Link role={`${btn.text}Button`} to={`/search/${btn.path}`}>
                <button className={`rounded-3xl font-sans text-sm font-semibold w-fit px-4 h-10 ${path.pathname == `/search/${btn.path}` ? "bg-gray-300" : "bg-white"}`} >{btn.text}</button>
              </Link>
            </li>)
          }
        </ul>
      </div>

      {/* sort by and period select only on posts and comments selections*/}
      {((path.pathname !== "/search/People" && path.pathname !== "/search/Communities") && (
        <>
          <div className="flex gap-1 mt-2">
            <span className="text-xs text-gray-500 mt-[12px] ml-2">sort by:</span>
            <div role="searchsortmenu">
              <SearchSortMenu/>
            </div>
            <div role="periodselect">
              <PeriodSelect appearance={selected} context={SearchContext}/>
            </div>
            <div className="flex-1 mt-[18px]">
              <hr className="font-bold text-black" />
            </div>
          </div>
        </>
      ))
      }
      <Outlet />
    </div>
  )
}


export default function SearchPagesLayout() {

  return (
    //routes to whatever selection is made for search by: people.posts...etc
    <SearchProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route key={'/search'} path="/" element={<></>} />
        <Route key={'/Posts'} path={`Posts`} element={<PostsSearchPage searched="idk bruh" />} />
        <Route key={'/Communities'} path={`Communities`} element={<CommunitiesSearchPage searched="idk bruh" />} />
        <Route key={'/People'} path={`People`} element={<PeopleSearchPage searched="idk bruh" />} />
        <Route key={'/COmments'} path={`Comments`} element={<CommentsSearchPage searched="idk bruh" />} />
      </Route>
    </Routes>
    </SearchProvider>
  )
}