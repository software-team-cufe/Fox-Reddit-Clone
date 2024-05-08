import React, {useContext} from "react";
import UserPostComponent from "./extras/userPost";
import { useState, useRef } from "react";
import { ProfileContext } from "../ProfilePagesRoutes";
import { userAxios } from "@/Utils/UserAxios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

/**
 * Renders the profile upvoted page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.using - The username of the profile being viewed.
 * @returns {JSX.Element} The profile upvoted page component.
 */
export default function ProfileUpvoted({using}) {

    // states for collecting posts from request and loading state
    const { selected, period } = useContext(ProfileContext);
    const [Posts, setPosts] = useState([]);
    const [loading, setload] = useState(true);
    const [callingposts, setCallingPosts] = useState(false);
    const loadMoreButtonRef = useRef(null);
    const [pagedone, setpagedone] = useState(false);
    const [currentpage,setcurrentpage] = useState(1);
    const limitpage = 5;
    
    //fetch posts on load and put into posts array
    const fetchInitialPosts = () => {
        setload(true);
        userAxios.get(`api/user/me/upvoted/${selected.toLowerCase()}?page=1&count=${limitpage}&limit=${limitpage}`)
            .then(response => {
                if(response.data.upvotedPosts.length < limitpage){
                    setpagedone(true);
                }
                const newPosts = response.data.upvotedPosts.map(post => ({
                    communityName: post.username,
                    communityIcon: post.userID.avatar,
                    images: post.attachments,
                    id: post._id,
                    title: post.title,
                    description: post.textHTML,
                    votesCount: post.votesCount,
                    comments: post.commentsCount,
                    thumbnail: post.thumbnail,
                    video: null,
                    type: "post",
                    spoiler: post.spoiler,
                    NSFW: post.nsfw
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

    const {error: postsError } = useQuery(['fetchInitialProfileUpvoted', selected, period],fetchInitialPosts, { retry: 0, refetchOnWindowFocus: false });

    const fetchMorePosts = () => {
        setCallingPosts(true);
        userAxios.get(`api/user/me/upvoted/${selected.toLowerCase()}?page=${currentpage}&count=${limitpage}&limit=${limitpage}`)
            .then(response => {
                if(response.data.upvotedPosts.length <limitpage){
                    setpagedone(true);
                }
                const newPosts = response.data.upvotedPosts.map(post => ({
                    communityName: post.username,
                    communityIcon: post.userID.avatar,
                    images: post.attachments,
                    id: post._id,
                    title: post.title,
                    description: post.textHTML,
                    votesCount: post.votesCount,
                    comments: post.commentsCount,
                    thumbnail: post.thumbnail,
                    video: null,
                    type: "post",
                    spoiler: post.spoiler,
                    NSFW: post.nsfw
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
    };

    if (loading) {
        return (
            <div role='poststab' className="w-100 h-100 flex p-10 flex-col items-center justify-center">
               <img src={'/logo.png'} className="h-12 w-12 z-10 mt-24 mx-auto animate-ping" alt="Logo" />
            </div>
        )
    }

    if (loading) {
        return (
            <div role='upvotedtab' className="w-100 h-100 flex flex-col items-center justify-center">
               <img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />
            </div>
        )
    }
    //main posts feed
    return (
        <div role="upvotedtab" className="flex flex-col w-full h-fit my-4 items-center">
            {/* if there are no posts, show no results */}
            {Posts.length > 0 ? (
                <>
                    {Posts.map((post, index) => (
                        <UserPostComponent key={index} post={post} />
                    ))}
                    {!pagedone && !callingposts && (<button id="loadMoreButton" ref={loadMoreButtonRef} type="button" onClick={fetchMorePosts} className="w-fit h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
                    {callingposts && (<img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />)}                </>
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