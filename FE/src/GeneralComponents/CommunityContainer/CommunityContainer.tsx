import react from 'react';
import {Link} from 'react-router-dom';
import { userStore } from '@/hooks/UserRedux/UserStore';

export default function CommunityComponent({community}) {
    
    return (
        <div>
            <Link to={`/r/${community.name}`} className="hover:bg-gray-100 rounded-3xl flex flex-1 gap-4 w-full p-4 h-fit min-h-[30px]">
                <img src={community.icon} alt="user avatar" className="w-16 mt-2 ml-2 h-16 rounded-full"/>
                <div className="flex flex-col justify-center">
                    <p className="font-semibold text-sm mb-2">u/{community.name}</p>
                    <div className="flex flex-row gap-2">
                        <p className="text-gray-500 text-xs">{community.members} members</p>
                        <p className="text-gray-500 text-xs">{community.online} online</p>
                    </div>
                    <p className="text-gray-900 text-sm">{community.about}</p>
                </div>
            </Link>
        </div>
    )
}