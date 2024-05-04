
import { userAxios } from "../../../Utils/UserAxios";
import { useQuery } from "react-query";
export default function NotificationSettings() {
   
      const handleNotification = async(btnname,value) => {
        try{
            const body = {};
            body[btnname]=value;
            const response = await userAxios.patch("api/v1/me/notification/settings",body);
         
            console.log(response.data)
            console.log("notification")
        }
        catch(error){
           console.log(error)
        }
      }
      
      
    const {data,isLoading,isError}=useQuery('notification', ()=> userAxios.get("api/v1/me/notification/settings"),{
        refetchOnWindowFocus: false, refetchOnMount:true, retry: 0})
    if (isLoading)
            {return "true"}
    const notification=data.data.userPrefs


    return (
        <div className='table:w-max'>
            <h2 className=" font-semibold text-xl">
                Notification settings
            </h2>

            <div>
                <p className='text-xs text-gray-500 mt-9 mb-1'>MESSAGES</p>

                <hr className='w-[85%]' />
                <div className="flex flex-col mt-7 w-[85%]">
                    <div className="flex flex-row mb-7 justify-between ">
                        <div>
                            <p>
                                Private messages
                            </p>
                        </div>
                        <div>
                        <label
                         
                          className="relative inline-flex cursor-pointer items-center"
                        >
                          <input 
                          onChange={(e)=>handleNotification("messages" , e.target.checked)}
                          id="switch" type="checkbox" className="peer sr-only" defaultChecked={notification.messages}/>
                          <label htmlFor="switch" className="hidden"></label>
                          <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                        </label>

                      </div>

                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <div>
                            <p>
                                Chat messages
                            </p>
                        </div>
                        <div >
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e)=>handleNotification("chatMessages" , e.target.checked)} defaultChecked={notification.chatMessages} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>

                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Chat requests
                        </p>
                        <div >
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e)=>handleNotification("chatRequests" , e.target.checked)} defaultChecked={notification.chatRequests} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <p className="text-xs text-gray-500 mt-9 mb-1">ACTIVITY</p>

                <hr className="w-[85%]" />
                <div className="flex flex-col mt-7 w-[85%] ">
                    <div>
                        <button className='flex flex-row space-x-2'>
                            <p className="text-sm"> Community alerts</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Mentions of u/username
                        </p>
                        <div >
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e)=>handleNotification("mentionOfUsername" , e.target.checked)} defaultChecked={notification.mentionOfUsername} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>

                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Comments on your posts
                        </p>
                        <div >
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e)=>handleNotification("commentsOnYourPosts" , e.target.checked)} defaultChecked={notification.commentsOnYourPosts} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>

                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Upvotes on your posts
                        </p>
                        <div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e)=>handleNotification("upvotesOnYourPosts" , e.target.checked)} defaultChecked={notification.upvotesOnYourPosts} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Upvotes on your comments
                        </p>
                        <div >
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e)=>handleNotification("upvotedOnYourComments" , e.target.checked)} defaultChecked={notification.upvotedOnYourComments} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Replies to your comments
                        </p>
                        <div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e)=>handleNotification("repliesToYourComments" , e.target.checked)} defaultChecked={notification.repliesToYourComments} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Activity on your comments
                        </p>
                        <div >
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e)=>handleNotification("activityOnYourComments" , e.target.checked)} defaultChecked={notification.activityOnYourComments} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Activity on chat posts you&apos;re in

                        </p>
                        <div >
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e)=>handleNotification("activityOnChatPostsYoureIn" , e.target.checked)} defaultChecked={notification.activityOnChatPostsYoureIn} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            New followers
                        </p>
                        <div >
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e) => handleNotification("newFollowers", e.target.checked)} defaultChecked={notification.newFollowers} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Awards you receive
                        </p>
                        <div >
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e) => handleNotification("awardsYouReceive", e.target.checked)} defaultChecked={notification.awardsYouReceive} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Posts you follow
                        </p>
                        <div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e) => handleNotification("postsYouFollow", e.target.checked)} defaultChecked={notification.postsYouFollow} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Comments you follow
                        </p>
                        <div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e) => handleNotification("commentsYouFollow", e.target.checked)} defaultChecked={notification.commentsYouFollow} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>
                    </div>

                </div>
            </div>

            <div>
                <p className="text-xs text-gray-500 mt-9 mb-1">RECOMMENDATIONS</p>

                <hr className="w-[85%]" />
                <div className="flex flex-col mt-7 w-[85%]">
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Trending posts
                        </p>
                        <div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e) => handleNotification("trendingPosts", e.target.checked)} defaultChecked={notification.trendingPosts} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>

                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Community recommendations
                        </p>
                        <div >
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e) => handleNotification("communityRecommendations", e.target.checked)} defaultChecked={notification.communityRecommendations} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>

                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            ReReddit
                        </p>
                        <div >
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e) => handleNotification("reReddit", e.target.checked)} defaultChecked={notification.reReddit} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Featured content
                        </p>
                        <div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e) => handleNotification("featuredContent", e.target.checked)} defaultChecked={notification.featuredContent} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-xs text-gray-500 mt-9 mb-1">UPDATES</p>

                <hr className="w-[85%]" />
                <div className="flex flex-col mt-7 w-[85%]">
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Reddit announcements
                        </p>
                        <div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e) => handleNotification("redditAnnouncements", e.target.checked)} defaultChecked={notification.redditAnnouncements} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>

                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Cake day
                        </p>
                        <div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input onChange={(e)=>handleNotification("cakeDay", e.target.checked)} defaultChecked={notification.cakDay} id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}