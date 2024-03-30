import React from 'react';
import PostComponent from "@/GeneralComponents/Post/Post";
import UserHeader from "./components/UserHeader";
import { fakePosts } from "../HomePage/fakePosts";
import CommentSection from "./components/CommentSection";
import { useParams } from "react-router-dom";


export default function PostPage() {
    const params = useParams();
    const idx = parseInt(params.id);
    if(idx > fakePosts.length -1|| idx < 0) return <div role='not-found'>Post not found</div>;
    const post = fakePosts[parseInt(idx)];
    if(post == null) return <div role='not-found'>Post not found</div>;
    return (
        <div role='post-page' className=" space-y-4">
            
            <UserHeader post={post}/>
            <PostComponent post={post} viewMode={true} />
            <CommentSection />
        </div>
    )
}
