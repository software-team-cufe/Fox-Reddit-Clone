import {CircleEllipsis,Shirt,Shield,Plus,PlusCircle,MessageCircleMore} from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

export default function ViewerCard (){
    return(
        <div className="flex-none relative border border-slate-200 bg-slate-50 min-w-[360px] min-h-fit h-fit mr-5 rounded-2xl collapse md:visible pb-3">
        
        <div className='w-[100%] h-[124px] rounded-t-2xl mb-2 bg-gradient-to-b from-blue-900 to-black'></div>
        
        <div className='flex flex-row justify-between items-center mx-3 mt-3'>
        <span className='font-bold'>username</span>
        <button className="bg-gray-200 pl-2 rounded-full h-8 w-8 hover:bg-gray-400">
                <CircleEllipsis className='h-4 w-4'/>
        </button>
        </div>
        
        <div className='flex flex-row mt-3'>
        <button
              className="flex items-center py-1 px-4  m-2 text-xs font-medium text-gray-500 focus:outline-none bg-blue-800 rounded-full border border-gray-200 hover:bg-blue-900"> 
                <PlusCircle className='text-white h-4 w-4 mr-1'/>
              <span className="text-white text-sm">Follow</span>
        </button>
        <button
                className="flex items-center py-1 px-4  m-2 text-xs font-medium text-gray-500 focus:outline-none bg-gray-200 rounded-full border border-gray-200 hover:bg-gray-300">
                <MessageCircleMore className='h-5 w-5 mr-1'/>
                <span className="text-sm">Chat</span>
        </button>
        </div>
        <p className='p-2 text-xs text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis nulla qui tenetur numquam explicabo quae recusandae rem, voluptatum, voluptatem tempora minus tempore vero esse nesciunt ut ipsam alias ad reiciendis.</p>
        <hr className="h-px m-3 mt-1 mb-5 bg-gray-200 border-0 dark:bg-gray-700"/>

           <div className='flex flex-row justify-between px-4 mt-2'>
             <div className='flex flex-col'>
               <p className='text-sm font-bold'>1</p>
               <p className='text-xs text-gray-500'>
               Post Karma
               </p>
             </div>
             <div className='flex flex-col'>
                <p className="text-sm font-bold">0</p>
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

        <hr className="h-px m-3 mb-5 bg-gray-200 border-0 dark:bg-gray-700"/>
                        
        <h1 className="mx-3 mb-4 text-xs text-gray-500 font-semibold"> LINKS </h1>  
        <Link to={'/settings/profile'} className="w-fit flex items-center py-1 pl-2 pr-3 mx-3 mb-2 text-xs font-medium text-gray-700 focus:outline-none bg-gray-200 rounded-full hover:bg-gray-300 hover:underline"> 
         <Plus className='h-5 w-5 mr-2'/>
        <span>Add Social Link</span>
        </Link>

        <hr className="h-px m-3 mb-5 bg-gray-200 border-0 dark:bg-gray-700"/>

        <h1 className="mx-3 mb-4 text-xs text-gray-500 font-semibold">MODERATOR OF THESE COMMUNITIES</h1>

     </div>
    )
}