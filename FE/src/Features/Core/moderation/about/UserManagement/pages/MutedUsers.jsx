import React, { useState } from 'react'
import { MessageCircleX } from 'lucide-react'
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import MuteUserModal from '../Components/MuteUserModal';
export default function MutedUsers() {
  const [isOpen, setOpen] = useState(false);
  const params = useParams();

  const { data, isLoading, isError, refetch } = useQuery(
    "get-mocked-banned-users",
    () => axios.get(`http://localhost:3002/muted?communityName=${params.community}`)
  );
  const handelUnMute = async (obj) => {
    try {
      const res = await axios.delete(`http://localhost:3002/muted/${obj.id}`)
      refetch();
    } catch (ex) {

    }
  };
  if (isLoading) {
    return <>Loading ...</>;
  }
  const mutedUsers = data?.data;
  return (
    <div className='w-full'>
      <MuteUserModal isOpen={isOpen} closeModal={() => setOpen(false)} />
      <div className='mt-9'>
        <div className='mb-4 flex justify-end'>
          <button onClick={() => setOpen(true)} className=' rounded-full bg-blue-500 px-4 py-2 text-white'>Mute User</button>
        </div>
        <div className=' rounded-lg border p-4 w-full'>
          {
            mutedUsers.length == 0 && <div className='flex my-14 text-gray-600 flex-col gap-4 items-center justify-center'>
              <MessageCircleX size={45} />
              No muted users in r/{params.community}
            </div>
          }
          {
            mutedUsers?.map((e, idx) => <div className='flex items-center justify-between gap-4' key={idx}>
              <Link target='__blank' to={`/user/${e.userId}`} className='flex rounded-lg items-center gap-2 hover:bg-gray-300 px-4 py-2'>
                <img className=' aspect-square w-10 rounded-md' src={e.image} />
                <div className='flex flex-col '>
                  <span>{e.userName}</span>
                  <span className='text-gray-500 text-sm'>{e.period} days</span>
                </div>
              </Link>

              <div>
                <button onClick={() => handelUnMute(e)} className=' text-blue-500 '>Unmute</button>
              </div>

            </div>)
          }
        </div>
      </div>
    </div>
  )
}
