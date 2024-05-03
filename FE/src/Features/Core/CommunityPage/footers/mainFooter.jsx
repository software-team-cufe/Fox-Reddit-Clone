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
          <p className="text-xs text-gray-500 font-light mx-5">
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
                <p className=" font-semibold text-sm"> community name</p>
                <p className=" text-xs text-gray-500 font-light">community description</p>
              </div>
             
              <div className=" flex flex-row justify-between my-3">
                  <div className=" flex flex-col">
                      <p className=" font-semibold text-sm">6.1M</p>
                      <p className=" text-xs text-gray-500 font-light">Members</p>
                  </div>
                  <div className=" flex flex-col">
                     <p className="font-semibold text-sm">456</p>
                   
                     <div className=" flex flex-row"> 
                       <svg className="text-green-500 w-2 h-2 fill-current rounded-full mt-1 mr-1"
                         xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="2" stroke="currentColor" fill="currentColor" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" /></svg>
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
           <hr className="w-[100%] h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          
           <div className=" flex flex-col space-y-2">
              <p className="text-xs text-gray-500 mb-5">MODERATORS</p>
             
              <div className=" flex flex-row space-x-2 mx-2" >
                <svg className="text-orange-400 w-7 h-7"
              xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M21 14l-9 7-9-7L6 3l3 7h6l3-7z" /></svg>   
                <p className=" text-sm font-light"> u/username1</p>
              </div>
             
              <div className=" flex flex-row space-x-2 mx-2">
                <svg className="text-pink-200 w-7 h-7"
                xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M21 14l-9 7-9-7L6 3l3 7h6l3-7z" /></svg>
                <p className=" text-sm font-light"> u/username2</p>
              </div>

              <div className=" flex flex-row space-x-2 mx-2">    
                 <svg className="text-green-500 w-7 h-7"
                 xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M21 14l-9 7-9-7L6 3l3 7h6l3-7z" /></svg>    
                 <p className=" text-sm font-light"> u/username3</p>
              </div>

              <div className=" flex flex-row space-x-2 mx-2">
                <svg className="text-indigo-300 w-7 h-7"
                 xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M21 14l-9 7-9-7L6 3l3 7h6l3-7z" /></svg>
                 <p className=" text-sm font-light"> u/username4</p>   
              </div>
              <div className=" flex flex-row space-x-2 mx-2">
                   <svg className="text-red-500 w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M21 14l-9 7-9-7L6 3l3 7h6l3-7z" /></svg> 
                    <p className=" text-sm font-light"> u/username5</p>     
              </div>

              <button className="text-xs bg-gray-200 rounded-3xl text-gray-700 font-semibold h-[35px] flex items-center justify-center hover:bg-gray-300 hover:underline">
                 <svg className="w-5 h-5 self-center "
                  xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0 1.1.9 2 2 2z" /> 
                    <polyline points="22,6 12,13 2,6" />
                   </svg>
                 <p className=' ml-2 self-center '> Messages the mods </p>
              </button>
              
              <button className="text-xs bg-gray-200 rounded-3xl text-gray-700 font-semibold h-[35px]  hover:bg-gray-300 hover:underline space-y-4">
                view all moderators 
              </button>
                     
           </div>
        </div>
    )
}