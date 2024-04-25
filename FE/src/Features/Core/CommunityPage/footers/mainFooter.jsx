import React from "react";
import { useState } from "react";
export default function MainFooter (){

  const [selectedId, setSelectedId] = useState(null);
  const lists = [
    { id: 1, list: "1" },
    { id: 2, list: "2" },
    { id: 3, list: "3" },
    { id: 4, list: "4" },
  ];

  const rule = lists.map(({ id, list }) => (
    <div key={id}>
      <button
        onClick={() => setSelectedId(id === selectedId ? null : id)}
        className="hover:bg-gray-200 w-full h-fit text-xs  font-semibold py-2 px-3 flex flex-row  justify-between"
      >
        <p className="text-gray-500">{list}</p>
        <p className="text-gray-500">write your rules</p>
        {selectedId === id ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      {selectedId === id && (
        <div>
          <p className="text-xs text-gray-500 font-light">
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
          </p>
        </div>
      )}
    </div>
  ));


    return(
        <div className='w-[340px] min-w-[25%] flex-auto h-fit p-3 overflow-y-scroll bg-gray-100 rounded-lg hidden md:block'>
           <div className=" flex flex-col content-between ">
              <div className=" flex flex-col">
                <p className=" font-semibold text-sm">programming</p>
                <p className=" text-sm text-gray-500 font-light">Computer Programming</p>
              </div>
             
              <div className=" flex flex-row justify-between my-3">
                  <div className=" flex flex-col">
                      <p className=" font-semibold text-sm">6.1M</p>
                      <p className=" text-xs text-gray-500 font-light">Members</p>
                  </div>
                  <div className=" flex flex-col">
                     <p className="font-semibold text-sm">456</p>
                   
                     <div className=" flex flex-row"> 
                      
                       <p className=" text-xs text-gray-500 font-light">Online</p>
                     </div>
                  </div>
                  <div className=" flex flex-col">
                     <p className=" font-semibold text-sm">Top 1%</p>
                     <p className=" text-xs text-gray-500 font-light">Rank by size</p>
                  </div>
              </div>
           </div>
           <hr className="w-[100%] h-px mb-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
           <div className=" flex flex-col space-y-3"> 
                <p className=" text-xs text-gray-500">COMMUNITY BOOKMARKS</p>
                <button className="text-xs bg-gray-200 rounded-3xl text-gray-700 font-semibold py-2 px-3  hover:bg-gray-300 hover:underline">
                    FAQ
                </button>
           </div>
           <hr className="w-[100%] h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
           <div className=" flex flex-col">
              <p className="text-xs text-gray-500">Rules</p>
              <div>
                {rule}
               
              </div>
           </div>
        </div>
    )
}