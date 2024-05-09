import React, { useContext } from "react";
import UserPostComponent from "./extras/userPost";
import { useState, useRef } from "react";
import { ProfileContext } from "../ProfilePagesRoutes";
import { useQuery } from "react-query";
import { userAxios } from "@/Utils/UserAxios";

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
    const [currentpage,setcurrentpage] = useState(1);
    const limitpage = 5;
    const [loading, setload] = useState(true);
    //fetch posts on load and put into posts array
    const fetchInitialPosts = () => {
        setload(true);
        userAxios.get(`api/user/${using}/savedPosts?page=1&count=${limitpage}&limit=${limitpage}&t=${period}&sort=${selected}`)
            .then(response => {
                if(response.data.posts.length < limitpage){
                    setpagedone(true);
                }
                const newPosts = response.data.posts.map(post => ({
                    communityName: post.coummunityName,
                    communityIcon: post.communityIcon,
                    images: post.attachments,
                    postId: post._id,
                    title: post.title,
                    textHTML: post.textHTML,
                    votesCount: post.votesCount,
                    commentsNum: post.commentsNum,
                    comments: post.postComments,
                    thumbnail: post.thumbnail,
                    video: null,
                    type: "post",
                    spoiler: post.spoiler,
                    NSFW: post.nsfw,
                    hidden: post.isHidden,
                    poll: post.poll ? post.poll : []
                }));
                setcurrentpage(2);
                setPosts(newPosts);
                setload(false);
            })
            .catch(error => {
                setload(false);
                console.error('Error:', error);
            });
    };

    const {error: postsError } = useQuery(['fetchInitialProfileSaved', selected, period],fetchInitialPosts, { retry: 0, refetchOnWindowFocus: false });

    const fetchMorePosts = () => {
        setCallingPosts(true);
        userAxios.get(`api/user/${using}/savedPosts?page=${currentpage}&count=${limitpage}&limit=${limitpage}&t=${period}&sort=${selected}`)
            .then(response => {
                if(response.data.posts.length <limitpage){
                    setpagedone(true);
                }
                const newPosts = response.data.posts.map(post => ({
                    communityName: post.coummunityName,
                    communityIcon: post.communityIcon,
                    images: post.attachments,
                    postId: post._id,
                    title: post.title,
                    textHTML: post.textHTML,
                    votesCount: post.votesCount,
                    commentsNum: post.commentsNum,
                    comments: post.postComments,
                    thumbnail: post.thumbnail,
                    video: null,
                    type: "post",
                    spoiler: post.spoiler,
                    NSFW: post.nsfw,
                    hidden: post.isHidden,
                    poll: post.poll ? post.poll : []
                }));

                setPosts(prevPosts => [...prevPosts, ...newPosts]);
                setCallingPosts(false);
                setcurrentpage(1+currentpage);

            })
            .catch(error => {
                console.error('Error:', error);
                setCallingPosts(false);
            });
    };

    if (loading) {
        return (
            <div role='savedtab' className="w-100 h-400 flex flex-col z-50 items-center justify-center">
                <img src={'/logo.png'} className="h-12 w-12 mt-24 z-50 mx-auto animate-ping" alt="Logo" />
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
                        <UserPostComponent key={index} post={post} />
                    ))}
                    {!pagedone && !callingposts && (<button id="loadMoreButton" ref={loadMoreButtonRef} type="button" onClick={fetchMorePosts} className="w-fit h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
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