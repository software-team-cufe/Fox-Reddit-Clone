import React from 'react'

export default function Message({ isMe }) {

    (
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                </div>
                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    <div>I'm ok what about you?</div>
                </div>
            </div>
        </div>
    )
    return (
        <div className={isMe? "col-start-6 col-end-13 p-3 rounded-lg" : "col-start-1 col-end-8 p-3 rounded-lg"}>
            <div className={`flex gap-4 ${isMe ? "flex-row-reverse" : "flex-row"} items-center`}>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                </div>
                <div className={`relative text-sm ${isMe ? "bg-indigo-100" : "bg-white"} py-2 px-4 shadow rounded-xl`}>
                    <div>Hey How are you today?</div>
                </div>
            </div>
        </div>
    )
}
