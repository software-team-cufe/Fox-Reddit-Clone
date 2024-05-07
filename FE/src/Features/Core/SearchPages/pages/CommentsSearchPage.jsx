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
import CommentComponent from "@/GeneralComponents/Comment/CommentComponent";
import { SearchContext } from "../SearchPagesRoutes";
import {userAxios} from "@/Utils/UserAxios";
import { useSelector } from "react-redux";
import axios from "axios";

export default function COmmentsSearchPage({ searched = "filler" }) {

  const { selected, period } = useContext(SearchContext);
  const [comments, setComments] = useState([]);     // array of comments to show
  const [loading, setLoading] = useState(true);     // loading state for fetching
  const [callingposts, setCallingPosts] = useState(false);
  const loadMoreButtonRef = useRef(null);
  const [pagedone, setpagedone] = useState(false);
  const [currentpage, setcurrentpage] = useState(0);
  const limitpage = 5;
  const userRedux = useSelector(state => state.user);
  
  useEffect(() => {
    setLoading(true);
    if(userRedux == null){
    userAxios.get(`/r/search/?q=${searched}&type=comment&page=1&limit=${limitpage}&sort=${selected}`)
      .then(response => {
        let newComments = response.data.commentsSearchResultNotAuth.map(comment => ({
          user: {
            image: comment.useravatar[0],
            Username: comment.username[0],
            id: comment.userId
          },
          info: {
            votes: comment.commentvotesCount,
            time: comment.commentcreatedAt,
          },
          content: {
            text: comment.textHTML
          }
      }));
        if (newComments.length < limitpage) {
          setpagedone(true);
        }
        setComments(newComments);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
    } else {
      userAxios.get(`/r/search/?q=${searched}&type=comment&page=1&limit=${limitpage}&sort=${selected}`)
      .then(response => {
        let newComments = response.data.commentsSearchResultAuth.map(comment => ({
          user: {
            image: comment.useravatar[0],
            Username: comment.username[0],
            id: comment.userId
          },
          info: {
            votes: comment.commentvotesCount,
            time: comment.commentcreatedAt,
          },
          content: {
            text: comment.textHTML
          }
      }));
        if (newComments.length < limitpage) {
          setpagedone(true);
        }
        setComments(newComments);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
    }
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
        <img src={'/logo.png'} className="h-12 w-12 mt-10 mx-auto animate-ping" alt="Logo" />
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