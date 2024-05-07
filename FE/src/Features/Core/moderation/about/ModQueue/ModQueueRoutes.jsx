import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const ModQueueRoutes = () => {
  const location = useLocation()
  const pathname = location.pathname
  const segments = pathname.split('/').filter((segment) => segment !== '')
  const { community } = useParams()

  const isActiveLink = (path) => {
    return segments[2] === 'mod-queue' && segments[3] === path
  }

  return (
    <nav className=" p-4 h-12">
      <div className="container mx-auto flex items-center justify-between">
        <div className="space-x-4">
          <Link
            to={`/r/${community}/about/spam`}
            className={`text-black font-semibold ${isActiveLink('spam') ? 'border border-white bg-blue-500' : ''}`}
          >
            Remove
          </Link>
          <Link
            to={`/r/${community}/about/edited`}
            className={`text-black font-semibold ${isActiveLink('edited') ? 'border border-white bg-blue-500' : ''}`}
          >
            Edit
          </Link>
          <Link
            to={`/r/${community}/about/unmoderated`}
            className={`text-black font-semibold ${isActiveLink('unmoderated') ? 'border border-white bg-blue-500' : ''}`}
          >
            Unmoderated
          </Link>
        </div>
        <div className="text-white">
          {isActiveLink('spam') && 'RemovedPage'}
          {isActiveLink('edited') && 'EditPage'}
          {isActiveLink('unmoderated') && 'UnmoderatedPage'}
        </div>
      </div>
    </nav>
  )
}

export default ModQueueRoutes