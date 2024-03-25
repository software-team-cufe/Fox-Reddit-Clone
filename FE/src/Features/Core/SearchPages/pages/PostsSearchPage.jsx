import React from "react";
import { useState, useEffect } from "react";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import axios from 'axios';
import PostComponent from "@/GeneralComponents/Post/Post";

export default function PeopleSearchPage({ searched = "filler" }) {

  // states for collecting saved posts from request and loading state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetch saved posts on load and put into posts array
    axios.get("http://localhost:3002/posts")
      .then(response => {
        const newPosts = response.data.map(post => ({
          subReddit: {
            image: post.attachments.subredditIcon,
            title: post.communityName,
          },
          context: post.attachments.postData,
          id: post.postID,
          title: post.title,
          subTitle: post.postText,
          votes: post.votesCount,
          comments: post.commentsCount,
        }));

        setPosts(newPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div role="poststab" className="w-100 h-100 flex flex-col items-center justify-center">
        <Spinner className="h-24 w-24" />
      </div>
    )
  }

  return (
    <div role="poststab" className="flex flex-col w-full max-w[756px] h-fit my-4 p-1">
      {/* if there are no saved posts, show no results */}
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