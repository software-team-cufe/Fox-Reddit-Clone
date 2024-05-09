export default function PostsList(){
    
    return(
        <div className='flex justify-between'>
            <div className='flex flex-col'>
                <button className='bg-green-500 text-white rounded px-4 py-2 mb-2'>Upvote</button>
                <button className='bg-red-500 text-white rounded px-4 py-2'>Downvote</button>
            </div>
            <div className='flex gap-4'>
                <button className='bg-blue-500 text-white rounded px-4 py-2'>Edit Post</button>
                <button className='bg-orange-500 text-white rounded px-4 py-2'>Delete Post</button>
                <button className='bg-purple-500 text-white rounded px-4 py-2'>Submit Post Now</button>
            </div>
        </div>
    );

}