import { useParams , Link} from "react-router-dom"
import React, { useState, useContext } from 'react'
import { Clock, RotateCw } from "lucide-react";
import react from 'react'
import TypingArea from "../../../CreatePostPage/TypingArea";
import PostsList from "./PostsList";
import { set } from 'zod';

export default function ScheduledPosts() {
const[openScheduledPost,setOpenScheduledPost] = useState(false);
const handleOpenScheduledPost = () => {
    setOpenScheduledPost(!openScheduledPost);
}
const[timeFor,setTimeForPost] = useState({});

const {community} = useParams();
    return (
    <div className="flex flex-col w-full mt-16 gap-8 mx-8 h-1/4" role="test">
        <div className="flex justify-between">
            <h4>Scheduled posts</h4>
            <a href={`/submit?variable1=${openScheduledPost}&variable2=${community}`} id="container1button" className="text-black-500 bg-blue-500 rounded-xl" onClick={handleOpenScheduledPost}>schedule a post</a>
        </div>
        <div className="flex gap-8">
            <div id="container1" className="flex flex-col justify-center items-center border border-solid border-1 grow flex-grow-2 w-2/3 overflow-auto">
            <span className="">No scheduled posts in r/{community}</span>
            <Clock className="my-4" />
            <a href={`/submit?variable1=${openScheduledPost}&variable2=${community}`} id="container1button" className="text-blue-500" onClick={handleOpenScheduledPost}>schedule a post</a>
        </div>
        <div id="container2" className="border border-solid border-1 flex-grow-1 w-1/3 text-center justify-center items-center overflow-auto">
            <div className="border border-solid border-b-1">RECURRING POSTS</div>
            <div className="flex flex-col justify-center items-center text-center ">
                <div className="flex-grow-1 mt-8">no recurring posts</div>
                <RotateCw className="my-4" />
                <a href={`/submit?variable1=${openScheduledPost}&variable2=${community}`} id="container2button" className="text-blue-500" onClick={handleOpenScheduledPost}>schedule a post</a>
            </div>
        </div>
    </div>
</div>);
}