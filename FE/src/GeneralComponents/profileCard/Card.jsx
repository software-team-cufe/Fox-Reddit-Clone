import {Camera,Shirt,Shield} from 'lucide-react';

export default function Card (){
    return(
        <div className="relative border border-slate-200 bg-slate-50 min-w-[360px] h-[760px] ml-20 mr-7 rounded-2xl collapse md:visible">
        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX/AAAZ4gk3AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=' className='w-[100%] h-[16%] rounded-t-2xl mb-2 bg-gradient-to-b from-transparent to-slate-800'/>
             <button className="absolute right-4 top-[74px] pl-[6px] bg-gray-200 rounded-full h-8 w-8 hover:bg-gray-400">
                <Camera className='h-5 w-5'/>
                </button>
 
        <span className='font-bold m-3'>username</span>
             <button 
              className="flex items-center py-1 px-4  m-2 text-xs font-medium text-gray-500 focus:outline-none
               bg-gray-200 rounded-xl border border-gray-200 hover:bg-gray-300"> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 me-1">
               <path d="M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.475l6.733-3.366A2.52 2.52 0 0 1 13 4.5Z" />
              </svg>
              <span>share</span>
           </button>

        <hr className="h-px m-3 border-0 dark:bg-gray-300"/>
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
             <button 
                 type="button" className="text-xs ml-8 mt-2 font-medium border border-gray-200 bg-gray-200 py-1 px-3 h-8 w-fit hover:bg-gray-300 rounded-full"> 
                 Edit Profile
                </button>
                <button 
                 type="button" className="text-xs ml-7 mt-2 font-medium border border-gray-200 bg-gray-200 py-1 px-3 h-8 w-fit hover:bg-gray-300 rounded-full"> 
                 Style Avatar
                </button>
                 <button 
                  type="button" className="text-xs ml-6 mt-2 font-medium border border-gray-200 bg-gray-200 py-1 px-3 h-8 w-fit hover:bg-gray-300 rounded-full"> 
                  Mod settings
                 </button>
         </div>
         <hr className="h-px m-3 mb-5 border-0 dark:bg-gray-300"/>
         <h1 className="mx-3 text-xs text-gray-500 font-semibold"> LINKS </h1>  
         <br/>
         <button type="button" className="flex items-center py-1 px-4 mx-3 mb-2 text-xs font-medium text-gray-700 focus:outline-none
         bg-gray-200 rounded-full border border-gray-200 hover:bg-gray-300"> 
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
             <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
           </svg>
        <span>Add Social Link</span>
         </button>
        <hr className="h-px m-3 mb-5 border-0 dark:bg-gray-300"/>

     </div>
    )
}