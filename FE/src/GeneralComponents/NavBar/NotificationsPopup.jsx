import React from 'react'
import { useNavigate } from 'react-router-dom'
import { userAxios } from '../../Utils/UserAxios';
import { useEffect, useState } from 'react'
function NotificationsPopus({ setShowBellPop ,onFetchNotifications}) {
    const navigator = useNavigate();
    const navToNot = useNavigate();
    const NavOfNotification=()=>{
        navToNot('/notification')
    }


    const [notifications, setNotifications] = useState([])
    const [unReadNotifications, setUnReadNotifications] = useState(null)
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await userAxios.get('/api/v1/me/notification');
          setNotifications(response.data.notifications);
          setUnReadNotifications(response.data.unreadNotificationsCount);
          console.log(response.data.unreadNotificationsCount);
          console.log(response.data.notifications);
          console.log("notifications");
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
  
      
      fetchNotifications();
    }, []);
     
  
      
    return (
        <div id="notificationsPopup" className="p-2 h-max w-[350px] rounded-2xl
               bg-white drop-shadow-xl 
               shadow-[1.0px_1.0px_15.0px_1.0px_rgba(0,0,0,0.38)] ">
            <div className="flex p-4 ">
                <button onClick={() => { setShowBellPop(false); }}
                    className="w-full  hover:text-orange-700">Notifications</button>
                <button onClick={() => { navigator("/message/inbox"); setShowBellPop(false); }}
                    className="w-full rounded hover:text-orange-700">Messages</button>
                    
            </div>
            <div className="rounded-full mb-1 bg-orange-700 w-1/2 h-1" />
           
             
         <div className='flex flex-col'>
         {notifications && notifications.slice(0, 2).map((notification) => (
         <div className="flex flex-col text-md border border-gray-300 p-4 m-2" key={notification._id}>
          <h2 className='text-lg font-semibold'>{notification.title}</h2>
          <p className='text-sm text-gray-500'>{notification.type}</p>
          <p className='text-sm text-gray-500'>{notification.source}</p>
          <p className='text-sm text-gray-500'>{new Date(notification.createdAt).toLocaleString()}</p>
        </div>
       ))}
    </div>
            {/* I think this button is also related to the notifications */}
            <button onClick={NavOfNotification} className="rounded-full w-full h-12 my-2 bg-gray-200 hover:bg-gray-300">
                See All
            </button>
        </div>
    )
}

export default NotificationsPopus