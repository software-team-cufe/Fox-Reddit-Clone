import React, { Fragment, useContext, createContext, useEffect, useState } from "react";
import { Plus, Bell, GripHorizontal, BellRing, BellOff, Circle } from "lucide-react";
import { Menu, Transition } from '@headlessui/react'
import Sortmenu from "@/GeneralComponents/sortmenu/sortmenu";
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from '@/GeneralElements/Spinner/Spinner';


//helping functions for the notifications frequency and options menu

export const CommunityContext = createContext({
  selected: "New",
  setselected: (selected) => {},
  period: "All time",
  setperiod: (period) => {},
});


// Create a provider component that holds the state
export function CommunityProvider({ children }) {
  const [selected, setselected] = useState("New");
  const [period, setperiod] = useState("All time");

  return (
    <CommunityContext.Provider value={{ selected, setselected, period, setperiod }}>
      {children}
    </CommunityContext.Provider>
  );
}

function bellMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left z-40">

      {/* Sort button header*/}
      <Menu.Button role="dropDownButton" className="inline-flex justify-center border border-black hover:bg-gray-200 active:bg-gray-300 rounded-full w-fill py-2 px-3 bg-white text-sm text-gray-900 ">
        <Bell className="h-5 w-5 fill-black" aria-hidden="true" />
      </Menu.Button>

      {/*the animation of menu opening and closing*/}
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
        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <button className="text-start flex gap-3 p-3 hover:bg-gray-200 w-full">
              <BellRing className="w-4 h-4 mt-1 text-gray-500" aria-hidden="true" />
              <span className="font-semibold text-sm">Frequent</span>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button className="text-start p-3 flex gap-3 mb-2 hover:bg-gray-200 w-full">
              <Bell className="w-4 h-4 mt-1 text-gray-500" aria-hidden="true" />
              <span className='font-semibold text-sm'>Low</span>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button className="text-start p-3 pt-2 flex gap-3 hover:bg-gray-200 w-full">
              <BellOff className="w-4 h-4 mt-1 text-gray-500" aria-hidden="true" />
              <span className='font-semibold text-sm'>Off</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function optionsMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left z-40">

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


export default function CommunityPage() {
  const { community } = useParams();                  // get the community name from the url
  const [comm, setcommunity] = useState({});        // store the community data
  const [loading, setLoading] = useState(true);          // check if the data is loading
  const path = useLocation();                          // get the current path
  const {period,selected} = useContext(CommunityContext);
  //to fetch the community data from the server and use them
  useEffect(() => {
    axios.get(`http://localhost:3002/communities`)
      .then((response) => {
        response.data.map((commresponse) => {
          if (commresponse.name === community) {
            setcommunity(commresponse);
            setLoading(false);
          }
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
  }, [period, selected, community]);

  //to handle loading until fetch is complete
  if (loading) {
    return (
      <div className="w-100 h-100 flex flex-col items-center justify-center">
        <Spinner className="h-24 w-24" />
      </div>
    )
  }

  //main body of the page
  return (
    <div className={`flex-1 `}>
      {/* backgroyund image of the community */}
      <img src={comm.backimage} alt='community' className='md:w-full w-screen h-36 rounded-lg object-cover object-top' />

      {/* community name and (members count in mobile mode)*/}
      <div className='w-full relative flex justify-between items-center m-3'>
        <div>
          <img src={comm.icon} alt='community' className='absolute md:-top-16 -top-2 broder-white md:border-4 border-2 md:w-24 w-12 md:h-24 h-12 rounded-full' />
          <span className='absolute md:top-2 top-0 md:left-28 left-16 md:text-3xl text-lg font-bold'>r/{comm.name}</span>
          <div className='absolute md:top-10 top-[28px] md:left-28 left-16 md:hidden text-xs font-semibold text-gray-500'>
            <span>{comm.membersCount} members</span>
            <span className='md:ml-4 ml-2'>{comm.onlineMembers} online</span>
          </div>
        </div>

        {/* create post, bell and options menu in desktop mode */}
        <div className='hidden mr-6 md:flex md:gap-2 md:justify-between'>
          <button role="createPostButton" className={`rounded-full flex gap-1 justify-center border border-gray-600 w-fit px-4 h-10 items-center hover:border-black`} >
            <Plus className="w-4 h-4" />
            <span className='inline font-bold text-sm'>Create a post</span>
          </button>
          {bellMenu()}
          {optionsMenu()}
        </div>
      </div>

      {/* create post, bell and options menu in mobile mode */}
      <div className='flex gap-2 md:justify-between mr-6 md:hidden mt-[55px]'>
        <button role="createPostButton" className={`rounded-full flex gap-1 justify-center border border-gray-600 w-fit px-4 h-10 items-center hover:border-black`} >
          <Plus className="w-4 h-4" />
          <span className='inline font-bold text-sm'>Create a post</span>
        </button>
        {bellMenu()}
        {optionsMenu()}
      </div>

      {/* the feed with its sort elemtns and the community description and rules and other tools on the right*/}
      <div className='gap-3 flex'>

        {/* the feed and the sort elements (buttons for feed and about page traversal in mobile mode)*/}
        <div className='min-w-[70%] w-screen md:w-[75%] flex-initial gap-3'>
          <br />
          <div className='flex justify-between md:justify-end'>

            {/* page buttons for mobile mode*/}
            <div className='flex gap-2 md:hidden'>
              <Link to={`/r/${comm.name}`} className={`rounded-full font-sans text-sm font-semibold w-fit px-4 py-2 h-fit ${path.pathname == `/r/${comm.name}` ? "bg-gray-300" : "bg-white"}`} >feed</Link>
              <Link to={`/r/${comm.name}/about`} className={`rounded-full font-sans text-sm font-semibold w-fit px-4 py-2 h-fit ${path.pathname == `/r/${comm.name}/about` ? "bg-gray-300" : "bg-white"}`} >about</Link>
            </div>

            {/* sort elements for the feed*/}
            <div className='flex gap-2'>
              <Sortmenu context={CommunityContext} />
              <PeriodSelect appearance={selected} context={CommunityContext} />
            </div>
          </div>
          <hr className="w-full border-1 border-gray-300 mt-2" />
        </div>

        {/* community description and rules and other tools on the right*/}
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
      </div>
    </div>
  )
}