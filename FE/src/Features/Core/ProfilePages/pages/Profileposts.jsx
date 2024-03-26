import React from "react";
import PostComponent from "@/GeneralComponents/Post/Post";
import { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { useParams } from "react-router-dom";

export default function ProfilePosts({using}) {

    // states for collecting posts from request and loading state
    const [Posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useParams().viewer;
    //fetch posts on load and put into posts array
    useEffect(() => {
        axios.get('http://localhost:3002/posts')
        //axios.get('https://virtserver.swaggerhub.com/BOUDIE2003AHMED/fox/1/user/sharif29/posts')
            .then(response => {
                console.log(response.data)
                const newPosts = response.data.map(post => ({
                    subReddit: {
                        image: post.attachments.subredditIcon,
                        title: post.communityName,
                    },
                    images: post.attachments.postData,
                    id: post.postID,
                    title: post.title,
                    subTitle: post.postText,
                    votes: post.votesCount,
                    comments: post.commentsCount,
                    thumbnail: post.thumbnail,
                    video: null
                }));

                setPosts(newPosts);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);


    //to handle waiting for fetch or loading state
    if (loading) {
        return (
            <div role='poststab' className="w-100 h-100 flex flex-col items-center justify-center">
                <Spinner className="h-24 w-24" />
            </div>
        )
    }

    //main posts feed
    return (
        <div role="poststab" className="flex flex-col w-full h-fit my-4 items-center">
            {/* if there are no posts, show no results */}
            {Posts.length > 0 ? (
                Posts.map((post, index) => (
                    <PostComponent key={index} post={post} />
                ))
            ) : (
                <>
                    {/*no results view*/}
                    <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                    <p className="text-lg font-bold">u/{user} has no posts yet</p>
                </>
            )} 
        </div>
    )
}