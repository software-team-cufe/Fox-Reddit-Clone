/**
 * Renders the PeopleSearchPage component.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.searched - The search query.
 * @returns {JSX.Element} The rendered PeopleSearchPage component.
 */
import React from "react";
import { useState, useEffect, useRef } from "react";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import UserComponent from "@/GeneralComponents/userContainer/userContainer";
import axios from 'axios';


export default function PeopleSearchPage({ searched = "filler" }) {

  const [users, setUsers] = useState([]);     // array of users to show
  const [loading, setLoading] = useState(true);   // loading state for fetching
  const [callingposts, setCallingPosts] = useState(false);
  const loadMoreButtonRef = useRef(null);
  const [pagedone, setpagedone] = useState(false);
  const [currentpage,setcurrentpage] = useState(0);
  const limitpage = 2;

  useEffect(() => {
    axios.get(`http://localhost:3002/users?_limit=${limitpage}`)  //fetch users and organize into users array for mapping
      .then(response => {
        const newUsers = response.data.map(user => ({
          id: user.userID,
          name: user.name,
          avatar: user.avatar,
          about: user.about,
          karma: user.totalKarma,
        }));

        setUsers(newUsers);
        setLoading(false);  //set loading to false after fetching to load body
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  const fetchMoreUsers = () => {
    setCallingPosts(true);
    axios.get(`http://localhost:3002/users?_start=${currentpage+limitpage}&_limit=${limitpage}`)
    .then(response => {
            if(response.data.length < limitpage) {
                setpagedone(true);
            }
            const newUsers = response.data.map(user => ({
              id: user.userID,
              name: user.name,
              avatar: user.avatar,
              about: user.about,
              karma: user.totalKarma,
            }));

            setUsers(prevUsers => [...prevUsers, ...newUsers]);
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
      <div role="peoplestab" className="w-100 h-100 flex flex-col items-center justify-center">
        <img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />
      </div>
    )
  }

  //main body of the page
  return (
    <div role="peoplestab" className="flex flex-col w-full max-w[756px] h-fit my-4 p-1">
            {/* if there are no posts, show no results */}
            {users.length > 0 ? (
                <>
                    {users.map((user, index) => (
                        <UserComponent key={index} user={user} />
                    ))}
                    {!pagedone && !callingposts && (<button ref={loadMoreButtonRef} type="button" onClick={fetchMoreUsers} className="w-fit mx-auto h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
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