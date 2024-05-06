import React from 'react'
import { useState } from 'react'
import { userAxios } from '@/Utils/UserAxios';
import { useParams } from 'react-router-dom';
const ModCard = () => {

    const [widget, setWidget] = useState(false);
    const [editWidget, setEditWidget] = useState(false);
    const [handleName, setHandleName] = useState(false);
    const [handleView, setHandleView] = useState(false);
    const [handleDescription, setHandleDescription] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [addWidget, setAddWidget] = useState(false);
    const [handleText, setHandleText] = useState(false);
    const [handleRules, setHandleRules] = useState(false);
    const [handleButtons, setHandleButtons] = useState(false);
    const [handleImage, setHandleImage] = useState(false);
    const [handleCommunityList, setHandleCommunityList] = useState(false);
    const [handleCalender, setHandleCalender] = useState(false);
    const [handlePostFair, setHandlePostFair] = useState(false);
    const [handleBookMark, setHandleBookMark] = useState(false);
    const { community } = useParams();  

  return (
    <div className="relative border border-slate-200 bg-slate-50 min-h-fit h-fit mr-5 rounded-xl md:block hidden pb-3 w-[340px] flex-col">
         
       <div className=' flex flex-row justify-between m-3'>
           <div className=' text-md font-semibold'>
              { community}
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
                      className="text-black focus:outline-none border border-gray-200 self-center h-14 w-full mt-2 rounded-2xl p-2 bg-gray-200"
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
                           className="text-black focus:outline-none border border-gray-200 self-center h-14 w-full mt-2  rounded-2xl p-2  bg-gray-200" >  
                           </input> 
                           <span className={`text-xs text-gray-500 ml-4 ${handleView ? 'text-green-600' : 'text-black'}`}>
                             Describe members who are currently viewing and contributing to your community.</span> 
                         
                       </div>
                       
                       <div className=' my-3'>  
                          <input 
                           type="text"
                           placeholder=" Community description "
                           onChange={setHandleDescription}
                            className=" text-black focus:outline-none border border-gray-200 self-center h-14 w-full mt-2  rounded-2xl p-2  bg-gray-200" >  
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
                                                   className="text-black focus:outline-none border border-gray-200 self-center h-14 w-full mt-2 rounded-2xl p-2 bg-gray-200"
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
                                                        className= "text-black focus:outline-none border border-gray-200 self-center h-14 w-full mt-2  rounded-2xl p-2  bg-gray-200" >  
                                                        </input> 
                                                        <span className={`text-xs text-gray-500 ml-4 ${handleView ? 'text-green-600' : 'text-black'}`}>
                                                          Describe members who are currently viewing and contributing to your community.</span> 
                                                      
                                                    </div>
                                                    
                                                    <div className=' my-3'>  
                                                       <input 
                                                        type="text"
                                                        placeholder=" Community description "
                                                        onChange={setHandleDescription}
                                                         className="focus:outline-none text-black border border-gray-200 self-center h-14 w-full mt-2  rounded-2xl p-2  bg-gray-200" >  
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
                                           <button 
                                            onClick={() => { setAddWidget(false), setWidget(false),setHandleText(true) }}
                                            className=' flex flex-col hover:bg-gray-200 w-full h-[70px]'>
                                           <span className=' mt-4 text-sm ml-3'>
                                                 Text
                                           </span>
                                           <span className=' text-xs text-gray-500 ml-3 '>
                                              Use for announcements, guidelines, or anything you want to tell visitors.
                                           </span>
                                          </button>
                                          
                                           
                                         </div>
                                    
                                             <button  
                                              onClick={() =>{ setAddWidget(false), setWidget(false), setHandleRules(true)}}
                                              className='h-[70px] flex flex-col hover:bg-gray-200 '>
                                             <span className=' mt-4 text-sm ml-3'>
                                               Rules
                                             </span>
                                             <span className=' text-xs text-gray-500 ml-3'>
                                               Display some or all of your community's rules.
                                              </span>
                                          </button>
                                 
                                      
                                           <button 
                                             onClick={() => { setAddWidget(false), setWidget(false), setHandleButtons(true) }}
                                             className=' h-[70px] flex flex-col hover:bg-gray-200 '>
                                               <span className=' mt-4 text-sm ml-3'>
                                                 Button
                                               </span>
                                               <span className=' text-xs text-gray-500 ml-3'>
                                                 Create up to 10 custom buttons that lick to websites or communities.   </span>
                                           </button>
                                   
                                    
                                           <button 
                                           onClick={() => { setAddWidget(false), setWidget(false), setHandleImage(true) }}
                                           className=' h-[70px] flex flex-col hover:bg-gray-200'>
                                                <span className=' mt-4 text-sm ml-3'>
                                                    Images
                                                 </span>
                                                <span className=' text-xs text-gray-500 ml-3'>
                                                  personalize your communitywith up to 10 images.
                                                </span>
                                            </button>
                                    
                                    
                                            <button 
                                            onClick={() => { setAddWidget(false), setWidget(false), setHandleCommunityList(true) }}
                                            className=' h-[70px] flex flex-col hover:bg-gray-200'>
                                              <span className='mt-4 text-sm ml-3'>
                                               Community List
                                              </span>
                                              <span className=' text-xs text-gray-500 ml-3'>
                                                 Recommend other communitiesyour members might enjoy.
                                             </span>
                                           </button>
                                   
                                          <button 
                                           onClick={() => { setAddWidget(false), setWidget(false), setHandleCalender(true) }}
                                           className=' h-[70px] flex flex-col hover:bg-gray-200 '>
                                            <span className=' mt-4 text-sm ml-3'>
                                               Calender
                                            </span>
                                            <span className=' text-xs text-gray-500 ml-3'>
                                              Share events with members and visitors.
                                            </span>
                                           </button>
                                    
                                            <button
                                             onClick={() => { setAddWidget(false), setWidget(false), setHandlePostFair(true) }}
                                             className=' h-[70px] flex flex-col hover:bg-gray-200 '>
                                              <span className=' mt-4 text-sm ml-3'>
                                                 Post flair
                                             </span>
                                             <span className=' text-xs text-gray-500 ml-3' >
                                               Highlight your community's post flair.
                                             </span>
                                            </button>
                                     
                                            <button
                                             onClick={() => { setAddWidget(false), setWidget(false), setHandleBookMark(true) }}
                                               className=' h-[70px] flex flex-col hover:bg-gray-200 '>
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
                {handleText && 
                  
                       <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-40'>
                                             <div className=' bg-white flex-col shadow-md rounded-xl w-[600px] h-[380px] '>
                                                <div className=' flex flex-row justify-between m-4'>
                                                       <button onClick={ ()=> {setHandleText(false),setWidget(true)}} className='  rounded-full  hover:border-gray-200 hover:bg-gray-200 w-8 h-8 flex items-center justify-center mt-1'>
                                                         <svg className="w-6 h-5  "
                                                          xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                                         </svg>
                                                       </button>
                                                      
                                                
                                                      <span className='text-xl font-semibold mr-80 mt-1'> Add Text Widget </span>
                                                      <div>
                                                      <button onClick={ ()=> setHandleText(false)} className=' mt-1 rounded-full border border-gray-200 bg-gray-200 w-8 h-8 flex items-center justify-center'>
                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                            </svg>
                                                      </button>
                                                     </div>
                                                </div>
                                                 <div  className=' text-xs text-gray-500 mx-4'>Displays text. Supports markdown.</div>
                                                 
                                                 {/* text box*/}
                                                 <div className=' mx-4 '>
                                                 <div className=' my-3'>
                                                 <input
                                                   type="text"
                                                   placeholder="Widget name*"
                                                   className="text-black focus:outline-none border border-gray-200 self-center h-14 w-full mt-2 rounded-2xl p-2 bg-gray-200"
                                                   
                                                 />
                                                
                                                    </div>
                                                     
                                                    <div className=' my-3'>  
                                                       <input 
                                                        type="text"
                                                        placeholder="Text*"
                                                      
                                                        className="text-black focus:outline-none border border-gray-200 self-center h-24 w-full mt-2  rounded-2xl p-2  bg-gray-200" >  
                                                        </input> 
                                                       
                                                    </div>
                                                    
                                                   
                                                 </div>

                                                 <div className=' flex flex-row justify-end space-x-3  mr-4 mt-10'>
                                                   <button onClick={ ()=> setHandleText(false)} className=' w-[62px] text-xs bg-gray-200 rounded-3xl text-black font-semibold h-[40px] flex items-center justify-center hover:bg-gray-300 '>
                                                    Cancel
                                                    </button>
                                                    <button onClick={ ()=> setHandleText(false)} className=' w-[62px] text-xs bg-blue-800 rounded-3xl text-white font-semibold h-[40px] flex items-center justify-center hover:bg-blue-800 '>
                                                     Save
                                                    </button>
                                               </div>
                                             </div>
                                        </div>
                }
                { handleRules &&
                  <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-40'>
                         <div className=' bg-white flex-col shadow-md rounded-xl w-[600px] h-[280px] '>
                                                <div className=' flex flex-row justify-between m-4'>
                                                       <button onClick={ ()=> {setHandleRules(false),setWidget(true)}} className='  rounded-full  hover:border-gray-200 hover:bg-gray-200 w-8 h-8 flex items-center justify-center mt-1'>
                                                         <svg className="w-6 h-5  "
                                                          xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                                         </svg>
                                                       </button>
                                                      
                                                
                                                      <span className='text-xl font-semibold mr-80 mt-1'> Add rules widget </span>
                                                      <div>
                                                      <button onClick={ ()=> setHandleRules(false)} className=' mt-1 rounded-full border border-gray-200 bg-gray-200 w-8 h-8 flex items-center justify-center'>
                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                            </svg>
                                                      </button>
                                                     </div>
                                                </div>
                                                 <div  className=' text-xs text-gray-500 mx-4'>Community rules</div>
                                                 <div  className=' flex flex-col mx-4 mt-5'>
                                                    <p className='text-md font-semibold '>Community rules</p>
                                                    <p className='text-xs text-gray-500'>Your community doesn't have any rules yet.</p>
                                                 </div>
                                                 <div className=' mx-4 mt-5'>
                                                    <button className=' border-2 border-gray-400 hover:border-gray-500 rounded-2xl text-sm w-full h-8'>
                                                       Create Commmunity Rules
                                                    </button>
                                                 </div>
                                           
                                                   

                                                 <div className=' flex flex-row justify-end space-x-3  mr-4 mt-6'>
                                                   <button onClick={ ()=> setHandleRules(false)} className=' w-[62px] text-xs bg-gray-200 rounded-3xl text-black font-semibold h-[40px] flex items-center justify-center hover:bg-gray-300 '>
                                                    Cancel
                                                    </button>
                                                    <button onClick={ ()=> setHandleRules(false)} className=' w-[62px] text-xs bg-blue-800 rounded-3xl text-white font-semibold h-[40px] flex items-center justify-center hover:bg-blue-800 '>
                                                     Save
                                                    </button>
                                               </div>
                            </div>
                     </div>
                
                }
                { handleButtons &&
                  <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-40'>
                  <div className=' bg-white flex-col shadow-md rounded-xl w-[600px] h-[460px] '>
                                         <div className=' flex flex-row justify-between m-4'>
                                                <button onClick={ ()=> {setHandleButtons(false),setWidget(true)}} className='  rounded-full  hover:border-gray-200 hover:bg-gray-200 w-8 h-8 flex items-center justify-center mt-1'>
                                                  <svg className="w-6 h-5  "
                                                   xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                                  </svg>
                                                </button>
                                               
                                         
                                               <span className='text-xl font-semibold mr-80 mt-1'> Add button widget </span>
                                               <div>
                                               <button onClick={ ()=> setHandleButtons(false)} className=' mt-1 rounded-full border border-gray-200 bg-gray-200 w-8 h-8 flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                     </svg>
                                               </button>
                                              </div>
                                         </div>
                                         
                                         <div  className=' text-xs text-gray-500 mx-4'>A widget for button</div>
                                         <div className=' mx-4  mb-6'>
                                         <div className=' my-3'>
                                         <input
                                           type="text"
                                           placeholder="Widget name*"
                                           className="text-black focus:outline-none border border-gray-200 self-center h-14 w-full mt-2 rounded-2xl p-2 bg-gray-200"
                                           
                                         />
                                        
                                            </div>
                                             
                                            <div className=' my-3'>  
                                               <input 
                                                type="text"
                                                placeholder="Description"
                                              
                                                className="text-black focus:outline-none border border-gray-200 self-center h-14 w-full mt-2  rounded-2xl p-2  bg-gray-200" >  
                                                </input> 
                                               
                                            </div>
                                            
                                           
                                         </div>
                                         <hr className="w-[95%] ml-4 h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
         
                                         <div  className=' flex flex-col mx-4 mt-5'>
                                             <p className='text-md font-semibold '>Buttons</p>
                                             <p className='text-xs text-gray-500'>0/10</p>
                                          </div>
                                          <div className=' mx-4 mt-5'>
                                             <button className=' border-2 border-gray-400 hover:border-gray-500 rounded-2xl text-sm w-full h-9'>
                                                Add Button
                                             </button>
                                          </div>
                                    
                                            

                                          <div className=' flex flex-row justify-end space-x-3  mr-4 mt-6'>
                                            <button onClick={ ()=> setHandleButtons(false)} className=' w-[62px] text-xs bg-gray-200 rounded-3xl text-black font-semibold h-[40px] flex items-center justify-center hover:bg-gray-300 '>
                                             Cancel
                                             </button>
                                             <button onClick={ ()=> setHandleButtons(false)} className=' w-[62px] text-xs bg-blue-800 rounded-3xl text-white font-semibold h-[40px] flex items-center justify-center hover:bg-blue-800 '>
                                              Save
                                             </button>
                                        </div>
                     </div>
              </div>
                }
                { handleImage &&
                  <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-40'>
                  <div className=' bg-white flex-col shadow-md rounded-xl w-[600px] h-[420px] '>
                                         <div className=' flex flex-row justify-between m-4'>
                                                <button onClick={ ()=> {setHandleImage(false),setWidget(true)}} className='  rounded-full  hover:border-gray-200 hover:bg-gray-200 w-8 h-8 flex items-center justify-center mt-1'>
                                                  <svg className="w-6 h-5  "
                                                   xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                                  </svg>
                                                </button>
                                               
                                         
                                               <span className='text-xl font-semibold mr-72 mt-1'> Add Images widget </span>
                                               <div>
                                               <button onClick={ ()=> setHandleImage(false)} className=' mt-1 rounded-full border border-gray-200 bg-gray-200 w-8 h-8 flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                     </svg>
                                               </button>
                                              </div>
                                         </div>
                                           <div className=' mx-4  mb-6'>
                                           <div className=' my-3'>
                                             <input
                                              type="text"
                                              placeholder="Widget name*"
                                              className="text-black focus:outline-none border border-gray-200 self-center h-14 w-full mt-2 rounded-2xl p-2 bg-gray-200"
                                           
                                              />
                                            </div>
                                         </div>
                                         <hr className="w-[95%] ml-4 h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
         
                                        
                                          <div className=' mx-4 mt-5'>
                                             <p className='text-md  mb-2'>0/10</p>
                                             <button className=' border border-gray-200 bg-gray-200 rounded-2xl text-sm w-full h-28 flex flex-col justify-items-center py-7'>
                                             <svg className="text-gray-400 w-6 h-6 self-center "
                                             xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />  <polyline points="9 15 12 12 15 15" />  <line x1="12" y1="12" x2="12" y2="21" /></svg>
                                                <p className='text-xs text-gray-500 self-center'>Drag and drop or browse your device</p>
                                             </button>
                                          </div>
                                    
                                            

                                          <div className=' flex flex-row justify-end space-x-3  mr-4 mt-6'>
                                            <button onClick={ ()=> setHandleImage(false)} className=' w-[62px] text-xs bg-gray-200 rounded-3xl text-black font-semibold h-[40px] flex items-center justify-center hover:bg-gray-300 '>
                                             Cancel
                                             </button>
                                             <button onClick={ ()=> setHandleImage(false)} className=' w-[62px] text-xs bg-blue-800 rounded-3xl text-white font-semibold h-[40px] flex items-center justify-center hover:bg-blue-800 '>
                                              Save
                                             </button>
                                        </div>
                     </div>
              </div>
                }
                {
                  handleCommunityList &&
                  <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-40'>
                  <div className=' bg-white flex-col shadow-md rounded-xl w-[600px] h-[420px] '>
                                         <div className=' flex flex-row justify-between m-4'>
                                                <button onClick={ ()=> {setHandleCommunityList(false),setWidget(true)}} className='  rounded-full  hover:border-gray-200 hover:bg-gray-200 w-8 h-8 flex items-center justify-center mt-1'>
                                                  <svg className="w-6 h-5  "
                                                   xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                                  </svg>
                                                </button>
                                               
                                         
                                               <span className='text-xl font-semibold mr-60 mt-1'> Add  community list  widget </span>
                                               <div>
                                               <button onClick={ ()=> setHandleCommunityList(false)} className=' mt-1 rounded-full border border-gray-200 bg-gray-200 w-8 h-8 flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                     </svg>
                                               </button>
                                              </div>
                                         </div>
                                           
                                           <div className=' mx-4  mb-6'>
                                           <div className=' text-sm text-gray-500'>
                                              Recommend related communities to visitors.
                                           </div>
                                           <div className=' my-3'>
                                             <input
                                              type="text"
                                              placeholder="Widget name*"
                                              className="text-black focus:outline-none border border-gray-200 self-center h-14 w-full mt-2 rounded-2xl p-2 bg-gray-200"
                                           
                                              />
                                            </div>
                                         </div>
                                         <hr className="w-[95%] ml-4 h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
         
                                        
                                          <div className=' mx-4 mt-5 flex flex-col'>
                                             <p>Community list</p>
                                             <p className='text-xs  text-red-600 mb-2'>0/10</p>
                                          
                                          </div>
                                          {/* search button  */}
                                          <div className=' mx-4'>
                                              <form >
                                              
                                                 <div className="relative border border-transparent">
                                                    <div className="  flex absolute inset-y-0 left-0 items-center pl-3 ">
                                                       <svg
                                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                       >
                                                       <path
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                       strokeWidth={2}
                                                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                       />
                                                      </svg>
                                                   </div>
                                                   <input
                                                        type="search"
                                                        id="default-search"
                                                        className=" focus:outline-none p-4 pl-10 w-full text-sm text-gray-900 bg-gray-200 rounded-full  "
                                                        placeholder="Search communities"
                                                        required=""
                                                    />
                                            
                                                   </div>
                                              </form>
                                              </div>
                                    
                                            

                                          <div className=' flex flex-row justify-end space-x-3  mr-4 mt-6'>
                                            <button onClick={ ()=> setHandleCommunityList(false)} className=' w-[62px] text-xs bg-gray-200 rounded-3xl text-black font-semibold h-[40px] flex items-center justify-center hover:bg-gray-300 '>
                                             Cancel
                                             </button>
                                             <button onClick={ ()=> setHandleCommunityList(false)} className=' w-[62px] text-xs bg-blue-800 rounded-3xl text-white font-semibold h-[40px] flex items-center justify-center hover:bg-blue-800 '>
                                              Save
                                             </button>
                                        </div>
                     </div>
                 </div>
                }
                {handleCalender &&
                  <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-40'>
                     <div className=' bg-white flex-col shadow-md rounded-xl w-[600px] h-[520px]  overflow-y-scroll '>
                                         <div className=' flex flex-row justify-between m-4'>
                                                <button onClick={ ()=> {setHandleCalender(false),setWidget(true)}} className='  rounded-full  hover:border-gray-200 hover:bg-gray-200 w-8 h-8 flex items-center justify-center mt-1'>
                                                  <svg className="w-6 h-5  "
                                                   xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                                  </svg>
                                                </button>
                                               
                                         
                                               <span className='text-xl font-semibold mr-72 mt-1'> Add calendar widget </span>
                                               <div>
                                               <button onClick={ ()=> setHandleCalender(false)} className=' mt-1 rounded-full border border-gray-200 bg-gray-200 w-8 h-8 flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                     </svg>
                                               </button>
                                              </div>
                                         </div>
                                           <div className=' mx-4  mb-6 flex flex-col'>
                                           <p className='text-sm text-gray-500  '>
                                           Displays a Google calendar.
                                           </p>
                                           <div className=' my-3'>
                                             <input
                                              type="text"
                                              placeholder="Widget name*"
                                              className="text-black focus:outline-none border border-gray-200 self-center h-14 w-full mt-2 rounded-2xl p-2 bg-gray-200"
                                           
                                              />
                                            </div>
                                            <div className=' my-3'>
                                            <input
                                             type="text"
                                             placeholder="Google calender ID*"
                                             className= "text-black focus:outline-none border border-gray-200 self-center h-14 w-full mt-2 rounded-2xl p-2 bg-gray-200"
                                          
                                             />
                                           </div>
                                         </div>
                                         <hr className="w-[95%] ml-4 h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
         
                                        
                                          <div className=' mx-4 mt-5 flex flex-col'>
                                             <p className='text-sm font-semibold' >Events to display</p>
                                             <p className='text-xs text-gray-500'>50 events max</p>
                                            
                                          </div>
                                          <div className=' mx-4 mt-5'>  
                              
                                          
                                            <input className=' focus:outline-none text-black border border-gray-200 self-center h-10 w-full mt-2 rounded-2xl p-2 bg-gray-200' type="number" name="quantity" min="0" max="100" step="1">
                                             </input>
                                            
                                          </div>

                                          <hr className="w-[95%] ml-4 h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
         
                                          <div className=' mx-4 my-5 flex flex-col space-y-3'>
                                            <p className='text-sm font-semibold'>Events data</p>
                                            <span className=' flex flex-row mt-2'>
                                               <input
                                                 defaultChecked=""
                                                 type="checkbox"
                                                 className="relative w-4 h-4 aspect-square !appearance-none !bg-none checked:!bg-blue-800 checked:!from-blue-800 checked:!to-white bg-white border border-gray-300 shadow-sm rounded !outline-none !ring-0 !text-transparent !ring-offset-0 checked:!border-blue-800 hover:!border-blue-800 cursor-pointer transition-all duration-300 ease-in-out focus-visible:!outline-offset-2 focus-visible:!outline-2 focus-visible:!outline-blue-800/30 focus-visible:border-blue-800 after:w-[35%] after:h-[53%] after:absolute after:opacity-0 after:top-[40%] after:left-[50%] after:-translate-x-2/4 after:-translate-y-2/4 after:rotate-[25deg] after:drop-shadow-[1px_0.5px_1px_rgba(56,149,248,0.5)] after:border-r-[0.17em] after:border-r-white after:border-b-[0.17em] after:border-b-white after:transition-all after:duration-200 after:ease-linear checked:after:opacity-100 checked:after:rotate-45"
                                                />
                                                <p className='text-sm  ml-2'>Date</p>
                                          
                                            </span>
                                           <span className=' flex flex-row mt-2'>
                                              <input
                                                 defaultChecked=""
                                                  type="checkbox"
                                                 className="relative w-4 h-4 aspect-square !appearance-none !bg-none checked:!bg-blue-800 checked:!from-blue-800 checked:!to-white bg-white border border-gray-300 shadow-sm rounded !outline-none !ring-0 !text-transparent !ring-offset-0 checked:!border-blue-800 hover:!border-blue-800 cursor-pointer transition-all duration-300 ease-in-out focus-visible:!outline-offset-2 focus-visible:!outline-2 focus-visible:!outline-blue-800/30 focus-visible:border-blue-800 after:w-[35%] after:h-[53%] after:absolute after:opacity-0 after:top-[40%] after:left-[50%] after:-translate-x-2/4 after:-translate-y-2/4 after:rotate-[25deg] after:drop-shadow-[1px_0.5px_1px_rgba(56,149,248,0.5)] after:border-r-[0.17em] after:border-r-white after:border-b-[0.17em] after:border-b-white after:transition-all after:duration-200 after:ease-linear checked:after:opacity-100 checked:after:rotate-45"
                                                  />
                                                 <p className='text-sm  ml-2'>Time</p>
                                       
                                           </span>
                                           <span className=' flex flex-row mt-2'>
                                              <input
                                                defaultChecked=""
                                                type="checkbox"
                                               className="relative w-4 h-4 aspect-square !appearance-none !bg-none checked:!bg-blue-800 checked:!from-blue-800 checked:!to-white bg-white border border-gray-300 shadow-sm rounded !outline-none !ring-0 !text-transparent !ring-offset-0 checked:!border-blue-800 hover:!border-blue-800 cursor-pointer transition-all duration-300 ease-in-out focus-visible:!outline-offset-2 focus-visible:!outline-2 focus-visible:!outline-blue-800/30 focus-visible:border-blue-800 after:w-[35%] after:h-[53%] after:absolute after:opacity-0 after:top-[40%] after:left-[50%] after:-translate-x-2/4 after:-translate-y-2/4 after:rotate-[25deg] after:drop-shadow-[1px_0.5px_1px_rgba(56,149,248,0.5)] after:border-r-[0.17em] after:border-r-white after:border-b-[0.17em] after:border-b-white after:transition-all after:duration-200 after:ease-linear checked:after:opacity-100 checked:after:rotate-45"
                                                />
                                               <p className='text-sm  ml-2'>Location</p>
                                    
                                            </span>
                                            <span className=' flex flex-row mt-2'>
                                               <input
                                                   defaultChecked=""
                                                   type="checkbox"
                                                   className="relative w-4 h-4 aspect-square !appearance-none !bg-none checked:!bg-blue-800 checked:!from-blue-800 checked:!to-white bg-white border border-gray-300 shadow-sm rounded !outline-none !ring-0 !text-transparent !ring-offset-0 checked:!border-blue-800 hover:!border-blue-800 cursor-pointer transition-all duration-300 ease-in-out focus-visible:!outline-offset-2 focus-visible:!outline-2 focus-visible:!outline-blue-800/30 focus-visible:border-blue-800 after:w-[35%] after:h-[53%] after:absolute after:opacity-0 after:top-[40%] after:left-[50%] after:-translate-x-2/4 after:-translate-y-2/4 after:rotate-[25deg] after:drop-shadow-[1px_0.5px_1px_rgba(56,149,248,0.5)] after:border-r-[0.17em] after:border-r-white after:border-b-[0.17em] after:border-b-white after:transition-all after:duration-200 after:ease-linear checked:after:opacity-100 checked:after:rotate-45"
                                                  />
                                               <p className='text-sm  ml-2'>Description</p>
                                     
                                            </span>
                                          </div>
                                            

                                          <div className=' flex flex-row justify-end space-x-3  mr-4 my-6'>
                                            <button onClick={ ()=> setHandleCalender(false)} className=' w-[62px] text-xs bg-gray-200 rounded-3xl text-black font-semibold h-[40px] flex items-center justify-center hover:bg-gray-300 '>
                                             Cancel
                                             </button>
                                             <button onClick={ ()=> setHandleCalender(false)} className=' w-[62px] text-xs bg-blue-800 rounded-3xl text-white font-semibold h-[40px] flex items-center justify-center hover:bg-blue-800 '>
                                              Save
                                             </button>
                                        </div>
                     </div>
              </div>
                }
                {handlePostFair &&
                  <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-40'>
                  <div className=' bg-white flex-col shadow-md rounded-xl w-[600px] h-[260px] '>
                                         <div className=' flex flex-row justify-between m-4'>
                                                <button onClick={ ()=> {setHandlePostFair(false),setWidget(true)}} className='  rounded-full  hover:border-gray-200 hover:bg-gray-200 w-8 h-8 flex items-center justify-center mt-1'>
                                                  <svg className="w-6 h-5  "
                                                   xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                                  </svg>
                                                </button>
                                               
                                         
                                               <span className='text-xl font-semibold mr-80 mt-1'> Add flair widget </span>
                                               <div>
                                               <button onClick={ ()=> setHandlePostFair(false)} className=' mt-1 rounded-full border border-gray-200 bg-gray-200 w-8 h-8 flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                     </svg>
                                               </button>
                                              </div>
                                         </div>
                                         
                                          <div  className=' flex flex-col mx-4 mt-5'>
                                             <p className='text-md font-semibold '>Flair</p>
                                             <p className='text-xs text-gray-500'>You community doesn’t have any post flair.</p>
                                          </div>
                                          <div className=' mx-4 mt-5'>
                                             <button className=' border-2 border-gray-400 hover:border-gray-500 rounded-2xl text-sm w-full h-8'>
                                                Create Flair
                                             </button>
                                          </div>
                                    
                                            

                                          <div className=' flex flex-row justify-end space-x-3  mr-4 mt-6'>
                                            <button onClick={ ()=> setHandlePostFair(false)} className=' w-[62px] text-xs bg-gray-200 rounded-3xl text-black font-semibold h-[40px] flex items-center justify-center hover:bg-gray-300 '>
                                             Cancel
                                             </button>
                                             <button onClick={ ()=> setHandlePostFair(false)} className=' w-[62px] text-xs bg-blue-800 rounded-3xl text-white font-semibold h-[40px] flex items-center justify-center hover:bg-blue-800 '>
                                              Save
                                             </button>
                                        </div>
                     </div>
              </div>
                }
                {handleBookMark &&
                  <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-40'>
                  <div className=' bg-white flex-col shadow-md rounded-xl w-[600px] h-[280px] '>
                                         <div className=' flex flex-row justify-between m-4'>
                                                <button onClick={ ()=> {setHandleBookMark(false),setWidget(true)}} className='  rounded-full  hover:border-gray-200 hover:bg-gray-200 w-8 h-8 flex items-center justify-center mt-1'>
                                                  <svg className="w-6 h-5  "
                                                   xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                                  </svg>
                                                </button>
                                               
                                         
                                               <span className='text-xl font-semibold mr-52 mt-1'> Edit Community Bookmarks </span>
                                               <div>
                                               <button onClick={ ()=> setHandleBookMark(false)} className=' mt-1 rounded-full border border-gray-200 bg-gray-200 w-8 h-8 flex items-center justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                     </svg>
                                               </button>
                                              </div>
                                         </div>
                                         
                                          <div  className='  mx-4 mt-2'>   
                                             <p className='text-xs text-gray-500'>Edit the tabs for the community’s bookmarks</p>
                                          </div>
                                         <div className='    h-16 w-full flex flex-row   justify-between items-center'>
                                               <span className='flex flex-row ml-5'> 
                                                    <svg className="w-7 h-7 "
                                                     xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="20" x2="8" y2="16" />  <line x1="5" y1="13" x2="11" y2="19" />  <path d="M11 19l7 -7a4 4 0 0 0 -6 -6l-7 7" /></svg>
                                          
                                                    <span className='flex flex-col justify-start items-start ml-3'>
                                                        <p className='text-sm '>  Wiki</p>
                                                        <p className='text-xs text-gray-500'>/wiki/index</p>
                                                    </span>
                                                </span>
                                                <div className=' mr-10'>
                                                    <label className="relative inline-flex cursor-pointer items-center">
                                                        <input id="switch" type="checkbox" className="peer sr-only" />
                                                         <label htmlFor="switch" className="hidden"></label>
                                                        <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                                                          peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                                                     </label>
                                                </div>
                                          </div>
                                         <hr className="w-[100%] h-px  bg-gray-200 border-0 dark:bg-gray-700 "></hr>
                                          <div className=' mx-4 mt-5'>
                                             <button className=' border border-gray-400 hover:border-gray-500 rounded-2xl text-sm w-full h-9 font-medium'>
                                                Add Bookmarks
                                             </button>
                                          </div>
                                    
                                            

                                          <div className=' flex flex-row justify-end space-x-3  mr-4 mt-6'>
                                            <button onClick={ ()=> setHandleBookMark(false)} className=' w-[62px] text-xs bg-gray-200 rounded-3xl text-black font-semibold h-[40px] flex items-center justify-center hover:bg-gray-300 '>
                                             Cancel
                                             </button>
                                             <button onClick={ ()=> setHandleBookMark(false)} className=' w-[62px] text-xs bg-blue-800 rounded-3xl text-white font-semibold h-[40px] flex items-center justify-center hover:bg-blue-800 '>
                                              Save
                                             </button>
                                        </div>
                     </div>
              </div>
                }
         </div>
     
    </div>
  )
}

export default ModCard
