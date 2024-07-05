import React, { useState } from 'react'
import { Info } from 'lucide-react'
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import ApproveUserModal from '../Components/ApproveUserModal';
export default function ApprovedUsers() {
  const [isOpen, setOpen] = useState(false);
  const params = useParams();

  const { data, isLoading, isError, refetch } = useQuery(
    "get-mocked-ApprovedUsers-users",
    () => axios.get(`http://localhost:3002/approved?communityName=${params.community}`),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
  const handelRemove = async (obj) => {
    try {
      const res = await axios.delete(`http://localhost:3002/approved/${obj.id}`)
      refetch();
    } catch (ex) { }
  };
  if (isLoading) {
    return <>Loading ...</>;
  }
  const approvedUsers = data?.data;
  return (
    <div className='w-full'>
      <ApproveUserModal isOpen={isOpen} closeModal={() => setOpen(false)} />
      <div className='mt-9'>
        <div className='mb-4 flex justify-end'>
          <button id="approve-user" onClick={() => setOpen(true)} className=' rounded-full bg-blue-500 px-4 py-2 text-white'>Approve User</button>
        </div>
        <div className=' rounded-lg border p-4 w-full'>
          {
            approvedUsers.length == 0 && <div className='flex my-14 text-gray-600 flex-col gap-4 items-center justify-center'>
              <Info size={45} />
              No approved users in r/{params.community}
            </div>
          }
          {
            approvedUsers?.map((e, idx) => <div className='flex items-center justify-between gap-4' key={idx}>
              <Link target='__blank' to={`/user/${e.username}`} className='flex rounded-lg items-center gap-2 hover:bg-gray-300 px-4 py-2'>
                <img className=' aspect-square w-10 rounded-md' src={e.image} />
                <div className='flex flex-col '>
                  <span>{e.username}</span>
                  <span className='text-gray-500 text-sm'>{e.period} days</span>
                </div>
              </Link>

              <div>
                <button id="remove-btnn" onClick={() => handelRemove(e)} className=' text-blue-500 '>Remove</button>
              </div>

            </div>)
          }
        </div>
      </div>
    </div>
  )
}
