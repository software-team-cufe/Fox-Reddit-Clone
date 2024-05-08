import { useParams } from "react-router-dom"
import React from 'react'
import { Clock, RotateCw } from "lucide-react";
import react from 'react'

export default function ScheduledPosts() {
    
const {community} = useParams();
    return (
    <div className="flex flex-col w-full mt-16 gap-8 mx-8 h-1/4" role="test">
        <div className="flex justify-between">
            <h4>Scheduled posts</h4>
            <button className="border border-solid border-1 border-blue-200 bg-blue-400 hover:bg-blue-500 rounded-xl ">schedule post</button>
        </div>
        <div className="flex gap-8">
            <div id="container1" className="flex flex-col justify-center items-center border border-solid border-1 grow flex-grow-2 w-2/3 overflow-auto">
            <span className="">No scheduled posts in r/{community}</span>
            <Clock className="my-4" />
            <a href="/submit" className="text-blue-500 ">scheduled posts</a>
        </div>
        <div id="container2" className="border border-solid border-1 flex-grow-1 w-1/3 text-center justify-center items-center overflow-auto">
            <div className="border border-solid border-b-1">RECURRING POSTS</div>
            <div className="flex flex-col justify-center items-center text-center ">
                <div className="flex-grow-1 mt-8">no recurring posts</div>
                <RotateCw className="my-4" />
                <a href="/submit" className="text-blue-500 ">scheduled posts</a>
            </div>
        </div>
    </div>
</div>);
}