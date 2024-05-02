import React from 'react'
import { useState } from 'react'
const ModCard = () => {



    const [widget, setWidget] = useState(false);
    const [editWidget, setEditWidget] = useState(false);
    const [ handleName, setHandleName] = useState(false);
    const [ handleView, setHandleView] = useState(false);
    const [handleDescription, setHandleDescription] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [addWidget, setAddWidget] = useState(false);
  return (
    <div className="relative border border-slate-200 bg-slate-50 min-h-fit h-fit mr-5 rounded-xl md:block hidden pb-3 w-[340px] flex-col">
         
       <div className=' flex flex-row justify-between m-3'>
           <div className=' text-sm'>
               community_name15
           </div>
           <div>
               <button onClick={() => setIsOpened(!isOpened)} className=' rounded-full border border-gray-200 bg-gray-200 w-6 h-6 flex items-center justify-center '>
                 <svg className="w-5 h-5 self-center"
                  xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
               </button>
               {isOpened && 
                 
                <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-40'>
                <div className=' bg-white flex-col shadow-md rounded-xl w-[600px] h-[460px] '>
                   <div className=' flex flex-row justify-between m-4'>
                   
                         <span className='text-xl font-semibold mr-48 mt-1'> Edit community details widget </span>
                         <div>
                         <button onClick={ ()=> setIsOpened(false)} className=' mt-1 rounded-full border border-gray-200 bg-gray-200 w-8 h-8 flex items-center justify-center'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                               </svg>
                         </button>
                        </div>
                   </div>
                    <div  className=' text-xs text-gray-500 mx-4'>Briefly describes your community and members. Always appears at the top of the sidebar.</div>
                    
                    {/* text box*/}
                    <div className=' mx-4 '>
                    <div className=' my-3'>
                    <input
                      type="text"
                      placeholder="Members' nickname"
                      className="text-black border border-gray-200 self-center h-14 w-full mt-2 rounded-2xl p-2 bg-gray-200"
                      onChange={setHandleName}
                    />
                    <span className={`text-xs text-gray-500 ml-4 ${handleName ? 'text-green-600' : 'text-black'}`}>
                      Give a nickname to your members.
                    </span>
                  </div>
                       
                       <div className=' my-3'>  
                          <input 
                           type="text"
                           placeholder="Currently viewing nickname "
                           onChange={setHandleView}
                           className="text-black border border-gray-200 self-center h-14 w-full mt-2  rounded-2xl p-2  bg-gray-200" >  
                           </input> 
                           <span className={`text-xs text-gray-500 ml-4 ${handleView ? 'text-green-600' : 'text-black'}`}>
                             Describe members who are currently viewing and contributing to your community.</span> 
                         
                       </div>
                       
                       <div className=' my-3'>  
                          <input 
                           type="text"
                           placeholder=" Community description "
                           onChange={setHandleDescription}
                            className=" text-black border border-gray-200 self-center h-14 w-full mt-2  rounded-2xl p-2  bg-gray-200" >  
                           </input> 
                           <span className={`text-xs text-gray-500 ml-4 ${handleDescription ? 'text-green-600' : 'text-black'}`}>
                              Describe your community to visitors. 
                           </span>
                       </div>
                      
                    </div>

                    <div className=' flex flex-row justify-end space-x-3  mr-4'>
                      <button onClick={ ()=> setIsOpened(false)} className=' w-[57px] text-xs bg-gray-200 rounded-3xl text-black font-semibold h-[40px] flex items-center justify-center hover:bg-gray-300 '>
                       Cancel
                       </button>
                       <button onClick={ ()=> setIsOpened(false)} className=' w-[57px] text-xs bg-blue-800 rounded-3xl text-white font-semibold h-[40px] flex items-center justify-center hover:bg-blue-800 '>
                        Save
                       </button>
                  </div>
                </div>
                </div>
              }
           </div>
       </div>
       <div className=' flex flex-row  mx-3'>
           <div className=' flex flex-col w-1/2'>
                 <span className='text-sm'>57</span>
                 <p className='text-sm text-gray-500'> Members</p>
           </div>
           <div className=' flex flex-col w-1/2'>
                 <span className='text-sm'> 314 </span>
                 <span className=' flex flex-row'>
                    <svg className=" self-center text-green-500 w-2 h-2 fill-current rounded-full  mr-1"
                     xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="2" stroke="currentColor" fill="currentColor" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" /></svg>
                   <p className='text-sm text-gray-500'>Online</p>
                 </span>
           </div>
       </div>
       <hr className="w-[100%] h-px mb-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className=' flex flex-col mx-3 '> 
           <p className='text-sm text-gray-500 mt-3  font-medium'> MODERATORS</p>
           <div className=' flex flex-row my-6'>
               <button className='text-sm  ml-9 hover:underline'>
                   u/ApprehensiveLaw9713
               </button>
           </div> 
           <button className=" text-xs bg-gray-200 rounded-3xl text-gray-700 font-semibold h-[35px] flex items-center justify-center hover:bg-gray-300 hover:underline">
                 <svg className="w-5 h-5 self-center "
                  xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0 1.1.9 2 2 2z" /> 
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                 <p className=' ml-2 self-center '> Messages the mods </p>
            </button>
        </div>
        <hr className="w-[100%] h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
         <div className=' flex flex-col mx-3'>
             <p className='text-sm text-gray-500 mt-3 font-medium '> COMMUNITY SETTINGS</p>
             <div className=' flex flex-row justify-between my-3'>
                  <div className=' text-sm text-gray-500'>
                      Community Appearance
                   </div>
                   <div>
                       <button className=' rounded-full border border-gray-200 bg-gray-200 w-6 h-6 flex items-center justify-center '>
                        <svg className="w-5 h-5 self-center"
                           xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
                       </button>
                   </div>
             </div>
             <button onClick={ ()=> setWidget(true)} className=" text-xs bg-blue-800 rounded-3xl text-white font-semibold h-[35px] flex items-center justify-center hover:bg-blue-800 ">
                   Edit Widgets
             </button>
                { widget && 
                    <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-40'>
                       <div className=' bg-white flex-col shadow-md rounded-xl w-[600px] h-[320px]'>
                             <div className=' flex flex-row justify-between m-4'>
                                <span className='text-sm font-light  '> Edit widget </span>
                                <div>
                                   <button onClick={ ()=> setWidget(false)} className='  rounded-full border border-gray-200 bg-gray-200 w-8 h-8 flex items-center justify-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                   </button>
                                </div>
                             </div>
                             <div className=' flex  mx-4 flex-col'>
                                <button onClick={ ()=> setEditWidget(true)} className=' hover:bg-gray-200   h-16 w-full flex flex-row   justify-between items-center'>
                                    <svg className="w-7 h-7 ml-5"
                                     xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="20" x2="8" y2="16" />  <line x1="5" y1="13" x2="11" y2="19" />  <path d="M11 19l7 -7a4 4 0 0 0 -6 -6l-7 7" /></svg>
                                    
                                     <span className='flex flex-col justify-start items-start mr-6'>
                                      <p className='text-sm '>  Community details</p>
                                      <p className='text-xs text-gray-500'>Describe your community and members. Always at the top of your widgets.</p>
                                     </span>
                                     <svg className="w-4 h-4 mr-3"
                                      xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"/>
                                     </svg>
                                  
                                  </button>
                                   <hr className="w-[100%] h-px  bg-gray-200 border-0 dark:bg-gray-700 "></hr>
                                    {editWidget &&
                                        <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-40'>
                                             <div className=' bg-white flex-col shadow-md rounded-xl w-[600px] h-[460px] '>
                                                <div className=' flex flex-row justify-between m-4'>
                                                       <button onClick={ ()=> setEditWidget(false)} className='  rounded-full  hover:border-gray-200 hover:bg-gray-200 w-8 h-8 flex items-center justify-center mt-1'>
                                                         <svg className="w-6 h-5  "
                                                          xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                                         </svg>
                                                       </button>
                                                      
                                                
                                                      <span className='text-xl font-semibold mr-48 mt-1'> Edit community details widget </span>
                                                      <div>
                                                      <button onClick={ ()=> setWidget(false)} className=' mt-1 rounded-full border border-gray-200 bg-gray-200 w-8 h-8 flex items-center justify-center'>
                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                            </svg>
                                                      </button>
                                                     </div>
                                                </div>
                                                 <div  className=' text-xs text-gray-500 mx-4'>Briefly describes your community and members. Always appears at the top of the sidebar.</div>
                                                 
                                                 {/* text box*/}
                                                 <div className=' mx-4 '>
                                                 <div className=' my-3'>
                                                 <input
                                                   type="text"
                                                   placeholder="Members' nickname"
                                                   className="text-black border border-gray-200 self-center h-14 w-full mt-2 rounded-2xl p-2 bg-gray-200"
                                                   onChange={setHandleName}
                                                 />
                                                 <span className={`text-xs text-gray-500 ml-4 ${handleName ? 'text-green-600' : 'text-black'}`}>
                                                   Give a nickname to your members.
                                                 </span>
                                               </div>
                                                    
                                                    <div className=' my-3'>  
                                                       <input 
                                                        type="text"
                                                        placeholder="Currently viewing nickname "
                                                        onChange={setHandleView}
                                                        className="text-black border border-gray-200 self-center h-14 w-full mt-2  rounded-2xl p-2  bg-gray-200" >  
                                                        </input> 
                                                        <span className={`text-xs text-gray-500 ml-4 ${handleView ? 'text-green-600' : 'text-black'}`}>
                                                          Describe members who are currently viewing and contributing to your community.</span> 
                                                      
                                                    </div>
                                                    
                                                    <div className=' my-3'>  
                                                       <input 
                                                        type="text"
                                                        placeholder=" Community description "
                                                        onChange={setHandleDescription}
                                                         className=" text-black border border-gray-200 self-center h-14 w-full mt-2  rounded-2xl p-2  bg-gray-200" >  
                                                        </input> 
                                                        <span className={`text-xs text-gray-500 ml-4 ${handleDescription ? 'text-green-600' : 'text-black'}`}>
                                                           Describe your community to visitors. 
                                                        </span>
                                                    </div>
                                                   
                                                 </div>

                                                 <div className=' flex flex-row justify-end space-x-3  mr-4'>
                                                   <button onClick={ ()=> setWidget(false)} className=' w-[57px] text-xs bg-gray-200 rounded-3xl text-black font-semibold h-[40px] flex items-center justify-center hover:bg-gray-300 '>
                                                    Cancel
                                                    </button>
                                                    <button onClick={ ()=> setWidget(false)} className=' w-[57px] text-xs bg-blue-800 rounded-3xl text-white font-semibold h-[40px] flex items-center justify-center hover:bg-blue-800 '>
                                                     Save
                                                    </button>
                                               </div>
                                             </div>
                                        </div>
                                    }
                               </div>
                                <div className=' flex  mx-4 flex-col'> 
                                <span className=' text-sm text-gray-500 mt-8'> Widgets: 0/20</span>
                            
                                <div>
                                <button
                                  onClick={ ()=>setAddWidget(true)}
                                  className="  w-full  my-4 text-xs bg-gray-200 rounded-3xl text-gray-700 font-semibold h-[40px] flex items-center justify-center hover:bg-gray-300 ">
                                   <p className=' text-black text-md'> Add widget</p>
                                    <svg className="w-5 h-5"
                                       xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="6 9 12 15 18 9" /></svg>
                                </button>
                                  {addWidget && 
                                 <div className=' bg-opacity-0 bg-white fixed top-0 left-0 w-full h-full '>
                                    <div className=' bg-white fixed  top-80 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[450px] h-[250px] shadow-2xl rounded-xl overflow-y-auto'>
                                      <div className=' flex flex-col  '>
                                           <div>
                                           <button className=' flex flex-col hover:bg-gray-200 w-full h-[70px]'>
                                           <span className=' mt-4 text-sm ml-3'>
                                                 Text
                                           </span>
                                           <span className=' text-xs text-gray-500 ml-3 '>
                                              Use for announcements, guidelines, or anything you want to tell visitors.
                                           </span>
                                          </button>
                                           
                                         </div>
                                    
                                             <button className='h-[70px] flex flex-col hover:bg-gray-200 '>
                                             <span className=' mt-4 text-sm ml-3'>
                                               Rules
                                             </span>
                                             <span className=' text-xs text-gray-500 ml-3'>
                                               Display some or all of your community's rules.
                                              </span>
                                          </button>
                                 
                                      
                                           <button className=' h-[70px] flex flex-col hover:bg-gray-200 '>
                                               <span className=' mt-4 text-sm ml-3'>
                                                 Button
                                               </span>
                                               <span className=' text-xs text-gray-500 ml-3'>
                                                 Create up to 10 custom buttons that lick to websites or communities.   </span>
                                           </button>
                                   
                                    
                                           <button className=' h-[70px] flex flex-col hover:bg-gray-200'>
                                                <span className=' mt-4 text-sm ml-3'>
                                                    Images
                                                 </span>
                                                <span className=' text-xs text-gray-500 ml-3'>
                                                  personalize your communitywith up to 10 images.
                                                </span>
                                            </button>
                                    
                                    
                                            <button className=' h-[70px] flex flex-col hover:bg-gray-200'>
                                              <span className='mt-4 text-sm ml-3'>
                                               Community List
                                              </span>
                                              <span className=' text-xs text-gray-500 ml-3'>
                                                 Recommend other communitiesyour members might enjoy.
                                             </span>
                                           </button>
                                   
                                          <button className=' h-[70px] flex flex-col hover:bg-gray-200 '>
                                            <span className=' mt-4 text-sm ml-3'>
                                               Calender
                                            </span>
                                            <span className=' text-xs text-gray-500 ml-3'>
                                              Share events with members and visitors.
                                            </span>
                                           </button>
                                    
                                            <button className=' h-[70px] flex flex-col hover:bg-gray-200 '>
                                              <span className=' mt-4 text-sm ml-3'>
                                                 Post flair
                                             </span>
                                             <span className=' text-xs text-gray-500 ml-3' >
                                               Highlight your community's post flair.
                                             </span>
                                            </button>
                                     
                                            <button className=' h-[70px] flex flex-col hover:bg-gray-200 '>
                                               <span className=' mt-4 text-sm ml-3'>
                                                 Bookmarks
                                               </span>
                                               <span className=' text-xs text-gray-500 ml-3'>
                                                 Link to your wiki and other important commmunity resources.
                                              </span>
                                            </button>
                                       

                                      </div> 
                                   </div>
                                 </div>
                                }
                                 </div>

                                <div className=' flex flex-row justify-end space-x-3 mt-2'>
                                  <button onClick={ ()=> setWidget(false)} className=' w-[57px] text-xs bg-gray-200 rounded-3xl text-black font-semibold h-[40px] flex items-center justify-center hover:bg-gray-300 '>
                                   Cancel
                                  </button>
                                  <button onClick={ ()=> setWidget(false)} className=' w-[57px] text-xs bg-blue-800 rounded-3xl text-white font-semibold h-[40px] flex items-center justify-center hover:bg-blue-800 '>
                                    Save
                                  </button>
                                </div>
                            
                                </div>
                             
                            
                       </div>
                    </div>
                }
         </div>
     
    </div>
  )
}

export default ModCard
