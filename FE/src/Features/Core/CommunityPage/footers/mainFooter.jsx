import React from "react";
import { Circle } from "lucide-react";

export default function MainFooter ({comm}){
    return(
        <div className='w-[340px] min-w-[25%] flex-auto h-fit p-3 overflow-y-scroll bg-gray-100 rounded-lg hidden md:block'>
        {/*maint title and about*/}
        <div className="text-sm font-bold">title</div>
        <span className="text-xs text-gray-599">{comm.description}</span>

        {/*community statistics ans such*/}
        <div className="grid grid-cols-2 mt-3 grid-rows-2 grid-flow-rows justify justify-between">
          <div className="text-sm font-semibold text-gray-500">{comm.membersCount}</div>
          <div className="text-sm font-semibold text-gray-500">{comm.onlineMembers}</div>
          <div className="text-sm font-semibold text-gray-800">members</div>
          <div className="flex gap-1 text-sm font-semibold text-gray-800"><Circle className="w-2 h-2 fill-green-500 text-green-500 mt-[6px]" />online</div>
        </div>
        <hr className="w-full border-1 my-2 border-gray-300" />

        {/* mapping of community rules*/}
        {comm.rules.length > 0 && (<>
          <div className="text-sm font-bold">Rules</div>
          <ul className="text-xs text-gray-599">
            {
              comm.rules.map((rule, index) => <li key={index} className="list-disc list-inside my-1">{rule}</li>)
            }
          </ul>
          <hr className="w-full border-1 my-2 border-gray-300" /></>)}
      </div>
    )
}