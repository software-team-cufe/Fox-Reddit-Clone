import React, { useState, useEffect } from 'react'
import { Route, Routes, Link, Outlet, useLocation } from 'react-router-dom'
import All from './InboxTabs/All'
import Unread from './InboxTabs/Unread'
import Messages from './InboxTabs/Messages'
import PostReplies from './InboxTabs/PostReplies'
import UsernameMentions from './InboxTabs/UsernameMentions'

function InboxFunc() {
    const tabs = [{ label: "ALL", link: "./" },
    { label: "Unread", link: "./unread" },
    { label: "Messages", link: "./messages" },
    { label: "Post Replies", link: "./selfreply" },
    { label: "Username Mentions", link: "./mentions" }]

    const path = useLocation();
    return (
        <div className=' w-full bg-[#0f080416] h-[max(100%,38rem)]'>
            <div className="flex w-full">

                {tabs.map((tab, index) =>

                    <Link key={index} to={tab.link} className='w-full my-2 mx-1'>
                        <button className={` rounded-full p-1 text-sm w-full 
                         hover:bg-[#edc6b2] hover:text-slate-900 h-12 
                         ${path.pathname.endsWith(tab.link.slice(1)) ?
                                "bg-[#edc6b2] text-slate-900" :
                                "bg-[#935226ef] text-white"} `}>
                            {tab.label}</button>
                    </Link>
                )}
            </div>

            <Outlet />
        </div>
    )
}

export default function Inbox({ DiffT }) {
    const [PostRep, setPostRep] = useState([{
        messId: "id",
        username: 'to this user', subject: "title",
        text: '<p>mess eeee eeeeeeeeee lllllllllllll eeeeeeeeeeeee</p>',
        createdAt: new Date('2024-04-20T12:00:00'), postId: "idP",
        commentId: "idC", UpOrDownV: "up", PostTitle: "title", CommentsNum: "10", unread: false
    }, {
        messId: "id2", PostTitle: "title", CommentsNum: "10",
        username: 'to this user', subject: "title", text: '<p>mess eeee eeeeeeeeee lllllllllllll eeeeeeeeeeeee</p>',
        createdAt: new Date('2024-04-20T12:00:00'), postId: "idP", commentId: "idC", UpOrDownV: "down", unread: false
    }]);
    const [Mentions, setMentions] = useState([]);
    const [MISend, setMISend] = useState([]);
    const [MSentToMe, setMSentToMe] = useState([]);

    const setUnreadAtIndex = (index, value) => {
        setPostRep(prevPostRep => {
            const updatedPostRep = [...prevPostRep];
            if (index >= 0 && index < updatedPostRep.length) {
                updatedPostRep[index] = {
                    ...updatedPostRep[index],
                    unread: value
                };
            }
            return updatedPostRep;
        });
    };

    return (

        // nested routing for the setting pages renders navofsetting then feed according to route
        < Routes >
            <Route element={<InboxFunc />} >
                <Route key={'/inbox'} path='/' element={<All />} />
                <Route key={"/unread"} path="/unread" element={<Unread />} />
                <Route key={"/messages"} path="/messages" element={<Messages />} />
                <Route key={"/selfreply"} path="/selfreply" element={<PostReplies setUnreadAtIndex={setUnreadAtIndex}
                    Messages={PostRep} DiffTime={DiffT} />} />
                <Route key={"/mentions"} path="/mentions" element={<UsernameMentions />} />
            </Route>
        </Routes >

    )
}