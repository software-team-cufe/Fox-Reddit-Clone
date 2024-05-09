import React, { useEffect, useState } from 'react'
import NavOfNotification from './NavOfNotification'
import { useNavigate } from 'react-router-dom';
import { onMessageListener, requestPermission } from '../../Utils/firebase';
import { userAxios } from '../../Utils/UserAxios';
import { getToken } from "firebase/messaging";
import { getMessaging } from "firebase/messaging";
const NotificationPage = () => {
  const [notifications, setNotifications] = useState([])
  const [unreadNotificationsCount, setUnReadNotifications] = useState([])
  const [notification, setNotification] = useState({ title:"" , body:" "});

  const navigator = useNavigate();
  const handleNavigate = () => {
    navigator('/setting/notifications');
  }

  
   useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Error registering Service Worker:', error);
        });
    }
  }, []);
  



   useEffect(() => {
   requestPermission();
      const unsubscribe= onMessageListener().then((payload) => {
       setNotification({
       title: payload?.notification.title,
       body: payload?.notification.body
     });
     console.log(payload?.notification.title)
     console.log("notification",setNotification)
   });
   return () => {
     unsubscribe.catch((err) => console.log(err));
   };
   }, []);


   const fetchToken = async () => {
    try {
      const messaging = getMessaging();
      const currentToken = await getToken(messaging, { vapidKey: "BFWzZdxGVozJKyuEWwyc09beuOhJGwEJCVxataGbpWdHcHqgtwZMI-aWuYk8QfbhGaDpC0JryiYtA22sA01BHos" });
      const response = await userAxios.post('/api/auth/login/fcmtoken', { fcmtoken: currentToken });
      console.log(response.data);
      console.log("current",currentToken);

    } catch (error) {
      console.log(error);
    }
  }
  
  fetchToken();

   
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await userAxios.get('/api/v1/me/notification');
          setNotifications(response.data.notifications);
          setUnReadNotifications(response.data.unreadNotificationsCount);
          console.log(response.data.unreadNotificationsCount);
          console.log(response.data.notifications);
          console.log("fetchNotification");
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
  
      fetchNotifications();
    }, []);


  return (
    <div>
      <h1 className='text-2xl font-semibold mt-3 mb-8'>Notifications </h1>
      <NavOfNotification ></NavOfNotification>
      <div className=' mt-4 w-3/5'>
        <div className='flex justify-end items-center space-x-3'>
          <button >
            Mark All as read
          </button>

          <button onClick={handleNavigate}  >
            <svg className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />  <circle cx="12" cy="12" r="3" /></svg>

          </button>
        </div>
         <div>
         { notification.title}
         { notification.body}
         </div>
</div>
<p className='text-lg text-orange-500 ml-2 font-semibold'>{unreadNotificationsCount}</p>

<div className='flex flex-col'>
      {notifications && notifications.map((notification) => (
        <div className="flex flex-col text-md border border-gray-300 p-4 m-2" key={notification._id}>
          <h2 className='text-lg font-semibold'>{notification.title}</h2>
          <p className='text-sm text-gray-500'>{notification.type}</p>
          <p className='text-sm text-gray-500'>{notification.source}</p>
          <p className='text-sm text-gray-500'>{new Date(notification.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  
    </div>
  )
}

export default NotificationPage