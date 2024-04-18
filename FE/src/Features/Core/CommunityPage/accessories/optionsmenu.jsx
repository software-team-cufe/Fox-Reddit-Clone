import react from "react";
import { Menu, Transition } from '@headlessui/react';
import { GripHorizontal } from "lucide-react";
import { Fragment } from "react";

  
export default function optionsMenu(muted, favourited, name) {
    return (
      <Menu as="div" className="relative inline-block text-left z-30">
  
        {/* Sort button header*/}
        <Menu.Button role="dropDownButton" className="inline-flex justify-center border border-black hover:bg-gray-200 active:bg-gray-300 rounded-full w-fill py-2 px-2 bg-white text-sm text-gray-900 ">
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
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <button className=" text-start p-3 text-xs hover:bg-gray-200 w-full">{favourited ? 'Remove from favourites' : 'Add to favourites'}</button>
            </Menu.Item>
            <Menu.Item>
              <button className=" text-start p-3 text-xs hover:bg-gray-200 w-full">{muted ? `Unmute r/${name}`: `Mute r/${name}`}</button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }