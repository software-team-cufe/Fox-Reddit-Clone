import React, { useState } from 'react'
import { MessageCircleX } from 'lucide-react'
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import MuteUserModal from '../Components/MuteUserModal';
import { userAxios } from '../../../../../../Utils/UserAxios';
import { toast } from 'react-toastify';
export default function MutedUsers() {
  const [isOpen, setOpen] = useState(false);
  const params = useParams();

  const { data, isLoading, isError, refetch } = useQuery(
    "get-mocked-MutedUsers-users",
    // () => axios.get(`http://localhost:3002/muted?communityName=${params.community}`),
    () => userAxios.get(`/${params.community}/about/muted`),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
  const handelUnMute = async (obj) => {
    console.log(obj);
    const id = toast.loading("Please wait");
    try {
      const res = await axios.delete(`http://localhost:3002/muted?_id=${obj._id}`)
      // const res2 = await userAxios.post(`/${params.community}/api/unmute/${obj.username}`)
      refetch();
    } catch (ex) {

    }
    toast.dismiss(id);
  };
  if (isLoading) {
    return <>Loading ...</>;
  }
  // const mutedUsers = data?.data?.users ?? [];
  const mutedUsers = data?.data.users ?? [];
  return (
    <div className='w-full'>
      <MuteUserModal isOpen={isOpen} closeModal={() => setOpen(false)} />
      <div className='mt-9'>
        <div className='mb-4 flex justify-end'>
          <button id="mute-btntntn" onClick={() => setOpen(true)} className=' rounded-full bg-blue-500 px-4 py-2 text-white'>Mute User</button>
        </div>
        <div className=' rounded-lg border p-4 w-full'>
          {
            mutedUsers?.length == 0 && <div className='flex my-14 text-gray-600 flex-col gap-4 items-center justify-center'>
              <MessageCircleX size={45} />
              No muted users in r/{params.community}
            </div>
          }
          {
            mutedUsers?.map((e, idx) => <div className='flex items-center justify-between gap-4' key={idx}>
              <Link target='__blank' to={`/user/${e.userId}`} className='flex rounded-lg items-center gap-2 hover:bg-gray-300 px-4 py-2'>
                <img className=' aspect-square w-10 rounded-md' src={e.image ?? "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png"} />
                <div className='flex flex-col '>
                  <span>{e.username}</span>
                  <span>{e.muteInfo?.reason}</span>
                </div>
              </Link>

              <div>
                <button id="unmuteeeee" onClick={() => handelUnMute(e)} className=' text-blue-500 '>Unmute</button>
              </div>

            </div>)
          }
        </div>
      </div>
    </div>
  )
}
