import About from './About';
import Popular from './Popular';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

function tabsOfSettings(){

    return(
        <div>
            <div>
                Fox
            </div>
            <Link to="/About">About</Link>
            <Link to="/Popular">Popular</Link>
            <Outlet />
        </div>
    )
}

export default function SideBarRoutes() {
    return(
        <Routes element={<tabsOfSettings />}>
            <Route key={'/sidebarComponent'} path='/' element={<></>} />
            <Route key={'/About'} path="/About" element={<About />} />
            <Route key={'/Popular'} path="/Popular" element={<Popular />} />
        </Routes>
    )
}