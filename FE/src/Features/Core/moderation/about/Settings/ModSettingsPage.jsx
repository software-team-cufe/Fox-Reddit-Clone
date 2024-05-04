import React, { useState } from 'react'

import FirstSection from './Components/FirstSection';
import SecondSection from './Components/SecondSection';
import { userAxios } from '../../../../../Utils/UserAxios';
export default function ModSettingsPage() {
    const [obj, setObj] = useState({});
    const submitData = async () => {
        const data = Object.fromEntries(new FormData(document.getElementById("frm-data")).entries());
        console.log(data);
        const res = await userAxios.post("", data);
    };
    const handelChange = () => {
        const data = Object.fromEntries(new FormData(document.getElementById("frm-data")).entries());
        setObj(data);
    };
    return (
        <div className='w-full space-y-5 h-full'>
            <div className='flex items-center justify-between'>
                <h2 className='mb-9  font-bold text-xl'> Content controls</h2>
                <button onClick={submitData} className=' rounded-full bg-blue-500 px-4 py-2 text-white'>
                    Save Changes
                </button>
            </div>
            <form id='frm-data' onChange={handelChange} className='w-[1500px] flex flex-col gap-8' >

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
