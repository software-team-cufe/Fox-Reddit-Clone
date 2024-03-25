import React from "react";
import { useState,useEffect } from "react";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import UserComponent from "@/GeneralComponents/userContainer/userContainer";
import axios from 'axios';

export default function PeopleSearchPage({searched = "filler"}) { 

  // states for collecting saved posts from request and loading state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetch saved posts on load and put into posts array
    axios.get("http://localhost:3002/users")
        .then(response => {
            const newUsers = response.data.map(user => ({
                id: user.userID,
                name: user.name,
                avatar: user.avatar,
                about: user.about,
                karma: user.totalKarma,
            }));

            setUsers(newUsers);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);
        });
    });

  if (loading) {
    return (
        <div role="savedtab" className="w-100 h-100 flex flex-col items-center justify-center">
            <Spinner className="h-24 w-24" />
        </div>
    )
}

    return (
        <div role="peoplestab" className="flex flex-col w-full max-w[756px] h-fit my-4 p-1">
              {/* if there are no saved posts, show no results */}
              {users.length > 0 ? (
              users.map((post, index) => (
              <div key={index}>
                <UserComponent user={post} />
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