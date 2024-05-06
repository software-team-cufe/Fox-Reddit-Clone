import React from 'react';
import PostComponent from "@/GeneralComponents/Post/Post";
import UserHeader from "./components/UserHeader";
import CommentSection from "./components/CommentSection";
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';

import { userAxios } from "@/Utils/UserAxios";

export default function PostPage() {
    const params = useParams();
    const { isLoading, data, refetch } = useQuery(`get post ${params.id}`,
        () => userAxios.get(`/${params.id}`), { retry: 0, refetchOnWindowFocus: false, });
    if (isLoading) return <></>;
    let post = data?.data;
    if (post == null) return <div role='not-found'>Post not found</div>;

    return (
        <div role='post-page' className=" space-y-4">

            <UserHeader post={post} />
            <PostComponent refetch={refetch} post={post} viewMode={true} />
            <CommentSection />
        </div>
    )
}
