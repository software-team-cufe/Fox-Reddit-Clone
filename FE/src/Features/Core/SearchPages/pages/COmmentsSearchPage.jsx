import React from "react";
import { useState, useEffect } from "react";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import axios from 'axios';
import CommentComponent from "@/GeneralComponents/Comment/CommentComponent";

export default function CommentsSearchPage({ searched = "filler" }) {

  // states for collecting saved posts from request and loading state
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetch saved posts on load and put into posts array
    axios.get("http://localhost:3002/comments")
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

  if (loading) {
    return (
      <div role="commentstab" className="w-100 h-100 flex flex-col items-center justify-center">
        <Spinner className="h-24 w-24" />
      </div>
    )
  }

  return (
    <div role="commentstab" className="flex flex-col w-full max-w[756px] h-fit my-4 p-1">
      {/* if there are no saved posts, show no results */}
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index}>
            <CommentComponent comment={comment} />
            <hr className="w-full my-2 border-gray-300" />
          </div>
        ))
      ) : (
        <>
          {/*no results view*/}
          <img src={'/nosearch.svg'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
          <p className="text-lg">Hm... We couldn't find any results for<br />"{searched}"</p>
        </>
      )}
    </div>
  );
}