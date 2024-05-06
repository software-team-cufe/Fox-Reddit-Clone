import React, { useState } from 'react'

import FirstSection from './Components/FirstSection';
import SecondSection from './Components/SecondSection';
import { userAxios } from '../../../../../Utils/UserAxios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
export default function ModSettingsPage() {
    const [obj, setObj] = useState({});
    const params = useParams();
    const submitData = async () => {
        let data = Object.fromEntries(new FormData(document.getElementById("frm-data")).entries());
        const obj = {};
        for (const x of Object.keys(data)) {
            obj[x] = data[x] == 'on' ? true : data[x];
        }
        console.log(obj);
        const res = await userAxios.patch(`/${params.community}/api/edit_post_settings`, obj);
    };
    const handelChange = () => {
        const data = Object.fromEntries(new FormData(document.getElementById("frm-data")).entries());
        setObj(data);
    };
    const { data, isLoading, isError } = useQuery(`get-comm-settings ${params.community}`,
        () => userAxios.get(`/${params.community}/api/post_settings`).then(data => setObj(data.data.rules)), {
        refetchOnWindowFocus: false,
        retry: 0,
    });
    if (isLoading) return <>Loading....</>;
    const initialData = data?.data;
    return (
        <div className='w-full space-y-5 h-full'>
            <div className='flex items-center justify-between px-7 w-[90%]'>
                <h2 className='mb-9  font-bold text-xl'> Content controls</h2>
                <button onClick={submitData} className=' rounded-full bg-blue-500 px-4 py-2 text-white'>
                    Save Changes
                </button>
            </div>
            <form id='frm-data' onChange={handelChange} className='w-[1000px] flex flex-col gap-8' >

                <FirstSection obj={obj} />
                <SecondSection obj={obj} />
            </form>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}
