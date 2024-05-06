import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

//for mapping the sorting button options
/**
 * Checks if the given path is a valid best path.
 * @param {string} path - The path to be checked.
 * @returns {boolean} - Returns true if the path is a valid best path, otherwise returns false.
 */
function isValidBest(path) {
  const bestpaths = ['/', '/Popular', '/All'];

  if (path.startsWith('/posts/'))
    return true;

  if (bestpaths.includes(path))
    return true;

  else
    return false;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sortmenu({ context }) {

  //managing current state selection and passing data to parent eleement to change the sorting
  const [current, switchstates] = useState("New");
  const { setselected } = useContext(context);
  const path = useLocation().pathname;

  const handleSwitch = (period) => {
    switchstates(period);
    setselected(period);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">

      {/* Sort button header*/}
      <div id="sortClickDown">
        <Menu.Button role="dropDownButton" className="w-full rounded-full inline-flex justify-center gap-x-1.5 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-200">
          {current}
          <ChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

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
        <Menu.Items className="absolute right-0 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

          {/* prompt of options*/}
          <div role="menuBodyHeader" className='font-semibold text-sm mx-3 my-3 text-gray-700'>Sort by</div>

          {/* Sort option mapped*/}
          <Menu.Item >
            {({ active }) => (
              <div id="bestOption" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm', current === 'Best' ? 'bg-gray-200' : '', isValidBest(path) ? '' : 'hidden')} onClick={() => handleSwitch("Best")}>
                Best
              </div>
            )}</Menu.Item>
          <Menu.Item >
            {({ active }) => (
              <div id="hotOption" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm', current === 'Hot' ? 'bg-gray-200' : '')} onClick={() => handleSwitch("Hot")}>
                Hot
              </div>
            )}</Menu.Item>
          <Menu.Item >
            {({ active }) => (
              <div id="newOption" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm', current === 'New' ? 'bg-gray-200' : '')} onClick={() => handleSwitch("New")}>
                New
              </div>
            )}</Menu.Item>
          <Menu.Item >
            {({ active }) => (
              <div id="topOption" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm', current === 'Top' ? 'bg-gray-200' : '')} onClick={() => handleSwitch("Top")}>
                Top
              </div>
            )}</Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}