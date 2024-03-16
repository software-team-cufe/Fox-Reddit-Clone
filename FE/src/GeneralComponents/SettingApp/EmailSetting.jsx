export default function EmailSetting()
{
    return (
        <div className="p-40">
        <h2 className=" font-semibold text-xl">
            Manage Emails
        </h2>
        
        <div>
            <p className="text-xs text-gray-500 mt-9 mb-1">MESSAGES</p>
            
            <hr className="w-1/2"/>
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
                        Chat requests
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
               
            </div>
        </div>
    
    
        <div>
            <p className="text-xs text-gray-500 mt-9 mb-1">ACTIVITY</p>
            
            <hr className="w-1/2"/>
            <div className="flex flex-col mt-7 w-1/2 ">
                <div className="flex flex-row mb-7 justify-between"> 
                    <p> 
                        New user welcome
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
                        Username mentions
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
                
              
             
    
            </div>
        </div>
        
        <div>
            <p className="text-xs text-gray-500 mt-9 mb-1">NEWSLETTERS
            </p>
            
            <hr className="w-1/2"/>
            <div className="flex flex-col mt-7 w-1/2">
                <div className="flex flex-row mb-7 justify-between"> 
                    <p> 
                        Daily Digest
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
            <hr className="w-1/2"/>
            <div className="flex flex-col mt-7 w-1/2">
                <div className="flex flex-row mb-7 justify-between"> 
                    <p> 
                        Unsubscribe from all emails
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
    );
}