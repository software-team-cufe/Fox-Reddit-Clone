import Navofsetting from "./Navofsetting"

export default function NotificationSettings() {


    return (

        <div className='table:w-max'>
            <h2 className=" font-semibold text-xl">
                Notification settings
            </h2>

            <div>
                <p className='text-xs text-gray-500 mt-9 mb-1'>MESSAGES</p>

                <hr className='w-1/2' />
                <div className="flex flex-col mt-7 w-1/2">
                    <div className="flex flex-row mb-7 justify-between ">
                        <div>
                            <p>
                                Private messages
                            </p>
                        </div>
                        <div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input id="switch" type="checkbox" className="peer sr-only" />
                                <label htmlFor="switch" className="hidden"></label>
                                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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

                <hr className="w-1/2" />
                <div className="flex flex-col mt-7 w-1/2 ">
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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

                <hr className="w-1/2" />
                <div className="flex flex-col mt-7 w-1/2">
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Trending posts
                        </p>
                        <div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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

                <hr className="w-1/2" />
                <div className="flex flex-col mt-7 w-1/2">
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Reddit announcements
                        </p>
                        <div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input id="switch" type="checkbox" className="peer sr-only" />
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
                                <input id="switch" type="checkbox" className="peer sr-only" />
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