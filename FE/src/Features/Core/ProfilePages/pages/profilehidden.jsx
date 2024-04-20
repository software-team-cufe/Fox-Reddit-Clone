import React, { useContext } from "react";
import { useState, useRef } from "react";
import { ProfileContext } from "../ProfilePagesRoutes";
import HiddenPost from "./extras/hiddenPost";
import { userAxios } from "@/Utils/UserAxios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

/**
 * Renders the profile hidden page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.using - The username of the profile owner.
 * @returns {JSX.Element} The profile hidden page component.
 */
export default function ProfileHidden({ using }) {

    // states for collecting hidden posts from request and loading state
    const { selected, period } = useContext(ProfileContext);
    const [Posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [callingposts, setCallingPosts] = useState(false);
    const loadMoreButtonRef = useRef(null);
    const [pagedone, setpagedone] = useState(false);
    const [currentpage, setcurrentpage] = useState(1);
    const limitpage = 5;

    //fetch posts on load and put into posts array
    const fetchInitialPosts = () => {
        setLoading(true);
        userAxios.get(`api/user/${using}/hiddenPosts?page=1&count=${limitpage}&limit=${limitpage}&t=${period}`)
            .then(response => {
                if (response.data.posts.length < limitpage) {
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
                    video: null,
                    hidden: true
                }));
                setPosts(newPosts);
                setLoading(false);
                setcurrentpage(2);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false); 
            });
    };

    const {error: postsError } = useQuery(['fetchInitialProfileHidden', selected, period],fetchInitialPosts, { retry: 0, refetchOnWindowFocus: false });

    const fetchMorePosts = () => {
        setCallingPosts(true);
        userAxios.get(`api/user/${using}/hiddenPosts?page=${currentpage}&count=${limitpage}&limit=${limitpage}&t=${period}`)
            .then(response => {
                if (response.data.posts.length < limitpage) {
                    setpagedone(true);
                }
                const newPosts = response.data.posts
                    .map(post => ({
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
                        hidden: true
                    }));

                setPosts(prevPosts => [...prevPosts, ...newPosts]);
                setCallingPosts(false);
                setcurrentpage(1 + currentpage);

            })
            .catch(error => {
                console.error('Error:', error);
                setCallingPosts(false);
            });
    };

    if (loading) {
        return (
            <div role='hiddentab' className="w-100 h-100 p-10 flex flex-col items-center justify-center">
                <img src={'/logo.png'} className="h-12 w-12 mt-24 z-10 mx-auto animate-ping" alt="Logo" />
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
                        <HiddenPost key={index} post={post} setpost={setPosts} posts={Posts} />
                    ))}
                    {!pagedone && !callingposts && (<button id="loadMoreButton" ref={loadMoreButtonRef} type="button" onClick={fetchMorePosts} className="w-fit h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
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