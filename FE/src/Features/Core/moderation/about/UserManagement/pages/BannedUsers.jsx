import React, { useState } from 'react'
import { Gavel } from 'lucide-react'
import { Link, useParams } from 'react-router-dom';
import BanUserModal from '../Components/BanUserModal';
import { useQuery } from 'react-query';
import axios from 'axios';
import { userAxios } from '../../../../../../Utils/UserAxios';
export default function BannedUsers() {

    const params = useParams();
    const [isOpen, setOpen] = useState({ oepn: false, values: null });
    const { data, isLoading, isError } = useQuery(
        "get-mocked-banned-users",
        // () => axios.get(`http://localhost:3002/banned?communityName=${params.community}`),
        () => userAxios.get(`/${params.community}/about/banned`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
        }
    );
    if (isLoading) {
        return <>Loading ...</>;
    }
    // const bannedUsers = data?.data;
    const bannedUsers = data?.data?.users ?? [];

    return (
        <div className='w-full'>
            <BanUserModal values={isOpen.values} isOpen={isOpen.oepn} closeModal={() => setOpen({ oepn: false, values: null })} />

            <div className='mt-9'>
                <div className='mb-4 flex justify-between'>
                    <h2 className=' text-lg font-semibold'>banned users</h2>
                    <button onClick={() => setOpen({ oepn: true, values: null })} className=' rounded-full bg-blue-500 px-4 py-2 text-white'>Ban User</button>
                </div>
                <div className=' rounded-lg border p-4 w-full'>
                    {
                        bannedUsers.length == 0 && <div className='flex my-14 text-gray-600 flex-col gap-4 items-center justify-center'>
                            <Gavel size={45} />
                            No banned users in r/{params.community}
                        </div>
                    }
                    {
                        bannedUsers.map((e, idx) => <div className='flex items-center justify-between gap-4' key={idx}>
                            <Link target='__blank' to={`/user/${e.userId}`} className='flex rounded-lg items-center gap-2 hover:bg-gray-300 px-4 py-2'>
                                <img className=' aspect-square w-10 rounded-md' src={e.image ?? "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png"} />
                                <div className='flex flex-col '>
                                    <span>{e.username}</span>
                                    <span className='text-gray-500 text-sm'>{e.banInfo?.period} days</span>
                                </div>
                            </Link>

                            <div>
                                <button onClick={() => setOpen({ oepn: true, values: e })} className=' text-blue-500 '>Edit</button>
                            </div>

                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}
