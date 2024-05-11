import React from 'react'
import { Link } from "react-router-dom";
import { userStore } from '../../../../hooks/UserRedux/UserStore';
export default function UserMessages({ chat,chatId }) {
    const user = userStore.getState().user.user;
    const friend = (chat.sender == user.username ? chat.reciever : chat.sender) ?? "esd";

    return (
        <a href={`/chat/${chatId}`} className="flex flex-row items-center p-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                {friend[0].toUpperCase()}
            </div>
            <div className="flex flex-col flex-grow ml-3">
                <div className="flex items-center">
                    <div className="text-sm font-medium">{friend}</div>

                </div>

            </div>
        </a>

    )
}
