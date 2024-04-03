import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown,Rows2,Rows3 } from 'lucide-react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Postdisplaymenu() {

  const [current, switchup] = useState("card");

  const displayicon = () => {
    if (current == 'card') {
        return <Rows2 className='w-5 h-6 pb-1'/>
    } else {
        return <Rows3 className='w-5 h-6 pb-1'/>
    }
}

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="w-full rounded-full inline-flex justify-center gap-x-1.5 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-200">
          {displayicon()}
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-[120px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2">
            <Menu.displayName className='font-semibold text-sm mx-3 my-3 text-gray-700'>View</Menu.displayName>
            <Menu.Item className="mt-2">
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex relative pr-4 h-12 justify-center py-3 text-sm', current == 'Hot' ? 'bg-gray-200' : '')} onClick={() => switchup("card")}>
                  <Rows2 className='w-5 h-6 absolute top-[10px] left-3'/>
                  <span className='absolute top-3 left-12'>Card</span>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','flex relative pr-4 h-12 justify-center py-3 text-sm', current == 'New' ? 'bg-gray-200' : '')}onClick={() => switchup("classic")}>
                  <Rows3 className='w-5 h-6 absolute top-[10px] left-3'/>
                  <span className='absolute top-3 left-12'>Classic</span>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}