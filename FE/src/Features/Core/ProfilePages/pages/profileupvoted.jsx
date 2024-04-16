import React, {useContext} from "react";
import PostComponent from "@/GeneralComponents/Post/Post";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { ProfileContext } from "../ProfilePagesRoutes";

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
            .then(response => {
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

                setPosts(newPosts);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
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
    };

    if (loading) {
        return (
            <div role='upvotedtab' className="w-100 h-100 flex flex-col items-center justify-center">
                <Spinner className="h-24 w-24" />
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
                        <PostComponent key={index} post={post} />
                    ))}
                    {!pagedone && !callingposts && (<button ref={loadMoreButtonRef} type="button" onClick={fetchMorePosts} className="w-fit h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
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