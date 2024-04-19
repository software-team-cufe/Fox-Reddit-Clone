import React, { useContext, useRef } from "react";
import PostComponent from "@/GeneralComponents/Post/Post";
import { useState } from "react";
import axios from 'axios';
import { userAxios } from "@/Utils/UserAxios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

/**
 * Renders the profile posts component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.using - The username of the profile owner.
 * @param {Object} props.context - The context object.
 * @returns {JSX.Element} The profile posts component.
 */
export default function ProfilePosts({ using, context }) {

    // states for collecting posts from request and loading state
    const { selected, period } = useContext(context);
    const [Posts, setPosts] = useState([]);
    const [loading, setload] = useState(false);
    const [callingposts, setCallingPosts] = useState(false);
    const loadMoreButtonRef = useRef(null);
    const [pagedone, setpagedone] = useState(false);
    const [currentpage,setcurrentpage] = useState(1);
    const limitpage = 5;

    //fetch posts on load and put into posts array
    const fetchInitialPosts = () => {
        setload(true);
        userAxios.get(`user/boudie_test/submitted?page=1&count=${limitpage}&limit=${limitpage}&t=${period}`)
            .then(response => {
                const newPosts = response.data.posts.map(post => ({
                    subReddit: {
                        image: post.attachments.subredditIcon,
                        title: post.communityName,
                    },
                    images: post.attachments,
                    id: post._id,
                    title: post.title,
                    subTitle: post.postText,
                    votes: post.votesCount,
                    comments: post.commentsCount,
                    thumbnail: post.thumbnail,
                    video: null
                }));
                setcurrentpage(2);
                setPosts(newPosts);
                setload(false);
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("there was an issue with loading your posts please try again")
                setload(false);
            });
    };

    const {error: postsError } = useQuery(['fetchInitialProfilePosts', selected, period],fetchInitialPosts, { retry: 0, refetchOnWindowFocus: false });

    const fetchMorePosts = () => {
        setCallingPosts(true);
        userAxios.get(`/user/boudie_test/submitted?page=${currentpage}&count=${limitpage}&limit=${limitpage}&t=${period}`)
            .then(response => {
                if(response.data.posts.length <limitpage){
                    setpagedone(true);
                }
                const newPosts = response.data.posts.map(post => ({
                    subReddit: {
                        image: post.attachments.subredditIcon,
                        title: post.communityName,
                    },
                    images: post.attachments,
                    id: post._id,
                    title: post.title,
                    subTitle: post.postText,
                    votes: post.votesCount,
                    comments: post.commentsCount,
                    thumbnail: post.thumbnail,
                    video: null
                }));

                setPosts(prevPosts => [...prevPosts, ...newPosts]);
                setCallingPosts(false);
                setcurrentpage(1+currentpage);

            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("there was an issue with loading your posts please try again")
                setload(false);
            });
    };

    if (loading) {
        return (
            <div role='poststab' className="w-100 h-100 flex flex-col items-center justify-center">
               <img src={'/logo.png'} className="h-10 w-10 mt-24 mx-auto animate-ping" alt="Logo" />
            </div>
        )
    }
    //main posts feed
    return (
        <div role="poststab" className="flex flex-col w-full h-fit my-4 items-center">
            {/* if there are no posts, show no results */}
            {Posts.length > 0 ? (
                <>
                    {Posts.map((post, index) => (
                        <PostComponent key={index} post={post} />
                    ))}
                    {!pagedone && !callingposts && (<button ref={loadMoreButtonRef} type="button" onClick={fetchMorePosts} className="w-fit h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
                    {callingposts && (<img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />)}
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