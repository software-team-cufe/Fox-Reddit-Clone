/**
 * Renders the Comments Search Page component.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.searched - The search query string.
 * @returns {JSX.Element} The Comments Search Page component.
 */
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import axios from 'axios';
import CommentComponent from "@/GeneralComponents/Comment/CommentComponent";
import { SearchContext } from "../SearchPagesRoutes";


export default function COmmentsSearchPage({ searched = "filler" }) {

  const { selected, period } = useContext(SearchContext);
  const [comments, setComments] = useState([]);     // array of comments to show
  const [loading, setLoading] = useState(true);     // loading state for fetching


  useEffect(() => {
    setLoading(true);    //set loading to true before fetching
    axios.get("http://localhost:3002/comments")   //fetch comments and organize into comments array for mapping
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
        setLoading(false);    //set loading to false after fetching to load body
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [selected, period, searched]);

  // loading spinner to wait until fetch then load
  if (loading) {
    return (
      <div role="commentstab" className="w-100 h-100 flex flex-col items-center justify-center">
        <Spinner className="h-24 w-24" />
      </div>
    )
  }
  //main body of the page
  return (
    <div role="commentstab" className="flex flex-col w-full max-w[756px] h-fit my-4 p-1">

      {/* if there are no comments, show no results */}
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