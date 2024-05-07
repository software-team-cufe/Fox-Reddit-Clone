import React from 'react'
import { Route } from 'react-router-dom'
import ModQueue from './ModQueue'
import ReportedPage from './ReportedPage'
import RemovedPage from './RemovedPage'
import EditedPage from './EditedPage'
import UnmoderatedPage from './UnmoderatedPage'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'



const button =[
    {
        text:"Mod Queue",
        path:"modqueue",
    },
    {
        text:"Reported",
        path:"reported",
    },
    {
        text:"Removed",
        path:"removed",
    },
    {
        text:"Edited",
        path:"Edited",
    },
    {
        text:"Unmoderated",
        path:"Unmoderated",
    }
]

function Layout() {
    const path = useLocation();
    const { community } = useParams()
    return (
        <ul role="sectionsBar" className='flex gap-3 overflow-x-auto mb-3 p-1'>
        {
          button.map((btn, index) => <li key={index}>
            <Link id={`${btn.text}Tab`} role={`${btn.text}Button`} to={`/r/${community}/about/${btn.path}`}>
              <button className={`rounded-3xl w-fit px-3 h-10 hover:underline hover:bg-gray-300 ${path.pathname == `/r/${community}/about/${btn.path}` ? "bg-gray-300" : "bg-white"}`} >{btn.text}</button>
            </Link>
          </li>)
        }
      </ul>
    )
}
const ModQueueRoutes = () => {
  return (
    <div>
       <Route element={<Layout />}>
          <Route key={'/modqueue'} path='/' element={<ModQueue></ModQueue>}></Route>
          <Route key={'/reported'} path="/reported" element={<ReportedPage></ReportedPage>}></Route>
          <Route key={'/removed'} path="/removed" element={<RemovedPage></RemovedPage>}></Route>
          <Route key={'/edited'} path="/edited" element={<EditedPage></EditedPage>}></Route>
          <Route key={'/unmoderated'} path="/unmoderated" element={<UnmoderatedPage></UnmoderatedPage>}></Route>
       </Route>
    </div>
  )
}

export default ModQueueRoutes
