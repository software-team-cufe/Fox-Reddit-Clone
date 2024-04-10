import React, { useContext } from "react";
import PostComponent from "@/GeneralComponents/Post/Post";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { ProfileContext } from "../ProfilePagesRoutes";
export default function ProfileHidden({using}) {

    // states for collecting hidden posts from request and loading state
    const {selected, period} = useContext(ProfileContext);
    const [Posts, setPosts] = useState([]);
    const  [loading, setLoading] = useState(true);
    const loadMoreButtonRef = useRef(null);
    
    //fetch posts on load and put into posts array
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3002/posts?_limit=5')
            //axios.get('https://virtserver.swaggerhub.com/BOUDIE2003AHMED/fox/1/user/sharif29/posts')
            .then(response => {
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
    }, [selected, period]);

    const fetchMorePosts = () => {
        axios.get('http://localhost:3002/posts?_limit=5')
        .then(response => {
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
    
            setPosts(prevPosts => [...prevPosts, ...newPosts]);
            setLoading(false);
    
        })
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);
        });
    };

    if (loading) {
        return (
            <div role='hiddentab' className="w-100 h-100 flex flex-col items-center justify-center">
                <Spinner className="h-24 w-24" />
            </div>
        )
    }
    //main posts feed
    return (
        <div role="hiddentab" className="flex flex-col w-full h-fit my-4 items-center">
            {/* if there are no posts, show no results */}
            {Posts.length > 0 ? (
                <>
                    {Posts.map((post, index) => (
                        <PostComponent key={index} post={post} />
                    ))}
                    <button ref={loadMoreButtonRef} type="button" onClick={fetchMorePosts} className="w-fit h-fit text-white ring-1 ring-inset ring-white tbg-gray-300 px-3 py-2 bg-blue-600 rounded-full hover:bg-blue-700 hover:ring-black mb-2">Load more</button>
                </>
            ) : (
                <>
                    {/*no results view*/}
                    <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                    <p className="text-lg font-bold">u/{using} has no posts yet</p>
                </>
            )}
        </div>
    )
}