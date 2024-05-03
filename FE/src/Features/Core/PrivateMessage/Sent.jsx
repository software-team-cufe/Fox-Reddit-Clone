import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAxios } from "@/Utils/UserAxios";

function Sent({ DiffT }) {
    const [MessSent, setMessSent] = useState([]);
    const navigator = useNavigate();
    useEffect(() => {
        //API
        fetchMessages();
        return () => {
            setMessSent([]);
        }
    }, [])

    const fetchMessages = async () => {
        try {
            const res = await userAxios.get('message/sent/');
            console.log(res.data);
            for (const mess of res.data.messages) {
                if (mess.isDeleted === false) {
                    let message = {
                        subject: mess.subject, text: mess.text,
                        createdAt: new Date(mess.createdAt), username: mess.toID.username
                    }
                    setMessSent([...MessSent, message]);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const GoToUserPage = (user) => {
        navigator(`/viewer/${user}/overview`);
    }

    return (
        <div className=' w-full flex  bg-[#0f080416] h-[max(100%,38rem)]'>
            <div className=' w-full  sm:mx-40 mt-5'>
                {MessSent.map((mess, i) => {
                    return (
                        <div key={i} className={`p-4 rounded  ${i % 2 === 0 ? "bg-white" : "bg-[#fff6f1]"}`}>
                            <div className='font-bold text-lg '>{mess.subject}:</div>
                            <div className='felx-row my-2 flex ml-10'>
                                <p className='text-gray-600 mr-2 text-sm' >to</p>
                                <p onClick={() => { GoToUserPage(mess.username) }}
                                    className='text-blue-600 text-sm hover:underline
                             hover:cursor-pointer mr-2'>{mess.username}</p>
                                <p className='text-gray-600 text-sm mr-2'>{DiffT(mess.createdAt)}</p>
                            </div>
                            <div className='ml-10' dangerouslySetInnerHTML={{ __html: mess.text }}></div>
                            <hr className='mt-4' />
                        </div>)
                })}
            </div>
        </div>
    )
}

export default Sent