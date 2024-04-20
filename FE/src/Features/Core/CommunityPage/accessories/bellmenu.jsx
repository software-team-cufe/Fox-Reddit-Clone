import react from "react";
import { Menu, Transition } from '@headlessui/react';
import { Bell, BellRing, BellOff } from "lucide-react";
import { Fragment } from "react";

/**
 * Renders a bell menu component.
 *
 * @returns {JSX.Element} The bell menu component.
 */
export default function bellMenu() {
    return (
      <Menu as="div" className="relative inline-block text-left z-30">
  
        {/* Sort button header*/}
<<<<<<< HEAD
        <Menu.Button id="commBellClickDown" role="dropDownButton" className="inline-flex justify-center border border-black hover:bg-gray-200 active:bg-gray-300 rounded-full w-fill py-2 px-3 bg-white text-sm text-gray-900 ">
=======
        <Menu.Button role="dropDownButton" className="inline-flex justify-center border border-black hover:bg-gray-200 active:bg-gray-300 rounded-full w-fill py-2 px-3 bg-white text-sm text-gray-900 ">
>>>>>>> origin/newnew-nadine
          <Bell className="h-5 w-4 fill-black" aria-hidden="true" />
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
<<<<<<< HEAD
              <button id="frequentOption" className="text-start flex gap-3 p-3 hover:bg-gray-200 w-full">
=======
              <button className="text-start flex gap-3 p-3 hover:bg-gray-200 w-full">
>>>>>>> origin/newnew-nadine
                <BellRing className="w-4 h-4 mt-1 text-gray-500" aria-hidden="true" />
                <span className="font-semibold text-sm">Frequent</span>
              </button>
            </Menu.Item>
            <Menu.Item>
<<<<<<< HEAD
              <button id="lowOption" className="text-start p-3 flex gap-3 mb-2 hover:bg-gray-200 w-full">
=======
              <button className="text-start p-3 flex gap-3 mb-2 hover:bg-gray-200 w-full">
>>>>>>> origin/newnew-nadine
                <Bell className="w-4 h-4 mt-1 text-gray-500" aria-hidden="true" />
                <span className='font-semibold text-sm'>Low</span>
              </button>
            </Menu.Item>
            <Menu.Item>
<<<<<<< HEAD
              <button id="offOption" className="text-start p-3 pt-2 flex gap-3 hover:bg-gray-200 w-full">
=======
              <button className="text-start p-3 pt-2 flex gap-3 hover:bg-gray-200 w-full">
>>>>>>> origin/newnew-nadine
                <BellOff className="w-4 h-4 mt-1 text-gray-500" aria-hidden="true" />
                <span className='font-semibold text-sm'>Off</span>
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }