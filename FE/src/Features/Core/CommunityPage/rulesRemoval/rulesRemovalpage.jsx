import RulesPage from './rulespage';
import { Route, Routes, useLocation, useNavigate, Link, useParams, Outlet} from "react-router-dom";
import React from "react";
import RemovalPage from './removalpage';

/**
 * Renders the layout for the Rules and Removal Reasons page.
 *
 * @returns {JSX.Element} The rendered layout component.
 */
function Layout() {
  const location = useLocation();
  const  {community}  = useParams();

  return (
      <div className='p-3'>
          <div className="font-bold text-lg">Rules and Removal Reasons</div>
          <div className="flex mt-5 mb-4 gap-5">
              <Link to={`/r/${community}/about/rules`} className={`${location.pathname === `/r/${community}/about/rules` ? "bg-gray-200" : ""} p-3 font-semibold text-sm px-5 rounded-full`}>Rules</Link>
              <Link to={`/r/${community}/about/removal`} className={`${location.pathname === `/r/${community}/about/removal` ? "bg-gray-200" : ""} p-3 font-semibold text-sm px-5 rounded-full`}>Removal Reasons</Link>
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