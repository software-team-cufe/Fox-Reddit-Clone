import React from 'react'
import SideBar from './Components/SideBar'
import { Outlet, Route, Routes } from 'react-router-dom'
import ChatPage from './ChatPage'
import AddChat from './AddChat'

export default function ChatRoutes() {
    return (
        <div className="flex flex-row h-screen antialiased text-gray-800">
            <SideBar />
            <Routes>
                <Route path='/:id' element={<ChatPage />} />
                <Route path='/add' element={<AddChat />} />

            </Routes>
        </div>
    )
}
