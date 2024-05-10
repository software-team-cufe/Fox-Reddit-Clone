import { CircleEllipsis, CornerUpRight } from 'lucide-react';
import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Mail, Flag, CircleOff } from 'lucide-react';
import { useState } from 'react';
import { userAxios } from '../../Utils/UserAxios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import  { useEffect } from 'react';

function CardOptionsMenu() {  //prop takes the display to use it outside the component
    const username = useSelector(state => state.user.user.username);

    const handleBlock = async () => {
        try {
            const response = await userAxios.post('/api/block_user', { username , type: 'unblock' });
            console.log(response);
            console.log('blocked');
           
        } catch (error) {
            console.log(error);
        }
    }

 
 
    return (
        <Menu as="div" className="relative inline-block text-left">
            {/* dropdown menu displaying currently selected display*/}
            <div>
                <Menu.Button className="w-full rounded-full inline-flex justify-center gap-x-1.5 bg-white p-2 text-sm text-gray-900 hover:bg-gray-200">
                    <CircleEllipsis className='h-5 w-5' />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">

                {/* dropdown menu items */}
                <Menu.Items className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item className="px-3 border-b-gray-300 border-b">
                        <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-sm hover:underline w-full'}>
                            <CornerUpRight className='h-5 w-5 mr-2' />
                            <span> Share</span>
                        </button>
                    </Menu.Item>
                    <Menu.Item className="px-3 border-b-gray-300 border-b">
                        <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-sm hover:underline w-full'}>
                        <Mail className='h-5 w-5 mr-2' />                            
                        <span> Send a Message</span>
                        </button>
                    </Menu.Item>
                    <Menu.Item className="px-3 border-b-gray-300 border-b">
                        <button onClick={handleBlock} className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-sm hover:underline w-full'}>
                        <CircleOff className='h-5 w-5 mr-2' />
                        <span> Block Account</span>
                        </button>
                    </Menu.Item>
                    <Menu.Item className="px-3 border-b-gray-300 border-b">
                        <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-sm hover:underline w-full'}>
                        <Flag className='h-5 w-5 mr-2' />
                        <span> Report Profile</span>
                        </button>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}




export default function ViewerCard() {

    const { viewer } = useParams(); 
    const [isClicked , setCLicked]=useState("false")
    const username = useSelector(state => state.user.user.username);
    const [numOfPost, setPost] = useState(0);
    const [numOfComment, setComment] = useState(0);
    const [communities, setCommunities] = useState([]);
   
const handleFollow = async () => {
    try {
      const res = await userAxios.post('api/follow', { username });
      console.log(res);
      console.log("followed");
      setCLicked(true);
      localStorage.setItem('followAction', 'followed');
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleUnfollow = async () => {
    try {
      const response = await userAxios.post('api/unfollow', { username });
      console.log(response);
      console.log("unfollowed");
      setCLicked(false);
      localStorage.setItem('followAction', 'unfollowed');
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    const storedAction = localStorage.getItem('followAction');
    if (storedAction === 'followed') {
        setCLicked(true);
    } else if (storedAction === 'unfollowed') {
      setCLicked(false);
    }
  }, []);
  

     useEffect(() => {
        const fetchCommentPosts = async () => {
            try {
                const res = await userAxios.get(`/api/user/${viewer}/number_posts_comments`);
                console.log("num of comments");
                console.log(res.data.comment);
                console.log("num of posts");
                console.log(res.data.post);
                setComment(res.data.comment);
                setPost(res.data.post);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCommentPosts();
     },[])
     
     useEffect(() => { 
        const getCommunities = async () => {
      try {
        const response = await userAxios.get(`/subreddits/${viewer}/creator`);
        console.log("creator");
        console.log(response.data.communities.map(comm => ({ name: comm.name, memberCount: comm.memberCount, icon: comm.icon })));
        setCommunities(response.data.communities.map(comm => ({ name: comm.name, memberCount: comm.memberCount, icon: comm.icon })));
      } catch (error) {
        console.log(error);
      }
    };

    getCommunities();
  }, []);

    return (
        <div className="relative border border-slate-200 bg-slate-50 min-h-fit h-fit mr-5 rounded-2xl pb-3 hidden md:block overflow-y-auto">

         
            <div className='flex flex-row justify-between items-center mx-3 mt-3'>
                <span className='font-bold'>{viewer}</span>
                <CardOptionsMenu />
            </div>
             
             <div className=' flex flex-col mx-3 mt-3 space-y-3'>
                <div className='flex flex-row  space-x-3'>
                  <button onClick={() => { 
                    setCLicked(!isClicked); 
                    if(!isClicked) handleFollow();
                    if(isClicked) handleUnfollow();
                  }} 
                  className={`flex flex-row items-center justify-center space-x-1 border  rounded-3xl px-2  h-[35px] ${isClicked ? 'bg-gray-100 border-black w-[105px]' : 'bg-blue-800  border-blue-700  w-[85px]'}`}>
                    {isClicked ? 
                        <svg className="w-4 h-4 text-black" xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <circle cx="12" cy="12" r="9"/>
                        <path d="M9 12L15 12"/>
                      </svg>
                    :
                    <svg className="text-white w-5 h-5 rotate-[180deg]"
                    xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" /></svg>
                    }
                    <p className={`  text-sm text-center ${ isClicked ? 'text-black' : 'text-white'}`}> {isClicked ? 'Unfollow' : 'Follow'}</p>
                  </button>
                  <button className=' flex flex-row items-center justify-center space-x-1 border border-gray-200 bg-gray-200 rounded-3xl w-[75px] px-2  h-[35px] '>
                      <svg className="w-5 h-5 self-center"
                      xmlns="http://www.w3.org/2000/svg" width="24"  height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
             
                       <p className=' text-sm text-center'>chat</p>
                  </button>
                 </div>
                 
                   <div className='text-xs text-gray-500 '>blablablablablablablablablbla
         
                   </div>
              
               </div>
          
          <hr className="h-px m-3 mt-1 mb-5 bg-gray-200 border-0 dark:bg-gray-700" />

            <div className='flex flex-row justify-between px-4 mt-2'>
                <div className='flex flex-col'>
                    <p className='text-sm font-bold'>
                       {numOfPost}
                    </p>
                    <p className='text-xs text-gray-500'>
                        Post Karma
                    </p>
                </div>
                <div className='flex flex-col'>
                     <p className="text-sm font-bold">
                       {numOfComment}
                    </p>
                    <p className='text-xs text-gray-500'>
                        Comment Karma
                    </p>
                </div>

                <div className='flex flex-col'>
                    <p className='text-sm font-bold'>Feb 29, 2024</p>
                    <p className='text-xs text-gray-500'>
                        Cake day
                    </p>
                </div>
            </div>

            <hr className="h-px m-3 mb-5 bg-gray-200 border-0 dark:bg-gray-700" />

            <h1 className="mx-3 mb-4 text-xs text-gray-500 font-semibold"> LINKS </h1>
            <div className='  px-4 flex flex-row space-x-2'> 
               <button className=' border border-gray-200 rounded-2xl flex flex-row bg-gray-200 space-x-1 w-[80px] h-7 p-1'>
                 <svg className="w-3 h-4"
                 xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />  <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" /></svg>
                 <p className=' text-xs font-medium'>LinkedIn</p>
               </button>
               <button className=' border border-gray-200 rounded-2xl flex flex-row bg-gray-200 space-x-1 w-[110px] h-7 p-1'>
                 <svg className="w-3 h-4"
                 xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />  <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" /></svg>
                 <p className=' text-xs  font-medium'>Career Profile</p>
               </button>
            </div>
         
            
           <hr className="h-px m-3 mb-5 bg-gray-200 border-0 dark:bg-gray-700" />
         
           <div className=' mx-3 my-4'>
             <h1 className=" mb-4 text-xs text-gray-500 font-semibold">TROPHY CASE</h1>
              <div className=" flex flex-row space-x-1"> 
                <svg className="text-yellow-300 w-7 h-7"
                 xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="10" x2="9.01" y2="10" />  <line x1="15" y1="10" x2="15.01" y2="10" />  <path d="M9.5 15a3.5 3.5 0 0 0 5 0" /></svg>
                <p  className=' text-sm py-1'>  One-Year Club</p>
              </div>
           </div>

            <hr className="h-px m-3 mb-5 bg-gray-200 border-0 dark:bg-gray-700" />
           <div className='flex flex-col h-fit'>
              <h1 className="mx-3 mb-4 text-xs text-gray-500 font-semibold">MODERATOR OF THESE COMMUNITIES</h1>
              <div className='flex flex-col hover:bg-gray-100 h-12'>
              {communities.map((community, index) => (
                  <a key={index} href={`/r/${community.name}`} className='flex flex-row w-full justify-between hover:bg-gray-100'>
                      <div className='flex flex-row space-x-3 ml-6 my-3'>
                          <img src={community.icon} alt={community.name} className="w-7 h-7" />
                          <div className='flex flex-col'>
                              <div className='flex flex-row'>
                                  <div className='flex flex-row'>
                                      <span className='text-xs'>r/{community.name}</span>
                                  </div>
                              </div>
                              <span className='text-xs text-gray-400'>{community.memberCount} members</span>
                          </div>
                      </div>
                      <div>
                          <button className='py-1 my-3 mr-6 border border-gray-300 rounded-2xl flex flex-row bg-gray-300 w-[47px] h-7 px-2 text-black text-xs font-semibold'>Join</button>
                      </div>
                  </a>
              ))}
             </div>
           </div>
    
           

        </div>
    )
}