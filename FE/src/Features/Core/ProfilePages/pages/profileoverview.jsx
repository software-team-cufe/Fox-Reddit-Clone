import React, { useContext, useRef, useEffect } from "react";
import UserPostComponent from "./extras/userPost";
import { useState } from "react";
import { userAxios } from "@/Utils/UserAxios";
import CommentComponent from "@/GeneralComponents/Comment/CommentComponent";
import { toast } from "react-toastify";

export default function ProfileOverview({ using, context }) {

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

    useEffect(() => {
        setload(true);
        userAxios.get(`user/${using}/overview?page=1&count=${limitpage}&limit=${limitpage}&t=${period}$sort=${selected}`)
            .then(response => {
                if (response.data.posts.length < limitpage && response.data.comments.length < limitpage) {
                    setpagedone(true);
                }
                const newPosts = response.data.posts.map(post => ({
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
                setItems([...newPosts, ...newComments]);
                setcurrentpage(2);
                setload(false);
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("there was an issue with loading your posts please try again")
                setload(false);
            });
    },[selected, period]);

    const fetchMoreData = () => {
        setCallingPosts(true);
        userAxios.get(`/user/${using}/overview?page=${currentpage}&count=${limitpage}&limit=${limitpage}&t=${period}&sort=${selected}`)
            .then(response => {
                console.log(response.data);

                if (response.data.posts.length < limitpage && response.data.comments.length < limitpage) {
                    setpagedone(true);
                }
                const newPosts = response.data.posts.map(post => ({
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
                const newItems = [...newPosts, ...newComments];
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
            <div role='overviewtab' className="w-100 h-100 p-10 flex flex-col items-center justify-center">
                <img src={'/logo.png'} className="h-12 w-12 mt-24 z-10 mx-auto animate-ping" alt="Logo" />
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
                        'content' in item ? <CommentComponent key={index} comment={item} /> : <UserPostComponent key={index} post={item} />
                    ))}
                    {!pagedone && !callingposts && (<button id="loadMoreButton" ref={loadMoreButtonRef} type="button" onClick={fetchMoreData} className="w-fit mx-auto h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
                    {callingposts && (<img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />)}
                </>
            ) : (
                <>
                    {/*no results view*/}
                    <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2 mx-auto" alt="Confused Snoo"></img>
                    <p className="text-lg font-bold mx-auto">u/{using} has no posts yet</p>
                </>
            )}
        </div>
    )
}