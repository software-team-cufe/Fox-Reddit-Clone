import React from 'react'
import TypingArea from './TypingArea'
import ChooseCommunity from './ChooseCommunity'

function CreatePostPage() {
    return (
        <div className='bg-gray-300 fixed w-full h-dvh'>
            <div className='lg:w-1/2 ml-60  '>
                <p className='text-xl mt-10'>Create a post</p>
                <ChooseCommunity />
                <hr className='my-4' />
                <TypingArea className="h-96" />
            </div>
            <div className='h-96 w-full bg-black'></div>
        </div>
    )
}

export default CreatePostPage