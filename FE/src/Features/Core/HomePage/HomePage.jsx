import React from "react";
import PostComponent from "@/GeneralComponents/Post/Post";
import { fakePosts } from "./fakePosts";
import { useQuery } from "react-query";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { userAxios } from "@/Utils/UserAxios";
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import { useState } from "react";
import Sortmenu from "@/GeneralComponents/sortmenu/sortmenu";
import { createContext, useContext } from "react";


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

  const { selected } = useContext(HomeContext);
  const { isLoading, isError, error, data, } = useQuery('get-post',
    () => userAxios.get("posts"),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    });
  if (isLoading) return <Spinner />;

  return (
    <div className="w-full h-full flex gap-10">

      <div className="w-full overflow-y-auto space-y-4">
        <div className="flex -mb-3 gap-x-4">
          <div role="sortmenu"><Sortmenu context={HomeContext} /></div>
          <PeriodSelect appearance={selected} context={HomeContext} />
        </div>
        <hr />
        {
          fakePosts.map((e, idx) => <PostComponent role={'post'} post={e} key={idx} />)
        }
      </div>
      <div className="p-5   max-w-[600px] shadow  rounded-md border h-fit  hidden lg:flex lg:flex-col">
        <h2 className=" font-bold">Recent Posts</h2>
        <hr className="my-2" />
      </div>
    </div>
  )
}
