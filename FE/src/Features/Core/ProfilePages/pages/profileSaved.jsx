import React, { useContext } from "react";
import PostComponent from "@/GeneralComponents/Post/Post";
import { useState, useRef } from "react";
<<<<<<< HEAD
import { ProfileContext } from "../ProfilePagesRoutes";
import { useQuery } from "react-query";
import { userAxios } from "@/Utils/UserAxios";
=======
import axios from 'axios';
import { ProfileContext } from "../ProfilePagesRoutes";
import { useQuery } from "react-query";
import { userAxios } from "../../../../Utils/UserAxios";
>>>>>>> origin/newnew-nadine

/**
 * Renders the profile saved page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.using - The username of the profile owner.
 * @returns {JSX.Element} The profile saved page.
 */
export default function ProfileSaved({ using }) {

    // states for collecting saved posts from request and loading state
    const { selected, period } = useContext(ProfileContext);
    const [Posts, setPosts] = useState([]);
    const [callingposts, setCallingPosts] = useState(false);
    const loadMoreButtonRef = useRef(null);
    const [pagedone, setpagedone] = useState(false);
<<<<<<< HEAD
    const [currentpage,setcurrentpage] = useState(1);
    const limitpage = 5;
    const [loading, setload] = useState(true);
    //fetch posts on load and put into posts array
    const fetchInitialPosts = () => {
        setload(true);
        userAxios.get(`api/user/${using}/savedPosts?page=1&count=${limitpage}&limit=${limitpage}&t=${period}`)
=======
    const [currentpage,setcurrentpage] = useState(0);
    const limitpage = 5;

    //fetch posts on load and put into posts array
    const fetchInitialPosts = () => {
        axios.get(`http://localhost:3002/posts?_limit=${limitpage}&_start=${currentpage}`)
>>>>>>> origin/newnew-nadine
            .then(response => {
                if(response.data.posts.length < limitpage){
                    setpagedone(true);
                }
                const newPosts = response.data.posts.map(post => ({
                    subReddit: {
                        image: post.attachments.subredditIcon,
                        title: post.communityName,
                    },
<<<<<<< HEAD
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
<<<<<<< HEAD
                setcurrentpage(2);
                setPosts(newPosts);
                setload(false);
            })
            .catch(error => {
                setload(false);
=======
                setcurrentpage(currentpage+limitpage);
                setPosts(newPosts);
            })
            .catch(error => {
>>>>>>> origin/newnew-nadine
                console.error('Error:', error);
            });
    };

<<<<<<< HEAD
    const {error: postsError } = useQuery(['fetchInitialProfileSaved', selected, period],fetchInitialPosts, { retry: 0, refetchOnWindowFocus: false });

    const fetchMorePosts = () => {
        setCallingPosts(true);
        userAxios.get(`api/user/${using}/savedPosts?page=${currentpage}&count=${limitpage}&limit=${limitpage}&t=${period}`)
            .then(response => {
                if(response.data.posts.length <limitpage){
                    setpagedone(true);
                }
                const newPosts = response.data.posts.map(post => ({
=======
    const { isLoading:loading, error: postsError } = useQuery(['fetchInitialProfileSaved', selected, period],fetchInitialPosts, { retry: 0, refetchOnWindowFocus: false });

    const fetchMorePosts = () => {
        setCallingPosts(true);
        axios.get(`http://localhost:3002/posts?_limit=${limitpage}&_start=${currentpage}`)
            .then(response => {
                if(response.data.length <limitpage){
                    setpagedone(true);
                }
                const newPosts = response.data.map(post => ({
>>>>>>> origin/newnew-nadine
                    subReddit: {
                        image: post.attachments.subredditIcon,
                        title: post.communityName,
                    },
<<<<<<< HEAD
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
<<<<<<< HEAD
                setcurrentpage(1+currentpage);
=======
                setcurrentpage(limitpage+currentpage);
>>>>>>> origin/newnew-nadine

            })
            .catch(error => {
                console.error('Error:', error);
                setCallingPosts(false);
            });
    };

    if (loading) {
        return (
            <div role='savedtab' className="w-100 h-100 flex flex-col items-center justify-center">
<<<<<<< HEAD
                <img src={'/logo.png'} className="h-12 w-12 mt-24 z-10 mx-auto animate-ping" alt="Logo" />
=======
                <img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />
>>>>>>> origin/newnew-nadine
            </div>
        )
    }
    //main posts feed
    return (
        <div role="savedtab" className="flex flex-col w-full h-fit my-4 items-center">
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
                    <p className="text-lg font-bold">u/{using} has no saves yet</p>
                </>
            )}
        </div>
    )
}