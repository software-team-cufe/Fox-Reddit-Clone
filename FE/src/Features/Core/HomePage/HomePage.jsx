import React, { useEffect } from "react";
import PostComponent from "@/GeneralComponents/Post/Post";

import { useQuery } from "react-query";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { userAxios } from "@/Utils/UserAxios";
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import { useState } from "react";
import Sortmenu from "@/GeneralComponents/sortmenu/sortmenu";
import { createContext, useContext } from "react";
import BackToTop from "../../../GeneralComponents/backToTop/backToTop";
/**
 * HomePage Component
 * 
 * This component is used to display the home page of the application.
 * 
 * @component
 * 
 * @example
 * 
 * return (
 *   <HomePage />
 * )
 * 
 * @returns {JSX.Element} The HomePage component.
 * 
 * Props:
 * None
 * 
 * State:
 * - selected: A state variable used to store the selected sorting option. It's initially set to "New".
 * - period: A state variable used to store the selected period. It's initially set to "All time".
 * 
 * Children:
 * - PostComponent: A component that displays a post.
 * - Spinner: A component that displays a loading spinner.
 * - PeriodSelect: A component that allows the user to select a period.
 * - Sortmenu: A component that allows the user to select a sorting option.
 * - BackToTop: A component that allows the user to quickly navigate back to the top of the page.
 * 
 * Functions:
 * - setselected: A function that updates the value of the `selected` state variable.
 * - setperiod: A function that updates the value of the `period` state variable.
 * 
 * Context:
 * - HomeContext: A context that provides the `selected` and `period` state variables and their setter functions to child components.
 * 
 * External Libraries:
 * - react: Used for creating the component and managing state.
 * - react-query: Used for fetching data asynchronously.
 * - @/Utils/UserAxios: A custom axios instance for making requests to the user API.
 * 
 * Provider Component:
 * - HomeProvider: A provider component that holds the state and provides it to child components through the HomeContext.
 */


export const HomeContext = createContext();

// Create a provider component that holds the state
export function HomeProvider({ children }) {
  const [selected, setselected] = useState("New");
  const [period, setperiod] = useState("All time");

  return (
    <HomeContext.Provider value={{ selected, setselected, period, setperiod }}>
      {children}
    </HomeContext.Provider>
  );
}

export default function HomePage() {

  // const { selected } = { selected: "new" };
  const { selected } = useContext(HomeContext);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const handleScroll = () => {

    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setPage(page + 1)
    }
  };

  const { isLoading, isError, error, data, } = useQuery(['get-post', selected],
    (e) => userAxios.get(`/user-home${localStorage.getItem("authorization") == null ? "" : `?page=${1}&limit=500&sort=${selected.toLowerCase()}`}`)
      .then(data => {
        console.log({adsfsdfsdfsdf: e});
        setPosts(prev => {

          return [...(data?.data?.homePageAuthPosts ?? data?.data?.homePagePosts)];
        });
        return data;
      }),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [posts]);
  return (
    <div className="w-full h-full relative flex gap-10">
      <div className="w-full relative overflow-y-auto space-y-4">
        <BackToTop />
        <div className="flex -mb-3 gap-x-4">
          <div role="sortmenu"><Sortmenu context={HomeContext} /></div>
          <PeriodSelect appearance={selected} context={HomeContext} />
        </div>
        <hr />

        {
          posts?.map((e, idx) => <PostComponent role={'post'} post={e} key={idx} />)
        }
      </div>
      <div className="p-5   max-w-[600px] shadow  rounded-md border h-fit  hidden lg:flex lg:flex-col">
        <h2 className=" font-bold">Recent Posts</h2>
        <hr className="my-2" />
      </div>
    </div>
  )
}
