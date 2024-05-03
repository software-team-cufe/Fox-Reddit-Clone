import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotificationsPopus({ setShowBellPop }) {
    const navigator = useNavigate();
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
            add notifications block here
            < hr className="my-2" />
            {/* I think this button is also related to the notifications */}
            < button className="rounded-full w-full h-12 my-2 bg-gray-200 hover:bg-gray-300">
                See All
            </button >
        </div >
    )
}

export default NotificationsPopus