import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sortmenu({setselected}) {

  const [current, switchstates] = useState("New");
  const switchup = (period) => {
    switch (period) {
      case "Top":
        switchstates("Top")
        setselected("Top")
        break;
      case "Hot":
        switchstates("Hot")
        setselected("Hot")
        break;
      case "New":
        switchstates("New")
        setselected("New")
        break;
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="w-full rounded-full inline-flex justify-center gap-x-1.5 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-200">
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
        <Menu.Items className="absolute right-0 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className='font-semibold text-sm mx-3 my-3 text-gray-700'>Sort by</div>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm', current == 'Hot' ? 'bg-gray-200' : '')} onClick={() => switchup("Hot")}>
                  Hot
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','block px-4 py-2 text-sm', current == 'New' ? 'bg-gray-200' : '')}onClick={() => switchup("New")}>
                  New
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','block px-4 py-2 text-sm', current == 'Top' ? 'bg-gray-200' : '')}onClick={() => switchup("Top")}>
                  Top
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}