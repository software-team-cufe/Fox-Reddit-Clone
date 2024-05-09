/*import React, { useState } from 'react'
import TextBox from '../../../GeneralElements/TextBox/TextBox'
import Button from '../../../GeneralElements/Button/Button'
import { userAxios } from '../../../Utils/UserAxios';
import { userStore } from '../../../hooks/UserRedux/UserStore';
import { collection, getDocs, query, where, and, or, setDoc, doc } from '@firebase/firestore';
import { appFirestore } from '../../../Utils/firebase';
import { toast } from 'react-toastify';

export default function AddChat() {
    const user = userStore.getState().user.user;
    const [result, setResult] = useState([]);
    const getData = async () => {
        const val = document.getElementById('txt-searchhh').value;
        if (!(val != null && val != "")) return;
        try {
            const res = await userAxios.get(`/r/search/?q=${val}&type=user`);
            setResult(res.data.users.map((e) => e.username));
        } catch (ex) { }
    };
    const initChat = async (username) => {
        const id = toast.loading("Please wait");
        try {
            const colRef = collection(appFirestore, 'chat');
            const docRef = await getDocs(query(colRef, or(
                and(where('sender', '==', user.username), where('reciever', '==', username),),
                and(where('sender', '==', username), where('reciever', '==', user.username),),
            )));
            if (docRef.docs.length == 0) {
                const newDocRef = doc(colRef);
                const res = await setDoc(newDocRef, {
                    "sender": user.username,
                    "reciever": username,
                    "muted": false,
                    "hidden": false,
                });
                window.location.href = `/chat/${newDocRef.id}`;
            } else { 
                window.location.href = `/chat/${docRef.docs[0].id}`;
            }
        } catch (ex) {

        }
        toast.dismiss(id);
    };
    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className='flex items-end gap-1 w-[600px]'>
                <TextBox id={'txt-searchhh'} onChanged={() => getData()} className='w-full h-full' placeholder='Username' />
                <Button className='mt-4 h-full'>Add</Button>
            </div>
            <div className='mt-3 w-[600px]'>
                {
                    result.map((e, idx) =>
                        <button onClick={() => initChat(e)} className='w-full rounded-md hover:bg-gray-200 flex justify-center py-3' key={idx}>
                            <span>{e}</span>
                        </button>)
                }
            </div>
        </div>
    )
}
*/