import React from 'react';
import PostComponent from "@/GeneralComponents/Post/Post";
import UserHeader from "./components/UserHeader";
import { fakePosts } from "../HomePage/fakePosts";
import CommentSection from "./components/CommentSection";
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import axios from 'axios';

export default function PostPage() {
    const params = useParams();
    const idx = parseInt(params.id);
    const { isLoading, data, refetch } = useQuery(`get post ${params.id}`, () => axios.get(`http://localhost:3002/posts/${params.id}`));
    if (isLoading) return <></>;
    let post = data.data;
    if (post == null) return <div role='not-found'>Post not found</div>;
    post = {
        subReddit: {
            image: post.attachments.subredditIcon,
            title: post.communityName,
        },
        images: post.attachments.postData,
        id: post.id,
        title: post.title,
        subTitle: post.postText,
        votes: post.votesCount,
        comments: post.commentsCount,
        thumbnail: post.thumbnail,
        video: null,
        spoiler: post.spoiler,
    };
    return (
        <div role='post-page' className=" space-y-4">

            <UserHeader post={post} />
            <PostComponent refetch={refetch} post={post} viewMode={true} />
            <CommentSection />
        </div>
    )
}
