import React, {useContext} from "react";
import { useState, useEffect } from "react";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import axios from 'axios';
import PostComponent from "@/GeneralComponents/Post/Post";
import { SearchContext } from "../SearchPagesRoutes";

export default function PeopleSearchPage({ searched = "filler" }) {

  const { selected, period } = useContext(SearchContext);
  const [posts, setPosts] = useState([]);     // array of posts to show
  const [loading, setLoading] = useState(true);   // loading state for fetching

  useEffect(() => {
    setLoading(true);    //set loading to true before fetching
    axios.get("http://localhost:3002/posts")    //fetch posts and organize into posts array for mapping
      .then(response => {
        const newPosts = response.data.map(post => ({
          subReddit: {
            image: post.attachments.subredditIcon,
            title: post.communityName,
        },
        images: post.attachments.postData,
        id: post.postID,
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

  // loading spinner to wait until fetch then load
  if (loading) {
    return (
      <div role="poststab" className="w-100 h-100 flex flex-col items-center justify-center">
        <Spinner className="h-24 w-24" />
      </div>
    )
  }

  //main body of the page
  return (
    <div role="poststab" className="flex flex-col w-full max-w[756px] h-fit my-4 p-1">

      {/* if there are no posts, show no results */}
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index}>
            <PostComponent post={post} />
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