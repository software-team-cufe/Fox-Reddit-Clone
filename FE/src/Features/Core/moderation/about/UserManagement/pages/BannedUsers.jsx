import React, { useState } from 'react'
import UserManagementHeader from '../Components/Header'
import { Gavel } from 'lucide-react'
import { useParams } from 'react-router-dom';
import BanUserModal from '../Components/BanUserModal';
export default function BannedUsers() {
    const bannedUsers = [];
    const params = useParams();
    const [isOpen, setOpen] = useState(false);
    return (
        <div className='w-full'>
            <BanUserModal isOpen={isOpen} closeModal={() => setOpen(false)} />
            
            <div className='mt-9'>
                <div className='mb-4 flex justify-end'>
                    <button onClick={()=> setOpen(true)} className=' rounded-full bg-blue-500 px-4 py-2 text-white'>Ban User</button>
                </div>
                <div className=' rounded-lg border p-4 w-full'>
                    {
                        bannedUsers.length == 0 && <div className='flex my-14 text-gray-600 flex-col gap-4 items-center justify-center'>
                            <Gavel size={45} />
                            No banned users in r/{params.community}
                        </div>
                    }
                    {
                        
                    }
                </div>
            </div>
        </div>
    )
}
