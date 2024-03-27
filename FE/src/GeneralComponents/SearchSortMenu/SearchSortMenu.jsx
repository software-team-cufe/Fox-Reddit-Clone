import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown, Flame, ArrowUpNarrowWide, Rocket, Badge, TrendingUp } from 'lucide-react'
import { React, useContext } from 'react';
import {SearchContext} from '@/Features/Core/SearchPages/SearchPagesRoutes';

// for mapping sorting option buttons in menu
const options = [
  { name: 'Relevance', icon: <Rocket className='w-5 h-6 absolute top-[10px] left-3' /> },
  { name: 'Hot', icon: <Flame className='w-5 h-6 absolute top-[10px] left-3' /> },
  { name: 'Top', icon: <ArrowUpNarrowWide className='w-5 h-6 absolute top-[10px] left-3' /> },
  { name: 'New', icon: <Badge className='w-5 h-6 absolute top-[10px] left-3' /> },
  { name: 'Comments', icon: <TrendingUp className='w-5 h-6 absolute top-[10px] left-3' /> },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function SearchSortMenu() {
  const { setselected } = useContext(SearchContext);
  const [current, switchup] = useState("Relevance");

  // Update the switchup function to also update the selected state
  const handleSwitch = (optionName) => {
    switchup(optionName);
    setselected(optionName);
  };

  //to render the currently selectd sorting option icon on header
  const displayicon = () => {
    switch (current) {
      case "Relevance":
        return <Rocket className='w-5 h-6' />;
      case "Hot":
        return <Flame className='w-5 h-6' />;
      case "Top":
        return <ArrowUpNarrowWide className='w-5 h-6' />;
      case "New":
        return <Badge className='w-5 h-6' />;
      case "Comments":
        return <TrendingUp className='w-5 h-6' />;
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">

      {/* dropdown menu button  */}
      <Menu.Button role="menuButton" className="w-full rounded-full inline-flex justify-center gap-x-1.5 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-200">
        {displayicon()}
        <span className='text-xs mt-1'>{current}</span>
        <ChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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

        {/* dropdown menu items mapped*/}
        <Menu.Items className="absolute right-0 z-10 mt-2 w-[160px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div role="menuHeader" className='font-semibold text-sm mx-3 my-3 text-gray-700'>View</div>
          {options.map((option, index) => {
            return (
              <Menu.Item key={index} className="mt-2">
                {({ active }) => (
                  <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex relative pr-4 h-12 justify-center py-3 text-sm', current == option.name ? 'bg-gray-200' : '')} onClick={() => handleSwitch(option.name)}>
                    {option.icon}
                    <span className='text-xs absolute top-3 left-12'>{option.name}</span>
                  </div>
                )}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}