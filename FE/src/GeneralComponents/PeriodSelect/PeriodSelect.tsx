import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Calendar,ChevronDown } from 'lucide-react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function PeriodSelect({appearance,setperiod}) {

  const [current, switchup] = useState("Relevance")
  const switchperiod = (period) => {
    switch (period) {
      case "All time":
        switchup("All time")
        setperiod("All time")
        break;
      case "Past year":
        switchup("Past year")
        setperiod("Past year")
        break;
      case "Past month":
        switchup("Past month")
        setperiod("Past month")
        break;
      case "Past week":
        switchup("Past week")
        setperiod("Past week")
        break;
      case "Past 24 hours":
        switchup("Past 24 hours")
        setperiod("Past 24 hours")
        break;
      case "Past hour":
        switchup("Past hour")
        setperiod("Past hour")
        break;
      default:
        switchup("All time")
        setperiod("All time")
        break;
    }
  }
  return (
    <Menu as="div" className={`relative inline-block text-left ${(appearance === "Top" || appearance === "Relevance" || appearance === "Comments") ? "" : "hidden"}`}>
      <div>
        <Menu.Button className="w-full rounded-full inline-flex justify-center gap-x-1.5 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-200">
            <Calendar className='w-5 h-6'/>
          <span className='text-xs mt-1'>{current}</span>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-[160px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2">
            <Menu.displayName className='font-semibold text-sm mx-3 my-3 text-gray-700'>View</Menu.displayName>
            <Menu.Item className="mt-2">
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex relative pr-4 h-12 justify-center py-3 text-sm', current == 'All time' ? 'bg-gray-200' : '')} onClick={() => switchperiod("All time")}>
                <span className='text-sm font-bold absolute top-3 left-4'>all time</span>
                </div>
              )}
            </Menu.Item>
            <Menu.Item className="mt-2">
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex relative pr-4 h-12 justify-center py-3 text-sm', current == 'Past year' ? 'bg-gray-200' : '')} onClick={() => switchperiod("Past year")}>
                  <span className='text-sm font-bold absolute top-3 left-4'>Past year</span>
                </div>
              )}
            </Menu.Item>
            <Menu.Item className="mt-2">
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex relative pr-4 h-12 justify-center py-3 text-sm', current == 'Past month' ? 'bg-gray-200' : '')} onClick={() => switchperiod("Past month")}>
                  <span className='text-sm font-bold absolute top-3 left-4'>Past month</span>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','flex relative pr-4 h-12 justify-center py-3 text-sm', current == 'Past week' ? 'bg-gray-200' : '')}onClick={() => switchperiod("Past week")}>
                  <span className='text-sm font-bold absolute top-3 left-4'>Past week</span>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','flex relative pr-4 h-12 justify-center py-3 text-sm', current == 'Past 24 hours' ? 'bg-gray-200' : '')}onClick={() => switchperiod("Past 24 hours")}>
                  <span className='text-sm font-bold absolute top-3 left-4'>Past 24 Hours</span>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','flex relative pr-4 h-12 justify-center py-3 text-sm', current == 'past hour' ? 'bg-gray-200' : '')}onClick={() => switchperiod("Past hour")}>
                  <span className='text-sm font-bold absolute top-3 left-4'>Past hour</span>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}