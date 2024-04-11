/**
 * Renders the Communities Search Page component.
 * @param {Object} props - The component props.
 * @param {string} props.searched - The search query string.
 * @returns {JSX.Element} The Communities Search Page component.
 */
import React from "react";
import { useState, useEffect } from "react";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import axios from 'axios';
import CommunityComponent from "@/GeneralComponents/CommunityContainer/CommunityContainer";


export default function PeopleSearchPage({ searched = "filler" }) {

  const [communities, setCommunities] = useState([]); // array of communities to show
  const [loading, setLoading] = useState(true); // loading state for fetching 

  useEffect(() => {
    axios.get("http://localhost:3002/communities") //fetch communities and organize into communities array for mapping
      .then(response => {
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

  // loading spinner to wait until fetch then load
  if (loading) {
    return (
      <div role="communitiestab" className="w-100 h-100 flex flex-col items-center justify-center">
        <Spinner className="h-24 w-24" />
      </div>
    )
  }

  //main body of the page
  return (
    <div role="communitiestab" className="flex flex-col w-full max-w[756px] h-fit my-4 p-1">

      {/* if there are no communities, show no results */}
      {communities.length > 0 ? (
        communities.map((community, index) => (
          <div key={index}>
            <CommunityComponent community={community} />
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