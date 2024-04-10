import React, { useEffect, useState, useContext, useRef } from "react";
import axios from 'axios';
import CommentComponent from "@/GeneralComponents/Comment/CommentComponent";
import { comment } from "postcss";
import Spinner from "@/GeneralElements/Spinner/Spinner";

function ProfileComments({using, context}) {

    // states for collecting comments from request and loading state
    const { selected, period } = useContext(context);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadMoreButtonRef = useRef(null);

    //fetch comments on load and put into comments array
    useEffect( () => {
        setLoading(true);
        axios.get("http://localhost:3002/comments?_limit=5")
        //axios.get('https://virtserver.swaggerhub.com/BOUDIE2003AHMED/fox/1/user/sharif29/comments?page=4&count=10&limit=50&t=month')
            .then(response => {
                const newComments = response.data.map(comment => ({
                    user: {
                        image: comment.user.avatar,
                        Username: comment.user.username,
                        id: comment.user.userID
                    },
                    info: {
                        votes: comment.votesCount,
                        time: comment.createdAt,
                    },
                    content: {
                        text: comment.commentText
                    }
                }));

                setComments(newComments);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [period, selected]);

    const fetchMoreComments = () => {
        axios.get('http://localhost:3002/comments?_limit=5')
        .then(response => {
            const newComments = response.data.map(comment => ({
                user: {
                    image: comment.user.avatar,
                    Username: comment.user.username,
                    id: comment.user.userID
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
            setLoading(false);
    
        })
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);
        });
    };

    //to handle waiting for fetch or loading state
    if (loading) {
        return(
            <div role="commentstab" className="w-100 h-100 flex flex-col items-center justify-center">
            <Spinner className="h-24 w-24"/>
            </div>
        )
    }

    //main comments feed
    return (
        <div role="commentstab" className="flex flex-col w-full h-fit my-4">

            {/* if there are no comments, show no results */}
            {comments.length > 0 ? (
                <>
                {comments.map((comment, index) => (
                    <CommentComponent key={index} comment={comment} />
                ))}
                    <button ref={loadMoreButtonRef} type="button" onClick={fetchMoreComments} className="w-fit mx-auto h-fit text-white ring-1 ring-inset ring-white tbg-gray-300 px-3 py-2 bg-blue-600 rounded-full hover:bg-blue-700 hover:ring-black mb-2">Load more</button>
                </>
            ) : (
                <>
                    {/*no results view*/}
                    <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                    <p className="text-lg font-bold">looks like you haven't commented on anything</p>
                </>
            )}
        </div>
    )
}

export default ProfileComments;