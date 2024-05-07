import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ username }) {
    return (
        <Link to={`/user/${username}`} className="flex flex-row items-center py-4 px-6 shadow">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
                {username[0].toUpperCase()}
            </div>
            <div className="flex flex-col ml-3">
                <div className="font-semibold text-sm">{username}</div>

            </div>
        </Link>
    )
}
