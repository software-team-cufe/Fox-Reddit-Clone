import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BannedUsers from './BannedUsers'
import UserManagementHeader from '../Components/Header'
import MutedUsers from './MutedUsers'
import ApprovedUsers from './ApprovedUsers'
import ModeratorsUsers from './ModeratorsUsers'

export default function UserManagemntRoutes() {
    return (
        <div className='w-full'>
            <UserManagementHeader />
            <Routes>
                <Route path='/banned' element={<BannedUsers />} />
                <Route path='/muted' element={<MutedUsers />} />
                <Route path='/approved' element={<ApprovedUsers />} />
                <Route path='/moderators' element={<ModeratorsUsers />} />
            </Routes>
        </div>
    )
}
