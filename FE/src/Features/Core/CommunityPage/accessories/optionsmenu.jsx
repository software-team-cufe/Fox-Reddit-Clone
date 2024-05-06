import React from "react";
import { Menu, Transition } from '@headlessui/react';
import { GripHorizontal } from "lucide-react";
import { Fragment } from "react";
import { toast } from 'react-toastify';
import { userAxios } from "@/Utils/UserAxios";
import { useSelector } from "react-redux";

/**
 * Renders an options menu for a community page.
 *
 * @param {boolean} muted - Indicates whether the community is muted.
 * @param {boolean} favourited - Indicates whether the community is favourited.
 * @param {string} name - The name of the community.
 * @returns {JSX.Element} The rendered options menu.
 */
export default function OptionsMenu({ comm, setComm }) {

  const username = useSelector((state) => state.user.user.username);

  const handleFavouriteChange = () => {
    toast.info("Processing, stand by", {position : "top-center"});
    const favStatus = comm.favourited ? "unfavorite" : "favorite";

    userAxios.post(`${comm.name}/api/${favStatus}`,)
      .then(() => {
        if (comm.favourited) {
          toast.success(`r/${comm.name} removed from favourites!`, {position : "top-center"});
        } else {
          toast.success(`r/${comm.name} added to favourites!`, {position : "top-center"});
        }
        setComm({ ...comm, favourited: !comm.favourited });

      })
      .catch(error => {
        console.error('There was an error!', error);
      })
  };

  const handleMuteChange = () => {
    toast.info("Processing, stand by", {position : "top-center"});

    const requestType = comm.muted ? "unmute" : "mute";
    userAxios.post(`${comm.name}/api/${requestType}/${username}`, { reason: "mute" })
      .then(() => {
        setComm({ ...comm, muted: !comm.muted });
        if (comm.muted) {
          toast.success(`r/${comm.name} unmuted!`, {position : "top-center"});
        } else {
          toast.success(`r/${comm.name} muted!`, {position : "top-center"});
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-30">

      {/* Sort button header*/}
      <Menu.Button id="commOptionsClickDown" role="dropDownButton" className="inline-flex justify-center hover:bg-gray-200 active:bg-gray-300 rounded-full w-fill py-2 px-2 bg-white text-sm text-gray-900 ">
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
          <button role="commFavourite" id="favouriteOption" onClick={handleFavouriteChange} className=" text-start p-3 text-xs hover:bg-gray-200 w-full">{comm.favourited ? 'Remove from favourites' : 'Add to favourites'}</button>
          <button role="commMute" id="MuteOption" onClick={handleMuteChange} className=" text-start p-3 text-xs hover:bg-gray-200 w-full">{comm.muted ? `Unmute r/${comm.name}` : `Mute r/${comm.name}`}</button>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}