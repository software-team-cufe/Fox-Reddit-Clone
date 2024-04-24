import React from 'react'
import { NavLink } from 'react-router-dom'

const NavOfNotification = () => {
  
  return (
    <div className='flex gap-7 text-sm font-semibold text-gray-500'>
      <NavLink to="/notification" className=' underline-offset-8 underline decoration-4 decoration-orange-500'> 
        Notifications 
      </NavLink>
      <NavLink to="/messages"> Messages</NavLink>
    </div>
  )
}

export default NavOfNotification

const styleNav=() => {
  return (
    <nav>
       <div className='flex'>
          <NavOfNotification></NavOfNotification>
       </div>
    </nav>
  )
}
