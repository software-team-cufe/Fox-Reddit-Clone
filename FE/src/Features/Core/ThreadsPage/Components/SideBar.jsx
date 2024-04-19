import React from 'react'
import UserMessages from './UserMessages'

export default function SideBar() {
    return (
        <div className="flex flex-row w-[150px] md:w-[300px] flex-shrink-0 bg-gray-100 ">
            <div className="flex flex-col w-full h-full p-5 ">
                <div className="">
                    <div className="text-xs text-gray-400 font-semibold uppercase">
                        Threads
                    </div>
                </div>
                <div className="h-full overflow-hidden relative pt-2">
                    <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
                        <UserMessages user={{
                            name: "Mahmoud Khaled",
                            id: "asdasdasdasdasdasdasd",
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
