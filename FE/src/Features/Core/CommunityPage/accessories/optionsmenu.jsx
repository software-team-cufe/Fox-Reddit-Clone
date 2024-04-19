import react from "react";
import { Menu, Transition } from '@headlessui/react';
import { GripHorizontal } from "lucide-react";
import { Fragment } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Renders an options menu for a community page.
 *
 * @param {boolean} muted - Indicates whether the community is muted.
 * @param {boolean} favourited - Indicates whether the community is favourited.
 * @param {string} name - The name of the community.
 * @returns {JSX.Element} The rendered options menu.
 */
export default function OptionsMenu({comm, setComm}) {

    const handleFavouriteChange = () => {
      axios.patch(`http://localhost:3002/communities/${comm.id}`, { favourited: !comm.favourited })
      .then(() => {
          if(comm.favourited) {
            toast.success(`r/${comm.name} removed from favourites!`);
          } else {
            toast.success(`r/${comm.name} added to favourites!`);
          }
          setComm({ ...comm, favourited: !comm.favourited });
          
        })
        .catch(error => {
          console.error('There was an error!', error);
        })};

    const handleMuteChange = () => {
      axios.patch(`http://localhost:3002/communities/${comm.id}`, { muted: !comm.muted })
      .then(() => {
        if(comm.muted) {
          toast.success(`r/${comm.name} unmuted!`);
        } else {
          toast.success(`r/${comm.name} muted!`);
        }
        setComm({ ...comm, muted: !comm.muted });
      })
      .catch(error => {
        console.error('There was an error!', error);
      })};

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
              <button onClick={handleFavouriteChange} className=" text-start p-3 text-xs hover:bg-gray-200 w-full">{comm.favourited ? 'Remove from favourites' : 'Add to favourites'}</button>
            </Menu.Item>
            <Menu.Item>
              <button onClick={handleMuteChange} className=" text-start p-3 text-xs hover:bg-gray-200 w-full">{comm.muted ? `Unmute r/${comm.name}`: `Mute r/${comm.name}`}</button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }