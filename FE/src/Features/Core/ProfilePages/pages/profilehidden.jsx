import React from "react";
import PostComponent from "@/GeneralComponents/Post/Post";
import { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from "@/GeneralElements/Spinner/Spinner";

export default function ProfileHidden() {

    // states for collecting hidden posts from request and loading state
    const [Posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    //fetch hidden posts on load and put into posts array
    useEffect(() => {
        axios.get('https://virtserver.swaggerhub.com/BOUDIE2003AHMED/fox/1/user/sharif29/hidden')
            .then(response => {
                const newPosts = response.data.postArr.map(post => ({
                    subReddit: {
                        image: post.attachments,
                        title: post.communityName,
                    },
                    id: post.postID,
                    title: post.title,
                    subTitle: post.postText,
                    votes: post.votesCount,
                    comments: post.commentsCount,
                }));

                setPosts(newPosts);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    })

    //to handle waiting for fetch or loading state
    if (loading) {
        return (
            <div role="hiddentab" className="w-100 h-100 flex flex-col items-center justify-center">
                <Spinner className="h-24 w-24" />
            </div>
        )
    }

    //main hidden posts feed
    return (
        <div role="hiddentab" className="flex flex-col w-full h-fit my-4 items-center">
            {/* if there are no hidden posts, show no results */}
            {Posts.length > 0 ? (
                Posts.map((post, index) => (
                    <PostComponent key={index} post={post} />
                ))
            ) : (
                <>
                    {/*no results view*/}
                    <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                    <p className="text-lg font-bold">looks like you haven't hidden anything</p>
                </>
            )}
        </div>
    )
}