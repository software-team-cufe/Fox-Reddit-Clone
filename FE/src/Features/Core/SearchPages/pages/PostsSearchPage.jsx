import React, { useContext,useRef } from "react";
import { useState, useEffect } from "react";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import axios from 'axios';
import PostComponent from "@/GeneralComponents/Post/Post";
import { SearchContext } from "../SearchPagesRoutes";

/**
 * Renders the People Search page.
 *
 * @param {Object} props - The component props.
 * @param {string} props.searched - The search query string.
 * @returns {JSX.Element} The People Search page component.
 */
export default function PeopleSearchPage({ searched = "filler" }) {

  const { selected, period } = useContext(SearchContext);
  const [Posts, setPosts] = useState([]);     // array of posts to show
  const [loading, setLoading] = useState(true);   // loading state for fetching
  const [callingposts, setCallingPosts] = useState(false);
  const loadMoreButtonRef = useRef(null);
  const [pagedone, setpagedone] = useState(false);
  const [currentpage, setcurrentpage] = useState(0);
  const limitpage = 2;

  useEffect(() => {
    setLoading(true);    //set loading to true before fetching
    axios.get(`http://localhost:3002/posts?_limit=${limitpage}`)
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
        setLoading(false);   //set loading to false after fetching to load body
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [searched, selected, period]);

  const fetchMorePosts = () => {
    setCallingPosts(true);
    axios.get(`http://localhost:3002/posts?_start=${currentpage + limitpage}&_limit=${limitpage}`)
      .then(response => {
        if (response.data.length < limitpage) {
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
      <div role="poststab" className="w-100 h-100 flex flex-col items-center justify-center">
        <img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />
      </div>
    )
  }

  //main body of the page
  return (
    <div role="poststab" className="flex flex-col w-full max-w[756px] h-fit my-4 p-1">
      {/* if there are no posts, show no results */}
      {Posts.length > 0 ? (
        <>
          {Posts.map((post, index) => (
            <PostComponent key={index} post={post} />
          ))}
          {!pagedone && !callingposts && (<button id="loadMoreButton" ref={loadMoreButtonRef} type="button" onClick={fetchMorePosts} className=" mx-auto w-fit h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
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