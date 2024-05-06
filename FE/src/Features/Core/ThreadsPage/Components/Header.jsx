import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ user }) {
    return (
        <Link to={`/user/${user._id}`} className="flex flex-row items-center py-4 px-6 shadow">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
                {user.name[0].toUpperCase()}
            </div>
            <div className="flex flex-col ml-3">
                <div className="font-semibold text-sm">{user.name}</div>

            </div>
        </Link>
    )
}
