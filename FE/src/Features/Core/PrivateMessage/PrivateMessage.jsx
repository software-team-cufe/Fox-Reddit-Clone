import React from 'react'
import { Route, Routes } from 'react-router-dom'

function PrivateMessage() {
    return (
        <div>PrivateMessagejjjjjjjjjjjjjj</div>
    )
}


export default function PrivateMessagelayout() {

    return (

        // nested routing for the setting pages renders navofsetting then feed according to route
        < Routes >
            <Route element={<PrivateMessage />} >
                <Route key={'/message'} path='/' element={<></>} />
                {/* <Route key={"/compose"} path="/email" element={<EmailSetting />} /> */}
                {/* all */}
                {/* <Route key={"/inbox"} path="/account" element={<Accountsetting />} />  */}
                {/* <Route key={"/unread"} path="/profile" element={<ProfileSettings />} /> */}
                {/* <Route key={"/messages"} path="/safetyandprivacy" element={<SafetySettings />} /> */}
                {/* <Route key={"/selfreply"} path="/feedsettings" element={<Feedsettings />} /> */}
                {/* <Route key={"/mentions"} path="/notifications" element={<Notifications />} /> */}
                {/* <Route key={"/sent"} path="/chSettings" element={<ChatMessaging />} /> */}
            </Route>
        </Routes >

    )
}