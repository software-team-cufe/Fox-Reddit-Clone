import React from 'react'
import SendMessageBar from './Components/SendMessageBar'
import SideBar from './Components/SideBar'
import Header from './Components/Header'
import Message from './Components/Message'
// import { firebaseApp } from '../../../Utils/firebase'

async function getChats() {
    const chat = await firebaseApp.collection('chat');
    
}

export default function ChatPage() {
    '/r/search/?q=$userName&type=user';

    return (
        <div className="flex flex-row h-screen antialiased text-gray-800">
            <SideBar />
            <div className="flex flex-col h-full w-full bg-white ">
                <Header user={{
                    name: "Mahmoud Khaled",
                    _id: "asdasdasdasdasdasdasd",
                }} />
                <div className="h-full overflow-hidden px-4 py-6">
                    <div className="h-full overflow-y-auto">
                        <div className="grid grid-cols-12 gap-y-2">
                            <Message userId={"asdasdasd"} isMe={true} />
                            <Message userId={"asdasdasd"} isMe={false} />
                            <Message userId={"asdasdasd"} isMe={true} />
                            <Message userId={"asdasdasd"} isMe={false} />
                            <Message userId={"asdasdasd"} isMe={true} />
                        </div>
                    </div>
                </div>
                <SendMessageBar />
            </div>
        </div>

    )
}
