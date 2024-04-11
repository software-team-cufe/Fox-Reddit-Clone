import { CircleEllipsis, Plus, PlusCircle, MessageCircleMore, CornerUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Mail, Flag, CircleOff } from 'lucide-react';

function CardOptionsMenu() {  //prop takes the display to use it outside the component

    return (
        <Menu as="div" className="relative inline-block text-left">
            {/* dropdown menu displaying currently selected display*/}
            <div>
                <Menu.Button className="w-full rounded-full inline-flex justify-center gap-x-1.5 bg-white p-2 text-sm text-gray-900 hover:bg-gray-200">
                    <CircleEllipsis className='h-5 w-5' />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">

                {/* dropdown menu items */}
                <Menu.Items className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item className="px-3 border-b-gray-300 border-b">
                        <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-sm hover:underline w-full'}>
                            <CornerUpRight className='h-5 w-5 mr-2' />
                            <span> Share</span>
                        </button>
                    </Menu.Item>
                    <Menu.Item className="px-3 border-b-gray-300 border-b">
                        <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-sm hover:underline w-full'}>
                        <Mail className='h-5 w-5 mr-2' />                            
                        <span> Send a Message</span>
                        </button>
                    </Menu.Item>
                    <Menu.Item className="px-3 border-b-gray-300 border-b">
                        <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-sm hover:underline w-full'}>
                        <CircleOff className='h-5 w-5 mr-2' />
                        <span> Block Account</span>
                        </button>
                    </Menu.Item>
                    <Menu.Item className="px-3 border-b-gray-300 border-b">
                        <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-sm hover:underline w-full'}>
                        <Flag className='h-5 w-5 mr-2' />
                        <span> Report Profile</span>
                        </button>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}




export default function ViewerCard() {
    return (
        <div className="relative border border-slate-200 bg-slate-50 min-h-fit h-fit mr-5 rounded-2xl md:block hidden pb-3">

            <div className='w-[100%] h-[124px] rounded-t-2xl mb-2 bg-gradient-to-b from-blue-900 to-black'></div>

            <div className='flex flex-row justify-between items-center mx-3 mt-3'>
                <span className='font-bold'>username</span>
                <CardOptionsMenu />
            </div>

            <div className='flex flex-row mt-3'>
                <button
                    className="flex items-center py-1 px-4  m-2 text-xs font-medium text-gray-500 focus:outline-none bg-blue-800 rounded-full border border-gray-200 hover:bg-blue-900">
                    <PlusCircle className='text-white h-4 w-4 mr-1' />
                    <span className="text-white text-sm">Follow</span>
                </button>
                <button
                    className="flex items-center py-1 px-4  m-2 text-xs font-medium text-gray-500 focus:outline-none bg-gray-200 rounded-full border border-gray-200 hover:bg-gray-300">
                    <MessageCircleMore className='h-5 w-5 mr-1' />
                    <span className="text-sm">Chat</span>
                </button>
            </div>
            <p className='p-2 text-xs text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis nulla qui tenetur numquam explicabo quae recusandae rem, voluptatum, voluptatem tempora minus tempore vero esse nesciunt ut ipsam alias ad reiciendis.</p>
            <hr className="h-px m-3 mt-1 mb-5 bg-gray-200 border-0 dark:bg-gray-700" />

            <div className='flex flex-row justify-between px-4 mt-2'>
                <div className='flex flex-col'>
                    <p className='text-sm font-bold'>1</p>
                    <p className='text-xs text-gray-500'>
                        Post Karma
                    </p>
                </div>
                <div className='flex flex-col'>
                    <p className="text-sm font-bold">0</p>
                    <p className='text-xs text-gray-500'>
                        Comment Karma
                    </p>
                </div>

                <div className='flex flex-col'>
                    <p className='text-sm font-bold'>Feb 29, 2024</p>
                    <p className='text-xs text-gray-500'>
                        Cake day
                    </p>
                </div>
            </div>

            <hr className="h-px m-3 mb-5 bg-gray-200 border-0 dark:bg-gray-700" />

            <h1 className="mx-3 mb-4 text-xs text-gray-500 font-semibold"> LINKS </h1>
            <Link to={'/settings/profile'} className="w-fit flex items-center py-1 pl-2 pr-3 mx-3 mb-2 text-xs font-medium text-gray-700 focus:outline-none bg-gray-200 rounded-full hover:bg-gray-300 hover:underline">
                <Plus className='h-5 w-5 mr-2' />
                <span>Add Social Link</span>
            </Link>

            <hr className="h-px m-3 mb-5 bg-gray-200 border-0 dark:bg-gray-700" />

            <h1 className="mx-3 mb-4 text-xs text-gray-500 font-semibold">MODERATOR OF THESE COMMUNITIES</h1>

        </div>
    )
}