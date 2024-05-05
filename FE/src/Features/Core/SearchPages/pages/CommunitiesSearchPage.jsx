/**
 * Renders the Communities Search Page component.
 * @param {Object} props - The component props.
 * @param {string} props.searched - The search query string.
 * @returns {JSX.Element} The Communities Search Page component.
 */
import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import CommunityComponent from "@/GeneralComponents/CommunityContainer/CommunityContainer";
import { userAxios } from "@/Utils/UserAxios";
import { useSelector } from "react-redux";

export default function PeopleSearchPage({ searched = "filler" }) {

  const [communities, setCommunities] = useState([]); // array of communities to show
  const [loading, setLoading] = useState(true); // loading state for fetching 
  const [callingposts, setCallingPosts] = useState(false);
  const loadMoreButtonRef = useRef(null);
  const [pagedone, setpagedone] = useState(false);
  const [currentpage, setcurrentpage] = useState(2);
  const limitpage = 5;
  const reduxUser = useSelector(state => state.user);

  useEffect(() => {
    userAxios.get(`r/search/?q=${searched}&type=sr&page=1&limit=${limitpage}`)  //fetch users and organize into users array for mapping
      .then(response => {
        let newComms = [];
        if (reduxUser) {
          newComms = response.data.communitySearchResultAuth.map(comm => ({
            id: comm._id,
            name: comm.name,
            icon: comm.icon,
            about: comm.about,
            online: 432,
            members: comm.membersCnt,
          }))
        }
        else {
          newComms = response.data.communitySearchResultNotAuth.map(comm => ({
            id: comm._id,
            name: comm.name,
            icon: comm.icon,
            about: comm.about,
            online: 432,
            members: comm.membersCnt,
          }))
        }
    if (newComms.length < limitpage) {
      setpagedone(true);
    }
    setCommunities(newComms);
    setLoading(false); //set loading to false after fetching to load body
  })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });
}, [searched]);

const fetchMoreComms = () => {
  setCallingPosts(true);
  userAxios.get(`r/search/?q=${searched}&type=sr&page=${currentpage}&limit=${limitpage}`)  //fetch users and organize into users array for mapping
  .then(response => {
    let newComms = [];
    if (reduxUser) {
      newComms = response.data.communitySearchResultAuth.map(comm => ({
        id: comm._id,
        name: comm.name,
        icon: comm.icon,
        about: comm.about,
        online: 432,
        members: comm.membersCnt,
      }))
    }
    else {
      newComms = response.data.communitySearchResultNotAuth.map(comm => ({
        id: comm._id,
        name: comm.name,
        icon: comm.icon,
        about: comm.about,
        online: 432,
        members: comm.membersCnt,
      }))
    }
        if (newComms.length < limitpage) {
      setpagedone(true);
    }
      setCommunities(prevComms => [...prevComms, ...newComms]);
      setCallingPosts(false);
      setcurrentpage(1 + currentpage);

    })
    .catch(error => {
      console.error('Error:', error);
      setCallingPosts(false);
    });
};

// loading spinner to wait until fetch then load
if (loading) {
  return (
    <div role="communitiestab" className="w-100 h-100 flex flex-col items-center justify-center">
      <img src={'/logo.png'} className="h-12 w-12 mt-10 mx-auto animate-ping" alt="Logo" />
    </div>
  )
}

//main body of the page
return (
  <div role="communitiestab" className="flex flex-col w-full max-w[756px] h-fit my-4 p-1">
    {/* if there are no posts, show no results */}
    {communities.length > 0 ? (
      <>
        {communities.map((comm, index) => (
          <CommunityComponent key={index} community={comm} />
        ))}
        {!pagedone && !callingposts && (<button id="loadMoreButton" ref={loadMoreButtonRef} type="button" onClick={fetchMoreComms} className="w-fit mx-auto h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
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