import React from 'react'
import UserMessages from './UserMessages'
import { appFirestore } from '../../../../Utils/firebase'
import { collection, getDocs, query, or, where } from '@firebase/firestore'
import { userStore } from '../../../../hooks/UserRedux/UserStore'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom'
import { MessageCirclePlus } from 'lucide-react'

async function getChats(username) {
    return new Promise(async (res, rej) => {
        const colRef = collection(appFirestore, 'chat');
        const docRef = await getDocs(query(colRef, or(
            where('sender', '==', username),
            where('reciever', '==', username),
        )));

        return res(docRef.docs);
    })
}
export default function SideBar() {
    const user = userStore.getState().user.user;

    const { data, isLoading, isError } = useQuery('get-user-chats',
        () => getChats(user.username), {
        retry: 0,
        refetchOnWindowFocus: false,
    })

    return (
        <div className="flex flex-row w-[150px] md:w-[300px] flex-shrink-0 bg-gray-100 ">
            <div className="flex flex-col w-full h-full p-5 ">
                <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-400 font-semibold uppercase">
                        Threads
                    </div>
                    <Link to={`/chat/add`}>
                        <MessageCirclePlus />
                    </Link>
                </div>
                <div className="h-full overflow-hidden relative pt-2">
                    <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
                        {
                            isLoading ? <p>Loading...</p> : <>
                                {
                                    data?.map((e, idx) => <UserMessages chatId={e.id} key={idx} chat={e.data()} />)
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
