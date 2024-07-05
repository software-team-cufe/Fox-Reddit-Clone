import React, { useState } from 'react'

import ToggleButton from "@/GeneralElements/ToggleButton/ToggleButton";
import TextBox from '../../../../../../GeneralElements/TextBox/TextBox';


export default function SecondSection({ obj, initial }) {
    obj = obj ?? {};
    console.log(obj);
    return (
        <div>
            <h2 className=' font-bold text-xl'>
                Advanced post requirements
            </h2>
            <hr className='mb-5' />
            <div className='w-full space-y-5'>
                <div >
                    <div className='flex mb-3 col-span-4 flex-col gap-1'>
                        <h2 className='font-semibold break-words text-lg'>
                            Post text body
                        </h2>
                        <p className=' text-wrap text-sm text-gray-500'>
                            Allow posts to have body text
                        </p>
                    </div>
                    <div className='flex  gap-2 items-center'>
                        <input defaultChecked={obj.textBody == "optionalForAllPosts"} name='textBody' value={'optionalForAllPosts'} className=' ' type='radio' />
                        <label className=' text-gray-600'>Text body is optional for all post types</label>
                    </div>
                    <div className='flex  gap-2 items-center'>
                        <input defaultChecked={obj.textBody == "requiredForTextOnlyPosts"} name='textBody' value={'requiredForTextOnlyPosts'} className=' ' type='radio' />
                        <label className=' text-gray-600'>Text body is required for text-only posts</label>
                    </div>
                    <div className='flex  gap-2 items-center'>
                        <input defaultChecked={obj.textBody == "notAllowed"} name='textBody' value={'notAllowed'} className=' ' type='radio' />
                        <label className=' text-gray-600'>Text body is not allowed</label>
                    </div>
                </div>
                <div className='grid grid-cols-5 w-full truncate items-center justify-between'>
                    <div className='flex col-span-4 flex-col gap-1'>
                        <h2 className='font-semibold break-words text-lg'>
                            Require post flair
                        </h2>
                        <p className=' text-wrap text-sm text-gray-500'>
                            Posts without flair can’t be submitted. (Note that this requirement is ignored if your community hasn’t set up flair yet.)
                        </p>
                    </div>
                    <ToggleButton initial={!!obj.postFlair} name="postFlair" />
                </div>
                {
                    obj.postFlair && <TextBox name='' area={true} />
                }
                <div className='grid grid-cols-5 w-full truncate items-center justify-between'>
                    <div className='flex col-span-4 flex-col gap-1'>
                        <h2 className='font-semibold break-words text-lg'>
                            Use title text RegEx requirements
                        </h2>
                        <p className=' text-wrap text-sm text-gray-500'>
                            Use regular expressions for more advanced title matching. These use the Python RegEx syntax
                        </p>
                    </div>
                    <ToggleButton initial={!!obj.useRegExInTitles} name="useRegExInTitles" />
                </div>
                {
                    obj.useRegExInTitles && <TextBox name='' area={true} />
                }
                <div className={`grid grid-cols-5 w-full truncate items-center justify-between ${obj.textBody == 'notAllowed' ? " text-gray-300" : ""}`}>
                    <div className='flex col-span-4 flex-col gap-1'>
                        <h2 className='font-semibold break-words text-lg'>
                            Use body text RegEx requirements
                        </h2>
                        <p className=' text-inherit text-wrap text-sm text-gray-500'>
                            Use regular expressions for more advanced body text matching. These use the Python RegEx syntax
                        </p>
                    </div>
                    <ToggleButton disabled={obj.textBody == 'notAllowed'} initial={!!obj.useBodyTextReg} name="useBodyTextReg" />
                </div>
                {
                    obj.useBodyTextReg && <TextBox name='' area={true} />
                }

            </div>

        </div>
    )
}
