import React from 'react'
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ModQueueRoutes from './ModQueueRoutes';
const EditedPage = () => {
  return (
    <div className='flex w-full'>
    <div className=' w-2/4 ml-10'>
    <div className='text-xl font-semibold'>Queue</div>
    <ModQueueRoutes></ModQueueRoutes>
     <div className='flex flex-row justify-between'>
             <div className=''>
            {/*first dropdown menu */}
            <Menu as="div" className="relative inline-block text-left">
   
            <div>
              <Menu.Button className="w-full rounded-full inline-flex justify-center gap-x-1.5 bg-white p-2 text-sm text-black font-semibold   flex-row">
                <p >NEWEST FIRST </p>
                <svg className="w-5 h-5"
                 xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
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

    
            <Menu.Items className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item className="px-3 border-b-gray-300 border-b">
                    <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
                     
                      <p> Newest First</p>
                    </button>
                </Menu.Item>
               <Menu.Item className="px-3 border-b-gray-300 border-b">
                   <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
                                     
                   <p> Oldest First</p>
                   </button>
               </Menu.Item>
              </Menu.Items>
           </Transition>
          </Menu>

           {/*second dropdown menu */}
           <Menu as="div" className="relative inline-block text-left">
   
           <div>
             <Menu.Button className="w-full rounded-full inline-flex justify-center gap-x-1.5 bg-white p-2 text-sm text-black font-semibold   flex-row">
               <p >POSTS AND COMMENTS</p>
               <svg className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
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

   
           <Menu.Items className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
               <Menu.Item className="px-3 border-b-gray-300 border-b">
                   <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
                    
                     <p> Posts And Comments </p>
                   </button>
               </Menu.Item>
              <Menu.Item className="px-3 border-b-gray-300 border-b">
                  <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
                                    
                  <p> Posts</p>
                  </button>
              </Menu.Item>
              <Menu.Item className="px-3 border-b-gray-300 border-b">
                  <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
                                
                    <p> Comments</p>
                  </button>
               </Menu.Item>
               <Menu.Item className="px-3 border-b-gray-300 border-b">
                   <button className={' text-gray-700 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
                     <p> Live Chat Messages</p>
                   </button>
               </Menu.Item>

             </Menu.Items>
          </Transition>
         </Menu>

            </div>
    
             {/*third dropdown menu */}
             <div className="flex justify-end">
             <Menu as="div" className="relative inline-block text-left float-right">
   
             <div>
               <Menu.Button className="w-full rounded-full inline-flex justify-center gap-x-1.5 bg-white p-2 text-sm text-black font-semibold hover:bg-gray-200  flex-row">
                 <svg className="w-6 h-6 rotate-[90deg] text-gray-500"
                 xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="4" width="16" height="16" rx="2" />  <line x1="12" y1="4" x2="12" y2="20" /></svg>
         
                 <svg className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
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

     
             <Menu.Items className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                 <Menu.Item className="px-3 border-b-gray-300 border-b">
                     <button className={' text-gray-500 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
                       <svg className="w-6 h-6 rotate-[90deg]"
                        xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="4" width="16" height="16" rx="2" />  <line x1="12" y1="4" x2="12" y2="20" /></svg>
                       <p> Card </p>
                     </button>
                 </Menu.Item>
                <Menu.Item className="px-3 border-b-gray-300 border-b">
                    <button className={' text-gray-500 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
                    <svg className="text-gray-500 w-6 h-6 rotate-[90deg]"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
                    </svg>
                             
                       <p> Classic</p>
                    </button>
                </Menu.Item>
                <Menu.Item className="px-3 border-b-gray-300 border-b">
                    <button className={' text-gray-500 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
                       <svg className="text-gray-500 w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg" width="24"  height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                         </svg>
                            
                        <p> Compact</p>
                    </button>
                 </Menu.Item>
            

               </Menu.Items>
            </Transition>
           </Menu>
             </div>
         
     </div>

     <div className='w-full flex  flex-row border border-gray-300 h-12 rounded-md'>
     <Menu as="div" className="relative inline-block text-left  float-right">
   
     <div>
       <Menu.Button className="w-full rounded-full inline-flex justify-center gap-x-1.5 bg-white p-2 text-sm text-black font-semibold  flex-row">
       <svg className="text-gray-400 w-7 h-7 self-center"
       xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>
         <svg className="w-5 h-5 text-gray-500 self-center"
          xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
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


     <Menu.Items className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
         <Menu.Item className="px-3 border-b-gray-300 border-b">
             <button className={' text-gray-500 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
                 <p> Spam Filtered </p>
             </button>
         </Menu.Item>
        <Menu.Item className="px-3 border-b-gray-300 border-b">
            <button className={' text-gray-500 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
                       
               <p> Has Reports</p>
            </button>
        </Menu.Item>
        <Menu.Item className="px-3 border-b-gray-300 border-b">
            <button className={' text-gray-500 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
                  
                <p> Self Posts</p>
            </button>
         </Menu.Item>
         <Menu.Item className="px-3 border-b-gray-300 border-b">
            <button className={' text-gray-500 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
               
               <p> Posts With Flair</p>
            </button>
         </Menu.Item>
         <Menu.Item className="px-3 border-b-gray-300 border-b">
             <button className={' text-gray-500 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
            
             <p> Posts</p>
            </button>
         </Menu.Item>
         <Menu.Item className="px-3 border-b-gray-300 border-b">
            <button className={' text-gray-500 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
        
             <p> Comments</p>
            </button>
          </Menu.Item>
          <Menu.Item className="px-3 border-b-gray-300 border-b">
            <button className={' text-gray-500 flex relative pr-4 h-12 py-3 gap-2 text-md font-medium hover:bg-blue-100 w-full hover:text-black'}>
      
             <p> Chat Posts</p>
            </button>
          </Menu.Item>
 
    

       </Menu.Items>
    </Transition>
   </Menu>
     </div>

     <div className=' flex items-center justify-center mt-4 w-full border border-gray-300 h-[500px]'>
           <svg className="text-yellow-300 w-36 h-36 mx-auto"
            xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="0.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="10" x2="9.01" y2="10" />  <line x1="15" y1="10" x2="15.01" y2="10" />  <path d="M10 14v2a2 2 0 0 0 4 0v-2m1 0h-6" /></svg>
        
     </div>
      </div>

    </div>
  )
}

export default EditedPage