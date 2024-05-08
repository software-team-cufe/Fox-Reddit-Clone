import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import PostComponent from "@/GeneralComponents/Post/Post";
import { SearchContext } from "../SearchPagesRoutes";
import { userAxios } from "@/Utils/UserAxios";
import { useSelector } from "react-redux";

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
  const [currentpage, setcurrentpage] = useState(2);
  const userRedux = useSelector(state => state.user);
  const limitpage = 5;

  useEffect(() => {
    setLoading(true);    //set loading to true before fetching
    let searchPeriod = "";
    switch (period) {
      case "All time": searchPeriod = "all";
        break;
      case "Past year": searchPeriod = "year";
        break;
      case "Past month": searchPeriod = "month";
        break;
      case "Past week": searchPeriod = "week";
        break;
      case "Past 24 hours": searchPeriod = "day";
        break;
      case "Past hour": searchPeriod = "hour";
        break;
    }

    userAxios.get(`r/search/?q=${searched}&type=link&page=1&limit=${limitpage}&sort=${selected}&sortBy=${searchPeriod}`)
      .then(response => {
        console.log(response.data);
        if (userRedux == null) {
          const newPosts = response.data.postsSearchResultsNotAuth.map(post => ({
            communityName: post.communityName,
            communityIcon: post.communityIcon,
            images: post.attachments,
            postId: post.postId,
            title: post.title,
            textHTML: post.textHTML,
            votesCount: post.votesCount,
            comments: post.commentsCount,
            thumbnail: post.thumbnail,
            video: null,
            type: "post",
            spoiler: post.spoiler,
            NSFW: post.nsfw
          }))
          if (newPosts.length < limitpage) {
            setpagedone(true);
          }
          setPosts(newPosts);
        }
        else {
          const newPosts = response.data.postsSearchResultAuth.map(post => ({
            communityName: post.communityName,
            communityIcon: post.communityIcon,
            images: post.attachments,
            postId: post.postId,
            title: post.title,
            textHTML: post.textHTML,
            votesCount: post.votesCount,
            comments: post.commentsCount,
            thumbnail: post.thumbnail,
            video: null,
            type: "post",
            spoiler: post.spoiler,
            NSFW: post.nsfw
          }))
          console.log(newPosts);
          if (newPosts.length < limitpage) {
            setpagedone(true);
          }
          setPosts(newPosts);
        }
        setLoading(false);   //set loading to false after fetching to load body
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [searched, selected, period]);

  const fetchMorePosts = () => {
    setCallingPosts(true);    //set loading to true before fetching
    let searchPeriod = "";
    switch (period) {
      case "All time": searchPeriod = "all";
        break;
      case "Past year": searchPeriod = "year";
        break;
      case "Past month": searchPeriod = "month";
        break;
      case "Past week": searchPeriod = "week";
        break;
      case "Past 24 hours": searchPeriod = "day";
        break;
      case "Past hour": searchPeriod = "hour";
        break;
    }

    userAxios.get(`r/search/?q=${searched}&type=link&page=${currentpage}&limit=${limitpage}&sort=${selected}&sortBy=${searchPeriod}`)
      .then(response => {
        if (userRedux == null) {
          const newPosts = response.data.postsSearchResultNotAuth.map(post => ({
            communityName: post.communityName,
            communityIcon: post.communityIcon,
            images: post.attachments,
            postId: post.postId,
            title: post.title,
            description: post.textHTML,
            votesCount: post.votesCount,
            comments: post.commentsCount,
            thumbnail: post.thumbnail,
            video: null,
            type: "post",
            spoiler: post.spoiler,
            NSFW: post.nsfw
          }))
          if (newPosts.length < limitpage) {
            setpagedone(true);
          }
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
        }
        else {
          const newPosts = response.data.postsSearchResultAuth.map(post => ({
            communityName: post.communityName,
            communityIcon: post.communityIcon,
            images: post.attachments,
            postId: post.postId,
            title: post.title,
            description: post.textHTML,
            votesCount: post.votesCount,
            comments: post.commentsCount,
            thumbnail: post.thumbnail,
            video: null,
            type: "post",
            spoiler: post.spoiler,
            NSFW: post.nsfw
          }))
          if (newPosts.length < limitpage) {
            setpagedone(true);
          }
          console.log(newPosts);
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
        }
        setcurrentpage(currentpage + 1);
        setCallingPosts(false);   //set loading to false after fetching to load body
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  // loading spinner to wait until fetch then load
  if (loading) {
    return (
      <div role="poststab" className="w-100 h-100 flex flex-col items-center justify-center">
        <img src={'/logo.png'} className="h-12 w-12 mt-10 mx-auto animate-ping" alt="Logo" />
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