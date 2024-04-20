/**
 * Renders the Comments Search Page component.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.searched - The search query string.
 * @returns {JSX.Element} The Comments Search Page component.
 */
import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import axios from 'axios';
import CommentComponent from "@/GeneralComponents/Comment/CommentComponent";
import { SearchContext } from "../SearchPagesRoutes";


export default function COmmentsSearchPage({ searched = "filler" }) {

  const { selected, period } = useContext(SearchContext);
  const [comments, setComments] = useState([]);     // array of comments to show
  const [loading, setLoading] = useState(true);     // loading state for fetching
  const [callingposts, setCallingPosts] = useState(false);
  const loadMoreButtonRef = useRef(null);
  const [pagedone, setpagedone] = useState(false);
  const [currentpage, setcurrentpage] = useState(0);
  const limitpage = 2;

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3002/comments?_limit=${limitpage}`)
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
    setCallingPosts(true);
    axios.get(`http://localhost:3002/comments?_start=${currentpage + limitpage}&_limit=${limitpage}`)
      .then(response => {
        if (response.data.length < limitpage) {
          setpagedone(true);
        }
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
        setCallingPosts(false);
        setcurrentpage(limitpage + currentpage);

      })
      .catch(error => {
        console.error('Error:', error);
        setCallingPosts(false);
      });
  };

  // loading spinner to wait until fetch then load
  if (loading) {
    return (
      <div role="commentstab" className="w-100 h-100 flex flex-col items-center justify-center">
        <img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />
      </div>
    )
  }
  //main body of the page
  return (
    <div role="commentstab" className="flex flex-col w-full max-w[756px] h-fit my-4 p-1">
      {/* if there are no posts, show no results */}
      {comments.length > 0 ? (
        <>
          {comments.map((comment, index) => (
            <CommentComponent key={index} comment={comment} />
          ))}
          {!pagedone && !callingposts && (<button id="loadMoreButton" ref={loadMoreButtonRef} type="button" onClick={fetchMoreComments} className="w-fit mx-auto h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
          {callingposts && (<img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />)}
        </>
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