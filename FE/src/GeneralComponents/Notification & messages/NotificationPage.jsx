import React from 'react'
import NavOfNotification from './NavOfNotification'

const NotificationPage = () => {
  return (
    <div>
       <h1 className='text-2xl font-semibold mt-3 mb-8'>Notifications </h1>
       <NavOfNotification ></NavOfNotification>
        <div className=' mt-4'>
           <p className='flex justify-center items-center'> No Notifications</p>
        </div>
    </div>
  )
}

export default NotificationPage
