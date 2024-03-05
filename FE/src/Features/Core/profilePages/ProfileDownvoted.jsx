import ProfileSnoo from './images/mySnoo.png';
import EmptySnoo from './images/confusedSnoo.png';
import {buttons, ProfileMenuButton} from './profilemenubutton';

function ProfileDownvoted ({userName}) {
    return (
        <div className="flex-initial w-1/2 min-h-screen mx-14 my-4">
        <div className='relative flex mb-8'>
            <img src={ProfileSnoo} className='p-1 w-20 h-24 rounded-full z-0' alt=""></img>
            <span className='text-black font-bold text-2xl absolute top-10 left-24'>{userName}</span>
            <span className='text-gray-500 font-semibold absolute top-3/4 left-24'>u/{userName}</span>
        </div>
        <ul className='flex gap-3 overflow-x-auto mb-12'>
                {
                    buttons.map((btn, index) => <li key={index}>
                        <ProfileMenuButton text={btn.text} clicked="downvoted" path={btn.path} />
                    </li>)
                }

            </ul>

                <hr />

                <div className="flex flex-col mt-6 items-center">
                    <img src={EmptySnoo} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                    <p className="text-lg font-bold">looks like you haven't downvoted anything</p>
                </div>
            </div>
    )
}

export default ProfileDownvoted;