import React, {Fragment, useState} from "react";
import {Plus, Bell, GripHorizontal, BellRing, BellOff} from "lucide-react";
import { Menu, Transition } from '@headlessui/react'
import Sortmenu from "@/GeneralComponents/sortmenu/sortmenu";
import Postdisplaymenu from "@/GeneralComponents/postdisplaymenu/postdisplaymenu";
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";

function bellMenu() {
    return (
        <Menu as="div" className="relative inline-block text-left z-50">
    
          {/* Sort button header*/}
            <Menu.Button role="dropDownButton" className="inline-flex justify-center border border-black hover:bg-gray-200 active:bg-gray-300 rounded-full w-fill py-2 px-3 bg-white text-sm text-gray-900 ">
              <Bell className="h-5 w-5 fill-black" aria-hidden="true" />
            </Menu.Button>
    
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
              
              {/* Sort options list mapped*/}
            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                    <button className="text-start flex gap-3 p-3 hover:bg-gray-200 w-full">
                    <BellRing className="w-6 h-6 text-gray-500" aria-hidden="true"/>
                    <span className="font-semibold">Frequent</span>
                    </button>
                </Menu.Item>
                <Menu.Item>
                    <button className="text-start p-3 flex gap-3 mb-2 hover:bg-gray-200 w-full">
                    <Bell className="w-6 h-6 text-gray-500" aria-hidden="true"/>
                    <span className='font-semibold'>Low</span>
                    </button>
                </Menu.Item>
                <Menu.Item>
                    <button className="text-start p-3 pt-2 flex gap-3 hover:bg-gray-200 w-full">
                    <BellOff className="w-6 h-6 text-gray-500" aria-hidden="true"/>
                    <span className='font-semibold'>Off</span>
                    </button>
                </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      )
}

function optionsMenu() {
    return (
        <Menu as="div" className="relative inline-block text-left z-50">
    
          {/* Sort button header*/}
          <Menu.Button role="dropDownButton" className="inline-flex justify-center border border-black hover:bg-gray-200 active:bg-gray-300 rounded-full w-fill py-2 px-3 bg-white text-sm text-gray-900 ">
              <GripHorizontal className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
    
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
              
              {/* Sort options list mapped*/}
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                    <button className="font-semibold text-start p-3 text-sm hover:bg-gray-200 w-full">Add to favorites</button>
                </Menu.Item>
                <Menu.Item>
                    <button className="font-semibold text-start p-3 text-sm hover:bg-gray-200 w-full">Mute r/communityname</button>
                </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      )
}

export default function CommunityPage () {
    const [selected,setselected] = useState("New");   // for the sort select component
    const [period,setperiod] = useState('All time');  // for the period select component
    const [display,setDisplay] = useState('Card');     // for the display style select component

    return(
        <div className={`flex-1 ${display == "card" ? 'w-full ml-32' : 'w-[75%] ml-80'}`}>
            <img src='https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D' alt='community' className='w-full h-36 rounded-lg'/>
            <div className='w-full relative flex justify-between items-center m-3'>
                <div>
                    <img src='https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D' alt='community' className='absolute -top-16 broder-white border-4 w-24 h-24 rounded-full'/>
                    <span className='absolute top-2 left-28 text-3xl font-bold'>r/Community</span>
                </div>

                <div className='flex gap-2 justify-between mr-6'>
                <button role="createPostButton" className={`rounded-full flex gap-1 justify-center border border-gray-600 w-fit px-4 h-10 items-center hover:border-black`} >
                    <Plus className="w-4 h-4"/>
                    <span className='inline font-bold text-sm'>Create a post</span>
                </button>
                    {bellMenu()}
                    {optionsMenu()}
                </div>
        </div>

        <div className='gap-3 flex'>
            <div className='min-w-[75%] flex-1 gap-3'>
            <br/>
            <div className='flex gap-2 justify-end'>
                <Sortmenu setselected={setselected}/>
                <PeriodSelect appearance={selected} setperiod={setperiod}/>
                <Postdisplaymenu setDisplay={setDisplay}/>
            </div>
            <hr className="w-full border-1 border-gray-300"/>
            </div>
            <div className='flex gap-3 w-[340px] h-fit p-3 overflow-y-scroll bg-gray-200 rounded-lg'>
                    
            </div>
            </div>
        </div>
    )
}