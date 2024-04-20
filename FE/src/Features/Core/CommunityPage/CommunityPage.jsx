
/**
 * This file represents the CommunityPage component.
 * It displays a community page with posts, sorting options, and community information.
 * The component uses React Router for routing and axios for making HTTP requests.
 * It also utilizes React Query for data fetching and state management.
 * The component is wrapped in a CommunityProvider component that provides the selected sorting and period values.
 * @file FILEPATH
 */
import React, { useContext, createContext, useEffect, useState, useRef } from "react";
import Sortmenu from "@/GeneralComponents/sortmenu/sortmenu";
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from '@/GeneralElements/Spinner/Spinner';
import PostComponent from "@/GeneralComponents/Post/Post";
import { Plus } from 'lucide-react';
import bellMenu from "./accessories/bellmenu";
import OptionsMenu from "./accessories/optionsmenu";
import MainFooter from "./footers/mainFooter";
import { userStore } from "@/hooks/UserRedux/UserStore";
import LoginFirtstModal from "./accessories/loginFirstModal";
import BackToTop from "@/GeneralComponents/backToTop/backToTop";
import { useQuery } from "react-query";
import { userAxios } from "../../../Utils/UserAxios";
import { toast } from 'react-toastify';
//helping functions for the notifications frequency and options menu

export const CommunityContext = createContext({
  selected: "New",
  setselected: (selected) => { },
  period: "All time",
  setperiod: (period) => { },
});

// Create a provider component that holds the state
export function CommunityProvider({ children }) {
  const [selected, setselected] = useState("New");
  const [period, setperiod] = useState("All time");

  return (
    <CommunityContext.Provider value={{ selected, setselected, period, setperiod }}>
      {children}
    </CommunityContext.Provider>
  );
}


export default function CommunityPage() {
  const { community } = useParams();                  // get the community name from the url
  const path = useLocation();                          // get the current path
  const { period, selected } = useContext(CommunityContext);  // get the selected sorting and period
  const [Posts, setPosts] = useState([]);              // store the Posts data
  const user = userStore.getState().user;             // get the user data
  const [showModal, setShowModal] = useState(false);
  const navigator = useNavigate();
  const loadMoreButtonRef = useRef(null);
  const [callingposts, setCallingPosts] = useState(false);
  const [pagedone, setpagedone] = useState(false);
  const limitpage = 5;
  const [currentpage,setcurrentpage] = useState(1);
  const [feed, setFeed] = useState(false);
  const [comm, setComm] = useState(null);

    //to fetch the community data from the server and use them
    const fetchCommunity = async () => {
      const response = await axios.get(`http://localhost:3002/communities`);
      const commData = response.data.find((commresponse) => commresponse.name === community);
      setComm(commData);
  };
  
  let {isLoading: loading, error } = useQuery('fetchCommunity', fetchCommunity, { staleTime: Infinity, retry: 0, refetchOnWindowFocus: false });

  const fetchInitialPosts = () => {
    setFeed(true);
    let link = `api/listing/posts/r/${comm.name}/${selected.toLocaleLowerCase()}?page=1&limit=${limitpage}`;
    if (selected == 'Top'){
      link = link +`&t=${period}`;
    }
    userAxios.get(link)
      .then((response) => {
        const newPosts = response.data.map(post => ({
          subReddit: {
            image: comm.icon,
            title: post.communityName,
          },
          images: post.attachments,
          id: post._id,
          title: post.title,
          subTitle: post.textHTML,
          votes: post.votesCount,
          comments: post.postComments.length,
          thumbnail: post.attachments[0],
          video: null
        }));
        setcurrentpage(2);
        setPosts(newPosts);
        setFeed(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setFeed(false);
      })};
  
      const { error: postsError } = useQuery(['fetchInitialPosts', selected, period],fetchInitialPosts, {enabled: !loading, retry: 0, refetchOnWindowFocus: false });

  const swtichJoinState = () => {
    if (user.user == null) {
      setShowModal(true);
      return;
    }
    axios.patch(`http://localhost:3002/communities/${comm.id}`, { joined: !comm.joined })
      .then(() => {
        if(comm.joined) {
        toast.success(`r/${comm.name} ${comm.joined ? 'unjoined' : 'joined'}!`)
        } else {
          toast.success(`r/${comm.name} ${comm.joined ? 'unjoined' : 'joined'}!`)
        }
        setComm({ ...comm, joined: !comm.joined });
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  const CreatePostHandle = () => {
    if (user.user == null) {
      setShowModal(true);
      return;
    }
    navigator('/submit');
  }

  const fetchMorePosts = () => {
    setCallingPosts(true);
    let link = `api/listing/posts/r/${comm.name}/${selected.toLocaleLowerCase()}?page=${currentpage}&limit=${limitpage}`;
    if (selected == 'Top'){
      link = link +`&t=${period}`;
    }
    userAxios.get(link)
    .then(response => {
        if(response.data.length <limitpage){
            setpagedone(true);
        }
        const newPosts = response.data.map(post => ({
          subReddit: {
            image: comm.icon,
            title: post.communityName,
          },
          images: post.attachments,
          id: post._id,
          title: post.title,
          subTitle: post.textHTML,
          votes: post.votesCount,
          comments: post.postComments.length,
          thumbnail: post.attachments[0],
          video: null
        }));

        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setCallingPosts(false);
        setcurrentpage(1+currentpage);

      })
      .catch(error => {
        console.error('Error:', error);
        setCallingPosts(false);
      });
  };

  //to handle loading until fetch is complete
  if (loading) {
    return (
      <div role="communitypage" className="w-100 h-100 flex flex-col items-center justify-center">
        <img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />
      </div>
    )
  }

  //main body of the page

  return (
    <div role="communitypage">
      <div className={`flex-1 -mt-4 md:w-3/4 w-full md:mx-auto relative`}>
        {showModal && <LoginFirtstModal onClose={setShowModal} />}
        <BackToTop />
        {/* background image of the community */}
        <img src={comm.backimage} alt='community' className='w-full md:mx-auto h-20 md:h-36 md:rounded-lg object-cover' />

        {/* community name and (members count in mobile mode)*/}
        <div className='w-full relative flex justify-between items-center m-3'>
          <div>
            <img src={comm.icon} alt='community' className='absolute md:-top-16 -top-2 broder-white md:border-4 border-2 md:w-24 w-12 md:h-24 h-12 rounded-full' />
            <span className='absolute md:top-2 top-0 md:left-28 left-16 md:text-3xl text-lg font-bold'>r/{community}</span>
            <div className='absolute md:top-10 top-[28px] md:left-28 left-16 md:hidden text-xs font-semibold text-gray-500 flex flex-wrap gap-x-3'>
              <div>{comm.membersCount} members</div>
              <div>{comm.onlineMembers} online</div>
            </div>
          </div>

          {/* create post, bell and options menu in desktop mode */}
          <div className='hidden mr-6 md:flex md:gap-2 md:justify-between'>
<<<<<<< HEAD
            <button id="commCreatePost" role="createPostButton" className={`rounded-full flex gap-1 justify-center border border-gray-600 w-fit px-4 h-10 items-center hover:border-black`} onClick={CreatePostHandle}>
=======
            <button role="createPostButton" className={`rounded-full flex gap-1 justify-center border border-gray-600 w-fit px-4 h-10 items-center hover:border-black`} onClick={CreatePostHandle}>
>>>>>>> origin/newnew-nadine
              <Plus className="w-4 h-4" />
              <span className='inline font-bold text-sm'>Create a post</span>
            </button>
            <button role="joinButton" className={`rounded-full w-fit px-4 h-10 items-center  ${comm.joined ? 'border-gray-700 border-[1px] hover:border-black' : 'hover:bg-blue-600 bg-blue-700'}`} onClick={() => swtichJoinState()}>
              <span className={`inline font-bold text-sm ${comm.joined ? 'text-black' : 'text-white'}`}>{comm.joined ? 'Joined' : 'Join'}</span>
            </button>
            {comm.joined ? bellMenu() : <></>}
            {user.user ? <OptionsMenu comm={comm} setComm={setComm}/>: <></>}
          </div>
        </div>

        {/* create post, bell and options menu in mobile mode */}
        <div className='flex gap-2 md:justify-between ml-3 mr-6 md:hidden mt-[62px]'>
<<<<<<< HEAD
          <button id="commCreatePost" role="createPostButton" className={`rounded-full flex gap-1 justify-center border border-gray-600 w-fit px-4 h-10 items-center hover:border-black`} onClick={CreatePostHandle}>
=======
          <button role="createPostButton" className={`rounded-full flex gap-1 justify-center border border-gray-600 w-fit px-4 h-10 items-center hover:border-black`} onClick={CreatePostHandle}>
>>>>>>> origin/newnew-nadine
            <Plus className="w-4 h-4" />
            <span className='inline font-bold text-sm'>Create a post</span>
          </button>
          <button role="joinButton" className={`rounded-full w-fit px-4 h-10 items-center  ${comm.joined ? 'border-gray-700 border-[1px] hover:border-black' : 'hover:bg-blue-600 bg-blue-700'}`} onClick={() => swtichJoinState()}>
            <span className={`inline font-bold text-xs ${comm.joined ? 'text-black' : 'text-white'}`}>{comm.joined ? 'Joined' : 'Join'}</span>
          </button>
          {comm.joined ? bellMenu() : <></>}
          {user.user ? <OptionsMenu comm={comm} setComm={setComm}/> : <></>}
        </div>

        {/* the feed with its sort elements and the community description and rules and other tools on the right*/}
        <div className='gap-3 flex'>

          {/* the feed and the sort elements (buttons for feed and about page traversal in mobile mode)*/}
          <div className='min-w-[70%] w-screen md:w-[75%] flex-initial gap-3 ml-3'>
            <br />
            <div className='flex justify-between md:justify-end'>

              {/* page buttons for mobile mode*/}
              <div className='flex gap-2 md:hidden'>
<<<<<<< HEAD
                <Link id="toCommFeed" to={`/r/${comm.name}`} className={`rounded-full font-sans text-sm font-semibold w-fit px-4 py-2 h-fit ${path.pathname == `/r/${comm.name}` ? "bg-gray-300" : "bg-white"}`} >feed</Link>
                <Link id="toCommAbout" to={`/r/${comm.name}/about`} className={`rounded-full font-sans text-sm font-semibold w-fit px-4 py-2 h-fit ${path.pathname == `/r/${comm.name}/about` ? "bg-gray-300" : "bg-white"}`} >about</Link>
=======
                <Link to={`/r/${comm.name}`} className={`rounded-full font-sans text-sm font-semibold w-fit px-4 py-2 h-fit ${path.pathname == `/r/${comm.name}` ? "bg-gray-300" : "bg-white"}`} >feed</Link>
                <Link to={`/r/${comm.name}/about`} className={`rounded-full font-sans text-sm font-semibold w-fit px-4 py-2 h-fit ${path.pathname == `/r/${comm.name}/about` ? "bg-gray-300" : "bg-white"}`} >about</Link>
>>>>>>> origin/newnew-nadine
              </div>

              {/* sort elements for the feed*/}
              <div className='flex gap-2'>
                <Sortmenu context={CommunityContext} />
                <PeriodSelect appearance={selected} context={CommunityContext} />
              </div>
            </div>
            <hr className="w-full border-1 border-gray-300 mt-2" />

            {/* the feed of the community*/}
            {!feed ? (<div role="communityFeed" className="flex flex-col md:w-full w-full h-fit my-4 items-center">
              {/* if there are no Posts, show no results */}
              {Posts.length > 0 ? (
                <>
                  {Posts.map((post, index) => (
                    <PostComponent key={index} post={post} />
                  ))}
<<<<<<< HEAD
                  {!pagedone && !callingposts && (<button id="loadMoreButton" ref={loadMoreButtonRef} type="button" onClick={fetchMorePosts} className="w-fit h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
=======
                  {!pagedone && !callingposts && (<button ref={loadMoreButtonRef} type="button" onClick={fetchMorePosts} className="w-fit h-fit my-2 px-3 py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
>>>>>>> origin/newnew-nadine
                  {callingposts && (<img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />)}
                </>
              ) : (
                <>{/*no results view*/}
                  <p className="text-xl font-bold text-center mt-2">This community doesn't have any Posts yet</p>
                  <p className="text-md font-semibold text-center mb-3">Make one and get this feed started.</p>
<<<<<<< HEAD
                  <button id="noDataCreatePost" role="createPostButton" className={`rounded-full text-white flex gap-1 justify-center bg-blue-600 w-fit px-4 h-10 items-center hover:bg-blue-700`} onClick={CreatePostHandle}>
=======
                  <button role="createPostButton" className={`rounded-full text-white flex gap-1 justify-center bg-blue-600 w-fit px-4 h-10 items-center hover:bg-blue-700`} onClick={CreatePostHandle}>
>>>>>>> origin/newnew-nadine
                    <Plus className="w-4 h-4" />
                    <span className='inline font-bold text-sm'>Create a post</span>
                  </button>
                </>
              )}</div>
            ) : (
              <div className="w-100 h-100 flex flex-col items-center justify-center">
                <img src={'/logo.png'} className="h-12 mt-24 w-12 mx-auto animate-ping" alt="Logo" />
              </div>
            )}
          </div>

          {/* community description and rules and other tools on the right*/}
          <MainFooter comm={comm} />
        </div>
      </div>
    </div>

  )
}