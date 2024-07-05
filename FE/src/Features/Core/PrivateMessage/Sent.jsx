import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAxios } from "@/Utils/UserAxios";

function Sent({ DiffT }) {
    const [MessSent, setMessSent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [crash, setCrash] = useState(false);
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
            const filteredMessages = await res.data.messages.filter(message => !message.isDeleted);
            setMessSent(filteredMessages);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setCrash(true);
            setLoading(false);
        }
    }


    if (loading) {
        return (
            <img src={'/logo.png'} className="h-20 w-20 mt-48 mx-auto animate-ping" alt="Logo" />

        )
    }

    if (crash) {
        return (
            <div>
                <img src={'/snooNotFound.jpg'} className="h-96 w-96 mt-20 mx-auto" alt="Logo" />
                <p className="text-gray-600 mx-auto font-semibold">Failed to load page</p>
            </div>
        )
    }

    const GoToUserPage = (user) => {
        navigator(`/viewer/${user}/overview`);
    }

    return (
        <div className=' w-full flex  bg-[#0f080416] h-[max(100%,38rem)]'>
            <div className=' w-full  sm:mx-40 mt-5'>
                {MessSent.length === 0 && <div className='bg-white p-4 rounded sm:w-2/3 w-full '
                >there doesn't seem to be anything here</div>}
                {MessSent.map((mess, i) => {
                    return (
                        <div key={i} className={`p-4 rounded  ${i % 2 === 0 ? "bg-white" : "bg-[#fff6f1]"}`}>
                            <div className='font-bold text-lg '>{mess.subject}:</div>
                            <div className='felx-row my-2 flex ml-10'>
                                <p className='text-gray-600 mr-2 text-sm' >to</p>
                                <p onClick={() => {
                                    GoToUserPage(mess.
                                        toID.username)
                                }}
                                    className='text-blue-600 text-sm hover:underline
                             hover:cursor-pointer mr-2'>{mess.
                                        toID.username}</p>
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