import ProfileSnoo from './images/mySnoo.png';
import EmptySnoo from './images/confusedSnoo.png';
import ProfileMenuButton from './profilemenubutton';

function ProfileUpvoted ({userName}) {
    return (
        <div className="flex-initial w-1/2 min-h-screen mx-14 my-4">
        <div className='relative flex mb-8'>
            <img src={ProfileSnoo} className='p-1 w-20 h-24 rounded-full z-0' alt=""></img>
            <span className='text-black font-bold text-2xl absolute top-10 left-24'>{userName}</span>
            <span className='text-gray-500 font-semibold absolute top-3/4 left-24'>u/{userName}</span>
        </div>
        <ul className='flex gap-3 overflow-x-auto mb-14'>
        <li><ProfileMenuButton text="overview" path='overview'/></li>
            <li><ProfileMenuButton text="posts" path='post'/></li>
            <li><ProfileMenuButton text="comments" path='comment'/></li>
            <li><ProfileMenuButton text="saved" path='saved'/></li>
            <li><ProfileMenuButton text="hidden" path='hidden'/></li>
            <li><ProfileMenuButton text="upvoted" clicked={true} path='upvote'/></li>
            <li><ProfileMenuButton text="downvoted" path='downvote'/></li>
        </ul>

                <hr />

                <div className="flex flex-col items-center">
                    <img src={EmptySnoo} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                    <p className="text-lg font-bold">looks like you haven't upvoted anything</p>
                </div>
            </div>
    )
}

export default ProfileUpvoted;