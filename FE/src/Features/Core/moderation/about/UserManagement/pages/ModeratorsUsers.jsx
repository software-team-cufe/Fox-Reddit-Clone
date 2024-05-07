import React, { useState } from 'react'
import { Info, MessageCircleX } from 'lucide-react'
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import MuteUserModal from '../Components/MuteUserModal';
import { userAxios } from '../../../../../../Utils/UserAxios';
import { toast } from 'react-toastify';
import AddModeratorModal from '../Components/AddModeratorModal';

export default function ModeratorsUsers() {
  const [isOpen, setOpen] = useState({ open: false, values: null });
  const params = useParams();

  const { data, isLoading, isError, refetch } = useQuery(
    "get-mocked-Moderators-users",
    () => axios.get(`http://localhost:3002/moderators`),
    // () => userAxios.get(`/${params.community}/about/moderators`),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
  const handelRemove = async (obj) => {
    try {
      const res = await axios.delete(`http://localhost:3002/moderators/${obj.id}`)
      refetch();
    } catch (ex) {

    }
  };
  if (isLoading) {
    return <>Loading ...</>;
  }
  const moderators = data?.data ?? [];
  // const moderators = data?.data?.users ?? [];
  return (
    <div className='w-full'>
      <AddModeratorModal isOpen={isOpen.open} initial={isOpen.values} closeModal={() => setOpen({ open: false, values: null })} />
      <div className='mt-9'>
        <div className='mb-4 flex justify-end'>
          <button onClick={() => setOpen({ open: true, values: null })} className=' rounded-full bg-blue-500 px-4 py-2 text-white'>
            Add moderator
          </button>
        </div>
        <div className=' rounded-lg border p-4 w-full'>
          {
            moderators?.length == 0 && <div className='flex my-14 text-gray-600 flex-col gap-4 items-center justify-center'>
              <Info size={45} />
              No moderators users in r/{params.community}
            </div>
          }
          {
            moderators?.map((e, idx) => <div className='flex items-center justify-between gap-4' key={idx}>
              <Link target='__blank' to={`/user/${e.userId}`} className='flex rounded-lg items-center gap-2 hover:bg-gray-300 px-4 py-2'>
                <img className=' aspect-square w-10 rounded-md' src={e.image ?? "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png"} />
                <div className='flex flex-col '>
                  <span>{e.username}</span>
                  <span>{e.muteInfo?.reason}</span>
                </div>
              </Link>

              <div className='flex items-center gap-3'>
                <button onClick={() => setOpen({ open: true, values: e })} className=' text-blue-500 '>Edit</button>
                <button onClick={() => handelRemove(e)} className=' text-blue-500 '>Remove</button>
              </div>

            </div>)
          }
        </div>
      </div>
    </div>
  )
}
