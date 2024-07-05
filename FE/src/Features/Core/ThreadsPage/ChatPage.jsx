import React, { useEffect, useState } from 'react'
import SendMessageBar from './Components/SendMessageBar'

import Header from './Components/Header'
import Message from './Components/Message'
import { useQuery } from 'react-query';
import { userStore } from '../../../hooks/UserRedux/UserStore';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useParams } from 'react-router-dom';
import { appFirestore } from '../../../Utils/firebase';


function useMessages(chatId) {
    const [chat, setChat] = useState([]);
    useEffect(() => {
        const colRef = collection(appFirestore, `chat/${chatId}/chat`);
        onSnapshot(query(colRef, orderBy('createdAt', 'asc')), (snap) => {
            const messages = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setChat(messages);
        });
    }, []);
    return chat;
}

async function getChats(docId) {
    return new Promise(async (res, rej) => {
        const colRef = collection(appFirestore, 'chat');
        const docRef = await getDoc(doc(colRef, docId));

        return res(docRef.data());
    })
}


export default function ChatPage() {

    const user = userStore.getState().user.user;
    const params = useParams();
    const { data, isLoading, isError } = useQuery(`get-user-chat-${params.id}`,
        () => getChats(params.id), {
        retry: 0,
        refetchOnWindowFocus: false,
    })
    const messages = useMessages(params.id);

    return (
        <div className="flex flex-col h-full w-full bg-white ">
            <Header username={(data?.sender == user.username ? data?.reciever : data?.sender) ?? "n"} />
            <div className="h-full overflow-hidden px-4 py-6">
                <div className="h-full overflow-y-auto">
                    <div className="grid grid-cols-12 gap-y-2">
                        {
                            messages?.map((e, idx) =>
                                <Message key={idx} message={e.message}
                                    createdAt={e.createdAt} userId={e.usernameFrom}
                                    isMe={e.usernameFrom == user.username} />
                            )
                        }
                    </div>
                </div>
            </div>
            <SendMessageBar />
        </div>

    )
}
