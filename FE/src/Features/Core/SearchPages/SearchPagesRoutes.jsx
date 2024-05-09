import { Link, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import SearchSortMenu from "@/GeneralComponents/SearchSortMenu/SearchSortMenu";
import { useState } from "react";
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import PostsSearchPage from "./pages/PostsSearchPage";
import CommunitiesSearchPage from "./pages/CommunitiesSearchPage";
import PeopleSearchPage from "./pages/PeopleSearchPage";
import CommentsSearchPage from "./pages/CommentsSearchPage";
import HashtagSearchPage from "./pages/hashtagSearchPage";
import React, { useContext, createContext } from "react";

/**
 * Array of buttons for mapping.
 * @type {Array<{text: string, path: string}>}
 */
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
  {
    text: "Hashtag",
    path: "Hashtag",
  }
];

/**
 * Context for search state.
 * @type {React.Context<{selected: string, setselected: Function, period: string, setperiod: Function}>}
 */
export const SearchContext = createContext({
  selected: "Relevance",
  setselected: (selected) => {},
  period: "All time",
  setperiod: (period) => {},
});

/**
 * Provider component that holds the search state.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */
export function SearchProvider({ children }) {
  const [selected, setselected] = useState("Relevance");
  const [period, setperiod] = useState("All time");

  return (
    <SearchContext.Provider value={{ selected, setselected, period, setperiod }}>
      {children}
    </SearchContext.Provider>
  );
}

/**
 * Layout component for search pages.
 * @returns {React.ReactNode} The rendered component.
 */
function Layout() {
  const path = useLocation(); // accessing current path
  const { selected } = useContext(SearchContext);
  const { searchkey } = useParams(); // accessing search key

  return (
    <div className="max-w-[80%] w-screen m-2">
      {/* search by bar header */}
      <div role="searchLabel" className="flex gap-3">
        <span className="mt-[13px] text-xs">SEARCH RESULTS</span>

        {/* search by bar items */}
        <ul role="searchBySelect" className="flex gap-3 overflow-x-auto mb-3">
          {buttons.map((btn, index) => (
            <li key={index}>
              <Link id={`${btn.text}Tab`} role={`${btn.text}Button`} to={`/search/${searchkey}/${btn.path}`}>
                <button
                  className={`rounded-3xl font-sans text-sm font-semibold w-fit px-4 h-10 ${
                    path.pathname == `/search/${searchkey}/${btn.path}` ? "bg-gray-300" : "bg-white"
                  }`}
                >
                  {btn.text}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* sort by and period select only on posts and comments selections*/}
      {path.pathname !== `/search/${searchkey}/People` && path.pathname !== `/search/${searchkey}/Communities` && (
        <>
          <div className="flex gap-1 mt-2">
            <span className="text-xs text-gray-500 mt-[12px] ml-2">sort by:</span>
            <div role="searchsortmenu">
              <SearchSortMenu />
            </div>
            <div role="periodselect">
              <PeriodSelect appearance={selected} context={SearchContext} />
            </div>
            <div className="flex-1 mt-[18px]">
              <hr className="font-bold text-black" />
            </div>
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
}

/**
 * Search pages layout component.
 * @returns {React.ReactNode} The rendered component.
 */
export default function SearchPagesLayout() {
  const { searchkey } = useParams(); // accessing search key

  return (
    // routes to whatever selection is made for search by: people.posts...etc
    <SearchProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route key={"/search"} path="/" element={<></>} />
          <Route key={"/Posts"} path={`Posts`} element={<PostsSearchPage searched={searchkey} />} />
          <Route key={"/Communities"} path={`Communities`} element={<CommunitiesSearchPage searched={searchkey} />} />
          <Route key={"/People"} path={`People`} element={<PeopleSearchPage searched={searchkey} />} />
          <Route key={"/Comments"} path={`Comments`} element={<CommentsSearchPage searched={searchkey} />} />
          <Route key={"/Hashtag"} path={`Hashtag`} element={<HashtagSearchPage></HashtagSearchPage>} />
        </Route>
      </Routes>
    </SearchProvider>
  );
}