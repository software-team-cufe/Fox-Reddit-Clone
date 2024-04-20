import React, { useContext } from "react";
import PostComponent from "@/GeneralComponents/Post/Post";
<<<<<<< HEAD
import { useState, useRef } from "react";
=======
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Spinner from "@/GeneralElements/Spinner/Spinner";
>>>>>>> origin/newnew-nadine
import { ProfileContext } from "../ProfilePagesRoutes";
import { userAxios } from "@/Utils/UserAxios";
import { useQuery } from "react-query";
import {toast} from "react-toastify";

/**
 * Renders the profile page for downvoted posts.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.using - The username of the profile being viewed.
 * @returns {JSX.Element} The rendered component.
 */
export default function ProfileDownvoted({ using }) {

    // states for collecting posts from request and loading state
    const { selected, period } = useContext(ProfileContext);
    const [Posts, setPosts] = useState([]);
<<<<<<< HEAD
    const [loading, setload] = useState(true);
    const [callingposts, setCallingPosts] = useState(false);
    const loadMoreButtonRef = useRef(null);
    const [pagedone, setpagedone] = useState(false);
    const [currentpage,setcurrentpage] = useState(1);
    const limitpage = 5;

    //fetch posts on load and put into posts array
    const fetchInitialPosts = () => {
        setload(true);
        userAxios.get(`api/user/me/downvoted/${selected.toLowerCase()}?page=1&count=${limitpage}&limit=${limitpage}`)
=======
    const [loading, setLoading] = useState(true);
    const [callingposts, setCallingPosts] = useState(false);
    const loadMoreButtonRef = useRef(null);
    const [pagedone, setpagedone] = useState(false);
    const [currentpage,setcurrentpage] = useState(0);
    const limitpage = 2;

    //fetch posts on load and put into posts array
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3002/posts?_limit=${limitpage}`)
            //axios.get('https://virtserver.swaggerhub.com/BOUDIE2003AHMED/fox/1/user/sharif29/posts')
>>>>>>> origin/newnew-nadine
            .then(response => {
                if(response.data.downvotedPosts.length < limitpage){
                    setpagedone(true);
                }
                const newPosts = response.data.downvotedPosts.map(post => ({
                    subReddit: {
                        image: post.attachments.subredditIcon,
                        title: post.communityName,
                    },
<<<<<<< HEAD
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

    const {error: postsError } = useQuery(['fetchInitialProfileDownvoted', selected, period],fetchInitialPosts, { retry: 0, refetchOnWindowFocus: false });

    const fetchMorePosts = () => {
        setCallingPosts(true);
        userAxios.get(`api/user/me/downvoted/${selected.toLowerCase()}?page=${currentpage}&count=${limitpage}&limit=${limitpage}`)
            .then(response => {
                if(response.data.downvotedPosts.length <limitpage){
                    setpagedone(true);
                }
                const newPosts = response.data.downvotedPosts.map(post => ({
                    subReddit: {
                        image: post.attachments.subredditIcon,
                        title: post.communityName,
                    },
                    images: post.attachments,
                    id: post._id,
=======
                    images: post.attachments.postData,
                    id: post.id,
>>>>>>> origin/newnew-nadine
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
                setCallingPosts(false);
            });
<<<<<<< HEAD
=======
    }, [selected, period]);

    const fetchMorePosts = () => {
        setCallingPosts(true);
        axios.get(`http://localhost:3002/posts?_start=${currentpage+limitpage}&_limit=${limitpage}`)
            .then(response => {
                if(response.data.length <limitpage){
                    setpagedone(true);
                }
                const newPosts = response.data.map(post => ({
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
                    video: null
                }));

                setPosts(prevPosts => [...prevPosts, ...newPosts]);
                setCallingPosts(false);
                setcurrentpage(limitpage+currentpage);

            })
            .catch(error => {
                console.error('Error:', error);
                setCallingPosts(false);
            });
>>>>>>> origin/newnew-nadine
    };

    if (loading) {
        return (
<<<<<<< HEAD
            <div role='downvotedtab' className="w-100 h-100 flex p-10 flex-col items-center justify-center">
                <img src={'/logo.png'} className="h-12 w-12 mt-24 z-10 mx-auto animate-ping" alt="Logo" />
=======
            <div role='downvotedtab' className="w-100 h-100 flex flex-col items-center justify-center">
                <img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />
>>>>>>> origin/newnew-nadine
            </div>
        )
    }
    //main posts feed
    return (
        <div role="downvotedtab" className="flex flex-col w-full h-fit my-4 items-center">
            {/* if there are no posts, show no results */}
            {Posts.length > 0 ? (
                <>
                    {Posts.map((post, index) => (
                        <PostComponent key={index} post={post} />
                    ))}
<<<<<<< HEAD
                    {!pagedone && !callingposts && (<button id="loadMoreButton" ref={loadMoreButtonRef} type="button" onClick={fetchMorePosts} className="w-fit h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
=======
                    {!pagedone && !callingposts && (<button ref={loadMoreButtonRef} type="button" onClick={fetchMorePosts} className="w-fit h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
>>>>>>> origin/newnew-nadine
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