import React from 'react'
import { Link } from "react-router-dom";
export default function UserMessages({ user }) {
    return (
        <Link to={''} className="flex flex-row items-center p-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                {user.name[0].toUpperCase()}
            </div>
            <div className="flex flex-col flex-grow ml-3">
                <div className="flex items-center">
                    <div className="text-sm font-medium">{user.name}</div>

                </div>
                <div className="text-xs truncate w-40">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Debitis, doloribus?
                </div>
            </div>
        </Link>

    )
}
