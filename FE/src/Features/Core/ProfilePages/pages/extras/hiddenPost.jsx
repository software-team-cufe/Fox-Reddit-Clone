import React from "react";
import PostComponent from "@/GeneralComponents/Post/Post";
import { userAxios } from "@/Utils/UserAxios";

export default function HiddenPost({post, setpost, posts}) {
    const unhidePost = () => {
        setpost(posts.map(curr => curr.id === post.id ? { ...post, hidden: !post.hidden } : post));      
    };
    
    if(post.hidden == true){
        return <div className="w-full h-20 rounded-lg bg-white flex justify-between p-4 hover:bg-gray-100">
            <span className="text-md font-bold my-auto">Hidden post</span>
            <button className="w-fit h-fit my-auto bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full font-semibold px-4 py-2" onClick={unhidePost}>Unhide</button>
        </div>
    }
    else{
        return <PostComponent post={post} />
    }
}