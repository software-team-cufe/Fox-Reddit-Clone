import {Camera,Shirt,Shield,Plus} from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Card (){
    return(
        <div className="flex-none relative border border-slate-200 bg-slate-50 min-w-[360px] h-[700px] mr-5 rounded-2xl collapse md:visible">
        
        <div className='w-[100%] h-[18%] rounded-t-2xl mb-2 bg-gradient-to-b from-blue-900 to-black'>
        <button className="absolute right-4 top-[74px] pl-[6px] bg-gray-200 rounded-full h-8 w-8 hover:bg-gray-400">
                <Camera className='h-5 w-5'/>
        </button>
        </div>
        
 
        <span className='font-bold m-3'>username</span>
        
        <button
              className="flex items-center py-1 px-4  m-2 text-xs font-medium text-gray-500 focus:outline-none
               bg-gray-200 rounded-xl border border-gray-200 hover:bg-gray-300"> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 me-1">
               <path d="M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.475l6.733-3.366A2.52 2.52 0 0 1 13 4.5Z" />
              </svg>
              <span>share</span>
        </button>

        <div className='space-y-7 mt-6 '> 
           <div className='flex flex-row space-x-24 ml-5 '>
             <div className='flex flex-col'>
               <p>1</p>
               <p className='text-xs text-gray-500'>
               Post Karma
               </p>
             </div>
             <div className='flex flex-col'>
                <p>
                    0
                </p>
                <p className='text-xs text-gray-500'>
                Comment Karma
                </p>
             </div>
            </div> 

            <div className='flex flex-row ml-5 space-x-16'>
             <div className='flex flex-col'>
                <p>
                Feb 29, 2024
                </p>
                <p className='text-xs text-gray-500'>
                Cake day
                </p>
             </div>
             <div className='flex flex-col'>
                <p>
                    0
                </p>
                <p className='text-xs text-gray-500'>
                Gold Received
                </p>
             </div>
            </div>

        </div>

        <hr className="h-px m-3 mb-5 bg-gray-200 border-0 dark:bg-gray-700"/>
       
        <h1 className="text-xs text-gray-500 font-semibold mx-3"> SETTINGS </h1>
         
        <div className="mx-3 mt-5 grid grid-rows-3 gap-y-6 grid-flow-col"> 
                <img src={'/mySnoo.png'} className='h-9 w-7 mt-2 rounded-full'/>
                <Shirt className='h-8 w-6 mt-2 text-gray-700'/>
                <Shield className='h-8 mt-2 w-6 text-gray-700 mr-4'/>
                <div>
                     <span className="text-xs">
                         Profile
                     </span>
                     <br/>
                     <span className="text-xs text-gray-500">
                         Customize your profile
                     </span>
                </div>
                <span >
                 <span className="text-sm ">
                     Avatar
                 </span>
                 <br/>
                 <span className="text-xs text-gray-500">
                     Customize and style
                 </span>
             </span>
             <span>
             <span className="text-sm"> 
                 Moderation
             </span>
             <br/>
             <span className="text-xs text-gray-500">
                 Moderation Tools
             </span>
             </span>
             <Link to={'/settings/profile'} 
                 className="text-xs ml-8 mt-2 font-medium bg-gray-200 py-2 px-3 h-8 w-fit hover:bg-gray-300 hover:underline rounded-full"> 
                 Edit Profile
                </Link>
                <Link to={'/avatar'} 
                 type="button" className="text-xs ml-7 mt-2 font-medium bg-gray-200 py-2 px-3 h-8 w-fit hover:bg-gray-300 hover:underline rounded-full"> 
                 Style Avatar
                </Link >
                 <Link to={'./about/edit/moderation'} 
                  type="button" className="text-xs ml-6 mt-2 font-medium bg-gray-200 py-2 px-3 h-8 w-fit hover:bg-gray-300 hover:underline rounded-full"> 
                  Mod settings
                 </Link>
        </div>
        
        <hr className="h-px m-3 mb-5 bg-gray-200 border-0 dark:bg-gray-700"/>
        <h1 className="mx-3 mb-4 text-xs text-gray-500 font-semibold"> LINKS </h1>  
        <Link to={'/settings/profile'} className="w-fit flex items-center py-1 pl-2 pr-3 mx-3 mb-2 text-xs font-medium text-gray-700 focus:outline-none bg-gray-200 rounded-full hover:bg-gray-300 hover:underline"> 
         <Plus className='h-5 w-5 mr-2'/>
        <span>Add Social Link</span>
        </Link>
     </div>
    )
}