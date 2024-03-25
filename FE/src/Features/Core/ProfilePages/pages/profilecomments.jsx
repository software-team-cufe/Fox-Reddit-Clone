import React, { useEffect, useState } from "react";
import axios from 'axios';
import CommentComponent from "@/GeneralComponents/Comment/CommentComponent";
import { comment } from "postcss";
import Spinner from "@/GeneralElements/Spinner/Spinner";
function ProfileComments({using}) {

    // states for collecting comments from request and loading state
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    //fetch comments on load and put into comments array
    useEffect( () => {
        axios.get("http://localhost:3002/comments")
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
    }, []);

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
        <div role="commentstab" className="flex flex-col w-full h-fit my-4 items-center">

            {/* if there are no comments, show no results */}
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <CommentComponent key={index} comment={comment} />
                ))
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