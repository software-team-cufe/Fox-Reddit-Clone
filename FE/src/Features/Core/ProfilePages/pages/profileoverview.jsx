import React, { useContext, useRef } from "react";
import PostComponent from "@/GeneralComponents/Post/Post";
import { useState } from "react";
import { userAxios } from "@/Utils/UserAxios";
import { useQuery } from "react-query";
import CommentComponent from "@/GeneralComponents/Comment/CommentComponent";
import { toast } from "react-toastify";

export default function ProfileOverview({ using, context }) {

    // states for collecting posts from request and loading state
    const { selected, period } = useContext(context);
    const [loading, setload] = useState(false);
    const [items, setItems] = useState([]);
    const [Posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [callingposts, setCallingPosts] = useState(false);
    const loadMoreButtonRef = useRef(null);
    const [pagedone, setpagedone] = useState(false);
    const [currentpage, setcurrentpage] = useState(1);
    const limitpage = 4;

    //fetch posts on load and put into posts array
    const fetchInitialData = () => {
        setload(true);
        userAxios.get(`user/boudie_test/overview?page=1&count=${limitpage}&limit=${limitpage}&t=${period}`)
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
                    video: null,
                    type: "post"
                }));
                setPosts(newPosts);
                const newComments = response.data.comments.map(comment => ({
                    user: {
                        image: null,
                        Username: null,
                        id: comment.authorID
                    },
                    info: {
                        votes: comment.votesCount,
                        time: comment.createdAt,
                    },
                    content: {
                        text: comment.commentText
                    },
                    type: "comment"
                }));
                setComments(newComments);
                const newItems = [...newPosts, ...newComments].sort((a, b) => b.votes - a.votes);
                setItems(prevItems => [...prevItems, ...newItems]);
                setcurrentpage(2);
                setload(false);
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("there was an issue with loading your posts please try again")
                setload(false);
            });
    };

    const { error: postsError } = useQuery(['fetchInitialProfileOverview', selected, period], fetchInitialData, { retry: 0, refetchOnWindowFocus: false });

    const fetchMoreData = () => {
        setCallingPosts(true);
        userAxios.get(`/user/boudie_test/overview?page=${currentpage}&count=${limitpage}&limit=${limitpage}&t=${period}`)
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
                    video: null
                }));
                setPosts(prevPosts => [...prevPosts, ...newPosts]);
                const newComments = response.data.comments.map(comment => ({
                    user: {
                        image: null,
                        Username: null,
                        id: comment.authorID
                    },
                    info: {
                        votes: comment.votesCount,
                        time: comment.createdAt,
                    },
                    content: {
                        text: comment.commentText
                    }
                }));
                setComments(prevComments => [...prevComments, ...newComments]);
                const newItems = [...newPosts, ...newComments].sort((a, b) => b.votes - a.votes);
                setItems(prevItems => [...prevItems, ...newItems]);
                setcurrentpage(currentpage + 1);
                setCallingPosts(false);
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("there was an issue with loading your posts please try again")
                setCallingPosts(false);
            });
    };

    if (loading) {
        return (
            <div role='overviewtab' className="w-100 h-100 flex flex-col items-center justify-center">
                <img src={'/logo.png'} className="h-12 w-12 mt-20 mx-auto animate-ping" alt="Logo" />
            </div>
        )
    }

    //main posts feed
    return (
        <div role="overviewtab" className="flex flex-col w-full h-fit my-4">
            {/* if there are no posts, show no results */}
            {Posts.length > 0 || comments.length > 0 ? (
                <>
                    {items.map((item, index) => (
                        'content' in item ? <CommentComponent key={index} comment={item} /> : <PostComponent key={index} post={item} />
                    ))}
                    {!pagedone && !callingposts && (<button ref={loadMoreButtonRef} type="button" onClick={fetchMoreData} className="w-fit mx-auto h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
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