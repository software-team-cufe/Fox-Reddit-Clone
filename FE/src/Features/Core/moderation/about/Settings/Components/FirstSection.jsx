import React from 'react'

import ToggleButton from "@/GeneralElements/ToggleButton/ToggleButton";
import TextBox from '../../../../../../GeneralElements/TextBox/TextBox';
export default function FirstSection({ obj }) {
    obj = obj ?? {};

    return (
        <div>
            <h2 className=' font-bold text-xl'>
                Post Requirements
            </h2>
            <hr className='mb-5' />
            <div className='w-full space-y-5'>
                <div className='grid grid-cols-5 w-full truncate items-center justify-between'>
                    <div className='flex col-span-4 flex-col gap-1'>
                        <h2 className='font-semibold break-words text-lg'>
                            Provide members with posting guidelines
                        </h2>
                        <p className=' text-wrap text-sm text-gray-500'>
                            Posting guidelines let people who are new to your community or posting for the first time know what your expectations are. If you have specific flair or formatting requirements for posts, this is the place to make it clear what you’d like.
                        </p>
                    </div>
                    <ToggleButton initial={!!obj.membersWithGuidelines} name="membersWithGuidelines" />
                </div>
                {
                    obj.membersWithGuidelines && <TextBox name='' area={true} />
                }
                <div className='grid grid-cols-5 w-full truncate items-center justify-between'>
                    <div className='flex col-span-4 flex-col gap-1'>
                        <h2 className='font-semibold break-words text-lg'>
                            Require words in the post title
                        </h2>
                        <p className=' text-wrap text-sm text-gray-500'>
                            Posts without these words in the title can’t be submitted. (Choose up to 15 words, 40 characters each.)
                        </p>
                    </div>
                    <ToggleButton initial={!!obj.requirePostTitles} name="requirePostTitles" />
                </div>
                {
                    obj.requirePostTitles && <TextBox name='' area={true} />
                }
                <div className='grid grid-cols-5 w-full truncate items-center justify-between'>
                    <div className='flex col-span-4 flex-col gap-1'>
                        <h2 className='font-semibold break-words text-lg'>
                            Ban words from the post title
                        </h2>
                        <p className=' text-wrap text-sm text-gray-500'>
                            Posts with these words in the title can’t be submitted. (Choose up to 15 words, 40 characters each.)
                        </p>
                    </div>
                    <ToggleButton initial={!!obj.banWordsFromPostTitle} name="banWordsFromPostTitle" />
                </div>
                {
                    obj.banWordsFromPostTitle && <TextBox name='' area={true} />
                }
                {
                    obj.textBody == 'requiredForTextOnlyPosts' && <>
                        <div className='grid grid-cols-5 w-full truncate items-center justify-between'>
                            <div className='flex col-span-4 flex-col gap-1'>
                                <h2 className='font-semibold break-words text-lg'>
                                    Require words in the post body
                                </h2>
                                <p className=' text-wrap text-sm text-gray-500'>
                                    Posts without these words in the body can’t be submitted. (Choose up to 15 words of 40 characters each)
                                </p>
                            </div>
                            <ToggleButton initial={!!obj.requirePostsInPostBody} name="requirePostsInPostBody" />
                        </div>
                        {
                            obj.requirePostsInPostBody && <TextBox name='' area={true} />
                        }
                    </>
                }
                {
                    obj.textBody != "notAllowed" && <>
                        <div className='grid grid-cols-5 w-full truncate items-center justify-between'>
                            <div className='flex col-span-4 flex-col gap-1'>
                                <h2 className='font-semibold break-words text-lg'>
                                    Ban words from the post body
                                </h2>
                                <p className=' text-wrap text-sm text-gray-500'>
                                    Posts with these words in the body can’t be submitted. (Choose up to 15 words, 40 characters each.)
                                </p>
                            </div>
                            <ToggleButton initial={!!obj.banWordsFromPostBody} name="banWordsFromPostBody" />
                        </div>
                        {
                            obj.banWordsFromPostBody && <TextBox name='' area={true} />
                        }
                    </>
                }
                <div className='grid grid-cols-5 w-full truncate items-center justify-between'>
                    <div className='flex col-span-4 flex-col gap-1'>
                        <h2 className='font-semibold break-words text-lg'>
                            Require or ban links from specific domains
                        </h2>
                        <p className=' text-wrap text-sm text-gray-500'>
                            Posts with links that don’t fit your requirements can’t be submitted.
                        </p>
                    </div>
                    <ToggleButton initial={!!obj.banLinksFromDomains} name="banLinksFromDomains" />
                </div>
                {
                    obj.banLinksFromDomains && <TextBox name='' area={true} />
                }
                <div className='grid grid-cols-5 w-full truncate items-center justify-between'>
                    <div className='flex col-span-4 flex-col gap-1'>
                        <h2 className='font-semibold break-words text-lg'>
                            Restrict how often the same link can be posted
                        </h2>
                        <p className=' text-wrap text-sm text-gray-500'>
                            Posts that have a link that has already been posted to your community cannot be submitted within the number of days you select.
                        </p>
                    </div>
                    <ToggleButton initial={!!obj.restrictTheSameLinkPosted} name="restrictTheSameLinkPosted" />
                </div>
                {
                    obj.restrictTheSameLinkPosted && <TextBox name='' area={true} />
                }
            </div>

        </div>
    )
}
