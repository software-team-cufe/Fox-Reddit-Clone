import React from 'react'
import { postandCommentItems } from './items'
import ToggleButton from '../../../../../GeneralElements/ToggleButton/ToggleButton'

import TextBox from '../../../../../GeneralElements/TextBox/TextBox'
import { useQuery } from 'react-query';
import { userAxios } from '../../../../../Utils/UserAxios';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
const schema = {
    "postType": "Any",
    "activePosts": true,
    "spoilerTag": true,
    "allowImageUpload": true,
    "multiplePosts": true,
    "allowPolls": true,
    "posts": "low",
    "links": "low",
    "comments": "low",
    "suggestedSort": "none",
    "collapseAndDeleteRemovedComments": false,
    "allowCommentsWithGifs": false,
    "allowCommentsWithCollectibleExpressions": false,
    "allowCommentsWithUploadedImages": false,
    "allowCommentsWithUploadedGIFs": false
};
export default function EditPage() {
    const params = useParams();
    const submitData = async () => {
        const data = Object.fromEntries(new FormData(document.getElementById("frm-dataa")).entries());
        console.log(data);
        const id = toast.loading("Please wait");
        const obj = {};
        for (const x of Object.keys(schema)) {
            obj[x] = data[x] == 'on' ? true : data[x] == null ? false : data[x];
      
        }
        console.log(obj);
        try {
            const res = await userAxios.patch(`/${params.community}/api/edit_post_settings`, obj);
        } catch (ex) { }
        toast.dismiss(id)
    };
    const { data, isLoading, isError } = useQuery(`get-comm-edit ${params.community}`,
        () => userAxios.get(`/${params.community}/api/post_settings`), {
        refetchOnWindowFocus: false,
        retry: 0,
    });
    if (isLoading) {
        return <>Loading ...</>;
    }
    const fetched = data?.data?.rules ?? {};
    console.log(fetched);
    return (
        <div className='w-full'>
            <div className='flex items-center justify-between'>
                <h2 className='my-4 mx-8 text-xl font-bold'>Post and Comment settings</h2>
                <button id="save-changes-edit-page" onClick={submitData} className=' rounded-full w-fit bg-blue-500 px-4 py-2 text-white'>
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
                                                e.type == 'switch' && <ToggleButton initial={fetched[e.name]} name={e.name} />
                                            }
                                            {
                                                e.type == 'list' && <>
                                                    <select defaultValue={fetched[e.name]} className='w-fit' name={e.name}>
                                                        {
                                                            e.items?.map((k, idk) => <option key={idk}>{k}</option>)
                                                        }
                                                    </select>
                                                </>
                                            }
                                            {
                                                e.type == 'number' && <TextBox initialValue={fetched[e.name] ?? 0} type='number' name={e.name} className='w-fit' />
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
