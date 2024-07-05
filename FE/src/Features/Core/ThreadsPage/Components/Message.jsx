
import React from 'react'
import { Link } from 'react-router-dom'

export default function Message({ isMe, userId: username, message, createdAt }) {


    return (
        <div className={isMe ? "col-start-6 col-end-13 p-3 rounded-lg" : "col-start-1 col-end-8 p-3 rounded-lg"}>
            <div className={`flex gap-4 ${isMe ? "flex-row-reverse" : "flex-row"} items-center`}>
                <Link to={`/viewer/${username}`} className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    {((username ?? "") == "" ? "a" : username)[0].toUpperCase()}
                </Link>
                <div className={`relative text-sm ${isMe ? "bg-indigo-100" : "bg-white"} py-2 px-4 shadow rounded-xl`}>
                    <span>{message}</span>
                </div>
            </div>
        </div>
    )
}
