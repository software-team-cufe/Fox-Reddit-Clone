import { MessageCircleX } from 'lucide-react'
import React from 'react'
import { useParams } from 'react-router-dom';

export default function MutedUsers() {
  const mutedUsers = [];
  const params = useParams();
  return (
    <div className='w-full'>

      <div className='mt-9'>
        <div className='mb-4 flex justify-end'>
          <button  className=' rounded-full bg-blue-500 px-4 py-2 text-white'>Ban User</button>
        </div>
        <div className=' rounded-lg border p-4 w-full'>
          {
            mutedUsers.length == 0 && <div className='flex my-14 text-gray-600 flex-col gap-4 items-center justify-center'>
              <MessageCircleX  size={45} />
              No muted users in r/{params.community}
            </div>
          }
          {

          }
        </div>
      </div>
    </div>
  )
}
