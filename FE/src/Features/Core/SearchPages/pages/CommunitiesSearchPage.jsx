/**
 * Renders the Communities Search Page component.
 * @param {Object} props - The component props.
 * @param {string} props.searched - The search query string.
 * @returns {JSX.Element} The Communities Search Page component.
 */
import React from "react";
import { useState, useEffect, useRef } from "react";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import axios from 'axios';
import CommunityComponent from "@/GeneralComponents/CommunityContainer/CommunityContainer";


export default function PeopleSearchPage({ searched = "filler" }) {

  const [communities, setCommunities] = useState([]); // array of communities to show
  const [loading, setLoading] = useState(true); // loading state for fetching 
  const [callingposts, setCallingPosts] = useState(false);
  const loadMoreButtonRef = useRef(null);
  const [pagedone, setpagedone] = useState(false);
  const [currentpage,setcurrentpage] = useState(0);
  const limitpage = 5;

  useEffect(() => {
    axios.get(`http://localhost:3002/communities?_limit=${limitpage}`) //fetch communities and organize into communities array for mapping
      .then(response => {
        if (response.data.length < limitpage) {
          setpagedone(true);
        }
        const newComms = response.data.map(comm => ({
          id: comm.commID,
          name: comm.name,
          icon: comm.icon,
          about: comm.description,
          online: comm.onlineMembers,
          members: comm.membersCount
        }));

        setCommunities(newComms);
        setLoading(false); //set loading to false after fetching to load body
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [searched]);

  const fetchMoreComms= () => {
    setCallingPosts(true);
    axios.get(`http://localhost:3002/communities?_start=${currentpage+limitpage}&_limit=${limitpage}`)
    .then(response => {
            if(response.data.length < limitpage) {
                setpagedone(true);
            }
            const newComms = response.data.map(comm => ({
              id: comm.commID,
              name: comm.name,
              icon: comm.icon,
              about: comm.description,
              online: comm.onlineMembers,
              members: comm.membersCount
            }));

            setCommunities(prevComms => [...prevComms, ...newComms]);
            setCallingPosts(false);
            setcurrentpage(limitpage+currentpage);

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