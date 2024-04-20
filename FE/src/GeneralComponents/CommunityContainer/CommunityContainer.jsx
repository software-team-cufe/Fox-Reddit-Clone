/**
 * Renders a component for displaying a community.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.community - The community object to display.
 * @param {string} props.community.name - The name of the community.
 * @param {string} props.community.icon - The URL of the community icon.
 * @param {number} props.community.members - The number of members in the community.
 * @param {number} props.community.online - The number of members currently online.
 * @param {string} props.community.about - A description of the community.
 * @returns {JSX.Element} The rendered component.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import { userStore } from '@/hooks/UserRedux/UserStore';

export default function CommunityComponent({community}) {
    
    return (
        <div>
<<<<<<< HEAD
            <Link id={`toComm${community.name}`} role="commContainer" to={`/r/${community.name}`} className="hover:bg-gray-100 rounded-3xl flex flex-1 gap-4 w-full p-4 h-fit min-h-[30px]">
=======
            <Link role="commContainer" to={`/r/${community.name}`} className="hover:bg-gray-100 rounded-3xl flex flex-1 gap-4 w-full p-4 h-fit min-h-[30px]">
>>>>>>> origin/newnew-nadine
                <img role="commimage" src={community.icon} alt="user avatar" className="w-16 mt-2 ml-2 h-16 rounded-full"/>
                <div className="flex flex-col justify-center">
                    <p className="font-semibold text-sm mb-2">r/{community.name}</p>
                    <div className="flex flex-row gap-2">
                        <p className="text-gray-500 text-xs">{community.members} members</p>
                        <p className="text-gray-500 text-xs">{community.online} online</p>
                    </div>
                    <p role="commabout" className="text-gray-900 text-sm">{community.about}</p>
                </div>
            </Link>
        </div>
    )
}