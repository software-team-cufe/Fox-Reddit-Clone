import React from 'react'
import { postandCommentItems } from './items'
import ToggleButton from '../../../../../GeneralElements/ToggleButton/ToggleButton'

import TextBox from '../../../../../GeneralElements/TextBox/TextBox'


export default function EditPage() {
    const data = {

    };
    const submitData = async () => {
        const data = Object.fromEntries(new FormData(document.getElementById("frm-dataa")).entries());
        console.log(data);
        // const res = await userAxios.post("", data);
    };
    return (
        <div className='w-full'>
            <div className='flex items-center justify-between'>
                <h2 className='my-4 mx-8 text-xl font-bold'>Post and Comment settings</h2>
                <button onClick={submitData} className=' rounded-full w-fit bg-blue-500 px-4 py-2 text-white'>
                    Save Changes
                </button>
            </div>
            <form id='frm-dataa'>
                {
                    postandCommentItems.map((m, idx) => <div key={idx}>
                        <p className=' text-gray-400 mt-8 text-sm uppercase'>{m.sectionName}</p>
                        <hr className='mb-4' />
                        <div className=' space-y-4'>
                            {
                                m.items.map((e, idxx) => {

                                    return (
                                        <div key={idxx} className='grid grid-cols-5 w-full truncate items-center justify-between'>
                                            <div className='flex col-span-4 flex-col gap-1'>
                                                <h2 className='font-semibold break-words '>
                                                    {e.title}
                                                </h2>
                                                <p className=' text-wrap text-sm text-gray-500'>
                                                    {e.subTitle}
                                                </p>
                                            </div>
                                            {
                                                e.type == 'switch' && <ToggleButton initial={data[e.name]} name={e.name} />
                                            }
                                            {
                                                e.type == 'list' && <>
                                                    <select defaultValue={data[e.name]} className='w-fit' name={e.name}>
                                                        {
                                                            e.items?.map((k, idk) => <option key={idk}>{k}</option>)
                                                        }
                                                    </select>
                                                </>
                                            }
                                            {
                                                e.type == 'number' && <TextBox initialValue={data[e.name] ?? 0} type='number' name={e.name} className='w-fit' />
                                            }

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>)
                }
            </form>
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
