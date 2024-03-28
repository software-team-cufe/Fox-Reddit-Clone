import { ChevronDown } from "lucide-react";

export default function ChatMessaging() {

    const DoReadToAll = () => {
        //this function should Mark all massages as read
    }


    return (
        <div className="w-[75%]">
            <div className="flex justify-between flex-wrap">
                <div>
                    <div>Mark all as read</div>
                    <h4 className="text-gray-400">Mark all conversations and invites as read.</h4>
                </div>
                <div className="w-auto">
                    <button id="dropdownDefaultButton" onClick={DoReadToAll} data-dropdown-toggle="dropdown"
                        className="text-black dark:text-blue-500 w-auto focus:ring-blue-300 font-medium border-solid border-2 border-sky-500 rounded-lg text-sm px-5 py-2.5 text-center 
                        inline-flex gap-5 items-center bg-transparent dark:bg-transparent dark:hover:bg-blue-200 dark:focus:ring-blue-800 rounded-3xl" type="button">
                        Mark as Read
                    </button>
                </div>
            </div>
        </div>

    );
}