export default function EmailSetting()
{
    return (
        <div classname="p-40">
        <h2 classname=" font-semibold text-xl">
            Manage Emails
        </h2>
        
        <div>
            <p classname="text-xs text-gray-500 mt-9 mb-1">MESSAGES</p>
            
            <hr classname="w-1/2"/>
            <div classname="flex flex-col mt-7 w-1/2">
                <div classname="flex flex-row mb-7 justify-between "> 
                    <div>
                        <p> 
                            Private messages
                        </p>
                    </div>             
                    <div>
                        <label classname="relative inline-flex cursor-pointer items-center">
                            <input id="switch" type="checkbox" classname="peer sr-only" />
                            <label for="switch" classname="hidden"></label>
                            <div classname="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                          </label>  
                    </div>
    
                </div>
              
                <div classname="flex flex-row mb-7 justify-between">
                    <div>
                     <p>
                        Chat requests
                     </p>
                    </div>
                     <div >
                         <label classname="relative inline-flex cursor-pointer items-center">
                             <input id="switch" type="checkbox" classname="peer sr-only" />
                             <label for="switch" classname="hidden"></label>
                             <div classname="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                              peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                           </label>  
                     </div>
     
                 </div>
               
            </div>
        </div>
    
    
        <div>
            <p classname="text-xs text-gray-500 mt-9 mb-1">ACTIVITY</p>
            
            <hr classname="w-1/2"/>
            <div classname="flex flex-col mt-7 w-1/2 ">
                <div classname="flex flex-row mb-7 justify-between"> 
                    <p> 
                        New user welcome
                    </p>
                    <div >
                        <label classname="relative inline-flex cursor-pointer items-center">
                            <input id="switch" type="checkbox" class="peer sr-only" />
                            <label for="switch" classname="hidden"></label>
                            <div classname="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                          </label>  
                    </div>
    
                </div>
                <div classname="flex flex-row mb-7 justify-between">
                    <p>
                        Comments on your posts
                    </p>
                    <div >
                        <label classname="relative inline-flex cursor-pointer items-center">
                            <input id="switch" type="checkbox" classname="peer sr-only" />
                            <label for="switch" classname="hidden"></label>
                            <div classname="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                          </label>  
                    </div>
    
                </div>
                <div classname="flex flex-row mb-7 justify-between">
                    <p>
                        Replies to your comments
                    </p>
                    <div>
                        <label classname="relative inline-flex cursor-pointer items-center">
                            <input id="switch" type="checkbox" classname="peer sr-only" />
                            <label for="switch" classname="hidden"></label>
                            <div classname="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                          </label>  
                    </div>
                </div>
                <div classname="flex flex-row mb-7 justify-between">
                    <p>
                        Upvotes on your posts
                    </p>
                    <div>
                        <label classname="relative inline-flex cursor-pointer items-center">
                            <input id="switch" type="checkbox" classname="peer sr-only" />
                            <label for="switch" classname="hidden"></label>
                            <div classname="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                          </label>  
                    </div>
                </div>
                <div classname="flex flex-row mb-7 justify-between">
                    <p>
                        Upvotes on your comments
                    </p>
                    <div >
                        <label classname="relative inline-flex cursor-pointer items-center">
                            <input id="switch" type="checkbox" classname="peer sr-only" />
                            <label for="switch" classname="hidden"></label>
                            <div classname="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                          </label>  
                    </div>
                </div>
                <div classname="flex flex-row mb-7 justify-between">
                    <p>
                        Username mentions
                    </p>
                    <div>
                        <label classname="relative inline-flex cursor-pointer items-center">
                            <input id="switch" type="checkbox" classname="peer sr-only" />
                            <label for="switch" classname="hidden"></label>
                            <div classname="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                          </label>  
                    </div>
                </div>
            
                <div classname="flex flex-row mb-7 justify-between">
                    <p>
                        New followers
                    </p>
                    <div >
                        <label classname="relative inline-flex cursor-pointer items-center">
                            <input id="switch" type="checkbox" classname="peer sr-only" />
                            <label for="switch" classname="hidden"></label>
                            <div classname="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                          </label>  
                    </div>
                </div>
                
              
             
    
            </div>
        </div>
        
        <div>
            <p classname="text-xs text-gray-500 mt-9 mb-1">NEWSLETTERS
            </p>
            
            <hr classname="w-1/2"/>
            <div classname="flex flex-col mt-7 w-1/2">
                <div classname="flex flex-row mb-7 justify-between"> 
                    <p> 
                        Daily Digest
                    </p>
                    <div>
                        <label classname="relative inline-flex cursor-pointer items-center">
                            <input id="switch" type="checkbox" classname="peer sr-only" />
                            <label for="switch" classname="hidden"></label>
                            <div classname="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                          </label>  
                    </div>
    
                </div>
              
            </div>
        </div>
    
        <div>
            <hr classname="w-1/2"/>
            <div classname="flex flex-col mt-7 w-1/2">
                <div classname="flex flex-row mb-7 justify-between"> 
                    <p> 
                        Unsubscribe from all emails
                    </p>
                    <div>
                        <label classname="relative inline-flex cursor-pointer items-center">
                            <input id="switch" type="checkbox" classname="peer sr-only" />
                            <label for="switch" classname="hidden"></label>
                            <div classname="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                          </label>  
                    </div>
    
                </div>
              
            
            </div>
        </div>
    
      </div>
    )
}