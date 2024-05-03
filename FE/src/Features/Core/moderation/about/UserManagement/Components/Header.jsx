import React from 'react'
import { Link, useParams } from 'react-router-dom';
const headerItems = [
    {
        name: "Banned",
        link: "/user-management/banned",
    },
    {
        name: "Muted",
        link: "/user-management/muted",
    },
    {
        name: "Approved",
        link: "/user-management/approved",
    },
    {
        name: "Moderators",
        link: "/user-management/moderators",
    },
];
export default function UserManagementHeader() {
    const params = useParams();
    return (
        <div>
            <h2 className='mb-3 font-bold text-xl'>User Management</h2>
            <div className='flex items-center gap-2'>
                {
                    headerItems.map((e, idx) => 
                    <Link className={`p-4 rounded-full  ${window.location.pathname.endsWith(e.link) ? "text-black  bg-gray-200 font-semibold" : "text-gray-500"}`} key={idx} to={`/r/${params.community}/about${e.link}`}>{e.name}</Link>)
                }
            </div>
        </div>
    )
}
