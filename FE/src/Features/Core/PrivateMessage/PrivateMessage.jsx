import React from 'react'
import { Route, Routes, Link, Outlet, useLocation } from 'react-router-dom'
import Send from './Send'
import Inbox from './Inbox'
import Sent from './Sent'


function PrivateMessage() {
    const path = useLocation();

    return (
        <>
            <div className='flex bg-[#935226dc]   rounded '>
                <Link to={`./compose`} className='w-full'>
                    <button className={`  p-1 rounded text-xl w-full 
             hover:bg-[#edc6b2] hover:text-slate-900 h-24 ${path.pathname.includes("compose") ?
                            " bg-[#edc6b2] text-slate-900" : "bg-[#935226dc] text-white"} `}>
                        Send a private message </button>
                </Link>
                <Link to={`./inbox`} className='w-full' >
                    <button className={`   p-1 rounded text-xl w-full 
             hover:bg-[#edc6b2] hover:text-slate-900 h-24 ${path.pathname.includes("inbox") ?
                            " bg-[#edc6b2] text-slate-900" : "bg-[#935226dc] text-white"} `}>Inbox</button>
                </Link>
                <Link to={`./sent`} className='w-full'>
                    <button className={`  p-1 rounded text-xl w-full 
             hover:bg-[#edc6b2] hover:text-slate-900 h-24 ${path.pathname.includes("sent") ?
                            "bg-[#edc6b2] text-slate-900" : "bg-[#935226dc] text-white"} `}>
                        Sent messages</button>
                </Link>

            </div>
            <Outlet />
        </>
    )
}


export default function PrivateMessagelayout() {

    const GetTimeDiff = (PrevT) => {
        var now = new Date();
        // Define another date (you can replace this with any other date you want)
        var differenceMs = now - new Date(PrevT);
        // Convert milliseconds to minutes
        var differenceMinutes = Math.floor(differenceMs / (1000 * 60));
        // Convert minutes to hours
        var differenceHours = Math.floor(differenceMinutes / 60);
        // Output the difference
        if (differenceHours >= 24) {
            // If the difference is a day or more, output in days
            var differenceDays = Math.floor(differenceHours / 24);
            var remainingHours = differenceHours % 24;
            var remainingMinutes = differenceMinutes % 60;
            if (differenceDays === 1)
                return ("sent one day ago")
            return ("sent " + differenceDays + " days ago");
        } else if (differenceHours > 0) {
            // If the difference is less than a day but more than an hour, output in hours and minutes
            var remainingMinutes = differenceMinutes % 60;
            if (differenceHours === 1)
                return ("sent an hour ago");
            return ("sent " + differenceHours + " hours ago");
        } else {
            // If the difference is less than an hour, output in minutes
            if (differenceMinutes === 1)
                return ("sent a minute ago");
            return ("sent " + differenceMinutes + " minutes ago");
        }
    }
    return (

        // nested routing for the setting pages renders navofsetting then feed according to route
        < Routes >
            <Route element={<PrivateMessage />} >
                <Route key={'/message'} path='/' element={<></>} />
                <Route key={"/compose"} path="/compose" element={<Send />} />
                <Route key={"/inbox"} path="/inbox/*" element={<Inbox DiffT={GetTimeDiff} />} />
                <Route key={"/sent"} path="/sent" element={<Sent DiffT={GetTimeDiff} />} />
            </Route>
        </Routes >

    )
}