import React from "react";
import UserPostComponent from "./userPost";
import { userAxios } from "@/Utils/UserAxios";

export default function HiddenPost({ post, setpost, posts }) {
    const unhidePost = () => {
        console.log(post);
        userAxios.post(`/api/unhide`, { linkID: "t3_" + post.id })
            .then(() => {
                setpost(posts.map(curr => curr.id === post.id ? { ...curr, hidden: !curr.hidden } : curr));
            })
            .catch(err => { console.log(err); });
    };

    if (post.hidden == true) {
        return <div className="w-full h-20 rounded-lg bg-white flex justify-between p-4 hover:bg-gray-100">
            <span className="text-md font-bold my-auto">Hidden post</span>
            <button id={`unhidePost${post.id}`} role={`unhidePost${post.id}`} className="w-fit h-fit my-auto bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full font-semibold px-4 py-2" onClick={unhidePost}>Unhide</button>
        </div>
    }
    else {
        return <UserPostComponent post={post} />
    }
}