import React from "react";


export default function MainFooter (){
    return(
        <div className='w-[340px] min-w-[25%] flex-auto h-fit p-3 overflow-y-scroll bg-gray-100 rounded-lg hidden md:block'>
           <div className=" flex flex-col">
              <div className=" flex flex-col">
                <p className=" font-semibold text-sm">programming</p>
                <p className=" text-sm text-gray-500 font-light">Computer Programming</p>
              </div>

              <div className=" flex flex-row">
                  <div className=" flex flex-col">
                      <p className=" font-semibold text-sm">6.1M</p>
                      <p className=" text-xs">Members</p>
                  </div>
                  <div className=" flex flex-col">
                     <p className="font-semibold text-sm">456</p>
                   
                     <div className=" flex flex-row"> 
                      
                       <p className=" text-xs">Online</p>
                     </div>
                
                  </div>
              </div>
           </div>
        </div>
    )
}