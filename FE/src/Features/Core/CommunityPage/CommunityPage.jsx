import React, { useContext, createContext, useEffect, useState } from "react";
import Sortmenu from "@/GeneralComponents/sortmenu/sortmenu";
import PeriodSelect from "@/GeneralComponents/PeriodSelect/PeriodSelect";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from '@/GeneralElements/Spinner/Spinner';
import PostComponent from "@/GeneralComponents/Post/Post";
import { Plus } from 'lucide-react';
import bellMenu from "./accessories/bellmenu";
import optionsMenu from "./accessories/optionsmenu";
import MainFooter from "./footers/mainFooter";
import { userStore } from "@/hooks/UserRedux/UserStore";
import LoginFirtstModal from "./accessories/loginFirstModal";

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
  const [comm, setcommunity] = useState({});        // store the community data
  const [loading, setLoading] = useState(true);          // check if the data is loading
  const path = useLocation();                          // get the current path
  const { period, selected } = useContext(CommunityContext);  // get the selected sorting and period
  const [posts, setposts] = useState([]);              // store the posts data
  const [feed, setfeed] = useState(true);                // store the feed loading state
  const user = userStore.getState().user;             // get the user data
  const [showModal, setShowModal] = useState(false);
  const navigator = useNavigate();

  const swtichJoinState = () => {
    if(user.user == null){
      setShowModal(true);
      return;
    }
    axios.patch(`http://localhost:3002/communities?id=2`, { joined: !comm.joined })
      .then(() => {
        console.log('Community joined state changed!');
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  const CreatePostHandle = () => {
    if(user.user == null){
      setShowModal(true);
      return;
    }
    navigator('/createpost');
  }
  
  //to fetch the community data from the server and use them
  useEffect(() => {
    axios.get(`http://localhost:3002/communities`)
      .then((response) => {
        response.data.map((commresponse) => {
          if (commresponse.name === community) {
            setcommunity(commresponse);
            setLoading(false);
          }
        });
      }).catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  useEffect(() => {
    setfeed(true);
    axios.get(`http://localhost:3002/posts`)
    .then((response) => {
      const newPosts = response.data.map(post => ({
        subReddit: {
          image: post.attachments.subredditIcon,
          title: post.communityName,
        },
        images: post.attachments.postData,
        id: post.postID,
        title: post.title,
        subTitle: post.postText,
        votes: post.votesCount,
        comments: post.commentsCount,
        thumbnail: post.thumbnail,
        video: null
      }));
      setposts(newPosts);
      setfeed(false);
    })
    .catch(error => {
    console.error('There was an error!', error);
  });
  }, [period, selected]);


  //to handle loading until fetch is complete
  if (loading) {
    return (
      <div className="w-100 h-100 flex flex-col items-center justify-center">
        <Spinner className="h-24 w-24" />
      </div>
    )
  }

  //main body of the page
  
  return (
    <div className={`flex-1 m-2 lg:w-2/3 mx-auto`}>
          {showModal && <LoginFirtstModal onClose={setShowModal}/>}

      {/* backgroyund image of the community */}
      <img src={comm.backimage} alt='community' className='md:w-full w-screen h-36 rounded-lg object-cover' />

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
          <button role="createPostButton" className={`rounded-full flex gap-1 justify-center border border-gray-600 w-fit px-4 h-10 items-center hover:border-black`} onClick={CreatePostHandle}>
            <Plus className="w-4 h-4" />
            <span className='inline font-bold text-sm'>Create a post</span>
          </button>
          <button role="joinButton" className={`rounded-full w-fit px-4 h-10 items-center  ${comm.joined ? 'border-gray-700 border-[1px] hover:border-black'  : 'hover:bg-blue-600 bg-blue-700'}`} onClick={() => swtichJoinState()}>
            <span className={`inline font-bold text-sm ${comm.joined ? 'text-black' : 'text-white'}`}>{comm.joined ? 'Joined' :  'Join'}</span>
          </button>
          {comm.joined ? bellMenu() : <></>}
          {user.user ? optionsMenu(comm.muted, comm.favourited, comm.name) : <></>}
        </div>
      </div>

      {/* create post, bell and options menu in mobile mode */}
      <div className='flex gap-2 md:justify-between mr-6 md:hidden mt-[62px]'>
        <button role="createPostButton" className={`rounded-full flex gap-1 justify-center border border-gray-600 w-fit px-4 h-10 items-center hover:border-black`}  onClick={CreatePostHandle}>
          <Plus className="w-4 h-4" />
          <span className='inline font-bold text-sm'>Create a post</span>
        </button>
        <button role="joinButton" className={`rounded-full w-fit px-4 h-10 items-center  ${comm.joined ? 'border-gray-700 border-[1px] hover:border-black'  : 'hover:bg-blue-600 bg-blue-700'}`} onClick={() => swtichJoinState()}>
            <span className={`inline font-bold text-xs ${comm.joined ? 'text-black' : 'text-white'}`}>{comm.joined ? 'Joined' :  'Join'}</span>
        </button>
        {comm.joined ? bellMenu() : <></>}
        {user.user ? optionsMenu(comm.muted, comm.favourited, comm.name) : <></>}
      </div>

      {/* the feed with its sort elements and the community description and rules and other tools on the right*/}
      <div className='gap-3 flex'>

        {/* the feed and the sort elements (buttons for feed and about page traversal in mobile mode)*/}
        <div className='min-w-[70%] w-screen md:w-[75%] flex-initial gap-3'>
          <br />
          <div className='flex justify-between md:justify-end'>

            {/* page buttons for mobile mode*/}
            <div className='flex gap-2 md:hidden'>
              <Link to={`/r/${comm.name}`} className={`rounded-full font-sans text-sm font-semibold w-fit px-4 py-2 h-fit ${path.pathname == `/r/${comm.name}` ? "bg-gray-300" : "bg-white"}`} >feed</Link>
              <Link to={`/r/${comm.name}/about`} className={`rounded-full font-sans text-sm font-semibold w-fit px-4 py-2 h-fit ${path.pathname == `/r/${comm.name}/about` ? "bg-gray-300" : "bg-white"}`} >about</Link>
            </div>

            {/* sort elements for the feed*/}
            <div className='flex gap-2'>
              <Sortmenu context={CommunityContext} />
              <PeriodSelect appearance={selected} context={CommunityContext} />
            </div>
          </div>
          <hr className="w-full border-1 border-gray-300 mt-2" />

          {/* the feed of the community*/}
          {!feed ? (<div role="communityFeed" className="flex flex-col w-full h-fit my-4 items-center">
            {/* if there are no downvoted posts, show no results */}
            {posts.length > 0 ? (
              posts.map((post, index) => (<PostComponent key={index} post={post} />))
            ) : (
              <>{/*no results view*/}
                <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                <p className="text-lg font-bold">no posts in this community, not YET.</p>
              </>
            )}</div>
            ) : (
            <div className="w-100 h-100 flex flex-col items-center justify-center">
              <Spinner className="h-24 w-24" />
            </div>
          )}
        </div>

        {/* community description and rules and other tools on the right*/}
        <MainFooter comm={comm} />
      </div>
    </div>
  )
}