import { useParams } from "react-router-dom"
import React from 'react'

export default function ScheduledPosts() {
    
const {community} = useParams();

    return (
        <div className="flex w-full mt-16">
            <div className="border border-solid-2 grow flex-grow-2 w-2/3">
                {community}
            </div>
            <div className="border border-solid-2 flex-grow-1 w-1/3"><div className="border border-bottom-2">RECURRING POSTS</div>no recurring posts</div>
        </div>
    );

}