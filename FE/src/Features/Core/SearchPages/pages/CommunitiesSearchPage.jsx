import React from "react";
import { useState,useEffect } from "react";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import axios from 'axios';
import CommunityComponent from "@/GeneralComponents/CommunityContainer/CommunityContainer";

export default function PeopleSearchPage({searched = "filler"}) { 

  // states for collecting saved posts from request and loading state
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetch saved posts on load and put into posts array
    axios.get("http://localhost:3002/communities")
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
            setLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);
        });
    }, []);

  if (loading) {
    return (
        <div role="communititestab" className="w-100 h-100 flex flex-col items-center justify-center">
            <Spinner className="h-24 w-24" />
        </div>
    )
}

    return (
        <div role="communitiestab" className="flex flex-col w-full max-w[756px] h-fit my-4 p-1">
              {/* if there are no saved posts, show no results */}
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
              <p className="text-lg">Hm... We couldn't find any results for<br/>"{searched}"</p>
            </>
          )}
        </div>
    );
  }