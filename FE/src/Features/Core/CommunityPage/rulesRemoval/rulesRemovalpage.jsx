import RulesPage from './rulespage';
import { Route, Routes, useLocation, useNavigate, Link, useParams, Outlet} from "react-router-dom";
import React from "react";
import RemovalPage from './removalpage';

function Layout() {
  const location = useLocation();
  const  {community}  = useParams();

  return (
      <div className='p-3 w-full'>
          <div className="font-bold text-lg">Rules and Removal Reasons</div>
          <div className="flex mt-5 mb-4 gap-5">
              <Link id="toRulesPage" to={`/r/${community}/about/rules`} className={`${location.pathname === `/r/${community}/about/rules` ? "bg-gray-200" : ""} md:p-3 px-2 p-1 font-semibold text-sm md:px-5 rounded-full`}>Rules</Link>
              <Link id="toRemovalsPage" to={`/r/${community}/about/removal`} className={`${location.pathname === `/r/${community}/about/removal` ? "bg-gray-200" : ""} md:p-3 md:px-5 px-2 p-1 font-semibold text-sm rounded-full`}>Removal Reasons</Link>
          </div>
          <Outlet />
      </div>
  )
}

export default function ProfilePagesLayout() {
  return (
    // nested routing for the profile pages renders layout then feed according to route
      <Routes>
        <Route element={<Layout />} >
          <Route key={'/about'} path='/' element={<></>} />
          <Route key={'/rules'} path="/rules" element={<RulesPage />} />
          <Route key={'/removal'} path="/removal" element={<RemovalPage />} />
        </Route>
      </Routes>
  )
}