import { Link, Outlet, Route, Routes, useLocation, useParams, } from "react-router-dom";
import SearchSortMenu from "@/GeneralComponents/SearchSortMenu/SearchSortMenu";
import { useState } from "react"; 
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import PostsSearchPage from "./pages/PostsSearchPage";

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
  const path = useLocation();
  const [selected,setselected] = useState('Relevance');
  const [period,setperiod] = useState('All time');

  return (
    <div>
        <div className="flex gap-3">
            <span className="mt-[13px] text-xs">SEARCH RESULTS</span>
      <ul className='flex gap-3 overflow-x-auto mb-3'>
        {
          buttons.map((btn, index) => <li key={index}>
            <Link to={`/search/${btn.path}`}>
              <button className={`rounded-3xl w-fit px-3 h-10 hover:bg-gray-300 ${path.pathname == `/search/${btn.path}` ? "bg-gray-300" : "bg-white"}`} >{btn.text}</button>
            </Link>
          </li>)
        }
      </ul>
        </div>
      <div className="flex gap-1">
        <span className="text-xs text-gray-500 mt-[12px] ml-2">sort by:</span>
      <SearchSortMenu setselected={setselected}/>
      <PeriodSelect appearance={selected} setperiod={setperiod}/>
      </div>
      <hr/>
      <Outlet />
    </div>
  )
}


export default function SearchPagesLayout() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route key={'/search'} path="/" element={<></>} />
        <Route key={'/Posts'} path={`Posts`} element={<PostsSearchPage searched="idk bruh"/>} />
      </Route>
    </Routes>
  )
}