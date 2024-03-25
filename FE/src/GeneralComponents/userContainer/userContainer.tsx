import react from 'react';
import {Link} from 'react-router-dom';

export default function UserComponent({user}) {
    return (
        <div>
            <Link to={`/user/${user.name}/overview`} className="hover:bg-gray-100 rounded-3xl flex flex-1 gap-4 w-full p-4 h-fit min-h-[30px]">
                <img src={user.avatar} alt="user avatar" className="w-16 mt-2 ml-2 h-16 rounded-full"/>
                <div className="flex flex-col justify-center">
                    <p className="font-semibold text-sm mb-2">u/{user.name}</p>
                    <p className="text-gray-500 text-xs">{user.karma} karma</p>
                    <p className="text-gray-900 text-sm">{user.about}</p>
                </div>
            </Link>
        </div>
    )
}